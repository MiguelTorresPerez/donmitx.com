/**
 * donmitx — Social Dashboard Entry Point
 */

import { ParticleCanvas } from './canvas.js';
import { Auth } from './auth.js';
import { UI } from './ui.js';
import { ContentParser } from './content.js';
import {
    getFolders, createFolder, deleteFolder,
    getFolderItems, addItem, deleteItem,
    syncUserProfile, toggleLike, addComment
} from './db.js';

// --- State ---
let currentUser = null;
let currentTab = 'library'; // library, feed, social
let currentFolderId = null;

// --- Initialization ---

async function init() {
    // 1. Auth Check
    const session = Auth.getSession();
    if (!session) {
        window.location.href = '/index.html';
        return;
    }

    // 2. Load User Profile (Background Sync)
    currentUser = session;
    updateUserProfileUI(currentUser);

    // 3. UI Init
    initParticleCanvas();
    setupEventListeners();

    // 4. Initial Load
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
    document.getElementById('user-avatar').src = user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=random`;
    document.getElementById('settings-email').textContent = user.email;
    document.getElementById('settings-email').textContent = user.email;
    document.getElementById('auth-loading').style.display = 'none';

    // Admin Check
    if (user.superuser) {
        document.getElementById('nav-admin').classList.remove('hidden');
    }
}

// --- Navigation ---

function navigateToTab(tabName) {
    currentTab = tabName;

    // Update Tabs UI
    document.querySelectorAll('.nav-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    // Show Section
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(`view-${tabName}`).classList.remove('hidden');

    // Load Data
    if (tabName === 'library') loadLibrary();
    if (tabName === 'feed') loadFeed();
    if (tabName === 'social') loadSocial();
    if (tabName === 'admin') loadAdmin();
}

// --- Data Loading ---

async function loadAdmin() {
    if (!currentUser || !currentUser.superuser) return;

    const tbody = document.getElementById('admin-user-list');
    tbody.innerHTML = '<tr><td colspan="5" class="loading-cell">Loading users...</td></tr>';

    try {
        const { getAllUsers } = await import('./db.js');
        const users = await getAllUsers();

        tbody.innerHTML = '';
        users.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div class="user-cell">
                        <img src="${user.photoURL || 'https://ui-avatars.com/api/?name=' + (user.displayName || 'U')}" class="avatar-xs">
                        <span>${escapeHtml(user.displayName || 'User')}</span>
                    </div>
                </td>
                <td>${escapeHtml(user.email)}</td>
                <td><span class="badge ${user.role === 'admin' || user.superuser ? 'badge-admin' : 'badge-user'}">${user.role || (user.superuser ? 'Admin' : 'User')}</span></td>
                <td>${new Date(user.lastLogin).toLocaleDateString()}</td>
                <td>
                    <button class="btn-xs btn-outline" onclick="alert('Manage user: ${user.uid}')">Manage</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

    } catch (e) {
        console.error('Admin load error', e);
        tbody.innerHTML = '<tr><td colspan="5" class="error-cell">Failed to load users</td></tr>';
    }
}

// --- Data Loading ---

async function loadLibrary() {
    const grid = document.getElementById('folder-grid');
    grid.innerHTML = '<div class="loader"></div>';

    try {
        const folders = await getFolders(currentUser.uid);
        grid.innerHTML = '';

        if (folders.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <h3>No folders yet</h3>
                    <button class="btn-primary" onclick="document.querySelector('#btn-new-content').click()">+ Create Folder</button>
                </div>
            `;
            return;
        }

        folders.forEach(folder => {
            const card = UI.createFolderCard(folder, openFolder);
            grid.appendChild(card);
        });
    } catch (e) {
        console.error(e);
        grid.innerHTML = '<p class="error">Failed to load folders</p>';
    }
}

async function loadFeed() {
    const grid = document.getElementById('feed-grid');
    grid.innerHTML = '<div class="loader"></div>';

    try {
        // Feed shows PUBLIC folders for now
        const folders = await getFolders(null); // Null = Public
        grid.innerHTML = '';

        if (folders.length === 0) {
            grid.innerHTML = '<div class="empty-state">No public folders found. Be the first!</div>';
            return;
        }

        folders.forEach(folder => {
            const card = UI.createFolderCard(folder, openFolder);
            grid.appendChild(card);
        });
    } catch (e) {
        console.error(e);
        grid.innerHTML = '<p class="error">Failed to load feed</p>';
    }
}

function loadSocial() {
    // Phase 3 - Placeholder
    const area = document.getElementById('chat-area');
    area.innerHTML = `
        <div class="empty-state">
            <h3>Social Features Coming Soon</h3>
            <p>Friend requests and chat will be available in the next update.</p>
        </div>
    `;
}

