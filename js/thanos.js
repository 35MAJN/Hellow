/**
 * Thanos Disintegration & Time Stone Reassembly Engine
 * Realistic Ash & Ember Dispersion Simulation + Smooth UI Physics
 * Mohammadali Javadinasab | Portfolio
 */

(function () {
    'use strict';

    // --- PROCEDURAL WEB AUDIO SYNTHESIZER ---
    // No external audio files needed; 100% reliable procedural audio synthesis
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

    // Realistic Finger Snap + Cosmic Shockwave Sound
    function playSnapSound() {
        const ctx = getAudioContext();
        if (!ctx) return;

        try {
            const now = ctx.currentTime;

            // 1. Crisp Snap Transient (Bandpass filtered noise burst)
            const bufferSize = ctx.sampleRate * 0.05; // 50ms
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
            }

            const noiseSource = ctx.createBufferSource();
            noiseSource.buffer = buffer;

            const noiseFilter = ctx.createBiquadFilter();
            noiseFilter.type = 'bandpass';
            noiseFilter.frequency.setValueAtTime(2600, now);
            noiseFilter.Q.setValueAtTime(3.5, now);

            const noiseGain = ctx.createGain();
            noiseGain.gain.setValueAtTime(0.85, now);
            noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

            noiseSource.connect(noiseFilter);
            noiseFilter.connect(noiseGain);
            noiseGain.connect(ctx.destination);
            noiseSource.start(now);

            // 2. Cosmic Sub-Bass Thud (Descending sine)
            const subOsc = ctx.createOscillator();
            const subGain = ctx.createGain();
            subOsc.type = 'sine';
            subOsc.frequency.setValueAtTime(120, now);
            subOsc.frequency.exponentialRampToValueAtTime(32, now + 0.65);

            subGain.gain.setValueAtTime(0.7, now);
            subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

            subOsc.connect(subGain);
            subGain.connect(ctx.destination);
            subOsc.start(now);
            subOsc.stop(now + 0.65);

            // 3. Ethereal Cosmic Whoosh (Sweeping filtered noise)
            const whooshLen = ctx.sampleRate * 1.0;
            const whooshBuf = ctx.createBuffer(1, whooshLen, ctx.sampleRate);
            const wData = whooshBuf.getChannelData(0);
            for (let i = 0; i < whooshLen; i++) {
                wData[i] = (Math.random() * 2 - 1) * Math.sin((i / whooshLen) * Math.PI);
            }
            const whooshSrc = ctx.createBufferSource();
            whooshSrc.buffer = whooshBuf;

            const whooshFilter = ctx.createBiquadFilter();
            whooshFilter.type = 'lowpass';
            whooshFilter.frequency.setValueAtTime(1400, now);
            whooshFilter.frequency.exponentialRampToValueAtTime(180, now + 0.95);

            const whooshGain = ctx.createGain();
            whooshGain.gain.setValueAtTime(0.01, now);
            whooshGain.gain.linearRampToValueAtTime(0.28, now + 0.15);
            whooshGain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);

            whooshSrc.connect(whooshFilter);
            whooshFilter.connect(whooshGain);
            whooshGain.connect(ctx.destination);
            whooshSrc.start(now);
        } catch (e) {
            console.debug('Web Audio Snap playback note:', e);
        }
    }

    // Time Stone Temporal Rewind Sound (Ascending harmonic shimmer)
    function playTimeStoneSound() {
        const ctx = getAudioContext();
        if (!ctx) return;

        try {
            const now = ctx.currentTime;
            const freqs = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // C major triad ascending

            freqs.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                const startTime = now + idx * 0.08;

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq * 0.85, startTime);
                osc.frequency.exponentialRampToValueAtTime(freq * 1.15, startTime + 0.6);

                gain.gain.setValueAtTime(0.001, startTime);
                gain.gain.linearRampToValueAtTime(0.12, startTime + 0.15);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.7);

                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(startTime);
                osc.stop(startTime + 0.75);
            });
        } catch (e) {
            console.debug('Web Audio Time Stone note:', e);
        }
    }

    // Soft Ash Wind Dispersion Sound
    function playAshWindSound() {
        const ctx = getAudioContext();
        if (!ctx) return;

        try {
            const now = ctx.currentTime;
            const len = ctx.sampleRate * 0.8;
            const buf = ctx.createBuffer(1, len, ctx.sampleRate);
            const d = buf.getChannelData(0);
            for (let i = 0; i < len; i++) {
                d[i] = (Math.random() * 2 - 1) * Math.pow(Math.sin((i / len) * Math.PI), 2);
            }
            const src = ctx.createBufferSource();
            src.buffer = buf;

            const filt = ctx.createBiquadFilter();
            filt.type = 'bandpass';
            filt.frequency.setValueAtTime(800, now);
            filt.Q.setValueAtTime(1.2, now);

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.01, now);
            gain.gain.linearRampToValueAtTime(0.18, now + 0.2);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

            src.connect(filt);
            filt.connect(gain);
            gain.connect(ctx.destination);
            src.start(now);
        } catch (e) {
            console.debug('Web Audio Ash Wind note:', e);
        }
    }

    // --- FULLSCREEN THANOS PARTICLE SIMULATION CANVAS ---
    let thanosCanvas = null;
    let thanosCtx = null;
    let activeParticles = [];
    let isRenderLoopRunning = false;
    let lastTime = 0;

    function initThanosCanvas() {
        if (thanosCanvas) return;

        thanosCanvas = document.createElement('canvas');
        thanosCanvas.id = 'thanos-canvas';
        thanosCanvas.style.position = 'fixed';
        thanosCanvas.style.top = '0';
        thanosCanvas.style.left = '0';
        thanosCanvas.style.width = '100vw';
        thanosCanvas.style.height = '100vh';
        thanosCanvas.style.pointerEvents = 'none';
        thanosCanvas.style.zIndex = '10005';
        document.body.appendChild(thanosCanvas);

        thanosCtx = thanosCanvas.getContext('2d');
        resizeThanosCanvas();
        window.addEventListener('resize', resizeThanosCanvas, { passive: true });
    }

    function resizeThanosCanvas() {
        if (!thanosCanvas) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        thanosCanvas.width = window.innerWidth * dpr;
        thanosCanvas.height = window.innerHeight * dpr;
        if (thanosCtx) {
            thanosCtx.scale(dpr, dpr);
        }
    }

    // --- HIGH FIDELITY ELEMENT CAPTURE ---
    // Uses html2canvas if available, with structured fallback to guarantee zero failures
    async function captureElementToCanvas(element) {
        if (window.html2canvas) {
            try {
                const canvas = await window.html2canvas(element, {
                    backgroundColor: null,
                    scale: 1,
                    logging: false,
                    useCORS: true,
                    allowTaint: true,
                    ignoreElements: (el) => el.classList.contains('card-snap-btn')
                });
                return canvas;
            } catch (err) {
                console.warn('html2canvas capture fallback:', err);
            }
        }

        // High-Fidelity Fallback Rasterizer
        const rect = element.getBoundingClientRect();
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(10, Math.floor(rect.width));
        canvas.height = Math.max(10, Math.floor(rect.height));
        const ctx = canvas.getContext('2d');

        const computed = window.getComputedStyle(element);
        const isDark = document.body.getAttribute('data-theme') === 'dark';

        // Draw styled liquid glass box
        ctx.fillStyle = isDark ? 'rgba(18, 26, 42, 0.72)' : 'rgba(255, 255, 255, 0.85)';
        ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.35)' : 'rgba(2, 132, 199, 0.35)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        const radius = 24;
        ctx.roundRect(0, 0, canvas.width, canvas.height, radius);
        ctx.fill();
        ctx.stroke();

        // Sample text colors and render basic layout silhouettes
        ctx.fillStyle = computed.color || (isDark ? '#e2e8f0' : '#0f172a');
        ctx.font = '14px Inter, sans-serif';
        const titleEl = element.querySelector('.card-title, h2, h3, .ref-name');
        if (titleEl) {
            ctx.font = 'bold 16px Inter, sans-serif';
            ctx.fillText(titleEl.textContent.trim().slice(0, 40), 24, 40);
        }
        const descEl = element.querySelector('.card-description, p, .ref-role');
        if (descEl) {
            ctx.font = '13px Inter, sans-serif';
            ctx.fillStyle = isDark ? '#94a3b8' : '#475569';
            ctx.fillText(descEl.textContent.trim().slice(0, 60), 24, 70);
        }

        return canvas;
    }

    // --- PARTICLE DISSOLUTION PHYSICS ---
    // Realistic ash and ember generation from captured pixel map
    function generateAshParticles(canvas, rect, options = {}) {
        const particles = [];
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        let imgData;
        try {
            imgData = ctx.getImageData(0, 0, width, height);
        } catch (e) {
            console.warn('Could not read image data:', e);
            return particles;
        }

        const data = imgData.data;
        // Adaptive step based on card dimensions (~3,000 to 5,000 particles)
        const area = width * height;
        const targetParticles = 4000;
        const step = Math.max(2, Math.min(5, Math.round(Math.sqrt(area / targetParticles))));

        const emberColors = ['#f59e0b', '#38bdf8', '#c084fc', '#ec4899', '#22d3ee', '#10b981'];

        for (let y = 0; y < height; y += step) {
            for (let x = 0; x < width; x += step) {
                const idx = (y * width + x) * 4;
                const r = data[idx];
                const g = data[idx + 1];
                const b = data[idx + 2];
                const a = data[idx + 3] / 255;

                // Skip fully transparent pixels
                if (a < 0.15) continue;

                // Screen coordinates
                const screenX = rect.left + x;
                const screenY = rect.top + y;

                // Normalized position for wave front calculation (left-to-right + bottom-to-top wave)
                const normX = x / width;
                const normY = y / height;
                const waveProgress = normX * 0.75 + (1 - normY) * 0.25; // sweeps diagonally
                const delayMs = waveProgress * 650 + Math.random() * 180;

                const isEmber = Math.random() < 0.07;
                const emberColor = emberColors[Math.floor(Math.random() * emberColors.length)];

                // Ash physics parameters
                const particle = {
                    origX: screenX,
                    origY: screenY,
                    x: screenX,
                    y: screenY,
                    r, g, b, a,
                    isEmber,
                    emberColor,
                    size: isEmber ? (1.8 + Math.random() * 1.6) : (1.4 + Math.random() * 2.2),
                    // Velocity: gentle horizontal wind blowing right + thermal buoyancy floating up
                    vx: 1.4 + Math.random() * 2.2 + (Math.random() - 0.5) * 0.8,
                    vy: -(1.2 + Math.random() * 2.6),
                    turbPhase: Math.random() * Math.PI * 2,
                    turbSpeed: 0.04 + Math.random() * 0.05,
                    rot: Math.random() * Math.PI * 2,
                    vRot: (Math.random() - 0.5) * 0.12,
                    delayMs,
                    startTime: 0,
                    age: 0,
                    lifespan: 1600 + Math.random() * 800, // 1.6s - 2.4s
                    // Reversal state
                    isReversing: false,
                    reverseStart: 0,
                    reversalProgress: 0,
                    done: false
                };

                particles.push(particle);
            }
        }

        return particles;
    }

    // --- MAIN RENDER & PHYSICS LOOP ---
    function startRenderLoop() {
        if (isRenderLoopRunning) return;
        isRenderLoopRunning = true;
        lastTime = performance.now();
        requestAnimationFrame(renderLoop);
    }

    function renderLoop(currentTime) {
        if (!isRenderLoopRunning) return;

        const dt = Math.min((currentTime - lastTime) / 1000, 0.05); // cap at 50ms
        lastTime = currentTime;

        if (!thanosCtx || !thanosCanvas) {
            isRenderLoopRunning = false;
            return;
        }

        thanosCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        let activeCount = 0;

        for (let i = 0; i < activeParticles.length; i++) {
            const p = activeParticles[i];
            if (p.done) continue;

            if (!p.startTime) p.startTime = currentTime;
            const elapsed = currentTime - p.startTime;

            // Wait for wave delay to hit this particle
            if (elapsed < p.delayMs) {
                activeCount++;
                continue;
            }

            p.age = elapsed - p.delayMs;

            if (p.isReversing) {
                // --- TIME STONE REVERSE (REWIND TOWARDS ORIGIN) ---
                const revElapsed = currentTime - p.reverseStart;
                const revDuration = 900; // 900ms snappy rewind
                const t = Math.min(1, revElapsed / revDuration);
                // Cubic ease-out
                const ease = 1 - Math.pow(1 - t, 3);

                p.x = p.snapX + (p.origX - p.snapX) * ease;
                p.y = p.snapY + (p.origY - p.snapY) * ease;
                p.rot = p.snapRot * (1 - ease);

                const alpha = Math.min(p.a, 0.2 + ease * 0.8);

                // Draw Time Stone Emerald particle
                thanosCtx.save();
                thanosCtx.translate(p.x, p.y);
                thanosCtx.rotate(p.rot);
                thanosCtx.fillStyle = `rgba(52, 211, 153, ${alpha})`;
                thanosCtx.shadowColor = '#10b981';
                thanosCtx.shadowBlur = 6;
                thanosCtx.beginPath();
                thanosCtx.arc(0, 0, p.size * (1 - ease * 0.3), 0, Math.PI * 2);
                thanosCtx.fill();
                thanosCtx.restore();

                if (t >= 1) {
                    p.done = true;
                } else {
                    activeCount++;
                }

            } else {
                // --- FORWARD THANOS ASH DISPERSION ---
                const lifeProgress = p.age / p.lifespan;

                if (lifeProgress >= 1) {
                    p.done = true;
                    continue;
                }

                // Physics update
                p.turbPhase += p.turbSpeed;
                const turbulence = Math.sin(p.turbPhase) * 1.2;

                p.vx += (turbulence * 0.05);
                p.vx *= 0.985; // air drag
                p.vy *= 0.985;

                p.x += p.vx;
                p.y += p.vy;
                p.rot += p.vRot;

                // Fading
                const fadeAlpha = p.a * Math.pow(1 - lifeProgress, 1.4);

                thanosCtx.save();
                thanosCtx.translate(p.x, p.y);
                thanosCtx.rotate(p.rot);

                if (p.isEmber && lifeProgress < 0.65) {
                    // Glowing Ember Spark
                    thanosCtx.fillStyle = p.emberColor;
                    thanosCtx.shadowColor = p.emberColor;
                    thanosCtx.shadowBlur = 5;
                    thanosCtx.beginPath();
                    thanosCtx.arc(0, 0, p.size * (1 - lifeProgress * 0.4), 0, Math.PI * 2);
                    thanosCtx.fill();
                } else {
                    // Organic Ash Flake
                    thanosCtx.fillStyle = `rgba(${p.r}, ${gCalc(p.g)}, ${bCalc(p.b)}, ${fadeAlpha})`;
                    thanosCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                }

                thanosCtx.restore();
                activeCount++;
            }
        }

        if (activeCount > 0) {
            requestAnimationFrame(renderLoop);
        } else {
            isRenderLoopRunning = false;
            thanosCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }
    }

    function gCalc(g) { return Math.min(255, Math.floor(g * 0.95)); }
    function bCalc(b) { return Math.min(255, Math.floor(b * 0.95)); }

    // --- DISINTEGRATE AN INDIVIDUAL ELEMENT ---
    async function disintegrateElement(element, options = {}) {
        if (!element || element._isDisintegrating || element._isDisintegrated) return;
        element._isDisintegrating = true;

        initThanosCanvas();
        playAshWindSound();

        const rect = element.getBoundingClientRect();
        const canvas = await captureElementToCanvas(element);
        const particles = generateAshParticles(canvas, rect, options);

        // Store particles on element for Time Stone restoration
        element._thanosParticles = particles;
        element._originalStyle = {
            transition: element.style.transition,
            opacity: element.style.opacity,
            transform: element.style.transform,
            visibility: element.style.visibility,
            pointerEvents: element.style.pointerEvents
        };

        // Add to active particle simulation
        activeParticles.push(...particles);
        startRenderLoop();

        // Progressive CSS wave dissolution on the DOM element
        element.style.transition = 'transform 0.4s ease, opacity 0.75s cubic-bezier(0.4, 0, 0.2, 1), filter 0.6s ease';
        element.style.filter = 'blur(1.5px) contrast(1.1)';
        element.style.transform = 'scale(0.985) translate3d(6px, -4px, 0)';

        // Subtle tremor
        let tremorCount = 0;
        const tremorInterval = setInterval(() => {
            if (tremorCount++ > 6) {
                clearInterval(tremorInterval);
                return;
            }
            const jx = (Math.random() - 0.5) * 3;
            const jy = (Math.random() - 0.5) * 2;
            element.style.transform = `scale(0.985) translate3d(${6 + jx}px, ${-4 + jy}px, 0)`;
        }, 50);

        setTimeout(() => {
            element.style.opacity = '0';
        }, 220);

        setTimeout(() => {
            element.style.visibility = 'hidden';
            element.style.pointerEvents = 'none';
            element.classList.add('thanos-vanished');
            element._isDisintegrating = false;
            element._isDisintegrated = true;

            if (options.onComplete) options.onComplete();
        }, 850);
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
                p.snapRot = p.rot;
                p.done = false;
            });
            startRenderLoop();
        }

        // Show temporal reassembly flash
        setTimeout(() => {
            element.classList.remove('thanos-vanished');
            element.style.visibility = 'visible';
            element.style.pointerEvents = 'auto';
            element.style.filter = 'drop-shadow(0 0 16px rgba(52, 211, 153, 0.8))';
            element.style.opacity = '1';
            element.style.transform = 'scale(1.02)';

            setTimeout(() => {
                element.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                element.style.transform = 'scale(1)';
                element.style.filter = 'none';
                element._isDisintegrated = false;
                element._isDisintegrating = false;
                if (options.onComplete) options.onComplete();
            }, 300);
        }, 750);
    }

    // --- GLOBAL THANOS SNAP CONTROLLER (50% DISINTEGRATION) ---
    let isUniverseSnapped = false;
    let snappedElements = [];

    function triggerThanosSnap() {
        const thanosBtn = document.getElementById('thanos-btn');
        playSnapSound();

        // 1. Cosmic Shockwave Screen Flash
        createCosmicShockwave();

        // 2. Select eligible cards (all content cards across sections)
        const allCards = Array.from(document.querySelectorAll('.glass-card:not(.profile-card)'))
            .filter(card => !card._isDisintegrated);

        if (allCards.length === 0) {
            showThanosToast('All eligible reality is already turned to ash!', 'info');
            return;
        }

        // Shuffle & select exactly 50% of the cards
        const shuffled = [...allCards].sort(() => Math.random() - 0.5);
        const countToSnap = Math.max(1, Math.floor(shuffled.length * 0.5));
        const toSnap = shuffled.slice(0, countToSnap);

        snappedElements = toSnap;
        isUniverseSnapped = true;

        // Button Gauntlet Animation -> Time Stone
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

        // Staggered sequential disintegration of cards for cinematic weight
        toSnap.forEach((card, index) => {
            setTimeout(() => {
                disintegrateElement(card);
            }, index * 160);
        });

        // Show Interactive Time Stone Toast
        const isFa = document.documentElement.lang === 'fa';
        const msg = isFa 
            ? `تانوس بشکن زد! ۵۰٪ از کارت‌ها (${countToSnap} عدد) به خاکستر تبدیل شدند.`
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
            snappedElements = Array.from(document.querySelectorAll('.glass-card._isDisintegrated, .glass-card.thanos-vanished'));
        }

        snappedElements.forEach((card, index) => {
            setTimeout(() => {
                restoreElement(card);
            }, index * 120);
        });

        snappedElements = [];
        isUniverseSnapped = false;

        // Restore Gauntlet Button
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

    // --- COSMIC SHOCKWAVE EFFECTS ---
    function createCosmicShockwave() {
        const wave = document.createElement('div');
        wave.className = 'thanos-shockwave-ring';
        document.body.appendChild(wave);
        setTimeout(() => wave.remove(), 1200);
    }

    function createTimeStoneWave() {
        const wave = document.createElement('div');
        wave.className = 'time-stone-wave-ring';
        document.body.appendChild(wave);
        setTimeout(() => wave.remove(), 1400);
    }

    // --- INTERACTIVE FLOATING THANOS HUD TOAST ---
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
        }, 7500);
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

    // --- ENHANCED FILTER CARDS WITH THANOS DISINTEGRATION ---
    // Smoothly dissolves filtered-out cards into dust instead of instant hiding!
    function initThanosFiltering() {
        const originalFilter = window.filterCards;

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
                        }, 50);
                    }
                } else {
                    if (!card._isDisintegrated && !card._isDisintegrating) {
                        disintegrateElement(card, {
                            onComplete: () => {
                                // Once turned to ash, maintain layout collapse gracefully
                                card.style.display = 'none';
                            }
                        });
                    }
                }
            });
        };
    }

    // --- PER-CARD MINI DISINTEGRATE BUTTONS ---
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
                const msg = isFa ? 'کارت پودر شد!' : 'Card disintegrated into ash!';
                const undoTxt = isFa ? 'بازگردانی' : 'Undo (Time Stone)';

                showThanosToast(msg, 'snap', undoTxt, () => {
                    restoreElement(card);
                });
            });

            card.style.position = 'relative';
            card.appendChild(snapBtn);
        });
    }

    // --- REALISTIC & SMOOTH GENERAL ANIMATIONS ENGINE ---
    // Smooth IntersectionObserver scroll entrance animations with spring physics
    function initSmoothScrollReveals() {
        const revealTargets = document.querySelectorAll('.glass-card, .section-header, .stat-pill, .section-divider');

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -40px 0px',
            threshold: 0.12
        };

        const revealObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealTargets.forEach((el, index) => {
            el.classList.add('reveal-on-scroll');
            // Stagger siblings in grids
            const parentGrid = el.closest('.cards-grid, .timeline-list');
            if (parentGrid) {
                const childIndex = Array.from(parentGrid.children).indexOf(el);
                el.style.transitionDelay = `${(childIndex % 4) * 80}ms`;
            }
            revealObserver.observe(el);
        });
    }

    // Smooth Interactive 3D Perspective Card Tilt (Realistic physics)
    function initCardPerspectiveTilt() {
        // Disabled on touch devices to ensure pure native touch scrolling
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

                const rotateX = ((y - centerY) / centerY) * -5.0; // max 5deg pitch
                const rotateY = ((x - centerX) / centerX) * 5.0;  // max 5deg yaw

                // Dynamic light sheen highlight angle
                const sheenX = (x / rect.width) * 100;
                const sheenY = (y / rect.height) * 100;

                if (reqId) cancelAnimationFrame(reqId);
                reqId = requestAnimationFrame(() => {
                    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, -3px, 0)`;
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
        initSmoothScrollReveals();
        initCardPerspectiveTilt();
    });

    // Export public API
    window.ThanosEngine = {
        snap: triggerThanosSnap,
        restore: reverseThanosSnap,
        toggle: toggleThanosSnap,
        disintegrate: disintegrateElement,
        restoreCard: restoreElement
    };

})();
