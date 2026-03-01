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
    incrementView, getAllUsers, getAdminStats,
    getFriendsList, getFriendRequests, sendFriendRequest, acceptFriendRequest, rejectFriendRequest,
    createChat, getChats, getMessages, sendMessage, updateUserRole,
    addParticipantToChat, removeParticipantFromChat,
    getAllFolders, getAllItems,
    createGameRoom, joinGameRoom, listenToGameRoom, getActiveGameRooms,
    getAllGameRooms, deleteGameRoom
} from './db.js';
import { db, auth } from './firebase-init.js';
import { doc, onSnapshot, updateDoc, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';

// Expose safe API to same-origin game iframes
window.DONMITX_GAME_API = {
    db, auth, doc, onSnapshot, updateDoc, collection, addDoc, getDocs, query, orderBy, serverTimestamp
};

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

    // Check if we need to auto-load a game from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const playRoomId = urlParams.get('playRoomId');
    const playGameId = urlParams.get('playGameId');

    if (playRoomId && playGameId) {
        const gameModal = document.getElementById('modal-play-game');
        const modalInner = gameModal.querySelector('.modal');

        // Force the modal to be true fullscreen when opened via direct link
        gameModal.style.background = '#0f172a'; // Solid background to hide dashboard completely
        gameModal.style.backdropFilter = 'none';

        modalInner.style.width = '100vw';
        modalInner.style.maxWidth = '100vw';
        modalInner.style.height = '100vh';
        modalInner.style.maxHeight = '100vh';
        modalInner.style.margin = '0';
        modalInner.style.borderRadius = '0';
        modalInner.style.border = 'none';

        document.getElementById('game-iframe').src = `/games/${playGameId}/index.html?roomId=${playRoomId}`;
        openModal('modal-play-game');
    } else {
        navigateToTab('library');
    }
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
            const isOwner = folder.ownerUid === currentUser?.uid;
            const card = UI.createFolderCard(folder, openFolder, isOwner ? handleDeleteFolder : null, handleShareFolder);
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
        const folders = await getFolders(null, currentUser?.uid);
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
            const isOwner = folder.ownerUid === currentUser?.uid;
            const card = UI.createFolderCard(folder, (f) => {
                // Switch to library tab first so user sees the right context
                navigateToTab('library');
                openFolder(f);
            }, isOwner ? handleDeleteFolder : null, handleShareFolder);
            card.classList.add('card-enter');
            grid.appendChild(card);
        }
    } catch (e) {
        console.error('[donmitx] Feed load error:', e);
        grid.innerHTML = '<p class="error-msg">Failed to load feed.</p>';
    }
}

async function loadSocial() {
    const friendListEl = document.getElementById('friends-list');
    const requestsListEl = document.getElementById('requests-list');
    const requestsArea = document.getElementById('requests-area');
    const reqCountBadge = document.getElementById('req-count');

    // Reset Chat
    document.getElementById('chat-area').classList.remove('hidden');
    document.getElementById('chat-panel').classList.add('hidden');

    // 0. Load Active Chats
    const chatsListEl = document.getElementById('chats-list');
    chatsListEl.innerHTML = '<div class="loader-sm"></div>';
    try {
        const chats = await getChats(currentUser.uid);
        chatsListEl.innerHTML = '';
        if (chats.length === 0) {
            chatsListEl.innerHTML = '<p class="text-muted text-center" style="padding:10px; font-size:0.85rem;">No active chats</p>';
        } else {
            chats.forEach(chat => {
                chatsListEl.appendChild(UI.createChatCard(chat, openChatFromCard));
            });
        }
    } catch (e) {
        console.error('Chats load error:', e);
        chatsListEl.innerHTML = '<p class="error-msg">Failed to load chats</p>';
    }

    // 1. Load Friends
    friendListEl.innerHTML = '<div class="loader-sm"></div>';
    try {
        const friends = await getFriendsList(currentUser.uid);
        friendListEl.innerHTML = '';
        if (friends.length === 0) {
            friendListEl.innerHTML = '<p class="text-muted text-center" style="padding:20px">No friends yet. Search for users to add them!</p>';
        } else {
            friends.forEach(friend => {
                friendListEl.appendChild(UI.createFriendCard(friend, openChat));
            });
        }
    } catch (e) {
        console.error('Friends load error:', e);
        friendListEl.innerHTML = '<p class="error-msg">Failed to load friends</p>';
    }

    // 2. Load Requests
    try {
        const requests = await getFriendRequests(currentUser.uid);
        if (requests.length > 0) {
            requestsArea.classList.remove('hidden');
            reqCountBadge.textContent = requests.length;
            requestsListEl.innerHTML = '';
            requests.forEach(req => {
                requestsListEl.appendChild(UI.createFriendRequestCard(req, handleAcceptRequest, handleRejectRequest));
            });
        } else {
            requestsArea.classList.add('hidden');
        }
    } catch (e) {
        console.warn('Requests load error:', e);
    }
}

