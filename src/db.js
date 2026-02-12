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

    // Auto-promote specific emails (optional safety net)
    const isHardcodedAdmin = ['miguelsiok@hotmail.com', 'migueltorresperez@gmail.com'].includes(user.email);

    try {
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            return userSnap.data();
        } else {
            // Create new user profile
            const newProfile = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                superuser: isHardcodedAdmin, // Default false, unless hardcoded override
                createdAt: new Date().toISOString()
            };
            await setDoc(userRef, newProfile);
            return newProfile;
        }
    } catch (e) {
        console.error('Error syncing user profile:', e);
        // Fallback: if DB fails, respect hardcoded list
        return { ...user, superuser: isHardcodedAdmin };
    }
}
