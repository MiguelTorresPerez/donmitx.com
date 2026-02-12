/**
 * donmitx — Firebase Configuration
 * 
 * ✅ SAFE TO BE PUBLIC:
 * This configuration identifies your Firebase project to the Google servers.
 * It does NOT grant administrative access.
 * Security is enforced by:
 * 1. Firebase Security Rules (on the server)
 * 2. Authorized Domains (in Firebase Console)
 * 3. Google Account validation
 */

export const firebaseConfig = {
    apiKey: "AIzaSyBCvqxX68Yhoc7dn8uFFuimwHSG0RSBOJ0",
    authDomain: "donmitx.firebaseapp.com",
    projectId: "donmitx",
    storageBucket: "donmitx.firebasestorage.app",
    messagingSenderId: "432860516667",
    appId: "1:432860516667:web:48f58a798b2e275042671e",
    measurementId: "G-MEEGGS77L5"
};

/**
 * Check if Firebase config has been filled in
 */
export function isFirebaseConfigured() {
    return firebaseConfig.apiKey !== "YOUR_API_KEY";
}
