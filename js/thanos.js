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
                <svg class="gauntlet-svg" viewBox="0 0 100 120" width="48" height="56" aria-hidden="true">
                    <defs>
                        <!-- Metallic Uru Gold Armor Gradients -->
                        <linearGradient id="gUruGold" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#fffbeb" />
                            <stop offset="18%" stop-color="#fef08a" />
                            <stop offset="42%" stop-color="#f59e0b" />
                            <stop offset="75%" stop-color="#d97706" />
                            <stop offset="100%" stop-color="#78350f" />
                        </linearGradient>
                        <linearGradient id="gUruPlate" x1="20%" y1="0%" x2="80%" y2="100%">
                            <stop offset="0%" stop-color="#fef9c3" />
                            <stop offset="28%" stop-color="#fbbf24" />
                            <stop offset="68%" stop-color="#b45309" />
                            <stop offset="100%" stop-color="#451a03" />
                        </linearGradient>
                        <linearGradient id="gUruBronze" x1="0%" y1="0%" x2="100%" y2="80%">
                            <stop offset="0%" stop-color="#fef08a" />
                            <stop offset="35%" stop-color="#eab308" />
                            <stop offset="70%" stop-color="#a16207" />
                            <stop offset="100%" stop-color="#3a1705" />
                        </linearGradient>
                        <linearGradient id="gUruDark" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#1c0a02" />
                            <stop offset="35%" stop-color="#451a03" />
                            <stop offset="75%" stop-color="#78350f" />
                            <stop offset="100%" stop-color="#b45309" />
                        </linearGradient>
                        <linearGradient id="gUruBevel" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
                            <stop offset="50%" stop-color="#fef08a" stop-opacity="0.6" />
                            <stop offset="100%" stop-color="#d97706" stop-opacity="0.05" />
                        </linearGradient>

                        <!-- Cosmic Radiance Filter -->
                        <filter id="cosmicGlow" x="-30%" y="-30%" width="160%" height="160%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        <!-- Gem Radiant Gradients -->
                        <radialGradient id="gGemMind" cx="35%" cy="35%" r="65%">
                            <stop offset="0%" stop-color="#ffffff" />
                            <stop offset="20%" stop-color="#fef9c3" />
                            <stop offset="50%" stop-color="#facc15" />
                            <stop offset="80%" stop-color="#ca8a04" />
                            <stop offset="100%" stop-color="#713f12" />
                        </radialGradient>
                        <radialGradient id="gGemTime" cx="35%" cy="35%" r="65%">
                            <stop offset="0%" stop-color="#ffffff" />
                            <stop offset="25%" stop-color="#a7f3d0" />
                            <stop offset="55%" stop-color="#10b981" />
                            <stop offset="80%" stop-color="#047857" />
                            <stop offset="100%" stop-color="#022c22" />
                        </radialGradient>
                        <radialGradient id="gGemSpace" cx="35%" cy="35%" r="65%">
                            <stop offset="0%" stop-color="#ffffff" />
                            <stop offset="25%" stop-color="#e0f2fe" />
                            <stop offset="55%" stop-color="#38bdf8" />
                            <stop offset="80%" stop-color="#0284c7" />
                            <stop offset="100%" stop-color="#082f49" />
                        </radialGradient>
                        <radialGradient id="gGemPower" cx="35%" cy="35%" r="65%">
                            <stop offset="0%" stop-color="#ffffff" />
                            <stop offset="25%" stop-color="#f3e8ff" />
                            <stop offset="55%" stop-color="#c084fc" />
                            <stop offset="80%" stop-color="#9333ea" />
                            <stop offset="100%" stop-color="#3b0764" />
                        </radialGradient>
                        <radialGradient id="gGemReality" cx="35%" cy="35%" r="65%">
                            <stop offset="0%" stop-color="#ffffff" />
                            <stop offset="25%" stop-color="#fee2e2" />
                            <stop offset="55%" stop-color="#f87171" />
                            <stop offset="80%" stop-color="#dc2626" />
                            <stop offset="100%" stop-color="#450a0a" />
                        </radialGradient>
                        <radialGradient id="gGemSoul" cx="35%" cy="35%" r="65%">
                            <stop offset="0%" stop-color="#ffffff" />
                            <stop offset="25%" stop-color="#ffedd5" />
                            <stop offset="55%" stop-color="#fb923c" />
                            <stop offset="80%" stop-color="#ea580c" />
                            <stop offset="100%" stop-color="#431407" />
                        </radialGradient>
                    </defs>

                    <!-- 1. GAUNTLET FOREARM CUFF (BRACER) -->
                    <path d="M18,92 L82,92 L78,118 L22,118 Z" fill="url(#gUruDark)" stroke="#351505" stroke-width="1.2" />
                    <path d="M22,94 L78,94 L75,115 L25,115 Z" fill="url(#gUruGold)" stroke="#78350f" stroke-width="0.8" />
                    <path d="M19,92 L81,92" stroke="url(#gUruBevel)" stroke-width="1.4" stroke-linecap="round" />
                    <path d="M43,101 L50,106 L57,101" fill="none" stroke="#451a03" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M26,108 L74,108" stroke="#78350f" stroke-width="1" stroke-dasharray="3 2" />
                    <circle cx="30" cy="101" r="2" fill="#fef08a" stroke="#78350f" stroke-width="0.7" />
                    <circle cx="50" cy="111" r="2.2" fill="#fef08a" stroke="#78350f" stroke-width="0.8" />
                    <circle cx="70" cy="101" r="2" fill="#fef08a" stroke="#78350f" stroke-width="0.7" />

                    <!-- 2. WRIST CARPAL BAND & HINGES -->
                    <path d="M21,83 C35,85 65,85 79,83 L81,92 C65,94 35,94 19,92 Z" fill="url(#gUruBronze)" stroke="#451a03" stroke-width="1" />
                    <rect x="18" y="84" width="4" height="7" rx="1.5" fill="#fef08a" stroke="#78350f" stroke-width="0.8" />
                    <rect x="78" y="84" width="4" height="7" rx="1.5" fill="#fef08a" stroke="#78350f" stroke-width="0.8" />
                    <path d="M23,84 C38,86 62,86 77,84" stroke="url(#gUruBevel)" stroke-width="1.1" fill="none" />

                    <!-- 3. DORSAL PALM CARAPACE -->
                    <path d="M21,83 L17,58 L22,46 L78,46 L83,58 L79,83 Z" fill="url(#gUruGold)" stroke="#3b1604" stroke-width="1.2" />
                    <path d="M22,46 L36,64 L38,83" stroke="#78350f" stroke-width="1" fill="none" />
                    <path d="M78,46 L64,64 L62,83" stroke="#78350f" stroke-width="1" fill="none" />
                    <path d="M38,83 L50,75 L62,83" stroke="#451a03" stroke-width="1.2" fill="none" />
                    <path d="M18,58 L22,46 L36,46" stroke="url(#gUruBevel)" stroke-width="1" opacity="0.85" fill="none" />

                    <!-- 4. COSMIC ENERGY CONDUITS (Glowing Veins to Mind Stone) -->
                    <path d="M14,56 Q30,62 44,65" fill="none" stroke="#10b981" stroke-width="1.2" opacity="0.9" class="conduit-vein" />
                    <path d="M30,44 Q37,52 45,63" fill="none" stroke="#c084fc" stroke-width="1.2" opacity="0.9" class="conduit-vein" />
                    <path d="M50,42 L50,60" fill="none" stroke="#38bdf8" stroke-width="1.2" opacity="0.9" class="conduit-vein" />
                    <path d="M70,44 Q63,52 55,63" fill="none" stroke="#f87171" stroke-width="1.2" opacity="0.9" class="conduit-vein" />
                    <path d="M85,52 Q72,60 56,65" fill="none" stroke="#fb923c" stroke-width="1.2" opacity="0.9" class="conduit-vein" />

                    <!-- 5. FIVE ARMORED DIGITS (WITH ARTICULATED PHALANGES & GEMSTONES) -->
                    <!-- THUMB + TIME STONE -->
                    <g class="gauntlet-digit thumb-digit">
                        <path d="M19,62 L9,64 L6,56 L15,48 L22,54 Z" fill="url(#gUruDark)" stroke="#3b1604" stroke-width="1" />
                        <path d="M9,64 L3,61 L1,51 L8,47 L14,52 Z" fill="url(#gUruGold)" stroke="#78350f" stroke-width="0.9" />
                        <path d="M3,61 L0,55 L2,50 Z" fill="url(#gUruDark)" stroke="#3b1604" stroke-width="0.8" />
                        <ellipse cx="13" cy="56" rx="5.5" ry="5" fill="#291004" stroke="#d97706" stroke-width="1.2" />
                        <ellipse cx="13" cy="56" rx="4.5" ry="4" fill="#78350f" />
                        <polygon points="13,51 17,54 16,60 10,60 9,54" fill="url(#gGemTime)" class="stone-glow gem-time" filter="url(#cosmicGlow)" />
                        <polygon points="13,51 9,54 13,56" fill="#ffffff" opacity="0.55" />
                        <circle cx="12" cy="54" r="1" fill="#ffffff" opacity="0.95" />
                    </g>

                    <!-- INDEX FINGER + POWER STONE -->
                    <g class="gauntlet-digit index-digit">
                        <path d="M22,46 L24,28 L35,28 L36,46 Z" fill="url(#gUruGold)" stroke="#451a03" stroke-width="1.1" />
                        <line x1="23" y1="37" x2="35" y2="37" stroke="#270e02" stroke-width="1.2" />
                        <path d="M24,28 L26,16 L34,16 L35,28 Z" fill="url(#gUruBronze)" stroke="#78350f" stroke-width="0.9" />
                        <line x1="25" y1="22" x2="34" y2="22" stroke="#3b1604" stroke-width="1" />
                        <path d="M26,16 Q30,8 34,16 Z" fill="url(#gUruDark)" stroke="#451a03" stroke-width="0.9" />
                        <line x1="24" y1="28" x2="26" y2="16" stroke="url(#gUruBevel)" stroke-width="1" />
                        <ellipse cx="29" cy="44" rx="5.6" ry="5" fill="#291004" stroke="#d97706" stroke-width="1.2" />
                        <ellipse cx="29" cy="44" rx="4.5" ry="4" fill="#78350f" />
                        <polygon points="29,39 33.5,43 32,48 26,48 24.5,43" fill="url(#gPower)" class="stone-glow gem-power" filter="url(#cosmicGlow)" />
                        <polygon points="29,39 24.5,43 29,44" fill="#ffffff" opacity="0.55" />
                        <circle cx="28" cy="42" r="1" fill="#ffffff" opacity="0.95" />
                    </g>

                    <!-- MIDDLE FINGER + SPACE STONE -->
                    <g class="gauntlet-digit middle-digit">
                        <path d="M42,42 L43,22 L57,22 L58,42 Z" fill="url(#gUruGold)" stroke="#451a03" stroke-width="1.2" />
                        <line x1="42.5" y1="31" x2="57.5" y2="31" stroke="#270e02" stroke-width="1.4" />
                        <path d="M43,22 L44,9 L56,9 L57,22 Z" fill="url(#gUruBronze)" stroke="#78350f" stroke-width="1" />
                        <line x1="43.5" y1="15" x2="56.5" y2="15" stroke="#3b1604" stroke-width="1" />
                        <path d="M44,9 Q50,1 56,9 Z" fill="url(#gUruDark)" stroke="#451a03" stroke-width="1" />
                        <line x1="43" y1="22" x2="44" y2="9" stroke="url(#gUruBevel)" stroke-width="1.2" />
                        <ellipse cx="50" cy="40" rx="6.2" ry="5.2" fill="#291004" stroke="#d97706" stroke-width="1.3" />
                        <ellipse cx="50" cy="40" rx="5" ry="4.2" fill="#78350f" />
                        <polygon points="50,35 55,39 54,44.5 46,44.5 45,39" fill="url(#gGemSpace)" class="stone-glow gem-space" filter="url(#cosmicGlow)" />
                        <polygon points="50,35 45,39 50,40" fill="#ffffff" opacity="0.55" />
                        <circle cx="49" cy="38" r="1.1" fill="#ffffff" opacity="0.95" />
                    </g>

                    <!-- RING FINGER + REALITY STONE -->
                    <g class="gauntlet-digit ring-digit">
                        <path d="M64,46 L65,28 L76,28 L77,46 Z" fill="url(#gUruGold)" stroke="#451a03" stroke-width="1.1" />
                        <line x1="64.5" y1="37" x2="76.5" y2="37" stroke="#270e02" stroke-width="1.2" />
                        <path d="M65,28 L66,16 L74,16 L75,28 Z" fill="url(#gUruBronze)" stroke="#78350f" stroke-width="0.9" />
                        <line x1="65.5" y1="22" x2="74.5" y2="22" stroke="#3b1604" stroke-width="1" />
                        <path d="M66,16 Q70,8 74,16 Z" fill="url(#gUruDark)" stroke="#451a03" stroke-width="0.9" />
                        <line x1="65" y1="28" x2="66" y2="16" stroke="url(#gUruBevel)" stroke-width="1" />
                        <ellipse cx="71" cy="44" rx="5.6" ry="5" fill="#291004" stroke="#d97706" stroke-width="1.2" />
                        <ellipse cx="71" cy="44" rx="4.5" ry="4" fill="#78350f" />
                        <polygon points="71,39 75.5,43 74,48 68,48 66.5,43" fill="url(#gGemReality)" class="stone-glow gem-reality" filter="url(#cosmicGlow)" />
                        <polygon points="71,39 66.5,43 71,44" fill="#ffffff" opacity="0.55" />
                        <circle cx="70" cy="42" r="1" fill="#ffffff" opacity="0.95" />
                    </g>

                    <!-- PINKY FINGER + SOUL STONE -->
                    <g class="gauntlet-digit pinky-digit">
                        <path d="M80,52 L82,35 L91,35 L89,52 Z" fill="url(#gUruGold)" stroke="#451a03" stroke-width="1.1" />
                        <line x1="81" y1="43" x2="90" y2="43" stroke="#270e02" stroke-width="1.1" />
                        <path d="M82,35 L83,24 L90,24 L91,35 Z" fill="url(#gUruBronze)" stroke="#78350f" stroke-width="0.9" />
                        <line x1="82.5" y1="29" x2="90.5" y2="29" stroke="#3b1604" stroke-width="0.9" />
                        <path d="M83,24 Q86.5,17 90,24 Z" fill="url(#gUruDark)" stroke="#451a03" stroke-width="0.9" />
                        <line x1="82" y1="35" x2="83" y2="24" stroke="url(#gUruBevel)" stroke-width="1" />
                        <ellipse cx="85" cy="52" rx="5.2" ry="4.5" fill="#291004" stroke="#d97706" stroke-width="1.1" />
                        <ellipse cx="85" cy="52" rx="4.1" ry="3.6" fill="#78350f" />
                        <polygon points="85,47.5 89,51 87.5,56 82.5,56 81,51" fill="url(#gGemSoul)" class="stone-glow gem-soul" filter="url(#cosmicGlow)" />
                        <polygon points="85,47.5 81,51 85,52" fill="#ffffff" opacity="0.55" />
                        <circle cx="84" cy="50" r="1" fill="#ffffff" opacity="0.95" />
                    </g>

                    <!-- 6. THE CENTERPIECE: MIND STONE & ORNATE PRONG BEZEL -->
                    <g class="gauntlet-mind-cluster">
                        <polygon points="50,53 66,64 61,82 39,82 34,64" fill="#200b02" stroke="#d97706" stroke-width="1.6" />
                        <polygon points="50,55 64,65 59,80 41,80 36,65" fill="url(#gUruGold)" stroke="#92400e" stroke-width="1" />
                        <polygon points="48,54 52,54 50,59" fill="#fef08a" stroke="#78350f" stroke-width="0.6" />
                        <polygon points="65,63 65,67 60,65" fill="#fef08a" stroke="#78350f" stroke-width="0.6" />
                        <polygon points="58,81 61,78 56,76" fill="#fef08a" stroke="#78350f" stroke-width="0.6" />
                        <polygon points="42,81 39,78 44,76" fill="#fef08a" stroke="#78350f" stroke-width="0.6" />
                        <polygon points="35,63 35,67 40,65" fill="#fef08a" stroke="#78350f" stroke-width="0.6" />
                        <polygon points="50,58 60,66 57,77 43,77 40,66" fill="#3b1604" />
                        <polygon points="50,59 59,67 56,76 44,76 41,67" fill="url(#gGemMind)" class="stone-glow gem-mind" filter="url(#cosmicGlow)" />
                        <polygon points="50,59 41,67 50,67" fill="#ffffff" opacity="0.45" />
                        <polygon points="50,59 59,67 50,67" fill="#ffffff" opacity="0.55" />
                        <polygon points="50,67 41,67 44,76" fill="#ca8a04" opacity="0.35" />
                        <polygon points="50,67 59,67 56,76" fill="#92400e" opacity="0.35" />
                        <polygon points="50,67 44,76 56,76" fill="#eab308" opacity="0.4" />
                        <ellipse cx="48" cy="65" rx="2.5" ry="1.8" fill="#ffffff" opacity="0.95" />
                        <line x1="48" y1="61" x2="48" y2="69" stroke="#ffffff" stroke-width="0.9" opacity="0.9" />
                        <line x1="44" y1="65" x2="52" y2="65" stroke="#ffffff" stroke-width="0.9" opacity="0.9" />
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

    // --- THANOS SCROLL APPEARING OBSERVER (ULTRA LIGHTWEIGHT & LCP-OPTIMIZED) ---
    function initThanosAppearingObserver() {
        const viewportHeight = window.innerHeight || 800;
        const targets = document.querySelectorAll('.glass-card, .section-header, .stat-pill');

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

        targets.forEach(el => {
            // Critical for Instant LCP & High Speed Index:
            // Do NOT hide above-the-fold elements (profile card, stat cards) with opacity: 0!
            if (el.id === 'profile' || el.classList.contains('profile-card') || el.classList.contains('stat-card')) {
                el._hasMaterialized = true;
                el.classList.add('thanos-materialized');
                return;
            }

            const rect = el.getBoundingClientRect();
            if (rect.top < viewportHeight * 0.92) {
                el._hasMaterialized = true;
                el.classList.add('thanos-materialized');
                return;
            }

            el.classList.add('thanos-appear-target');
            appearObserver.observe(el);
        });
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
