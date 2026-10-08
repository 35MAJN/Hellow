/**
 * Main Application Logic & Bi-Lingual Support
 * Mohammadali Javadinasab | Portfolio
 */

// --- BILINGUAL TRANSLATION DICTIONARY ---
const translations = {
    en: {
        // Nav
        "nav-home": "Home",
        "nav-about": "About",
        "nav-research": "Research",
        "nav-experience": "Experience",
        "nav-projects": "Projects",
        "nav-education": "Education",
        "nav-skills": "Skills",
        "nav-contact": "Contact",
        "nav-contact-btn": "Contact",
        "nav-siglab": "Signal Lab",
        "nav-menu-title": "Menu",
        "nav-cv": "Curriculum Vitae",
        "btn-install-website": "Install Website",
        "scroll-indicator": "Explore Core Focus & Research",
        "pwa-install": "Install Website",
        "pwa-installed": "Installed",
        "pwa-install-banner": "Install website for fast offline access",
        "pwa-install-btn": "Install Website",
        "pwa-ios-title": "Install on iPhone / iPad",
        "pwa-ios-step1": "1. Tap the Share button in Safari toolbar below.",
        "pwa-ios-step2": "2. Scroll down and select 'Add to Home Screen'.",
        "pwa-ios-step3": "3. Tap 'Add' in the top-right corner to install.",
        "pwa-desktop-title": "Install Website as App",
        "pwa-guide-step1": "In your browser address bar or menu (⋮ / Share), locate the Install or Add to Home Screen option.",
        "pwa-guide-step2": "Click Install to add this portfolio as a standalone desktop or mobile application.",
        "pwa-guide-step3": "Enjoy ultra-fast offline access and immersive full-screen experience anytime.",
        "pwa-modal-done": "Got It",
        "sec-contact-kicker": "Get In Touch",
        "sec-contact-title": "Contact & Collaboration",
        "sec-contact-desc": "Open to research collaborations, academic inquiries, and deep tech discussions.",
        "thanos-tooltip": "Infinity Gauntlet Snap",
        "thanos-restore-tooltip": "Time Stone: Reverse Reality",
        
        // Hero / Brain HUD
        "hud-badge": "Neural Inverse Problem",
        "hud-title": "3D EEG Neural Source Reconstruction",
        "hud-desc": "Interactive dipole simulation mapping volumetric gray-matter electrical activity to scalp potentials in real time.",
        "btn-visual": "Visual (Occipital)",
        "btn-motor": "Motor (Central)",
        "btn-frontal": "Frontal (Cognitive)",
        "btn-multi": "Multi-Dipole Inverse",
        "btn-cap": "10-20 EEG Cap",
        "btn-reset": "Reset View",

        // Profile Card
        "hero-name": "Mohammadali Javadinasab",
        "hero-tagline": "AI Researcher · Electrical Engineer (Signal Processing) · Co-founder of LearnAmuse",
        "hero-bio": "M.Sc. student at Shahid Beheshti University and B.Sc. graduate from Iran University of Science & Technology. Specializing in EEG source localization, brain-computer interfaces (BCI), deep learning architectures for neuroimaging, and reinforcement learning.",
        
        // Highlights
        "stat-1-num": "Top 1%",
        "stat-1-lbl": "National Entrance Exam",
        "stat-1-sub": "Ranked among 150,000+ candidates in Math & Physics",
        "stat-2-num": "Work in Progress",
        "stat-2-lbl": "IEEE TBME Manuscript",
        "stat-2-sub": "3D Deep Learning for EEG Source Localization",
        "stat-3-num": "Head of 7",
        "stat-3-lbl": "IEEE SPS Cup 2022",
        "stat-3-sub": "Deep CNN for synthetic speech attribution",
        "stat-4-num": "3.41 & 3.33",
        "stat-4-lbl": "IUST & SBU GPAs",
        "stat-4-sub": "Electrical Engineering & Signal Processing",

        // Section Titles
        "sec-res-kicker": "Core Focus",
        "sec-res-title": "Research Interests & Publications",
        "sec-res-desc": "Intersecting biomedical signal processing, deep neural networks, and neurocomputational modeling.",
        
        "sec-edu-kicker": "Academic Path",
        "sec-edu-title": "Education",
        "sec-edu-desc": "Formal training in signal processing, telecommunications, and industrial systems engineering.",

        "sec-exp-kicker": "Professional Journey",
        "sec-exp-title": "Experience & Research Roles",
        "sec-exp-desc": "Full-time academic research, freelance data science, and entrepreneurial education technology.",

        "sec-proj-kicker": "Engineering & Code",
        "sec-proj-title": "Selected Projects",
        "sec-proj-desc": "End-to-end implementations spanning speech recognition, electromagnetic field calculations, and IoT.",

        "sec-awards-kicker": "Achievements",
        "sec-awards-title": "Honors & Awards",

        "sec-skills-kicker": "Arsenal",
        "sec-skills-title": "Technical Skills & Competencies",

        "sec-cert-kicker": "Credentials",
        "sec-cert-title": "Certifications & Workshops",

        "sec-ref-kicker": "Endorsements",
        "sec-ref-title": "Academic & Research References",

        // Cortical Regional Focus Badges
        "badge-occipital": "Cortical Focus: Occipital Lobe [Brodmann 17/18] · Visual & EEG Localization",
        "badge-temporal": "Cortical Focus: Temporal Lobe [Brodmann 22/41] · Signal & Frequency Analysis",
        "badge-motor": "Cortical Focus: Primary Motor Strip [Brodmann 4/3] · Engineering Execution",
        "badge-broca": "Cortical Focus: Broca's Speech Area & Parietal Lobe · Voice Assistant & 3D Math",
        "badge-reward": "Cortical Focus: Prefrontal Reward Network · National Rank Top 1% & Honors",
        "badge-cerebellum": "Cortical Focus: Cerebellar Synaptic Circuits · Precision Hardware & AI Toolkit",
        "badge-commissure": "Cortical Focus: Corpus Callosum · Academic Bridge & Collaboration",

        // Research Pillars
        "res-1-title": "Biomedical Signal Processing",
        "res-1-desc": "EEG & speech signal processing, artifact removal, biological wave filtering, and bio-electromagnetics simulation.",
        "res-2-title": "Deep Learning & RL",
        "res-2-desc": "Geometric deep learning on 3D manifolds, reinforcement learning, federated learning, and computer vision architectures.",
        "res-3-title": "Neuroscience & BCI",
        "res-3-desc": "Brain-Computer Interfaces, neuroimaging, neuroengineering, neurofeedback protocols, and cortical dipole dynamics.",
        "res-4-title": "Industrial AI & Decision Making",
        "res-4-desc": "Multi-Attribute Decision Making (MADM: MAIRCA, TOPSIS, PROMETHEE, ELECTRE), supply chain automation, and operations research.",

        // Publications
        "pub-badge": "Target: IEEE Transactions on Biomedical Engineering (TBME)",
        "pub-title": "EEG Source Localization Using Deep Learning",
        "pub-author": "Mohammadali Javadinasab (First Author) · Co-author: Dr. Ehsan Darestani",
        "pub-desc": "Proposed a novel deep learning architecture using 3D input and output representations to improve the spatial accuracy of identifying neural sources from scalp EEG recordings, with source modeling based on 3D spherical and ellipsoidal shapes.",

        // Education Items
        "edu-1-degree": "M.Sc. in Electrical Engineering — Signal Processing",
        "edu-1-inst": "Shahid Beheshti University (SBU)",
        "edu-1-meta": "2025 — Present · Tehran, Iran · GPA: 3.33 / 4.0",
        "edu-1-p": "Advanced research focusing on neural signal analysis, higher-order statistical processing, and bio-electromagnetic wave propagation.",

        "edu-2-degree": "B.Sc. in Electrical Engineering — Telecommunications (Major)",
        "edu-2-inst": "Iran University of Science & Technology (IUST)",
        "edu-2-meta": "2019 — 2024 · Tehran, Iran · GPA: 3.41 / 4.0",
        "edu-2-p": "B.Sc. Thesis: Simulating brain neural activities using head model & retrieving activities using Deep Learning (EEG Inverse Problem). Supervisors: Dr. E. Darestani, Dr. A. Abdolali.",

        "edu-3-degree": "B.Sc. in Industrial Engineering (Minor's Degree)",
        "edu-3-inst": "Iran University of Science & Technology (IUST)",
        "edu-3-meta": "2020 — 2024 · Tehran, Iran · GPA: 3.32 / 4.0",
        "edu-3-p": "Focus on Multi-Attribute Decision Making (MADM), Project Management, Operations Research, and Financial Engineering.",

        "edu-4-degree": "High School Diploma in Mathematics and Physics",
        "edu-4-inst": "Nikan High School",
        "edu-4-meta": "2013 — 2019 · Tehran, Iran · GPA: 18.68 / 20.0",
        "edu-4-p": "Extracurricular: Designed, developed & implemented a GUI application & 5 PCBs for a smart home system using Raspberry Pi 3, NodeMCU ESP8266 (IoT), GSM, and PyQt.",

        // Filter Buttons
        "flt-all": "All",
        "flt-ai": "AI & Machine Learning",
        "flt-signal": "Signal Processing & BCI",
        "flt-eng": "Software & Hardware",

        // Experience Items
        "exp-1-title": "Research & Teaching Assistant",
        "exp-1-inst": "Iran University of Science & Technology (IUST)",
        "exp-1-meta": "2022 — Present · Full-time · On-site & Remote",
        "exp-1-b1": "EEG Source Localization Using Deep Learning: Working under Professor Dr. Ehsan Darestani on 3D convolutional architectures for cortical dipole retrieval (Fall 2022 — Present).",
        "exp-1-b2": "Linear Algebra Teaching Assistant: Led problem-solving recitations and created assignments under Instructor Dr. Saeed Ebadollahi (Fall 2023).",

        "exp-2-title": "AI & Data Science Specialist",
        "exp-2-inst": "Freelancer",
        "exp-2-meta": "2022 — Present · Part-time · Remote",
        "exp-2-b1": "Colon Polyp Detection Hackathon (IUST & Irancell Labs 2025): Developed ML model achieving 95% accuracy in detecting large intestine polyps; integrated with a conversational medical chatbot interface.",
        "exp-2-b2": "Federated Learning with RL: Optimized the communication and cluster topology of imaging satellites using Federated Learning and Reinforcement Learning algorithms (Australia).",
        "exp-2-b3": "Skin Cancer Classification: Trained deep CNN via Transfer Learning (InceptionV3) achieving 95% accuracy on dermatological lesions.",
        "exp-2-b4": "MADM Framework Implementation: Implemented MAIRCA, TOPSIS, PROMETHEE II, and ELECTRE II ranking methods in Python.",

        "exp-3-title": "Co-founder & Web Developer",
        "exp-3-inst": "LearnAmuse",
        "exp-3-meta": "2022 — Present · Part-time · On-site & Remote",
        "exp-3-b1": "Web Application Development: Designed, built, and launched the LearnAmuse.com educational platform.",
        "exp-3-b2": "AI Educator Training: Developed and delivered AI integration courses and digital pedagogy workshops for teachers across Tehran schools.",

        "exp-4-title": "Instructor & Coach",
        "exp-4-inst": "Various Institutions",
        "exp-4-meta": "2020 — 2023 · Part-time",
        "exp-4-b1": "STEM Instructor (Nikan & Solaha High Schools): Taught Deep Learning, Python, and Electronics to high school students.",
        "exp-4-b2": "English Language Teacher (PepTalk Academy): Taught interactive English communication to diverse student cohorts online.",
        "exp-4-b3": "Volleyball Coach: Coached high school volleyball teams focusing on tactical skills and athletic teamwork.",

        "exp-5-title": "R&D Engineer & Course Instructor",
        "exp-5-inst": "Balafan E-Learning AI Academy",
        "exp-5-meta": "2021 — 2023 · Contractual · On-site",
        "exp-5-b1": "R&D Engineer: Built edge video event generation system using NVIDIA Jetson Nano and DeepStream SDK.",
        "exp-5-b2": "Course Instructor: Taught comprehensive Neural Networks and Deep Learning curricula to 35+ enrolled students.",

        "exp-6-title": "Python Developer & Data Scientist",
        "exp-6-inst": "LifeWeb",
        "exp-6-meta": "2021 — 2022 · Contractual · On-site",
        "exp-6-b1": "Jobmetric Project: Built backend using Flask, Elasticsearch, and MongoDB; applied k-NN clustering for LinkedIn professional profiles.",
        "exp-6-b2": "Boursimeh Project: Developed RNN-based stock market signal prediction with news sentiment analysis.",
        "exp-6-b3": "Tenshi-bot Project: Built multi-threaded GUI and Telegram automated bots for supply chain inventory management.",

        // Projects
        "proj-1-title": "Smart Home Voice Assistant 'Syntax'",
        "proj-1-meta": "Deep RNN · SpeechRecognition · TensorFlow · PyQt",
        "proj-1-desc": "Trained a Deep RNN to activate when the wake word 'Syntax' is spoken, achieving 99.59% validation accuracy and 0.058 validation loss. Designed full Windows desktop application to listen to and execute Persian voice automation commands.",

        "proj-2-title": "Field & Flux 3D Simulator",
        "proj-2-meta": "PyQt · Matplotlib · NumPy · Physics Simulation",
        "proj-2-desc": "Desktop software that computes electric field distributions and net flux vectors of arbitrary point charge configurations in 3D space with interactive field line rendering.",

        "proj-3-title": "IoT Smart Home with 7-Inch GUI & Telegram",
        "proj-3-meta": "Raspberry Pi 3 · NodeMCU ESP8266 · Altium Designer · Python",
        "proj-3-desc": "Custom smart home system with automated garden watering, PIR motion stair lighting, SMS/Telegram bot remote triggers, and a custom 7-inch touchscreen dashboard.",

        "proj-4-title": "RoboCupJunior Junior Soccer PCB",
        "proj-4-meta": "Altium Designer · Embedded Systems · Hardware",
        "proj-4-desc": "Designed, fabricated, and tested custom motor driver and sensor PCBs for autonomous soccer robots competing in RoboCupJunior (1st Place High School Division).",

        // Honors
        "h-1-title": "5th Place — Decode Cup Competition",
        "h-1-sub": "Placed 5th out of 20 competitive teams in computer vision and machine learning (2023).",
        "h-2-title": "Head of 7 — IEEE SPS 2022 Signal Processing Cup",
        "h-2-sub": "Led a team of 7 engineers developing Deep CNNs for synthetic speech detection using advanced spectral features (2022).",
        "h-3-title": "1st Place — Huawei Seeds for the Future",
        "h-3-sub": "Awarded 1st team overall in the nationwide 5G, Cloud, and AI program (August 2022).",
        "h-4-title": "Top 1% Nationwide University Entrance Exam",
        "h-4-sub": "Ranked in top 1% among >150,000 examinees in Mathematics & Physics (2019).",
        "h-5-title": "1st Place & Best Outside Hitter — Volleyball Cup",
        "h-5-sub": "Led high school alumni volleyball team to championship victory (2021).",

        // Certifications
        "cert-1": "Practical Workshop on QEEG & EEG (16 Hours, May 2024) — Positive Belief Psychology Center & IPM & SCS",
        "cert-2": "A Journey to the Wonderful World of the Brain (Summer 2023) — National Brain Mapping Laboratory (NBML)",
        "cert-3": "AI on Jetson Nano & Building Video AI Applications at the Edge (Mar 2023) — NVIDIA",
        "cert-4": "Deep Learning Specialization, Recommenders, RL, CNNs, NLP, Deepfakes — Coursera",
        "cert-5": "Seeds for the Future Program (5G, AI & Cloud, Aug 2022) — Huawei",
        "cert-6": "7th Iranian Congress on Brain Mapping (ICBM, 16h, Jul 2023) — NBML",
        "cert-7": "5th Sharif Neuroscience Symposium (In-person, Mar 2023) — Sharif University & IPM",

        // Languages
        "lang-fa-txt": "Persian: Native",
        "lang-en-txt": "English: Upper-Intermediate (TOEFL: 78, Registered: 20 May 2026)",

        // Footer
        "footer-text": "© 2026 Mohammadali Javadinasab. Crafted with precision in Tehran, Iran."
    },
    fa: {
        // Nav
        "nav-home": "خانه",
        "nav-about": "درباره من",
        "nav-research": "پژوهش‌ها",
        "nav-experience": "تجربیات",
        "nav-projects": "پروژه‌ها",
        "nav-education": "تحصیلات",
        "nav-skills": "مهارت‌ها",
        "nav-contact": "تماس",
        "nav-contact-btn": "تماس",
        "nav-siglab": "Signal Lab",
        "nav-menu-title": "منو",
        "nav-cv": "رزومه (CV)",
        "btn-install-website": "نصب وب‌سایت",
        "scroll-indicator": "مشاهده تمرکز علمی و پژوهش‌ها",
        "pwa-install": "نصب وب‌سایت",
        "pwa-installed": "نصب شده",
        "pwa-install-banner": "نصب وب‌سایت برای دسترسی سریع و آفلاین",
        "pwa-install-btn": "نصب وب‌سایت",
        "pwa-ios-title": "نصب در آیفون / آیپد",
        "pwa-ios-step1": "۱. روی دکمه اشتراک‌گذاری (Share) در نوار پایین مرورگر سافاری ضربه بزنید.",
        "pwa-ios-step2": "۲. به پایین رفته و گزینه «Add to Home Screen» را انتخاب کنید.",
        "pwa-ios-step3": "۳. در گوشه بالا دکمه «Add» را برای نصب بزنید.",
        "pwa-desktop-title": "نصب وب‌سایت به عنوان برنامه",
        "pwa-guide-step1": "در نوار آدرس یا منوی مرورگر خود، گزینه نصب (Install) یا «Add to Home Screen» را پیدا کنید.",
        "pwa-guide-step2": "روی Install کلیک کنید تا وب‌سایت به صورت یک اپلیکیشن مستقل اجرا شود.",
        "pwa-guide-step3": "از دسترسی پرسرعت و امکان کارکرد بدون اینترنت لذت ببرید.",
        "pwa-modal-done": "متوجه شدم",
        "sec-contact-kicker": "راه‌های ارتباطی",
        "sec-contact-title": "تماس و همکاری",
        "sec-contact-desc": "مشتاق ارتباطات پژوهشی، پروژه‌های عمیق مهندسی و هوش مصنوعی.",
        "thanos-tooltip": "بشکن تانوس",
        "thanos-restore-tooltip": "بازگردانی با سنگ زمان",

        // Hero / Brain HUD
        "hud-badge": "حل مسئله معکوس عصبی",
        "hud-title": "بازسازی سه‌بعدی منبع عصبی EEG",
        "hud-desc": "شبیه‌سازی تعاملی دوقطبی‌های عصبی و نگاشت آنی فعالیت الکتریکی ماده خاکستری به پتانسیل‌های سطحی مغز.",
        "btn-visual": "دیداری (اکسیپیتال)",
        "btn-motor": "حرکتی (مرکزی)",
        "btn-frontal": "شناختی (فرونتال)",
        "btn-multi": "مسئله معکوس چندگانه",
        "btn-cap": "کلاه ۱۰-۲۰ EEG",
        "btn-reset": "تنظیم مجدد نما",

        // Profile Card
        "hero-name": "محمدعلی جوادی‌نسب",
        "hero-tagline": "پژوهشگر هوش مصنوعی · مهندس برق (پردازش سیگنال) · هم‌بنیان‌گذار LearnAmuse",
        "hero-bio": "دانشجوی کارشناسی ارشد مهندسی برق (گرایش پردازش سیگنال) در دانشگاه شهید بهشتی و فارغ‌التحصیل کارشناسی از دانشگاه علم و صنعت ایران. متخصص در مکان‌یابی منابع EEG، رابط‌های مغز و رایانه (BCI)، یادگیری عمیق در تصویربرداری عصبی و یادگیری تقویتی.",

        // Highlights
        "stat-1-num": "رتبه برتر ۱٪",
        "stat-1-lbl": "کنکور سراسری",
        "stat-1-sub": "در میان بیش از ۱۵۰،۰۰۰ داوطلب رشته ریاضی و فیزیک",
        "stat-2-num": "در دست انتشار",
        "stat-2-lbl": "مقاله ژورنال IEEE TBME",
        "stat-2-sub": "یادگیری عمیق سه‌بعدی برای مکان‌یابی منابع EEG",
        "stat-3-num": "سرپرست تیم ۷ نفره",
        "stat-3-lbl": "جام جهانی IEEE SPS 2022",
        "stat-3-sub": "مدل CNN عمیق برای تشخیص گفتار سنتز شده",
        "stat-4-num": "۳.۴۱ و ۳.۳۳",
        "stat-4-lbl": "معدل کارشناسی و ارشد",
        "stat-4-sub": "دانشگاه‌های علم و صنعت ایران و شهید بهشتی",

        // Section Titles
        "sec-res-kicker": "تمرکز علمی",
        "sec-res-title": "علایق پژوهشی و مقالات",
        "sec-res-desc": "تلاقی پردازش سیگنال‌های زیست‌پزشکی، شبکه‌های عصبی عمیق و مدل‌سازی محاسباتی مغز.",

        "sec-edu-kicker": "سوابق تحصیلی",
        "sec-edu-title": "تحصیلات دانشگاهی",
        "sec-edu-desc": "تحصیل در رشته‌های مهندسی برق مخابرات، پردازش سیگنال و مهندسی صنایع.",

        "sec-exp-kicker": "مسیر حرفه‌ای",
        "sec-exp-title": "سوابق کاری و پژوهشی",
        "sec-exp-desc": "دستیاری پژوهشی تمام‌وقت، پروژه‌های فریلنسری علم داده و فناوری‌های نوین آموزشی.",

        "sec-proj-kicker": "توسعه و مهندسی",
        "sec-proj-title": "پروژه‌های منتخب",
        "sec-proj-desc": "پیاده‌سازی‌های عملی از دستیارهای صوتی تا شبیه‌سازی میدان‌های الکترومغناطیسی و اینترنت اشیا.",

        "sec-awards-kicker": "افتخارات",
        "sec-awards-title": "جوایز و افتخارات",

        "sec-skills-kicker": "جعبه ابزار",
        "sec-skills-title": "مهارت‌های تخصصی و فنی",

        "sec-cert-kicker": "مدارک و دوره‌ها",
        "sec-cert-title": "گواهینامه‌ها و کارگاه‌ها",

        "sec-ref-kicker": "معرف‌ها",
        "sec-ref-title": "اساتید و معرف‌های علمی",

        // Cortical Regional Focus Badges (Persian)
        "badge-occipital": "کانون قشری: لوب پس‌سری (اکسیپیتال) [برودمن ۱۷/۱۸] · مکان‌یابی منبع EEG",
        "badge-temporal": "کانون قشری: لوب گیجگاهی (تمپورال) [برودمن ۲۲/۴۱] · پردازش سیگنال و فرکانس",
        "badge-motor": "کانون قشری: نوار حرکتی اولیه [برودمن ۴/۳] · مهندسی و اجرای سیستم‌ها",
        "badge-broca": "کانون قشری: ناحیه گفتاری بروکا و پاریتال · دستیار صوتی و ریاضیات سه‌بعدی",
        "badge-reward": "کانون قشری: شبکه پاداش پیش‌پیشانی · رتبه ۱٪ کنکور و افتخارات",
        "badge-cerebellum": "کانون قشری: مدارهای سیناپسی مخچه · ابزارهای هوش مصنوعی و سخت‌افزار",
        "badge-commissure": "کانون قشری: جسم پینه‌ای · پل علمی و همکاری‌های بین‌دانشگاهی",

        // Research Pillars
        "res-1-title": "پردازش سیگنال‌های زیست‌پزشکی",
        "res-1-desc": "پردازش سیگنال‌های EEG و گفتار، حذف نویز و آرتیفکت، فیلترینگ امواج زیستی و الکترومغناطیس زیستی.",
        "res-2-title": "یادگیری عمیق و تقویتی",
        "res-2-desc": "یادگیری عمیق هندسی روی فضاهای سه‌بعدی، یادگیری تقویتی (RL)، یادگیری فدرال و بینایی ماشین.",
        "res-3-title": "علوم اعصاب و BCI",
        "res-3-desc": "واسط‌های مغز و رایانه (BCI)، تصویربرداری و مهندسی عصبی، پروتکل‌های نوروفیدبک و دینامیک دوقطبی‌های قشری.",
        "res-4-title": "هوش مصنوعی در صنعت و مدیریت",
        "res-4-desc": "روش‌های تصمیم‌گیری چندمعیاره (MADM: TOPSIS، MAIRCA، PROMETHEE، ELECTRE)، اتوماسیون زنجیره تامین و تحقیق در عملیات.",

        // Publications
        "pub-badge": "در حال آماده‌سازی برای IEEE Transactions on Biomedical Engineering (TBME)",
        "pub-title": "مکان‌یابی منابع EEG با استفاده از یادگیری عمیق",
        "pub-author": "محمدعلی جوادی‌نسب (نویسنده اول) · نویسنده همکار: دکتر احسان دارستانی",
        "pub-desc": "ارائه یک معماری نوین یادگیری عمیق با بازنمایی‌های سه‌بعدی ورودی و خروجی جهت ارتقای دقت مکانی در شناسایی منابع عصبی از ثبت‌های سطحی EEG، با مدل‌سازی منابع بر پایه اشکال سه‌بعدی کروی و بیضوی.",

        // Education Items
        "edu-1-degree": "کارشناسی ارشد مهندسی برق — پردازش سیگنال",
        "edu-1-inst": "دانشگاه شهید بهشتی (SBU)",
        "edu-1-meta": "۱۴۰۳ — اکنون · تهران، ایران · معدل: ۳.۳۳ از ۴.۰",
        "edu-1-p": "پژوهش‌های پیشرفته متمرکز بر تحلیل سیگنال‌های عصبی، پردازش‌های آماری مرتبه بالا و انتشار امواج بیوالکترومغناطیسی.",

        "edu-2-degree": "کارشناسی مهندسی برق — مخابرات (رشته اصلی)",
        "edu-2-inst": "دانشگاه علم و صنعت ایران (IUST)",
        "edu-2-meta": "۱۳۹۸ — ۱۴۰۳ · تهران، ایران · معدل: ۳.۴۱ از ۴.۰",
        "edu-2-p": "پایان‌نامه کارشناسی: شبیه‌سازی فعالیت‌های عصبی مغز با استفاده از مدل سر و بازیابی فعالیت‌ها با یادگیری عمیق (حل مسئله معکوس EEG). اساتید راهنما: دکتر احسان دارستانی، دکتر علی عبدالعالی.",

        "edu-3-degree": "کارشناسی مهندسی صنایع (دوره فرعی Minor)",
        "edu-3-inst": "دانشگاه علم و صنعت ایران (IUST)",
        "edu-3-meta": "۱۳۹۹ — ۱۴۰۳ · تهران، ایران · معدل: ۳.۳۲ از ۴.۰",
        "edu-3-p": "تمرکز بر روش‌های تصمیم‌گیری چندمعیاره (MADM)، مدیریت و کنترل پروژه، تحقیق در عملیات و مهندسی مالی.",

        "edu-4-degree": "دیپلم ریاضی و فیزیک",
        "edu-4-inst": "دبیرستان نیکان",
        "edu-4-meta": "۱۳۹۲ — ۱۳۹۸ · تهران، ایران · معدل: ۱۸.۶۸ از ۲۰",
        "edu-4-p": "فعالیت فوق‌برنامه: طراحی و ساخت اپلیکیشن گرافیکی و ۵ برد مدار چاپی (PCB) برای سیستم خانه هوشمند با رزبری‌پای ۳، ESP8266، ماژول GSM و PyQt.",

        // Filter Buttons
        "flt-all": "همه موارد",
        "flt-ai": "هوش مصنوعی و ML",
        "flt-signal": "پردازش سیگنال و BCI",
        "flt-eng": "نرم‌افزار و سخت‌افزار",

        // Experience Items
        "exp-1-title": "دستیار پژوهشی و آموزشی",
        "exp-1-inst": "دانشگاه علم و صنعت ایران (IUST)",
        "exp-1-meta": "۱۴۰۱ — اکنون · تمام وقت · حضوری و از راه دور",
        "exp-1-b1": "مکان‌یابی منبع EEG با یادگیری عمیق: پژوهش تحت هدایت استاد دکتر احسان دارستانی روی شبکه‌های کانولوشنی سه‌بعدی جهت بازیابی دوقطبی‌های قشری (از پاییز ۱۴۰۱).",
        "exp-1-b2": "دستیار آموزشی درس جبر خطی: برگزاری کلاس‌های حل تمرین و آزمونک‌ها تحت نظر استاد دکتر سعید عباداللهی (پاییز ۱۴۰۲).",

        "exp-2-title": "متخصص هوش مصنوعی و علم داده",
        "exp-2-inst": "فریلنسر (پروژه‌ای)",
        "exp-2-meta": "۱۴۰۱ — اکنون · پاره وقت · از راه دور",
        "exp-2-b1": "مسابقه تشخیص پولیپ روده (هکاتون علم و صنعت و ایرانسل لبز ۲۰۲۵): توسعه مدل یادگیری ماشین با دقت ۹۵٪ در شناسایی پولیپ‌ها به همراه چت‌بات تعاملی پزشکی.",
        "exp-2-b2": "یادگیری فدرال با یادگیری تقویتی: بهینه‌سازی توپولوژی ارتباطی ماهواره‌های تصویربرداری با استفاده از الگوریتم‌های Federated Learning و RL (استرالیا).",
        "exp-2-b3": "طبقه‌بندی سرطان پوست: آموزش مدل عمیق با تکنیک Transfer Learning (InceptionV3) با دقت ۹۵٪ روی ضایعات پوستی.",
        "exp-2-b4": "پیاده‌سازی فریم‌ورک MADM: توسعه ماژول‌های رتبه‌بندی MAIRCA، TOPSIS، PROMETHEE II و ELECTRE II با پایتون.",

        "exp-3-title": "هم‌بنیان‌گذار و توسعه‌دهنده وب",
        "exp-3-inst": "LearnAmuse",
        "exp-3-meta": "۱۴۰۱ — اکنون · پاره وقت · حضوری و آنلاین",
        "exp-3-b1": "توسعه سامانه وب: طراحی، پیاده‌سازی و راه‌اندازی پلتفرم آموزشی LearnAmuse.com.",
        "exp-3-b2": "آموزش هوش مصنوعی به معلمان: طراحی و ارائه دوره‌های ادغام هوش مصنوعی در آموزش برای معلمان مدارس تهران.",

        "exp-4-title": "مدرس و مربی",
        "exp-4-inst": "موسسات آموزشی مختلف",
        "exp-4-meta": "۱۳۹۹ — ۱۴۰۲ · پاره وقت",
        "exp-4-b1": "مدرس STEM (دبیرستان‌های نیکان و صلحا): تدریس یادگیری عمیق، پایتون و الکترونیک به دانش‌آموزان دبیرستانی.",
        "exp-4-b2": "مدرس زبان انگلیسی (آکادمی PepTalk): تدریس مکالمه تعاملی انگلیسی به گروه‌های مختلف دانش‌پژوهان.",
        "exp-4-b3": "مربی والیبال: مربی‌گری تیم‌های والیبال دبیرستان با تمرکز بر تاکتیک‌های تیمی و مهارت‌های بدنی.",

        "exp-5-title": "مهندس تحقیق و توسعه و مدرس دوره‌ها",
        "exp-5-inst": "آکادمی آموزش مجازی هوش مصنوعی بالفان",
        "exp-5-meta": "۱۴۰۰ — ۱۴۰۲ · قراردادی · حضوری",
        "exp-5-b1": "مهندس R&D: ساخت سیستم تولید رخداد ویدئویی با بردهای NVIDIA Jetson Nano و کیت توسعه DeepStream.",
        "exp-5-b2": "مدرس دوره: آموزش سرفصل‌های جامع شبکه‌های عصبی و یادگیری عمیق به بیش از ۳۵ دانشجو.",

        "exp-6-title": "توسعه‌دهنده پایتون و دانشمند داده",
        "exp-6-inst": "لایف‌وب (LifeWeb)",
        "exp-6-meta": "۱۴۰۰ — ۱۴۰۱ · قراردادی · حضوری",
        "exp-6-b1": "پروژه جاب‌متریک: توسعه بک‌اند با فریم‌ورک Flask، الاستیک‌سرچ و مانگودی‌بی؛ خوشه‌بندی k-NN برای پروفایل‌های لینکدین.",
        "exp-6-b2": "پروژه بورسیمه: پیش‌بینی سیگنال‌های بازار سرمایه با شبکه‌های RNN و تحلیل احساسات اخبار.",
        "exp-6-b3": "پروژه تنشی‌بات: توسعه ربات‌های تلگرام چندنخی و رابط کاربری جهت اتوماسیون مدیریت انبار و زنجیره تامین.",

        // Projects
        "proj-1-title": "دستیار صوتی هوشمند خانه 'Syntax'",
        "proj-1-meta": "RNN عمیق · SpeechRecognition · تنسورفلو · PyQt",
        "proj-1-desc": "آموزش مدل RNN عمیق برای بیدارباش با کلمه 'Syntax' با دقت ولیدیشن ۹۹.۵۹٪ و خطای ۰.۰۵۸. طراحی اپلیکیشن ویندوز برای شنیدن و اجرای دستورات صوتی فارسی.",

        "proj-2-title": "شبیه‌ساز سه‌بعدی میدان و شار الکتریکی",
        "proj-2-meta": "PyQt · Matplotlib · NumPy · شبیه‌سازی فیزیک",
        "proj-2-desc": "نرم‌افزار دسکتاپ برای محاسبه توزیع میدان الکتریکی و خطوط شار بارهای نقطه‌ای دلخواه در فضای سه‌بعدی به همراه رندر تعاملی.",

        "proj-3-title": "سیستم خانه هوشمند با نمایشگر ۷ اینچی و تلگرام",
        "proj-3-meta": "Raspberry Pi 3 · NodeMCU ESP8266 · آلتیوم دیزاینر · پایتون",
        "proj-3-desc": "سیستم هوشمند سفارشی با آبیاری هوشمند باغچه، روشنایی هوشمند راه‌پله با سنسورهای حرکتی، کنترل پیامکی و ربات تلگرام به همراه تاچ‌اسکرین ۷ اینچ.",

        "proj-4-title": "برد مدار چاپی ربات فوتبالیست RoboCupJunior",
        "proj-4-meta": "Altium Designer · سیستم‌های امبدد · طراحی سخت‌افزار",
        "proj-4-desc": "طراحی، ساخت و تست بردهای درایور موتور و سنسورهای ربات خودمختار مسابقات ربوکاپ جونیور (مقام اول مسابقات دبیرستان).",

        // Honors
        "h-1-title": "رتبه پنجم مسابقات Decode Cup",
        "h-1-sub": "کسب رتبه ۵ از میان ۲۰ تیم رقابتی در زمینه بینایی ماشین و یادگیری عمیق (۱۴۰۲).",
        "h-2-title": "سرپرست تیم ۷ نفره — جام پردازش سیگنال IEEE SPS 2022",
        "h-2-sub": "رهبری تیم در توسعه CNNهای عمیق برای تفکیک گفتار سنتزشده با استفاده از ویژگی‌های طیفی پیشرفته (۱۴۰۱).",
        "h-3-title": "تیم اول برنامه Seeds for the Future هواوی",
        "h-3-sub": "کسب رتبه نخست کشوری در برنامه جامع 5G، رایانش ابری و هوش مصنوعی (مرداد ۱۴۰۱).",
        "h-4-title": "رتبه برتر ۱٪ کنکور سراسری کارشناسی",
        "h-4-sub": "قرارگیری در جمع ۱٪ نخست داوطلبان کنکور ریاضی و فیزیک با بیش از ۱۵۰،۰۰۰ داوطلب (۱۳۹۸).",
        "h-5-title": "مقام اول و بهترین اسپکر والیبال فارغ‌التحصیلان نیکان",
        "h-5-sub": "کسب مقام قهرمانی و عنوان بهترین مهاجم مسابقات جام فارغ‌التحصیلان (۱۴۰۰).",

        // Certifications
        "cert-1": "کارگاه تخصصی QEEG و EEG (۱۶ ساعت، اردیبهشت ۱۴۰۳) — مرکز باور مثبت، پژوهشگاه دانش‌های بنیادی (IPM) و SCS",
        "cert-2": "سفری به دنیای شگفت‌انگیز مغز (تابستان ۱۴۰۲) — آزمایشگاه ملی نقشه‌برداری مغز (NBML)",
        "cert-3": "هوش مصنوعی روی Jetson Nano و پردازش لبه ویدئویی (اسفند ۱۴۰۱) — شرکت NVIDIA",
        "cert-4": "تخصص یادگیری عمیق، سیستم‌های توصیه‌گر، RL، CNNها و NLP — کورسرا (Coursera)",
        "cert-5": "برنامه بذرها برای آینده (5G، هوش مصنوعی و کلاد، ۱۴۰۱) — شرکت هوآوی",
        "cert-6": "هفتمین کنگره بین‌المللی نقشه‌برداری مغز ایران (ICBM، ۱۶ ساعت، ۱۴۰۲) — NBML",
        "cert-7": "پنجمین سمپوزیوم علوم اعصاب شریف (حضوری، اسفند ۱۴۰۱) — دانشگاه شریف و IPM",

        // Languages
        "lang-fa-txt": "فارسی: زبان مادری (Native)",
        "lang-en-txt": "انگلیسی: سطح پیشرفته Upper-Intermediate (تافل: ۷۸، تاریخ آزمون مجدد: ۳۰ اردیبهشت ۱۴۰۵)",

        // Footer
        "footer-text": "© ۲۰۲۶ محمدعلی جوادی‌نسب. طراحی شده با بالاترین استاندارد مهندسی در تهران، ایران."
    }
};

