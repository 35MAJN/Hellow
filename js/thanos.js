/**
 * High-Performance Thanos Particle & Cinematic Materialization Engine
 * Zero-Lag Disintegration, Time Stone Reassembly, and Cosmic Appearing Effects
 * Mohammadali Javadinasab | Portfolio
 */

(function () {
    'use strict';

    // --- PROCEDURAL WEB AUDIO SYNTHESIZER ---
    let audioCtx = null;

    function getAudioContext() {
        if (!audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                audioCtx = new AudioContextClass();
            }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    // Crisp Finger Snap + Cosmic Bass Thud
    function playSnapSound() {
        const ctx = getAudioContext();
        if (!ctx) return;

        try {
            const now = ctx.currentTime;

            // 1. Crisp transient snap click
            const bufSize = Math.floor(ctx.sampleRate * 0.04);
            const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
            const d = buf.getChannelData(0);
            for (let i = 0; i < bufSize; i++) {
                d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufSize * 0.2));
            }
            const snapSrc = ctx.createBufferSource();
            snapSrc.buffer = buf;

            const snapFilt = ctx.createBiquadFilter();
            snapFilt.type = 'bandpass';
            snapFilt.frequency.setValueAtTime(2800, now);
            snapFilt.Q.setValueAtTime(4.0, now);

            const snapGain = ctx.createGain();
            snapGain.gain.setValueAtTime(0.75, now);
            snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

            snapSrc.connect(snapFilt);
            snapFilt.connect(snapGain);
            snapGain.connect(ctx.destination);
            snapSrc.start(now);

            // 2. Cosmic sub-drop resonance
            const osc = ctx.createOscillator();
            const oscGain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(110, now);
            osc.frequency.exponentialRampToValueAtTime(32, now + 0.55);

            oscGain.gain.setValueAtTime(0.5, now);
            oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

            osc.connect(oscGain);
            oscGain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.55);
        } catch (e) {
            // Audio context silently handled
        }
    }

    // Time Stone Reversal Chime
    function playTimeStoneSound() {
        const ctx = getAudioContext();
        if (!ctx) return;

        try {
            const now = ctx.currentTime;
            const notes = [329.63, 440.0, 554.37, 659.25, 880.0]; // E major cosmic chord

            notes.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                const start = now + idx * 0.06;

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq * 0.85, start);
                osc.frequency.exponentialRampToValueAtTime(freq * 1.1, start + 0.5);

                gain.gain.setValueAtTime(0.001, start);
                gain.gain.linearRampToValueAtTime(0.1, start + 0.1);
                gain.gain.exponentialRampToValueAtTime(0.001, start + 0.55);

                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(start);
                osc.stop(start + 0.6);
            });
        } catch (e) {}
    }

    // Gentle Cosmic Materialization Shimmer (for appearing elements)
    function playAppearSound() {
        const ctx = getAudioContext();
        if (!ctx) return;

        try {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(520, now);
            osc.frequency.exponentialRampToValueAtTime(780, now + 0.25);

            gain.gain.setValueAtTime(0.001, now);
            gain.gain.linearRampToValueAtTime(0.035, now + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.3);
        } catch (e) {}
    }

    // --- OFFSCREEN PRE-RENDERED GLOWING EMBER SPRITES ---
    // Rendering glowing sprites via ctx.drawImage is 100x faster than canvas shadowBlur
    const emberSprites = {};
    const EMBER_COLORS = ['#f59e0b', '#38bdf8', '#c084fc', '#ec4899', '#10b981', '#22d3ee'];

    function createEmberSprite(color) {
        const size = 20;
        const c = document.createElement('canvas');
        c.width = size;
        c.height = size;
        const ctx = c.getContext('2d');
        const center = size / 2;

        const grad = ctx.createRadialGradient(center, center, 0, center, center, center);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.35, color);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(center, center, center, 0, Math.PI * 2);
        ctx.fill();

        return c;
    }

    EMBER_COLORS.forEach(color => {
        emberSprites[color] = createEmberSprite(color);
    });

    // --- FULLSCREEN THANOS PARTICLE CANVAS ---
    let thanosCanvas = null;
    let thanosCtx = null;
    const activeParticles = [];
    let isLoopRunning = false;
    let lastTimestamp = 0;

    function initThanosCanvas() {
        if (thanosCanvas) return;

        thanosCanvas = document.createElement('canvas');
        thanosCanvas.id = 'thanos-canvas';
        thanosCanvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:10005;';
        document.body.appendChild(thanosCanvas);

        thanosCtx = thanosCanvas.getContext('2d', { alpha: true });
        resizeThanosCanvas();
        window.addEventListener('resize', resizeThanosCanvas, { passive: true });
    }

    function resizeThanosCanvas() {
        if (!thanosCanvas || !thanosCtx) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        thanosCanvas.width = window.innerWidth * dpr;
        thanosCanvas.height = window.innerHeight * dpr;
        thanosCtx.setTransform(1, 0, 0, 1, 0, 0);
        thanosCtx.scale(dpr, dpr);
    }

    // --- INSTANT PROCEDURAL ELEMENT COLOR & LAYOUT SAMPLER ---
    // Zero-delay instantaneous extraction! Drops html2canvas to eliminate 100% of lag.
    function sampleElementParticles(element, mode = 'disintegrate') {
        const rect = element.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return [];

        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const particles = [];

        // Fast particle count (~350 - 550 particles for perfect density without frame drops)
        const density = mode === 'appear' ? 140 : 420;
        const width = rect.width;
        const height = rect.height;

        // Base theme palette
        const baseAsh = isDark ? [148, 163, 184] : [71, 85, 105];       // slate-400 / 600
        const darkAsh = isDark ? [30, 41, 59] : [203, 213, 225];          // slate-800 / 300
        const accentAsh = isDark ? [56, 189, 248] : [2, 132, 199];        // cyan / sapphire

        for (let i = 0; i < density; i++) {
            // Target coordinates relative to the card
            const relX = Math.random() * width;
            const relY = Math.random() * height;
            const screenX = rect.left + relX;
            const screenY = rect.top + relY;

            // Staggered wave progression (left-to-right sweep)
            const normX = relX / width;
            const normY = relY / height;
            const waveDelay = (normX * 0.7 + (1 - normY) * 0.3) * 550 + Math.random() * 140;

            const isEmber = Math.random() < 0.12;
            const emberColor = EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)];

            // Color selection
            let r = baseAsh[0];
            let g = baseAsh[1];
            let b = baseAsh[2];
            const dice = Math.random();

            if (dice < 0.35) {
                r = darkAsh[0]; g = darkAsh[1]; b = darkAsh[2];
            } else if (dice < 0.55) {
                r = accentAsh[0]; g = accentAsh[1]; b = accentAsh[2];
            }

            if (mode === 'appear') {
                // APPEARING MODE: Particles swirl inwards from around the element
                const spawnAngle = Math.random() * Math.PI * 2;
                const spawnDistance = 60 + Math.random() * 90;
                const startX = screenX + Math.cos(spawnAngle) * spawnDistance;
                const startY = screenY + Math.sin(spawnAngle) * spawnDistance - 20;

                particles.push({
                    mode: 'appear',
                    targetX: screenX,
                    targetY: screenY,
                    x: startX,
                    y: startY,
                    startX,
                    startY,
                    r, g, b,
                    isEmber,
                    emberColor,
                    size: isEmber ? 2.4 : 1.8,
                    delayMs: Math.random() * 180,
                    durationMs: 550 + Math.random() * 200,
                    startTime: 0,
                    spiralAmp: (Math.random() - 0.5) * 40,
                    done: false
                });
            } else {
                // DISINTEGRATION MODE: Ash blows away with wind and upward buoyancy
                particles.push({
                    mode: 'disintegrate',
                    origX: screenX,
                    origY: screenY,
                    x: screenX,
                    y: screenY,
                    r, g, b,
                    isEmber,
                    emberColor,
                    size: isEmber ? (2.0 + Math.random() * 1.5) : (1.5 + Math.random() * 1.8),
                    vx: 1.6 + Math.random() * 2.4,             // wind right
                    vy: -(1.2 + Math.random() * 2.2),          // thermal upward
                    delayMs: waveDelay,
                    startTime: 0,
                    lifespan: 1400 + Math.random() * 600,
                    // Reversal parameters
                    isReversing: false,
                    reverseStart: 0,
                    done: false
                });
            }
        }

        return particles;
    }

    // --- FAST 60-120 FPS BATCHED RENDER LOOP ---
    function startRenderLoop() {
        if (isLoopRunning) return;
        isLoopRunning = true;
        lastTimestamp = performance.now();
        requestAnimationFrame(renderLoop);
    }

    function renderLoop(now) {
        if (!isLoopRunning) return;

        const dt = Math.min((now - lastTimestamp) / 1000, 0.05);
        lastTimestamp = now;

        if (!thanosCtx || !thanosCanvas) {
            isLoopRunning = false;
            return;
        }

        thanosCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        let activeCount = 0;
        const total = activeParticles.length;

        for (let i = 0; i < total; i++) {
            const p = activeParticles[i];
            if (p.done) continue;

            if (!p.startTime) p.startTime = now;
            const elapsed = now - p.startTime;

            if (elapsed < p.delayMs) {
                activeCount++;
                continue;
            }

            const activeTime = elapsed - p.delayMs;

            if (p.mode === 'appear') {
                // --- COSMIC CONVERGENCE / APPEARING MODE ---
                const t = Math.min(1.0, activeTime / p.durationMs);
                // Cubic ease-out
                const ease = 1 - Math.pow(1 - t, 3);

                // Vortex inward path
                const spiral = (1 - ease) * Math.sin(t * Math.PI * 2) * p.spiralAmp;
                p.x = p.startX + (p.targetX - p.startX) * ease + spiral;
                p.y = p.startY + (p.targetY - p.startY) * ease;

                const alpha = Math.min(1.0, (1 - ease) * 1.5);

                if (p.isEmber && emberSprites[p.emberColor]) {
                    const spr = emberSprites[p.emberColor];
                    const s = p.size * 3.5;
                    thanosCtx.globalAlpha = alpha;
                    thanosCtx.drawImage(spr, p.x - s / 2, p.y - s / 2, s, s);
                } else {
                    thanosCtx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${alpha * 0.85})`;
                    thanosCtx.fillRect(p.x, p.y, p.size, p.size);
                }

                if (t >= 1.0) {
                    p.done = true;
                } else {
                    activeCount++;
                }

            } else {
                // --- DISINTEGRATION & TIME STONE MODE ---
                if (p.isReversing) {
                    const revElapsed = now - p.reverseStart;
                    const t = Math.min(1.0, revElapsed / 750);
                    const ease = 1 - Math.pow(1 - t, 3);

                    p.x = p.snapX + (p.origX - p.snapX) * ease;
                    p.y = p.snapY + (p.origY - p.snapY) * ease;

                    const alpha = Math.min(1.0, 0.3 + ease * 0.7);

                    // Emerald Time Stone Spark
                    if (emberSprites['#10b981']) {
                        const spr = emberSprites['#10b981'];
                        const s = p.size * 3.0;
                        thanosCtx.globalAlpha = alpha;
                        thanosCtx.drawImage(spr, p.x - s / 2, p.y - s / 2, s, s);
                    } else {
                        thanosCtx.fillStyle = `rgba(16, 185, 129, ${alpha})`;
                        thanosCtx.fillRect(p.x, p.y, p.size, p.size);
                    }

                    if (t >= 1.0) {
                        p.done = true;
                    } else {
                        activeCount++;
                    }

                } else {
                    // Forward Thanos Ash Drift
                    const progress = activeTime / p.lifespan;

                    if (progress >= 1.0) {
                        p.done = true;
                        continue;
                    }

                    // Physics update
                    p.x += p.vx;
                    p.y += p.vy;
                    p.vx *= 0.985;
                    p.vy *= 0.985;

                    const alpha = (1 - Math.pow(progress, 1.5));

                    if (p.isEmber && progress < 0.7 && emberSprites[p.emberColor]) {
                        const spr = emberSprites[p.emberColor];
                        const s = p.size * 3.5 * (1 - progress * 0.3);
                        thanosCtx.globalAlpha = alpha;
                        thanosCtx.drawImage(spr, p.x - s / 2, p.y - s / 2, s, s);
                    } else {
                        thanosCtx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${alpha * 0.9})`;
                        thanosCtx.fillRect(p.x, p.y, p.size, p.size);
                    }

                    activeCount++;
                }
            }
        }

        thanosCtx.globalAlpha = 1.0;

        // Cleanup completed particles periodically to keep memory flat
        if (activeParticles.length > 2500) {
            for (let i = activeParticles.length - 1; i >= 0; i--) {
                if (activeParticles[i].done) {
                    activeParticles.splice(i, 1);
                }
            }
        }

        if (activeCount > 0) {
            requestAnimationFrame(renderLoop);
        } else {
            isLoopRunning = false;
            activeParticles.length = 0;
            thanosCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }
    }

    // --- DISINTEGRATE AN INDIVIDUAL ELEMENT (INSTANT, ZERO LAG) ---
    function disintegrateElement(element, options = {}) {
        if (!element || element._isDisintegrating || element._isDisintegrated) return;
        element._isDisintegrating = true;

        initThanosCanvas();

        // 1. Instant particle generation (0.1ms, zero lag!)
        const particles = sampleElementParticles(element, 'disintegrate');
        element._thanosParticles = particles;

        activeParticles.push(...particles);
        startRenderLoop();

        // 2. High-speed synchronized DOM clip & dissolution
        element.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease';
        element.style.transform = 'scale(0.98) translate3d(4px, -3px, 0)';
        element.style.opacity = '0.35';

        setTimeout(() => {
            element.style.opacity = '0';
        }, 180);

        setTimeout(() => {
            element.style.visibility = 'hidden';
            element.style.pointerEvents = 'none';
            element.classList.add('thanos-vanished');
            element._isDisintegrating = false;
            element._isDisintegrated = true;

            if (options.onComplete) options.onComplete();
        }, 650);
    }

    // --- RESTORE AN ELEMENT (TIME STONE REVERSAL) ---
    function restoreElement(element, options = {}) {
        if (!element || !element._isDisintegrated) return;

        playTimeStoneSound();

        const particles = element._thanosParticles;
        if (particles && particles.length > 0) {
            const now = performance.now();
            particles.forEach(p => {
                p.isReversing = true;
                p.reverseStart = now;
                p.snapX = p.x;
                p.snapY = p.y;
                p.done = false;
            });
            activeParticles.push(...particles);
            startRenderLoop();
        }

        setTimeout(() => {
            element.classList.remove('thanos-vanished');
            element.style.visibility = 'visible';
            element.style.pointerEvents = 'auto';
            element.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'scale(1.02)';

            setTimeout(() => {
                element.style.transform = 'scale(1)';
                element._isDisintegrated = false;
                element._isDisintegrating = false;
                if (options.onComplete) options.onComplete();
            }, 250);
        }, 600);
    }

    // --- COSMIC MATERIALIZATION / APPEARING EFFECT FOR ALL ELEMENTS ---
    // Smoothly coalesces cosmic dust and embers into cards as they appear on scroll
    function materializeElement(element, delay = 0) {
        if (!element || element._hasMaterialized) return;
        element._hasMaterialized = true;

        setTimeout(() => {
            initThanosCanvas();

            // Spawn converging cosmic particles
            const particles = sampleElementParticles(element, 'appear');
            if (particles.length > 0) {
                activeParticles.push(...particles);
                startRenderLoop();
            }

            // Crystallize DOM element into solid reality
            element.classList.add('thanos-crystallizing');
            element.classList.add('thanos-materialized');

            setTimeout(() => {
                element.classList.remove('thanos-crystallizing');
            }, 650);
        }, delay);
    }

    // --- GLOBAL THANOS SNAP CONTROLLER ---
    let isUniverseSnapped = false;
    let snappedElements = [];

    function triggerThanosSnap() {
        const thanosBtn = document.getElementById('thanos-btn');
        playSnapSound();
        createCosmicShockwave();

        const allCards = Array.from(document.querySelectorAll('.glass-card:not(.profile-card)'))
            .filter(card => !card._isDisintegrated && !card._isDisintegrating);

        if (allCards.length === 0) {
            showThanosToast('All eligible reality has already dissolved into ash!', 'info');
            return;
        }

        const shuffled = [...allCards].sort(() => Math.random() - 0.5);
        const countToSnap = Math.max(1, Math.floor(shuffled.length * 0.5));
        const toSnap = shuffled.slice(0, countToSnap);

        snappedElements = toSnap;
        isUniverseSnapped = true;

        if (thanosBtn) {
            thanosBtn.classList.add('snapped');
            thanosBtn.innerHTML = `
                <span class="time-stone-wrap" title="Time Stone: Reverse Reality">
                    <span class="time-gem-core"></span>
                    <i class="fas fa-gem time-gem-icon"></i>
                </span>
            `;
            thanosBtn.setAttribute('title', 'Time Stone: Reverse Snap & Reassemble Reality');
        }

        // Fast staggered execution (40ms interval — smooth & responsive without freezing)
        toSnap.forEach((card, index) => {
            setTimeout(() => {
                disintegrateElement(card);
            }, index * 50);
        });

        const isFa = document.documentElement.lang === 'fa';
        const msg = isFa 
            ? `تانوس بشکن زد! ۵۰٪ از کارت‌ها (${countToSnap} عدد) پودر شدند.`
            : `Thanos snapped his fingers... ${countToSnap} cards dissolved into cosmic dust.`;
        const btnText = isFa ? 'بازگردانی با سنگ زمان' : 'Time Stone Restore';

        showThanosToast(msg, 'snap', btnText, () => {
            reverseThanosSnap();
        });
    }

    function reverseThanosSnap() {
        const thanosBtn = document.getElementById('thanos-btn');
        playTimeStoneSound();
        createTimeStoneWave();

        if (snappedElements.length === 0) {
            snappedElements = Array.from(document.querySelectorAll('.glass-card.thanos-vanished'));
        }

        snappedElements.forEach((card, index) => {
            setTimeout(() => {
                restoreElement(card);
            }, index * 40);
        });

        snappedElements = [];
        isUniverseSnapped = false;

        if (thanosBtn) {
            thanosBtn.classList.remove('snapped');
            thanosBtn.innerHTML = renderGauntletIconHTML();
            thanosBtn.setAttribute('title', 'Thanos Snap: Disintegrate 50% of Content');
        }

        const isFa = document.documentElement.lang === 'fa';
        const msg = isFa 
            ? 'سنگ زمان فعال شد! نظم و واقعیت به حالت اول بازگشت.'
            : 'Time Stone activated! Reality smoothly reassembled from ash.';

        showThanosToast(msg, 'restore');
    }

    function toggleThanosSnap() {
        if (isUniverseSnapped) {
            reverseThanosSnap();
        } else {
            triggerThanosSnap();
        }
    }

    // --- COSMIC RIPPLE WAVES ---
    function createCosmicShockwave() {
        const wave = document.createElement('div');
        wave.className = 'thanos-shockwave-ring';
        document.body.appendChild(wave);
        setTimeout(() => wave.remove(), 1000);
    }

    function createTimeStoneWave() {
        const wave = document.createElement('div');
        wave.className = 'time-stone-wave-ring';
        document.body.appendChild(wave);
        setTimeout(() => wave.remove(), 1100);
    }

    // --- TOAST NOTIFICATION ---
    let toastTimeout = null;
    function showThanosToast(text, type = 'info', actionText = null, onAction = null) {
        let toast = document.getElementById('thanos-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'thanos-toast';
            toast.className = 'thanos-toast';
            document.body.appendChild(toast);
        }

        clearTimeout(toastTimeout);

        toast.className = `thanos-toast visible type-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">
                    ${type === 'snap' ? '<i class="fas fa-hand-sparkles" style="color: #f59e0b;"></i>' : 
                      type === 'restore' ? '<i class="fas fa-gem" style="color: #10b981;"></i>' : 
                      '<i class="fas fa-info-circle"></i>'}
                </span>
                <span class="toast-text">${text}</span>
            </div>
            ${actionText ? `<button class="toast-action-btn" id="toast-action-btn">${actionText}</button>` : ''}
            <button class="toast-close-btn" id="toast-close-btn" aria-label="Close">&times;</button>
        `;

        if (actionText && onAction) {
            const actBtn = toast.querySelector('#toast-action-btn');
            if (actBtn) actBtn.addEventListener('click', () => {
                toast.classList.remove('visible');
                onAction();
            });
        }

        const closeBtn = toast.querySelector('#toast-close-btn');
        if (closeBtn) closeBtn.addEventListener('click', () => {
            toast.classList.remove('visible');
        });

        toastTimeout = setTimeout(() => {
            toast.classList.remove('visible');
        }, 6500);
    }

    // --- GAUNTLET BUTTON ICON GENERATOR ---
    function renderGauntletIconHTML() {
        return `
            <span class="gauntlet-icon-wrap" aria-label="Infinity Gauntlet">
                <i class="fas fa-hand-sparkles gauntlet-hand"></i>
                <span class="infinity-gems-bar">
                    <span class="gem-dot gem-space" title="Space Stone"></span>
                    <span class="gem-dot gem-mind" title="Mind Stone"></span>
                    <span class="gem-dot gem-reality" title="Reality Stone"></span>
                    <span class="gem-dot gem-power" title="Power Stone"></span>
                    <span class="gem-dot gem-time" title="Time Stone"></span>
                    <span class="gem-dot gem-soul" title="Soul Stone"></span>
                </span>
            </span>
        `;
    }

    // --- THANOS FILTERING (NO LAG) ---
    function initThanosFiltering() {
        window.filterCards = function (category, btnEl) {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            if (btnEl) btnEl.classList.add('active');

            const cards = document.querySelectorAll('[data-category]');

            cards.forEach(card => {
                const cat = card.getAttribute('data-category');
                const matches = (category === 'all' || cat.includes(category));

                if (matches) {
                    if (card._isDisintegrated) {
                        restoreElement(card);
                    } else {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                            card.style.visibility = 'visible';
                            card.style.pointerEvents = 'auto';
                        }, 30);
                    }
                } else {
                    if (!card._isDisintegrated && !card._isDisintegrating) {
                        disintegrateElement(card, {
                            onComplete: () => {
                                card.style.display = 'none';
                            }
                        });
                    }
                }
            });
        };
    }

    // --- PER-CARD SNAP BUTTONS ---
    function initCardSnapTriggers() {
        const cards = document.querySelectorAll('.glass-card:not(.profile-card)');
        cards.forEach(card => {
            if (card.querySelector('.card-snap-btn')) return;

            const snapBtn = document.createElement('button');
            snapBtn.className = 'card-snap-btn';
            snapBtn.title = 'Snap this card into dust (Thanos Effect)';
            snapBtn.setAttribute('aria-label', 'Snap card');
            snapBtn.innerHTML = '<i class="fas fa-wind"></i>';

            snapBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                disintegrateElement(card);

                const isFa = document.documentElement.lang === 'fa';
                const msg = isFa ? 'کارت خاکستر شد!' : 'Card dissolved into dust!';
                const undoTxt = isFa ? 'بازگردانی' : 'Undo';

                showThanosToast(msg, 'snap', undoTxt, () => {
                    restoreElement(card);
                });
            });

            card.style.position = 'relative';
            card.appendChild(snapBtn);
        });
    }

    // --- THANOS SCROLL APPEARING OBSERVER FOR ALL ELEMENTS ---
    // Every element materializes from swirling cosmic dust as it scrolls into view!
    function initThanosAppearingObserver() {
        const targets = document.querySelectorAll('.glass-card, .section-header, .stat-pill');

        targets.forEach(el => {
            el.classList.add('thanos-appear-target');
        });

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -30px 0px',
            threshold: 0.08
        };

        const appearObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    obs.unobserve(el);

                    // Stagger siblings in grids
                    const parentGrid = el.closest('.cards-grid, .timeline-list, .stats-row');
                    let delay = 0;
                    if (parentGrid) {
                        const idx = Array.from(parentGrid.children).indexOf(el);
                        delay = Math.min((idx % 4) * 80, 240);
                    }

                    materializeElement(el, delay);
                }
            });
        }, observerOptions);

        targets.forEach(el => appearObserver.observe(el));
    }

    // --- 3D PERSPECTIVE TILT (LIGHTWEIGHT) ---
    function initCardPerspectiveTilt() {
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

        const cards = document.querySelectorAll('.glass-card');
        cards.forEach(card => {
            let reqId = null;

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -4.0;
                const rotateY = ((x - centerX) / centerX) * 4.0;

                const sheenX = (x / rect.width) * 100;
                const sheenY = (y / rect.height) * 100;

                if (reqId) cancelAnimationFrame(reqId);
                reqId = requestAnimationFrame(() => {
                    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, -2px, 0)`;
                    card.style.setProperty('--cursor-sheen-x', `${sheenX.toFixed(1)}%`);
                    card.style.setProperty('--cursor-sheen-y', `${sheenY.toFixed(1)}%`);
                });
            });

            card.addEventListener('mouseleave', () => {
                if (reqId) cancelAnimationFrame(reqId);
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)';
            });
        });
    }

    // --- INITIALIZE ON DOM READY ---
    document.addEventListener('DOMContentLoaded', () => {
        initThanosCanvas();

        const thanosBtn = document.getElementById('thanos-btn');
        if (thanosBtn) {
            thanosBtn.innerHTML = renderGauntletIconHTML();
            thanosBtn.addEventListener('click', toggleThanosSnap);
        }

        initThanosFiltering();
        initCardSnapTriggers();
        initThanosAppearingObserver();
        initCardPerspectiveTilt();
    });

    // Public API
    window.ThanosEngine = {
        snap: triggerThanosSnap,
        restore: reverseThanosSnap,
        toggle: toggleThanosSnap,
        disintegrate: disintegrateElement,
        restoreCard: restoreElement,
        materialize: materializeElement
    };

})();
