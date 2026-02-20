/**
 * donmitx — Database Layer (Firestore)
 * All Firestore operations in one module.
 */

import {
    collection, addDoc, getDocs, deleteDoc, doc, query,
    where, orderBy, getDoc, setDoc, updateDoc,
    arrayUnion, arrayRemove, limit, increment, getCountFromServer
} from 'firebase/firestore';
import { db } from './firebase-init.js';

// --- Collection Names ---
const COL = {
    USERS: 'users',
    FOLDERS: 'folders',
    ITEMS: 'items',
    FRIEND_REQUESTS: 'friend_requests',
    CHATS: 'chats',
    DRAFTS: 'drafts'
};

// ============================================================
//  USER & PROFILE
// ============================================================

/**
 * Sync a Firebase Auth user to Firestore.
 * Reads existing role from Firestore — never overwrites it.
 */
export async function syncUserProfile(user) {
    if (!user?.uid) return null;
    const userRef = doc(db, COL.USERS, user.uid);

    try {
        // Check if user already exists (to preserve role)
        const existingSnap = await getDoc(userRef);
        const existingData = existingSnap.exists() ? existingSnap.data() : null;

        const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            lastLogin: new Date().toISOString()
        };

        // Only set role on first creation, never overwrite
        if (!existingData) {
            userData.role = 'user'; // default role for new users
        }

        await setDoc(userRef, userData, { merge: true });

        // Read back the full profile (includes role and superuser flag set by admin)
        const freshSnap = await getDoc(userRef);
        return freshSnap.exists() ? freshSnap.data() : userData;
    } catch (e) {
        console.error('[donmitx] Error syncing profile:', e);
        return { ...user, role: 'user' };
    }
}

export async function checkUsernameAvailability(username) {
    const q = query(collection(db, COL.USERS), where('username', '==', username), limit(1));
    const snap = await getDocs(q);
    return snap.empty;
}

export async function updateUsername(uid, username) {
    const isAvailable = await checkUsernameAvailability(username);
    if (!isAvailable) throw new Error('Username taken');
    await updateDoc(doc(db, COL.USERS, uid), { username });
}

export async function searchUsers(term) {
    const q = query(
        collection(db, COL.USERS),
        where('username', '>=', term),
        where('username', '<=', term + '\uf8ff'),
        limit(5)
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data());
}

// ============================================================
//  FRIEND REQUESTS
// ============================================================

// ============================================================
//  FRIEND REQUESTS
// ============================================================

export async function sendFriendRequest(fromUid, toUid) {
    // Check if request already exists
    const q = query(
        collection(db, COL.FRIEND_REQUESTS),
        where('fromUid', '==', fromUid),
        where('toUid', '==', toUid),
        where('status', '==', 'pending')
    );
    const snap = await getDocs(q);
    if (!snap.empty) throw new Error('Request already pending');

    await addDoc(collection(db, COL.FRIEND_REQUESTS), {
        fromUid, toUid, status: 'pending', createdAt: new Date().toISOString()
    });
}

export async function getFriendRequests(uid) {
    const q = query(
        collection(db, COL.FRIEND_REQUESTS),
        where('toUid', '==', uid),
        where('status', '==', 'pending')
    );
    const snap = await getDocs(q);

    // Enrich with sender info
    const requests = await Promise.all(snap.docs.map(async d => {
        const data = d.data();
        const userSnap = await getDoc(doc(db, COL.USERS, data.fromUid));
        return {
            id: d.id,
            ...data,
            fromUser: userSnap.exists() ? userSnap.data() : { displayName: 'Unknown' }
        };
    }));
    return requests;
}

export async function acceptFriendRequest(requestId, fromUid, toUid) {
    await updateDoc(doc(db, COL.FRIEND_REQUESTS, requestId), { status: 'accepted' });

    // Add to both users' friend lists (handled by specific rule)
    try {
        await updateDoc(doc(db, COL.USERS, fromUid), { friends: arrayUnion(toUid) });
        await updateDoc(doc(db, COL.USERS, toUid), { friends: arrayUnion(fromUid) });
    } catch (e) {
        console.error('[donmitx] Non-critical error updating friends lists:', e);
    }
}

export async function rejectFriendRequest(requestId) {
    await updateDoc(doc(db, COL.FRIEND_REQUESTS, requestId), { status: 'rejected' });
}

