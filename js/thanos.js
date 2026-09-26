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
            thanosBtn.innerHTML = `
                <span class="time-stone-wrap" title="Time Stone: Reverse Reality">
                    <span class="time-gem-core"></span>
                    <i class="fas fa-gem time-gem-icon"></i>
                </span>
            `;
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
