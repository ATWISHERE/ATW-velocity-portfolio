(function() {
  if (window.__atwMasterInitialized) return;
  window.__atwMasterInitialized = true;

  // Always start at Page 1 Hero on refresh
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  var LIVE_V = Date.now();
  var NEW_BIO_LINE = "Building practical AI, data, and robotics projects, turning ideas into working solutions, and continuously learning through hands-on experiments, challenges, and creative problem-solving.";
  var GMAIL_HIRE_URL = "https://mail.google.com/mail/?view=cm&fs=1&to=abdultarique5@gmail.com&su=" + encodeURIComponent("Hiring / Project Inquiry — Abdul Tarique Warsi");

  var TECH_COMPANIES = [
    "GOOGLE CLOUD", "MICROSOFT AZURE", "NVIDIA AI", "OPENAI",
    "DATABRICKS", "SNOWFLAKE", "AWS", "HUGGING FACE",
    "PYTORCH", "SCIKIT-LEARN", "POWER BI", "SIEMENS NX", "DMG MORI", "ROS 2"
  ];

  var TIMELINE_HEADINGS = [
    "ITI JABALPUR // 90.3% MERIT TOPPER",
    "DMG MORI // 5-AXIS CNC PROGRAMMING",
    "SIEMENS NX & SOLIDWORKS // CAD-CAM",
    "GLOBAL SKILLS PARK // BEST STUDENT AWARD",
    "DATA SCIENCE // PYTHON & ML ARCHITECTURE",
    "POWER BI // EXECUTIVE KPI ANALYTICS",
    "AI PIPELINES // AUTOMATED OCR & SQL",
    "STEM MENTORSHIP // AI & ROBOTICS LAB",
    "AERIAL ROBOTICS // AUTONOMOUS DRONE",
    "ROS 2 & AI // FUTURE DATA SCIENTIST"
  ];

  var BUILTIN_NAV_ITEMS = [
    { num: "01", label: "HOME // INTERACTIVE HERO", target: "#atw-master-stage" },
    { num: "02", label: "MESSAGE FROM FUTURE DATA SCIENTIST", target: "scroll-page-2" },
    { num: "03", label: "SKILL ARCHITECTURE (4 PILLARS)", target: "#atw-page3-skill-tree" },
    { num: "04", label: "VERIFIED HONORS & CERTIFICATES", target: "#atw-page4-pin-wrap" },
    { num: "05", label: "ENGINEERING CHRONOLOGY (1-14)", target: "scroll-timeline" },
    { num: "06", label: "GITHUB HALL OF FAME (PROJECTS)", target: "scroll-projects" },
    { num: "07", label: "TOPPER & AWARD CHAMPION", target: "scroll-topper" },
    { num: "08", label: "TECH STACK & ECOSYSTEM", target: "scroll-tech" },
    { num: "09", label: "WHAT'S ON SOCIALS & CONNECT", target: "scroll-socials" },
    { num: "CV", label: "RESUMES & CV PORTAL ↗", target: "./resume.html" }
  ];

  var BUILTIN_PROJECTS = [
    { photoSlot: 15, title: "ATW Velocity Interactive Portfolio", subtitle: "Canvas 2D • GSAP • Python Static-Bake Architecture", githubUrl: "https://github.com/ATWISHERE/ATW-velocity-portfolio" },
    { photoSlot: 16, title: "Student Management System Portal", subtitle: "Full-Stack Web Platform • Student Records & Analytics", githubUrl: "https://github.com/ATWISHERE" },
    { photoSlot: 17, title: "Excel & Python Automation Suite", subtitle: "Python • OpenPyXL • XLOOKUP & Automated Pipelines", githubUrl: "https://github.com/ATWISHERE" },
    { photoSlot: 18, title: "Automated PDF & OCR Pipeline", subtitle: "Python • pdfplumber • Tesseract OCR • Structured SQL", githubUrl: "https://github.com/ATWISHERE" },
    { photoSlot: 19, title: "Crop & Soil ML Classification (10K+ Rows)", subtitle: "XGBoost • Scikit-Learn • 3D Feature Importance Modeling", githubUrl: "https://github.com/ATWISHERE" },
    { photoSlot: 20, title: "Power BI Executive Sales & KPI Suite", subtitle: "Power BI • DAX • Interactive Revenue Telemetry Dashboard", githubUrl: "https://github.com/ATWISHERE" },
    { photoSlot: 21, title: "PyAutoGUI High-Speed GUI & n8n RPA Bot", subtitle: "Python • PyAutoGUI • n8n Automated Desktop Workflows", githubUrl: "https://github.com/ATWISHERE" },
    { photoSlot: 22, title: "Autonomous Drone & ROS 2 Navigation Rig", subtitle: "ROS 2 • Flight Controller • LiDAR SLAM & Optical Sensors", githubUrl: "https://github.com/ATWISHERE" }
  ];

  var HELMET_WORDS = /^(Porcelain|Japan|GIF|Dark Mode|Race|Las Vegas|Chrome|Beachball|Basketball|Season|Silverstone|Miami|Monaco|British|Hungary|Singapore|Austin|Brazil|Abu Dhabi|Discoball|Floral|Blobs|Autumn|Glitch|Papaya|Quadrant|Monster|Retro|Special|Pre-Season|Testing|Monza|Spa|Zandvoort|Qatar|Mexico|Vegas)$/i;

  // Locked width & height in style="" so Webflow never stretches ATW to giant size!
  function getAtwLogoSvg(strokeColor, holeColor, heightPx) {
    var widthPx = Math.round(heightPx * 2.85);
    return '<svg class="atw-own-svg" width="' + widthPx + '" height="' + heightPx + '" viewBox="0 0 240 84" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block !important;width:' + widthPx + 'px !important;height:' + heightPx + 'px !important;max-width:' + widthPx + 'px !important;margin:0 auto !important;flex-shrink:0 !important;">' +
      '<g transform="skewX(-10) translate(14, 4)">' +
        '<path d="M8 72 L34 8 L52 8 L66 72 L50 72 L47 56 L27 56 L22 72 Z" fill="' + strokeColor + '"/>' +
        '<path d="M31 43 L45 43 L41 23 Z" fill="' + holeColor + '"/>' +
        '<path d="M72 8 L132 8 L129 22 L109 22 L98 72 L82 72 L93 22 L72 22 Z" fill="' + strokeColor + '"/>' +
        '<path d="M138 8 L153 8 L156 48 L171 18 L183 18 L186 48 L201 8 L216 8 L192 72 L178 72 L174 40 L159 72 L145 72 Z" fill="' + strokeColor + '"/>' +
      '</g>' +
    '</svg>';
  }

  // 1. Favicon & Title
  (function() {
    document.title = "Abdul Tarique Warsi — AI, Robotics & Data Science Portfolio";
    var svgIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="10" fill="#D2FF00"/><text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" font-family="Arial Black,Impact,sans-serif" font-weight="900" font-style="italic" font-size="23" letter-spacing="-1" fill="#11120E">ATW</text></svg>';
    var iconUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(svgIcon);
    document.querySelectorAll("link[rel*='icon'], link[rel='apple-touch-icon']").forEach(function(el) {
      if (el.parentNode) el.parentNode.removeChild(el);
    });
    var link = document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'icon';
    link.href = iconUrl;
    document.head.appendChild(link);
  })();

  // 2. Startup Green Preview (Plays Once at Load)
  function ensureStartupGreenPage() {
    if (window.__atwSplashPlayed || !document.body) return;
    window.__atwSplashPlayed = true;

    var splash = document.createElement('div');
    splash.id = 'atw-startup-green-preview';
    splash.style.cssText = 'position:fixed !important;inset:0 !important;width:100vw !important;height:100vh !important;background:#D2FF00 !important;color:#11120E !important;z-index:9999999 !important;display:flex !important;flex-direction:column !important;align-items:center !important;justify-content:center !important;transition:transform 0.8s cubic-bezier(0.77,0,0.175,1) !important;pointer-events:none !important;will-change:transform !important;';
    splash.innerHTML = [
      '<div style="display:flex;flex-direction:column;align-items:center;gap:18px;text-align:center;padding:24px;">',
      getAtwLogoSvg('#11120E', '#D2FF00', 68),
      '<div style="font-family:Inter,sans-serif;font-weight:900;font-size:clamp(26px,4vw,48px);letter-spacing:-0.02em;text-transform:uppercase;color:#11120E;line-height:1.05;">ABDUL TARIQUE <em style="font-family:Georgia,serif;font-weight:400;font-style:italic;">WARSI</em></div>',
      '<div style="font-family:Space Grotesk,monospace;font-size:12px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#11120E;opacity:0.85;">AI &bull; DATA SCIENCE &bull; ROBOTICS &bull; PRECISION ENGINEERING</div>',
      '<div style="width:180px;height:3px;background:rgba(17,18,14,0.18);border-radius:4px;overflow:hidden;margin-top:8px;"><div id="atw-splash-bar" style="width:0%;height:100%;background:#11120E;transition:width 0.95s ease;"></div></div>',
      '</div>'
    ].join('\n');

    document.body.appendChild(splash);
    requestAnimationFrame(function() {
      var bar = document.getElementById('atw-splash-bar');
      if (bar) bar.style.width = '100%';
    });
    setTimeout(function() {
      splash.style.setProperty('transform', 'translateY(-100%)', 'important');
      setTimeout(function() { if (splash.parentNode) splash.parentNode.removeChild(splash); }, 850);
    }, 1100);
  }

  // 3. Master Styles
  function injectMasterStyles() {
    if (document.getElementById('atw-master-easy-css')) return;
    var st = document.createElement('style');
    st.id = 'atw-master-easy-css';
    st.textContent = [
      "@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=Inter:wght@500;600;700;800;900&family=Space+Grotesk:wght@600;700&display=swap');",
      "html, body { overflow-x: clip !important; }",
      ".w-nav-button, .menu-button, .menu-btn, .w-icon-nav-menu { display: none !important; opacity: 0 !important; pointer-events: none !important; }",
      "#atw-page4-pin-wrap .atw-p4-badge, #atw-page4-pin-wrap .atw-p4-num, #atw-page4-pin-wrap .atw-p4-count, #atw-page4-pin-wrap .atw-p4-tag, #atw-page4-pin-wrap .atw-p4-kicker, #atw-page4-pin-wrap .atw-p4-pill, .st-pill, .st-kicker, .st-pin-num { display: none !important; }",
      ".w-nav-overlay, .menu-overlay, .nav-menu, .menu-w { display: none !important; }",
      "#atw-page4-pin-wrap { position: relative !important; height: 320vh !important; min-height: 320vh !important; width: 100% !important; overflow: visible !important; display: block !important; }",
      "#atw-page4-sticky { position: -webkit-sticky !important; position: sticky !important; top: 0px !important; height: 100vh !important; width: 100% !important; overflow: hidden !important; display: flex !important; flex-direction: column !important; justify-content: center !important; }",
      "#atw-p4-track { display: flex !important; flex-direction: row !important; flex-wrap: nowrap !important; width: max-content !important; padding-left: 4vw !important; padding-right: 8vw !important; margin-left: 0 !important; gap: 34px !important; will-change: transform !important; }",
      "#atw-page4-pin-wrap .atw-p4-card { flex: 0 0 auto !important; }",
      ".atw-github-card-wired { cursor: pointer !important; position: relative !important; transition: transform 0.22s ease !important; }",
      ".atw-github-card-wired:hover { transform: translateY(-5px) !important; }",
      ".atw-gh-overlay-bar { position: absolute; left: 10px; right: 10px; bottom: 10px; background: rgba(17,19,14,0.96); border: 1px solid rgba(210,255,0,0.42); border-radius: 6px; padding: 9px 12px; display: flex; align-items: center; justify-content: space-between; gap: 8px; z-index: 20; pointer-events: none; }",
      ".atw-gh-info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }",
      ".atw-gh-title { color: #F4F4ED !important; font-family: 'Inter', sans-serif; font-size: 12.5px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }",
      ".atw-gh-sub { color: #A5A89E !important; font-family: 'Inter', sans-serif; font-size: 10.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }",
      ".atw-gh-cta { background: #D2FF00; color: #111112 !important; font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 800; letter-spacing: 0.06em; padding: 5px 8px; border-radius: 4px; flex-shrink: 0; }",
      "#atw-guaranteed-burger-btn { position: fixed !important; top: 18px !important; right: 18px !important; width: 44px !important; height: 44px !important; border-radius: 8px !important; background: rgba(244,245,240,0.96) !important; border: 1.5px solid #111112 !important; display: flex !important; flex-direction: column !important; align-items: center !important; justify-content: center !important; gap: 5px !important; cursor: pointer !important; z-index: 999991 !important; padding: 0 !important; }",
      "#atw-guaranteed-burger-btn:hover { background: #D2FF00 !important; }",
      "#atw-guaranteed-burger-btn span { display: block !important; width: 20px !important; height: 2px !important; background: #111112 !important; }",
      "#atw-custom-nav-drawer { position: fixed !important; inset: 0 !important; width: 100vw !important; height: 100vh !important; box-sizing: border-box !important; background: #0D0F0C !important; z-index: 999995 !important; display: flex !important; flex-direction: column !important; justify-content: space-between !important; padding: 36px 6vw 24px 6vw !important; opacity: 0; visibility: hidden; pointer-events: none; transition: opacity 0.2s ease, visibility 0.2s ease; overflow-y: auto !important; }",
      "#atw-custom-nav-drawer.is-open { opacity: 1 !important; visibility: visible !important; pointer-events: auto !important; }",
      ".atw-nav-close-btn { position: fixed !important; top: 20px !important; right: 24px !important; background: #D2FF00 !important; color: #111112 !important; border: none !important; border-radius: 6px !important; padding: 10px 20px !important; font-family: 'Inter', sans-serif !important; font-size: 12px !important; font-weight: 800 !important; letter-spacing: 0.08em !important; cursor: pointer !important; z-index: 999999 !important; }",
      ".atw-nav-body-split { display: flex !important; flex-direction: row !important; align-items: center !important; justify-content: space-between !important; gap: 4vw !important; width: 100% !important; max-width: 1320px !important; margin: auto !important; box-sizing: border-box !important; }",
      ".atw-nav-list { display: flex !important; flex-direction: column !important; gap: 2px !important; flex: 1 1 auto !important; max-width: 780px !important; }",
      ".atw-nav-item { display: flex !important; flex-direction: row !important; align-items: center !important; gap: 16px !important; text-decoration: none !important; padding: 7px 12px !important; border-bottom: 1px solid rgba(244,244,237,0.1) !important; cursor: pointer !important; border-radius: 4px !important; }",
      ".atw-nav-item:hover { background: rgba(210,255,0,0.08) !important; }",
      ".atw-nav-num { font-family: 'Space Grotesk', monospace !important; font-size: 13px !important; color: #D2FF00 !important; font-weight: 700 !important; min-width: 44px !important; }",
      ".atw-nav-label { font-family: 'Space Grotesk', 'Inter', sans-serif !important; font-size: clamp(15px, 2.0vh, 20px) !important; line-height: 1.32 !important; color: #F4F5F0 !important; letter-spacing: 0.05em !important; text-transform: uppercase !important; font-weight: 700 !important; white-space: nowrap !important; }",
      ".atw-nav-item:hover .atw-nav-label { color: #D2FF00 !important; }",
      ".atw-nav-photo-card { width: clamp(240px, 24vw, 330px) !important; height: clamp(300px, 54vh, 430px) !important; border-radius: 12px !important; overflow: hidden !important; border: 1.5px solid rgba(210,255,0,0.38) !important; position: relative !important; flex-shrink: 0 !important; background: #1A1C16 !important; }",
      ".atw-nav-photo-card img { width: 100% !important; height: 100% !important; object-fit: cover !important; object-position: center top !important; display: block !important; }",
      ".atw-nav-photo-tag { position: absolute !important; left: 12px !important; right: 12px !important; bottom: 12px !important; background: rgba(17,18,14,0.92) !important; border: 1px solid rgba(210,255,0,0.4) !important; padding: 8px 12px !important; border-radius: 6px !important; color: #D2FF00 !important; font-family: 'Inter', sans-serif !important; font-size: 10.5px !important; font-weight: 800 !important; letter-spacing: 0.08em !important; text-align: center !important; }",
      ".atw-nav-footer { display: flex !important; flex-wrap: wrap !important; align-items: center !important; justify-content: space-between !important; gap: 16px !important; width: 100% !important; max-width: 1320px !important; margin: 0 auto !important; padding-top: 14px !important; border-top: 1px solid rgba(244,244,237,0.12) !important; }",
      ".atw-nav-socials { display: flex !important; gap: 20px !important; flex-wrap: wrap !important; }",
      ".atw-nav-socials a { color: #F4F5F0 !important; font-family: 'Inter', sans-serif !important; font-size: 14px !important; font-weight: 900 !important; text-decoration: none !important; }",
      "@keyframes atwTechMarquee { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(-50%,0,0); } }",
      "#atw-tech-ribbon-wrap { width: 100% !important; overflow: hidden !important; padding: 32px 0 !important; margin: 24px 0 !important; border-top: 1px solid rgba(17,18,14,0.18) !important; border-bottom: 1px solid rgba(17,18,14,0.18) !important; display: block !important; }",
      ".atw-tech-ribbon-track { display: flex !important; width: max-content !important; gap: 42px !important; animation: atwTechMarquee 28s linear infinite !important; align-items: center !important; will-change: transform !important; }",
      ".atw-tech-pill { display: inline-flex !important; align-items: center !important; gap: 12px !important; font-family: 'Space Grotesk', 'Inter', sans-serif !important; font-size: clamp(16px, 2.0vw, 24px) !important; font-weight: 800 !important; letter-spacing: 0.05em !important; color: #F4F5F0 !important; text-transform: uppercase !important; white-space: nowrap !important; padding: 8px 20px !important; border-radius: 6px !important; border: 1.5px solid #D2FF00 !important; background: #11120E !important; }",
      ".atw-tech-pill span.dot { width: 8px !important; height: 8px !important; border-radius: 50% !important; background: #D2FF00 !important; display: inline-block !important; }",
      "#atw-new-master-footer { width: 100% !important; max-width: 100% !important; margin: 0 !important; padding: 0 !important; position: relative !important; z-index: 60 !important; display: block !important; background-color: #0D0F0C !important; }",
      ".atw-foot-lime-top { background-color: #D2FF00 !important; color: #0B0D0A !important; padding: 76px 24px 72px 24px !important; text-align: center !important; display: flex !important; flex-direction: column !important; align-items: center !important; justify-content: center !important; }",
      ".atw-foot-quote-head { max-width: 1040px !important; font-family: 'Inter', sans-serif !important; font-weight: 900 !important; font-size: clamp(24px, 4.2vw, 56px) !important; line-height: 1.08 !important; letter-spacing: -0.02em !important; text-transform: uppercase !important; margin: 0 0 32px 0 !important; color: #0B0D0A !important; }",
      ".atw-foot-quote-head em { font-family: 'Instrument Serif', Georgia, serif !important; font-style: italic !important; font-weight: 400 !important; }",
      ".atw-foot-connect-btn { display: inline-flex !important; align-items: center !important; gap: 10px !important; background-color: #0B0D0A !important; color: #D2FF00 !important; font-family: 'Inter', sans-serif !important; font-size: 13px !important; font-weight: 800 !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; text-decoration: none !important; padding: 16px 36px !important; border-radius: 8px !important; }",
      ".atw-foot-dark-bottom { background-color: #0D0F0C !important; color: #F4F5F0 !important; padding: 68px 24px 32px 24px !important; display: flex !important; flex-direction: column !important; align-items: center !important; text-align: center !important; }",
      ".atw-foot-giant-name { font-family: 'Inter', sans-serif !important; font-weight: 900 !important; font-size: clamp(30px, 5.4vw, 74px) !important; letter-spacing: -0.02em !important; line-height: 1.04 !important; margin: 14px 0 12px 0 !important; color: #F4F5F0 !important; text-transform: uppercase !important; }",
      ".atw-foot-giant-name em { font-family: 'Instrument Serif', Georgia, serif !important; font-style: italic !important; font-weight: 400 !important; color: #D2FF00 !important; }",
      ".atw-foot-roles-sub { font-family: 'Inter', sans-serif !important; font-size: clamp(9.5px, 1.0vw, 12px) !important; font-weight: 600 !important; letter-spacing: 0.18em !important; text-transform: uppercase !important; color: #8E9488 !important; margin: 0 0 36px 0 !important; }",
      ".atw-follow-kicker { display: block !important; font-family: 'Inter', sans-serif !important; font-size: 11px !important; font-weight: 700 !important; letter-spacing: 0.2em !important; text-transform: uppercase !important; color: #D2FF00 !important; margin-bottom: 18px !important; }",
      ".atw-bold-links-wrap { display: flex !important; flex-wrap: wrap !important; justify-content: center !important; align-items: center !important; gap: 14px 36px !important; margin: 0 auto 52px auto !important; }",
      ".atw-bold-link-item { font-family: 'Inter', 'Space Grotesk', sans-serif !important; font-weight: 900 !important; font-size: clamp(20px, 2.6vw, 34px) !important; line-height: 1.15 !important; text-transform: uppercase !important; color: #F4F5F0 !important; text-decoration: none !important; }",
      ".atw-bold-link-item:hover { color: #D2FF00 !important; }",
      ".atw-foot-bottom-bar { width: 100% !important; max-width: 1200px !important; display: flex !important; flex-wrap: wrap !important; justify-content: space-between !important; align-items: center !important; padding-top: 24px !important; border-top: 1px solid rgba(255,255,255,0.08) !important; font-family: 'Inter', sans-serif !important; font-size: 11px !important; font-weight: 600 !important; letter-spacing: 0.1em !important; color: #8E9488 !important; }",
      ".atw-foot-backtop { color: #D2FF00 !important; text-decoration: none !important; font-weight: 800 !important; cursor: pointer !important; }",
      ".atw-topper-push-img { transform: scale(0.9) translateY(24px); opacity: 0; transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease; }",
      ".atw-topper-push-img.is-pushed-in { transform: scale(1) translateY(0); opacity: 1; }",
      "@media only screen and (max-width: 860px) { .atw-nav-photo-card { display: none !important; } }",
      "@media only screen and (max-width: 768px) { .atw-nav-label { font-size: 14px !important; white-space: normal !important; } #atw-page3-skill-tree .st-branches { display: none !important; } #atw-page3-skill-tree .st-grid { grid-template-columns: 1fr !important; gap: 18px !important; } #atw-page4-pin-wrap .atw-p4-card { width: 82vw !important; min-width: 82vw !important; height: 52vh !important; } }"
    ].join('\n');
    document.head.appendChild(st);
  }

  function getAnchorPostP4() {
    return document.getElementById('atw-page4-pin-wrap') || document.getElementById('atw-page3-skill-tree');
  }

  function getPostP4Images() {
    var p4 = getAnchorPostP4();
    if (!p4) return [];
    return Array.from(document.querySelectorAll('img')).filter(function(img) {
      if (img.closest('#atw-master-stage, #atw-page3-skill-tree, #atw-page4-pin-wrap, #atw-lightbox, #atw-custom-nav-drawer, #atw-new-master-footer')) return false;
      var s = (img.getAttribute('src') || '').toLowerCase();
      if (s.endsWith('.svg')) return false;
      return Boolean(p4.compareDocumentPosition(img) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
  }

  function scrollToSectionTarget(target) {
    if (target === './resume.html') { window.location.href = './resume.html'; return; }
    if (target === '#atw-master-stage') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    if (target === 'scroll-page-2') { window.scrollTo({ top: window.innerHeight * 0.65, behavior: 'smooth' }); return; }
    if (target === 'scroll-socials') { window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); return; }

    var postImgs = getPostP4Images();
    if (target === 'scroll-timeline' && postImgs[0]) { postImgs[0].scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    if (target === 'scroll-projects' && postImgs[14]) { postImgs[14].scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    if (target === 'scroll-topper') {
      var topEl = document.querySelector("img[src*='atw_gold_card'], img[src*='25.jpg']");
      if (topEl) { topEl.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    }
    if (target === 'scroll-tech') {
      var techEl = document.getElementById('atw-tech-ribbon-wrap');
      if (techEl) { techEl.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    }
    var el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // 4. Menu & Footer Setup
  function setupMenuAndFooter() {
    if (!document.getElementById('atw-custom-nav-drawer')) {
      var drawer = document.createElement('div');
      drawer.id = 'atw-custom-nav-drawer';

      var itemsHtml = BUILTIN_NAV_ITEMS.map(function(item) {
        return '<a class="atw-nav-item" data-target="' + item.target + '">' +
          '<span class="atw-nav-num">' + item.num + ' //</span>' +
          '<span class="atw-nav-label">' + item.label + '</span>' +
        '</a>';
      }).join('');

      drawer.innerHTML = [
        '<button class="atw-nav-close-btn" id="atw-nav-close">CLOSE ✕</button>',
        '<div class="atw-nav-body-split">',
        '  <div class="atw-nav-list">' + itemsHtml + '</div>',
        '  <div class="atw-nav-photo-card">',
        '    <img src="./public/chronology/footer_hero.jpg?v=' + LIVE_V + '" onerror="this.src=\'./public/chronology/STYLE.JPG\'" alt="Abdul Tarique Warsi" />',
        '    <div class="atw-nav-photo-tag">ABDUL TARIQUE WARSI // ATW</div>',
        '  </div>',
        '</div>',
        '<div class="atw-nav-footer">',
        '  <div style="color:#8E9488;font-family:Inter,sans-serif;font-size:11.5px;letter-spacing:0.08em;">FOLLOW ABDUL TARIQUE WARSI</div>',
        '  <div class="atw-nav-socials">',
        '    <a href="https://github.com/ATWISHERE" target="_blank">GITHUB</a>',
        '    <a href="https://www.linkedin.com/in/abdul-tarique-warsi" target="_blank">LINKEDIN</a>',
        '    <a href="' + GMAIL_HIRE_URL + '" target="_blank">EMAIL</a>',
        '    <a href="tel:+918770463418">PHONE</a>',
        '    <a href="./resume.html">RESUMES</a>',
        '  </div>',
        '</div>'
      ].join('\n');
      document.body.appendChild(drawer);

      var closeDrawer = function() {
        drawer.classList.remove('is-open');
        if (window.lenis && typeof window.lenis.start === 'function') {
          try { window.lenis.start(); } catch(e) {}
        }
      };

      drawer.querySelector('#atw-nav-close').addEventListener('click', closeDrawer);
      window.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeDrawer(); });

      drawer.querySelectorAll('.atw-nav-item').forEach(function(link) {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          var target = link.getAttribute('data-target');
          closeDrawer();
          setTimeout(function() { scrollToSectionTarget(target); }, 50);
        });
      });
    }

    if (!document.getElementById('atw-guaranteed-burger-btn')) {
      var gBtn = document.createElement('button');
      gBtn.id = 'atw-guaranteed-burger-btn';
      gBtn.setAttribute('aria-label', 'Open Navigation Menu');
      gBtn.innerHTML = '<span></span><span></span><span></span>';
      gBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var d = document.getElementById('atw-custom-nav-drawer');
        if (d) d.classList.toggle('is-open');
      });
      document.body.appendChild(gBtn);
    }

    document.querySelectorAll('footer, .footer, #atw-resume-cta-footer').forEach(function(el) {
      if (el.id !== 'atw-new-master-footer' && !el.closest('#atw-new-master-footer')) {
        el.style.setProperty('display', 'none', 'important');
      }
    });

    if (!document.getElementById('atw-new-master-footer')) {
      var newFoot = document.createElement('footer');
      newFoot.id = 'atw-new-master-footer';
      newFoot.innerHTML = [
        '<div class="atw-foot-lime-top">',
        '  <h2 class="atw-foot-quote-head">REMEMBER SOLVE YOUR PROBLEM <em>FIRST</em><br/>BECAUSE YOUR PROBLEM CAN LEAD TO<br/>SOLUTION OF OTHERS</h2>',
        '  <a href="' + GMAIL_HIRE_URL + '" target="_blank" rel="noopener noreferrer" class="atw-foot-connect-btn">CONNECT/HIRE &rarr;</a>',
        '</div>',
        '<div class="atw-foot-dark-bottom">',
        getAtwLogoSvg('#D2FF00', '#0D0F0C', 42),
        '  <h1 class="atw-foot-giant-name">ABDUL TARIQUE <em>WARSI</em></h1>',
        '  <div class="atw-foot-roles-sub">FUTURE DATA SCIENTIST &bull; AI &amp; ROBOTICS TEACHER &bull; PRECISION CNC ENGINEER</div>',
        '  <span class="atw-follow-kicker">FOLLOW ABDUL TARIQUE WARSI</span>',
        '  <nav class="atw-bold-links-wrap">',
        '    <a href="https://github.com/ATWISHERE" target="_blank" class="atw-bold-link-item">GITHUB</a>',
        '    <a href="https://www.linkedin.com/in/abdul-tarique-warsi" target="_blank" class="atw-bold-link-item">LINKEDIN</a>',
        '    <a href="' + GMAIL_HIRE_URL + '" target="_blank" class="atw-bold-link-item">EMAIL</a>',
        '    <a href="tel:+918770463418" class="atw-bold-link-item">PHONE</a>',
        '    <a href="./resume.html" class="atw-bold-link-item">RESUMES</a>',
        '  </nav>',
        '  <div class="atw-foot-bottom-bar">',
        '    <div>&copy; 2026 ABDUL TARIQUE WARSI. ALL RIGHTS RESERVED.</div>',
        '    <a class="atw-foot-backtop" id="atw-foot-top-btn">BACK TO TOP &uarr;</a>',
        '  </div>',
        '</div>'
      ].join('\n');
      document.body.appendChild(newFoot);
      newFoot.querySelector('#atw-foot-top-btn').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // 5. Content, Page 5 Chronology, UPCOMING Keywords & Tech Stack Ribbon
  function applyContentOnce() {
    var p4 = getAnchorPostP4();
    if (!p4) return;

    var postP4Imgs = getPostP4Images();
    BUILTIN_PROJECTS.forEach(function(proj) {
      var targetImg = postP4Imgs[proj.photoSlot - 1];
      if (!targetImg) return;
      var cardEl = targetImg.closest('a, .helmet-card, .w-dyn-item, .grid-item') || targetImg.parentElement;
      if (!cardEl || cardEl.dataset.atwGhWired === '1') return;

      cardEl.dataset.atwGhWired = '1';
      cardEl.classList.add('atw-github-card-wired');
      if (cardEl.tagName === 'A') {
        cardEl.href = proj.githubUrl;
        cardEl.target = '_blank';
      } else {
        cardEl.addEventListener('click', function(e) {
          e.preventDefault();
          window.open(proj.githubUrl, '_blank', 'noopener,noreferrer');
        });
      }
      var bar = document.createElement('div');
      bar.className = 'atw-gh-overlay-bar';
      bar.innerHTML = '<div class="atw-gh-info"><div class="atw-gh-title">' + proj.title + '</div><div class="atw-gh-sub">' + proj.subtitle + '</div></div><div class="atw-gh-cta">GITHUB ↗</div>';
      cardEl.appendChild(bar);
    });

    document.querySelectorAll("img[src*='atw_gold_card']").forEach(function(img) {
      img.style.setProperty('object-fit', 'contain', 'important');
    });

    var locIdx = 0;
    document.querySelectorAll('h1, h2, h3, h4, h5, p, blockquote, div, span, a').forEach(function(el) {
      if (el.dataset.atwProcessed === '1') return;
      if (el.closest('#atw-master-stage, #atw-page3-skill-tree, #atw-page4-pin-wrap, #atw-custom-nav-drawer, #atw-new-master-footer, .atw-gh-overlay-bar, #atw-tech-ribbon-wrap')) return;
      if (!Boolean(p4.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING)) return;

      var raw = (el.textContent || '').replace(/\s+/g, ' ').trim();
      if (!raw) return;
      var up = raw.toUpperCase();

      if (raw.length < 150 && !el.querySelector('img') && (raw.indexOf("where you start") !== -1 || raw.indexOf("Precision on the shop floor") !== -1)) {
        if (el.children.length <= 4) {
          el.dataset.atwProcessed = '1';
          el.innerHTML = 'Precision on the <strong style="color:#F4F5F0;">shop floor</strong> builds intelligence in <strong style="color:#D2FF00;">every algorithm</strong>.';
          el.style.setProperty('color', '#F4F5F0', 'important');
        }
        var box = el.parentElement;
        for (var k = 0; k < 4 && box && box !== document.body; k++) {
          box.querySelectorAll('svg').forEach(function(s) { s.style.setProperty('display', 'none', 'important'); });
          box = box.parentElement;
        }
        return;
      }

      if (el.children.length === 0) {
        if (/^20(18|19|20|21|22|23|24|25)$/.test(raw)) {
          el.dataset.atwProcessed = '1';
          el.textContent = "UPCOMING...";
          el.style.setProperty('color', '#D2FF00', 'important');
          el.style.setProperty('font-weight', '800', 'important');
          if (el.previousElementSibling && el.previousElementSibling.children.length === 0) {
            el.previousElementSibling.textContent = "";
          }
          return;
        }
        if (HELMET_WORDS.test(raw)) {
          el.dataset.atwProcessed = '1';
          if (el.nextElementSibling && /20(18|19|20|21|22|23|24|25)|UPCOMING/i.test(el.nextElementSibling.textContent || '')) {
            el.textContent = "";
          } else {
            el.textContent = "UPCOMING...";
            el.style.setProperty('color', '#D2FF00', 'important');
          }
          return;
        }
        if (/^[A-Z\s\.\-]+,\s*20[12]\d$/i.test(raw) && raw.length < 34) {
          el.dataset.atwProcessed = '1';
          el.textContent = TIMELINE_HEADINGS[locIdx % TIMELINE_HEADINGS.length];
          el.style.setProperty('color', '#D2FF00', 'important');
          el.style.setProperty('font-weight', '700', 'important');
          locIdx++;
          return;
        }
      }

      var hasBlocks = Array.from(el.children).some(function(c) {
        return ['SPAN', 'STRONG', 'B', 'EM', 'I', 'BR'].indexOf(c.tagName) === -1;
      });
      if (hasBlocks) return;

      if (up === 'CAREER HIGHLIGHTS') { el.dataset.atwProcessed = '1'; el.textContent = 'ENGINEERING CHRONOLOGY'; el.style.setProperty('color', '#F4F5F0', 'important'); }
      else if (up === 'ON TRACK') { el.dataset.atwProcessed = '1'; el.textContent = 'ON TRACK // ENGINEERING'; el.style.setProperty('color', '#D2FF00', 'important'); }
      else if (up === 'OFF TRACK') { el.dataset.atwProcessed = '1'; el.textContent = 'OFF TRACK // EXPLORATION'; el.style.setProperty('color', '#D2FF00', 'important'); }
      else if (up === 'HELMETS') { el.dataset.atwProcessed = '1'; el.textContent = 'PROJECTS & LABS'; }
      else if (raw === 'Hall of Fame') { el.dataset.atwProcessed = '1'; el.textContent = 'GitHub Hall of Fame'; }
      else if (up === 'PARTNERS' || up === 'OUR PARTNERS') { el.dataset.atwProcessed = '1'; el.textContent = 'TECH STACK'; }
      else if (up === '& CAMPAIGNS' || up === '&CAMPAIGNS' || up === 'CAMPAIGNS') { el.dataset.atwProcessed = '1'; el.textContent = '& ECOSYSTEM'; }
      else if (up === 'VIEW ON TRACK' || up === 'EXPLORE HELMETS') {
        el.dataset.atwProcessed = '1';
        el.textContent = 'VIEW ON GITHUB ↗';
        var aWrap = el.closest('a');
        if (aWrap) { aWrap.href = 'https://github.com/ATWISHERE'; aWrap.target = '_blank'; }
      }
      else if (up.indexOf('FOLLOW') !== -1 && up.indexOf('LANDO') !== -1 && raw.length < 45) {
        el.dataset.atwProcessed = '1';
        el.textContent = 'FOLLOW ABDUL TARIQUE WARSI';
      }
      else if (raw.indexOf('iconic blobs') !== -1 || raw.indexOf('memorable helmets') !== -1) {
        el.dataset.atwProcessed = '1';
        el.textContent = "From automated AI data pipelines to autonomous ROS 2 robotics and 5-Axis CNC engineering, explore verified technical builds and open-source architectures.";
      }
      else if (raw.indexOf('proud to collaborate with a range') !== -1 || raw.indexOf('passion for performance across a range') !== -1) {
        el.dataset.atwProcessed = '1';
        el.textContent = "Leveraging enterprise cloud, machine learning frameworks, and industrial CAD/CAM ecosystems to deliver production-grade engineering and analytics.";
      }
      else if (raw.indexOf('Since I was 7 years old') !== -1) {
        el.dataset.atwProcessed = '1';
        el.textContent = "Since my first days mastering 5-Axis CNC tolerances and ITI precision, I've worked tirelessly to bridge industrial hardware with AI, Robotics & Data Science.";
        el.style.setProperty('color', '#F4F5F0', 'important');
      }
      else if (raw.indexOf('Celebrate this incredible moment') !== -1) {
        el.dataset.atwProcessed = '1';
        el.textContent = "Recognized as 90.3% Merit Topper and Global Skills Park Best Student Award recipient—bridging shop-floor precision with modern Data Science, AI & Robotics.";
      }
      else if (raw.indexOf('See more helmets and highlights') !== -1) {
        el.dataset.atwProcessed = '1';
        el.textContent = "Explore more open-source repositories, AI pipelines and robotics builds on GitHub.";
      }
      else if (raw.indexOf('Most recent results') !== -1) {
        el.dataset.atwProcessed = '1';
        el.textContent = "Production AI pipelines, 5-Axis CNC toolpaths, ML models and robotics lab telemetry.";
        el.style.setProperty('color', '#F4F5F0', 'important');
      }
      else if (raw.indexOf('Campaigns, shoots and other such') !== -1 || raw.indexOf('Cruising coastal highways') !== -1) {
        el.dataset.atwProcessed = '1';
        el.textContent = NEW_BIO_LINE;
        el.style.setProperty('color', '#F4F5F0', 'important');
      }
    });

    // Replace Google / Ralph Lauren / PlayStation / quadrant / TUMI / Hilton / Uber with Tech Stack Ribbon
    if (!document.getElementById('atw-tech-ribbon-wrap')) {
      var logoStrip = Array.from(document.querySelectorAll('div, section')).find(function(box) {
        if (box.closest('#atw-master-stage, #atw-page3-skill-tree, #atw-page4-pin-wrap, #atw-new-master-footer')) return false;
        if (!Boolean(p4.compareDocumentPosition(box) & Node.DOCUMENT_POSITION_FOLLOWING)) return false;
        var svgs = box.querySelectorAll('svg');
        var imgs = box.querySelectorAll('img');
        return svgs.length >= 5 && svgs.length <= 20 && imgs.length === 0 && box.offsetHeight < 350;
      });
      if (logoStrip) {
        Array.from(logoStrip.querySelectorAll('svg')).forEach(function(s) { s.style.setProperty('display', 'none', 'important'); });
        var doubled = TECH_COMPANIES.concat(TECH_COMPANIES);
        var ribbon = document.createElement('div');
        ribbon.id = 'atw-tech-ribbon-wrap';
        ribbon.innerHTML = '<div class="atw-tech-ribbon-track">' + doubled.map(function(c) { return '<div class="atw-tech-pill"><span class="dot"></span>' + c + '</div>'; }).join('') + '</div>';
        logoStrip.appendChild(ribbon);
      }
    }

    if (!window.__atwPushObserverWired && 'IntersectionObserver' in window) {
      window.__atwPushObserverWired = true;
      var obs = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) entry.target.classList.add('is-pushed-in');
          else entry.target.classList.remove('is-pushed-in');
        });
      }, { threshold: 0.15 });

      document.querySelectorAll('img[src*="25.jpg"], img[src*="atw_gold_card"], img[src*="LAND."], img[src*="land."], img[src*="STYLE."], img[src*="style."], img[src*="topper_middle"], img[src*="/12.jpg"]').forEach(function(img) {
        if (!img.closest('#atw-custom-nav-drawer')) {
          img.classList.add('atw-topper-push-img');
          obs.observe(img);
        }
      });
    }
  }

  // 6. Cached 60 FPS Page 4 Horizontal Scroll
  var p4Wrap = null;
  var p4Track = null;
  var p4ProgBar = null;
  var cachedScrollableHeight = 1500;
  var cachedMaxShift = 2000;
  var scrollTicking = false;

  function cachePage4Metrics() {
    p4Wrap = document.getElementById('atw-page4-pin-wrap');
    p4Track = document.getElementById('atw-p4-track');
    p4ProgBar = document.getElementById('atw-p4-prog-bar');
    if (!p4Wrap || !p4Track) return;

    var p = p4Wrap.parentElement;
    while (p && p !== document.body && p !== document.documentElement) {
      var cs = window.getComputedStyle(p);
      if (cs.overflow === 'hidden' || cs.overflowX === 'hidden' || cs.overflowY === 'hidden') {
        p.style.setProperty('overflow', 'visible', 'important');
        p.style.setProperty('overflow-x', 'clip', 'important');
      }
      p = p.parentElement;
    }

    var vh = window.innerHeight;
    var vw = window.innerWidth;
    cachedScrollableHeight = Math.max(vh * 1.8, p4Wrap.offsetHeight - vh);
    cachedMaxShift = Math.max(0, p4Track.scrollWidth - vw + Math.round(vw * 0.06));
  }

  function onScrollFrame() {
    scrollTicking = false;
    if (!p4Wrap || !p4Track) return;

    var rectTop = p4Wrap.getBoundingClientRect().top;
    var vh = window.innerHeight;
    if (rectTop > vh * 1.2 || rectTop < -(cachedScrollableHeight + vh)) return;

    var progress = Math.max(0, Math.min(1, -rectTop / cachedScrollableHeight));
    var shiftX = -(progress * cachedMaxShift);
    p4Track.style.transform = 'translate3d(' + shiftX.toFixed(1) + 'px, 0px, 0px)';

    if (p4ProgBar) {
      p4ProgBar.style.width = (progress * 100).toFixed(1) + '%';
    }
  }

  window.addEventListener('scroll', function() {
    if (!scrollTicking) {
      scrollTicking = true;
      window.requestAnimationFrame(onScrollFrame);
    }
  }, { passive: true });

  window.addEventListener('resize', function() {
    cachePage4Metrics();
    onScrollFrame();
  }, { passive: true });

  function initMaster() {
    ensureStartupGreenPage();
    injectMasterStyles();
    setupMenuAndFooter();
    applyContentOnce();
    cachePage4Metrics();
    onScrollFrame();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMaster);
  } else {
    initMaster();
  }
  setTimeout(function() {
    applyContentOnce();
    cachePage4Metrics();
    onScrollFrame();
  }, 900);
})();
// === STEP 2: REMOVE WHITE OVERLAPPING MENU BUTTON & HIDE OLD BOXED FOOTER ===
(function() {
  function cleanMenuButtonAndOldFooter() {
    // 1. Delete the overlapping white 3-line button (#atw-guaranteed-burger-btn)
    var extraWhiteBtn = document.getElementById('atw-guaranteed-burger-btn');
    if (extraWhiteBtn && extraWhiteBtn.parentNode) {
      extraWhiteBtn.parentNode.removeChild(extraWhiteBtn);
    }

    // 2. Un-hide the native neon-lime 2-line button next to RESUMES and wire it to our menu
    var styleFix = document.getElementById('atw-unhide-native-burger');
    if (!styleFix) {
      styleFix = document.createElement('style');
      styleFix.id = 'atw-unhide-native-burger';
      styleFix.textContent = '.w-nav-button, .menu-button, .menu-btn, .nav-btn { display: flex !important; opacity: 1 !important; visibility: visible !important; pointer-events: auto !important; }';
      document.head.appendChild(styleFix);
    }

    // 3. Hide ONLY the old boxed footer (with "BUSINESS ENQUIRIES" / "PRIVACY POLICY")
    // Strict height limit (< 1.35 * screen height) guarantees it NEVER hides the rest of the page!
    document.querySelectorAll('a, div, span, button').forEach(function(el) {
      if (el.closest('#atw-new-master-footer') || el.closest('#atw-custom-nav-drawer')) return;
      if (el.children.length > 1) return;

      var txt = (el.textContent || '').replace(/\s+/g, ' ').trim().toUpperCase();
      if (txt === 'BUSINESS ENQUIRIES' || txt === 'PRIVACY POLICY') {
        var cur = el;
        var boxToHide = null;
        while (cur && cur.parentElement && cur.parentElement !== document.body) {
          var p = cur.parentElement;
          var pText = (p.textContent || '').toUpperCase();
          // Stop climbing if parent is taller than 1.35 screens or contains earlier sections
          if (
            p.offsetHeight > window.innerHeight * 1.35 ||
            p.querySelector('#atw-new-master-footer') ||
            pText.indexOf("WHAT'S UP") !== -1 ||
            pText.indexOf('TECH STACK') !== -1 ||
            pText.indexOf('TOPPER') !== -1
          ) {
            boxToHide = cur;
            break;
          }
          cur = p;
        }
        if (boxToHide && boxToHide !== document.body) {
          boxToHide.style.setProperty('display', 'none', 'important');
        }
      }
    });
  }

  // Intercept clicks on the native neon-lime 2-line menu button next to RESUMES
  if (!window.__atwNativeNeonBurgerWired) {
    window.__atwNativeNeonBurgerWired = true;
    window.addEventListener('click', function(e) {
      var t = e.target;
      if (!t || t.closest('#atw-custom-nav-drawer')) return;
      var r = t.getBoundingClientRect();
      var txt = (t.textContent || '').trim().toUpperCase();
      if (r.top >= 0 && r.top < 100 && r.right > window.innerWidth - 100 && r.width < 85 && txt.indexOf('RESUME') === -1) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        var drawer = document.getElementById('atw-custom-nav-drawer');
        if (drawer) drawer.classList.toggle('is-open');
      }
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cleanMenuButtonAndOldFooter);
  } else {
    cleanMenuButtonAndOldFooter();
  }
  setTimeout(cleanMenuButtonAndOldFooter, 400);
  setTimeout(cleanMenuButtonAndOldFooter, 1200);
})();