export async function getFriendsList(uid) {
    const userSnap = await getDoc(doc(db, COL.USERS, uid));
    if (!userSnap.exists()) return [];

    const friendUids = userSnap.data().friends || [];
    if (friendUids.length === 0) return [];

    // Fetch in batches of 10 (Firestore 'in' limit)
    const chunks = [];
    for (let i = 0; i < friendUids.length; i += 10) {
        chunks.push(friendUids.slice(i, i + 10));
    }

    const friends = [];
    for (const chunk of chunks) {
        const q = query(collection(db, COL.USERS), where('uid', 'in', chunk));
        const snap = await getDocs(q);
        snap.forEach(d => friends.push(d.data()));
    }
    return friends;
}

// ============================================================
//  CHATS & MESSAGES
// ============================================================

/**
 * Create or get existing chat between two users
 */
export async function createChat(participants) {
    // Check if chat exists (naive check: participants array match)
    // For scalability, you'd usually store chat IDs in user profile.
    // Here we query for simplicity.
    const q = query(
        collection(db, COL.CHATS),
        where('participants', 'array-contains', participants[0])
    );
    const snap = await getDocs(q);

    const existing = snap.docs.find(d => {
        const p = d.data().participants;
        return p.length === participants.length && p.every(uid => participants.includes(uid));
    });

    if (existing) return { id: existing.id, ...existing.data() };

    const docRef = await addDoc(collection(db, COL.CHATS), {
        participants,
        admins: [participants[0]], // The initiator is the first admin
        createdAt: new Date().toISOString(),
        lastMessage: null,
        lastMessageTime: null
    });
    return { id: docRef.id, participants };
}

export async function getChats(userId) {
    const q = query(
        collection(db, COL.CHATS),
        where('participants', 'array-contains', userId)
    );
    const snap = await getDocs(q);
    const chats = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    // Client side sort to avoid complex index requirements
    chats.sort((a, b) => new Date(b.lastMessageTime || b.createdAt) - new Date(a.lastMessageTime || a.createdAt));

    // Resolve display names
    for (const chat of chats) {
        const others = chat.participants.filter(p => p !== userId);
        const namePromises = others.map(async uid => {
            try {
                const uSnap = await getDoc(doc(db, COL.USERS, uid));
                return uSnap.exists() ? uSnap.data().displayName : 'Unknown User';
            } catch { return 'Unknown User'; }
        });
        const names = await Promise.all(namePromises);
        chat.displayTitle = chat.title || names.join(', ') || 'Just You';
        chat.isGroup = chat.participants.length > 2;
    }

    return chats;
}

export async function addParticipantToChat(chatId, newUid, currentUid) {
    const chatRef = doc(db, COL.CHATS, chatId);
    const snap = await getDoc(chatRef);
    if (!snap.exists()) throw new Error('Chat not found');
    const data = snap.data();

    // Check admin
    const admins = data.admins || data.participants;
    if (!admins.includes(currentUid)) throw new Error('Only admins can add users');

    await updateDoc(chatRef, {
        participants: arrayUnion(newUid),
        ...(data.admins ? {} : { admins: [currentUid] }) // Ensure admins exists
    });
}

export async function removeParticipantFromChat(chatId, targetUid, currentUid) {
    const chatRef = doc(db, COL.CHATS, chatId);
    const snap = await getDoc(chatRef);
    if (!snap.exists()) throw new Error('Chat not found');
    const data = snap.data();

    // Check admin (or user leaving themselves)
    const admins = data.admins || data.participants;
    if (!admins.includes(currentUid) && currentUid !== targetUid) {
        throw new Error('Only admins can remove users');
    }

    await updateDoc(chatRef, {
        participants: arrayRemove(targetUid),
        ...(data.admins && currentUid !== targetUid ? { admins: arrayRemove(targetUid) } : {})
    });
}

export async function sendMessage(chatId, user, text) {
    const msgData = {
        text,
        userId: user.uid,
        username: user.displayName,
        photoURL: user.photoURL,
        timestamp: new Date().toISOString()
    };

    // Add to subcollection
    await addDoc(collection(db, COL.CHATS, chatId, 'messages'), msgData);

    // Update main chat doc
    await updateDoc(doc(db, COL.CHATS, chatId), {
        lastMessage: text,
        lastMessageTime: msgData.timestamp
    });
}

