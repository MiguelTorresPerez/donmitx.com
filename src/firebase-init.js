/**
 * donmitx — Firebase Shared Initialization
 * Ensures a single Firebase App instance is used across Auth and DB.
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig, isFirebaseConfigured } from './firebase-config.js';

let app, auth, db;

if (isFirebaseConfigured()) {
    try {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);

        // Enable offline persistence
        const { enableIndexedDbPersistence } = await import('firebase/firestore');
        enableIndexedDbPersistence(db).catch((err) => {
            if (err.code == 'failed-precondition') {
                console.warn('Persistence failed: Multiple tabs open');
            } else if (err.code == 'unimplemented') {
                console.warn('Persistence not supported by browser');
            }
        });

        console.log('[donmitx] Firebase initialized successfully');
    } catch (e) {
        console.error('[donmitx] Firebase initialization error:', e);
    }
} else {
    console.warn('[donmitx] Firebase config missing or incomplete');
}

export { app, auth, db };
