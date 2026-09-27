(function() {
  const LIVE_V = Date.now();
  const NEW_BIO_LINE = "Building practical AI, data, and robotics projects, turning ideas into working solutions, and continuously learning through hands-on experiments, challenges, and creative problem-solving.";
  const GMAIL_HIRE_URL = "https://mail.google.com/mail/?view=cm&fs=1&to=abdultarique5@gmail.com&su=" + encodeURIComponent("Hiring / Project Inquiry — Abdul Tarique Warsi");

  function getPostP4Images() {
    const p4 = document.getElementById('atw-page4-pin-wrap') || document.getElementById('atw-page3-skill-tree');
    if (!p4) return [];
    return Array.from(document.querySelectorAll('img')).filter(img => {
      if (img.closest('#atw-master-stage') || img.closest('#atw-page3-skill-tree') || img.closest('#atw-page4-pin-wrap') || img.closest('#atw-lightbox') || img.closest('#atw-custom-nav-drawer') || img.closest('#atw-new-master-footer') || img.id === 'atw-footer-neon-sig') return false;
      const s = (img.getAttribute('src') || '').toLowerCase();
      return !s.endsWith('.svg') && Boolean(p4.compareDocumentPosition(img) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
  }

  function scrollToSectionTarget(target) {
    if (target === './resume.html') {
      sessionStorage.setItem('atw_visited_resume', '1');
      window.location.href = './resume.html';
      return;
    }
    if (target === '#atw-master-stage') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (target === 'scroll-page-2') {
      window.scrollTo({ top: window.innerHeight * 0.65, behavior: 'smooth' });
      return;
    }
    const postImgs = getPostP4Images();
    if (target === 'scroll-timeline' && postImgs[0]) {
      postImgs[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (target === 'scroll-projects' && postImgs[14]) {
      postImgs[14].scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (target === 'scroll-topper') {
      const topperEl = Array.from(document.querySelectorAll('h1, h2, h3, div')).find(e => /TOPPER\s*&\s*AWARD/i.test(e.textContent || ''));
      if (topperEl) {
        topperEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }
    if (target === 'scroll-tech') {
      const techEl = document.getElementById('atw-tech-ribbon-wrap');
      if (techEl) {
        techEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }
    if (target === 'scroll-socials') {
      const footEl = document.getElementById('atw-new-master-footer');
      if (footEl) {
        footEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      return;
    }
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function injectMasterStyles() {
    const oldSt = document.getElementById('atw-master-easy-css');
    if (oldSt) oldSt.remove();

    const st = document.createElement('style');
    st.id = 'atw-master-easy-css';
    st.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=Inter:wght@500;600;700;800;900&family=Space+Grotesk:wght@600;700&display=swap');

      /* 1. Hide Page 3/4 counters & pin badges */
      #atw-page4-pin-wrap .atw-p4-badge,
      #atw-page4-pin-wrap .atw-p4-num,
      #atw-page4-pin-wrap .atw-p4-count,
      #atw-page4-pin-wrap .atw-p4-tag,
      #atw-page4-pin-wrap .atw-p4-kicker,
      #atw-page4-pin-wrap .atw-p4-pill,
      #atw-page4-pin-wrap [style*="#D2FF00"][style*="position: absolute"],
      #atw-page4-pin-wrap [style*="#d2ff00"][style*="position: absolute"],
      #atw-page4-pin-wrap [style*="rgb(210, 255, 0)"][style*="position: absolute"],
      .st-pill, .st-kicker, .st-pin-num {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }

      /* Hide Webflow native menu overlay */
      .w-nav-overlay, .menu-overlay, .nav-menu, .menu-w, [class*="menu-bg"] {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
      }

      #atw-p4-track {
        padding-left: 4vw !important;
        padding-right: 6vw !important;
        margin-left: 0 !important;
      }

      /* 2. GitHub Hall of Fame Cards */
      .atw-github-card-wired {
        cursor: pointer !important;
        position: relative !important;
        transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.28s ease !important;
      }
      .atw-github-card-wired:hover {
        transform: translateY(-6px) scale(1.015) !important;
        box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45), 0 0 0 2px #D2FF00 !important;
      }
      .atw-gh-overlay-bar {
        position: absolute;
        left: 10px;
        right: 10px;
        bottom: 10px;
        background: rgba(17, 19, 14, 0.92);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(210, 255, 0, 0.42);
        border-radius: 6px;
        padding: 9px 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        z-index: 20;
        pointer-events: none;
      }
      .atw-gh-info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
      .atw-gh-title { color: #F4F4ED !important; font-family: 'Inter', sans-serif; font-size: 12.5px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .atw-gh-sub { color: #A5A89E !important; font-family: 'Inter', sans-serif; font-size: 10.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .atw-gh-cta { background: #D2FF00; color: #111112 !important; font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 800; letter-spacing: 0.06em; padding: 5px 8px; border-radius: 4px; flex-shrink: 0; }

      /* 3. CLEAN, HIGH-LEGIBILITY VERTICAL 9-PAGE MENU */
      #atw-custom-nav-drawer {
        position: fixed;
        inset: 0;
        background: #0D0F0C !important;
        z-index: 999995;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 44px 6vw 26px 6vw;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transform: translateY(-2%);
        transition: opacity 0.26s ease, transform 0.26s ease, visibility 0.26s;
        overflow: hidden;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      #atw-custom-nav-drawer.is-open {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translateY(0);
      }
      .atw-nav-close-btn {
        position: fixed;
        top: 22px;
        right: 32px;
        background: #D2FF00;
        color: #111112;
        border: none;
        border-radius: 6px;
        padding: 10px 20px;
        font-family: 'Inter', sans-serif;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.08em;
        cursor: pointer;
        z-index: 999999;
      }
      .atw-nav-body-split {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 4vw;
        width: 100%;
        max-width: 1320px;
        margin: auto;
      }
      .atw-nav-list {
        display: flex;
        flex-direction: column;
        gap: 2px;
        flex: 1;
        max-width: 780px;
      }
      .atw-nav-item {
        display: flex;
        align-items: center;
        gap: 18px;
        text-decoration: none !important;
        padding: 7px 12px;
        border-bottom: 1px solid rgba(244, 244, 237, 0.08);
        cursor: pointer;
        transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
        border-radius: 4px;
      }
      .atw-nav-item:hover {
        transform: translateX(10px);
        border-bottom-color: #D2FF00;
        background: rgba(210, 255, 0, 0.06);
      }
      .atw-nav-num {
        font-family: 'Space Grotesk', 'Consolas', monospace !important;
        font-size: 13px !important;
        color: #D2FF00 !important;
        font-weight: 700 !important;
        letter-spacing: 0.05em !important;
        min-width: 44px;
        flex-shrink: 0;
      }
      .atw-nav-label {
        font-family: 'Space Grotesk', 'Inter', 'Segoe UI', sans-serif !important;
        font-size: clamp(15px, 2.0vh, 20px) !important;
        line-height: 1.35 !important;
        color: #F4F5F0 !important;
        letter-spacing: 0.05em !important;
        text-transform: uppercase !important;
        font-weight: 700 !important;
        white-space: nowrap !important;
      }
      .atw-nav-item:hover .atw-nav-label {
        color: #D2FF00 !important;
      }
      .atw-nav-photo-card {
        width: clamp(240px, 24vw, 340px);
        height: clamp(320px, 56vh, 450px);
        border-radius: 12px;
        overflow: hidden;
        border: 1.5px solid rgba(210, 255, 0, 0.38);
        position: relative;
        flex-shrink: 0;
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.65);
        background: #1A1C16;
      }
      @media (max-width: 860px) {
        .atw-nav-photo-card { display: none !important; }
      }
      .atw-nav-photo-card img {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        object-position: center top !important;
        display: block !important;
      }
      .atw-nav-photo-tag {
        position: absolute;
        left: 12px;
        right: 12px;
        bottom: 12px;
        background: rgba(17, 18, 14, 0.9);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(210, 255, 0, 0.4);
        padding: 8px 12px;
        border-radius: 6px;
        color: #D2FF00;
        font-family: 'Inter', sans-serif;
        font-size: 10.5px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-align: center;
      }
      .atw-nav-footer {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding-top: 14px;
        border-top: 1px solid rgba(244, 244, 237, 0.12);
      }
      .atw-nav-socials { display: flex; gap: 20px; flex-wrap: wrap; }
      .atw-nav-socials a {
        color: #F4F5F0 !important;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 900;
        letter-spacing: 0.03em;
        text-decoration: none;
        transition: color 0.2s;
      }
      .atw-nav-socials a:hover {
        color: #D2FF00 !important;
      }

      /* 4. Tech Stack Ribbon */
      @keyframes atwTechMarquee {
        0% { transform: translate3d(0, 0, 0); }
        100% { transform: translate3d(-50%, 0, 0); }
      }
      #atw-tech-ribbon-wrap {
        width: 100%;
        overflow: hidden;
        padding: 34px 0;
        margin: 24px 0;
        border-top: 1px solid rgba(17, 17, 18, 0.12);
        border-bottom: 1px solid rgba(17, 17, 18, 0.12);
      }
      .atw-tech-ribbon-track {
        display: flex;
        width: max-content;
        gap: 56px;
        animation: atwTechMarquee 28s linear infinite;
        align-items: center;
      }
      .atw-tech-pill {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        font-family: 'Space Grotesk', 'Inter', sans-serif;
        font-size: clamp(18px, 2.0vw, 26px);
        font-weight: 700;
        letter-spacing: 0.05em;
        color: #111112;
        text-transform: uppercase;
        white-space: nowrap;
        padding: 8px 20px;
        border-radius: 6px;
        border: 1.5px solid rgba(17, 17, 18, 0.18);
        background: rgba(255, 255, 255, 0.45);
      }
      .atw-tech-pill span.dot {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: #111112;
        box-shadow: 0 0 0 3px #D2FF00;
        display: inline-block;
      }

      /* 5. FULL-SCREEN LEFT-SCREENSHOT FOOTER (Mounted directly on body so it is NEVER boxed!) */
      #atw-new-master-footer {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        position: relative !important;
        z-index: 60 !important;
        display: block !important;
        background-color: #0D0F0C !important;
      }
      .atw-foot-lime-top {
        background-color: #D2FF00 !important;
        color: #0B0D0A !important;
        padding: 76px 24px 72px 24px !important;
        text-align: center !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
      }
      .atw-foot-quote-head {
        max-width: 1040px !important;
        font-family: 'Inter', sans-serif !important;
        font-weight: 900 !important;
        font-size: clamp(28px, 4.2vw, 56px) !important;
        line-height: 1.08 !important;
        letter-spacing: -0.02em !important;
        text-transform: uppercase !important;
        margin: 0 0 32px 0 !important;
        color: #0B0D0A !important;
      }
      .atw-foot-quote-head em {
        font-family: 'Instrument Serif', Georgia, serif !important;
        font-style: italic !important;
        font-weight: 400 !important;
        letter-spacing: 0 !important;
      }
      .atw-foot-connect-btn {
        display: inline-flex !important;
        align-items: center !important;
        gap: 10px !important;
        background-color: #0B0D0A !important;
        color: #D2FF00 !important;
        font-family: 'Inter', sans-serif !important;
        font-size: 13px !important;
        font-weight: 800 !important;
        letter-spacing: 0.12em !important;
        text-transform: uppercase !important;
        text-decoration: none !important;
        padding: 16px 36px !important;
        border-radius: 8px !important;
        border: 2px solid #0B0D0A !important;
        transition: all 0.22s ease !important;
        cursor: pointer !important;
      }
      .atw-foot-connect-btn:hover {
        background-color: transparent !important;
        color: #0B0D0A !important;
        transform: translateY(-2px) !important;
      }
      .atw-foot-dark-bottom {
        background-color: #0D0F0C !important;
        color: #F4F5F0 !important;
        padding: 68px 24px 32px 24px !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        text-align: center !important;
      }
      .atw-foot-crest {
        width: 44px !important;
        height: 44px !important;
        margin-bottom: 16px !important;
      }
      .atw-foot-giant-name {
        font-family: 'Inter', sans-serif !important;
        font-weight: 900 !important;
        font-size: clamp(34px, 5.4vw, 74px) !important;
        letter-spacing: -0.02em !important;
        line-height: 1.04 !important;
        margin: 0 0 12px 0 !important;
        color: #F4F5F0 !important;
        text-transform: uppercase !important;
      }
      .atw-foot-giant-name em {
        font-family: 'Instrument Serif', Georgia, serif !important;
        font-style: italic !important;
        font-weight: 400 !important;
        color: #D2FF00 !important;
      }
      .atw-foot-roles-sub {
        font-family: 'Inter', sans-serif !important;
        font-size: clamp(10px, 1.0vw, 12px) !important;
        font-weight: 600 !important;
        letter-spacing: 0.2em !important;
        text-transform: uppercase !important;
        color: #8E9488 !important;
        margin: 0 0 36px 0 !important;
      }
      .atw-follow-kicker {
        display: block !important;
        font-family: 'Inter', sans-serif !important;
        font-size: 11px !important;
        font-weight: 700 !important;
        letter-spacing: 0.2em !important;
        text-transform: uppercase !important;
        color: #D2FF00 !important;
        margin-bottom: 18px !important;
      }
      /* Bold High-Contrast Uppercase Links matching image_3fb0da.png */
      .atw-bold-links-wrap {
        display: flex !important;
        flex-wrap: wrap !important;
        justify-content: center !important;
        align-items: center !important;
        gap: 14px 36px !important;
        margin: 0 auto 52px auto !important;
      }
      .atw-bold-link-item {
        font-family: 'Inter', 'Space Grotesk', sans-serif !important;
        font-weight: 900 !important;
        font-size: clamp(22px, 2.6vw, 34px) !important;
        line-height: 1.15 !important;
        letter-spacing: -0.01em !important;
        text-transform: uppercase !important;
        color: #F4F5F0 !important;
        text-decoration: none !important;
        -webkit-font-smoothing: antialiased !important;
        transition: color 0.2s ease, transform 0.2s ease !important;
        cursor: pointer !important;
      }
      .atw-bold-link-item:hover {
        color: #D2FF00 !important;
        transform: scale(1.05) !important;
      }
      .atw-foot-bottom-bar {
        width: 100% !important;
        max-width: 1200px !important;
        display: flex !important;
        flex-wrap: wrap !important;
        justify-content: space-between !important;
        align-items: center !important;
        padding-top: 24px !important;
        border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
        font-family: 'Inter', sans-serif !important;
        font-size: 11px !important;
        font-weight: 600 !important;
        letter-spacing: 0.1em !important;
        color: #8E9488 !important;
      }
      .atw-foot-backtop {
        color: #D2FF00 !important;
        text-decoration: none !important;
        font-weight: 800 !important;
        cursor: pointer !important;
      }
    `;
    document.head.appendChild(st);
  }

  // ==========================================================================
  // 1. SINGLE-COLUMN VERTICAL 9-PAGE MENU (CLEAN SPACE GROTESK / INTER FONT)
  // ==========================================================================
  function setupHamburgerAndAllMenus() {
    const cfg = window.ATW_EASY_CONFIG || {};
    const navItems = cfg.navigationMenu || [];

    const existingDrawer = document.getElementById('atw-custom-nav-drawer');
    if (existingDrawer && !existingDrawer.dataset.atwCleanFontV3) {
      existingDrawer.remove();
    }

    if (!document.getElementById('atw-custom-nav-drawer')) {
      const drawer = document.createElement('div');
      drawer.id = 'atw-custom-nav-drawer';
      drawer.dataset.atwCleanFontV3 = '1';

      const itemsHtml = navItems.map((item, idx) => `
        <a class="atw-nav-item" data-target="${item.target}" data-idx="${idx}">
          <span class="atw-nav-num">${item.num} //</span>
          <span class="atw-nav-label">${item.label}</span>
        </a>
      `).join('');

      drawer.innerHTML = `
        <button class="atw-nav-close-btn" id="atw-nav-close">CLOSE ✕</button>
        <div class="atw-nav-body-split">
          <div class="atw-nav-list">${itemsHtml}</div>
          <div class="atw-nav-photo-card">
            <img src="./public/chronology/footer_hero.jpg?v=${LIVE_V}" onerror="this.src='./public/chronology/STYLE.JPG?v=${LIVE_V}'" alt="Abdul Tarique Warsi" />
            <div class="atw-nav-photo-tag">ABDUL TARIQUE WARSI // ATW</div>
          </div>
        </div>
        <div class="atw-nav-footer">
          <div style="color:#8E9488;font-family:'Inter',sans-serif;font-size:11.5px;letter-spacing:0.08em;">
            FOLLOW ABDUL TARIQUE WARSI
          </div>
          <div class="atw-nav-socials">
            <a href="https://github.com/ATWISHERE" target="_blank" rel="noopener">GITHUB</a>
            <a href="https://www.linkedin.com/in/abdul-tarique-warsi" target="_blank" rel="noopener">LINKEDIN</a>
            <a href="${GMAIL_HIRE_URL}" target="_blank" rel="noopener">EMAIL</a>
            <a href="tel:+918770463418">PHONE</a>
            <a href="./resume.html">RESUMES</a>
          </div>
        </div>
      `;
      document.body.appendChild(drawer);

      const closeDrawer = () => {
        drawer.classList.remove('is-open');
        document.documentElement.classList.remove('lenis-stopped');
        document.body.classList.remove('lenis-stopped');
        if (window.lenis && typeof window.lenis.start === 'function') {
          try { window.lenis.start(); } catch(e) {}
        }
      };

      drawer.querySelector('#atw-nav-close').addEventListener('click', closeDrawer);
      window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });

      drawer.querySelectorAll('.atw-nav-item').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = link.getAttribute('data-target');
          closeDrawer();
          scrollToSectionTarget(target);
        });
      });

      window.addEventListener('click', (e) => {
        const clicked = e.target;
        if (!clicked || clicked.closest('#atw-custom-nav-drawer')) return;
        const btn = clicked.closest('button, a, div[role="button"], .w-nav-button, [class*="menu"], [class*="nav"], [class*="burger"]');
        const r = (btn || clicked).getBoundingClientRect();
        const txt = ((btn || clicked).textContent || '').trim().toUpperCase();
        if (r.top >= 0 && r.top < 105 && r.right > window.innerWidth - 115 && r.width < 90 && !txt.includes('RESUME')) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          drawer.classList.toggle('is-open');
        }
      }, true);
    }
  }

  // ==========================================================================
  // 2. HIDE ENTIRE OLD WEBFLOW FOOTER & MOUNT FULL-WIDTH FOOTER AT BODY END
  // ==========================================================================
  function replaceFooterWithFullWidthLayout() {
    // A. Find and hide EVERY part of the old Webflow footer (so it never wraps or boxes our new footer!)
    document.querySelectorAll('footer, .footer, .footer-wrap, section, div').forEach(el => {
      if (el.id === 'atw-new-master-footer' || el.closest('#atw-new-master-footer') || el.closest('#atw-custom-nav-drawer')) return;
      if (el === document.body || el === document.documentElement || el.contains(document.getElementById('atw-page4-pin-wrap'))) return;
      const txt = (el.textContent || '').toUpperCase();
      if (
        (txt.includes('ALWAYS BRINGING') && txt.includes('FIGHT')) ||
        (txt.includes('FOLLOW ON') && txt.includes('GITHUB') && txt.includes('LINKEDIN') && txt.length < 800) ||
        (txt.includes('PRIVACY POLICY') && txt.includes('TERMS') && txt.length < 500)
      ) {
        const topSec = el.closest('footer, .footer, section') || el;
        if (topSec && topSec !== document.body && !topSec.contains(document.getElementById('atw-page4-pin-wrap'))) {
          topSec.style.setProperty('display', 'none', 'important');
        }
        el.style.setProperty('display', 'none', 'important');
      }
    });

    // B. Rebuild #atw-new-master-footer directly as the last visual element in document.body
    const oldMount = document.getElementById('atw-new-master-footer');
    if (oldMount && !oldMount.dataset.atwFullWidthV3) {
      oldMount.remove();
    }

    if (!document.getElementById('atw-new-master-footer')) {
      const newFoot = document.createElement('footer');
      newFoot.id = 'atw-new-master-footer';
      newFoot.dataset.atwFullWidthV3 = '1';
      newFoot.innerHTML = `
        <div class="atw-foot-lime-top">
          <h2 class="atw-foot-quote-head">
            REMEMBER SOLVE YOUR PROBLEM <em>FIRST</em><br/>
            BECAUSE YOUR PROBLEM CAN LEAD TO<br/>
            SOLUTION OF OTHERS
          </h2>
          <a href="${GMAIL_HIRE_URL}" target="_blank" rel="noopener noreferrer" class="atw-foot-connect-btn">
            CONNECT/HIRE &rarr;
          </a>
        </div>
        <div class="atw-foot-dark-bottom">
          <svg class="atw-foot-crest" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="skewX(-8) translate(6, 0)">
              <path d="M18 92 L42 24 L56 24 L32 92 Z" stroke="#D2FF00" stroke-width="4.5" fill="none"/>
              <path d="M46 24 L98 24 L94 38 L76 38 L60 92 L44 92 L60 38 L42 38 Z" stroke="#D2FF00" stroke-width="4.5" fill="none"/>
              <path d="M68 56 L80 92 L92 66 L102 92 L114 42" stroke="#D2FF00" stroke-width="4.5" fill="none"/>
            </g>
          </svg>
          <h1 class="atw-foot-giant-name">ABDUL TARIQUE <em>WARSI</em></h1>
          <div class="atw-foot-roles-sub">
            FUTURE DATA SCIENTIST &bull; AI &amp; ROBOTICS TEACHER &bull; PRECISION CNC ENGINEER
          </div>
          <span class="atw-follow-kicker">FOLLOW ABDUL TARIQUE WARSI</span>
          <nav class="atw-bold-links-wrap" aria-label="Social and Contact Links">
            <a href="https://github.com/ATWISHERE" target="_blank" rel="noopener noreferrer" class="atw-bold-link-item">GITHUB</a>
            <a href="https://www.linkedin.com/in/abdul-tarique-warsi" target="_blank" rel="noopener noreferrer" class="atw-bold-link-item">LINKEDIN</a>
            <a href="${GMAIL_HIRE_URL}" target="_blank" rel="noopener noreferrer" class="atw-bold-link-item">EMAIL</a>
            <a href="tel:+918770463418" class="atw-bold-link-item">PHONE</a>
            <a href="./resume.html" class="atw-bold-link-item">RESUMES</a>
          </nav>
          <div class="atw-foot-bottom-bar">
            <div>&copy; 2026 ABDUL TARIQUE WARSI. ALL RIGHTS RESERVED.</div>
            <a class="atw-foot-backtop" id="atw-foot-top-btn">BACK TO TOP &uarr;</a>
          </div>
        </div>
      `;

      document.body.appendChild(newFoot);

      newFoot.querySelector('#atw-foot-top-btn').addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  function fixPage4AndHallOfFame() {
    const cfg = window.ATW_EASY_CONFIG || {};
    const certTitles = cfg.certificateTitles || {};

    document.querySelectorAll('#atw-page4-pin-wrap .atw-p4-card *').forEach(el => {
      if (el.tagName === 'IMG' || el.classList.contains('atw-p4-img-wrap') || el.classList.contains('atw-p4-blur-bg')) return;
      const bg = (el.style && el.style.backgroundColor) || '';
      const txt = (el.textContent || '').trim();
      if (
        bg.includes('210, 255, 0') ||
        bg.toLowerCase().includes('#d2ff00') ||
        /^0?\d+\s*\/\s*1\d/i.test(txt) ||
        (el.parentElement && el.parentElement.classList.contains('atw-p4-img-wrap'))
      ) {
        el.style.setProperty('display', 'none', 'important');
      }
    });

    document.querySelectorAll('#atw-page4-pin-wrap .atw-p4-card').forEach((card, idx) => {
      const img = card.querySelector('img');
      const blur = card.querySelector('.atw-p4-blur-bg');
      if (!img) return;
      const src = img.getAttribute('src') || '';
      const m = src.match(/\/gallery\/(\d+)\./);
      const num = m ? parseInt(m[1], 10) : (idx + 1);

      if (!img.dataset.atwFixedGal) {
        img.dataset.atwFixedGal = '1';
        const cleanUrl = `./public/gallery/${num}.jpg?v=${LIVE_V}`;
        img.src = cleanUrl;
        img.style.setProperty('object-fit', 'contain', 'important');
        img.style.setProperty('opacity', '1', 'important');
        img.style.setProperty('visibility', 'visible', 'important');
        if (blur) blur.style.backgroundImage = `url('${cleanUrl}')`;
      }
      const cap = card.querySelector('.atw-p4-title, .atw-p4-caption, h4, p');
      if (cap && certTitles[num]) cap.textContent = certTitles[num];
    });

    const postP4Imgs = getPostP4Images();
    (cfg.githubProjects || []).forEach((proj, i) => {
      const targetImg = postP4Imgs[(proj.photoSlot ? proj.photoSlot - 1 : 14 + i)];
      if (!targetImg) return;
      let cardEl = targetImg.closest('a, .helmet-card, .w-dyn-item, .grid-item') || targetImg.parentElement;
      if (!cardEl || cardEl.dataset.atwGhWired === '1') return;

      cardEl.dataset.atwGhWired = '1';
      cardEl.classList.add('atw-github-card-wired');

      if (cardEl.tagName === 'A') {
        cardEl.href = proj.githubUrl || cfg.githubProfileGateway;
        cardEl.target = '_blank';
        cardEl.rel = 'noopener noreferrer';
      } else {
        cardEl.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          window.open(proj.githubUrl || cfg.githubProfileGateway, '_blank', 'noopener,noreferrer');
        });
      }

      const bar = document.createElement('div');
      bar.className = 'atw-gh-overlay-bar';
      bar.innerHTML = `
        <div class="atw-gh-info">
          <div class="atw-gh-title">${proj.title}</div>
          <div class="atw-gh-sub">${proj.subtitle}</div>
        </div>
        <div class="atw-gh-cta">GITHUB ↗</div>
      `;
      cardEl.appendChild(bar);
    });
  }

  function applyAllWordingsAndTechRibbon() {
    const cfg = window.ATW_EASY_CONFIG || {};
    const ext = window.ATW_EXTRA_SECTIONS || {};
    const p4 = document.getElementById('atw-page4-pin-wrap') || document.getElementById('atw-page3-skill-tree');
    if (!p4) return;

    document.querySelectorAll('h1, h2, h3, h4, h5, p, blockquote, div, span, a, button, li').forEach(el => {
      if (el.closest('#atw-master-stage') || el.closest('#atw-page3-skill-tree') || el.closest('#atw-page4-pin-wrap') || el.closest('.atw-gh-overlay-bar') || el.closest('#atw-custom-nav-drawer') || el.closest('#atw-tech-ribbon-wrap') || el.closest('#atw-new-master-footer') || el.closest('script') || el.closest('style')) return;
      if (!Boolean(p4.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING)) return;

      const hasBlockChildren = Array.from(el.children).some(c => !['SPAN', 'STRONG', 'B', 'EM', 'I', 'BR'].includes(c.tagName));
      if (hasBlockChildren) return;

      const raw = (el.textContent || '').replace(/\s+/g, ' ').trim();
      if (!raw) return;
      const up = raw.toUpperCase();

      // Replace "Follow Lando" (whether single element or split spans) with "FOLLOW ABDUL TARIQUE WARSI"
      if (/^FOLLOW\s+LANDO$/i.test(raw) || (up.includes('FOLLOW') && up.includes('LANDO') && raw.length < 35)) {
        el.textContent = "FOLLOW ABDUL TARIQUE WARSI";
        return;
      }
      if (up === 'LANDO' || up === 'LANDO NORRIS') {
        el.textContent = "ABDUL TARIQUE WARSI";
        return;
      }

      if (/Cruising coastal highways|VIDA electric scooter|exploring waterfalls and/i.test(raw)) {
        el.textContent = NEW_BIO_LINE;
        return;
      }
      if (/doesn't matter where you start/i.test(raw) && cfg.mainTimelineQuote) {
        el.innerHTML = cfg.mainTimelineQuote;
        return;
      }
      if (cfg.sectionSwaps && cfg.sectionSwaps[raw]) {
        el.textContent = cfg.sectionSwaps[raw];
        return;
      }
      if (/^BARCELONA,?\s*202\d$/i.test(raw) || /^SILVERSTONE,?\s*202\d$/i.test(raw)) {
        el.textContent = "Jabalpur // 2026";
        return;
      }
      if (/Since I was 7 years old|first experience with kart racing/i.test(raw)) {
        el.textContent = "Since my first days mastering 5-Axis CNC tolerances and ITI precision, I've worked tirelessly to bridge industrial hardware with AI, Robotics & Data Science.";
        return;
      }
      if (/Most recent results,\s*career stats/i.test(raw) || /photos from trackside/i.test(raw)) {
        el.textContent = "Production AI pipelines, 5-Axis CNC toolpaths, ML models and robotics lab telemetry.";
        return;
      }
      if (/Campaigns,\s*shoots and other such/i.test(raw) || /promotional materials for fans/i.test(raw)) {
        el.textContent = NEW_BIO_LINE;
        return;
      }
      if (/See more helmets and highlights/i.test(raw) || /highlights\s*from Lando on the track/i.test(raw)) {
        el.textContent = "Explore more open-source repositories, AI pipelines and robotics builds on GitHub.";
        return;
      }
      if (up === 'VIEW ON TRACK' || up === 'EXPLORE HELMETS') {
        el.textContent = "VIEW ON GITHUB ↗";
        const aWrap = el.closest('a');
        if (aWrap) { aWrap.href = "https://github.com/ATWISHERE"; aWrap.target = "_blank"; }
        return;
      }
      if (/Celebrate this incredible moment|designed for the fans who never stopped believing/i.test(raw)) {
        el.textContent = "Recognized as 90.3% Merit Topper and Global Skills Park Best Student Award recipient—bridging shop-floor precision with modern Data Science, AI & Robotics.";
        return;
      }
      if (up === '& CAMPAIGNS' || up === '&CAMPAIGNS' || up === 'CAMPAIGNS') {
        el.textContent = "& ECOSYSTEM";
        return;
      }
      if (raw.length > 65 && /\b(Lando|Norris|McLaren|Formula 1|F1|Grand Prix|Silverstone|Monaco|karting|racetrack|Quadrant|podium|championship|driver)\b/i.test(raw)) {
        el.textContent = NEW_BIO_LINE;
      }
    });

    // Tech Companies Ribbon in Section 08
    let partnersSection = null;
    document.querySelectorAll('h1, h2, h3, div, span').forEach(el => {
      const t = (el.textContent || '').replace(/\s+/g, ' ').trim().toUpperCase();
      if (t === '& ECOSYSTEM' || t === '&CAMPAIGNS' || t.includes('TECH STACK & ECOSYSTEM') || t.includes('PARTNERS & CAMPAIGNS')) {
        partnersSection = el.closest('section') || el.parentElement.parentElement;
      }
    });

    if (partnersSection) {
      const sponsorSvgs = Array.from(partnersSection.querySelectorAll('svg, img')).filter(s => !s.closest('#atw-tech-ribbon-wrap'));
      if (sponsorSvgs.length > 0 && !document.getElementById('atw-tech-ribbon-wrap')) {
        const logoGridContainer = sponsorSvgs[0].closest('.w-layout-grid, .partners-grid, .logos-wrap') || sponsorSvgs[0].parentElement.parentElement;
        sponsorSvgs.forEach(s => {
          const item = s.closest('a, .partner-item, .logo-item') || s.parentElement;
          if (item) item.style.setProperty('display', 'none', 'important');
        });

        const companies = (ext.techCompaniesRibbon && ext.techCompaniesRibbon.companies) || [
          "GOOGLE CLOUD", "MICROSOFT AZURE", "NVIDIA AI", "OPENAI",
          "DATABRICKS", "SNOWFLAKE", "AWS", "HUGGING FACE",
          "PYTORCH", "SCIKIT-LEARN", "POWER BI", "SIEMENS NX", "DMG MORI", "ROS 2"
        ];
        const doubled = companies.concat(companies);
        const ribbon = document.createElement('div');
        ribbon.id = 'atw-tech-ribbon-wrap';
        ribbon.innerHTML = `<div class="atw-tech-ribbon-track">${
          doubled.map(c => `<div class="atw-tech-pill"><span class="dot"></span>${c}</div>`).join('')
        }</div>`;

        if (logoGridContainer && logoGridContainer.parentElement) {
          logoGridContainer.parentElement.insertBefore(ribbon, logoGridContainer);
        } else {
          partnersSection.appendChild(ribbon);
        }
      }
    }
  }

  function runMasterAll() {
    injectMasterStyles();
    setupHamburgerAndAllMenus();
    fixPage4AndHallOfFame();
    applyAllWordingsAndTechRibbon();
    replaceFooterWithFullWidthLayout();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', runMasterAll);
  else runMasterAll();
  [100, 350, 800, 1500, 2600].forEach(ms => setTimeout(runMasterAll, ms));
  window.addEventListener('scroll', runMasterAll, { passive: true });
})();