// --- Social Actions ---

async function handleSearchUsers(query) {
    const dropdown = document.getElementById('search-results-dropdown');
    dropdown.innerHTML = '<div class="loader-sm"></div>';
    dropdown.classList.remove('hidden');

    try {
        // Simple client-side filtering for now (simulated search)
        // In prod, use a dedicated search index (Algolia/Typesense) or Firestore array-contains
        const allUsers = await getAllUsers();
        const results = allUsers.filter(u =>
            u.uid !== currentUser.uid &&
            (u.displayName || '').toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5);

        dropdown.innerHTML = '';
        if (results.length === 0) {
            dropdown.innerHTML = '<p class="text-muted text-center" style="padding:10px">No users found</p>';
        } else {
            results.forEach(user => {
                dropdown.appendChild(UI.createSearchResultCard(user, handleSendRequest));
            });
        }
    } catch (e) {
        dropdown.innerHTML = '<p class="error-msg">Search failed</p>';
    }
}

async function handleSendRequest(user) {
    try {
        await sendFriendRequest(currentUser.uid, user.uid);
    } catch (e) {
        alert(e.message);
    }
}

async function handleAcceptRequest(req) {
    try {
        await acceptFriendRequest(req.id, req.fromUid, req.toUid);
        loadSocial(); // Refresh
    } catch (e) {
        console.error(e);
        alert('Failed to accept request');
    }
}

async function handleRejectRequest(req) {
    try {
        await rejectFriendRequest(req.id);
        loadSocial(); // Refresh
    } catch (e) {
        console.error(e);
    }
}

// --- Chat Logic ---

let currentChatId = null;
let messageUnsubscribe = null;

async function openChat(friend) {
    // UI Switch
    document.getElementById('chat-area').classList.add('hidden');
    const panel = document.getElementById('chat-panel');
    panel.classList.remove('hidden');

    // Helper: Mobile back button
    const backBtn = panel.querySelector('.btn-close-chat');
    backBtn.style.display = 'block'; // Ensure visible on mobile
    backBtn.onclick = () => {
        panel.classList.add('hidden');
        document.getElementById('chat-area').classList.remove('hidden');
    };

    // Header
    document.getElementById('chat-username').textContent = friend.displayName;
    document.getElementById('chat-subtitle').textContent = 'Direct Message';
    document.getElementById('chat-avatar').style.display = 'block';
    document.getElementById('chat-avatar').src = avatarUrl(friend);

    // Messages Container
    const msgContainer = document.getElementById('chat-messages');
    msgContainer.innerHTML = '<div class="loader-sm"></div>';

    // Create/Get Chat
    try {
        const chat = await createChat([currentUser.uid, friend.uid]);
        currentChatId = chat.id;

        // Load messages (Real-time listener would be better, using polling for now or just fetch once)
        // For accurate real-time, we'd need onSnapshot. Here we stick to async/await fetch as per db.js
        loadMessages(currentChatId);

    } catch (e) {
        console.error('Chat open error:', e);
        msgContainer.innerHTML = '<p class="error-msg">Failed to open chat</p>';
    }
}

async function openChatFromCard(chat) {
    document.getElementById('chat-area').classList.add('hidden');
    const panel = document.getElementById('chat-panel');
    panel.classList.remove('hidden');

    const backBtn = panel.querySelector('.btn-close-chat');
    backBtn.style.display = 'block';
    backBtn.onclick = () => {
        panel.classList.add('hidden');
        document.getElementById('chat-area').classList.remove('hidden');
    };

    document.getElementById('chat-username').textContent = chat.displayTitle;
    document.getElementById('chat-subtitle').textContent = chat.isGroup ? 'Group Chat' : 'Direct Message';
    document.getElementById('chat-avatar').style.display = 'none';

    currentChatId = chat.id;

    const msgContainer = document.getElementById('chat-messages');
    msgContainer.innerHTML = '<div class="loader-sm"></div>';

    try {
        loadMessages(currentChatId);
    } catch (e) {
        console.error('Chat open error:', e);
        msgContainer.innerHTML = '<p class="error-msg">Failed to open chat</p>';
    }
}

