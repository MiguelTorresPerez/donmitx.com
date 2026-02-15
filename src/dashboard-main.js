/**
 * donmitx — Social Dashboard Entry Point
 */

import { ParticleCanvas } from './canvas.js';
import { Auth } from './auth.js';
import { UI } from './ui.js';
import { ContentParser } from './content.js';
import { escapeHtml, avatarUrl, timeAgo } from './utils.js';
import {
    getFolders, createFolder, deleteFolder,
    getFolderItems, addItem, deleteItem,
    syncUserProfile, toggleLike, addComment, getComments,
    incrementView, getAllUsers, getAdminStats
} from './db.js';

// --- State ---
let currentUser = null;
let currentTab = 'library';
let currentFolderId = null;

// --- Initialization ---

async function init() {
    const session = Auth.getSession();
    if (!session) {
        window.location.href = '/index.html';
        return;
    }

    currentUser = session;
    updateUserProfileUI(currentUser);

    initParticleCanvas();
    setupEventListeners();
    navigateToTab('library');
}

function initParticleCanvas() {
    new ParticleCanvas('particle-canvas', {
        particleCount: 40,
        connectionDistance: 100,
        speed: 0.15,
        particleColor: 'rgba(163, 130, 250, 0.2)',
        lineColor: 'rgba(163, 130, 250, 0.1)'
    });
}

function updateUserProfileUI(user) {
    document.getElementById('user-name').textContent = user.displayName || user.email;
    document.getElementById('user-avatar').src = avatarUrl(user);
    document.getElementById('settings-email').textContent = user.email;
    document.getElementById('auth-loading').style.display = 'none';

    // Admin tab visibility
    if (user.role === 'admin' || user.superuser) {
        document.getElementById('nav-admin').classList.remove('hidden');
    }
}

// --- Navigation ---

