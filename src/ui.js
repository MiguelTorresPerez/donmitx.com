/**
 * donmitx — UI Renderer
 * Renders Folders, Items, Comments, and Admin components.
 */

import { escapeHtml, formatNumber, timeAgo, avatarUrl } from './utils.js';
import { ContentType } from './content.js';

export const UI = {

    /**
     * Render a Folder Card with 3D tilt effect
     */
    createFolderCard(folder, onClick, onDelete = null, onShare = null) {
        const card = document.createElement('div');
        card.className = 'folder-card';
        card.dataset.id = folder.id;

        const gradient = folder.color || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        const privacyIcon = folder.privacy === 'public' ? '🌐' : folder.privacy === 'friends' ? '👥' : '🔒';
        const count = folder.itemCount || 0;

        // Build actions HTML
        let actionsHtml = '';
        if (onShare || onDelete) {
            actionsHtml = '<div class="folder-actions">';
            if (onShare) actionsHtml += '<button class="btn-action btn-share" title="Share Folder">📤</button>';
            if (onDelete) actionsHtml += '<button class="btn-action btn-delete" title="Delete Folder">🗑️</button>';
            actionsHtml += '</div>';
        }

        const ownerAvatarHtml = folder.ownerPhotoURL
            ? `<img class="folder-owner-avatar" src="${folder.ownerPhotoURL}" alt="Owner" onerror="this.style.display='none'">`
            : '';

        card.innerHTML = `
            <div class="folder-cover" style="background: ${gradient}">
                <div class="folder-icon">📁</div>
                <span class="folder-privacy-badge">${privacyIcon}</span>
                ${ownerAvatarHtml}
                ${actionsHtml}
            </div>
            <div class="folder-info">
                <h3>${escapeHtml(folder.title)}</h3>
                <div class="folder-meta">
                    <span class="folder-count">📄 ${count} item${count !== 1 ? 's' : ''}</span>
                    ${folder.createdAt ? `<span class="folder-date">${timeAgo(folder.createdAt)}</span>` : ''}
                </div>
            </div>
        `;

        if (onClick) {
            card.addEventListener('click', (e) => {
                // Ignore clicks on action buttons
                if (!e.target.closest('.btn-action')) {
                    onClick(folder);
                }
            });
        }

        if (onShare) {
            const shareBtn = card.querySelector('.btn-share');
            if (shareBtn) shareBtn.addEventListener('click', (e) => { e.stopPropagation(); onShare(folder); });
        }
        if (onDelete) {
            const deleteBtn = card.querySelector('.btn-delete');
            if (deleteBtn) deleteBtn.addEventListener('click', (e) => { e.stopPropagation(); onDelete(folder); });
        }

        this.addTiltEffect(card);

        return card;
    },

    /**
     * Render an Item Card with social interactions
     */
    createItemCard(item, onDelete, onLike, onComment, onView) {
        const card = document.createElement('div');
        card.className = `item-card type-${item.type}`;
        card.dataset.id = item.id;

        const icons = {
            [ContentType.YOUTUBE]: '▶️',
            [ContentType.VIDEO]: '▶️',
            [ContentType.AI_CHAT]: '🤖',
            [ContentType.CODE]: '💻',
            [ContentType.SOCIAL]: '🐦',
            [ContentType.APP]: '🎮',
            [ContentType.LINK]: '🔗'
        };
        const icon = icons[item.type] || '📄';

        const isApp = item.type === ContentType.APP;
        const actions = {
            [ContentType.YOUTUBE]: 'Watch',
            [ContentType.VIDEO]: 'Watch',
            [ContentType.AI_CHAT]: 'Read Chat',
            [ContentType.CODE]: 'View Code',
            [ContentType.APP]: '🎮 Play'
        };
        const actionText = actions[item.type] || 'Visit';
        const actionClass = isApp ? 'btn-play btn-play-app' : (item.type === ContentType.VIDEO || item.type === ContentType.YOUTUBE) ? 'btn-play' : 'btn-visit';

        const likes = item.likes || 0;
        const views = item.views || 0;
        const comments = item.commentCount || 0;
        const isLiked = item.isLikedByMe ? 'liked' : '';

        const imageHtml = item.imageUrl
            ? `<div class="item-image" style="background-image: url('${item.imageUrl}')"></div>`
            : `<div class="item-image-placeholder">${icon}</div>`;

        card.innerHTML = `
            ${imageHtml}
            <div class="item-content">
                <div class="item-header">
                    <span class="item-type-badge type-badge-${item.type}">${item.type}</span>
                    <div class="item-controls">
                        ${onDelete ? `<button class="btn-icon btn-delete" title="Delete">×</button>` : ''}
                    </div>
                </div>
                
                <h4>${escapeHtml(item.title)}</h4>
                <p class="item-summary">${escapeHtml(item.summary || '')}</p>
                
                <div class="item-stats-row">
                    <button class="stat-pill btn-like ${isLiked}" title="Like">
                        <span class="like-icon">${isLiked ? '❤️' : '🤍'}</span>
                        <span class="stat-count">${formatNumber(likes)}</span>
                    </button>
                    <button class="stat-pill btn-comment" title="Comments">
                        <span>💬</span>
                        <span class="stat-count">${formatNumber(comments)}</span>
                    </button>
                    <div class="stat-pill view-count" title="Views">
                        <span>👁️</span>
                        <span class="stat-count">${formatNumber(views)}</span>
                    </div>
                </div>

                <div class="item-actions">
                    ${isApp
                ? `<button class="${actionClass}" data-app-url="${item.url}">${actionText}</button>`
                : `<a href="${item.url}" target="_blank" rel="noopener" class="${actionClass}">${actionText}</a>`
            }
                </div>
            </div>
        `;

        // --- Event Listeners ---

        if (onDelete) {
            card.querySelector('.btn-delete').addEventListener('click', (e) => {
                e.stopPropagation();
                onDelete(item.id);
            });
        }

        if (onLike) {
            card.querySelector('.btn-like').addEventListener('click', (e) => {
                e.stopPropagation();
                const btn = e.currentTarget;
                const countEl = btn.querySelector('.stat-count');
                const iconEl = btn.querySelector('.like-icon');
                let count = parseInt(countEl.textContent) || 0;

                if (btn.classList.contains('liked')) {
                    btn.classList.remove('liked');
                    iconEl.textContent = '🤍';
                    countEl.textContent = formatNumber(Math.max(0, count - 1));
                } else {
                    btn.classList.add('liked');
                    iconEl.textContent = '❤️';
                    countEl.textContent = formatNumber(count + 1);
                    // Pulse animation
                    btn.classList.add('pulse');
                    setTimeout(() => btn.classList.remove('pulse'), 400);
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

        // Card click → increment view
        card.addEventListener('click', (e) => {
            if (e.target.closest('button') || e.target.closest('a')) return;
            if (onView) onView(item);
        });

        return card;
    },

    /**
     * Create a comment element
     */
    createCommentEl(comment) {
        const el = document.createElement('div');
        el.className = 'comment-item';
        el.innerHTML = `
            <img class="comment-avatar" src="${avatarUrl(comment)}" alt="">
            <div class="comment-body">
                <div class="comment-meta">
                    <strong>${escapeHtml(comment.username)}</strong>
                    <span class="comment-time">${timeAgo(comment.timestamp)}</span>
                </div>
                <p>${escapeHtml(comment.text)}</p>
            </div>
        `;
        return el;
    },

    /**
     * Create an admin stat card
     */
    createStatCard(label, value, icon, color) {
        const card = document.createElement('div');
        card.className = 'admin-stat-card';
        card.innerHTML = `
            <div class="stat-icon" style="background: ${color}">${icon}</div>
            <div class="stat-info">
                <span class="stat-value">${formatNumber(value)}</span>
                <span class="stat-label">${label}</span>
            </div>
        `;
        return card;
    },

    /**
     * Create a shimmer loading skeleton
     */
    createSkeleton(type = 'card') {
        const el = document.createElement('div');
        el.className = `skeleton skeleton-${type}`;
        if (type === 'card') {
            el.innerHTML = `
                <div class="skeleton-image shimmer"></div>
                <div class="skeleton-body">
                    <div class="skeleton-line w-60 shimmer"></div>
                    <div class="skeleton-line w-80 shimmer"></div>
                    <div class="skeleton-line w-40 shimmer"></div>
                </div>
            `;
        } else if (type === 'folder') {
            el.innerHTML = `
                <div class="skeleton-cover shimmer"></div>
                <div class="skeleton-info">
                    <div class="skeleton-line w-60 shimmer"></div>
                    <div class="skeleton-line w-40 shimmer"></div>
                </div>
            `;
        }
        return el;
    },

    /**
     * Show loading skeletons in a grid
     */
    /**
     * Show loading skeletons in a grid
     */
    showSkeletons(container, count = 6, type = 'card') {
        container.innerHTML = '';
        for (let i = 0; i < count; i++) {
            container.appendChild(this.createSkeleton(type));
        }
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
    },

    // --- Social Components ---

    createFriendCard(user, onClick) {
        const el = document.createElement('div');
        el.className = 'friend-card';
        el.innerHTML = `
            <div class="friend-avatar-wrapper">
                <img src="${avatarUrl(user)}" class="friend-avatar" alt="${escapeHtml(user.displayName)}">
                <div class="status-dot online"></div>
            </div>
            <div class="friend-info">
                <h4>${escapeHtml(user.displayName)}</h4>
                <p class="friend-status">Online</p>
            </div>
        `;
        el.addEventListener('click', () => onClick(user));
        return el;
    },

    createChatCard(chat, onClick) {
        const el = document.createElement('div');
        el.className = 'friend-card';
        el.innerHTML = `
            <div class="friend-avatar-wrapper" style="font-size: 20px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.1); border-radius: 50%; width: 40px; height: 40px;">
                ${chat.isGroup ? '👥' : '👤'}
            </div>
            <div class="friend-info">
                <h4>${escapeHtml(chat.displayTitle)}</h4>
                <p class="friend-status" style="color:var(--text-muted); font-size:0.75rem;">${chat.isGroup ? 'Group Chat' : 'Direct Message'}</p>
            </div>
        `;
        el.addEventListener('click', () => onClick(chat));
        return el;
    },

    createFriendRequestCard(request, onAccept, onReject) {
        const el = document.createElement('div');
        el.className = 'request-card';
        el.innerHTML = `
            <div class="request-header">
                <img src="${avatarUrl(request.fromUser)}" class="avatar-sm">
                <div>
                    <strong>${escapeHtml(request.fromUser.displayName)}</strong>
                    <span>sent a request</span>
                </div>
            </div>
            <div class="request-actions">
                <button class="btn-xs btn-primary btn-accept">Accept</button>
                <button class="btn-xs btn-outline btn-reject">Reject</button>
            </div>
        `;

        el.querySelector('.btn-accept').addEventListener('click', () => onAccept(request));
        el.querySelector('.btn-reject').addEventListener('click', () => onReject(request));
        return el;
    },

    createSearchResultCard(user, onAdd) {
        const el = document.createElement('div');
        el.className = 'user-search-result';
        el.innerHTML = `
            <div class="user-cell">
                <img src="${avatarUrl(user)}" class="avatar-sm">
                <span>${escapeHtml(user.displayName)}</span>
            </div>
            <button class="btn-xs btn-primary btn-add">Add Friend</button>
        `;
        el.querySelector('.btn-add').addEventListener('click', (e) => {
            e.target.textContent = 'Sent';
            e.target.disabled = true;
            onAdd(user);
        });
        return el;
    },

    createMessageBubble(msg, isOwn, onFolderClick = null) {
        const el = document.createElement('div');
        el.className = `chat-message ${isOwn ? 'own' : 'other'}`;

        let contentHtml = escapeHtml(msg.text);
        const folderMatch = msg.text.match(/^\[shared-folder:([^:]+):(.+)\]$/);

        if (folderMatch) {
            const fId = escapeHtml(folderMatch[1]);
            const fTitle = escapeHtml(folderMatch[2]);
            contentHtml = `
                <div class="shared-folder-bubble" data-fid="${fId}" data-ftitle="${fTitle}">
                    <div class="sf-icon">📁</div>
                    <div class="sf-info">
                        <strong>${fTitle}</strong>
                        <span>View Folder</span>
                    </div>
                </div>
            `;
        }

        el.innerHTML = `
            ${!isOwn ? `<img src="${msg.photoURL || 'https://ui-avatars.com/api/?name=User'}" class="msg-avatar">` : ''}
            <div class="msg-content">
                <div class="msg-bubble">${contentHtml}</div>
                <div class="msg-time">${timeAgo(msg.timestamp)}</div>
            </div>
        `;

        if (folderMatch && onFolderClick) {
            const bubble = el.querySelector('.shared-folder-bubble');
            bubble.addEventListener('click', () => {
                onFolderClick({ id: folderMatch[1], title: folderMatch[2], ownerUid: 'shared' });
            });
        }

        return el;
    }
};