export async function getMessages(chatId) {
    const q = query(
        collection(db, COL.CHATS, chatId, 'messages'),
        orderBy('timestamp', 'asc'),
        limit(50)
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ============================================================
//  FOLDERS
// ============================================================

export async function createFolder(folderData, user) {
    const docRef = await addDoc(collection(db, COL.FOLDERS), {
        ...folderData,
        ownerUid: user.uid,
        ownerPhotoURL: user.photoURL || '',
        ownerName: user.displayName || 'Unknown',
        createdAt: new Date().toISOString(),
        itemCount: 0
    });
    return { id: docRef.id, ...folderData, itemCount: 0, ownerPhotoURL: user.photoURL || '' };
}

export async function getFolders(userId = null, currentUid = null) {
    if (userId) {
        // Gets all folders specifically owned by the requested user
        const q = query(collection(db, COL.FOLDERS), where('ownerUid', '==', userId), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        const folders = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        return populateItemCounts(folders);
    } else {
        // Global Feed: Get 'public' ones. To get friend-specific ones, we query them individually.
        const qPub = query(collection(db, COL.FOLDERS), where('privacy', '==', 'public'), orderBy('createdAt', 'desc'), limit(50));
        const pubSnap = await getDocs(qPub);
        let allFolders = pubSnap.docs.map(d => ({ id: d.id, ...d.data() }));

        if (currentUid) {
            try {
                // Also need to get 'friends' privacy folders where the owner is a friend.
                const qFriends = query(collection(db, COL.FOLDERS), where('privacy', '==', 'friends'), orderBy('createdAt', 'desc'), limit(100));
                const friendSnap = await getDocs(qFriends);

                // We need the current user's friend list to filter
                const myFriends = await getFriendsList(currentUid);
                const myFriendIds = myFriends.map(f => f.uid);

                const friendFolders = friendSnap.docs
                    .map(d => ({ id: d.id, ...d.data() }))
                    .filter(f => myFriendIds.includes(f.ownerUid) || f.ownerUid === currentUid);

                // Merge and deduplicate
                const folderIds = new Set(allFolders.map(f => f.id));
                for (const ff of friendFolders) {
                    if (!folderIds.has(ff.id)) {
                        allFolders.push(ff);
                        folderIds.add(ff.id);
                    }
                }

                // Sort merged array
                allFolders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            } catch (friendsErr) {
                console.warn('[donmitx] Could not load friend folders, continuing with public only:', friendsErr);
            }
        }

        return populateItemCounts(allFolders);
    }
}

async function populateItemCounts(folders) {
    const countPromises = folders.map(async (folder) => {
        try {
            const itemsQuery = query(collection(db, COL.ITEMS), where('folderId', '==', folder.id));
            const countSnap = await getCountFromServer(itemsQuery);
            folder.itemCount = countSnap.data().count;
        } catch {
            // Keep existing itemCount if count fails
        }
        return folder;
    });
    return Promise.all(countPromises);
}

export async function deleteFolder(folderId) {
    // Delete all items in the folder first
    const itemsQuery = query(collection(db, COL.ITEMS), where('folderId', '==', folderId));
    const itemsSnap = await getDocs(itemsQuery);
    const deletePromises = itemsSnap.docs.map(d => deleteDoc(d.ref));
    await Promise.all(deletePromises);

    await deleteDoc(doc(db, COL.FOLDERS, folderId));
}

// ============================================================
//  ITEMS
// ============================================================

export async function addItem(itemData, user) {
    const docRef = await addDoc(collection(db, COL.ITEMS), {
        ...itemData,
        ownerUid: user.uid,
        createdAt: new Date().toISOString(),
        views: 0,
        likes: 0,
        likedBy: [],
        commentCount: 0,
        privacy: itemData.privacy || 'private'
    });

    // Increment the parent folder's item count
    if (itemData.folderId) {
        try {
            await updateDoc(doc(db, COL.FOLDERS, itemData.folderId), {
                itemCount: increment(1)
            });
        } catch (e) {
            console.warn('[donmitx] Could not update folder itemCount:', e);
        }
    }

    return { id: docRef.id, ...itemData };
}

export async function getFolderItems(folderId) {
    const q = query(collection(db, COL.ITEMS), where('folderId', '==', folderId), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function deleteItem(itemId) {
    // Read item to get folderId before deleting
    const itemRef = doc(db, COL.ITEMS, itemId);
    const itemSnap = await getDoc(itemRef);

    if (itemSnap.exists()) {
        const folderId = itemSnap.data().folderId;
        await deleteDoc(itemRef);

        // Decrement folder count
        if (folderId) {
            try {
                await updateDoc(doc(db, COL.FOLDERS, folderId), {
                    itemCount: increment(-1)
                });
            } catch (e) {
                console.warn('[donmitx] Could not update folder itemCount:', e);
            }
        }
    } else {
        await deleteDoc(itemRef);
    }
}

// ============================================================
//  SOCIAL INTERACTIONS
// ============================================================

export async function toggleLike(itemId, userId) {
    const itemRef = doc(db, COL.ITEMS, itemId);
    const itemSnap = await getDoc(itemRef);

    if (!itemSnap.exists()) return;
    const data = itemSnap.data();
    const likedBy = data.likedBy || [];
    const isLiked = likedBy.includes(userId);

    if (isLiked) {
        await updateDoc(itemRef, {
            likes: (data.likes || 1) - 1,
            likedBy: arrayRemove(userId)
        });
    } else {
        await updateDoc(itemRef, {
            likes: (data.likes || 0) + 1,
            likedBy: arrayUnion(userId)
        });
    }
}

export async function incrementView(itemId) {
    const itemRef = doc(db, COL.ITEMS, itemId);
    await updateDoc(itemRef, { views: increment(1) });
}

export async function addComment(itemId, user, text) {
    const commentsRef = collection(db, COL.ITEMS, itemId, 'comments');
    await addDoc(commentsRef, {
        text,
        userId: user.uid,
        username: user.displayName,
        photoURL: user.photoURL,
        timestamp: new Date().toISOString()
    });

    // Update main item comment count
    await updateDoc(doc(db, COL.ITEMS, itemId), { commentCount: increment(1) });
}

export async function getComments(itemId) {
    const q = query(collection(db, COL.ITEMS, itemId, 'comments'), orderBy('timestamp', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ============================================================
//  ADMIN
// ============================================================

export async function getAllUsers() {
    const q = query(collection(db, COL.USERS), orderBy('lastLogin', 'desc'), limit(100));
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data());
}

/**
 * Get platform stats for admin dashboard
 */
export async function getAdminStats() {
    try {
        const [usersSnap, foldersSnap, itemsSnap] = await Promise.all([
            getCountFromServer(collection(db, COL.USERS)),
            getCountFromServer(collection(db, COL.FOLDERS)),
            getCountFromServer(collection(db, COL.ITEMS))
        ]);
        return {
            totalUsers: usersSnap.data().count,
            totalFolders: foldersSnap.data().count,
            totalItems: itemsSnap.data().count
        };
    } catch (e) {
        console.error('[donmitx] Stats error:', e);
        return { totalUsers: 0, totalFolders: 0, totalItems: 0 };
    }
}

/**
 * Update a user's role (admin only)
 */
export async function updateUserRole(uid, role) {
    await updateDoc(doc(db, COL.USERS, uid), { role });
}

export async function getAllFolders() {
    const q = query(collection(db, COL.FOLDERS), orderBy('createdAt', 'desc'), limit(100));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getAllItems() {
    const q = query(collection(db, COL.ITEMS), orderBy('createdAt', 'desc'), limit(100));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ============================================================
//  DRAFTS (Projects feature)
// ============================================================

export async function createDraft(draftData, user) {
    const docRef = await addDoc(collection(db, COL.DRAFTS), {
        ...draftData,
        ownerUid: user.uid,
        ownerName: user.displayName || user.email,
        isDraft: true,
        createdAt: new Date().toISOString()
    });
    return { id: docRef.id, isDraft: true, ...draftData };
}

export async function getDrafts(userId = null) {
    let q;
    if (userId) {
        q = query(collection(db, COL.DRAFTS), where('ownerUid', '==', userId), orderBy('createdAt', 'desc'));
    } else {
        // Admin: get all drafts
        q = query(collection(db, COL.DRAFTS), orderBy('createdAt', 'desc'), limit(50));
    }
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, isDraft: true, ...d.data() }));
}

export async function deleteDraft(draftId) {
    await deleteDoc(doc(db, COL.DRAFTS, draftId));
}