let currentLang = 'en';

// Language Toggle Function
function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'fa') ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    const langBtn = document.getElementById('lang-btn');
    if (langBtn) {
        langBtn.title = (lang === 'en') ? 'Switch to Persian' : 'تغییر به انگلیسی';
    }

    const thanosBtn = document.getElementById('thanos-btn');
    if (thanosBtn) {
        const isSnapped = thanosBtn.classList.contains('snapped');
        if (lang === 'fa') {
            thanosBtn.title = isSnapped ? 'سنگ زمان: بازگردانی واقعیت و کارت‌ها' : 'بشکن تانوس: پودر کردن ۵۰٪ از کارت‌ها';
        } else {
            thanosBtn.title = isSnapped ? 'Time Stone: Reverse Snap & Reassemble Reality' : 'Thanos Snap: Disintegrate 50% of Content';
        }
    }

    if (typeof window.focusBrainRegion === 'function' && window.currentRegionKey) {
        window.focusBrainRegion(window.currentRegionKey);
    }
}

// Function to synchronize theme with Signal Lab (siglab.majn35.ir)
function updateSiglabThemeUrls(theme) {
    const activeTheme = theme || (document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

    // Dynamically update href for all links pointing to Signal Lab
    document.querySelectorAll('a[href*="siglab.majn35.ir"]').forEach(link => {
        try {
            const rawHref = link.getAttribute('href') || 'https://siglab.majn35.ir';
            const url = new URL(rawHref.startsWith('http') ? rawHref : `https://siglab.majn35.ir`);
            url.searchParams.set('theme', activeTheme);
            link.setAttribute('href', url.toString());
        } catch (e) {
            link.setAttribute('href', `https://siglab.majn35.ir/?theme=${activeTheme}`);
        }
    });

    // Persist shared cross-subdomain cookie for majn35.ir
    try {
        const hostname = window.location.hostname;
        if (hostname.endsWith('majn35.ir')) {
            document.cookie = `theme=${activeTheme}; domain=.majn35.ir; path=/; max-age=31536000; SameSite=Lax`;
        }
    } catch (e) {
        // Ignore cookie security restrictions
    }
}

// Theme Switcher Function
function toggleTheme() {
    const body = document.body;
    const themeBtn = document.getElementById('theme-btn');
    const isDark = body.getAttribute('data-theme') === 'dark';

    if (isDark) {
        body.setAttribute('data-theme', 'light');
        if (themeBtn) themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
        updateSiglabThemeUrls('light');
    } else {
        body.setAttribute('data-theme', 'dark');
        if (themeBtn) themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
        updateSiglabThemeUrls('dark');
    }
}

// Filter Function for Cards
window.filterCards = function(category, btnEl) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    const cards = document.querySelectorAll('[data-category]');
    cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (category === 'all' || cat.includes(category)) {
            card.style.display = 'block';
            card.style.opacity = '1';
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }
    });
};

