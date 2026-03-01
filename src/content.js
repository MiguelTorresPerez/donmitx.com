/**
 * donmitx — Content Strategy Engine
 * Robust URL parsing using Strategy Pattern.
 */

export const ContentType = {
    AI_CHAT: 'ai_chat',
    VIDEO: 'video',
    SOCIAL: 'social',
    CODE: 'code',
    ARTICLE: 'article',
    APP: 'app',
    LINK: 'link'
};

// --- Strategies ---

class AIStrategy {
    canHandle(url) {
        try {
            if (url.startsWith('/aichat/')) return true;
            return /(?:^|\.)(?:chatgpt|openai|gemini\.google|deepseek|claude)\./i.test(new URL(url).hostname);
        } catch (e) { return false; }
    }
    parse(url) {
        let title = 'AI Match';
        let imageUrl = '';

        if (url.startsWith('/aichat/')) {
            return { type: ContentType.AI_CHAT, title: 'AI Chat Room', imageUrl, summary: 'Multiplayer AI Chat Assistant' };
        }

        if (url.includes('chatgpt')) {
            title = 'ChatGPT Conversation';
            imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg';
        } else if (url.includes('gemini')) {
            title = 'Gemini Chat';
            imageUrl = 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg';
        } else if (url.includes('claude')) {
            title = 'Claude Chat';
            imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/7/74/Claude-logo-icon.svg';
        }

        return { type: ContentType.AI_CHAT, title, imageUrl, summary: 'Shared AI Conversation' };
    }
}

class VideoStrategy {
    canHandle(url) {
        try {
            return /(?:^|\.)(?:youtube\.com|youtu\.be|vimeo\.com|loom\.com)$/i.test(new URL(url).hostname);
        } catch (e) { return false; }
    }
    parse(url) {
        let imageUrl = '';
        let title = 'Video';

        // YouTube
        const ytMatch = url.match(/(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
        if (ytMatch && ytMatch[1].length === 11) {
            imageUrl = `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
            title = 'YouTube Video';
        }

        return { type: ContentType.VIDEO, title, imageUrl, summary: 'Watch this video' };
    }
}

class SocialStrategy {
    canHandle(url) {
        try {
            const h = new URL(url).hostname;
            return /(?:^|\.)(?:twitter\.com|x\.com|linkedin\.com|reddit\.com|instagram\.com)$/i.test(h);
        } catch (e) { return false; }
    }
    parse(url) {
        let title = 'Social Post';
        let imageUrl = '';

        if (url.includes('twitter') || url.includes('x.com')) {
            title = 'X (Twitter) Post';
            imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg';
        } else if (url.includes('linkedin')) {
            title = 'LinkedIn Post';
            imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png';
        }

        return { type: ContentType.SOCIAL, title, imageUrl, summary: 'Social media content' };
    }
}

class CodeStrategy {
    canHandle(url) {
        try {
            const h = new URL(url).hostname;
            return /(?:^|\.)(?:github\.com|gitlab\.com|codepen\.io)$/i.test(h) || h === 'gist.github.com';
        } catch (e) { return false; }
    }
    parse(url) {
        let title = 'Code Repository';
        let imageUrl = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';

        if (url.includes('gist')) title = 'GitHub Gist';
        if (url.includes('codepen')) title = 'CodePen Snippet';

        return { type: ContentType.CODE, title, imageUrl, summary: 'Code snippet or repository' };
    }
}

class AppStrategy {
    canHandle(url) {
        return url.startsWith('/games/') || url.includes('app=true');
    }
    parse(url) {
        return { type: ContentType.APP, title: 'Interactive App', imageUrl: 'https://cdn-icons-png.flaticon.com/512/13/13973.png', summary: 'Playable Mini-Game' };
    }
}

class DefaultStrategy {
    canHandle() { return true; }
    parse(url) {
        try {
            const domain = new URL(url).hostname.replace('www.', '');
            return {
                type: ContentType.LINK,
                title: domain,
                // High-res Google Favicon
                imageUrl: `https://www.google.com/s2/favicons?domain=${domain}&sz=256`,
                summary: 'Web Link'
            };
        } catch (e) {
            return { type: ContentType.LINK, title: 'Link', imageUrl: '', summary: '' };
        }
    }
}

// --- Context Manager ---

export const ContentParser = {
    strategies: [
        new AppStrategy(),
        new AIStrategy(),
        new VideoStrategy(),
        new SocialStrategy(),
        new CodeStrategy(),
        new DefaultStrategy() // Fallback
    ],

    parse(url) {
        try {
            const cleanUrl = url.trim();
            if (!cleanUrl.startsWith('http') && !cleanUrl.startsWith('/')) return null; // Invalid

            for (const strategy of this.strategies) {
                if (strategy.canHandle(cleanUrl)) {
                    const metadata = strategy.parse(cleanUrl);
                    return { url: cleanUrl, ...metadata };
                }
            }
        } catch (e) {
            console.error('Content parsing error:', e);
            return null;
        }
    }
};
