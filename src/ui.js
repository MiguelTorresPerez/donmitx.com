/**
 * donmitx — UI Renderer
 * Handles rendering of Folders and Content Items (Cards).
 */

import { ContentType } from './content.js';

export const UI = {

    /**
     * Render a Folder Card (3D Tilt Effect)
     */
    createFolderCard(folder, onClick) {
        const card = document.createElement('div');
        card.className = 'folder-card';
        card.dataset.id = folder.id;

        // Random gradient or user cover
        const gradient = folder.color || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

        card.innerHTML = `
            <div class="folder-cover" style="background: ${gradient}">
                <div class="folder-icon">📁</div>
            </div>
            <div class="folder-info">
                <h3>${escapeHtml(folder.title)}</h3>
                <p>${folder.itemCount || 0} items</p>
            </div>
        `;

        // Click Handler
        if (onClick) card.addEventListener('click', () => onClick(folder));

        // Tilt Effect
        this.addTiltEffect(card);

        return card;
    },

    /**
     * Render an Item Card (Content)
     */
    createItemCard(item, onDelete, onLike, onComment) {
        const card = document.createElement('div');
        card.className = `item-card type-${item.type}`;
        card.dataset.id = item.id;

        // Icons
        const icons = {
            [ContentType.YOUTUBE]: '▶️',
            [ContentType.VIDEO]: '▶️',
            [ContentType.AI_CHAT]: '🤖',
            [ContentType.CODE]: '💻',
            [ContentType.SOCIAL]: '🐦',
            [ContentType.LINK]: '🔗'
        };
        const icon = icons[item.type] || '📄';

        // Action Button Text
        const actions = {
            [ContentType.YOUTUBE]: 'Watch',
            [ContentType.VIDEO]: 'Watch',
            [ContentType.AI_CHAT]: 'Read Chat',
            [ContentType.CODE]: 'View Code'
        };
        const actionText = actions[item.type] || 'Visit';
        const actionClass = item.type === ContentType.VIDEO || item.type === ContentType.YOUTUBE ? 'btn-play' : 'btn-visit';

        // Stats
        const likes = item.likes || 0;
        const views = item.views || 0;
        const comments = item.commentCount || 0;
        const isLiked = item.isLikedByMe ? 'liked' : ''; // Needs to be injected by business logic

        const imageHtml = item.imageUrl
            ? `<div class="item-image" style="background-image: url('${item.imageUrl}')"></div>`
            : `<div class="item-image-placeholder">${icon}</div>`;

        card.innerHTML = `
            ${imageHtml}
            <div class="item-content">
                <div class="item-header">
                    <span class="item-type-badge">${item.type}</span>
                    <div class="item-controls">
                        ${onDelete ? `<button class="btn-icon btn-delete" title="Delete">×</button>` : ''}
                    </div>
                </div>
                
                <h4>${escapeHtml(item.title)}</h4>
                <p class="item-summary">${escapeHtml(item.summary || '')}</p>
                
                <div class="item-stats-row">
                    <button class="stat-pill btn-like ${isLiked}" title="Like">
                        <span>❤️</span> ${likes}
                    </button>
                    <button class="stat-pill btn-comment" title="Comments">
                        <span>💬</span> ${comments}
                    </button>
                    <div class="stat-pill view-count" title="Views">
                        <span>👁️</span> ${views}
                    </div>
                </div>

                <div class="item-actions">
                    <a href="${item.url}" target="_blank" class="${actionClass}">${actionText}</a>
                </div>
            </div>
        `;

        // Event Listeners
        if (onDelete) {
            card.querySelector('.btn-delete').addEventListener('click', (e) => {
                e.stopPropagation();
                onDelete(item.id);
            });
        }

        if (onLike) {
            card.querySelector('.btn-like').addEventListener('click', (e) => {
                e.stopPropagation();
                // Optimistic UI update
                const btn = e.currentTarget;
                const countSpan = btn.childNodes[2]; // Text node
                let count = parseInt(countSpan.textContent);
                if (btn.classList.contains('liked')) {
                    btn.classList.remove('liked');
                    countSpan.textContent = ` ${count - 1}`;
                } else {
                    btn.classList.add('liked');
                    countSpan.textContent = ` ${count + 1}`;
                }
                onLike(item);
            });
        }

        if (onComment) {
            card.querySelector('.btn-comment').addEventListener('click', (e) => {
                e.stopPropagation();
                onComment(item);
            });
        }

        // Card Click (Increments View)
        card.addEventListener('click', (e) => {
            // Don't trigger if clicked on button/link
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;
            // Also logic to open modal detail could go here
        });

        return card;
    },

    /**
     * Add 3D Tilt Effect to an element
     */
    addTiltEffect(element) {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            element.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
        });
    }
};

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