// Document Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Theme initialization (default is bright / light theme)
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        const themeBtn = document.getElementById('theme-btn');
        if (themeBtn) themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        updateSiglabThemeUrls('dark');
    } else {
        document.body.setAttribute('data-theme', 'light');
        const themeBtn = document.getElementById('theme-btn');
        if (themeBtn) themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        updateSiglabThemeUrls('light');
    }

    // Ensure clicks on Signal Lab links always carry the real-time active theme
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href*="siglab.majn35.ir"]');
        if (link) {
            const currentTheme = document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
            try {
                const rawHref = link.getAttribute('href') || 'https://siglab.majn35.ir';
                const url = new URL(rawHref.startsWith('http') ? rawHref : `https://siglab.majn35.ir`);
                url.searchParams.set('theme', currentTheme);
                link.setAttribute('href', url.toString());
            } catch (err) {
                link.setAttribute('href', `https://siglab.majn35.ir/?theme=${currentTheme}`);
            }
        }
    });

    // Language Toggle Button
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            setLanguage(currentLang === 'en' ? 'fa' : 'en');
        });
    }

    // Theme Toggle Button
    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }

    // Defer dynamic visual effects until main thread is idle for instant FCP and low TBT
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            initSvgMorph();
            initBackgroundParticles();
        }, { timeout: 1200 });
    } else {
        setTimeout(() => {
            initSvgMorph();
            initBackgroundParticles();
        }, 150);
    }

    // Scroll Elements: Progress Bar, Back to Top Button, Side Navigation Rail
    initScrollElements();

    // Progressive Web App (PWA) Features & Service Worker
    initPWA();

    // Responsive Mobile & Tablet Navigation Drawer
    initMobileNav();
});

