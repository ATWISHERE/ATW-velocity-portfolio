const fs = require('fs');

const appContent = `import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// PART 1: TOPOGRAPHIC BACKGROUND COMPONENT
// ============================================================================
function TopographicLines({ dark }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <pattern id={dark ? "topo-dark" : "topo-light"} width="200" height="200" patternUnits="userSpaceOnUse">
          <path d="M 0,100 C 50,50 150,150 200,100 M 0,50 C 50,0 150,100 200,50 M 0,150 C 50,100 150,200 200,150" 
                fill="none" stroke={dark ? "#D2FF00" : "#111112"} strokeWidth="1" strokeDasharray="5,5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={\`url(#\${dark ? "topo-dark" : "topo-light"})\`} />
    </svg>
  );
}

// ============================================================================
// PART 2: SITE CONFIGURATION
// ============================================================================
const SITE_CONFIG = {
  identity: {
    firstName: "ABDUL TARIQUE",
    lastName: "WARSI",
    shortCode: "ATW",
    numberCode: "01",
    location: "Jabalpur & Bhopal, MP",
    phone: "+91 8770463418",
    email: "abdultarique5@gmail.com",
    github: "https://github.com/ATWISHERE",
    linkedin: "https://www.linkedin.com/",
    rolePrimary: "AI & Robotics Educator",
    roleSecondary: "Automation & Data Science Engineer"
  },
  images: {
    heroBase: \`\${import.meta.env.BASE_URL}my-portrait-cutout.png\`,
    heroCyber: \`\${import.meta.env.BASE_URL}my-helmet-cutout.png\`,
    signaturePortrait: \`\${import.meta.env.BASE_URL}my-portrait-cutout.png\`,
    splitLeft: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80",
    splitRight: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80",
    bannerLeft: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
    bannerRight: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
    showcaseMain: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80",
    showcaseFloat1: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80",
    showcaseFloat2: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80",
  },
  flagshipProjects: [
    { name: "Enterprise PDF Pipeline", year: "2026", defaultImg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80", actionImg: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80" },
    { name: "Student Data Entry Bot", year: "2025", defaultImg: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80", actionImg: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80" },
    { name: "Crop & Fertilizer ML", year: "2025", defaultImg: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80", actionImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" },
    { name: "Sales KPI Dashboard", year: "2024", defaultImg: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80", actionImg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80" },
    { name: "n8n & ADB Scripting", year: "2024", defaultImg: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80", actionImg: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80" },
    { name: "5-Axis CNC Precision", year: "2024", defaultImg: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80", actionImg: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&q=80" },
    { name: "Global Skills Park Award", year: "2024", defaultImg: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=400&q=80", actionImg: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80" },
    { name: "NCVT-MP Topper", year: "2022", defaultImg: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80", actionImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" },
  ],
  partners: ["PYTHON", "HARVARDX CS109X", "AICTE EDUNET", "OMEGA RENK", "GLOBAL SKILLS PARK", "BHABHA UNIVERSITY", "POWER BI", "PYAUTOGUI"],
};

// ============================================================================
// PART 3: HERO BLOB REVEAL PORTRAIT
// ============================================================================
function HeroBlobRevealPortrait() {
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const mouseRef = useRef({ x: 300, y: 350, targetX: 300, targetY: 350, vx: 0, vy: 0 });
  const imagesRef = useRef({ base: null, reveal: null });

  useEffect(() => {
    const baseImg = new Image();
    const revealImg = new Image();
    baseImg.src = SITE_CONFIG.images.heroBase;
    revealImg.src = SITE_CONFIG.images.heroCyber;
    imagesRef.current.base = baseImg;
    imagesRef.current.reveal = revealImg;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Base Bust Portrait
      if (imagesRef.current.base?.complete) {
        ctx.drawImage(imagesRef.current.base, 0, 0, width, height);
      }

      // 2. Physics Lerping
      const now = performance.now();
      const m = mouseRef.current;
      m.vx += (m.targetX - m.x) * 0.15;
      m.vy += (m.targetY - m.y) * 0.15;
      m.vx *= 0.7; m.vy *= 0.7;
      m.x += m.vx; m.y += m.vy;

      if (Math.abs(m.vx) > 0.1 || Math.abs(m.vy) > 0.1) {
        pointsRef.current.push({ x: m.x, y: m.y, time: now });
      }
      pointsRef.current = pointsRef.current.filter(p => now - p.time < 900);

      // 3. Draw Reveal Mask
      if (pointsRef.current.length > 0 && imagesRef.current.reveal?.complete) {
        ctx.save();
        ctx.beginPath();
        pointsRef.current.forEach((pt, i) => {
          const age = Math.min(1, Math.max(0, (now - pt.time) / 900));
          const radius = (1 - age * 0.8) * 140;
          ctx.moveTo(pt.x + radius, pt.y);
          ctx.arc(pt.x, pt.y, Math.max(0, radius), 0, Math.PI * 2);
          ctx.arc(pt.x + Math.sin(i * 0.5) * 50, pt.y + Math.cos(i * 0.5) * 50, Math.max(0, radius * 0.7), 0, Math.PI * 2);
        });
        ctx.clip();
        ctx.drawImage(imagesRef.current.reveal, 0, 0, width, height);
        ctx.restore();
      }
      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current.targetX = ((e.clientX - rect.left) / rect.width) * canvasRef.current.width;
    mouseRef.current.targetY = ((e.clientY - rect.top) / rect.height) * canvasRef.current.height;
  };

  return (
    <div className="relative w-[340px] sm:w-[460px] md:w-[540px] mx-auto h-full flex flex-col justify-end pointer-events-auto">
      {/* 2D Wireframe Helmet Halo */}
      <svg className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[320px] sm:w-[420px] opacity-15 pointer-events-none" viewBox="0 0 400 260">
        <ellipse cx="200" cy="130" rx="165" ry="110" fill="none" stroke="#111112" strokeWidth="1.5" strokeDasharray="6 4" />
        <path d="M55,140 Q200,40 345,140 M75,180 Q200,110 325,180" fill="none" stroke="#111112" strokeWidth="1.5" />
      </svg>
      <canvas ref={canvasRef} onMouseMove={handleMouseMove} width={600} height={720} className="w-full h-[400px] sm:h-[540px] md:h-[640px] object-cover object-bottom" />
    </div>
  );
}

// ============================================================================
// PART 4: MAIN APP COMPONENT
// ============================================================================
export default function App() {
  const [preloaderState, setPreloaderState] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const mainWrapperRef = useRef(null);
  const pinRef = useRef(null);
  const heroRef = useRef(null);
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);
  const canvasWrapperRef = useRef(null);
  
  const sigRef1 = useRef(null);
  const sigRef2 = useRef(null);
  const sigRef3 = useRef(null);
  
  const manifestoLinesRef = useRef([]);
  const scatterGalleryRef = useRef(null);
  const bgTransitionRef = useRef(null);
  const fanDeckRef = useRef(null);
  const blockWipesRef = useRef([]);
  const nextSprintRef = useRef(null);

  // LENIS SMOOTH SCROLL INIT
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  // PRELOADER TIMING
  useEffect(() => {
    const t1 = setTimeout(() => setPreloaderState(1), 2000);
    const t2 = setTimeout(() => setPreloaderState(2), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // MASTER GSAP TIMELINES
  useEffect(() => {
    if (preloaderState < 2) return;

    // PINNED HERO ANIMATION (0.00 to 0.45 shrink, 0.42 to 0.95 signature)
    [sigRef1, sigRef2, sigRef3].forEach(ref => {
      if(ref.current) {
        const l = ref.current.getTotalLength();
        gsap.set(ref.current, { strokeDasharray: l, strokeDashoffset: l });
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinRef.current,
        start: "top top",
        end: "+=220%",
        scrub: 0.4,
        pin: true
      }
    });

    // Shrink Phase
    tl.fromTo(heroRef.current, {
      width: "100vw",
      height: "100vh",
      backgroundColor: "#F4F4ED",
      borderRadius: "0px"
    }, {
      width: "46vw",
      height: "54vh",
      backgroundColor: "#787A6E",
      borderRadius: "16px",
      ease: "power2.inOut"
    }, 0);
    
    tl.to(canvasWrapperRef.current, { opacity: 0, ease: "power2.inOut" }, 0);
    if(nextSprintRef.current) tl.to(nextSprintRef.current, { opacity: 0, ease: "power2.inOut" }, 0);
    
    // Background Typography Scrubbing
    tl.to(marquee1Ref.current, { xPercent: -30, ease: "none" }, 0);
    tl.to(marquee2Ref.current, { xPercent: 30, ease: "none" }, 0);

    // Signature Writing Phase
    tl.to(sigRef1.current, { strokeDashoffset: 0, ease: "power2.inOut" }, 0.42);
    tl.to(sigRef2.current, { strokeDashoffset: 0, ease: "power2.inOut" }, 0.55);
    tl.to(sigRef3.current, { strokeDashoffset: 0, ease: "power2.inOut" }, 0.75);

    // BLOCK WIPES
    const setupBlockWipes = (refs) => {
      refs.forEach(el => {
        if (!el) return;
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.display = 'inline-block';
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
        
        const block = document.createElement('div');
        block.style.position = 'absolute';
        block.style.inset = '0';
        block.style.backgroundColor = '#D2FF00';
        block.style.transformOrigin = 'left';
        block.style.zIndex = '10';
        wrapper.appendChild(block);

        gsap.set(el, { opacity: 0 });
        gsap.set(block, { scaleX: 0 });

        const tlWipe = gsap.timeline({
          scrollTrigger: { trigger: wrapper, start: "top 85%" }
        });
        tlWipe.to(block, { scaleX: 1, duration: 0.4, ease: "power3.inOut" })
              .set(el, { opacity: 1 })
              .to(block, { scaleX: 0, transformOrigin: 'right', duration: 0.4, ease: "power3.inOut" });
      });
    };
    setupBlockWipes([...manifestoLinesRef.current, ...blockWipesRef.current]);

    // BACKGROUND INTERPOLATION for Gallery
    if (bgTransitionRef.current) {
      gsap.to(bgTransitionRef.current, {
        backgroundColor: "#F4F4ED",
        color: "#111112",
        scrollTrigger: {
          trigger: scatterGalleryRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      });
    }

    // PARALLAX GALLERY
    if (scatterGalleryRef.current) {
      const cols = scatterGalleryRef.current.querySelectorAll('.parallax-col');
      cols.forEach((col, i) => {
        const speed = i === 0 ? -30 : i === 1 ? 20 : -50;
        gsap.to(col, {
          yPercent: speed,
          ease: "none",
          scrollTrigger: { trigger: scatterGalleryRef.current, start: "top bottom", end: "bottom top", scrub: true }
        });
      });
    }

    // FAN DECK
    if (fanDeckRef.current) {
      const cards = fanDeckRef.current.querySelectorAll('.fan-card');
      gsap.fromTo(cards, 
        { rotate: 0, y: 0, x: 0 }, 
        { 
          rotate: (i) => (i - 2) * 7.5,
          y: (i) => Math.abs(i - 2) * 15,
          x: (i) => (i - 2) * 45,
          ease: "power2.out",
          scrollTrigger: { trigger: fanDeckRef.current, start: "top 80%", end: "top 30%", scrub: 1 }
        }
      );
    }

    ScrollTrigger.refresh();
  }, [preloaderState]);

  return (
    <div ref={mainWrapperRef} className="selection:bg-[#D2FF00] selection:text-[#111112]">
      
      {/* =========================================================================
          PRELOADER
      ========================================================================= */}
      <div className={\`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#D2FF00] transition-transform duration-[1200ms] ease-[cubic-bezier(0.87,0,0.13,1)] \${preloaderState === 2 ? '-translate-y-full' : 'translate-y-0'}\`} style={{ clipPath: preloaderState === 2 ? 'ellipse(150% 100% at 50% 0%)' : 'none' }}>
        <div className="relative flex items-center justify-center h-40 w-40">
          {preloaderState === 0 ? (
            <svg className="w-24 h-24" viewBox="0 0 100 100">
              <path className="preloader-path" d="M20,75 L20,25 L45,25 L45,55 L80,25 L80,75" fill="none" stroke="#111112" strokeWidth="8" strokeLinecap="square" />
            </svg>
          ) : (
            <h1 className="text-[6rem] md:text-[8rem] font-black tracking-tighter text-[#111112] leading-none animate-pulse">
              {SITE_CONFIG.identity.numberCode}
            </h1>
          )}
        </div>
      </div>

      {/* =========================================================================
          NAVBAR & WIDGETS
      ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-6 flex justify-between items-start mix-blend-difference text-[#F4F4ED] pointer-events-none">
        <div className="flex flex-col gap-1 pointer-events-auto">
          <span className="font-black text-2xl md:text-3xl tracking-tighter leading-none hover:text-[#D2FF00] transition-colors cursor-pointer">{SITE_CONFIG.identity.shortCode} // {SITE_CONFIG.identity.numberCode}</span>
          <span className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-80">{SITE_CONFIG.identity.rolePrimary}</span>
        </div>
        <div className="pointer-events-auto">
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2 group hover:text-[#D2FF00] transition-colors">
            <span className="text-xs font-bold tracking-widest uppercase">MENU</span>
            <div className="flex flex-col gap-[3px] w-5">
              <span className={\`w-full h-[2px] bg-current transition-all \${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}\`}></span>
              <span className={\`w-full h-[2px] bg-current transition-all \${menuOpen ? 'opacity-0' : ''}\`}></span>
              <span className={\`w-full h-[2px] bg-current transition-all \${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}\`}></span>
            </div>
          </button>
        </div>
      </header>

      <div ref={nextSprintRef} className="fixed bottom-5 left-5 z-30 hidden lg:flex flex-col gap-2 w-44 pointer-events-auto mix-blend-difference text-[#F4F4ED]">
        <div className="border border-white/20 rounded-xl p-3 text-center shadow-sm">
          <div className="text-[9px] font-bold tracking-widest uppercase opacity-60 mb-1">NEXT SPRINT</div>
          <div className="font-serif italic text-lg leading-tight">Automation <br/>Systems</div>
        </div>
      </div>

      {/* =========================================================================
          ZONE: PINNED HERO & SIGNATURE REVEAL
      ========================================================================= */}
      <div ref={pinRef} className="relative w-screen h-screen bg-[#1E2118] overflow-hidden flex items-center justify-center z-20">
        
        {/* Background Typography */}
        <div className="absolute inset-x-0 flex flex-col gap-2 pointer-events-none select-none opacity-85 z-0">
          <div ref={marquee1Ref} className="whitespace-nowrap text-5xl md:text-[6rem] lg:text-[7.5rem] font-serif italic text-[#8C9081] relative -left-1/4">
            AT HOME WE DID IT — AT HOME WE DID IT — AT HOME WE DID IT
          </div>
          <div ref={marquee2Ref} className="whitespace-nowrap text-5xl md:text-[6rem] lg:text-[7.5rem] font-black uppercase tracking-grotesque text-[#F4F4ED] relative left-1/4">
            PYTHON & AI PIPELINES I WILL REMEMBER FOREVER
          </div>
        </div>
        
        {/* Cream Hero Container */}
        <div ref={heroRef} className="relative z-10 w-screen h-screen bg-[#F4F4ED] flex flex-col justify-end items-center overflow-hidden origin-center shadow-2xl">
          <div className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-100"><TopographicLines dark={false} /></div>
          
          <div ref={canvasWrapperRef} className="absolute inset-0 z-20">
            <HeroBlobRevealPortrait />
          </div>

          <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[340px] sm:w-[560px] h-64 pointer-events-none drop-shadow-[0_0_15px_rgba(210,255,0,0.4)]" viewBox="0 0 600 260">
             <path ref={sigRef1} d="M60,210 C140,60 220,220 290,90" fill="none" stroke="#D2FF00" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
             <path ref={sigRef2} d="M290,90 C330,20 350,190 410,110 C460,45 490,150 550,60" fill="none" stroke="#D2FF00" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
             <path ref={sigRef3} d="M210,150 L490,120" fill="none" stroke="#D2FF00" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* =========================================================================
          WRAPPER FOR BACKGROUND COLOR SHIFT (ZONE 05 & 06)
      ========================================================================= */}
      <div ref={bgTransitionRef} className="bg-[#1E2118] text-[#F4F4ED] transition-colors duration-0">
        
        {/* MANIFESTO */}
        <section className="relative py-32 px-6 text-center">
          <TopographicLines dark={true} />
          <div className="relative max-w-5xl mx-auto flex flex-col items-center z-10">
            <div className="flex flex-col items-center mb-10 opacity-70">
               <svg className="w-12 h-12 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12a8 8 0 0 1 16 0" /><path d="M12 4v16" /></svg>
               <span className="text-[10px] font-bold tracking-[0.2em] uppercase">BHABHA UNIVERSITY // HARVARDX CS109X // GSP BHOPAL</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-[5rem] font-black uppercase tracking-grotesque leading-[1.1] max-w-4xl flex flex-col gap-2 items-center">
              <span ref={el => manifestoLinesRef.current[0] = el} className="self-center">REDEFINING <span className="text-[#D2FF00] font-serif italic font-normal tracking-normal">LIMITS</span>, FIGHTING FOR <span className="text-[#D2FF00] font-serif italic font-normal tracking-normal">WINS</span>,</span>
              <span ref={el => manifestoLinesRef.current[1] = el} className="self-center">BRINGING IT ALL IN PYTHON & AI.</span>
              <span ref={el => manifestoLinesRef.current[2] = el} className="self-center">DEFINING A <span className="text-[#D2FF00] font-serif italic font-normal tracking-normal">LEGACY</span> IN DATA SCIENCE</span>
              <span ref={el => manifestoLinesRef.current[3] = el} className="self-center">ON AND OFF THE TRACK.</span>
            </h2>
          </div>
        </section>

        {/* PARALLAX SCATTER GALLERY */}
        <section className="relative py-24 px-6 overflow-hidden min-h-[120vh]">
          <div ref={scatterGalleryRef} className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-start gap-8 md:gap-16 relative">
             
             {/* Column 1 (Scrolls up fast) */}
             <div className="w-full md:w-4/12 flex flex-col gap-24 mt-20 parallax-col">
               <div className="group">
                 <div className="text-[10px] font-bold tracking-widest uppercase opacity-70 mb-2">JABALPUR, PRESENT</div>
                 <img src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&q=80" className="w-full h-[400px] object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700" />
               </div>
               <div className="group">
                 <div className="text-[10px] font-bold tracking-widest uppercase opacity-70 mb-2">GSP AWARD, 2024</div>
                 <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80" className="w-3/4 h-[300px] object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700" />
               </div>
             </div>

             {/* Column 2 (Scrolls down slowly) */}
             <div className="w-full md:w-5/12 flex flex-col gap-24 -mt-10 parallax-col">
               <div className="group">
                 <p className="text-3xl font-serif italic mb-6">"It doesn't matter how messy the raw dataset is, it's how you engineer the validation pipeline from there."</p>
                 <svg className="w-20 h-10 mb-10 opacity-80" viewBox="0 0 100 50"><path d="M10,40 C30,10 50,40 90,20" fill="none" stroke="#D2FF00" strokeWidth="4" /></svg>
                 <img src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80" className="w-full h-[550px] object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl" />
                 <div className="absolute top-4 right-4 bg-[#D2FF00] text-[#111112] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">1st TOPPER</div>
               </div>
               <div className="group">
                 <div className="text-[10px] font-bold tracking-widest uppercase opacity-70 mb-2">AICTE ML SYSTEM, 2025</div>
                 <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" className="w-full h-[350px] object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700" />
               </div>
             </div>

             {/* Column 3 (Scrolls up medium) */}
             <div className="w-full md:w-3/12 flex flex-col gap-32 mt-32 parallax-col">
               <div className="group">
                 <div className="text-[10px] font-bold tracking-widest uppercase opacity-70 mb-2">CNC 5-AXIS, 2024</div>
                 <img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80" className="w-full h-[280px] object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700" />
               </div>
               <div className="group">
                 <p className="text-2xl font-serif italic mb-6">"Precision engineering translates directly to flawless code logic."</p>
                 <svg className="w-20 h-10 opacity-80" viewBox="0 0 100 50"><path d="M10,40 C30,10 50,40 90,20" fill="none" stroke="#D2FF00" strokeWidth="4" /></svg>
               </div>
             </div>
          </div>
        </section>
      </div>

      {/* =========================================================================
          ON TRACK / OFF TRACK
      ========================================================================= */}
      <section className="relative flex flex-col border-y-[16px] border-[#111112] bg-[#F4F4ED]">
        <TopographicLines dark={false} />
        <div className="flex flex-col md:flex-row w-full h-[60vh] md:h-[80vh] relative z-10 overflow-hidden">
          {/* Flush edge images */}
          <img src={SITE_CONFIG.images.heroCyber} className="absolute left-0 bottom-0 h-[85%] object-cover object-bottom hidden md:block z-0 mix-blend-multiply opacity-20" />
          <img src={SITE_CONFIG.images.heroBase} className="absolute right-0 bottom-0 h-[85%] object-cover object-bottom hidden md:block z-0 mix-blend-multiply opacity-20" />
          
          <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center relative group cursor-pointer border-b md:border-b-0 md:border-r border-[#111112]/10 z-20 hover:bg-[#D2FF00]/10 transition-colors">
            <h2 className="text-6xl md:text-[8rem] lg:text-[10rem] font-black relative tracking-grotesque uppercase leading-[0.8] text-center text-[#111112]">
              ON<br/>TRACK
              <svg className="absolute -inset-10 w-[140%] h-[140%] pointer-events-none drop-shadow-[0_0_10px_rgba(210,255,0,0.5)] z-20 opacity-90" viewBox="0 0 200 200">
                <path d="M40,100 Q80,20 120,90 T160,80 M50,120 Q100,180 150,110" fill="none" stroke="#D2FF00" strokeWidth="8" strokeLinecap="round" />
              </svg>
            </h2>
            <p className="mt-8 text-sm font-bold uppercase tracking-widest opacity-60 text-center max-w-xs">Data pipelines, ML architecture, and high-performance algorithms.</p>
            <div className="mt-8 bg-[#111112] text-[#D2FF00] rounded-sm p-4 hover:scale-110 transition-transform"><ArrowUpRight className="w-6 h-6" /></div>
          </div>

          <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center relative group cursor-pointer z-20 hover:bg-[#D2FF00]/10 transition-colors">
            <h2 className="text-6xl md:text-[8rem] lg:text-[10rem] font-black relative tracking-grotesque uppercase leading-[0.8] text-center text-[#111112]">
              OFF<br/>TRACK
            </h2>
            <p className="mt-8 text-sm font-bold uppercase tracking-widest opacity-60 text-center max-w-xs">AI & Robotics teaching, CNC machining, and drone builds.</p>
            <div className="mt-8 bg-[#D2FF00] text-[#111112] rounded-sm p-4 hover:scale-110 transition-transform"><ArrowUpRight className="w-6 h-6" /></div>
          </div>
        </div>
        
        <div className="flex w-full h-[25vh] md:h-[35vh]">
          <img src={SITE_CONFIG.images.bannerLeft} className="w-1/2 h-full object-cover grayscale" />
          <img src={SITE_CONFIG.images.bannerRight} className="w-1/2 h-full object-cover grayscale" />
        </div>
      </section>

      {/* =========================================================================
          HALL OF FAME
      ========================================================================= */}
      <section className="bg-[#111112] py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <h2 ref={el => blockWipesRef.current[0] = el} className="text-5xl md:text-[5rem] font-black uppercase tracking-grotesque text-[#F4F4ED] leading-[0.9]">
            HALL OF<br/>FAME
          </h2>
          <p ref={el => blockWipesRef.current[1] = el} className="max-w-xs text-sm font-bold tracking-widest uppercase text-[#F4F4ED]/60 text-right">
            Explore the flagship enterprise automation and AI systems built for production.
          </p>
        </div>
        
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-x-6 md:gap-y-16">
          {SITE_CONFIG.flagshipProjects.map((item, idx) => (
             <div key={idx} className={\`group relative w-full aspect-square cursor-pointer \${idx % 2 === 1 ? 'lg:translate-y-14' : ''}\`}>
               <div className="w-full h-full bg-[#161718] border border-white/5 group-hover:border-[#D2FF00] transition-colors duration-500 overflow-hidden relative rounded-xl">
                 <img src={item.defaultImg} className="absolute inset-0 w-full h-full object-contain p-12 transition-all duration-700 group-hover:scale-110 group-hover:opacity-0 drop-shadow-2xl" />
                 <img src={item.actionImg} className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105" />
               </div>
               <div className="absolute -bottom-8 right-0 text-right w-full flex justify-end items-center">
                 <span className="text-white font-black text-sm uppercase tracking-tighter mr-2 truncate">{item.name}</span>
                 <span className="text-[#D2FF00] font-black text-sm shrink-0">{item.year}</span>
               </div>
             </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          CHAMPION SHOWCASE & PARTNERS
      ========================================================================= */}
      <section className="bg-[#F4F4ED] py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8 relative z-10">
            <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase opacity-70">
              <span className="w-2 h-2 rounded-full bg-[#111112]"></span> AWARDS
            </div>
            <h2 className="text-6xl md:text-[6rem] font-black uppercase tracking-grotesque leading-[0.85] text-[#111112]">
              TOPPER &<br/>AWARD <span className="font-serif italic text-[#111112] tracking-normal">CHAMPION</span>
            </h2>
            <p className="max-w-md text-sm font-bold tracking-widest uppercase opacity-70 leading-relaxed">
              Awarded "Most Outstanding Student of the Year" at Global Skills Park and 90.3% NCVT-MP Topper.
            </p>
            <div className="flex gap-6 mt-12 pt-8">
               <img src={SITE_CONFIG.images.showcaseFloat1} className="w-40 h-48 object-cover rounded-md shadow-2xl -rotate-6" />
               <img src={SITE_CONFIG.images.showcaseFloat2} className="w-40 h-48 object-cover rounded-md shadow-2xl rotate-3" />
            </div>
          </div>
          
          <div className="flex-1 relative w-full aspect-[3/4] md:aspect-square overflow-hidden bg-[#111112]">
             <img src={SITE_CONFIG.images.showcaseMain} className="w-full h-full object-cover grayscale" />
             <div className="absolute bottom-12 right-12 text-[#D2FF00] font-black text-6xl md:text-8xl italic drop-shadow-[0_10px_0px_#111112]">ATW01</div>
             <div className="absolute top-12 right-12 bg-gradient-to-tr from-yellow-600 via-yellow-300 to-yellow-100 text-[#111112] p-8 rounded-sm shadow-2xl rotate-3 border-2 border-yellow-200">
               <div className="font-serif italic text-3xl">Champion Collection</div>
             </div>
          </div>
        </div>

        <div className="mt-32 relative">
          <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-40 mix-blend-difference overflow-visible h-64 -translate-y-20">
            <svg viewBox="0 0 1000 200" className="w-[120%] text-[#D2FF00] -rotate-3 fill-current drop-shadow-lg">
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="font-serif italic font-black" fontSize="180">Collabs</text>
            </svg>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
            <h2 ref={el => blockWipesRef.current[2] = el} className="text-5xl md:text-7xl font-black uppercase tracking-grotesque text-[#111112]">
              PARTNERS &<br/>CAMPAIGNS
            </h2>
            <p ref={el => blockWipesRef.current[3] = el} className="max-w-sm text-sm font-bold tracking-widest uppercase opacity-80 text-right">
              Abdul is proud to collaborate with a range of institutions.
            </p>
          </div>
          
          <div className="py-12 overflow-hidden relative z-10 transform -rotate-1 bg-[#111112] shadow-2xl">
            <div className="marquee-track font-black text-4xl md:text-5xl text-[#F4F4ED] uppercase tracking-widest gap-16 px-8 items-center flex">
              {SITE_CONFIG.partners.map((partner, i) => (
                 <React.Fragment key={i}>
                   <span className="hover:text-[#D2FF00] transition-colors cursor-pointer">{partner}</span>
                   {i !== SITE_CONFIG.partners.length - 1 && <span className="text-[#D2FF00] opacity-50">/</span>}
                 </React.Fragment>
              ))}
              {SITE_CONFIG.partners.map((partner, i) => (
                 <React.Fragment key={i + 'dup'}>
                   <span className="hover:text-[#D2FF00] transition-colors cursor-pointer">{partner}</span>
                   {i !== SITE_CONFIG.partners.length - 1 && <span className="text-[#D2FF00] opacity-50">/</span>}
                 </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SOCIALS & FAN DECK
      ========================================================================= */}
      <section className="bg-[#1C1F16] pt-32 pb-48 flex flex-col items-center justify-center overflow-hidden min-h-screen relative">
        <h2 className="text-[#F4F4ED] text-4xl md:text-5xl font-black uppercase tracking-grotesque mb-32 z-10">WHAT'S UP ON SOCIALS</h2>
        
        <div ref={fanDeckRef} className="relative w-full max-w-4xl h-[28rem] flex justify-center items-end group z-20">
          {[
            "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80"
          ].map((url, i) => (
             <div key={i} className="fan-card absolute w-48 md:w-60 h-72 md:h-80 rounded-3xl border-4 border-[#1C1F16] overflow-hidden shadow-2xl bg-[#111112] hover:-translate-y-12 transition-transform duration-300 cursor-pointer">
               <img src={url} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
             </div>
          ))}
        </div>
        
        <ul className="flex flex-wrap gap-8 md:gap-16 text-[#F4F4ED] font-black uppercase tracking-widest mt-24 z-10 relative text-sm md:text-base">
          <li><a href={SITE_CONFIG.identity.github} target="_blank" className="hover:text-[#D2FF00] transition-colors">GITHUB</a></li>
          <li><a href={SITE_CONFIG.identity.linkedin} target="_blank" className="hover:text-[#D2FF00] transition-colors">LINKEDIN</a></li>
          <li><a href={\`mailto:\${SITE_CONFIG.identity.email}\`} className="hover:text-[#D2FF00] transition-colors">EMAIL</a></li>
        </ul>
        
        <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-[#D2FF00]/15 to-transparent pointer-events-none"></div>
      </section>

      {/* =========================================================================
          FOOTER (Raised tab, center portrait, solid neon bar)
      ========================================================================= */}
      <footer className="bg-[#1C1F16] relative">
        <div className="absolute top-[-45px] left-0 w-full overflow-hidden leading-none z-0">
          <svg viewBox="0 0 1440 45" className="w-full h-auto block" preserveAspectRatio="none">
            <path d="M0,45 L540,45 L575,5 L865,5 L900,45 L1440,45" fill="#181A14" />
          </svg>
        </div>
        
        <div className="bg-[#181A14] relative z-20 w-full pt-10">
          <div className="text-center mb-16 px-6 relative">
            <svg className="absolute left-1/2 -translate-x-1/2 -top-12 w-64 h-32 pointer-events-none z-0" viewBox="0 0 400 200">
              <path d="M100,100 C150,50 200,150 250,80 S300,120 350,90" fill="none" stroke="#D2FF00" strokeWidth="8" strokeLinecap="round" />
            </svg>
            <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-black tracking-grotesque uppercase leading-[0.85] relative z-10 text-white">
              ALWAYS <span className="font-serif italic tracking-normal text-[#D2FF00]">BRINGING</span><br/>THE <span className="font-serif italic tracking-normal text-[#D2FF00]">FIGHT</span>.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-y border-white/10 py-16 px-6 max-w-7xl mx-auto items-center">
            <div className="flex flex-col gap-6 text-xs md:text-sm font-bold uppercase tracking-widest text-[#F4F4ED]/60">
              <div className="text-[#F4F4ED] opacity-100">PAGES</div>
              <a href="#" className="hover:text-[#D2FF00] transition-colors">HOME</a>
              <a href="#" className="hover:text-[#D2FF00] transition-colors">ABOUT</a>
              <a href="#" className="hover:text-[#D2FF00] transition-colors">PROJECTS</a>
              <a href="#" className="bg-white/10 text-white px-4 py-2 rounded-full w-max hover:bg-[#D2FF00] hover:text-[#111112] transition-colors">RESUME</a>
            </div>
            
            <div className="flex flex-col items-center justify-center gap-8">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#D2FF00] shadow-[0_0_30px_rgba(210,255,0,0.2)] bg-[#F4F4ED]">
                <img src={SITE_CONFIG.images.heroBase} className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-700" />
              </div>
              <a href={\`mailto:\${SITE_CONFIG.identity.email}\`} className="bg-[#D2FF00] text-[#111112] px-8 py-4 font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2">
                BUSINESS ENQUIRIES <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
            
            <div className="flex flex-col md:items-end gap-6 text-xs md:text-sm font-bold uppercase tracking-widest text-[#F4F4ED]/60">
              <div className="text-[#F4F4ED] opacity-100">FOLLOW ON</div>
              <a href={SITE_CONFIG.identity.github} className="hover:text-[#D2FF00] transition-colors">GITHUB</a>
              <a href={SITE_CONFIG.identity.linkedin} className="hover:text-[#D2FF00] transition-colors">LINKEDIN</a>
              <a href={\`mailto:\${SITE_CONFIG.identity.email}\`} className="hover:text-[#D2FF00] transition-colors">EMAIL</a>
            </div>
          </div>
          
          <div className="py-8 overflow-hidden relative border-b border-white/5 bg-[#111112]">
             <div className="marquee-track-reverse font-black text-2xl uppercase tracking-widest gap-16 items-center flex text-[#D2FF00]">
               <span>{SITE_CONFIG.identity.firstName} {SITE_CONFIG.identity.lastName} {SITE_CONFIG.identity.numberCode}</span>
               <span>{SITE_CONFIG.identity.firstName} {SITE_CONFIG.identity.lastName} {SITE_CONFIG.identity.numberCode}</span>
               <span>{SITE_CONFIG.identity.firstName} {SITE_CONFIG.identity.lastName} {SITE_CONFIG.identity.numberCode}</span>
               <span>{SITE_CONFIG.identity.firstName} {SITE_CONFIG.identity.lastName} {SITE_CONFIG.identity.numberCode}</span>
             </div>
          </div>
          
          <div className="w-full bg-[#D2FF00] text-[#111112] py-5 px-6 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-widest gap-4">
            <span>© 2026 {SITE_CONFIG.identity.firstName} {SITE_CONFIG.identity.lastName}. ALL RIGHTS RESERVED.</span>
            <span>DESIGN INSPIRED BY L.N. 04</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
`;
fs.writeFileSync('src/App.jsx', appContent);
console.log("Successfully rewrote src/App.jsx with exact 1:1 Landonorris styling");
