/**
 * Ultra-Lightweight High-Performance Thanos Particle & Cinematic Engine
 * Zero-Lag Disintegration, Time Stone Reassembly, GPU-Accelerated Appearing Effects,
 * and Procedural Web Audio Sound Suite
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

    // Auto-unlock Web Audio on first user interaction
    function unlockAudio() {
        const ctx = getAudioContext();
        if (ctx && ctx.state === 'suspended') {
            ctx.resume();
        }
    }
    ['click', 'touchstart', 'scroll', 'keydown', 'pointerdown'].forEach(evt => {
        window.addEventListener(evt, unlockAudio, { once: true, passive: true });
    });

    let lastAppearSoundTime = 0;
    let appearSoundIndex = 0;

    const ThanosAudio = {
        // Grand Thanos Snap (Iconic finger snap + sub-bass shockwave + wind)
        snap: function () {
            const ctx = getAudioContext();
            if (!ctx) return;

            try {
                const now = ctx.currentTime;

                // Transient: Crisp finger bone snap click
                const snapLen = Math.floor(ctx.sampleRate * 0.03);
                const snapBuf = ctx.createBuffer(1, snapLen, ctx.sampleRate);
                const sData = snapBuf.getChannelData(0);
                for (let i = 0; i < snapLen; i++) {
                    sData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (snapLen * 0.2));
                }
                const snapSrc = ctx.createBufferSource();
                snapSrc.buffer = snapBuf;

                const snapFilter = ctx.createBiquadFilter();
                snapFilter.type = 'bandpass';
                snapFilter.frequency.setValueAtTime(3000, now);
                snapFilter.Q.setValueAtTime(4.0, now);

                const snapGain = ctx.createGain();
                snapGain.gain.setValueAtTime(0.8, now);
                snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

                snapSrc.connect(snapFilter);
                snapFilter.connect(snapGain);
                snapGain.connect(ctx.destination);
                snapSrc.start(now);

                // Cosmic Sub-Bass Shockwave
                const subOsc = ctx.createOscillator();
                const subGain = ctx.createGain();
                subOsc.type = 'sine';
                subOsc.frequency.setValueAtTime(95, now);
                subOsc.frequency.exponentialRampToValueAtTime(28, now + 0.5);

                subGain.gain.setValueAtTime(0.6, now);
                subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

                subOsc.connect(subGain);
                subGain.connect(ctx.destination);
                subOsc.start(now);
                subOsc.stop(now + 0.5);
            } catch (e) {}
        },

        // Individual Card Snap
        cardSnap: function () {
            const ctx = getAudioContext();
            if (!ctx) return;

            try {
                const now = ctx.currentTime;
                const bufLen = Math.floor(ctx.sampleRate * 0.025);
                const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
                const d = buf.getChannelData(0);
                for (let i = 0; i < bufLen; i++) {
                    d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufLen * 0.15));
                }
                const src = ctx.createBufferSource();
                src.buffer = buf;

                const filt = ctx.createBiquadFilter();
                filt.type = 'bandpass';
                filt.frequency.setValueAtTime(3200, now);

                const gain = ctx.createGain();
                gain.gain.setValueAtTime(0.55, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

                src.connect(filt);
                filt.connect(gain);
                gain.connect(ctx.destination);
                src.start(now);
            } catch (e) {}
        },

        // Disintegration Ash Wind
        disintegrate: function () {
            const ctx = getAudioContext();
            if (!ctx) return;

            try {
                const now = ctx.currentTime;
                const len = Math.floor(ctx.sampleRate * 0.45);
                const buf = ctx.createBuffer(1, len, ctx.sampleRate);
                const d = buf.getChannelData(0);
                for (let i = 0; i < len; i++) {
                    d[i] = (Math.random() * 2 - 1) * Math.sin((i / len) * Math.PI);
                }
                const src = ctx.createBufferSource();
                src.buffer = buf;

                const filt = ctx.createBiquadFilter();
                filt.type = 'lowpass';
                filt.frequency.setValueAtTime(650, now);
                filt.frequency.exponentialRampToValueAtTime(180, now + 0.4);

                const gain = ctx.createGain();
                gain.gain.setValueAtTime(0.01, now);
                gain.gain.linearRampToValueAtTime(0.12, now + 0.06);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

                src.connect(filt);
                filt.connect(gain);
                gain.connect(ctx.destination);
                src.start(now);
            } catch (e) {}
        },

        // Time Stone Temporal Rewind
        timeStone: function () {
            const ctx = getAudioContext();
            if (!ctx) return;

            try {
                const now = ctx.currentTime;
                const freqs = [329.63, 415.30, 493.88, 659.25, 830.61]; // Ascending E major chime

                freqs.forEach((freq, idx) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    const start = now + idx * 0.05;

                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq * 0.9, start);
                    osc.frequency.exponentialRampToValueAtTime(freq * 1.1, start + 0.35);

                    gain.gain.setValueAtTime(0.001, start);
                    gain.gain.linearRampToValueAtTime(0.08, start + 0.06);
                    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);

                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(start);
                    osc.stop(start + 0.42);
                });
            } catch (e) {}
        },

        // Appearing Effect (Gentle Pentatonic Starlight Chime)
        appear: function () {
            const ctx = getAudioContext();
            if (!ctx) return;

            const now = performance.now();
            if (now - lastAppearSoundTime < 140) return; // Strict throttle for smooth audio
            lastAppearSoundTime = now;

            try {
                const audioNow = ctx.currentTime;
                const notes = [523.25, 659.25, 783.99, 880.0, 1046.50];
                const note = notes[appearSoundIndex % notes.length];
                appearSoundIndex++;

                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(note, audioNow);
                osc.frequency.exponentialRampToValueAtTime(note * 1.04, audioNow + 0.18);

                gain.gain.setValueAtTime(0.001, audioNow);
                gain.gain.linearRampToValueAtTime(0.03, audioNow + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.001, audioNow + 0.22);

                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(audioNow);
                osc.stop(audioNow + 0.23);
            } catch (e) {}
        },

        // Reality Filter Shift
        filterShift: function () {
            const ctx = getAudioContext();
            if (!ctx) return;

            try {
                const now = ctx.currentTime;
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(300, now);
                osc.frequency.exponentialRampToValueAtTime(520, now + 0.1);
                osc.frequency.exponentialRampToValueAtTime(200, now + 0.28);

                gain.gain.setValueAtTime(0.001, now);
                gain.gain.linearRampToValueAtTime(0.06, now + 0.04);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.3);
            } catch (e) {}
        },

        // Gauntlet Hover
        gauntletHum: function () {
            const ctx = getAudioContext();
            if (!ctx) return;

            try {
                const now = ctx.currentTime;
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(110, now);

                gain.gain.setValueAtTime(0.001, now);
                gain.gain.linearRampToValueAtTime(0.04, now + 0.08);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.36);
            } catch (e) {}
        }
    };

    // --- FULLSCREEN THANOS PARTICLE CANVAS ---
    let thanosCanvas = null;
    let thanosCtx = null;
    let activeParticles = [];
    let isLoopRunning = false;
    let isUserScrolling = false;
    let scrollTimeout = null;

    // Detect user scrolling to skip canvas particle overhead during rapid scrolling
    window.addEventListener('scroll', () => {
        isUserScrolling = true;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isUserScrolling = false;
        }, 120);
    }, { passive: true });

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
        // Cap DPR at 1.25 for buttery smooth rendering and low GPU fillrate
        const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
        thanosCanvas.width = Math.round(window.innerWidth * dpr);
        thanosCanvas.height = Math.round(window.innerHeight * dpr);
        thanosCtx.setTransform(1, 0, 0, 1, 0, 0);
        thanosCtx.scale(dpr, dpr);
    }

    // --- FEATHER-LIGHT PARTICLE SAMPLER (50-60 PARTICLES PER CARD) ---
    function sampleElementParticles(element, mode = 'disintegrate') {
        const rect = element.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return [];

        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const particles = [];

        // Ultra-light count: 50 for disintegration, 12 for appearing
        const count = mode === 'appear' ? 12 : 55;
        const width = rect.width;
        const height = rect.height;

        const baseAsh = isDark ? 'rgba(148, 163, 184, ' : 'rgba(71, 85, 105, ';
        const accentAsh = isDark ? 'rgba(56, 189, 248, ' : 'rgba(2, 132, 199, ';
        const emberColor = '#f59e0b';

        for (let i = 0; i < count; i++) {
            const relX = Math.random() * width;
            const relY = Math.random() * height;
            const screenX = rect.left + relX;
            const screenY = rect.top + relY;

            const isEmber = Math.random() < 0.15;
            const colorPrefix = isEmber ? null : (Math.random() < 0.3 ? accentAsh : baseAsh);

            if (mode === 'appear') {
                const angle = Math.random() * Math.PI * 2;
                const dist = 35 + Math.random() * 45;
                const startX = screenX + Math.cos(angle) * dist;
                const startY = screenY + Math.sin(angle) * dist;

                particles.push({
                    mode: 'appear',
                    targetX: screenX,
                    targetY: screenY,
                    x: startX,
                    y: startY,
                    startX,
                    startY,
                    isEmber,
                    colorPrefix,
                    size: isEmber ? 2.5 : 1.8,
                    delayMs: Math.random() * 80,
                    durationMs: 380 + Math.random() * 140,
                    startTime: 0,
                    done: false
                });
            } else {
                // Wave sweep: diagonal delay
                const delay = (relX / width * 0.6 + (1 - relY / height) * 0.4) * 280;

                particles.push({
                    mode: 'disintegrate',
                    origX: screenX,
                    origY: screenY,
                    x: screenX,
                    y: screenY,
                    isEmber,
                    colorPrefix,
                    size: isEmber ? 2.6 : 1.9,
                    vx: 1.8 + Math.random() * 2.2,
                    vy: -(1.0 + Math.random() * 1.8),
                    delayMs: delay,
                    startTime: 0,
                    lifespan: 850 + Math.random() * 350,
                    isReversing: false,
                    reverseStart: 0,
                    done: false
                });
            }
        }

        return particles;
    }

    // --- HIGH-PERFORMANCE ZERO-GC RENDER LOOP ---
    function startRenderLoop() {
        if (isLoopRunning) return;
        isLoopRunning = true;
        requestAnimationFrame(renderLoop);
    }

    function renderLoop(now) {
        if (!isLoopRunning) return;

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
                const t = Math.min(1.0, activeTime / p.durationMs);
                const ease = 1 - (1 - t) * (1 - t);

                p.x = p.startX + (p.targetX - p.startX) * ease;
                p.y = p.startY + (p.targetY - p.startY) * ease;

                const alpha = Math.min(1.0, (1 - ease) * 1.6);

                if (p.isEmber) {
                    thanosCtx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
                } else {
                    thanosCtx.fillStyle = `${p.colorPrefix}${alpha})`;
                }
                thanosCtx.fillRect(p.x, p.y, p.size, p.size);

                if (t >= 1.0) {
                    p.done = true;
                } else {
                    activeCount++;
                }

            } else {
                if (p.isReversing) {
                    const revElapsed = now - p.reverseStart;
                    const t = Math.min(1.0, revElapsed / 480);
                    const ease = 1 - (1 - t) * (1 - t);

                    p.x = p.snapX + (p.origX - p.snapX) * ease;
                    p.y = p.snapY + (p.origY - p.snapY) * ease;

                    const alpha = Math.min(1.0, 0.4 + ease * 0.6);
                    thanosCtx.fillStyle = `rgba(16, 185, 129, ${alpha})`;
                    thanosCtx.fillRect(p.x, p.y, p.size, p.size);

                    if (t >= 1.0) {
                        p.done = true;
                    } else {
                        activeCount++;
                    }

                } else {
                    const progress = activeTime / p.lifespan;

                    if (progress >= 1.0) {
                        p.done = true;
                        continue;
                    }

                    p.x += p.vx;
                    p.y += p.vy;
                    p.vx *= 0.985;
                    p.vy *= 0.985;

                    const alpha = (1 - progress);

                    if (p.isEmber) {
                        thanosCtx.fillStyle = `rgba(245, 158, 11, ${alpha})`;
                    } else {
                        thanosCtx.fillStyle = `${p.colorPrefix}${alpha * 0.9})`;
                    }
                    thanosCtx.fillRect(p.x, p.y, p.size, p.size);

                    activeCount++;
                }
            }
        }

        if (activeCount > 0) {
            requestAnimationFrame(renderLoop);
        } else {
            isLoopRunning = false;
            activeParticles = [];
            thanosCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }
    }

    // --- DISINTEGRATE AN INDIVIDUAL ELEMENT ---
    function disintegrateElement(element, options = {}) {
        if (!element || element._isDisintegrating || element._isDisintegrated) return;
        element._isDisintegrating = true;

        initThanosCanvas();

        if (!options.silent) {
            ThanosAudio.disintegrate();
        }

        // Spawn ~55 particles (lightweight & fluid)
        const particles = sampleElementParticles(element, 'disintegrate');
        element._thanosParticles = particles;
        activeParticles.push(...particles);
        startRenderLoop();

        // GPU-composited fade and subtle drift
        element.style.transition = 'transform 0.38s ease, opacity 0.38s ease, filter 0.38s ease';
        element.style.transform = 'translate3d(4px, -3px, 0) scale(0.98)';
        element.style.filter = 'blur(2px)';
        element.style.opacity = '0';

        setTimeout(() => {
            element.style.visibility = 'hidden';
            element.style.pointerEvents = 'none';
            element.classList.add('thanos-vanished');
            element._isDisintegrating = false;
            element._isDisintegrated = true;

            if (options.onComplete) options.onComplete();
        }, 400);
    }

    // --- RESTORE AN ELEMENT (TIME STONE REVERSAL) ---
    function restoreElement(element, options = {}) {
        if (!element || !element._isDisintegrated) return;

        if (!options.silent) {
            ThanosAudio.timeStone();
        }

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

        element.classList.remove('thanos-vanished');
        element.style.visibility = 'visible';
        element.style.pointerEvents = 'auto';
        element.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, filter 0.3s ease';
        element.style.opacity = '1';
        element.style.filter = 'none';
        element.style.transform = 'translate3d(0, 0, 0) scale(1)';

        setTimeout(() => {
            element._isDisintegrated = false;
            element._isDisintegrating = false;
            if (options.onComplete) options.onComplete();
        }, 420);
    }

    // --- COSMIC MATERIALIZATION / APPEARING EFFECT ---
    function materializeElement(element, delay = 0) {
        if (!element || element._hasMaterialized) return;
        element._hasMaterialized = true;

        setTimeout(() => {
            // Sound effect
            ThanosAudio.appear();

            // Silky GPU CSS entrance
            element.classList.add('thanos-crystallizing');
            element.classList.add('thanos-materialized');

            // Only spawn stardust particles if the user is NOT actively scrolling (keeps scroll 100% 60fps)
            if (!isUserScrolling) {
                initThanosCanvas();
                const particles = sampleElementParticles(element, 'appear');
                if (particles.length > 0) {
                    activeParticles.push(...particles);
                    startRenderLoop();
                }
            }

            setTimeout(() => {
                element.classList.remove('thanos-crystallizing');
            }, 500);
        }, delay);
    }

    // --- GLOBAL THANOS SNAP CONTROLLER ---
    let isUniverseSnapped = false;
    let snappedElements = [];

    function triggerThanosSnap() {
        const thanosBtn = document.getElementById('thanos-btn');
        
        ThanosAudio.snap();
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
            thanosBtn.innerHTML = renderTimeStoneHTML();
            thanosBtn.setAttribute('title', 'Time Stone: Reverse Snap & Reassemble Reality');
        }

        // Staggered by 40ms
        toSnap.forEach((card, index) => {
            setTimeout(() => {
                disintegrateElement(card, { silent: index > 0 });
            }, index * 45);
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

        ThanosAudio.timeStone();
        createTimeStoneWave();

        if (snappedElements.length === 0) {
            snappedElements = Array.from(document.querySelectorAll('.glass-card.thanos-vanished'));
        }

        snappedElements.forEach((card, index) => {
            setTimeout(() => {
                restoreElement(card, { silent: index > 0 });
            }, index * 35);
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
        setTimeout(() => wave.remove(), 900);
    }

    function createTimeStoneWave() {
        const wave = document.createElement('div');
        wave.className = 'time-stone-wave-ring';
        document.body.appendChild(wave);
        setTimeout(() => wave.remove(), 900);
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
        }, 6000);
    }

    // --- AUTHENTIC THANOS INFINITY GAUNTLET & TIME STONE RENDERERS ---
    function renderGauntletIconHTML() {
        const isFa = document.documentElement.lang === 'fa';
        return `
            <div class="thanos-btn-inner">
                <svg class="gauntlet-svg" viewBox="0 0 100 124" width="50" height="60" aria-hidden="true">
                    <defs>
                        <!-- 3D Metallic Uru Gold Armor Gradients -->
                        <linearGradient id="gUruSpecular" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#fffbeb" />
                            <stop offset="18%" stop-color="#fef08a" />
                            <stop offset="45%" stop-color="#f59e0b" />
                            <stop offset="75%" stop-color="#d97706" />
                            <stop offset="100%" stop-color="#78350f" />
                        </linearGradient>
                        <linearGradient id="gUruPlate" x1="20%" y1="0%" x2="80%" y2="100%">
                            <stop offset="0%" stop-color="#fef9c3" />
                            <stop offset="30%" stop-color="#fbbf24" />
                            <stop offset="70%" stop-color="#b45309" />
                            <stop offset="100%" stop-color="#451a03" />
                        </linearGradient>
                        <linearGradient id="gUruDark" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#270e02" />
                            <stop offset="30%" stop-color="#451a03" />
                            <stop offset="70%" stop-color="#78350f" />
                            <stop offset="100%" stop-color="#b45309" />
                        </linearGradient>
                        <linearGradient id="gGoldHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9" />
                            <stop offset="100%" stop-color="#fde047" stop-opacity="0.1" />
                        </linearGradient>
                        <!-- Gem Radiant Gradients -->
                        <radialGradient id="gGemMind" cx="35%" cy="35%" r="65%">
                            <stop offset="0%" stop-color="#ffffff" />
                            <stop offset="25%" stop-color="#fef08a" />
                            <stop offset="60%" stop-color="#eab308" />
                            <stop offset="85%" stop-color="#ca8a04" />
                            <stop offset="100%" stop-color="#713f12" />
                        </radialGradient>
                        <radialGradient id="gGemTime" cx="35%" cy="35%" r="65%">
                            <stop offset="0%" stop-color="#ffffff" />
                            <stop offset="25%" stop-color="#a7f3d0" />
                            <stop offset="60%" stop-color="#10b981" />
                            <stop offset="85%" stop-color="#047857" />
                            <stop offset="100%" stop-color="#064e3b" />
                        </radialGradient>
                        <radialGradient id="gGemSpace" cx="35%" cy="35%" r="65%">
                            <stop offset="0%" stop-color="#ffffff" />
                            <stop offset="25%" stop-color="#bae6fd" />
                            <stop offset="60%" stop-color="#0284c7" />
                            <stop offset="85%" stop-color="#0369a1" />
                            <stop offset="100%" stop-color="#082f49" />
                        </radialGradient>
                        <radialGradient id="gGemPower" cx="35%" cy="35%" r="65%">
                            <stop offset="0%" stop-color="#ffffff" />
                            <stop offset="25%" stop-color="#f3e8ff" />
                            <stop offset="60%" stop-color="#a855f7" />
                            <stop offset="85%" stop-color="#7e22ce" />
                            <stop offset="100%" stop-color="#3b0764" />
                        </radialGradient>
                        <radialGradient id="gGemReality" cx="35%" cy="35%" r="65%">
                            <stop offset="0%" stop-color="#ffffff" />
                            <stop offset="25%" stop-color="#fecaca" />
                            <stop offset="60%" stop-color="#ef4444" />
                            <stop offset="85%" stop-color="#b91c1c" />
                            <stop offset="100%" stop-color="#450a0a" />
                        </radialGradient>
                        <radialGradient id="gGemSoul" cx="35%" cy="35%" r="65%">
                            <stop offset="0%" stop-color="#ffffff" />
                            <stop offset="25%" stop-color="#fed7aa" />
                            <stop offset="60%" stop-color="#f97316" />
                            <stop offset="85%" stop-color="#c2410c" />
                            <stop offset="100%" stop-color="#431407" />
                        </radialGradient>
                    </defs>

                    <!-- 1. GAUNTLET FOREARM CUFF (BRACER) -->
                    <path d="M20,94 L80,94 L76,120 L24,120 Z" fill="url(#gUruDark)" stroke="#3b1a06" stroke-width="1.4" />
                    <path d="M24,96 L76,96 L72,117 L28,117 Z" fill="url(#gUruPlate)" stroke="#92400e" stroke-width="0.9" />
                    <path d="M29,103 L71,103" stroke="#451a03" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="3.5 2" />
                    <path d="M31,110 L69,110" stroke="#78350f" stroke-width="1.2" stroke-dasharray="2 2" />
                    <circle cx="36" cy="103" r="2.2" fill="#fef08a" stroke="#78350f" stroke-width="0.8" />
                    <circle cx="50" cy="103" r="2.8" fill="#fef08a" stroke="#92400e" stroke-width="0.9" />
                    <circle cx="64" cy="103" r="2.2" fill="#fef08a" stroke="#78350f" stroke-width="0.8" />
                    <path d="M21,94 L79,94" stroke="url(#gGoldHighlight)" stroke-width="1.2" stroke-linecap="round" />

                    <!-- 2. WRIST CARPAL BAND -->
                    <path d="M23,86 L77,86 L79,94 L21,94 Z" fill="url(#gUruSpecular)" stroke="#78350f" stroke-width="1" />
                    <line x1="40" y1="87" x2="40" y2="93" stroke="#78350f" stroke-width="0.8" />
                    <line x1="60" y1="87" x2="60" y2="93" stroke="#78350f" stroke-width="0.8" />

                    <!-- 3. METACARPAL PALM / BACK OF HAND CARAPACE -->
                    <path d="M23,86 L20,62 L26,48 L74,48 L80,62 L77,86 Z" fill="url(#gUruPlate)" stroke="#451a03" stroke-width="1.4" />
                    <path d="M26,48 L50,60 L74,48" fill="none" stroke="#78350f" stroke-width="1.1" />
                    <path d="M50,60 L50,86" fill="none" stroke="#92400e" stroke-width="1.1" />
                    <path d="M20,62 L38,67 L50,86 L62,67 L80,62" fill="none" stroke="#78350f" stroke-width="0.9" />
                    <path d="M21,63 L26,49 L38,49" fill="none" stroke="url(#gGoldHighlight)" stroke-width="1" opacity="0.8" />

                    <!-- 4. COSMIC ENERGY CONDUITS (Glowing Veins to Mind Stone) -->
                    <path d="M15,57 Q32,63 44,67" fill="none" stroke="#10b981" stroke-width="1.1" opacity="0.85" class="conduit-vein" />
                    <path d="M32,45 Q38,53 45,64" fill="none" stroke="#a855f7" stroke-width="1.1" opacity="0.85" class="conduit-vein" />
                    <path d="M50,42 L50,61" fill="none" stroke="#38bdf8" stroke-width="1.1" opacity="0.85" class="conduit-vein" />
                    <path d="M68,45 Q62,53 55,64" fill="none" stroke="#ef4444" stroke-width="1.1" opacity="0.85" class="conduit-vein" />
                    <path d="M83,52 Q72,61 56,67" fill="none" stroke="#f97316" stroke-width="1.1" opacity="0.85" class="conduit-vein" />

                    <!-- 5. FIVE ARMORED DIGITS (WITH ARTICULATED PHALANGES & GEMSTONES) -->
                    <!-- THUMB + TIME STONE -->
                    <g class="gauntlet-digit thumb-digit">
                        <path d="M20,62 L11,64 L6,57 L14,51 L22,58 Z" fill="url(#gUruDark)" stroke="#3b1a06" stroke-width="1.2" />
                        <path d="M11,64 L4,62 L1,54 L8,51 L13,56 Z" fill="url(#gUruPlate)" stroke="#78350f" stroke-width="0.9" />
                        <path d="M4,62 L0,59 L1,54 Z" fill="url(#gUruDark)" />
                        <ellipse cx="14" cy="57" rx="5" ry="4.6" fill="#3b1a06" stroke="#b45309" stroke-width="1" />
                        <ellipse cx="14" cy="57" rx="4.2" ry="3.8" fill="#78350f" />
                        <polygon points="14,53 17,56 16,61 12,61 11,56" fill="url(#gGemTime)" class="stone-glow gem-time" />
                        <polygon points="14,53 11,56 12,61" fill="#ffffff" opacity="0.4" />
                        <circle cx="13" cy="55" r="1" fill="#ffffff" opacity="0.9" />
                    </g>

                    <!-- INDEX FINGER + POWER STONE -->
                    <g class="gauntlet-digit index-digit">
                        <path d="M25,48 L26,29 L37,29 L38,48 Z" fill="url(#gUruPlate)" stroke="#451a03" stroke-width="1.2" />
                        <path d="M26,29 L27,17 L36,17 L37,29 Z" fill="url(#gUruSpecular)" stroke="#78350f" stroke-width="0.9" />
                        <path d="M27,17 Q31.5,10 36,17 Z" fill="url(#gUruDark)" stroke="#451a03" stroke-width="0.8" />
                        <line x1="26" y1="35" x2="37" y2="35" stroke="#3b1a06" stroke-width="1.2" />
                        <line x1="27" y1="23" x2="36" y2="23" stroke="#3b1a06" stroke-width="1" />
                        <ellipse cx="32" cy="45" rx="5.2" ry="4.5" fill="#3b1a06" stroke="#b45309" stroke-width="1" />
                        <polygon points="32,41 36,44 35,49 29,49 28,44" fill="url(#gGemPower)" class="stone-glow gem-power" />
                        <polygon points="32,41 28,44 29,49" fill="#ffffff" opacity="0.4" />
                        <circle cx="31" cy="43" r="1" fill="#ffffff" opacity="0.9" />
                    </g>

                    <!-- MIDDLE FINGER + SPACE STONE -->
                    <g class="gauntlet-digit middle-digit">
                        <path d="M43,45 L44,24 L56,24 L57,45 Z" fill="url(#gUruPlate)" stroke="#451a03" stroke-width="1.2" />
                        <path d="M44,24 L45,11 L55,11 L56,24 Z" fill="url(#gUruSpecular)" stroke="#78350f" stroke-width="0.9" />
                        <path d="M45,11 Q50,4 55,11 Z" fill="url(#gUruDark)" stroke="#451a03" stroke-width="0.8" />
                        <line x1="44" y1="32" x2="56" y2="32" stroke="#3b1a06" stroke-width="1.2" />
                        <line x1="45" y1="18" x2="55" y2="18" stroke="#3b1a06" stroke-width="1" />
                        <ellipse cx="50" cy="42" rx="5.5" ry="4.7" fill="#3b1a06" stroke="#b45309" stroke-width="1" />
                        <polygon points="50,38 54.5,41.5 53.5,46.5 46.5,46.5 45.5,41.5" fill="url(#gGemSpace)" class="stone-glow gem-space" />
                        <polygon points="50,38 45.5,41.5 46.5,46.5" fill="#ffffff" opacity="0.4" />
                        <circle cx="49" cy="40" r="1.1" fill="#ffffff" opacity="0.9" />
                    </g>

                    <!-- RING FINGER + REALITY STONE -->
                    <g class="gauntlet-digit ring-digit">
                        <path d="M62,48 L63,29 L74,29 L75,48 Z" fill="url(#gUruPlate)" stroke="#451a03" stroke-width="1.2" />
                        <path d="M63,29 L64,17 L73,17 L74,29 Z" fill="url(#gUruSpecular)" stroke="#78350f" stroke-width="0.9" />
                        <path d="M64,17 Q68.5,10 73,17 Z" fill="url(#gUruDark)" stroke="#451a03" stroke-width="0.8" />
                        <line x1="63" y1="35" x2="74" y2="35" stroke="#3b1a06" stroke-width="1.2" />
                        <line x1="64" y1="23" x2="73" y2="23" stroke="#3b1a06" stroke-width="1" />
                        <ellipse cx="68" cy="45" rx="5.2" ry="4.5" fill="#3b1a06" stroke="#b45309" stroke-width="1" />
                        <polygon points="68,41 72,44 71,49 65,49 64,44" fill="url(#gGemReality)" class="stone-glow gem-reality" />
                        <polygon points="68,41 64,44 65,49" fill="#ffffff" opacity="0.4" />
                        <circle cx="67" cy="43" r="1" fill="#ffffff" opacity="0.9" />
                    </g>

                    <!-- PINKY FINGER + SOUL STONE -->
                    <g class="gauntlet-digit pinky-digit">
                        <path d="M78,54 L80,36 L88,36 L88,54 Z" fill="url(#gUruDark)" stroke="#451a03" stroke-width="1.2" />
                        <path d="M80,36 L81,24 L88,24 L88,36 Z" fill="url(#gUruPlate)" stroke="#78350f" stroke-width="0.8" />
                        <path d="M81,24 Q85,17 88,24 Z" fill="url(#gUruDark)" />
                        <line x1="80" y1="42" x2="88" y2="42" stroke="#3b1a06" stroke-width="1" />
                        <ellipse cx="84" cy="52" rx="4.6" ry="4" fill="#3b1a06" stroke="#b45309" stroke-width="1" />
                        <polygon points="84,48 87.5,51 86.5,55.5 81.5,55.5 80.5,51" fill="url(#gGemSoul)" class="stone-glow gem-soul" />
                        <polygon points="84,48 80.5,51 81.5,55.5" fill="#ffffff" opacity="0.4" />
                        <circle cx="83" cy="50" r="0.9" fill="#ffffff" opacity="0.9" />
                    </g>

                    <!-- 6. THE CENTERPIECE: MIND STONE & ORNATE PRONG BEZEL -->
                    <g class="gauntlet-mind-cluster">
                        <polygon points="50,55 64,65 59,81 41,81 36,65" fill="#270e02" stroke="#f59e0b" stroke-width="1.5" />
                        <polygon points="50,57 62,66 57,79 43,79 38,66" fill="url(#gUruPlate)" stroke="#92400e" stroke-width="0.8" />
                        <circle cx="50" cy="56" r="1.8" fill="#fef08a" stroke="#78350f" stroke-width="0.6" />
                        <circle cx="63" cy="65" r="1.8" fill="#fef08a" stroke="#78350f" stroke-width="0.6" />
                        <circle cx="58" cy="80" r="1.8" fill="#fef08a" stroke="#78350f" stroke-width="0.6" />
                        <circle cx="42" cy="80" r="1.8" fill="#fef08a" stroke="#78350f" stroke-width="0.6" />
                        <circle cx="37" cy="65" r="1.8" fill="#fef08a" stroke="#78350f" stroke-width="0.6" />
                        <polygon points="50,60 59,67 56,77 44,77 41,67" fill="#3b1a06" />
                        <polygon points="50,61 58,68 55,76 45,76 42,68" fill="url(#gGemMind)" class="stone-glow gem-mind" />
                        <polygon points="50,61 42,68 45,76" fill="#ffffff" opacity="0.35" />
                        <polygon points="50,61 58,68 50,66" fill="#ffffff" opacity="0.45" />
                        <polygon points="50,66 58,68 55,76 50,71" fill="#ca8a04" opacity="0.3" />
                        <ellipse cx="47" cy="66" rx="2.2" ry="1.8" fill="#ffffff" opacity="0.95" />
                        <line x1="47" y1="62" x2="47" y2="70" stroke="#ffffff" stroke-width="0.8" opacity="0.85" />
                        <line x1="43" y1="66" x2="51" y2="66" stroke="#ffffff" stroke-width="0.8" opacity="0.85" />
                    </g>
                </svg>
            </div>
            <span class="thanos-fab-glow" aria-hidden="true"></span>
            <span class="thanos-fab-tooltip" data-t="thanos-tooltip">${isFa ? 'بشکن تانوس' : 'Infinity Gauntlet Snap'}</span>
        `;
    }

    function renderTimeStoneHTML() {
        const isFa = document.documentElement.lang === 'fa';
        return `
            <div class="thanos-btn-inner">
                <div class="time-stone-fab-wrapper">
                    <svg class="time-stone-mandala-svg" viewBox="0 0 100 100" width="46" height="46" aria-hidden="true">
                        <defs>
                            <radialGradient id="timeAura" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stop-color="#ffffff"/>
                                <stop offset="30%" stop-color="#6ee7b7"/>
                                <stop offset="70%" stop-color="#10b981"/>
                                <stop offset="100%" stop-color="#047857"/>
                            </radialGradient>
                        </defs>
                        <circle cx="50" cy="50" r="44" fill="none" stroke="#10b981" stroke-width="1.6" stroke-dasharray="8 4 2 4" class="time-ring-outer"/>
                        <rect x="24" y="24" width="52" height="52" fill="none" stroke="#34d399" stroke-width="1.2" class="time-mandala-1"/>
                        <rect x="24" y="24" width="52" height="52" fill="none" stroke="#6ee7b7" stroke-width="1.2" transform="rotate(45 50 50)" class="time-mandala-2"/>
                        <circle cx="50" cy="50" r="18" fill="#064e3b" stroke="#34d399" stroke-width="1.5"/>
                        <polygon points="50,38 59,50 50,62 41,50" fill="url(#timeAura)" class="time-core-gem"/>
                        <circle cx="50" cy="50" r="3" fill="#ffffff"/>
                    </svg>
                </div>
            </div>
            <span class="thanos-fab-glow" aria-hidden="true"></span>
            <span class="thanos-fab-tooltip" data-t="thanos-restore-tooltip">${isFa ? 'بازگردانی با سنگ زمان' : 'Time Stone: Reverse Reality'}</span>
        `;
    }

    // --- THANOS FILTERING ---
    function initThanosFiltering() {
        window.filterCards = function (category, btnEl) {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            if (btnEl) btnEl.classList.add('active');

            ThanosAudio.filterShift();

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
                            card.style.transform = 'translate3d(0, 0, 0) scale(1)';
                            card.style.visibility = 'visible';
                            card.style.pointerEvents = 'auto';
                        }, 20);
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
                ThanosAudio.cardSnap();
                disintegrateElement(card, { silent: true });

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

    // --- THANOS SCROLL APPEARING OBSERVER (ULTRA LIGHTWEIGHT) ---
    function initThanosAppearingObserver() {
        const targets = document.querySelectorAll('.glass-card, .section-header, .stat-pill');

        targets.forEach(el => {
            el.classList.add('thanos-appear-target');
        });

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -20px 0px',
            threshold: 0.05
        };

        const appearObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    obs.unobserve(el);

                    // Clean staggered delay
                    const parentGrid = el.closest('.cards-grid, .timeline-list, .stats-row');
                    let delay = 0;
                    if (parentGrid) {
                        const idx = Array.from(parentGrid.children).indexOf(el);
                        delay = Math.min((idx % 4) * 60, 180);
                    }

                    materializeElement(el, delay);
                }
            });
        }, observerOptions);

        targets.forEach(el => appearObserver.observe(el));
    }

    // --- 3D PERSPECTIVE TILT (LIGHTWEIGHT RAF) ---
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

                const rotateX = ((y - centerY) / centerY) * -3.5;
                const rotateY = ((x - centerX) / centerX) * 3.5;

                if (reqId) cancelAnimationFrame(reqId);
                reqId = requestAnimationFrame(() => {
                    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, -2px, 0)`;
                });
            }, { passive: true });

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

            thanosBtn.addEventListener('mouseenter', () => {
                if (!thanosBtn.classList.contains('snapped')) {
                    ThanosAudio.gauntletHum();
                }
            });
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
        materialize: materializeElement,
        audio: ThanosAudio
    };

})();