// Interactive Futuristic Neural Scroll Elements
function initScrollElements() {
    const progressBar = document.getElementById('scroll-progress-bar');
    const scrollTopBtn = document.getElementById('scroll-to-top-btn');
    const ringCircle = document.getElementById('scroll-ring-circle');
    const btnPct = document.getElementById('scroll-btn-pct');
    const railDots = document.querySelectorAll('.scroll-rail-dot');
    
    // Total circumference for r=23 is 2 * PI * 23 ≈ 144.51
    const circumference = 2 * Math.PI * 23;
    if (ringCircle) {
        ringCircle.style.strokeDasharray = `${circumference}`;
        ringCircle.style.strokeDashoffset = `${circumference}`;
    }

    const sections = [
        document.getElementById('hero'),
        document.getElementById('research'),
        document.getElementById('education'),
        document.getElementById('experience'),
        document.getElementById('projects'),
        document.getElementById('honors'),
        document.getElementById('skills'),
        document.getElementById('references')
    ].filter(Boolean);

    function onScroll() {
        const winScroll = window.scrollY || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        const boundedScrolled = Math.min(100, Math.max(0, scrolled));
        const roundedScrolled = Math.round(boundedScrolled);
        
        // 1. Top Progress Bar
        if (progressBar) {
            progressBar.style.width = `${boundedScrolled}%`;
        }

        // 2. Circular Back-to-Top Button Ring and Label
        if (ringCircle) {
            const offset = circumference - (boundedScrolled / 100) * circumference;
            ringCircle.style.strokeDashoffset = `${offset}`;
        }
        if (btnPct) {
            btnPct.textContent = `${roundedScrolled}%`;
        }

        if (scrollTopBtn) {
            if (winScroll > 340) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }

        // 3. Active Section Detection for Side Scroll Rail
        let currentSectionId = 'hero';
        const scrollPosition = winScroll + 240;

        sections.forEach(sec => {
            if (sec && sec.offsetTop <= scrollPosition) {
                currentSectionId = sec.id;
            }
        });

        railDots.forEach(dot => {
            if (dot.getAttribute('data-section') === currentSectionId) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Hero scroll cue smooth scroll
    const heroScrollBtn = document.querySelector('#hero .scroll-indicator');
    if (heroScrollBtn) {
        heroScrollBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById('research');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Side rail dots smooth scroll
    railDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const secId = dot.getAttribute('data-section');
            const target = document.getElementById(secId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// High-Performance Ambient Synaptic Logo Accent (Instant Speed Index & Zero-TBT)
function initSvgMorph() {
    const svg = document.getElementById('morph-svg');
    if (!svg) return;

    const isMobile = window.innerWidth <= 768;
    const svgNS = "http://www.w3.org/2000/svg";
    const width = 800;
    const height = 180;

    // Elegant constellation accent nodes around the crisp typography
    const nodesCount = isMobile ? 12 : 24;
    const nodes = [];
    const edges = [];
    const frag = document.createDocumentFragment();

    // Fixed pre-placed aesthetic coordinate anchors around the name "JAVADINASAB"
    for (let i = 0; i < nodesCount; i++) {
        const xAnchor = 140 + (i / nodesCount) * 520;
        const yAnchor = 65 + Math.sin(i * 1.5) * 35;

        const circle = document.createElementNS(svgNS, 'circle');
        circle.setAttribute('r', (Math.random() * 1.4 + 1.2).toFixed(1));
        circle.setAttribute('class', 'morph-node');
        frag.appendChild(circle);

        nodes.push({
            el: circle,
            x: xAnchor + (Math.random() * 14 - 7),
            y: yAnchor + (Math.random() * 14 - 7),
            baseX: xAnchor,
            baseY: yAnchor,
            speed: 0.0008 + (i % 3) * 0.0004,
            offset: i * 0.6
        });
    }

    // Connect adjacent nodes with subtle neural synaptic links
    const maxEdges = isMobile ? 8 : 16;
    for (let i = 0; i < nodesCount - 1 && edges.length < maxEdges; i += 2) {
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('class', 'morph-edge');
        line.style.opacity = '0.14';
        frag.appendChild(line);
        edges.push({ el: line, i: i, j: i + 1 });
    }

    svg.appendChild(frag);

    let lastFrame = 0;
    function animateMorph(time) {
        if (document.hidden || window.scrollY > window.innerHeight * 1.1) {
            requestAnimationFrame(animateMorph);
            return;
        }

        // Throttle SVG DOM updates to ~24fps to conserve main thread CPU
        if (time - lastFrame < 40) {
            requestAnimationFrame(animateMorph);
            return;
        }
        lastFrame = time;

        const t = time;
        for (let i = 0; i < nodesCount; i++) {
            const n = nodes[i];
            const curX = n.baseX + Math.sin(t * n.speed + n.offset) * 8;
            const curY = n.baseY + Math.cos(t * n.speed * 1.2 + n.offset) * 6;
            n.el.setAttribute('cx', curX.toFixed(1));
            n.el.setAttribute('cy', curY.toFixed(1));
        }

        for (let e = 0; e < edges.length; e++) {
            const edge = edges[e];
            const nA = nodes[edge.i];
            const nB = nodes[edge.j];
            edge.el.setAttribute('x1', nA.el.getAttribute('cx'));
            edge.el.setAttribute('y1', nA.el.getAttribute('cy'));
            edge.el.setAttribute('x2', nB.el.getAttribute('cx'));
            edge.el.setAttribute('y2', nB.el.getAttribute('cy'));
        }

        requestAnimationFrame(animateMorph);
    }

    requestAnimationFrame(animateMorph);
}

// 2D Ambient Background Particles (Desktop Only & Throttled)
function initBackgroundParticles() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    // Skip on mobile devices to preserve CPU and GPU battery
    if (window.innerWidth <= 768) {
        canvas.style.display = 'none';
        return;
    }

    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    class BgParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.2 + 1.0;
            this.vx = (Math.random() - 0.5) * 0.2;
            this.vy = (Math.random() - 0.5) * 0.2;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        draw(isDark) {
            ctx.fillStyle = isDark ? 'rgba(56, 189, 248, 0.18)' : 'rgba(0, 102, 204, 0.10)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const pCount = 18;
    for (let i = 0; i < pCount; i++) {
        particles.push(new BgParticle());
    }

    let lastDraw = 0;
    function loop(time) {
        if (document.hidden || window.scrollY > window.innerHeight * 1.2) {
            requestAnimationFrame(loop);
            return;
        }

        // Throttle ambient canvas to ~30fps
        if (time - lastDraw < 33) {
            requestAnimationFrame(loop);
            return;
        }
        lastDraw = time;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        for (let i = 0; i < pCount; i++) {
            particles[i].update();
            particles[i].draw(isDark);
        }
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
}

// --- PROGRESSIVE WEB APP (PWA) INSTALL & LIFECYCLE CONTROLLER ---
function initPWA() {
    // 1. Service Worker Registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then((reg) => {
                console.log('MAJN 35 PWA: ServiceWorker active, scope:', reg.scope);
            }).catch((err) => {
                console.warn('MAJN 35 PWA: ServiceWorker registration error:', err);
            });
        });
    }

    // 2. UI Elements
    const pwaNavBtn = document.getElementById('pwa-install-btn');
    const pwaDrawerBtn = document.getElementById('mobile-drawer-pwa');
    const pwaBanner = document.getElementById('pwa-banner');
    const iosModal = document.getElementById('pwa-ios-modal');
    let deferredPrompt = null;

    // Detect if running in standalone mode (already installed on homescreen)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                         window.navigator.standalone === true;

    // Detect iOS devices (iPhone, iPad, iPod)
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent) && !window.MSStream;

    if (isStandalone) {
        if (pwaNavBtn) {
            pwaNavBtn.classList.add('is-installed');
            pwaNavBtn.innerHTML = '<i class="fas fa-check-circle"></i> <span class="btn-install-text">' + (document.documentElement.lang === 'fa' ? 'نصب شد' : 'Installed') + '</span>';
        }
        if (pwaDrawerBtn) pwaDrawerBtn.style.display = 'none';
        if (pwaBanner) pwaBanner.style.display = 'none';
        return;
    }

    // Ensure the CTA button is visible and active
    if (pwaNavBtn) {
        pwaNavBtn.style.display = 'inline-flex';
    }

    if (isIOS) {
        if (pwaDrawerBtn) pwaDrawerBtn.style.display = 'block';
        if (pwaBanner && !sessionStorage.getItem('pwa_banner_dismissed')) {
            setTimeout(() => {
                pwaBanner.style.display = 'flex';
            }, 2500);
        }
    }

    // Chromium / Android / Edge / Desktop beforeinstallprompt hook
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;

        if (pwaNavBtn) pwaNavBtn.style.display = 'inline-flex';
        if (pwaDrawerBtn) pwaDrawerBtn.style.display = 'block';
        if (pwaBanner && !sessionStorage.getItem('pwa_banner_dismissed')) {
            setTimeout(() => {
                pwaBanner.style.display = 'flex';
            }, 1800);
        }
    });

    function showInstallGuidance() {
        if (!iosModal) return;
        const modalTitle = document.getElementById('pwa-modal-title');
        const modalSteps = document.getElementById('pwa-modal-steps');
        const isPersian = document.documentElement.lang === 'fa';

        if (isIOS) {
            if (modalTitle) modalTitle.textContent = isPersian ? 'نصب در آیفون / آیپد' : 'Install on iPhone / iPad';
            if (modalSteps) {
                modalSteps.innerHTML = isPersian ? `
                    <div class="pwa-ios-step">
                        <span class="pwa-ios-step-num">۱</span>
                        <p>روی دکمه اشتراک‌گذاری <strong>(Share)</strong> <i class="fas fa-arrow-up-from-bracket pwa-ios-icon-highlight"></i> در نوار سافاری ضربه بزنید.</p>
                    </div>
                    <div class="pwa-ios-step">
                        <span class="pwa-ios-step-num">۲</span>
                        <p>به پایین بروید و گزینه <i class="fas fa-plus-square pwa-ios-icon-highlight"></i> <strong>Add to Home Screen</strong> را انتخاب کنید.</p>
                    </div>
                    <div class="pwa-ios-step">
                        <span class="pwa-ios-step-num">۳</span>
                        <p>در گوشه بالا دکمه <strong>Add</strong> را برای نصب بزنید.</p>
                    </div>` : `
                    <div class="pwa-ios-step">
                        <span class="pwa-ios-step-num">1</span>
                        <p>Tap the <strong>Share</strong> button <i class="fas fa-arrow-up-from-bracket pwa-ios-icon-highlight"></i> in the Safari toolbar below.</p>
                    </div>
                    <div class="pwa-ios-step">
                        <span class="pwa-ios-step-num">2</span>
                        <p>Scroll down and select <i class="fas fa-plus-square pwa-ios-icon-highlight"></i> <strong>Add to Home Screen</strong>.</p>
                    </div>
                    <div class="pwa-ios-step">
                        <span class="pwa-ios-step-num">3</span>
                        <p>Tap <strong>Add</strong> in the top-right corner to complete installation.</p>
                    </div>`;
            }
        } else {
            if (modalTitle) modalTitle.textContent = isPersian ? 'نصب وب‌سایت به عنوان اپلیکیشن' : 'Install Website as App';
            if (modalSteps) {
                modalSteps.innerHTML = isPersian ? `
                    <div class="pwa-ios-step">
                        <span class="pwa-ios-step-num">۱</span>
                        <p>در مرورگر کروم یا اج، روی آیکون <strong>Install</strong> <i class="fas fa-download pwa-ios-icon-highlight"></i> در انتهای نوار آدرس کلیک کنید.</p>
                    </div>
                    <div class="pwa-ios-step">
                        <span class="pwa-ios-step-num">۲</span>
                        <p>یا از منوی مرورگر (⋮)، گزینه <strong>Save and share</strong> یا <strong>Install</strong> را بزنید.</p>
                    </div>
                    <div class="pwa-ios-step">
                        <span class="pwa-ios-step-num">۳</span>
                        <p>وب‌سایت بلافاصله به عنوان یک برنامه مجزا و پرسرعت در سیستم شما نصب می‌شود.</p>
                    </div>` : `
                    <div class="pwa-ios-step">
                        <span class="pwa-ios-step-num">1</span>
                        <p>In Chrome or Edge, click the <strong>Install</strong> icon <i class="fas fa-download pwa-ios-icon-highlight"></i> in the address bar.</p>
                    </div>
                    <div class="pwa-ios-step">
                        <span class="pwa-ios-step-num">2</span>
                        <p>Alternatively, open browser menu (⋮) and choose <strong>Save and share</strong> → <strong>Install app</strong>.</p>
                    </div>
                    <div class="pwa-ios-step">
                        <span class="pwa-ios-step-num">3</span>
                        <p>Launch instantly from your desktop, taskbar, or home screen with full offline access.</p>
                    </div>`;
            }
        }

        iosModal.style.display = 'flex';
        iosModal.setAttribute('aria-hidden', 'false');
    }

    async function handleInstallClick() {
        if (deferredPrompt) {
            try {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    if (pwaNavBtn) {
                        pwaNavBtn.classList.add('is-installed');
                        pwaNavBtn.innerHTML = '<i class="fas fa-check-circle"></i> <span class="btn-install-text">' + (document.documentElement.lang === 'fa' ? 'نصب شد' : 'Installed') + '</span>';
                    }
                    if (pwaDrawerBtn) pwaDrawerBtn.style.display = 'none';
                    if (pwaBanner) pwaBanner.style.display = 'none';
                }
            } catch (err) {
                console.warn('Install prompt error:', err);
                showInstallGuidance();
            }
            deferredPrompt = null;
        } else {
            showInstallGuidance();
        }
    }

    if (pwaNavBtn) pwaNavBtn.addEventListener('click', handleInstallClick);
    const bannerInstallBtn = document.getElementById('pwa-banner-install-btn');
    if (bannerInstallBtn) bannerInstallBtn.addEventListener('click', handleInstallClick);
    const drawerInstallBtn = document.getElementById('mobile-drawer-install-btn');
    if (drawerInstallBtn) drawerInstallBtn.addEventListener('click', handleInstallClick);

    // Dismiss banner
    const bannerCloseBtn = document.getElementById('pwa-banner-close-btn');
    if (bannerCloseBtn) {
        bannerCloseBtn.addEventListener('click', () => {
            if (pwaBanner) pwaBanner.style.display = 'none';
            sessionStorage.setItem('pwa_banner_dismissed', 'true');
        });
    }

    // iOS Guidance Modal controls
    const iosCloseBtn = document.getElementById('pwa-ios-close-btn');
    const iosDoneBtn = document.getElementById('pwa-ios-done-btn');
    const iosBackdrop = document.getElementById('pwa-ios-backdrop');
    [iosCloseBtn, iosDoneBtn, iosBackdrop].forEach(el => {
        if (el) el.addEventListener('click', () => {
            if (iosModal) {
                iosModal.style.display = 'none';
                iosModal.setAttribute('aria-hidden', 'true');
            }
        });
    });

    // App Installed listener
    window.addEventListener('appinstalled', () => {
        deferredPrompt = null;
        if (pwaNavBtn) pwaNavBtn.style.display = 'none';
        if (pwaDrawerBtn) pwaDrawerBtn.style.display = 'none';
        if (pwaBanner) pwaBanner.style.display = 'none';
    });
}