// --- Folder Interaction ---

async function openFolder(folder) {
    currentFolderId = folder.id;

    // Switch UI to Items View (Inside Library)
    document.getElementById('folder-grid').classList.add('hidden');
    document.getElementById('folder-items-container').classList.remove('hidden');

    // Update Header
    document.getElementById('current-folder-title').textContent = folder.title;

    // Load Items
    const grid = document.getElementById('items-grid');
    grid.innerHTML = '<div class="loader"></div>';

    try {
        const items = await getFolderItems(folder.id);
        grid.innerHTML = '';

        if (items.length === 0) {
            grid.innerHTML = '<div class="empty-state">This folder is empty.</div>';
        }

        const isOwner = folder.ownerUid === currentUser.uid;

        items.forEach(item => {
            const card = UI.createItemCard(
                item,
                isOwner ? handleDeleteItem : null,
                handleLike,
                handleComment
            );
            grid.appendChild(card);
        });
    } catch (e) {
        console.error(e);
        grid.innerHTML = '<p class="error">Failed to load items</p>';
    }
}

async function handleLike(item) {
    try {
        await toggleLike(item.id, currentUser.uid);
    } catch (e) {
        console.error('Like failed', e);
    }
}

async function handleComment(item) {
    // MVP: Simple Prompt
    const text = prompt('Enter your comment:');
    if (!text || !text.trim()) return;

    try {
        await addComment(item.id, currentUser, text);
        alert('Comment added!');
        // Ideally refresh comments view or update local count
    } catch (e) {
        console.error('Comment failed', e);
        alert('Failed to add comment');
    }
}

function closeFolder() {
    currentFolderId = null;
    document.getElementById('folder-items-container').classList.add('hidden');
    document.getElementById('folder-grid').classList.remove('hidden');
    loadLibrary(); // Refresh
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

        // Refresh based on privacy
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

    // Parse Metadata
    const btn = document.getElementById('btn-save-item');
    btn.textContent = 'Parsing...';
    btn.disabled = true;

    try {
        const metadata = await ContentParser.parse(url);
        if (!metadata) throw new Error('Invalid URL');

        await addItem({ ...metadata, folderId }, currentUser);

        closeModal('modal-add-item');

        // Use timeout to allow UI to update if we are in that folder
        if (currentFolderId === folderId) {
            const folderMock = { id: folderId, title: document.getElementById('current-folder-title').textContent, ownerUid: currentUser.uid };
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
        // Refresh current folder view
        // Need to pass folder info usually, but we have global state currentFolderId
        // Re-fetching items...
        const folderMock = { id: currentFolderId, title: document.getElementById('current-folder-title').textContent, ownerUid: currentUser.uid };
        openFolder(folderMock);
    } catch (e) {
        alert('Delete failed');
    }
}

// --- Event Listeners ---

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-tab').forEach(btn => {
        btn.addEventListener('click', (e) => navigateToTab(e.target.dataset.tab));
    });

    // Modals
    document.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', () => closeModal(btn.dataset.close));
    });

    document.getElementById('btn-new-content').addEventListener('click', () => openModal('modal-new-content'));

    // Switcher Modal Handlers
    document.getElementById('opt-new-folder').addEventListener('click', () => {
        closeModal('modal-new-content');
        openModal('modal-create-folder');
    });

    document.getElementById('opt-new-link').addEventListener('click', async () => {
        closeModal('modal-new-content');

        // Populate folder select
        const select = document.getElementById('inp-item-folder');
        select.innerHTML = '<option>Loading...</option>';
        openModal('modal-add-item');

        const folders = await getFolders(currentUser.uid);
        select.innerHTML = folders.map(f => `<option value="${f.id}">${f.title}</option>`).join('');
    });

    // Forms
    document.getElementById('form-create-folder').addEventListener('submit', handleCreateFolder);
    document.getElementById('form-add-item').addEventListener('submit', handleSaveItem);

    // URL Preview Listener
    const urlInput = document.getElementById('inp-item-url');
    let timeout;
    urlInput.addEventListener('input', (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(async () => {
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

    // Folder Nav
    document.getElementById('btn-back-folders').addEventListener('click', closeFolder);

    // Settings
    document.getElementById('btn-settings').addEventListener('click', () => openModal('modal-settings'));
    document.getElementById('btn-logout').addEventListener('click', () => {
        localStorage.clear();
        window.location.href = '/index.html';
    });
}

function openModal(id) {
    document.getElementById(id).style.display = 'flex';
    setTimeout(() => document.getElementById(id).classList.add('visible'), 10);
}

function closeModal(id) {
    document.getElementById(id).classList.remove('visible');
    setTimeout(() => document.getElementById(id).style.display = 'none', 300);
}

// Run
init();
