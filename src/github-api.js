/**
 * donmitx — GitHub API Integration
 * 
 * Provides methods to:
 * - Read project data from the repo
 * - Write/commit project files to subfolders
 * - Manage user database (users.json)
 * 
 * All operations use the GitHub REST API.
 * Token is stored client-side only (never committed to repo).
 */

const REPO_OWNER = 'MiguelTorresPerez';
const REPO_NAME = 'donmitx.com';
const API_BASE = 'https://api.github.com';

/**
 * GitHub API client
 */
export const GitHubAPI = {
    _token: null,

    /**
     * Set the GitHub personal access token
     * This is stored only in the browser, never in the repo.
     */
    setToken(token) {
        this._token = token;
        localStorage.setItem('donmitx_gh_token', token);
    },

    /**
     * Get stored token
     */
    getToken() {
        if (!this._token) {
            this._token = localStorage.getItem('donmitx_gh_token');
        }
        return this._token;
    },

    /**
     * Check if GitHub token is available
     */
    hasToken() {
        return !!this.getToken();
    },

    /**
     * Make an authenticated API request
     */
    async request(endpoint, options = {}) {
        const token = this.getToken();
        const headers = {
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            ...options.headers
        };

        const response = await fetch(`${API_BASE}${endpoint}`, {
            ...options,
            headers
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || `GitHub API error: ${response.status}`);
        }

        return response.json();
    },

    /**
     * Get file content from the repo
     */
    async getFile(path) {
        try {
            const data = await this.request(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`);
            return {
                content: atob(data.content),
                sha: data.sha,
                path: data.path
            };
        } catch (error) {
            if (error.message.includes('404')) {
                return null; // File doesn't exist
            }
            throw error;
        }
    },

    /**
     * Create or update a file in the repo
     */
    async putFile(path, content, message, sha = null) {
        const body = {
            message,
            content: btoa(unescape(encodeURIComponent(content))),
            ...(sha ? { sha } : {})
        };

        return this.request(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`, {
            method: 'PUT',
            body: JSON.stringify(body)
        });
    },

    /**
     * Get list of projects from data/projects.json
     */
    async getProjects() {
        try {
            const file = await this.getFile('data/projects.json');
            if (!file) return [];
            return JSON.parse(file.content);
        } catch {
            return [];
        }
    },

    /**
     * Save projects list
     */
    async saveProjects(projects, sha = null) {
        // Get current sha if not provided
        if (!sha) {
            const existing = await this.getFile('data/projects.json');
            sha = existing?.sha || null;
        }

        return this.putFile(
            'data/projects.json',
            JSON.stringify(projects, null, 2),
            `Update projects list [${new Date().toISOString()}]`,
            sha
        );
    },

    /**
     * Add a new project
     */
    async addProject(project) {
        const projects = await this.getProjects();
        const existing = await this.getFile('data/projects.json');

        project.id = project.id || `proj-${Date.now()}`;
        project.createdAt = project.createdAt || new Date().toISOString();
        projects.push(project);

        await this.saveProjects(projects, existing?.sha);
        return project;
    },

    /**
     * Get users database
     */
    async getUsers() {
        try {
            const file = await this.getFile('data/users.json');
            if (!file) return [];
            return JSON.parse(file.content);
        } catch {
            return [];
        }
    },

    /**
     * Register or update user in the database
     */
    async upsertUser(userData) {
        const users = await this.getUsers();
        const existing = await this.getFile('data/users.json');

        const index = users.findIndex(u => u.uid === userData.uid);
        if (index >= 0) {
            users[index] = { ...users[index], ...userData, lastLogin: new Date().toISOString() };
        } else {
            users.push({
                ...userData,
                joinedAt: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
                projects: []
            });
        }

        await this.putFile(
            'data/users.json',
            JSON.stringify(users, null, 2),
            `Update users [${new Date().toISOString()}]`,
            existing?.sha
        );

        return users;
    },

    /**
     * Create project subfolder with an index file
     */
    async createProjectFolder(username, projectName, projectData) {
        const folderPath = `projects/${username}/${projectName}`;
        const readme = `# ${projectData.name || projectName}\n\n${projectData.description || ''}\n\nCreated: ${new Date().toISOString()}\n`;

        await this.putFile(
            `${folderPath}/README.md`,
            readme,
            `Create project: ${projectName}`
        );

        return folderPath;
    },

    /**
     * List project subfolders for a user
     */
    async listUserProjects(username) {
        try {
            const data = await this.request(
                `/repos/${REPO_OWNER}/${REPO_NAME}/contents/projects/${username}`
            );
            return data.filter(item => item.type === 'dir').map(item => item.name);
        } catch {
            return [];
        }
    }
};
