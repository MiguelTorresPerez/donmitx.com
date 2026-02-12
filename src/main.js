/**
 * donmitx — Login Page Entry Point
 */

import { ParticleCanvas } from './canvas.js';
import { Auth } from './auth.js';

// Initialize canvas animation
const canvas = new ParticleCanvas('particle-canvas', {
  particleCount: 100,
  connectionDistance: 160,
  speed: 0.3
});

// Check if already authenticated → redirect to dashboard
if (Auth.redirectIfAuthenticated()) {
  // Will redirect
} else {
  // Initialize login UI
  initLogin();
}

function initLogin() {
  const btnGoogle = document.getElementById('btn-google-signin');
  const statusEl = document.getElementById('login-status');

  btnGoogle.addEventListener('click', async () => {
    statusEl.textContent = 'Signing in...';
    statusEl.className = 'login-status';

    try {
      const result = await Auth.signInWithGoogle();

      if (result.success) {
        statusEl.textContent = `Welcome, ${result.user.displayName}!`;
        statusEl.className = 'login-status success';

        // Smooth transition to dashboard
        document.querySelector('.login-card').style.transform = 'scale(0.95)';
        document.querySelector('.login-card').style.opacity = '0';

        setTimeout(() => {
          window.location.href = '/dashboard.html';
        }, 600);
      } else {
        statusEl.textContent = result.error || 'Sign-in failed. Please try again.';
        statusEl.className = 'login-status error';
      }
    } catch (error) {
      statusEl.textContent = 'An error occurred. Please try again.';
      statusEl.className = 'login-status error';
      console.error('[donmitx] Login error:', error);
    }
  });
}
