/**
 * Advanced 3D EEG Neural Source Reconstruction Simulation
 * Mohammadali Javadinasab | Portfolio
 * Features: Three.js point-cloud gray matter, 10-20 EEG Electrode Cap,
 * Real-time Volumetric Source Dipoles, Wave Propagation, Interactive Raycast Stimulate,
 * Inertial Orbit Drag Controls, and Multi-Channel Real-time Oscilloscope.
 */

(function () {
    const container = document.getElementById('brain-container');
    const statusEl = document.getElementById('brain-status');
    const scopeCanvas = document.getElementById('eeg-scope-canvas');
    if (!container) return;

    // --- THREE.JS SETUP ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Camera initial position
    let targetDist = 28;
    let currentDist = 28;
    camera.position.set(0, 4, currentDist);
    camera.lookAt(0, 0, 0);

    // Particle texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d');
    const grad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 30);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.4, 'rgba(255, 255, 255, 0.85)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, 64, 64);
    const particleTexture = new THREE.CanvasTexture(pCanvas);

    // --- BRAIN DATA & GEOMETRY ---
    let pointsCount = 0;
    let positionsArr, baseColorsArr, currentColorsArr;
    let brainGeometry, brainPointsMesh;
    const brainGroup = new THREE.Group();
    scene.add(brainGroup);

    // Colors definition
    const baseIndigo = new THREE.Color(0x1d4ed8); // deep vivid cobalt
    const hotCyan = new THREE.Color(0x00f0ff);
    const hotGold = new THREE.Color(0xffb703);
    const hotRuby = new THREE.Color(0xff0055);

    // Simulation State
    let simulationMode = 'multi'; // 'multi', 'visual', 'motor', 'frontal'
    let autoRotate = true;
    let showEegCap = true;

    // Sources (Neural Dipoles)
    const MAX_SOURCES = 7;
    const activeSources = [];
    for (let i = 0; i < MAX_SOURCES; i++) {
        activeSources.push({
            active: false,
            x: 0, y: 0, z: 0,
            intensity: 0,
            freq: 10,
            phase: 0,
            life: 0,
            maxLife: 100,
            region: 'general'
        });
    }

    // --- 10-20 EEG ELECTRODE CAP ---
    const eegCapGroup = new THREE.Group();
    brainGroup.add(eegCapGroup);

    // Standard 10-20 landmarks
    const electrodeNodes = [
        { id: 'Fz', x: 0, y: 8.5, z: 6.8 },
        { id: 'Cz', x: 0, y: 11.2, z: 0 },
        { id: 'Pz', x: 0, y: 8.5, z: -6.8 },
        { id: 'Oz', x: 0, y: 2.5, z: -10.5 },
        { id: 'Fp1', x: -3.8, y: 4.8, z: 9.8 },
        { id: 'Fp2', x: 3.8, y: 4.8, z: 9.8 },
        { id: 'F3', x: -5.5, y: 7.5, z: 5.5 },
        { id: 'F4', x: 5.5, y: 7.5, z: 5.5 },
        { id: 'C3', x: -7.8, y: 8.8, z: 0 },
        { id: 'C4', x: 7.8, y: 8.8, z: 0 },
        { id: 'P3', x: -5.5, y: 7.5, z: -5.5 },
        { id: 'P4', x: 5.5, y: 7.5, z: -5.5 },
        { id: 'O1', x: -3.5, y: 2.2, z: -10.2 },
        { id: 'O2', x: 3.5, y: 2.2, z: -10.2 },
        { id: 'T7', x: -9.8, y: 1.5, z: 0 },
        { id: 'T8', x: 9.8, y: 1.5, z: 0 },
    ];

    // Wireframe scalp sphere
    const scalpGeo = new THREE.SphereGeometry(11.6, 20, 14);
    const scalpMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.08,
        depthWrite: false
    });
    const scalpMesh = new THREE.Mesh(scalpGeo, scalpMat);
    eegCapGroup.add(scalpMesh);

    // Electrode beacons
    const electrodeSprites = [];
    const eleMatBase = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    electrodeNodes.forEach(e => {
        const dotGeo = new THREE.SphereGeometry(0.32, 10, 10);
        const dotMesh = new THREE.Mesh(dotGeo, eleMatBase.clone());
        dotMesh.position.set(e.x, e.y, e.z);
        eegCapGroup.add(dotMesh);
        electrodeSprites.push({ mesh: dotMesh, def: e, intensity: 0 });
    });

    // --- LOAD POINT CLOUD OR PROCEDURAL FALLBACK ---
    async function initBrainGeometry() {
        try {
            const resp = await fetch('graymatter_coords.json');
            if (!resp.ok) throw new Error("JSON fetch failed");
            const coords = await resp.json();
            pointsCount = coords.length;

            let minX = Infinity, maxX = -Infinity;
            let minY = Infinity, maxY = -Infinity;
            let minZ = Infinity, maxZ = -Infinity;

            for (let i = 0; i < pointsCount; i++) {
                const p = coords[i];
                if (p[0] < minX) minX = p[0]; if (p[0] > maxX) maxX = p[0];
                if (p[1] < minY) minY = p[1]; if (p[1] > maxY) maxY = p[1];
                if (p[2] < minZ) minZ = p[2]; if (p[2] > maxZ) maxZ = p[2];
            }

            const centerX = (minX + maxX) / 2;
            const centerY = (minY + maxY) / 2;
            const centerZ = (minZ + maxZ) / 2;
            const maxDim = Math.max(maxX - minX, maxY - minY, maxZ - minZ);
            const scale = 20.0 / maxDim;

            positionsArr = new Float32Array(pointsCount * 3);
            baseColorsArr = new Float32Array(pointsCount * 3);
            currentColorsArr = new Float32Array(pointsCount * 3);

            for (let i = 0; i < pointsCount; i++) {
                // Orient correctly: x -> lateral, z -> anterior/posterior, y -> superior/inferior
                const x = (coords[i][0] - centerX) * scale;
                const y = (coords[i][2] - centerZ) * scale;
                const z = -(coords[i][1] - centerY) * scale;

                positionsArr[i * 3] = x;
                positionsArr[i * 3 + 1] = y;
                positionsArr[i * 3 + 2] = z;

                // Ambient depth shading
                const heightRatio = (y / 10.0);
                const depthShade = Math.max(0.45, Math.min(1.0, 0.7 + heightRatio * 0.3));
                const col = baseIndigo.clone().multiplyScalar(depthShade);

                baseColorsArr[i * 3] = col.r;
                baseColorsArr[i * 3 + 1] = col.g;
                baseColorsArr[i * 3 + 2] = col.b;

                currentColorsArr[i * 3] = col.r;
                currentColorsArr[i * 3 + 1] = col.g;
                currentColorsArr[i * 3 + 2] = col.b;
            }

            if (statusEl) {
                statusEl.textContent = `EEG Source Reconstruction: ${pointsCount.toLocaleString()} Gray Matter Voxels`;
                setTimeout(() => { statusEl.style.opacity = '0'; }, 3500);
            }
        } catch (err) {
            console.warn("Using procedural brain coordinates fallback:", err);
            generateProceduralBrain();
        }

        buildMesh();
    }

    function generateProceduralBrain() {
        pointsCount = 6500;
        positionsArr = new Float32Array(pointsCount * 3);
        baseColorsArr = new Float32Array(pointsCount * 3);
        currentColorsArr = new Float32Array(pointsCount * 3);

        const goldenRatio = (1 + Math.sqrt(5)) / 2;
        let pIdx = 0;

        for (let i = 0; i < pointsCount; i++) {
            const t = i / pointsCount;
            const phi = Math.acos(1 - 2 * t);
            const theta = 2 * Math.PI * i / goldenRatio;

            const nx = Math.sin(phi) * Math.cos(theta);
            const ny = Math.cos(phi);
            const nz = Math.sin(phi) * Math.sin(theta);

            let r = 10;
            const fissure = ny > -0.2 ? Math.exp(-Math.pow(nx * 6, 2)) * (ny + 0.2) : 0;
            r -= fissure * 3.5;
            const sulci = Math.sin(nx * 15) * Math.cos(ny * 15) + Math.sin(ny * 15) * Math.cos(nz * 15);
            r += sulci * 0.3;

            const x = r * nx * 0.85;
            const y = r * ny * 0.95;
            const z = r * nz * 1.1;

            positionsArr[pIdx] = x;
            positionsArr[pIdx + 1] = y;
            positionsArr[pIdx + 2] = z;

            const col = baseIndigo.clone().multiplyScalar(0.7 + 0.3 * ny);
            baseColorsArr[pIdx] = col.r;
            baseColorsArr[pIdx + 1] = col.g;
            baseColorsArr[pIdx + 2] = col.b;

            currentColorsArr[pIdx] = col.r;
            currentColorsArr[pIdx + 1] = col.g;
            currentColorsArr[pIdx + 2] = col.b;
            pIdx += 3;
        }
    }

    function buildMesh() {
        brainGeometry = new THREE.BufferGeometry();
        brainGeometry.setAttribute('position', new THREE.BufferAttribute(positionsArr, 3));
        brainGeometry.setAttribute('color', new THREE.BufferAttribute(currentColorsArr, 3));

        const brainMat = new THREE.PointsMaterial({
            size: 1.8,
            vertexColors: true,
            transparent: true,
            opacity: 0.85,
            depthWrite: false,
            map: particleTexture,
            blending: THREE.AdditiveBlending
        });

        brainPointsMesh = new THREE.Points(brainGeometry, brainMat);
        brainGroup.add(brainPointsMesh);
    }

    initBrainGeometry();

    // --- ORBIT & INTERACTIVITY WITH INERTIA ---
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotVelX = 0;
    let rotVelY = 0.003; // gentle auto-spin
    let targetRotX = 0.2;
    let targetRotY = 0.5;

    function onPointerDown(e) {
        isDragging = true;
        prevMouseX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        prevMouseY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    }

    function onPointerMove(e) {
        if (!isDragging) return;
        const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        const y = e.clientY || (e.touches && e.touches[0].clientY) || 0;
        const dx = x - prevMouseX;
        const dy = y - prevMouseY;
        prevMouseX = x;
        prevMouseY = y;

        rotVelY = dx * 0.005;
        rotVelX = dy * 0.005;

        targetRotY += rotVelY;
        targetRotX += rotVelX;
        // Clamp pitch to avoid gimbal flip
        targetRotX = Math.max(-Math.PI / 2.3, Math.min(Math.PI / 2.3, targetRotX));
    }

    function onPointerUp() {
        isDragging = false;
    }

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Zoom on wheel
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        targetDist += e.deltaY * 0.03;
        targetDist = Math.max(14, Math.min(50, targetDist));
    }, { passive: false });

    // Click to stimulate neural dipole
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    container.addEventListener('dblclick', triggerClickStimulation);
    
    function triggerClickStimulation(e) {
        const rect = container.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        if (brainPointsMesh) {
            const intersects = raycaster.intersectObject(brainPointsMesh);
            if (intersects.length > 0) {
                const pt = intersects[0].point;
                // Transform to local space
                const localPt = brainGroup.worldToLocal(pt.clone());
                spawnDipole(localPt.x, localPt.y, localPt.z, 2.0, 140, 'evoked');
                if (statusEl) {
                    statusEl.textContent = `Evoked Neural Dipole @ [${localPt.x.toFixed(1)}, ${localPt.y.toFixed(1)}, ${localPt.z.toFixed(1)}]`;
                    statusEl.style.opacity = '1';
                    setTimeout(() => { statusEl.style.opacity = '0'; }, 2500);
                }
            }
        }
    }

    // --- NEURAL DIPOLE SPAWNING ---
    function spawnDipole(x, y, z, intensity, life, region) {
        let slot = activeSources.find(s => !s.active);
        if (!slot) slot = activeSources[0]; // reuse earliest
        slot.active = true;
        slot.x = x;
        slot.y = y;
        slot.z = z;
        slot.intensity = intensity || 1.0;
        slot.life = life || 100;
        slot.maxLife = slot.life;
        slot.region = region || 'general';
        slot.freq = 8 + Math.random() * 14;
        slot.phase = Math.random() * Math.PI * 2;
    }

    function manageSpontaneousDipoles() {
        if (Math.random() < 0.04) {
            let x = 0, y = 0, z = 0;
            let region = 'general';

            if (simulationMode === 'visual') {
                // Occipital lobe (posterior, lower)
                x = (Math.random() - 0.5) * 6;
                y = 1 + Math.random() * 4;
                z = -6 - Math.random() * 4;
                region = 'visual';
            } else if (simulationMode === 'motor') {
                // Motor strip (coronal central, superior)
                x = (Math.random() - 0.5) * 12;
                y = 6 + Math.random() * 4;
                z = -1 + Math.random() * 2;
                region = 'motor';
            } else if (simulationMode === 'frontal') {
                // Prefrontal cortex (anterior)
                x = (Math.random() - 0.5) * 8;
                y = 3 + Math.random() * 5;
                z = 5 + Math.random() * 4;
                region = 'frontal';
            } else {
                // Full brain inverse solution
                if (positionsArr && pointsCount > 0) {
                    const rndIdx = Math.floor(Math.random() * pointsCount) * 3;
                    x = positionsArr[rndIdx] * 0.85;
                    y = positionsArr[rndIdx + 1] * 0.85;
                    z = positionsArr[rndIdx + 2] * 0.85;
                }
            }

            spawnDipole(x, y, z, 1.2 + Math.random() * 0.8, 80 + Math.random() * 60, region);
        }
    }

    // --- REAL-TIME EEG OSCILLOSCOPE CANVAS ---
    const scopeCtx = scopeCanvas ? scopeCanvas.getContext('2d') : null;
    let scopeTime = 0;
    const channels = [
        { name: 'Fz', color: '#38bdf8', yBase: 9 },
        { name: 'Cz', color: '#22d3ee', yBase: 19 },
        { name: 'Pz', color: '#818cf8', yBase: 29 },
        { name: 'Oz', color: '#f43f5e', yBase: 38 }
    ];

    function renderScope() {
        if (!scopeCtx || !scopeCanvas) return;
        const w = scopeCanvas.width = scopeCanvas.clientWidth;
        const h = scopeCanvas.height = scopeCanvas.clientHeight;

        scopeCtx.clearRect(0, 0, w, h);

        // Grid lines
        scopeCtx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
        scopeCtx.lineWidth = 1;
        scopeCtx.beginPath();
        for (let x = 0; x < w; x += 30) {
            scopeCtx.moveTo(x, 0);
            scopeCtx.lineTo(x, h);
        }
        scopeCtx.stroke();

        scopeTime += 0.08;

        // Draw each channel
        channels.forEach((ch, chIdx) => {
            scopeCtx.strokeStyle = ch.color;
            scopeCtx.lineWidth = 1.4;
            scopeCtx.beginPath();

            // Calculate dipole contribution to this electrode
            let evokedAmp = 0;
            activeSources.forEach(s => {
                if (!s.active) return;
                const ele = electrodeNodes.find(e => e.id === ch.name);
                if (ele) {
                    const dx = ele.x - s.x;
                    const dy = ele.y - s.y;
                    const dz = ele.z - s.z;
                    const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
                    const contrib = (s.intensity * Math.sin(scopeTime * s.freq * 0.4 + s.phase)) / (dist * 0.5 + 1);
                    evokedAmp += contrib;
                }
            });

            const yCenter = (h / 4) * (chIdx + 0.5);

            for (let x = 0; x < w; x += 3) {
                const normX = x / w;
                // Biological rhythm combination: Alpha (10Hz) + Beta (20Hz) + Noise
                const alpha = Math.sin(normX * 18 - scopeTime * 2.2 + chIdx) * 3.5;
                const beta = Math.sin(normX * 42 - scopeTime * 4.5) * 1.5;
                const noise = (Math.random() - 0.5) * 1.2;
                const evoked = (x > w * 0.6) ? evokedAmp * 5.0 * Math.sin(normX * 30 - scopeTime * 3) : 0;

                const y = yCenter + alpha + beta + noise + evoked;
                if (x === 0) scopeCtx.moveTo(x, y);
                else scopeCtx.lineTo(x, y);
            }
            scopeCtx.stroke();
        });
    }

    // --- ANIMATION LOOP ---
    let frameClock = 0;

    function animate() {
        requestAnimationFrame(animate);
        frameClock += 0.016;

        // Camera distance smoothing
        currentDist += (targetDist - currentDist) * 0.1;
        camera.position.z = currentDist;

        // Inertial rotation
        if (autoRotate && !isDragging) {
            targetRotY += 0.0035;
        }

        brainGroup.rotation.y += (targetRotY - brainGroup.rotation.y) * 0.1;
        brainGroup.rotation.x += (targetRotX - brainGroup.rotation.x) * 0.1;

        // Dipole management
        manageSpontaneousDipoles();

        // Update active dipoles life and dynamic color reconstruction
        if (brainGeometry && brainPointsMesh) {
            const colorAttr = brainGeometry.attributes.color;

            // Decay active dipoles
            activeSources.forEach(s => {
                if (s.active) {
                    s.life -= 1;
                    if (s.life <= 0) s.active = false;
                }
            });

            // Update surface colors with electric inverse wave propagation
            for (let i = 0; i < pointsCount; i++) {
                const px = positionsArr[i * 3];
                const py = positionsArr[i * 3 + 1];
                const pz = positionsArr[i * 3 + 2];

                let totalPotential = 0;

                for (let j = 0; j < MAX_SOURCES; j++) {
                    const s = activeSources[j];
                    if (s.active) {
                        const dx = px - s.x;
                        const dy = py - s.y;
                        const dz = pz - s.z;
                        const distSq = dx * dx + dy * dy + dz * dz;

                        // Inverse square falloff wave
                        const dist = Math.sqrt(distSq);
                        const wavePhase = Math.sin(dist * 0.8 - frameClock * s.freq * 0.6);
                        const envelope = s.life / s.maxLife;
                        const falloff = 1.0 / (1.0 + distSq * 0.08);

                        const potential = Math.max(0, falloff * (1 + 0.3 * wavePhase) * envelope * s.intensity);
                        totalPotential += potential;
                    }
                }

                totalPotential = Math.min(1.2, totalPotential);

                const baseR = baseColorsArr[i * 3];
                const baseG = baseColorsArr[i * 3 + 1];
                const baseB = baseColorsArr[i * 3 + 2];

                let r = baseR;
                let g = baseG;
                let b = baseB;

                if (totalPotential > 0.08) {
                    const t = Math.min(1.0, (totalPotential - 0.08) / 0.8);
                    let targetColor;
                    if (t < 0.4) {
                        targetColor = hotCyan;
                    } else if (t < 0.8) {
                        targetColor = hotGold;
                    } else {
                        targetColor = hotRuby;
                    }

                    r = baseR + (targetColor.r - baseR) * t;
                    g = baseG + (targetColor.g - baseG) * t;
                    b = baseB + (targetColor.b - baseB) * t;
                }

                currentColorsArr[i * 3] = r;
                currentColorsArr[i * 3 + 1] = g;
                currentColorsArr[i * 3 + 2] = b;
            }

            colorAttr.needsUpdate = true;

            // Update electrode beacons glow
            electrodeSprites.forEach(item => {
                let eTotal = 0;
                activeSources.forEach(s => {
                    if (s.active) {
                        const dx = item.def.x - s.x;
                        const dy = item.def.y - s.y;
                        const dz = item.def.z - s.z;
                        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
                        eTotal += (1.0 / (1.0 + dist * 0.3)) * (s.life / s.maxLife);
                    }
                });
                const scaleVal = 0.32 + Math.min(0.5, eTotal * 0.35);
                item.mesh.scale.set(scaleVal, scaleVal, scaleVal);
                if (eTotal > 0.3) {
                    item.mesh.material.color.setHex(0x00f0ff);
                } else {
                    item.mesh.material.color.setHex(0x38bdf8);
                }
            });
        }

        renderScope();
        renderer.render(scene, camera);
    }

    animate();

    // Window Resize Handler
    function handleResize() {
        if (!container.clientWidth || !container.clientHeight) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }
    window.addEventListener('resize', handleResize);

    // --- HUD CONTROLS HOOKUP ---
    window.setBrainPreset = function (mode, btnEl) {
        simulationMode = mode;
        document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
        if (btnEl) btnEl.classList.add('active');

        // Clear and burst immediate dipoles for visual responsiveness
        activeSources.forEach(s => s.active = false);
        manageSpontaneousDipoles();
        manageSpontaneousDipoles();
    };

    window.toggleAutoRotate = function (btnEl) {
        autoRotate = !autoRotate;
        if (btnEl) {
            btnEl.classList.toggle('active', autoRotate);
            btnEl.innerHTML = autoRotate ? '<i class="fas fa-pause"></i> Auto-Rotate' : '<i class="fas fa-play"></i> Auto-Rotate';
        }
    };

    window.toggleEegCap = function (btnEl) {
        showEegCap = !showEegCap;
        eegCapGroup.visible = showEegCap;
        if (btnEl) {
            btnEl.classList.toggle('active', showEegCap);
        }
    };

    window.resetBrainView = function () {
        targetRotX = 0.2;
        targetRotY = 0.5;
        targetDist = 28;
    };
})();
