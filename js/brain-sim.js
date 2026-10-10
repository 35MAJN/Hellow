/**
 * 3D EEG Brain Neural Simulation & Multi-Angle Cinematic Camera
 * Mohammadali Javadinasab | Portfolio
 * 
 * Concept:
 * - When entering the website, the 3D brain is centered in perspective view.
 * - When scrolling, the brain stays fixed in the background while other contents
 *   come on top of the brain with glassmorphism.
 * - For each section, the camera view angle smoothly changes ONLY rotating on X and Y angles
 *   (e.g., Front view for Core Focus, Lateral for Education, Top-down for Experience, etc.).
 */

async function initBrainSimulation() {
    const container = document.getElementById('brain-container');
    const statusEl = document.getElementById('brain-status');
    if (!container || typeof THREE === 'undefined') {
        setTimeout(initBrainSimulation, 120);
        return;
    }

    // --- THREE.JS SCENE SETUP ---
    const isMobile = window.innerWidth <= 768;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: !isMobile, 
        powerPreference: "high-performance",
        precision: isMobile ? "mediump" : "highp"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    container.appendChild(renderer.domElement);

    // Particle Texture for Point Cloud
    const circleCanvas = document.createElement('canvas');
    circleCanvas.width = 64; 
    circleCanvas.height = 64;
    const circleCtx = circleCanvas.getContext('2d');
    circleCtx.beginPath();
    circleCtx.arc(32, 32, 30, 0, Math.PI * 2);
    circleCtx.fillStyle = '#ffffff';
    circleCtx.fill();
    const circleTexture = new THREE.CanvasTexture(circleCanvas);

    // Gray matter base color (electric deep cobalt blue)
    const grayMatterColor = new THREE.Color('#0071e3'); 
    
    let pointsCount = 0;
    let finalPositions;
    let finalBaseColors; 
    let brainMesh;
    let colorAttr;
    let alphaAttr;

    // --- SECTION SPECIFIC VIEW ANGLES (ONLY ROTATE ON X AND Y ANGLES) ---
    // rotX = pitch (looking up/down, in radians)
    // rotY = yaw   (horizontal rotation, in radians)
    // Coordinates: +Z is Front (Anterior), +Y is Up (Superior), +X is Right (Lateral)
    const SECTION_ANGLES = {
        'hero': {
            rotX: 0.35,  // ~20 deg pitch
            rotY: 0.61,  // ~35 deg yaw
            nameEn: 'Perspective View · 3D Neural Cortex',
            nameFa: 'نمای پرسپکتیو · قشر سه‌بعدی عصبی'
        },
        'profile': {
            rotX: 0.24,  // ~14 deg
            rotY: 0.38,  // ~22 deg
            nameEn: 'Anterolateral View · Executive Prefrontal Cortex',
            nameFa: 'نمای قدامی-جانبی · قشر پیش‌پیشانی اجرایی'
        },
        'research': {
            // Front view: rotX = 0, rotY = 0 (Directly facing the front of the brain!)
            rotX: 0.00,
            rotY: 0.00,
            nameEn: 'Frontal View (Anterior) · Core Focus & EEG Inverse Problem',
            nameFa: 'نمای قدامی (روبرو) · تمرکز علمی و حل مسئله معکوس EEG'
        },
        'education': {
            // Lateral view: rotY = ~80 deg (Side profile, temporal & auditory cortex)
            rotX: 0.10,
            rotY: 1.40,
            nameEn: 'Lateral Profile (Sagittal) · Temporal Auditory & Signal Cortex',
            nameFa: 'نمای جانبی (پروفایل) · لوب گیجگاهی و مخابرات'
        },
        'experience': {
            // Superior view: rotX = ~72 deg (Looking down from above at motor strips)
            rotX: 1.26,
            rotY: 0.00,
            nameEn: 'Superior View (Axial Plane) · Motor Strip & Systems Execution',
            nameFa: 'نمای فوقانی (دید از بالا) · نوار حرکتی و اجرای سیستم‌ها'
        },
        'projects': {
            // Anterolateral left oblique: rotY = -45 deg, rotX = 22 deg
            rotX: 0.38,
            rotY: -0.78,
            nameEn: 'Anterolateral View · Broca\'s Speech & 3D Spatial Computing',
            nameFa: 'نمای مایل قدامی · ناحیه گفتاری بروکا و محاسبات سه‌بعدی'
        },
        'honors': {
            // Dynamic elevated perspective: rotX = 30 deg, rotY = 30 deg
            rotX: 0.52,
            rotY: 0.52,
            nameEn: 'Elevated Perspective · Reward Circuits & Academic Honors',
            nameFa: 'دید پرسپکتیو زاویه‌دار · مدارهای پاداش و افتخارات'
        },
        'skills': {
            // Inferior angle: rotX = -35 deg (Looking slightly up towards cerebellar base)
            rotX: -0.61,
            rotY: 0.00,
            nameEn: 'Inferior-Posterior View · Cerebellar Synaptic Toolkit',
            nameFa: 'نمای تحتانی-خلفی · مدارهای سیناپسی مخچه و جعبه‌ابزار'
        },
        'references': {
            // Symmetrical Frontal View
            rotX: 0.17,
            rotY: 0.00,
            nameEn: 'Symmetrical Frontal View · Academic Collaboration Network',
            nameFa: 'نمای متقارن روبرو · شبکه همکاری‌های علمی'
        }
    };

    const ALIAS_MAP = {
        'occipital': 'research',
        'temporal': 'education',
        'motor': 'experience',
        'broca': 'projects',
        'reward': 'honors',
        'cerebellum': 'skills',
        'commissure': 'references'
    };

    // Camera Rotation States (X and Y angles)
    let activeSectionKey = 'hero';
    let currentRotX = SECTION_ANGLES['hero'].rotX;
    let targetRotX  = SECTION_ANGLES['hero'].rotX;
    let currentRotY = SECTION_ANGLES['hero'].rotY;
    let targetRotY  = SECTION_ANGLES['hero'].rotY;

    // Mouse Parallax Offsets
    let mouseParallaxX = 0;
    let mouseParallaxY = 0;
    let targetParallaxX = 0;
    let targetParallaxY = 0;

    window.addEventListener('mousemove', (e) => {
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = -(e.clientY / window.innerHeight) * 2 + 1;
        targetParallaxX = nx * 0.08;
        targetParallaxY = ny * 0.06;
    });

    // --- DATA LOADING & FALLBACK ---
    try {
        const response = await fetch('graymatter_coords.json');
        if (!response.ok) throw new Error("JSON not found locally");
        const rawPoints = await response.json();
        
        // Downsample points to eliminate main thread blocking (step 4 on mobile = ~1,812 pts, step 2 on desktop = ~3,625 pts)
        const step = isMobile ? 4 : 2;
        const sampledPoints = [];
        for (let i = 0; i < rawPoints.length; i += step) {
            sampledPoints.push(rawPoints[i]);
        }
        
        pointsCount = sampledPoints.length; 
        finalPositions = new Float32Array(pointsCount * 3);
        finalBaseColors = new Float32Array(pointsCount * 3);

        let min = { x: Infinity, y: Infinity, z: Infinity };
        let max = { x: -Infinity, y: -Infinity, z: -Infinity };
        
        sampledPoints.forEach(p => {
            min.x = Math.min(min.x, p[0]); max.x = Math.max(max.x, p[0]);
            min.y = Math.min(min.y, p[1]); max.y = Math.max(max.y, p[1]);
            min.z = Math.min(min.z, p[2]); max.z = Math.max(max.z, p[2]);
        });

        const center = { x: (min.x + max.x) / 2, y: (min.y + max.y) / 2, z: (min.z + max.z) / 2 };
        const maxSize = Math.max(max.x - min.x, max.y - min.y, max.z - min.z);
        const scale = 11.0 / maxSize; 

        // Map anatomical coords so:
        // X = lateral, Y = superior (Up), Z = anterior (Front)
        for (let i = 0; i < pointsCount; i++) {
            const px = (sampledPoints[i][0] - center.x) * scale;
            const py = (sampledPoints[i][2] - center.z) * scale;
            const pz = (sampledPoints[i][1] - center.y) * scale;

            finalPositions[i * 3]     = px;
            finalPositions[i * 3 + 1] = py;
            finalPositions[i * 3 + 2] = pz;

            const ny = py / 5.0; 
            const ambient = 0.58 + 0.42 * Math.max(-0.5, Math.min(1.0, ny)); 
            const c = grayMatterColor.clone().multiplyScalar(ambient);
            
            finalBaseColors[i * 3]     = c.r;
            finalBaseColors[i * 3 + 1] = c.g;
            finalBaseColors[i * 3 + 2] = c.b;
        }

        if (statusEl) {
            statusEl.style.display = 'none';
        }

    } catch (e) {
        console.log("JSON Load Failed, using procedural fallback.", e);
        if (statusEl) {
            statusEl.innerHTML = `Running Procedural Engine`;
            setTimeout(() => { if (statusEl) statusEl.style.opacity = '0'; }, 3000);
        }

        // Procedural Brain Fallback (Half size)
        pointsCount = 6000;
        finalPositions = new Float32Array(pointsCount * 3);
        finalBaseColors = new Float32Array(pointsCount * 3);
        const goldenRatio = (1 + Math.sqrt(5)) / 2;
        
        let pIdx = 0;
        for (let i = 0; i < pointsCount; i++) {
            let t = i / pointsCount;
            let phi = Math.acos(1 - 2 * t);
            let theta = 2 * Math.PI * i / goldenRatio;
            
            let nx = Math.sin(phi) * Math.cos(theta);
            let ny = Math.cos(phi);
            let nz = Math.sin(phi) * Math.sin(theta); 
            
            let r = 5.75;
            let fissureDepth = ny > -0.2 ? Math.exp(-Math.pow(nx * 6, 2)) * (ny + 0.2) : 0;
            r -= fissureDepth * 1.9;
            if (nz < 0) r -= Math.pow(nz, 2) * 0.9;
            if (nz > 0.4) r += Math.pow(nz - 0.4, 2) * 0.75;
            let tempLobeL = Math.exp(- (Math.pow(nx + 0.85, 2) + Math.pow(ny + 0.2, 2) + Math.pow(nz, 2)) * 3.5 );
            let tempLobeR = Math.exp(- (Math.pow(nx - 0.85, 2) + Math.pow(ny + 0.2, 2) + Math.pow(nz, 2)) * 3.5 );
            r += (tempLobeL + tempLobeR) * 1.5;
            let f1 = Math.sin(nx * 14) * Math.cos(ny * 14) + Math.sin(ny * 14) * Math.cos(nz * 14) + Math.sin(nz * 14) * Math.cos(nx * 14);
            r += f1 * 0.18;
            if (ny < -0.5) r -= Math.pow(Math.abs(ny + 0.5), 2) * 2.25;

            let x = r * nx * 0.72; 
            let y = r * ny * 0.85; 
            let z = r * nz * 1.15; 

            finalPositions[pIdx]     = x;
            finalPositions[pIdx + 1] = y;
            finalPositions[pIdx + 2] = z;
            
            let ambient = 0.6 + 0.4 * (y / 5.0); 
            let creaseShadow = (f1 * 0.05); 
            let c = grayMatterColor.clone().multiplyScalar(ambient - creaseShadow);
            
            finalBaseColors[pIdx]     = c.r;
            finalBaseColors[pIdx + 1] = c.g;
            finalBaseColors[pIdx + 2] = c.b;
            pIdx += 3;
        }
    }

    // --- BUILD STATIC BRAIN MESH AT CENTER (0, 0, 0) ---
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(finalPositions, 3));
    
    const dynamicColors = new Float32Array(finalBaseColors);
    geometry.setAttribute('color', new THREE.BufferAttribute(dynamicColors, 3));

    // Per-vertex alpha attribute ensuring inactive dots have lower opacity than active regions,
    // with a strict floor of 0.10 opacity minimum at all times!
    const alphas = new Float32Array(pointsCount);
    alphas.fill(0.10);
    geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));

    // Particle dot size with per-vertex alpha modulation
    const material = new THREE.PointsMaterial({
        size: 0.525,
        vertexColors: true,
        transparent: true,
        opacity: 1.0,
        depthWrite: false,
        map: circleTexture
    });

    // Custom shader compilation hook to support per-vertex alpha and GPU-accelerated wave in shader
    material.onBeforeCompile = (shader) => {
        material.userData.shader = shader;
        shader.uniforms.uTime = { value: 0 };
        shader.uniforms.uIsHero = { value: 1.0 };

        shader.vertexShader = 'attribute float alpha;\nvarying float vAlpha;\nuniform float uTime;\nuniform float uIsHero;\n' + shader.vertexShader;
        shader.vertexShader = shader.vertexShader.replace(
            '#include <color_vertex>',
            `#include <color_vertex>
            float finalAlpha = alpha;
            if (uIsHero > 0.5) {
                float wave = 0.5 + 0.45 * sin(uTime * 2.0 + (position.z * 0.4 + position.y * 0.3));
                finalAlpha = max(0.12, max(finalAlpha, wave));
            }
            vAlpha = finalAlpha;`
        );
        shader.fragmentShader = 'varying float vAlpha;\n' + shader.fragmentShader;
        shader.fragmentShader = shader.fragmentShader.replace(
            '#include <color_fragment>',
            '#include <color_fragment>\ndiffuseColor.a *= vAlpha;'
        );
    };

    // Theme awareness for 3D brain
    function updateBrainTheme() {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        if (material) {
            material.size = isDark ? 0.525 : 0.58;
        }
    }
    const themeObserver = new MutationObserver(updateBrainTheme);
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
    updateBrainTheme();

    // The brain mesh is static at the origin (0, 0, 0)
    brainMesh = new THREE.Points(geometry, material);
    brainMesh.position.set(0, 0, 0);
    scene.add(brainMesh);

    colorAttr = geometry.attributes.color;
    alphaAttr = geometry.attributes.alpha;

    // --- ANATOMICAL CORTICAL REGION PROFILES FOR ACTIVE REGION HIGHLIGHTING ---
    const REGION_PROFILES = {
        'research': {
            // Occipital / visual cortex & posterior dipole (3D EEG inverse problem focus)
            check: (x, y, z) => {
                const dx = x - 0;
                const dy = y - 0.5;
                const dz = z - (-3.8);
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                return Math.max(0, 1.0 - dist / 3.8);
            }
        },
        'education': {
            // Temporal lobes (bilateral signal processing)
            check: (x, y, z) => {
                const distL = Math.sqrt(Math.pow(x - 3.4, 2) + Math.pow(y + 0.4, 2) + Math.pow(z + 0.2, 2));
                const distR = Math.sqrt(Math.pow(x + 3.4, 2) + Math.pow(y + 0.4, 2) + Math.pow(z + 0.2, 2));
                return Math.max(Math.max(0, 1.0 - distL / 3.4), Math.max(0, 1.0 - distR / 3.4));
            }
        },
        'experience': {
            // Motor strip (coronal arch across superior cortex)
            check: (x, y, z) => {
                const distY = Math.abs(y - 3.4);
                const distZ = Math.abs(z - 0.2);
                return Math.max(0, 1.0 - (distY * 0.9 + distZ * 1.3) / 3.2);
            }
        },
        'projects': {
            // Broca's speech area & anterolateral left cortex
            check: (x, y, z) => {
                const dist = Math.sqrt(Math.pow(x - (-2.5), 2) + Math.pow(y - 1.0, 2) + Math.pow(z - 2.4, 2));
                return Math.max(0, 1.0 - dist / 3.5);
            }
        },
        'honors': {
            // Frontal pole & reward pathways
            check: (x, y, z) => {
                const dist = Math.sqrt(Math.pow(x - 0, 2) + Math.pow(y - 1.8, 2) + Math.pow(z - 3.6, 2));
                return Math.max(0, 1.0 - dist / 3.5);
            }
        },
        'skills': {
            // Cerebellar synaptic base & brainstem
            check: (x, y, z) => {
                const dist = Math.sqrt(Math.pow(x - 0, 2) + Math.pow(y - (-2.6), 2) + Math.pow(z - (-2.5), 2));
                return Math.max(0, 1.0 - dist / 3.5);
            }
        },
        'references': {
            // Medial network / inter-hemispheric commissure
            check: (x, y, z) => {
                const distX = Math.abs(x);
                const dist = Math.sqrt(distX * distX + Math.pow(y - 1.5, 2) + Math.pow(z - 0.5, 2));
                return Math.max(0, 1.0 - dist / 3.5);
            }
        },
        'profile': {
            // Prefrontal executive cortex
            check: (x, y, z) => {
                const dist = Math.sqrt(Math.pow(x - (-1.0), 2) + Math.pow(y - 1.6, 2) + Math.pow(z - 3.0, 2));
                return Math.max(0, 1.0 - dist / 3.6);
            }
        },
        'hero': {
            // Overview: Gentle rhythmic brain wave activity across frontal cortex
            check: (x, y, z, time) => {
                const wave = 0.5 + 0.45 * Math.sin(time * 2.0 + (z * 0.4 + y * 0.3));
                return Math.max(0, Math.min(1.0, wave));
            }
        }
    };

    // --- SUDDEN NEURAL ACTIVITY SOURCES ---
    const maxSources = 6;
    const activeSources = Array.from({ length: maxSources }, () => ({ active: false, x: 0, y: 0, z: 0, life: 0 }));

    // Interactive Drag to manually adjust X and Y angles
    let isUserInteracting = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let prevPointerX = 0;
    let prevPointerY = 0;

    window.addEventListener('mousedown', (e) => {
        if (e.target.closest('a, button, input, textarea, .glass-card, nav')) return;
        isUserInteracting = true;
        prevPointerX = e.clientX;
        prevPointerY = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isUserInteracting) return;
        const dx = e.clientX - prevPointerX;
        const dy = e.clientY - prevPointerY;
        prevPointerX = e.clientX;
        prevPointerY = e.clientY;
        dragOffsetY += dx * 0.006; // Rotate on Y angle
        dragOffsetX -= dy * 0.006; // Rotate on X angle
    });

    window.addEventListener('mouseup', () => { isUserInteracting = false; });

    // Touch support
    window.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1 && !e.target.closest('a, button, input, textarea, .glass-card, nav')) {
            isUserInteracting = true;
            prevPointerX = e.touches[0].clientX;
            prevPointerY = e.touches[0].clientY;
        }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (!isUserInteracting || e.touches.length !== 1) return;
        const dx = e.touches[0].clientX - prevPointerX;
        const dy = e.touches[0].clientY - prevPointerY;
        prevPointerX = e.touches[0].clientX;
        prevPointerY = e.touches[0].clientY;
        dragOffsetY += dx * 0.006;
        dragOffsetX -= dy * 0.006;
    }, { passive: true });

    window.addEventListener('touchend', () => { isUserInteracting = false; });

    // Window Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // --- VIEW ANGLE SWITCHER (CHANGES ONLY ROTATION ON X AND Y ANGLES) ---
    let sectionTransitionSteps = 0;
    let lastVertexUpdateTime = 0;

    function setCameraView(sectionKey) {
        const mappedKey = ALIAS_MAP[sectionKey] || sectionKey;
        if (!SECTION_ANGLES[mappedKey]) return;
        activeSectionKey = mappedKey;
        const view = SECTION_ANGLES[mappedKey];

        targetRotX = view.rotX;
        targetRotY = view.rotY;
        sectionTransitionSteps = isMobile ? 12 : 20;

        // Highlight cortical badges if any
        document.querySelectorAll('.cortical-badge').forEach(b => {
            const reg = b.getAttribute('data-region');
            const regMapped = ALIAS_MAP[reg] || reg;
            b.classList.toggle('active', regMapped === mappedKey);
        });

        // Trigger spontaneous neural bursts to accentuate viewpoint change
        for (let k = 0; k < 2; k++) {
            let s = activeSources[k];
            s.active = true;
            s.life = 1.0;
            let vIdx = Math.floor(Math.random() * pointsCount) * 3;
            s.x = finalPositions[vIdx];
            s.y = finalPositions[vIdx + 1]; 
            s.z = finalPositions[vIdx + 2];
        }
    }
    window.setCameraView = setCameraView;
    window.focusBrainRegion = setCameraView;

    // --- SCROLL TRACKING TO SWITCH ANGLES ---
    const SECTIONS_TRACKED = ['hero', 'profile', 'research', 'education', 'experience', 'projects', 'honors', 'skills', 'references'];
    
    function updateScrollDrivenCamera() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const midPoint = scrollY + windowHeight * 0.45;

        let bestSection = 'hero';
        let minDistance = Infinity;

        SECTIONS_TRACKED.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const elemTop = scrollY + rect.top;
            const elemCenter = elemTop + rect.height / 2;
            const dist = Math.abs(midPoint - elemCenter);

            if (dist < minDistance) {
                minDistance = dist;
                bestSection = id;
            }
        });

        if (bestSection !== activeSectionKey) {
            setCameraView(bestSection);
        }
    }

    window.addEventListener('scroll', updateScrollDrivenCamera, { passive: true });
    updateScrollDrivenCamera();

    // Neural burst colors
    const hotRGB1 = new THREE.Color(0x00e5ff); // electric cyan
    const hotRGB2 = new THREE.Color(0x68b684); // bio-emerald
    const hotGold = new THREE.Color(0xffb703); // amber

    // --- RENDER LOOP ---
    let frameCount = 0;
    let animId = null;
    function animate3D() {
        animId = requestAnimationFrame(animate3D);
        frameCount++;

        // Gradually decay user drag offset back to 0
        if (!isUserInteracting) {
            dragOffsetX *= 0.92;
            dragOffsetY *= 0.92;
        }

        // Mouse Parallax interpolation
        mouseParallaxX += (targetParallaxX - mouseParallaxX) * 0.05;
        mouseParallaxY += (targetParallaxY - mouseParallaxY) * 0.05;

        // Smoothly interpolate current X and Y rotation angles
        currentRotX += (targetRotX - currentRotX) * 0.055;
        currentRotY += (targetRotY - currentRotY) * 0.055;

        // Spherical coordinates calculation: Only rotating on X and Y angles around (0, 0, 0)!
        const pitch = currentRotX + mouseParallaxY + dragOffsetX;
        const yaw   = currentRotY + mouseParallaxX + dragOffsetY;

        // Dynamic distance based on aspect ratio
        const aspect = window.innerWidth / window.innerHeight;
        const baseRadius = 26.5;
        const R = aspect < 1 ? baseRadius * Math.min(2.2, 1.15 / aspect) : baseRadius;

        const camX = R * Math.cos(pitch) * Math.sin(yaw);
        const camY = R * Math.sin(pitch);
        const camZ = R * Math.cos(pitch) * Math.cos(yaw);

        camera.position.set(camX, camY, camZ);
        camera.lookAt(0, 0, 0);

        // Spontaneous Neural Activity Bursts
        activeSources.forEach(s => {
            if (!s.active) {
                if (Math.random() < 0.025) { 
                    s.active = true;
                    s.life = 1.0;
                    let vIdx = Math.floor(Math.random() * pointsCount) * 3;
                    s.x = finalPositions[vIdx];
                    s.y = finalPositions[vIdx + 1]; 
                    s.z = finalPositions[vIdx + 2];
                }
            } else {
                s.life -= 0.015; 
                if (s.life <= 0) s.active = false;
            }
        });

        // GPU Shader Uniform Update (zero CPU cost)
        if (material && material.userData && material.userData.shader && material.userData.shader.uniforms) {
            material.userData.shader.uniforms.uTime.value = performance.now() * 0.001;
            material.userData.shader.uniforms.uIsHero.value = (activeSectionKey === 'hero') ? 1.0 : 0.0;
        }

        // Throttle and condition vertex updates to eliminate main-thread blocking (TBT)
        // Hero wave is computed entirely on the GPU in the vertex shader!
        // CPU loop only executes during section transition lerps or bursts.
        const now = performance.now();
        const vertexInterval = isMobile ? 120 : 65; 
        const hasActiveBurst = activeSources.some(s => s.active);
        const isTransitioning = (sectionTransitionSteps > 0);
        const needsVertexUpdate = hasActiveBurst || isTransitioning;

        if (brainMesh && colorAttr && alphaAttr && needsVertexUpdate && (now - lastVertexUpdateTime >= vertexInterval)) {
            lastVertexUpdateTime = now;
            if (sectionTransitionSteps > 0) sectionTransitionSteps--;

            const clockTime = now * 0.001;
            const currentProfile = REGION_PROFILES[activeSectionKey] || REGION_PROFILES['hero'];

            for (let i = 0; i < pointsCount; i++) {
                const i3 = i * 3;
                let vx = finalPositions[i3];
                let vy = finalPositions[i3 + 1];
                let vz = finalPositions[i3 + 2];
                
                // 1. Spontaneous Neural Dipole Intensity
                let totalIntensity = 0;
                for (let j = 0; j < maxSources; j++) {
                    let s = activeSources[j];
                    if (s.active) {
                        let dx = vx - s.x;
                        let dy = vy - s.y;
                        let dz = vz - s.z;
                        let distSq = dx * dx + dy * dy + dz * dz;
                        
                        if (distSq < 12.25) { // 3.5 * 3.5
                            let intensity = 1.0 - Math.sqrt(distSq) / 3.5;
                            let popMultiplier = s.life > 0.8 ? (1.0 - s.life) / 0.2 : (s.life < 0.2 ? s.life / 0.2 : 1.0);
                            totalIntensity += intensity * intensity * popMultiplier; 
                        }
                    }
                }
                if (totalIntensity > 1.0) totalIntensity = 1.0;

                // 2. Active Cortical Region Profile Factor
                let regionFactor = 0;
                if (currentProfile && typeof currentProfile.check === 'function') {
                    regionFactor = currentProfile.check(vx, vy, vz, clockTime);
                }

                // Combined active potential
                const combinedActivity = Math.min(1.0, Math.max(regionFactor, totalIntensity));

                // 3. OPACITY CALCULATION:
                // Strict floor of 0.10 opacity minimum at all times!
                const targetAlpha = Math.max(0.10, 0.10 + combinedActivity * 0.85);
                const prevAlpha = alphas[i];
                let currentAlpha = prevAlpha + (targetAlpha - prevAlpha) * 0.22;
                if (currentAlpha < 0.10) currentAlpha = 0.10;
                if (currentAlpha > 1.0) currentAlpha = 1.0;
                alphas[i] = currentAlpha;

                // 4. Color calculation
                let baseR = finalBaseColors[i3];
                let baseG = finalBaseColors[i3 + 1];
                let baseB = finalBaseColors[i3 + 2];
                
                if (combinedActivity > 0.05) {
                    let targetHot;
                    if (totalIntensity > 0.6 || combinedActivity > 0.75) {
                        targetHot = hotGold;
                    } else if (totalIntensity > 0.3 || combinedActivity > 0.45) {
                        targetHot = hotRGB2;
                    } else {
                        targetHot = hotRGB1;
                    }

                    let lerpFactor = combinedActivity * 1.5;
                    if (lerpFactor > 1) lerpFactor = 1;
                    
                    dynamicColors[i3] = baseR + (targetHot.r - baseR) * lerpFactor;
                    dynamicColors[i3 + 1] = baseG + (targetHot.g - baseG) * lerpFactor;
                    dynamicColors[i3 + 2] = baseB + (targetHot.b - baseB) * lerpFactor;
                } else {
                    dynamicColors[i3] = baseR;
                    dynamicColors[i3 + 1] = baseG;
                    dynamicColors[i3 + 2] = baseB;
                }
            }
            
            colorAttr.needsUpdate = true;
            alphaAttr.needsUpdate = true;
        }

        renderer.render(scene, camera);
    }
    
    // Controlled loop management ensuring single RAF cycle
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (animId) {
                cancelAnimationFrame(animId);
                animId = null;
            }
        } else {
            if (!animId) {
                animate3D();
            }
        }
    });

    animate3D();
}

// Start simulation when browser is idle or upon first interaction to keep TTI < 800ms & TBT = 0ms
let brainSimulationStarted = false;

function loadThreeJsAndStart() {
    if (typeof THREE !== 'undefined') {
        initBrainSimulation();
        return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;
    script.onload = () => {
        initBrainSimulation();
    };
    document.head.appendChild(script);
}

function triggerBrainSimulation() {
    if (brainSimulationStarted) return;
    brainSimulationStarted = true;
    loadThreeJsAndStart();
}

['scroll', 'pointerdown', 'touchstart', 'keydown'].forEach(evt => {
    window.addEventListener(evt, triggerBrainSimulation, { once: true, passive: true });
});

if (document.readyState === 'complete') {
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => setTimeout(triggerBrainSimulation, 1500), { timeout: 4000 });
    } else {
        setTimeout(triggerBrainSimulation, 2000);
    }
} else {
    window.addEventListener('load', () => {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => setTimeout(triggerBrainSimulation, 1500), { timeout: 4000 });
        } else {
            setTimeout(triggerBrainSimulation, 2000);
        }
    });
}
