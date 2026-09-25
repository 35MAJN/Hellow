/**
 * 3D EEG Brain Neural Simulation & Anatomical Region Mapping
 * Mohammadali Javadinasab | Portfolio
 * Features: Authentic 3D volumetric point-cloud brain with spontaneous neural bursts
 * AND dynamic anatomical region focusing linked to each portfolio section.
 */

(function () {
    const container = document.getElementById('brain-container');
    const statusEl = document.getElementById('brain-status');
    if (!container) return;

    // --- REGION DEFINITIONS & MAPPINGS ---
    const BRAIN_REGIONS = {
        'overview': {
            id: 'overview',
            nameEn: 'Whole Cortex & Prefrontal Lobe',
            nameFa: 'کل قشر مغز و لوب پیش‌پیشانی',
            descEn: 'Executive function, holistic neural integration & global overview',
            descFa: 'عملکرد اجرایی، یکپارچه‌سازی فعالیت‌های عصبی و نمای کلی',
            cx: 0, cy: 0, cz: 0, radius: 25,
            rotZ: 0, rotX: -Math.PI / 2, autoSpin: true
        },
        'occipital': {
            id: 'occipital',
            nameEn: 'Occipital Lobe [Brodmann 17/18]',
            nameFa: 'لوب پس‌سری (اکسیپیتال) [برودمن ۱۷/۱۸]',
            descEn: 'Core of EEG source localization, inverse problem & visual field processing',
            descFa: 'کانون بازسازی منبع EEG، حل مسئله معکوس و پردازش‌های بینایی',
            cx: 0, cy: -7.2, cz: 1.2, radius: 5.8,
            rotZ: Math.PI, rotX: -Math.PI / 2 + 0.2, autoSpin: false
        },
        'temporal': {
            id: 'temporal',
            nameEn: 'Temporal Lobe [Brodmann 22/41]',
            nameFa: 'لوب گیجگاهی (تمپورال) [برودمن ۲۲/۴۱]',
            descEn: 'Auditory cortex, telecommunications, frequency analysis & signal processing',
            descFa: 'قشر شنوایی، مخابرات، تحلیل فرکانسی و پردازش سیگنال',
            cx: -6.5, cy: -0.5, cz: -1.0, radius: 5.2,
            rotZ: Math.PI / 2, rotX: -Math.PI / 2, autoSpin: false
        },
        'motor': {
            id: 'motor',
            nameEn: 'Primary Motor Strip [Brodmann 4/3]',
            nameFa: 'نوار حرکتی اولیه و قشر حسی-حرکتی [برودمن ۴/۳]',
            descEn: 'Active execution, satellite topology optimization & engineering hands-on research',
            descFa: 'اجرای مهندسی، بهینه‌سازی توپولوژی ماهواره‌ها و تحقیقات عملیاتی',
            cx: 0, cy: 0.5, cz: 6.2, radius: 5.5,
            rotZ: 0, rotX: -Math.PI / 2 + 0.85, autoSpin: false
        },
        'broca': {
            id: 'broca',
            nameEn: "Broca's Area & Parietal Lobe",
            nameFa: 'ناحیه بروکا و لوب آهیانه (پاریتال)',
            descEn: "Speech synthesis (Voice Assistant 'Syntax') & 3D electromagnetic spatial math",
            descFa: "تولید گفتار (دستیار صوتی سنتکس) و محاسبات برداری سه‌بعدی الکترومغناطیس",
            cx: -4.5, cy: 3.8, cz: 1.5, radius: 4.8,
            rotZ: 0.85, rotX: -Math.PI / 2 + 0.2, autoSpin: false
        },
        'reward': {
            id: 'reward',
            nameEn: 'Prefrontal Reward Network',
            nameFa: 'شبکه پاداش پیش‌پیشانی و مدارهای موفقیت',
            descEn: 'High-performance drive, National Rank Top 1% & Decode/IEEE competitions',
            descFa: 'انگیزش دستاورد، رتبه ۱٪ کنکور سراسری و افتخارات مسابقات علمی',
            cx: 0, cy: 6.8, cz: 0.8, radius: 5.0,
            rotZ: 0, rotX: -Math.PI / 2 + 0.12, autoSpin: false
        },
        'cerebellum': {
            id: 'cerebellum',
            nameEn: 'Cerebellum & Dense Networks',
            nameFa: 'مخچه و شبکه‌های پیوندی عصبی',
            descEn: 'Fine motor coordination, precision software (PyTorch, TensorFlow) & hardware',
            descFa: 'هماهنگی و دقت بالا در الگوریتم‌ها (PyTorch، تنسورفلو) و طراحی سخت‌افزار',
            cx: 0, cy: -5.8, cz: -4.5, radius: 5.8,
            rotZ: Math.PI, rotX: -Math.PI / 2 - 0.65, autoSpin: false
        },
        'commissure': {
            id: 'commissure',
            nameEn: 'Corpus Callosum (Interhemispheric)',
            nameFa: 'جسم پینه‌ای (پل ارتباطی بین دونیمکره)',
            descEn: 'Academic bridge connecting SBU, IUST, and KU Leuven (Belgium)',
            descFa: 'پل آکادمیک ارتباط‌دهنده دانشگاه‌های شهید بهشتی، علم و صنعت و لوون بلژیک',
            cx: 0, cy: 0, cz: 2.2, radius: 3.8,
            rotZ: 0.4, rotX: -Math.PI / 2 + 0.55, autoSpin: false
        }
    };

    let currentRegionKey = 'overview';
    let targetRotZ = 0;
    let targetRotX = -Math.PI / 2;
    let autoSpinEnabled = true;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    
    function adjustCamera() {
        if (!container.clientWidth || !container.clientHeight) return;
        const aspect = container.clientWidth / container.clientHeight;
        camera.aspect = aspect;
        camera.updateProjectionMatrix();
        
        const isDocked = container.classList.contains('docked-mode');
        const distanceMultiplier = isDocked ? 1.05 : (aspect < 1 ? (1 / aspect) * 1.2 : 1);
        const safeMultiplier = Math.min(distanceMultiplier, 2.5);
        
        const baseDist = isDocked ? 26 : 25;
        camera.position.set(baseDist * safeMultiplier, 3.7 * safeMultiplier, baseDist * safeMultiplier);
        camera.lookAt(0, 0, 0);
    }
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    adjustCamera(); 
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle texture
    const circleCanvas = document.createElement('canvas');
    circleCanvas.width = 64; 
    circleCanvas.height = 64;
    const circleCtx = circleCanvas.getContext('2d');
    circleCtx.beginPath();
    circleCtx.arc(32, 32, 30, 0, Math.PI * 2);
    circleCtx.fillStyle = '#ffffff';
    circleCtx.fill();
    const circleTexture = new THREE.CanvasTexture(circleCanvas);

    // Gray matter base color (pure theme electric cobalt blue)
    const grayMatterColor = new THREE.Color('#0071e3'); 
    
    let pointsCount = 0;
    let finalPositions;
    let finalBaseColors; 

    // --- DATA LOADING & FALLBACK ---
    async function loadBrainData() {
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
                statusEl.innerHTML = `<i class="fas fa-brain"></i> Neural Cortical Manifold Active (${pointsCount.toLocaleString()} voxels)`;
                setTimeout(() => { if (statusEl && !container.classList.contains('docked-mode')) statusEl.style.opacity = '0'; }, 3200);
            }

        } catch (e) {
            console.log("Using procedural fallback:", e);
            generateProcedural();
        }

        buildBrainMesh();
    }

    function generateProcedural() {
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

    let brainMesh;
    let colorAttr;
    const maxSources = 5;
    const activeSources = Array.from({ length: maxSources }, () => ({ active: false, x: 0, y: 0, z: 0, life: 0 }));

    // Interactive Drag / Orbit state
    let isDragging = false;
    let prevX = 0, prevY = 0;
    let dragRotZ = 0;
    let dragRotX = -Math.PI / 2;

    function buildBrainMesh() {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(finalPositions, 3));
        
        const dynamicColors = new Float32Array(finalBaseColors);
        geometry.setAttribute('color', new THREE.BufferAttribute(dynamicColors, 3));

        const material = new THREE.PointsMaterial({
            size: 2.0,
            vertexColors: true,
            transparent: true,
            opacity: 0.70,
            depthWrite: false,
            map: circleTexture
        });

        brainMesh = new THREE.Points(geometry, material);
        brainMesh.rotation.x = -Math.PI / 2;
        brainMesh.rotation.y = 0;
        brainMesh.rotation.z = 0;
        scene.add(brainMesh);

        colorAttr = geometry.attributes.color;
    }

    loadBrainData();

    // Mouse & Touch Drag listeners
    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        prevX = e.clientX;
        prevY = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;
        prevX = e.clientX;
        prevY = e.clientY;
        dragRotZ += dx * 0.01;
        dragRotX += dy * 0.01;
        targetRotZ = dragRotZ;
        targetRotX = dragRotX;
    });

    window.addEventListener('mouseup', () => { isDragging = false; });

    container.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isDragging = true;
            prevX = e.touches[0].clientX;
            prevY = e.touches[0].clientY;
        }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (!isDragging || e.touches.length !== 1) return;
        const dx = e.touches[0].clientX - prevX;
        const dy = e.touches[0].clientY - prevY;
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
        dragRotZ += dx * 0.01;
        dragRotX += dy * 0.01;
        targetRotZ = dragRotZ;
        targetRotX = dragRotX;
    }, { passive: true });

    window.addEventListener('touchend', () => { isDragging = false; });

    window.addEventListener('resize', () => {
        adjustCamera();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // --- CORTICAL FOCUS FUNCTION ---
    window.focusBrainRegion = function (regionKey) {
        if (!BRAIN_REGIONS[regionKey]) return;
        currentRegionKey = regionKey;
        window.currentRegionKey = regionKey;
        const reg = BRAIN_REGIONS[regionKey];

        targetRotZ = reg.rotZ;
        targetRotX = reg.rotX;
        autoSpinEnabled = reg.autoSpin;

        // Immediately spawn high-potency bursts in this region
        for (let k = 0; k < 3; k++) {
            let s = activeSources[k];
            s.active = true;
            s.life = 1.0;
            s.x = reg.cx + (Math.random() - 0.5) * reg.radius * 0.8;
            s.y = reg.cy + (Math.random() - 0.5) * reg.radius * 0.8;
            s.z = reg.cz + (Math.random() - 0.5) * reg.radius * 0.8;
        }

        // Update status text on HUD
        updateRegionStatusBadge();

        // Highlight active cortical badge in UI
        document.querySelectorAll('.cortical-badge').forEach(b => {
            if (b.getAttribute('data-region') === regionKey) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });
    };

    function updateRegionStatusBadge() {
        if (!statusEl) return;
        const reg = BRAIN_REGIONS[currentRegionKey] || BRAIN_REGIONS['overview'];
        const isFa = document.documentElement.lang === 'fa';
        const name = isFa ? reg.nameFa : reg.nameEn;
        const desc = isFa ? reg.descFa : reg.descEn;

        statusEl.innerHTML = `<strong><i class="fas fa-brain"></i> ${name}</strong><br><span style="font-size: 0.7rem; opacity: 0.85;">${desc}</span>`;
        statusEl.style.opacity = '1';
    }

    // Colors
    const hotRGB1 = new THREE.Color(0x00e5ff); // electric cyan
    const hotRGB2 = new THREE.Color(0x68b684); // bio-emerald
    const hotGold = new THREE.Color(0xffb703); // intense amber

    let time = 0;

    function animate3D() {
        requestAnimationFrame(animate3D);
        time += 0.015;

        if (brainMesh) {
            // Smooth rotation towards target region or auto-spin
            if (!isDragging) {
                if (autoSpinEnabled) {
                    targetRotZ += 0.005;
                    dragRotZ = targetRotZ;
                } else {
                    dragRotZ += (targetRotZ - dragRotZ) * 0.08;
                }
                dragRotX += (targetRotX - dragRotX) * 0.08;
            }

            brainMesh.rotation.z = dragRotZ;
            brainMesh.rotation.x = dragRotX;

            // Spontaneous neural bursts
            activeSources.forEach(s => {
                if (!s.active) {
                    if (Math.random() < 0.02) { 
                        s.active = true;
                        s.life = 1.0;
                        
                        // If a specific region is active, 65% chance the burst spawns inside that region!
                        const reg = BRAIN_REGIONS[currentRegionKey];
                        if (reg && reg.id !== 'overview' && Math.random() < 0.65) {
                            s.x = reg.cx + (Math.random() - 0.5) * reg.radius;
                            s.y = reg.cy + (Math.random() - 0.5) * reg.radius;
                            s.z = reg.cz + (Math.random() - 0.5) * reg.radius;
                        } else {
                            let vIdx = Math.floor(Math.random() * pointsCount) * 3;
                            s.x = finalPositions[vIdx];
                            s.y = finalPositions[vIdx + 1]; 
                            s.z = finalPositions[vIdx + 2];
                        }
                    }
                } else {
                    s.life -= 0.015; 
                    if (s.life <= 0) s.active = false;
                }
            });

            // Active region focal parameters
            const curReg = BRAIN_REGIONS[currentRegionKey];
            const hasFocus = curReg && curReg.id !== 'overview';
            const pulseFactor = 0.5 + 0.5 * Math.sin(time * 3.5);

            // Update surface vertex colors
            for (let i = 0; i < pointsCount; i++) {
                let vx = finalPositions[i * 3];
                let vy = finalPositions[i * 3 + 1];
                let vz = finalPositions[i * 3 + 2];
                
                let totalIntensity = 0;
                
                // 1. Spontaneous heat sources
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

                // 2. Focused anatomical region activation glow
                if (hasFocus) {
                    let rdx = vx - curReg.cx;
                    let rdy = vy - curReg.cy;
                    let rdz = vz - curReg.cz;
                    let regDist = Math.sqrt(rdx * rdx + rdy * rdy + rdz * rdz);
                    
                    if (regDist < curReg.radius) {
                        let regFactor = (1.0 - regDist / curReg.radius);
                        let focusIntensity = Math.pow(regFactor, 1.8) * (0.6 + 0.4 * pulseFactor);
                        totalIntensity += focusIntensity;
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
                    if (totalIntensity > 0.7) {
                        targetHot = hotGold;
                    } else if (totalIntensity > 0.35) {
                        targetHot = hotRGB1;
                    } else {
                        targetHot = hotRGB2;
                    }
                    
                    let lerpFactor = totalIntensity * 1.8;
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

    // --- SCROLL OBSERVER & DOCKING LOGIC ---
    // Maps each section ID to its corresponding brain region
    const SECTION_TO_REGION = {
        'hero': 'overview',
        'profile': 'overview',
        'research': 'occipital',
        'education': 'temporal',
        'experience': 'motor',
        'projects': 'broca',
        'honors': 'reward',
        'skills': 'cerebellum',
        'languages': 'broca',
        'references': 'commissure'
    };

    let lastDetectedRegion = 'overview';

    // IntersectionObserver to sync scroll position with brain region
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
                const sectionId = entry.target.id;
                const regKey = SECTION_TO_REGION[sectionId];
                if (regKey && regKey !== lastDetectedRegion) {
                    lastDetectedRegion = regKey;
                    window.focusBrainRegion(regKey);
                }
            }
        });
    }, {
        root: null,
        threshold: [0.25, 0.5]
    });

    document.querySelectorAll('section[id]').forEach(sec => {
        sectionObserver.observe(sec);
    });

    // Scroll listener to toggle docked floating mini-brain vs hero view
    let heroEl = document.getElementById('hero');
    window.addEventListener('scroll', () => {
        if (!heroEl) return;
        const heroBottom = heroEl.getBoundingClientRect().bottom;
        
        // When scrolled past hero
        if (heroBottom < 100) {
            if (!container.classList.contains('docked-mode')) {
                container.classList.add('docked-mode');
                adjustCamera();
                renderer.setSize(container.clientWidth, container.clientHeight);
                updateRegionStatusBadge();
            }
        } else {
            if (container.classList.contains('docked-mode')) {
                container.classList.remove('docked-mode');
                adjustCamera();
                renderer.setSize(container.clientWidth, container.clientHeight);
                if (currentRegionKey !== 'overview') {
                    window.focusBrainRegion('overview');
                }
            }
        }
    }, { passive: true });

    // Dock toggle controls
    window.toggleDockCollapse = function () {
        container.classList.toggle('dock-collapsed');
        adjustCamera();
        renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.returnToHero = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.focusBrainRegion('overview');
    };
})();
