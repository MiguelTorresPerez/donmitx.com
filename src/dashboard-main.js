/**
 * donmitx — Dashboard Page Entry Point
 */

import { ParticleCanvas } from './canvas.js';
import { Auth } from './auth.js';
import { GitHubAPI } from './github-api.js';
import { getProjects, addProject, deleteProject, approveProject, createProjectCard } from './projects.js';

// Route guard — must be authenticated
if (!Auth.requireAuth()) {
    throw new Error('Not authenticated');
}

// Initialize subtle canvas
const canvas = new ParticleCanvas('particle-canvas', {
    particleCount: 50,
    connectionDistance: 120,
    speed: 0.2,
    particleColor: 'rgba(163, 130, 250, 0.3)',
    lineColor: 'rgba(99, 102, 241, 0.06)'
});

// Load user info into topbar
const user = Auth.getSession();
if (user) {
    document.getElementById('user-name').textContent = user.displayName || user.email;
    const avatar = document.getElementById('user-avatar');
    avatar.src = user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.displayName || 'U')}&backgroundColor=6366f1`;
    avatar.alt = user.displayName || 'User';

    // Show superuser badge if applicable
    if (Auth.isAdmin()) {
        const badge = document.createElement('span');
        badge.className = 'status-badge approved';
        badge.style.marginLeft = '8px';
        badge.style.fontSize = '0.7em';
        badge.textContent = 'SUPERUSER';
        document.getElementById('user-name').appendChild(badge);
    }
}

// Logout button
document.getElementById('btn-logout').addEventListener('click', async () => {
    await Auth.signOut();
    window.location.href = '/';
});

// ---- Project Grid ----
const projectGrid = document.getElementById('project-grid');
const emptyState = document.getElementById('empty-state');

async function loadProjects() {
    try {
        const projects = await getProjects();
        renderProjects(projects);
    } catch (e) {
        console.error('Error loading projects:', e);
        projectGrid.innerHTML = `<div class="error-state">Failed to load projects: ${e.message}</div>`;
    }
}

function renderProjects(projects) {
    projectGrid.innerHTML = '';

    if (projects.length === 0) {
        emptyState.classList.remove('hidden');
        projectGrid.classList.add('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    projectGrid.classList.remove('hidden');

    projects.forEach((project, index) => {
        const card = createProjectCard(project, index);
        projectGrid.appendChild(card);
    });

    // Bind delete buttons
    projectGrid.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const id = btn.dataset.delete;
            const isDraft = btn.dataset.draft === 'true'; // Check if it's a draft

            if (confirm(`Delete this ${isDraft ? 'draft' : 'project'}?`)) {
                try {
                    await deleteProject(id, isDraft);
                    await loadProjects();
                } catch (err) {
                    alert('Delete failed: ' + err.message);
                }
            }
        });
    });

    // Bind approve buttons (Admin only)
    projectGrid.querySelectorAll('.btn-approve').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const id = btn.dataset.approve;
            const btnEl = e.target;

            // Get latest projects to find current state of draft
            const currentProjects = await getProjects();
            const draft = currentProjects.find(p => p.id === id);

            if (!draft) {
                alert('Draft not found! Only drafts can be approved.');
                return;
            }

            if (confirm(`Approve "${draft.name}" and publish to GitHub?\nThis will create a public record and a project folder.`)) {
                btnEl.disabled = true;
                btnEl.textContent = 'Publishing...';
                try {
                    await approveProject(draft);
                    alert('Project approved and published successfully!');
                    await loadProjects();
                } catch (err) {
                    console.error(err);
                    alert('Approval failed: ' + err.message);
                    btnEl.disabled = false;
                    btnEl.textContent = 'Approve';
                }
            }
        });
    });
}

// ---- Search ----
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', async () => {
    const query = searchInput.value.toLowerCase().trim();
    const projects = await getProjects();

    if (!query) {
        renderProjects(projects);
        return;
    }

    const filtered = projects.filter(p =>
        (p.name || '').toLowerCase().includes(query) ||
        (p.description || '').toLowerCase().includes(query) ||
        (p.tags || []).some(t => t.toLowerCase().includes(query))
    );

    renderProjects(filtered);
});

// ---- Add Project Modal ----
const modalOverlay = document.getElementById('modal-overlay');
const btnAddProject = document.getElementById('btn-add-project');
const btnModalClose = document.getElementById('btn-modal-close');
const btnCancelProject = document.getElementById('btn-cancel-project');
const formAddProject = document.getElementById('form-add-project');

function openModal() {
    modalOverlay.classList.remove('hidden');
    document.getElementById('project-name').focus();
}

function closeModal() {
    modalOverlay.classList.add('hidden');
    formAddProject.reset();
}

btnAddProject.addEventListener('click', openModal);
btnModalClose.addEventListener('click', closeModal);
btnCancelProject.addEventListener('click', closeModal);

// ---- Settings Modal ----
const modalSettings = document.getElementById('modal-settings');
const btnSettings = document.getElementById('btn-settings');
const btnSettingsClose = document.getElementById('btn-settings-close');
const btnSettingsCancel = document.getElementById('btn-settings-cancel');
const formSettings = document.getElementById('form-settings');
const githubTokenInput = document.getElementById('github-token');

function openSettings() {
    modalOverlay.classList.remove('hidden');
    modalSettings.classList.remove('hidden');
    // Pre-fill token if exists
    const token = localStorage.getItem('donmitx_gh_token');
    if (token) githubTokenInput.value = token;
    githubTokenInput.focus();
}

function closeSettings() {
    modalOverlay.classList.add('hidden');
    modalSettings.classList.add('hidden');
}

btnSettings.addEventListener('click', openSettings);
btnSettingsClose.addEventListener('click', closeSettings);
btnSettingsCancel.addEventListener('click', closeSettings);

// Handle overlay click for both modals
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal(); // Close project modal
        closeSettings(); // Close settings modal
    }
});

// Settings submit
formSettings.addEventListener('submit', (e) => {
    e.preventDefault();
    const token = githubTokenInput.value.trim();
    if (token) {
        localStorage.setItem('donmitx_gh_token', token);
        GitHubAPI.setToken(token); // Update API instance immediately
        alert('GitHub Token saved successfully!');
        closeSettings();
        // Refresh projects to use the new token
        loadProjects();
    } else {
        localStorage.removeItem('donmitx_gh_token');
        alert('GitHub Token removed.');
        closeSettings();
    }
});

// Escape key for both
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (!modalOverlay.classList.contains('hidden')) {
            closeModal();
            closeSettings();
        }
    }
});


// Form submit
formAddProject.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('project-name').value.trim();
    const description = document.getElementById('project-description').value.trim();
    const tagsRaw = document.getElementById('project-tags').value.trim();
    const url = document.getElementById('project-url').value.trim();
    const repo = document.getElementById('project-repo').value.trim();

    if (!name) return;

    const tags = tagsRaw
        ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean)
        : [];

    const project = {
        name,
        description,
        tags,
        url: url || null, // Firestore doesn't accept undefined
        repo: repo || null,
        // Owner info injected by db/auth logic
    };

    // Disable form during submit
    const submitBtn = formAddProject.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Saving Draft...';

    try {
        await addProject(project);
        alert('Draft saved! Waiting for admin approval.');
        closeModal();
        await loadProjects();
    } catch (error) {
        console.error('[donmitx] Error creating project:', error);
        alert('Failed to save draft. ' + error.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create Project';
    }
});

// Initial load
loadProjects();