function navigateToTab(tabName) {
    currentTab = tabName;

    document.querySelectorAll('.nav-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    document.querySelectorAll('.view-section').forEach(sec => sec.classList.add('hidden'));
    const section = document.getElementById(`view-${tabName}`);
    if (section) {
        section.classList.remove('hidden');
        section.classList.add('view-enter');
        requestAnimationFrame(() => section.classList.remove('view-enter'));
    }

    if (tabName === 'library') loadLibrary();
    else if (tabName === 'feed') loadFeed();
    else if (tabName === 'social') loadSocial();
    else if (tabName === 'admin') loadAdmin();
}

// --- Data Loading ---

async function loadLibrary() {
    const grid = document.getElementById('folder-grid');
    UI.showSkeletons(grid, 4, 'folder');

    try {
        const folders = await getFolders(currentUser.uid);
        grid.innerHTML = '';

        if (folders.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📂</div>
                    <h3>No folders yet</h3>
                    <p>Create a folder to start organizing your links</p>
                    <button class="btn-primary" onclick="document.querySelector('#btn-new-content').click()">+ Create Folder</button>
                </div>
            `;
            return;
        }

        folders.forEach((folder, i) => {
            const card = UI.createFolderCard(folder, openFolder);
            card.style.animationDelay = `${i * 0.06}s`;
            card.classList.add('card-enter');
            grid.appendChild(card);
        });
    } catch (e) {
        console.error('[donmitx] Library load error:', e);
        grid.innerHTML = '<p class="error-msg">Failed to load folders. Please refresh.</p>';
    }
}

async function loadFeed() {
    const grid = document.getElementById('feed-grid');
    UI.showSkeletons(grid, 6, 'card');

    try {
        // Feed shows PUBLIC items across all folders
        const folders = await getFolders(null);
        grid.innerHTML = '';

        if (folders.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🌐</div>
                    <h3>Nothing here yet</h3>
                    <p>Be the first to share public content!</p>
                </div>
            `;
            return;
        }

        // Show public folders with their items
        for (const folder of folders) {
            const card = UI.createFolderCard(folder, openFolder);
            card.classList.add('card-enter');
            grid.appendChild(card);
        }
    } catch (e) {
        console.error('[donmitx] Feed load error:', e);
        grid.innerHTML = '<p class="error-msg">Failed to load feed.</p>';
    }
}

function loadSocial() {
    const area = document.getElementById('chat-area');
    area.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">💬</div>
            <h3>Social Features Coming Soon</h3>
            <p>Friend requests and chat will be available in the next update.</p>
        </div>
    `;
}

async function loadAdmin() {
    if (!currentUser || !(currentUser.role === 'admin' || currentUser.superuser)) return;

    const statsContainer = document.getElementById('admin-stats');
    const tbody = document.getElementById('admin-user-list');

    // Load stats
    try {
        const stats = await getAdminStats();
        statsContainer.innerHTML = '';
        statsContainer.appendChild(UI.createStatCard('Total Users', stats.totalUsers, '👥', 'linear-gradient(135deg, #6366f1, #8b5cf6)'));
        statsContainer.appendChild(UI.createStatCard('Total Folders', stats.totalFolders, '📁', 'linear-gradient(135deg, #06b6d4, #3b82f6)'));
        statsContainer.appendChild(UI.createStatCard('Total Items', stats.totalItems, '📄', 'linear-gradient(135deg, #10b981, #059669)'));
    } catch (e) {
        console.error('[donmitx] Stats error:', e);
    }

    // Load users
    tbody.innerHTML = '<tr><td colspan="5" class="loading-cell">Loading users...</td></tr>';

    try {
        const users = await getAllUsers();
        tbody.innerHTML = '';

        users.forEach(user => {
            const tr = document.createElement('tr');
            const isAdmin = user.role === 'admin' || user.superuser;

            tr.innerHTML = `
                <td>
                    <div class="user-cell">
                        <img src="${avatarUrl(user)}" class="avatar-xs" loading="lazy">
                        <span>${escapeHtml(user.displayName || 'User')}</span>
                    </div>
                </td>
                <td>${escapeHtml(user.email)}</td>
                <td><span class="badge ${isAdmin ? 'badge-admin' : 'badge-user'}">${isAdmin ? 'Admin' : 'User'}</span></td>
                <td>${user.lastLogin ? timeAgo(user.lastLogin) : '—'}</td>
                <td>
                    <button class="btn-xs btn-outline" data-manage-uid="${user.uid}">Manage</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (e) {
        console.error('[donmitx] Admin load error:', e);
        tbody.innerHTML = '<tr><td colspan="5" class="error-cell">Failed to load users</td></tr>';
    }
}

// --- Folder Interaction ---

async function openFolder(folder) {
    currentFolderId = folder.id;

    document.getElementById('folder-grid').classList.add('hidden');
    document.getElementById('folder-items-container').classList.remove('hidden');
    document.getElementById('current-folder-title').textContent = folder.title;

    const grid = document.getElementById('items-grid');
    UI.showSkeletons(grid, 4, 'card');

    try {
        const items = await getFolderItems(folder.id);
        grid.innerHTML = '';

        if (items.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📝</div>
                    <h3>Empty folder</h3>
                    <p>Add your first link to this folder</p>
                </div>
            `;
            return;
        }

        const isOwner = folder.ownerUid === currentUser.uid;

        items.forEach((item, i) => {
            // Inject like state
            item.isLikedByMe = (item.likedBy || []).includes(currentUser.uid);

            const card = UI.createItemCard(
                item,
                isOwner ? handleDeleteItem : null,
                handleLike,
                handleComment,
                handleView
            );
            card.style.animationDelay = `${i * 0.06}s`;
            card.classList.add('card-enter');
            grid.appendChild(card);
        });
    } catch (e) {
        console.error('[donmitx] Items load error:', e);
        grid.innerHTML = '<p class="error-msg">Failed to load items.</p>';
    }
}

// --- Social Interactions ---

async function handleLike(item) {
    try {
        await toggleLike(item.id, currentUser.uid);
    } catch (e) {
        console.error('[donmitx] Like failed:', e);
    }
}

async function handleView(item) {
    try {
        await incrementView(item.id);
        // Update local UI counter
        const card = document.querySelector(`[data-id="${item.id}"] .view-count .stat-count`);
        if (card) {
            const val = parseInt(card.textContent) || 0;
            card.textContent = String(val + 1);
        }
    } catch (e) {
        console.error('[donmitx] View increment failed:', e);
    }
}

async function handleComment(item) {
    // Open comment modal
    const modal = document.getElementById('modal-comments');
    const commentsList = document.getElementById('comments-list');
    const commentInput = document.getElementById('comment-input');
    const submitBtn = document.getElementById('btn-submit-comment');

    document.getElementById('comment-item-title').textContent = item.title;
    commentsList.innerHTML = '<div class="loader-sm"></div>';
    openModal('modal-comments');

    // Load existing comments
    try {
        const comments = await getComments(item.id);
        commentsList.innerHTML = '';
        if (comments.length === 0) {
            commentsList.innerHTML = '<p class="text-muted text-center">No comments yet. Be the first!</p>';
        } else {
            comments.forEach(c => commentsList.appendChild(UI.createCommentEl(c)));
        }
    } catch (e) {
        commentsList.innerHTML = '<p class="error-msg">Failed to load comments</p>';
    }

    // Handle submit
    const handler = async () => {
        const text = commentInput.value.trim();
        if (!text) return;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Posting...';

        try {
            await addComment(item.id, currentUser, text);
            commentInput.value = '';

            // Add comment to UI immediately
            const newComment = UI.createCommentEl({
                username: currentUser.displayName,
                photoURL: currentUser.photoURL,
                text,
                timestamp: new Date().toISOString()
            });
            const noComments = commentsList.querySelector('.text-muted');
            if (noComments) noComments.remove();
            commentsList.prepend(newComment);

            // Update card comment count
            const card = document.querySelector(`[data-id="${item.id}"] .btn-comment .stat-count`);
            if (card) {
                const val = parseInt(card.textContent) || 0;
                card.textContent = String(val + 1);
            }
        } catch (e) {
            console.error('[donmitx] Comment failed:', e);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Post';
        }
    };

    // Replace old listener
    submitBtn.replaceWith(submitBtn.cloneNode(true));
    document.getElementById('btn-submit-comment').addEventListener('click', handler);
    commentInput.onkeydown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handler(); } };
}

function closeFolder() {
    currentFolderId = null;
    document.getElementById('folder-items-container').classList.add('hidden');
    document.getElementById('folder-grid').classList.remove('hidden');
    loadLibrary();
}

// --- Actions ---

async function handleCreateFolder(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
        title: formData.get('title'),
        color: formData.get('color'),
        privacy: formData.get('privacy')
    };

    try {
        await createFolder(data, currentUser);
        closeModal('modal-create-folder');
        if (currentTab === 'library') loadLibrary();
        e.target.reset();
    } catch (err) {
        alert('Error creating folder: ' + err.message);
    }
}

async function handleSaveItem(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    const folderId = formData.get('folderId');

    const btn = document.getElementById('btn-save-item');
    btn.textContent = 'Parsing...';
    btn.disabled = true;

    try {
        const metadata = await ContentParser.parse(url);
        if (!metadata) throw new Error('Invalid URL');

        await addItem({ ...metadata, folderId }, currentUser);
        closeModal('modal-add-item');

        if (currentFolderId === folderId) {
            const folderMock = {
                id: folderId,
                title: document.getElementById('current-folder-title').textContent,
                ownerUid: currentUser.uid
            };
            openFolder(folderMock);
        }

        e.target.reset();
        document.getElementById('url-preview-area').classList.add('hidden');
    } catch (err) {
        alert('Error adding item: ' + err.message);
    } finally {
        btn.textContent = 'Save Link';
        btn.disabled = false;
    }
}

async function handleDeleteItem(itemId) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
        await deleteItem(itemId);
        const folderMock = {
            id: currentFolderId,
            title: document.getElementById('current-folder-title').textContent,
            ownerUid: currentUser.uid
        };
        openFolder(folderMock);
    } catch (e) {
        alert('Delete failed');
    }
}

// --- Event Listeners ---

function setupEventListeners() {
    // Navigation tabs
    document.querySelectorAll('.nav-tab').forEach(btn => {
        btn.addEventListener('click', (e) => navigateToTab(e.target.dataset.tab));
    });

    // Modal close buttons
    document.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', () => closeModal(btn.dataset.close));
    });

    // Backdrop click to close
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) closeModal(backdrop.id);
        });
    });

    // New content button
    document.getElementById('btn-new-content').addEventListener('click', () => openModal('modal-new-content'));

    // Content type switchers
    document.getElementById('opt-new-folder').addEventListener('click', () => {
        closeModal('modal-new-content');
        openModal('modal-create-folder');
    });

    document.getElementById('opt-new-link').addEventListener('click', async () => {
        closeModal('modal-new-content');

        const select = document.getElementById('inp-item-folder');
        select.innerHTML = '<option>Loading...</option>';
        openModal('modal-add-item');

        const folders = await getFolders(currentUser.uid);
        select.innerHTML = folders.map(f => `<option value="${f.id}">${escapeHtml(f.title)}</option>`).join('');
    });

    // Forms
    document.getElementById('form-create-folder').addEventListener('submit', handleCreateFolder);
    document.getElementById('form-add-item').addEventListener('submit', handleSaveItem);

    // URL Preview
    const urlInput = document.getElementById('inp-item-url');
    let debounceTimer;
    urlInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async () => {
            const url = e.target.value;
            if (url.length > 5) {
                const meta = await ContentParser.parse(url);
                if (meta) {
                    const preview = document.getElementById('url-preview-area');
                    preview.classList.remove('hidden');
                    document.getElementById('preview-title').textContent = meta.title;
                    document.getElementById('preview-type').textContent = meta.type;
                    const img = document.getElementById('preview-img');
                    if (meta.imageUrl) {
                        img.src = meta.imageUrl;
                        img.classList.remove('hidden');
                    } else {
                        img.classList.add('hidden');
                    }
                }
            }
        }, 800);
    });

    // Folder navigation
    document.getElementById('btn-back-folders').addEventListener('click', closeFolder);

    // Add item from folder view
    const addItemBtn = document.getElementById('btn-add-item-to-folder');
    if (addItemBtn) {
        addItemBtn.addEventListener('click', async () => {
            const select = document.getElementById('inp-item-folder');
            const folders = await getFolders(currentUser.uid);
            select.innerHTML = folders.map(f =>
                `<option value="${f.id}" ${f.id === currentFolderId ? 'selected' : ''}>${escapeHtml(f.title)}</option>`
            ).join('');
            openModal('modal-add-item');
        });
    }

    // Settings
    document.getElementById('btn-settings').addEventListener('click', () => openModal('modal-settings'));
    document.getElementById('btn-logout').addEventListener('click', () => {
        Auth.signOut();
        window.location.href = '/index.html';
    });
}

// --- Modal Utilities ---

function openModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = 'flex';
    requestAnimationFrame(() => {
        requestAnimationFrame(() => modal.classList.add('visible'));
    });
}

function closeModal(id) {
    const modal = document.getElementById(id);
    modal.classList.remove('visible');
    setTimeout(() => { modal.style.display = 'none'; }, 300);
}

// --- Run ---
init();
