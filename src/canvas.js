/**
 * donmitx — Particle Network Canvas Animation
 * 
 * Creates an interactive particle network effect with:
 * - Floating particles connected by proximity lines
 * - Mouse interaction (particles attracted to cursor)
 * - Smooth requestAnimationFrame loop
 * - Responsive canvas auto-resize
 */

export class ParticleCanvas {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 150 };
        this.animId = null;

        // Options with defaults
        this.config = {
            particleCount: options.particleCount || 80,
            particleColor: options.particleColor || 'rgba(163, 130, 250, 0.6)',
            lineColor: options.lineColor || 'rgba(99, 102, 241, 0.12)',
            particleSize: options.particleSize || { min: 1, max: 3 },
            speed: options.speed || 0.4,
            connectionDistance: options.connectionDistance || 150,
            mouseInteraction: options.mouseInteraction !== false,
            ...options
        };

        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        const count = Math.min(
            this.config.particleCount,
            Math.floor((this.canvas.width * this.canvas.height) / 12000)
        );

        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.config.speed,
                vy: (Math.random() - 0.5) * this.config.speed,
                size: this.config.particleSize.min + Math.random() * (this.config.particleSize.max - this.config.particleSize.min),
                opacity: 0.3 + Math.random() * 0.5,
                pulseSpeed: 0.005 + Math.random() * 0.01,
                pulsePhase: Math.random() * Math.PI * 2
            });
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });

        if (this.config.mouseInteraction) {
            this.canvas.parentElement.addEventListener('mousemove', (e) => {
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
            });

            this.canvas.parentElement.addEventListener('mouseleave', () => {
                this.mouse.x = null;
                this.mouse.y = null;
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update & draw particles
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];

            // Pulse opacity
            p.pulsePhase += p.pulseSpeed;
            const currentOpacity = p.opacity * (0.7 + 0.3 * Math.sin(p.pulsePhase));

            // Mouse interaction
            if (this.mouse.x !== null && this.config.mouseInteraction) {
                const dx = this.mouse.x - p.x;
                const dy = this.mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < this.mouse.radius) {
                    const force = (this.mouse.radius - dist) / this.mouse.radius;
                    p.vx += dx * force * 0.001;
                    p.vy += dy * force * 0.001;
                }
            }

            // Damping
            p.vx *= 0.99;
            p.vy *= 0.99;

            // Move
            p.x += p.vx;
            p.y += p.vy;

            // Wrap edges
            if (p.x < -10) p.x = this.canvas.width + 10;
            if (p.x > this.canvas.width + 10) p.x = -10;
            if (p.y < -10) p.y = this.canvas.height + 10;
            if (p.y > this.canvas.height + 10) p.y = -10;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = this.config.particleColor.replace('0.6', currentOpacity.toFixed(2));
            this.ctx.fill();

            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < this.config.connectionDistance) {
                    const opacity = (1 - dist / this.config.connectionDistance) * 0.3;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = this.config.lineColor.replace('0.12', opacity.toFixed(3));
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        }

        this.animId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animId) {
            cancelAnimationFrame(this.animId);
        }
    }
}
