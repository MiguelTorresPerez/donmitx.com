import { collection, addDoc, getDocs, deleteDoc, doc, query, where, orderBy, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, limit } from 'firebase/firestore';
import { db } from './firebase-init.js';

// Collections
const USERS_COL = 'users';
const FOLDERS_COL = 'folders';
const ITEMS_COL = 'items';
const REQ_COL = 'friend_requests';
const CHATS_COL = 'chats';

// --- User & Social Operations ---

export async function syncUserProfile(user) {
    if (!user || !user.uid) return null;
    const userRef = doc(db, USERS_COL, user.uid);
    // Hardcoded safety net
    const isHardcodedAdmin = ['miguelsiok@hotmail.com', 'migueltorresperez@gmail.com', 'migueldev97@gmail.com'].includes(user.email);

    try {
        const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            lastLogin: new Date().toISOString()
        };

        if (isHardcodedAdmin) userData.superuser = true;

        // Atomic upsert with merge
        await setDoc(userRef, userData, { merge: true });

        const userSnap = await getDoc(userRef);
        return userSnap.exists() ? userSnap.data() : userData;
    } catch (e) {
        console.error('Error syncing profile:', e);
        return { ...user, superuser: isHardcodedAdmin };
    }
}

export async function checkUsernameAvailability(username) {
    const q = query(collection(db, USERS_COL), where('username', '==', username), limit(1));
    const snap = await getDocs(q);
    return snap.empty;
}

export async function updateUsername(uid, username) {
    const isAvailable = await checkUsernameAvailability(username);
    if (!isAvailable) throw new Error('Username taken');
    await updateDoc(doc(db, USERS_COL, uid), { username: username });
}

export async function searchUsers(term) {
    // Simple prefix search (requires compatible indexing or just exact match for MVP)
    // Firestore doesn't do "contains". We'll do exact username match or simple range query
    const q = query(
        collection(db, USERS_COL),
        where('username', '>=', term),
        where('username', '<=', term + '\uf8ff'),
        limit(5)
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data());
}

export async function sendFriendRequest(fromUid, toUid) {
    await addDoc(collection(db, REQ_COL), {
        fromUid, toUid, status: 'pending', createdAt: new Date().toISOString()
    });
}

export async function getFriendRequests(uid) {
    // Incoming
    const q = query(collection(db, REQ_COL), where('toUid', '==', uid), where('status', '==', 'pending'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function acceptFriendRequest(requestId, fromUid, toUid) {
    // 1. Update Request
    await updateDoc(doc(db, REQ_COL, requestId), { status: 'accepted' });

    // 2. Add to both users' friend lists
    await updateDoc(doc(db, USERS_COL, fromUid), { friends: arrayUnion(toUid) });
    await updateDoc(doc(db, USERS_COL, toUid), { friends: arrayUnion(fromUid) });
}

// --- Folder Operations ---

export async function createFolder(folderData, user) {
    const docRef = await addDoc(collection(db, FOLDERS_COL), {
        ...folderData,
        ownerUid: user.uid,
        createdAt: new Date().toISOString(),
        itemCount: 0
    });
    return { id: docRef.id, ...folderData };
}

export async function getFolders(userId = null) {
    let q;
    if (userId) {
        // My Library
        q = query(collection(db, FOLDERS_COL), where('ownerUid', '==', userId), orderBy('createdAt', 'desc'));
    } else {
        // Public Feed (Global)
        q = query(collection(db, FOLDERS_COL), where('privacy', '==', 'public'), orderBy('createdAt', 'desc'), limit(50));
    }
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function deleteFolder(folderId) {
    await deleteDoc(doc(db, FOLDERS_COL, folderId));
    // Ideally delete all items in folder too (batch), simpler for now
}

// --- Item Operations ---

export async function addItem(itemData, user) {
    const docRef = await addDoc(collection(db, ITEMS_COL), {
        ...itemData,
        ownerUid: user.uid,
        createdAt: new Date().toISOString()
    });
    // Increment specific folder count? Optional optimization.
    return { id: docRef.id, ...itemData };
}

export async function getFolderItems(folderId) {
    const q = query(collection(db, ITEMS_COL), where('folderId', '==', folderId), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function deleteItem(itemId) {
    await deleteDoc(doc(db, ITEMS_COL, itemId));
}