// --- RESPONSIVE MOBILE & TABLET NAVIGATION DRAWER ---
function initMobileNav() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const drawer = document.getElementById('mobile-nav-drawer');
    const drawerClose = document.getElementById('mobile-drawer-close');
    const backdrop = document.getElementById('mobile-drawer-backdrop');
    const links = document.querySelectorAll('.mobile-nav-link');

    if (!menuBtn || !drawer) return;

    function openDrawer() {
        drawer.style.display = 'block';
        requestAnimationFrame(() => {
            drawer.classList.add('open');
            drawer.setAttribute('aria-hidden', 'false');
            menuBtn.setAttribute('aria-expanded', 'true');
            document.body.classList.add('mobile-drawer-active');
        });
    }

    function closeDrawer() {
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('mobile-drawer-active');
        setTimeout(() => {
            if (!drawer.classList.contains('open')) {
                drawer.style.display = 'none';
            }
        }, 320);
    }

    menuBtn.addEventListener('click', () => {
        if (drawer.classList.contains('open')) {
            closeDrawer();
        } else {
            openDrawer();
        }
    });

    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            closeDrawer();
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (drawer.classList.contains('open')) closeDrawer();
            const iosModal = document.getElementById('pwa-ios-modal');
            if (iosModal && iosModal.style.display !== 'none') {
                iosModal.style.display = 'none';
                iosModal.setAttribute('aria-hidden', 'true');
            }
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 992 && drawer.classList.contains('open')) {
            closeDrawer();
        }
    });
}
