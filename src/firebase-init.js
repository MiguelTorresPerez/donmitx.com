/**
 * donmitx — Firebase Shared Initialization
 * Ensures a single Firebase App instance is used across Auth and DB.
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, persistentLocalCache } from 'firebase/firestore';
import { firebaseConfig, isFirebaseConfigured } from './firebase-config.js';

let app, auth, db;

if (isFirebaseConfigured()) {
    try {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);

        // Initialize Firestore with persistent cache (new API)
        // Explicitly connecting to the named database 'default' which differs from the standard '(default)'
        db = initializeFirestore(app, {
            localCache: persistentLocalCache()
        }, 'default');

        console.log(`[donmitx] Firebase Initialization Debug:`);
        console.log(`- Project ID: "${firebaseConfig.projectId}"`);
        console.log(`- Auth Domain: "${firebaseConfig.authDomain}"`);
        console.log(`[donmitx] Firebase initialized for project: ${firebaseConfig.projectId}, database: default`);
        console.log('[donmitx] Database initialization complete');
    } catch (e) {
        console.error('[donmitx] Firebase initialization error:', e);
    }
} else {
    console.warn('[donmitx] Firebase config missing or incomplete');
}

export { app, auth, db };
