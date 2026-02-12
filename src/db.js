import { collection, addDoc, getDocs, deleteDoc, doc, query, where, orderBy, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase-init.js';

const DRAFTS_COLLECTION = 'project_drafts';
const USERS_COLLECTION = 'users';

// --- Draft Operations ---

export async function createDraft(project, user) {
    try {
        const docRef = await addDoc(collection(db, DRAFTS_COLLECTION), {
            ...project,
            ownerUid: user.uid,
            ownerEmail: user.email,
            ownerName: user.displayName,
            status: 'pending',
            createdAt: new Date().toISOString()
        });
        console.log('Draft created with ID: ', docRef.id);
        return { id: docRef.id, ...project };
    } catch (e) {
        console.error('Error adding draft: ', e);
        throw e;
    }
}

export async function getDrafts(userUid = null) {
    let q;
    const draftsRef = collection(db, DRAFTS_COLLECTION);

    if (userUid) {
        q = query(draftsRef, where('ownerUid', '==', userUid));
    } else {
        q = query(draftsRef, orderBy('createdAt', 'desc'));
    }

    try {
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            isDraft: true
        }));
    } catch (error) {
        console.error('Error fetching drafts:', error);
        return [];
    }
}

export async function deleteDraft(draftId) {
    await deleteDoc(doc(db, DRAFTS_COLLECTION, draftId));
}

// --- User Operations ---

/**
 * Get or create user profile in Firestore
 * @param {Object} user - Auth user object
 * @returns {Promise<Object>} User profile including role
 */
export async function syncUserProfile(user) {
    if (!user || !user.uid) return null;

    const userRef = doc(db, USERS_COLLECTION, user.uid);
    const isHardcodedAdmin = ['miguelsiok@hotmail.com', 'migueltorresperez@gmail.com'].includes(user.email);

    try {
        // Use setDoc with merge: true for atomic upsert
        // This avoids the read-check-write cycle which is slower and racier
        const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            lastLogin: new Date().toISOString()
        };

        // We only want to set superuser if it's the first time or if we are enforcing hardcoded admins
        // But to keep it simple and consistent with Firestore rules:
        // We will just merge. The rules should protect 'superuser' field from being overwritten by non-admins if we were sending it from client
        // For now, we trust the client logic for the initial creation. 
        // Actually, to be safe, we should ONLY send fields we want to update.

        // If it's a hardcoded admin, force valid superuser status
        if (isHardcodedAdmin) {
            userData.superuser = true;
        }

        await setDoc(userRef, userData, { merge: true });

        // Fetch the final record to return (in case there were existing fields like 'superuser' that we didn't touch but need)
        const userSnap = await getDoc(userRef);
        return userSnap.exists() ? userSnap.data() : { ...userData, superuser: isHardcodedAdmin };

    } catch (e) {
        console.error('Error syncing user profile:', e);
        // Fallback: if DB fails, return what we have
        return { ...user, superuser: isHardcodedAdmin };
    }
}
