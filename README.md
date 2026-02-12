# donmitx.com

Professional project showcase platform with Google Sign-In, JWT sessions, and GitHub Pages hosting.

## Development

```bash
npm install
npm run dev
```

## Setup

### Firebase (Google Sign-In)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a project → enable Google Authentication
3. Copy your config into `src/firebase-config.js`
4. Add your domain to authorized domains in Firebase Auth settings

### GitHub Pages

1. Push to the `main` branch
2. Go to repo Settings → Pages → Source: GitHub Actions
3. Custom domain: `donmitx.com` (already configured via CNAME)

## Architecture

- **Frontend**: Vanilla JS + Vite
- **Auth**: Firebase (Google) + client-side JWT
- **Data**: JSON files in repo, updated via GitHub API
- **Hosting**: GitHub Pages
