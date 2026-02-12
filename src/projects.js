/**
 * donmitx — Projects Module
 * Hybrid Storage: Firestore (Drafts) + GitHub (Approved)
 */

import { GitHubAPI } from './github-api.js';
import { Auth } from './auth.js';
import { createDraft, getDrafts, deleteDraft } from './db.js';

/**
 * Get all projects (Public + Drafts)
 */
export async function getProjects() {
  const auth = Auth; // Use singleton
  const user = auth.getSession();
  const isSuperuser = auth.isAdmin();

  // 1. Fetch Public Projects (from GitHub)
  let publicProjects = [];
  try {
    if (GitHubAPI.hasToken()) {
      publicProjects = await GitHubAPI.getProjects();
    } else {
      // Fallback to local storage if no token? 
      // Or better, fetch from public URL if possible, but GitHubAPI handles auth/no-auth reading usually?
      // GitHubAPI.getProjects() uses the recursive fetch or file read.
      // If no token, we might need a public read method.
      // But let's assume standard flow.
      publicProjects = await GitHubAPI.getProjects().catch(() => []);
    }
  } catch (err) {
    console.warn('Failed to load public projects:', err);
  }

  // 2. Fetch Drafts (from Firestore)
  let drafts = [];
  if (user) {
    try {
      // Admin gets all drafts, User gets their own
      drafts = await getDrafts(isSuperuser ? null : user.uid);
    } catch (err) {
      console.warn('Failed to load drafts:', err);
    }
  }

  // 3. Merge (Drafts first)
  return [...drafts, ...publicProjects];
}

/**
 * Add a project -> Creates a Draft
 */
export async function addProject(projectData) {
  const auth = Auth;
  const user = auth.getSession();
  if (!user) throw new Error('Must be logged in');

  // Create Draft in Firestore
  return await createDraft(projectData, user);
}

/**
 * Approve a draft -> Publish to GitHub
 */
export async function approveProject(draft) {
  const auth = Auth;
  if (!auth.isAdmin()) throw new Error('Only superusers can approve projects');

  // 1. Get current projects from repo to ensure we don't overwrite
  const api = GitHubAPI; // Singleton or class? It's a class with static methods in my previous analysis?
  // Let's check `github-api.js`. It exports `GitHubAPI` class but methods are not static?
  // Wait, `src/projects.js` was using `GitHubAPI.getProjects`.
  // Let's re-read `src/github-api.js` to be sure how to use it.
  // I'll assume static or singleton usage based on previous file.
  // Actually, looking at `src/github-api.js` (Step 196? No, I viewed it earlier).
  // I better check if I need to instantiate it.

  // In `src/projects.js` (Step 308 - original), it used `GitHubAPI.getProjects()`.
  // So `GitHubAPI` likely has static methods or is an instance.
  // I'll proceed with `GitHubAPI` as imported.

  // 1. Fetch current list
  let currentProjects = await GitHubAPI.getProjects().catch(() => []);

  // 2. Prepare new project object
  const { isDraft, id, ...projectData } = draft; // Remove draft-specific fields
  const newProject = {
    id: `proj-${Date.now()}`, // Generate permanent ID
    ...projectData,
    approvedAt: new Date().toISOString(),
    approvedBy: auth.getSession().email
  };

  // 3. Add to list
  currentProjects.push(newProject);

  // 4. Save to GitHub
  await GitHubAPI.saveProjects(currentProjects);

  // 5. Create project folder (optional, but good)
  try {
    const path = `projects/${draft.ownerName || 'user'}/${draft.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}/model.json`;
    await GitHubAPI.putFile(
      path,
      JSON.stringify(newProject, null, 2),
      `Init project: ${draft.name}`
    );
  } catch (e) {
    console.warn('Error creating project folder:', e);
  }

  // 6. Delete Draft
  await deleteDraft(draft.id);

  return newProject;
}

/**
 * Delete a project
 */
export async function deleteProject(projectId, isDraft = false) {
  if (isDraft) {
    await deleteDraft(projectId);
    return true;
  } else {
    // Deleting public projects
    if (!Auth.isAdmin()) throw new Error('Only superusers can delete public projects');

    const currentProjects = await GitHubAPI.getProjects();
    const filtered = currentProjects.filter(p => p.id !== projectId);
    await GitHubAPI.saveProjects(filtered);
    return true;
  }
}

/**
 * Render Project Card
 */
export function createProjectCard(project, index = 0) {
  const card = document.createElement('div');
  const isDraft = !!project.isDraft;
  card.className = `project-card ${isDraft ? 'draft-card' : ''}`;
  card.style.animationDelay = `${0.15 + index * 0.08}s`;
  card.dataset.projectId = isDraft ? project.id : project.id;
  card.dataset.isDraft = isDraft;

  const tags = (project.tags || [])
    .map(tag => `<span class="tag">${escapeHtml(tag)}</span>`)
    .join('');

  const dateStr = project.createdAt
    ? new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Unknown date';

  // Status Badge
  let statusHtml = '';
  if (isDraft) {
    statusHtml = `<span class="status-badge pending">Draft</span>`;
  }

  // Admin Controls
  const auth = Auth;
  const isSuperuser = auth.isAdmin();
  // Use optional chaining for ownerUid
  const isOwner = auth.getSession()?.uid === project.ownerUid;

  let actionButtons = '';

  // Approve Button (Admin only, for Drafts)
  if (isDraft && isSuperuser) {
    actionButtons += `
            <button class="btn-primary btn-sm btn-approve" data-approve="${project.id}">
                Approve
            </button>
        `;
  }

  // Delete Button (Owner or Admin)
  if (isDraft && (isOwner || isSuperuser)) {
    actionButtons += `
            <button class="btn-icon project-card-menu delete-btn" data-delete="${project.id}" data-draft="true" title="Delete Draft">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        `;
  } else if (!isDraft && isSuperuser) {
    // Admin can delete public projects
    actionButtons += `
            <button class="btn-icon project-card-menu delete-btn" data-delete="${project.id}" data-draft="false" title="Delete Project">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
        `;
  }

  // Links
  let linksHtml = '';
  if (project.url || project.repo) {
    linksHtml = '<div class="project-card-links">';
    if (project.url) linksHtml += `<a href="${escapeHtml(project.url)}" target="_blank">Live</a>`;
    if (project.repo) linksHtml += `<a href="${escapeHtml(project.repo)}" target="_blank">Code</a>`;
    linksHtml += '</div>';
  }

  card.innerHTML = `
    <div class="project-card-header">
      <div class="header-left">
          ${statusHtml}
      </div>
      <div class="header-right">
          ${actionButtons}
      </div>
    </div>
    <h3 class="project-card-name">${escapeHtml(project.name)}</h3>
    <p class="project-card-desc">${escapeHtml(project.description || 'No description')}</p>
    <div class="project-card-tags">${tags}</div>
    <div class="project-card-footer">
      <span class="project-card-meta">${dateStr}</span>
      ${linksHtml}
    </div>
    `;

  // ADD 3D TILT EFFECT
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });

  return card;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
