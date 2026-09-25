/**
 * 3D EEG Brain Neural Simulation & Multi-Angle Cinematic Camera
 * Mohammadali Javadinasab | Portfolio
 * Features:
 * - The 3D brain mesh remains anatomically static in the background.
 * - The user's camera viewpoint dynamically and smoothly glides to tailored anatomical planes
 *   for each portfolio section (Perspective view for Hero, Front view for Core Focus,
 *   Lateral for Education, Superior for Experience, Oblique for Projects, etc.).
 * - Section cards scroll gracefully over the 3D brain in the foreground.
 * - Interactive mouse parallax and drag exploration with gentle return to section view.
 */

window.addEventListener('load', async () => {
    const container = document.getElementById('brain-container');
    const viewBadgeText = document.getElementById('camera-view-text');
    const statusEl = document.getElementById('brain-status');
    if (!container) return;

    // --- THREE.JS SETUP ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Texture for the Brain Points
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

    // --- CINEMATIC SECTION CAMERA ANGLES ---
    // Note: With mesh rotation.x = -Math.PI / 2:
    // Front of brain is towards -Z. Back/Occipital is towards +Z.
    // Up/Top (Vertex) is +Y. Left/Right is ±X.
    const SECTION_CAMERA_VIEWS = {
        'hero': {
            pos: new THREE.Vector3(18, 10, -22),
            lookAt: new THREE.Vector3(0, 0, 0),
            nameEn: 'Perspective View · 3D Neural Cortex',
            nameFa: 'نمای پرسپکتیو · قشر سه‌بعدی عصبی'
        },
        'profile': {
            pos: new THREE.Vector3(14, 6, -24),
            lookAt: new THREE.Vector3(0, -1, 0),
            nameEn: 'Anterolateral View · Executive Prefrontal Cortex',
            nameFa: 'نمای قدامی-جانبی · قشر پیش‌پیشانی اجرایی'
        },
        'research': {
            // Front view: Looking directly at the front of the brain while Core Focus floats on top!
            pos: new THREE.Vector3(0, 1.2, -26),
            lookAt: new THREE.Vector3(0, 0, 0),
            nameEn: 'Frontal View (Anterior) · Core Focus & EEG Inverse Problem',
            nameFa: 'نمای قدامی (روبرو) · تمرکز علمی و حل مسئله معکوس EEG'
        },
        'education': {
            // Lateral view: Looking at temporal lobe from side
            pos: new THREE.Vector3(26, 2, 0),
            lookAt: new THREE.Vector3(0, 0, 0),
            nameEn: 'Lateral Profile (Sagittal) · Temporal Auditory & Signal Cortex',
            nameFa: 'نمای جانبی (پروفایل) · لوب گیجگاهی و مخابرات'
        },
        'experience': {
            // Top-down superior view: Looking down at bilateral motor strips
            pos: new THREE.Vector3(0, 27, -3),
            lookAt: new THREE.Vector3(0, 0, 0),
            nameEn: 'Superior View (Axial Plane) · Motor Strip & Systems Execution',
            nameFa: 'نمای فوقانی (دید از بالا) · نوار حرکتی و اجرای سیستم‌ها'
        },
        'projects': {
            // Anterolateral left oblique view: Broca's area & frontal systems
            pos: new THREE.Vector3(-19, 11, -19),
            lookAt: new THREE.Vector3(0, 0, 0),
            nameEn: 'Anterolateral View · Broca\'s Area & Spatial Electromagnetics',
            nameFa: 'نمای مایل قدامی · ناحیه گفتاری بروکا و الکترومغناطیس'
        },
        'honors': {
            // Elevated perspective with reward network emphasis
            pos: new THREE.Vector3(16, 14, -20),
            lookAt: new THREE.Vector3(0, 1, 0),
            nameEn: 'Elevated Perspective · Reward Circuits & Academic Honors',
            nameFa: 'دید پرسپکتیو زاویه‌دار · مدارهای پاداش و افتخارات'
        },
        'skills': {
            // Inferior-posterior cerebellar view
            pos: new THREE.Vector3(0, -16, 22),
            lookAt: new THREE.Vector3(0, 0, 0),
            nameEn: 'Inferior-Posterior View · Cerebellar Synaptic Toolkit',
            nameFa: 'نمای تحتانی-خلفی · مدارهای سیناپسی مخچه و جعبه‌ابزار'
        },
        'references': {
            // Symmetrical Frontal View
            pos: new THREE.Vector3(0, 5, -26),
            lookAt: new THREE.Vector3(0, 0, 0),
            nameEn: 'Symmetrical Frontal View · Academic Collaboration Network',
            nameFa: 'نمای متقارن روبرو · شبکه همکاری‌های علمی'
        }
    };

    // Camera smoothing state
    let activeSectionKey = 'hero';
    const currentCamPos = new THREE.Vector3().copy(SECTION_CAMERA_VIEWS['hero'].pos);
    const targetCamPos = new THREE.Vector3().copy(SECTION_CAMERA_VIEWS['hero'].pos);
    const currentLookAt = new THREE.Vector3().copy(SECTION_CAMERA_VIEWS['hero'].lookAt);
    const targetLookAt = new THREE.Vector3().copy(SECTION_CAMERA_VIEWS['hero'].lookAt);

    camera.position.copy(currentCamPos);
    camera.lookAt(currentLookAt);

    // Mouse parallax offset
    let mouseParallaxX = 0;
    let mouseParallaxY = 0;
    let targetParallaxX = 0;
    let targetParallaxY = 0;

    window.addEventListener('mousemove', (e) => {
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = -(e.clientY / window.innerHeight) * 2 + 1;
        targetParallaxX = nx * 1.8;
        targetParallaxY = ny * 1.4;
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
        const scale = 24.0 / maxSize; 

        for (let i = 0; i < pointsCount; i++) {
            let x = (rawPoints[i][0] - center.x) * scale;
            let y = (rawPoints[i][1] - center.y) * scale;
            let z = (rawPoints[i][2] - center.z) * scale;

            finalPositions[i * 3] = x;
            finalPositions[i * 3 + 1] = y;
            finalPositions[i * 3 + 2] = z;

            let ny = (y / 12.0); 
            let ambient = 0.55 + 0.45 * Math.max(-0.5, Math.min(1.0, ny)); 
            let c = grayMatterColor.clone().multiplyScalar(ambient);
            
            finalBaseColors[i * 3] = c.r;
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

        // Procedural Brain Fallback
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
            
            let r = 12;
            let fissureDepth = ny > -0.2 ? Math.exp(-Math.pow(nx * 6, 2)) * (ny + 0.2) : 0;
            r -= fissureDepth * 4.0;
            if (nz > 0) r -= Math.pow(nz, 2) * 2.0;
            if (nz < -0.4) r += Math.pow(nz + 0.4, 2) * 1.5;
            let tempLobeL = Math.exp(- (Math.pow(nx + 0.85, 2) + Math.pow(ny + 0.2, 2) + Math.pow(nz, 2)) * 3.5 );
            let tempLobeR = Math.exp(- (Math.pow(nx - 0.85, 2) + Math.pow(ny + 0.2, 2) + Math.pow(nz, 2)) * 3.5 );
            r += (tempLobeL + tempLobeR) * 3.0;
            let f1 = Math.sin(nx * 14) * Math.cos(ny * 14) + Math.sin(ny * 14) * Math.cos(nz * 14) + Math.sin(nz * 14) * Math.cos(nx * 14);
            r += f1 * 0.35;
            if (ny < -0.5) r -= Math.pow(Math.abs(ny + 0.5), 2) * 5;

            let x = r * nx * 0.72; 
            let y = r * ny * 0.85; 
            let z = r * nz * 1.15; 

            finalPositions[pIdx] = x;
            finalPositions[pIdx + 1] = y;
            finalPositions[pIdx + 2] = z;
            
            let ambient = 0.6 + 0.4 * ny; 
            let creaseShadow = (f1 * 0.05); 
            let c = grayMatterColor.clone().multiplyScalar(ambient - creaseShadow);
            
            finalBaseColors[pIdx] = c.r;
            finalBaseColors[pIdx + 1] = c.g;
            finalBaseColors[pIdx + 2] = c.b;
            pIdx += 3;
        }
    }

    // --- BUILD STATIC BRAIN MESH ---
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(finalPositions, 3));
    
    const dynamicColors = new Float32Array(finalBaseColors);
    geometry.setAttribute('color', new THREE.BufferAttribute(dynamicColors, 3));

    const material = new THREE.PointsMaterial({
        size: 2.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.72,
        depthWrite: false,
        map: circleTexture
    });

    // The brain mesh stays STATIC in anatomical space!
    brainMesh = new THREE.Points(geometry, material);
    brainMesh.rotation.x = -Math.PI / 2;
    brainMesh.rotation.y = 0;
    brainMesh.rotation.z = 0;
    brainMesh.position.set(0, 0, 0);
    scene.add(brainMesh);

    colorAttr = geometry.attributes.color;

    // --- SUDDEN HEAT SOURCES LOGIC ---
    const maxSources = 6;
    const activeSources = Array.from({ length: maxSources }, () => ({ active: false, x: 0, y: 0, z: 0, life: 0 }));

    // Interactive Drag to temporarily inspect
    let isUserInteracting = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let prevPointerX = 0;
    let prevPointerY = 0;

    window.addEventListener('mousedown', (e) => {
        // Only if clicking on background or outside inputs
        if (e.target.closest('a, button, input, textarea')) return;
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
        dragOffsetX += dx * 0.05;
        dragOffsetY -= dy * 0.05;
    });

    window.addEventListener('mouseup', () => {
        isUserInteracting = false;
    });

    // Touch support
    window.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1 && !e.target.closest('a, button')) {
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
        dragOffsetX += dx * 0.05;
        dragOffsetY -= dy * 0.05;
    }, { passive: true });

    window.addEventListener('touchend', () => { isUserInteracting = false; });

    // Window Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // --- SECTION TO CAMERA VIEW SWITCHER ---
    const ALIAS_MAP = {
        'occipital': 'research',
        'temporal': 'education',
        'motor': 'experience',
        'broca': 'projects',
        'reward': 'honors',
        'cerebellum': 'skills',
        'commissure': 'references'
    };

    function setCameraView(sectionKey) {
        const mappedKey = ALIAS_MAP[sectionKey] || sectionKey;
        if (!SECTION_CAMERA_VIEWS[mappedKey]) return;
        activeSectionKey = mappedKey;
        const view = SECTION_CAMERA_VIEWS[mappedKey];

        targetCamPos.copy(view.pos);
        targetLookAt.copy(view.lookAt);

        // Update badge text
        if (viewBadgeText) {
            const isFa = document.documentElement.lang === 'fa';
            viewBadgeText.textContent = isFa ? view.nameFa : view.nameEn;
        }

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
    window.focusBrainRegion = setCameraView; // Aliased for cortical badges

    // --- CONTINUOUS SCROLL OBSERVER ---
    // Smoothly tracks the user's scroll position and selects the primary visible section
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

        // Slowly return drag offset to zero when user releases
        if (!isUserInteracting) {
            dragOffsetX *= 0.92;
            dragOffsetY *= 0.92;
        }

        // Interpolate mouse parallax
        mouseParallaxX += (targetParallaxX - mouseParallaxX) * 0.05;
        mouseParallaxY += (targetParallaxY - mouseParallaxY) * 0.05;

        // Smoothly glide camera position and lookAt target towards target viewpoint!
        const computedTargetX = targetCamPos.x + mouseParallaxX + dragOffsetX;
        const computedTargetY = targetCamPos.y + mouseParallaxY + dragOffsetY;
        const computedTargetZ = targetCamPos.z;

        currentCamPos.x += (computedTargetX - currentCamPos.x) * 0.055;
        currentCamPos.y += (computedTargetY - currentCamPos.y) * 0.055;
        currentCamPos.z += (computedTargetZ - currentCamPos.z) * 0.055;

        currentLookAt.lerp(targetLookAt, 0.055);

        camera.position.copy(currentCamPos);
        camera.lookAt(currentLookAt);

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
                        
                        let intensity = Math.max(0, 1.0 - Math.sqrt(distSq) / 7.0);
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
