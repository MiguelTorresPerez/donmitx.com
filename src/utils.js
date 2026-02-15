/**
 * donmitx — Shared Utilities
 */

/**
 * Sanitize text for safe HTML rendering
 */
export function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Format large numbers compactly (1.2k, 3.4M)
 */
export function formatNumber(n) {
    if (n == null) return '0';
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
    return String(n);
}

/**
 * Relative time display (e.g., "2h ago", "3d ago")
 */
export function timeAgo(dateStr) {
    if (!dateStr) return '';
    const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    return `${Math.floor(months / 12)}y ago`;
}

/**
 * Generate a fallback avatar URL from a user's display name
 */
export function avatarUrl(user) {
    if (user?.photoURL) return user.photoURL;
    const name = user?.displayName || user?.email || 'U';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=128`;
}
