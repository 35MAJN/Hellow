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

window.addEventListener('load', async () => {
    const container = document.getElementById('brain-container');
    const statusEl = document.getElementById('brain-status');
    if (!container) return;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
        
        pointsCount = rawPoints.length; 
        finalPositions = new Float32Array(pointsCount * 3);
        finalBaseColors = new Float32Array(pointsCount * 3);

        let min = { x: Infinity, y: Infinity, z: Infinity };
        let max = { x: -Infinity, y: -Infinity, z: -Infinity };
        
        rawPoints.forEach(p => {
            min.x = Math.min(min.x, p[0]); max.x = Math.max(max.x, p[0]);
            min.y = Math.min(min.y, p[1]); max.y = Math.max(max.y, p[1]);
            min.z = Math.min(min.z, p[2]); max.z = Math.max(max.z, p[2]);
        });

        const center = { x: (min.x + max.x) / 2, y: (min.y + max.y) / 2, z: (min.z + max.z) / 2 };
        const maxSize = Math.max(max.x - min.x, max.y - min.y, max.z - min.z);
        // Half the previous size (22.0 -> 11.0)
        const scale = 11.0 / maxSize; 

        // Map anatomical coords so:
        // X = lateral, Y = superior (Up), Z = anterior (Front)
        for (let i = 0; i < pointsCount; i++) {
            const px = (rawPoints[i][0] - center.x) * scale; // Lateral (X)
            const py = (rawPoints[i][2] - center.z) * scale; // Superior / Up (Y)
            const pz = (rawPoints[i][1] - center.y) * scale; // Anterior / Front (Z)

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
            statusEl.innerHTML = `Loaded ${pointsCount.toLocaleString()} points from JSON`;
            setTimeout(() => { if (statusEl) statusEl.style.opacity = '0'; }, 3000);
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

    // Particle dot size reduced to one-quarter (2.1 -> 0.525)
    const material = new THREE.PointsMaterial({
        size: 0.525,
        vertexColors: true,
        transparent: true,
        opacity: 0.82,
        depthWrite: false,
        map: circleTexture
    });

    // Theme awareness for 3D brain
    function updateBrainTheme() {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        if (material) {
            material.opacity = isDark ? 0.82 : 0.88;
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
    function setCameraView(sectionKey) {
        const mappedKey = ALIAS_MAP[sectionKey] || sectionKey;
        if (!SECTION_ANGLES[mappedKey]) return;
        activeSectionKey = mappedKey;
        const view = SECTION_ANGLES[mappedKey];

        targetRotX = view.rotX;
        targetRotY = view.rotY;

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
    function animate3D() {
        requestAnimationFrame(animate3D);

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

        // Update surface vertex colors
        if (brainMesh && colorAttr) {
            for (let i = 0; i < pointsCount; i++) {
                let vx = finalPositions[i * 3];
                let vy = finalPositions[i * 3 + 1];
                let vz = finalPositions[i * 3 + 2];
                
                let totalIntensity = 0;
                
                for (let j = 0; j < maxSources; j++) {
                    let s = activeSources[j];
                    if (s.active) {
                        let dx = vx - s.x;
                        let dy = vy - s.y;
                        let dz = vz - s.z;
                        let distSq = dx * dx + dy * dy + dz * dz;
                        
                        let intensity = Math.max(0, 1.0 - Math.sqrt(distSq) / 3.5);
                        let popMultiplier = s.life > 0.8 ? (1.0 - s.life) / 0.2 : (s.life < 0.2 ? s.life / 0.2 : 1.0);
                        
                        totalIntensity += Math.pow(intensity * popMultiplier, 2.5); 
                    }
                }
                
                totalIntensity = Math.min(1.0, totalIntensity);

                let baseR = finalBaseColors[i * 3];
                let baseG = finalBaseColors[i * 3 + 1];
                let baseB = finalBaseColors[i * 3 + 2];
                
                let r = baseR; 
                let g = baseG; 
                let b = baseB;
                
                if (totalIntensity > 0.02) {
                    let targetHot;
                    if (totalIntensity > 0.6) {
                        targetHot = hotGold;
                    } else if (totalIntensity > 0.3) {
                        targetHot = hotRGB2;
                    } else {
                        targetHot = hotRGB1;
                    }

                    let lerpFactor = totalIntensity * 2.0;
                    if (lerpFactor > 1) lerpFactor = 1;
                    
                    r = baseR + (targetHot.r - baseR) * lerpFactor;
                    g = baseG + (targetHot.g - baseG) * lerpFactor;
                    b = baseB + (targetHot.b - baseB) * lerpFactor;
                }

                colorAttr.setXYZ(i, r, g, b);
            }
            
            colorAttr.needsUpdate = true;
        }

        renderer.render(scene, camera);
    }
    
    animate3D();
});
