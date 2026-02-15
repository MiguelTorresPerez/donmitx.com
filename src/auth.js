/**
 * donmitx — Authentication Module
 * Uses the shared Firebase instance from firebase-init.js.
 */

import { auth } from './firebase-init.js';
import { syncUserProfile } from './db.js';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// Google provider (only if auth is available)
const googleProvider = auth ? new GoogleAuthProvider() : null;

// --- Client-side JWT (Session Token) ---

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

// --- Auth Interface ---

export const Auth = {
    TOKEN_KEY: 'donmitx_jwt',
    USER_KEY: 'donmitx_user',

    async init() {
        return this.getSession();
    },

    async signInWithGoogle() {
        if (!auth) return this.createDemoSession();

        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Optimistic session: create immediately, sync role in background
            let userProfile = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                role: 'user' // default until Firestore sync completes
            };

            // Background sync — wait up to 1.5s for role data
            const syncPromise = syncUserProfile(userProfile)
                .then(profile => { if (profile) userProfile = profile; return profile; })
                .catch(err => { console.warn('[donmitx] Background sync failed:', err); return null; });

            await Promise.race([
                syncPromise,
                new Promise(resolve => setTimeout(resolve, 1500))
            ]);

            // Create session
            const token = JWT.create({
                sub: userProfile.uid,
                email: userProfile.email,
                name: userProfile.displayName,
                picture: userProfile.photoURL,
                role: userProfile.role || 'user'
            });

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
            role: 'user'
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
            try { await signOut(auth); } catch (e) { /* ignore */ }
        }
        this.clearSession();
    },

    clearSession() {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
    },

    /** Check if current user has admin role */
    isAdmin() {
        const user = this.getSession();
        return !!(user && (user.role === 'admin' || user.superuser === true));
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
