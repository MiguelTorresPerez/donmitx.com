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
    createItemCard(item, onDelete) {
        const card = document.createElement('div');
        card.className = `item-card type-${item.type}`;
        card.dataset.id = item.id;

        let icon = '🔗';
        let actionBtn = `<a href="${item.url}" target="_blank" class="btn-visit">Visit</a>`;

        // Customize based on Type
        switch (item.type) {
            case ContentType.YOUTUBE:
            case ContentType.VIDEO:
                icon = '▶️';
                actionBtn = `<a href="${item.url}" target="_blank" class="btn-play">Watch</a>`;
                break;
            case ContentType.AI_CHAT:
                icon = '🤖';
                break;
            case ContentType.CODE:
                icon = '💻';
                break;
            case ContentType.SOCIAL:
                icon = '🐦';
                break;
        }

        const imageHtml = item.imageUrl
            ? `<div class="item-image" style="background-image: url('${item.imageUrl}')"></div>`
            : `<div class="item-image-placeholder">${icon}</div>`;

        card.innerHTML = `
            ${imageHtml}
            <div class="item-content">
                <div class="item-header">
                    <span class="item-type-badge">${item.type}</span>
                    ${onDelete ? `<button class="btn-delete-item" title="Delete">×</button>` : ''}
                </div>
                <h4>${escapeHtml(item.title)}</h4>
                <p class="item-summary">${escapeHtml(item.summary || '')}</p>
                <div class="item-actions">
                    ${actionBtn}
                </div>
            </div>
        `;

        // Delete Handler
        if (onDelete) {
            card.querySelector('.btn-delete-item').addEventListener('click', (e) => {
                e.stopPropagation();
                onDelete(item.id);
            });
        }

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