async function loadMessages(chatId) {
    const msgContainer = document.getElementById('chat-messages');
    const messages = await getMessages(chatId);

    msgContainer.innerHTML = '';
    if (messages.length === 0) {
        msgContainer.innerHTML = '<p class="text-muted text-center" style="margin-top:20px">No messages yet. Say hi! 👋</p>';
    } else {
        messages.forEach(msg => {
            const isOwn = msg.userId === currentUser.uid;
            msgContainer.appendChild(UI.createMessageBubble(msg, isOwn, openFolder));
        });
        // Scroll to bottom
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }
}

async function handleSendMessage(e) {
    e.preventDefault();
    const input = document.getElementById('inp-chat-msg');
    const text = input.value.trim();

    if (!text || !currentChatId) return;

    input.value = ''; // Optimistic clear

    try {
        await sendMessage(currentChatId, currentUser, text);

        // Append locally immediately
        const msgContainer = document.getElementById('chat-messages');
        const emptyMsg = msgContainer.querySelector('.text-muted');
        if (emptyMsg) emptyMsg.remove();

        msgContainer.appendChild(UI.createMessageBubble({
            text,
            timestamp: new Date().toISOString(),
            photoURL: currentUser.photoURL
        }, true, openFolder));

        msgContainer.scrollTop = msgContainer.scrollHeight;

    } catch (e) {
        console.error('Send failed:', e);
        alert('Failed to send message');
    }
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
                    <button class="btn-xs btn-outline btn-manage-user" data-uid="${user.uid}" data-current-role="${isAdmin ? 'admin' : 'user'}">
                        ${isAdmin ? 'Demote' : 'Promote'}
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        // Attach listeners to new manage buttons
        document.querySelectorAll('.btn-manage-user').forEach(btn => {
            btn.addEventListener('click', handleManageUser);
        });

    } catch (e) {
        console.error('[donmitx] Admin load error:', e);
        tbody.innerHTML = '<tr><td colspan="5" class="error-cell">Failed to load users</td></tr>';
    }

    // Load Folders for admin management
    const folderTbody = document.getElementById('admin-folder-list');
    folderTbody.innerHTML = '<tr><td colspan="5" class="loading-cell">Loading folders...</td></tr>';
    try {
        const folders = await getAllFolders();
        folderTbody.innerHTML = '';
        folders.forEach(folder => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${escapeHtml(folder.title || 'Untitled')}</td>
                <td>${escapeHtml(folder.ownerName || folder.ownerUid?.slice(0, 8) || '—')}</td>
                <td><span class="badge">${folder.privacy || 'private'}</span></td>
                <td>${folder.itemCount || 0}</td>
                <td>
                    <button class="btn-xs btn-outline btn-admin-delete-folder" data-id="${folder.id}">🗑️ Delete</button>
                </td>
            `;
            folderTbody.appendChild(tr);
        });
        document.querySelectorAll('.btn-admin-delete-folder').forEach(btn => {
            btn.addEventListener('click', async () => {
                if (!confirm('Delete this folder and all its items?')) return;
                try {
                    await deleteFolder(btn.dataset.id);
                    btn.closest('tr').remove();
                } catch (err) { alert('Delete failed: ' + err.message); }
            });
        });
    } catch (e) {
        console.error('[donmitx] Admin folders error:', e);
        folderTbody.innerHTML = '<tr><td colspan="5" class="error-cell">Failed to load folders</td></tr>';
    }

    // Load Items for admin management
    const itemTbody = document.getElementById('admin-item-list');
    itemTbody.innerHTML = '<tr><td colspan="5" class="loading-cell">Loading items...</td></tr>';
    try {
        const items = await getAllItems();
        itemTbody.innerHTML = '';
        items.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${escapeHtml(item.title || 'Untitled')}</td>
                <td><span class="badge">${item.type || 'link'}</span></td>
                <td>${escapeHtml(item.ownerName || item.ownerUid?.slice(0, 8) || '—')}</td>
                <td>${item.likes || 0}</td>
                <td>
                    <button class="btn-xs btn-outline btn-admin-delete-item" data-id="${item.id}">🗑️ Delete</button>
                </td>
            `;
            itemTbody.appendChild(tr);
        });
        document.querySelectorAll('.btn-admin-delete-item').forEach(btn => {
            btn.addEventListener('click', async () => {
                if (!confirm('Delete this item permanently?')) return;
                try {
                    await deleteItem(btn.dataset.id);
                    btn.closest('tr').remove();
                } catch (err) { alert('Delete failed: ' + err.message); }
            });
        });
    } catch (e) {
        console.error('[donmitx] Admin items error:', e);
        itemTbody.innerHTML = '<tr><td colspan="5" class="error-cell">Failed to load items</td></tr>';
    }

    // Load Game Rooms for admin management
    const roomTbody = document.getElementById('admin-gameroom-list');
    roomTbody.innerHTML = '<tr><td colspan="7" class="loading-cell">Loading game rooms...</td></tr>';
    try {
        const rooms = await getAllGameRooms();
        roomTbody.innerHTML = '';
        if (rooms.length === 0) {
            roomTbody.innerHTML = '<tr><td colspan="7" class="loading-cell">No game rooms found</td></tr>';
        }
        rooms.forEach(room => {
            const tr = document.createElement('tr');
            const playerCount = Object.keys(room.players || {}).length;
            const hostName = room.players?.[room.hostUid]?.name || room.hostUid?.slice(0, 8) || '—';
            const statusColors = { lobby: '#6366f1', playing: '#10b981', finished: '#64748b' };
            tr.innerHTML = `
                <td><code style="font-size:0.8rem">${room.id.slice(0, 8)}…</code></td>
                <td>${escapeHtml(room.gameId || '—')}</td>
                <td>${escapeHtml(hostName)}</td>
                <td>${playerCount}</td>
                <td><span class="badge" style="background:${statusColors[room.status] || '#64748b'}; color:white; padding:2px 8px; border-radius:8px; font-size:0.75rem;">${room.status || '—'}</span></td>
                <td>${room.createdAt ? timeAgo(room.createdAt) : '—'}</td>
                <td>
                    <button class="btn-xs btn-outline btn-admin-delete-room" data-id="${room.id}">🗑️ Delete</button>
                    <a href="/dashboard.html?playGameId=${room.gameId}&playRoomId=${room.id}" target="_blank" class="btn-xs btn-outline" style="text-decoration:none; display:inline-block; margin-left:4px;">↗️ New Tab</a>
                </td>
            `;
            roomTbody.appendChild(tr);
        });
        document.querySelectorAll('.btn-admin-delete-room').forEach(btn => {
            btn.addEventListener('click', async () => {
                if (!confirm('Delete this game room permanently?')) return;
                try {
                    await deleteGameRoom(btn.dataset.id);
                    btn.closest('tr').remove();
                } catch (err) { alert('Delete failed: ' + err.message); }
            });
        });
    } catch (e) {
        console.error('[donmitx] Admin game rooms error:', e);
        roomTbody.innerHTML = '<tr><td colspan="7" class="error-cell">Failed to load game rooms</td></tr>';
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

async function handleDeleteFolder(folder) {
    if (!confirm(`Are you sure you want to delete the folder "${folder.title}" and all its items?`)) return;
    try {
        await deleteFolder(folder.id);
        if (currentTab === 'library') loadLibrary();
        else if (currentTab === 'feed') loadFeed();
    } catch (e) {
        alert('Delete failed');
    }
}

async function handleShareFolder(folder) {
    const text = `[shared-folder:${folder.id}:${folder.title}]`;
    try {
        await navigator.clipboard.writeText(text);
        alert('Folder share link copied to clipboard! Paste it inside any chat.');
    } catch (e) {
        prompt('Copy this text and paste it in a chat to share the folder:', text);
    }
}

/** Admin Manage User Feature */
async function handleManageUser(e) {
    const btn = e.target;
    const uid = btn.dataset.uid;
    const currentRole = btn.dataset.currentRole;

    // Prevent self-demotion to avoid locking out the only admin
    if (uid === currentUser.uid) {
        alert("You cannot modify your own role from this interface.");
        return;
    }

    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (!confirm(`Are you sure you want to change this user's role to ${newRole.toUpperCase()}?`)) return;

    const originalText = btn.textContent;
    btn.textContent = '...';
    btn.disabled = true;

    try {
        await updateUserRole(uid, newRole);

        // Refresh admin list
        loadAdmin();
    } catch (err) {
        console.error('Failed to change role:', err);
        alert('Could not update user role. Ensure you have the permissions.');
        btn.textContent = originalText;
        btn.disabled = false;
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

    document.getElementById('opt-new-app').addEventListener('click', async () => {
        closeModal('modal-new-content');

        const select = document.getElementById('inp-item-folder');
        select.innerHTML = '<option>Loading...</option>';
        openModal('modal-add-item');

        const urlInput = document.getElementById('inp-item-url');
        urlInput.value = '';
        urlInput.dispatchEvent(new Event('input'));

        const folders = await getFolders(currentUser.uid);
        select.innerHTML = folders.map(f => `<option value="${f.id}">${escapeHtml(f.title)}</option>`).join('');
    });

    document.getElementById('opt-new-aichat').addEventListener('click', async () => {
        closeModal('modal-new-content');

        const select = document.getElementById('inp-item-folder');
        select.innerHTML = '<option>Loading...</option>';
        openModal('modal-add-item');

        const urlInput = document.getElementById('inp-item-url');
        urlInput.value = '/aichat/index.html';
        urlInput.dispatchEvent(new Event('input'));

        const folders = await getFolders(currentUser.uid);
        select.innerHTML = folders.map(f => `<option value="${f.id}">${escapeHtml(f.title)}</option>`).join('');
    });

    // Global: Play App handler (delegated)
    document.addEventListener('click', (e) => {
        const playBtn = e.target.closest('.btn-play-app');
        if (playBtn) {
            e.preventDefault();
            const appUrl = playBtn.dataset.appUrl;
            if (appUrl) {
                // If it's a known multiplayer game, open the native lobby instead
                if (appUrl.includes('/games/trivial/index.html')) {
                    openGameLobby('trivial', appUrl);
                } else if (appUrl.includes('/games/pokemon_sd/index.html')) {
                    openGameLobby('pokemon_sd', appUrl);
                } else {
                    document.getElementById('game-iframe').src = appUrl;
                    openModal('modal-play-game');
                }
            }
        }
    });

    // Clean up iframe when game modal closes
    document.getElementById('modal-play-game').addEventListener('click', (e) => {
        if (e.target.closest('[data-close]')) {
            document.getElementById('game-iframe').src = '';
        }
    });

    // --- GAME LOBBY LOGIC ---
    let currentLobbyGameId = null;
    let currentLobbyAppUrl = null;

    async function openGameLobby(gameId, appUrl) {
        currentLobbyGameId = gameId;
        currentLobbyAppUrl = appUrl;

        document.getElementById('lobby-game-title').textContent = gameId.toUpperCase();
        const list = document.getElementById('active-rooms-list');
        list.innerHTML = '<p class="text-muted">Loading rooms...</p>';

        openModal('modal-game-lobby');

        try {
            const rooms = await getActiveGameRooms(gameId);
            list.innerHTML = '';

            if (rooms.length === 0) {
                list.innerHTML = `
                    <div class="empty-state" style="padding: 20px 0;">
                        <div class="empty-icon">🎮</div>
                        <p>No active rooms found.</p>
                        <p style="font-size: 0.85rem; color: var(--text-muted);">Be the first to host one!</p>
                    </div>`;
                return;
            }

            rooms.forEach(room => {
                const playerCount = Object.keys(room.players || {}).length;
                const isPlaying = room.status === 'playing';
                const hasMe = currentUser && room.players[currentUser.uid];

                const div = document.createElement('div');
                div.className = 'chat-card'; // Reuse chat card styling for simplicity

                let actionBtn = '';
                const isStarted = room.status === 'playing' || room.status === 'teambuilder';
                if (hasMe) {
                    actionBtn = `<button class="btn-primary btn-sm btn-join-room" data-room-id="${room.id}" data-rejoin="true">Rejoin</button>`;
                } else if (isStarted) {
                    actionBtn = `<button class="btn-secondary btn-sm btn-join-room" data-room-id="${room.id}" data-spectator="true" style="background:var(--primary); color:white;">Spectate</button>`;
                } else if (playerCount < (room.config?.maxPlayers || 6)) {
                    actionBtn = `<button class="btn-primary btn-sm btn-join-room" data-room-id="${room.id}">Join</button>`;
                } else {
                    actionBtn = '<span class="badge">Full</span>';
                }

                const openNewTabBtn = `<a href="/dashboard.html?playGameId=${currentLobbyGameId}&playRoomId=${room.id}" target="_blank" class="btn-outline btn-sm" style="display:inline-block; margin-left:8px; text-decoration:none;" title="Open in New Tab">↗️ New Tab</a>`;

                div.innerHTML = `
                    <div class="chat-info" style="flex:1;">
                        <h4 style="margin:0; font-size:1rem;">Host: ${escapeHtml(room.players[room.hostUid]?.name || 'Unknown')}</h4>
                        <span class="text-muted" style="font-size:0.85rem;">Players: ${playerCount}/${room.config?.maxPlayers || 6} ${isPlaying ? '• Playing' : '• Lobby'}</span>
                    </div>
                    <div>
                        ${actionBtn}
                        ${openNewTabBtn}
                    </div>
                `;
                list.appendChild(div);
            });

            // Join Room
            document.querySelectorAll('.btn-join-room').forEach(btn => {
                btn.addEventListener('click', async (joinEvent) => {
                    const roomId = joinEvent.target.dataset.roomId;
                    const isRejoin = joinEvent.target.dataset.rejoin === 'true';
                    const isSpectator = joinEvent.target.dataset.spectator === 'true';

                    try {
                        joinEvent.target.textContent = isRejoin ? 'Rejoining...' : isSpectator ? 'Loading...' : 'Joining...';
                        joinEvent.target.disabled = true;

                        // Don't actually "join" if we are purely spectating an active game
                        if (!isRejoin && !isSpectator) {
                            await joinGameRoom(roomId, currentUser);
                        }

                        closeModal('modal-game-lobby');
                        document.getElementById('game-iframe').src = `${currentLobbyAppUrl}?roomId=${roomId}`;
                        openModal('modal-play-game');
                    } catch (err) {
                        console.error('Failed to join:', err);
                        alert('Could not join room.');
                        joinEvent.target.textContent = isRejoin ? 'Rejoin' : isSpectator ? 'Spectate' : 'Join';
                        joinEvent.target.disabled = false;
                    }
                });
            });

        } catch (e) {
            console.error('[donmitx] Failed to load lobby:', e);
            list.innerHTML = '<p class="error-msg">Failed to load active rooms.</p>';
        }
    }

    // Host Room
    document.getElementById('btn-create-room').addEventListener('click', async (e) => {
        if (!currentLobbyGameId) return;
        const btn = e.target;
        btn.textContent = 'Creating...';
        btn.disabled = true;

        try {
            const maxP = currentLobbyGameId === 'pokemon_sd' ? 2 : 6;
            const roomId = await createGameRoom(currentLobbyGameId, currentUser, { maxPlayers: maxP });
            closeModal('modal-game-lobby');
            document.getElementById('game-iframe').src = `${currentLobbyAppUrl}?roomId=${roomId}`;
            openModal('modal-play-game');
        } catch (err) {
            console.error('Failed to create room:', err);
            alert('Could not create room.');
        } finally {
            btn.textContent = '➕ Host Game';
            btn.disabled = false;
        }
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

    // Social
    const searchInput = document.getElementById('user-search-input');
    if (searchInput) {
        let searchDebounce;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchDebounce);
            searchDebounce = setTimeout(() => {
                const query = e.target.value.trim();
                if (query.length > 2) handleSearchUsers(query);
                else document.getElementById('search-results-dropdown').classList.add('hidden');
            }, 500);
        });
        // Hide dropdown on click outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.user-search-wrapper')) {
                document.getElementById('search-results-dropdown').classList.add('hidden');
            }
        });
    }

    const chatForm = document.getElementById('form-chat');
    if (chatForm) {
        chatForm.addEventListener('submit', handleSendMessage);
    }

    // Add friend to chat
    document.getElementById('btn-chat-add-user').addEventListener('click', async () => {
        if (!currentChatId) return;

        openModal('modal-add-to-chat');
        const listEl = document.getElementById('chat-friends-list');
        listEl.innerHTML = '<div class="loader-sm"></div>';

        try {
            const friends = await getFriendsList(currentUser.uid);
            listEl.innerHTML = '';
            if (friends.length === 0) {
                listEl.innerHTML = '<p class="text-muted text-center">No friends to add.</p>';
            } else {
                friends.forEach(f => {
                    const card = UI.createFriendCard(f, async () => {
                        try {
                            await addParticipantToChat(currentChatId, f.uid, currentUser.uid);
                            alert(`${f.displayName} added to chat!`);
                            closeModal('modal-add-to-chat');
                            loadSocial();
                            document.getElementById('chat-subtitle').textContent = 'Group Chat';
                        } catch (e) {
                            alert(e.message);
                        }
                    });
                    listEl.appendChild(card);
                });
            }
        } catch (e) {
            listEl.innerHTML = '<p class="error-msg">Failed to load friends</p>';
        }
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
