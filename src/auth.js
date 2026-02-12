/**
 * donmitx — Authentication Module
 */

import { firebaseConfig, isFirebaseConfigured } from './firebase-config.js';
import { syncUserProfile } from './db.js';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

// Initialize Firebase statically if configured
let auth = null;
let googleProvider = null;

if (isFirebaseConfigured()) {
    try {
        const app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        googleProvider = new GoogleAuthProvider();
    } catch (e) {
        console.error('Firebase init error:', e);
    }
}

const JWT = {
    create(payload, expiresInHours = 24) {
        const header = { alg: 'HS256', typ: 'JWT' };
        const now = Math.floor(Date.now() / 1000);
        const data = { ...payload, iat: now, exp: now + (expiresInHours * 3600) };
        const signature = btoa(btoa(JSON.stringify(header)) + '.' + btoa(JSON.stringify(data)) + '.donmitx-session');
        return `${btoa(JSON.stringify(header))}.${btoa(JSON.stringify(data))}.${signature}`;
    },
    decode(token) {
        try {
            const parts = token.split('.');
            if (parts.length !== 3) return null;
            const payload = JSON.parse(atob(parts[1]));
            const now = Math.floor(Date.now() / 1000);
            return (payload.exp && payload.exp < now) ? null : payload;
        } catch { return null; }
    },
    isValid(token) { return this.decode(token) !== null; }
};

export const Auth = {
    TOKEN_KEY: 'donmitx_jwt',
    USER_KEY: 'donmitx_user',

    async init() {
        if (!isFirebaseConfigured()) return this.getSession();
        // Listener for auth state changes if needed, but we rely on session storage for simplicity
        return this.getSession();
    },

    async signInWithGoogle() {
        if (!isFirebaseConfigured()) return this.createDemoSession();
        if (!auth) throw new Error('Firebase not initialized');

        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Sync with Firestore to get role (superuser)
            const userProfile = await syncUserProfile({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
            });

            // Create JWT
            const token = JWT.create({
                sub: user.uid,
                email: user.email,
                name: user.displayName,
                picture: user.photoURL,
                superuser: userProfile?.superuser || false
            });

            // Store full profile in local storage
            localStorage.setItem(this.TOKEN_KEY, token);
            localStorage.setItem(this.USER_KEY, JSON.stringify(userProfile));

            return { success: true, user: userProfile };
        } catch (error) {
            console.error('[donmitx] Sign-in error:', error);
            return { success: false, error: error.message };
        }
    },

    createDemoSession() {
        const demoUser = {
            uid: 'demo-' + Date.now(),
            email: 'demo@donmitx.com',
            displayName: 'Demo User',
            photoURL: 'https://api.dicebear.com/7.x/initials/svg?seed=DU&backgroundColor=6366f1',
            superuser: false
        };
        const token = JWT.create({ sub: demoUser.uid, ...demoUser });
        localStorage.setItem(this.TOKEN_KEY, token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(demoUser));
        return { success: true, user: demoUser };
    },

    getSession() {
        const token = localStorage.getItem(this.TOKEN_KEY);
        if (!token || !JWT.isValid(token)) {
            this.clearSession();
            return null;
        }
        return JSON.parse(localStorage.getItem(this.USER_KEY) || 'null');
    },

    async signOut() {
        if (auth) {
            try { await signOut(auth); } catch (e) { }
        }
        this.clearSession();
    },

    clearSession() {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
    },

    isAdmin() {
        const user = this.getSession();
        return !!(user && user.superuser);
    },

    isAuthenticated() {
        return this.getSession() !== null;
    },

    requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = '/';
            return false;
        }
        return true;
    },

    redirectIfAuthenticated() {
        if (this.isAuthenticated()) {
            window.location.href = '/dashboard.html';
            return true;
        }
        return false;
    }
};
