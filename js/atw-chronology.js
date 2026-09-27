(function() {
  const LIVE_VER = Date.now();

  function loadWithFallback(img, baseFolder, slotNum, isContain) {
    const exts = ['jpg', 'JPG', 'jpeg', 'png', 'webp'];
    let idx = 0;
    function tryNext() {
      if (idx >= exts.length) return;
      const ext = exts[idx++];
      img.onerror = tryNext;
      img.src = `./${baseFolder}/${slotNum}.${ext}?v=${LIVE_VER}`;
    }
    tryNext();
    img.style.setProperty('object-fit', isContain ? 'contain' : 'cover', 'important');
    img.style.setProperty('opacity', '1', 'important');
    img.style.setProperty('visibility', 'visible', 'important');
  }

  function setDirectImgWithFallback(img, urls, fitMode, bgMode) {
    if (!img) return;
    const pic = img.closest('picture');
    if (pic) pic.querySelectorAll('source').forEach(s => s.remove());
    img.removeAttribute('srcset');
    img.removeAttribute('sizes');
    img.removeAttribute('data-src');
    img.dataset.atwTopperLocked = '1';

    const key = urls[0];
    if (img.dataset.atwCustomKey !== key) {
      img.dataset.atwCustomKey = key;
      let uIdx = 0;
      function tryUrl() {
        if (uIdx >= urls.length) return;
        const nextU = urls[uIdx++];
        img.onerror = tryUrl;
        img.src = nextU;
      }
      tryUrl();
    }
    img.style.setProperty('object-fit', fitMode || 'cover', 'important');
    if (bgMode) img.style.setProperty('background', bgMode, 'important');
    img.style.setProperty('opacity', '1', 'important');
    img.style.setProperty('visibility', 'visible', 'important');
  }

  function customizeTopperChampionSection() {
    // Match BOTH original Webflow text ("WORLD CHAMPION", "CELEBRATE THIS INCREDIBLE") AND updated text ("TOPPER", "DOWNLOAD RESUMES")
    let topperSection = null;
    document.querySelectorAll('h1, h2, h3, p, div, a, button').forEach(el => {
      if (topperSection) return;
      const t = (el.textContent || '').replace(/\s+/g, ' ').trim().toUpperCase();
      if (
        t === 'DOWNLOAD RESUMES' ||
        (t.includes('TOPPER') && t.includes('CHAMPION')) ||
        t.includes('CELEBRATE THIS INCREDIBLE MOMENT') ||
        t.includes('MERIT TOPPER AND GLOBAL SKILLS PARK')
      ) {
        let sec = el.closest('section') || el.parentElement;
        for (let i = 0; i < 7 && sec && sec !== document.body; i++) {
          const imgs = Array.from(sec.querySelectorAll('img')).filter(im => !(im.getAttribute('src') || '').toLowerCase().endsWith('.svg'));
          if (imgs.length >= 4 && imgs.length <= 8) {
            topperSection = sec;
            break;
          }
          sec = sec.parentElement;
        }
      }
    });

    if (!topperSection) return;

    const rawImgs = Array.from(topperSection.querySelectorAll('img')).filter(img => {
      const s = (img.getAttribute('src') || '').toLowerCase();
      return !s.endsWith('.svg');
    });
    if (rawImgs.length < 4) return;

    const items = rawImgs.map(img => {
      const r = img.getBoundingClientRect();
      return { img, r, area: Math.max(1, r.width * r.height) };
    });

    // 1. BIG PHOTO (Largest area) -> 25.jpg ("ATW IS HERE" poster)
    items.sort((a, b) => b.area - a.area);
    const bigPhoto = items[0];
    const others = items.slice(1);

    setDirectImgWithFallback(bigPhoto.img, [`./public/chronology/25.jpg?v=${LIVE_VER}`], 'cover', null);

    // Sort remaining 4 images from Left to Right
    others.sort((a, b) => a.r.left - b.r.left);

    // 2. Behind "DOWNLOAD RESUMES" button (Far-Left) -> 12.jpg
    if (others[0]) {
      setDirectImgWithFallback(others[0].img, [`./public/chronology/12.jpg?v=${LIVE_VER}`], 'cover', null);
    }

    // 3. Small Photo in Middle (Bottom-Center) -> STYLE.JPG
    if (others[1]) {
      setDirectImgWithFallback(
        others[1].img,
        [
          `./public/chronology/STYLE.JPG?v=${LIVE_VER}`,
          `./public/chronology/style.jpg?v=${LIVE_VER}`,
          `./public/chronology/STYLE.png?v=${LIVE_VER}`,
          `./public/chronology/topper_middle.jpg?v=${LIVE_VER}`
        ],
        'cover',
        null
      );
    }

    // 4 & 5. Right Side: Top-Right = Golden Card (atw_gold_card.jpg), Bottom-Right (Below Main Photo) = LAND.jpg
    const rightSide = others.slice(2);
    if (rightSide.length >= 2) {
      rightSide.sort((a, b) => a.r.top - b.r.top);
      // Higher image = Top-Right Golden Card
      setDirectImgWithFallback(rightSide[0].img, [`./public/chronology/atw_gold_card.jpg?v=${LIVE_VER}`], 'cover', null);
      // Lower image (below main photo) = LAND.jpg
      setDirectImgWithFallback(
        rightSide[1].img,
        [
          `./public/chronology/LAND.jpg?v=${LIVE_VER}`,
          `./public/chronology/land.jpg?v=${LIVE_VER}`,
          `./public/chronology/LAND.JPG?v=${LIVE_VER}`,
          `./public/chronology/LAND.png?v=${LIVE_VER}`
        ],
        'cover',
        null
      );
    } else if (rightSide.length === 1) {
      setDirectImgWithFallback(rightSide[0].img, [`./public/chronology/atw_gold_card.jpg?v=${LIVE_VER}`], 'cover', null);
    }
  }

  function customizeFooterCenterPhoto() {
    let footerSec = document.querySelector('footer, .footer');
    if (!footerSec) {
      document.querySelectorAll('h1, h2, h3, div, span, a').forEach(el => {
        const t = (el.textContent || '').trim().toUpperCase();
        if (t === 'CONNECT OR HIRE' || t.includes('ALWAYS BRINGING')) {
          footerSec = el.closest('section, footer, .footer') || el.parentElement.parentElement.parentElement;
        }
      });
    }
    if (!footerSec) return;

    const fImgs = Array.from(footerSec.querySelectorAll('img')).filter(img => {
      if (img.id === 'atw-footer-neon-sig') return false;
      const s = (img.getAttribute('src') || '').toLowerCase();
      return !s.endsWith('.svg');
    });
    if (fImgs.length > 0) {
      fImgs.sort((a, b) => {
        const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
        return (rb.width * rb.height) - (ra.width * ra.height);
      });
      setDirectImgWithFallback(
        fImgs[0],
        [
          `./public/chronology/footer_hero.jpg?v=${LIVE_VER}`,
          `./public/chronology/file_00000000950481fdaa2e8d36298409dd.png?v=${LIVE_VER}`,
          `./public/chronology/25.jpg?v=${LIVE_VER}`
        ],
        'cover',
        null
      );
    }
  }

  function syncAllSitePhotos() {
    // A. Page 4 Certificates (public/gallery/1..16)
    document.querySelectorAll('#atw-page4-pin-wrap .atw-p4-card').forEach(card => {
      const img = card.querySelector('img');
      const blur = card.querySelector('.atw-p4-blur-bg');
      if (!img || img.dataset.atwSynced === String(LIVE_VER)) return;
      const curSrc = img.getAttribute('src') || '';
      const m = curSrc.match(/\/gallery\/(\d+)\./);
      if (m) {
        const certNum = m[1];
        img.dataset.atwSynced = String(LIVE_VER);
        loadWithFallback(img, 'public/gallery', certNum, true);
        if (blur) blur.style.backgroundImage = `url('./public/gallery/${certNum}.jpg?v=${LIVE_VER}')`;
      }
    });

    // B. Lock Section 07 (TOPPER & AWARD CHAMPION) & Footer Center Photo FIRST
    customizeTopperChampionSection();
    customizeFooterCenterPhoto();

    // C. Map Chronology Slots 1..24
    const p4 = document.getElementById('atw-page4-pin-wrap') || document.getElementById('atw-page3-skill-tree');
    if (!p4) return;

    const postP4Imgs = Array.from(document.querySelectorAll('img')).filter(img => {
      if (img.closest('#atw-master-stage') || img.closest('#atw-page3-skill-tree') || img.closest('#atw-page4-pin-wrap') || img.closest('#atw-lightbox') || img.closest('#atw-custom-nav-drawer') || img.id === 'atw-footer-neon-sig') return false;
      const s = (img.getAttribute('src') || '').toLowerCase();
      if (s.endsWith('.svg')) return false;
      return Boolean(p4.compareDocumentPosition(img) & Node.DOCUMENT_POSITION_FOLLOWING);
    });

    postP4Imgs.forEach((img, idx) => {
      if (img.dataset.atwTopperLocked === '1') return;

      const slotNum = idx + 1;
      const slot = String(slotNum);
      if (img.dataset.atwLoadedVer === String(LIVE_VER) && img.dataset.atwSlot === slot) return;

      const pic = img.closest('picture');
      if (pic) pic.querySelectorAll('source').forEach(srcEl => srcEl.remove());

      img.removeAttribute('srcset');
      img.removeAttribute('sizes');
      img.removeAttribute('data-src');
      img.dataset.atwSlot = slot;
      img.dataset.atwLoadedVer = String(LIVE_VER);
      img.title = `Chronology Slot #${slot}`;

      if (slotNum <= 24) {
        loadWithFallback(img, 'public/chronology', slot, false);
      } else {
        img.onerror = function() {
          this.onerror = null;
          this.src = `./public/chronology/25.jpg?v=${LIVE_VER}`;
        };
        img.src = `./public/chronology/${slot}.jpg?v=${LIVE_VER}`;
        img.style.setProperty('object-fit', 'cover', 'important');
        img.style.setProperty('object-position', 'center top', 'important');
        img.style.setProperty('opacity', '1', 'important');
        img.style.setProperty('visibility', 'visible', 'important');
      }
    });
  }

  [50, 250, 700, 1400, 2500].forEach(ms => setTimeout(syncAllSitePhotos, ms));
  window.addEventListener('scroll', syncAllSitePhotos, { passive: true });
})();
