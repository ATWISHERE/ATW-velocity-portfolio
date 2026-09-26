import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { ShoppingBag, Menu, X, ArrowUpRight, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// PART 2: SITE CONFIGURATION — ABDUL TARIQUE WARSI (ATW // 01)
// Swap any Unsplash URL below with your actual assets!
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
    heroBase: "https://images.unsplash.com/photo-1544894468-1ebccb3eb720?auto=format&fit=crop&q=80", // Bust cutout against clean bg
    heroCyber: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80", // Visor/Helmet mask reveal
    signaturePortrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
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
// TOPOGRAPHIC SVG BACKGROUND (ZONE 03, 04, 05, 07)
// ============================================================================
function TopographicLines({ dark = false }) {
  const stroke = dark ? "rgba(210,255,0,0.08)" : "rgba(17,17,18,0.07)";
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none select-none" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
      <g fill="none" stroke={stroke} strokeWidth="1.3">
        <path d="M-100,120 C280,20 520,420 920,140 C1180,-30 1380,280 1600,90" />
        <path d="M-100,300 C240,180 600,560 1020,260 C1280,100 1420,420 1600,240" />
        <path d="M-100,480 C200,340 680,720 1080,420 C1340,260 1480,580 1600,380" />
        <path d="M-100,680 C160,520 740,880 1140,580 C1380,400 1520,720 1600,540" />
      </g>
    </svg>
  );
}

// ============================================================================
// HTML5 CANVAS METABALL MASK (ZONE 03)
// ============================================================================
function HeroBlobRevealPortrait() {
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const mouseRef = useRef({ x: 300, y: 350, targetX: 300, targetY: 350, vx: 0, vy: 0 });
  const imagesRef = useRef({ base: null, reveal: null });

  useEffect(() => {
    const baseImg = new Image();
    const revealImg = new Image();
    baseImg.crossOrigin = "anonymous";
    revealImg.crossOrigin = "anonymous";
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

      // 1. Draw Base Bust Portrait (unmasked)
      if (imagesRef.current.base?.complete) {
        ctx.drawImage(imagesRef.current.base, 0, 0, width, height);
      }

      // 2. Physics Lerping for organic drag
      const now = performance.now();
      const m = mouseRef.current;
      m.vx += (m.targetX - m.x) * 0.15;
      m.vy += (m.targetY - m.y) * 0.15;
      m.vx *= 0.7; // friction
      m.vy *= 0.7;
      m.x += m.vx;
      m.y += m.vy;
      
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
          const radius = (1 - age * 0.8) * 140; // Starts huge, shrinks out
          ctx.moveTo(pt.x + radius, pt.y);
          ctx.arc(pt.x, pt.y, Math.max(0, radius), 0, Math.PI * 2);
          // Multi-lobe organic shape
          ctx.arc(pt.x + Math.sin(i*0.5)*50, pt.y + Math.cos(i*0.5)*50, Math.max(0, radius * 0.7), 0, Math.PI * 2);
        });
        ctx.clip();
        
        // Draw the hidden cyber/helmet layer exactly inside the blob
        ctx.drawImage(imagesRef.current.reveal, 0, 0, width, height);
        
        // Crisp Neon Outline
        ctx.strokeStyle = "#D2FF00";
        ctx.lineWidth = 6;
        ctx.stroke();
        ctx.shadowColor = "#D2FF00";
        ctx.shadowBlur = 15;
        ctx.stroke();
        
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
    <div className="relative w-[340px] sm:w-[460px] md:w-[540px] h-[440px] sm:h-[580px] md:h-[660px] mx-auto select-none cursor-crosshair">
      {/* 2D Wireframe Halo Background */}
      <svg className="absolute -top-12 left-1/2 -translate-x-1/2 w-[320px] sm:w-[420px] opacity-25 pointer-events-none" viewBox="0 0 400 260">
        <ellipse cx="200" cy="130" rx="165" ry="110" fill="none" stroke="#111112" strokeWidth="1.5" strokeDasharray="6 4" />
        <path d="M55,140 Q200,40 345,140 M75,180 Q200,110 325,180" fill="none" stroke="#111112" strokeWidth="1.5" />
      </svg>
      {/* Interactive Liquid Blob Mask */}
      <canvas ref={canvasRef} onMouseMove={handleMouseMove} width={600} height={720} className="w-full h-full object-cover object-bottom" />
    </div>
  );
}

// ============================================================================
// MAIN APPLICATION ROOT
// ============================================================================
export default function App() {
  const [preloaderState, setPreloaderState] = useState(0); // 0 = Path Draw, 1 = Number, 2 = Lift up
  const [menuOpen, setMenuOpen] = useState(false);
  
  const mainWrapperRef = useRef(null);
  const sigPathRef = useRef(null);
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);
  const bgTransitionRef = useRef(null);
  const scatterGalleryRef = useRef(null);
  const fanDeckRef = useRef(null);
  const blockWipesRef = useRef([]);

  // ==========================================================================
  // TIMERS & GSAP SETUP
  // ==========================================================================
  useEffect(() => {
    // Preloader Sequence (Zone 01)
    const t1 = setTimeout(() => setPreloaderState(1), 1800); // Morph to 01
    const t2 = setTimeout(() => setPreloaderState(2), 2600); // Lift Curtain
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    // Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: 'vertical',
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Zone 04: Dark Parallax & Signature Drawing
      if (sigPathRef.current && marquee1Ref.current && marquee2Ref.current) {
        const length = sigPathRef.current.getTotalLength();
        gsap.set(sigPathRef.current, { strokeDasharray: length, strokeDashoffset: length });
        
        gsap.to(sigPathRef.current, {
          strokeDashoffset: 0, ease: "none",
          scrollTrigger: { trigger: "#zone-04", start: "top 70%", end: "bottom 60%", scrub: 1 }
        });
        // Opposite Direction Parallax Scrub
        gsap.to(marquee1Ref.current, {
          xPercent: -20, ease: "none",
          scrollTrigger: { trigger: "#zone-04", start: "top bottom", end: "bottom top", scrub: 1 }
        });
        gsap.to(marquee2Ref.current, {
          xPercent: 20, ease: "none",
          scrollTrigger: { trigger: "#zone-04", start: "top bottom", end: "bottom top", scrub: 1 }
        });
      }

      // Zone 06: Vertical Parallax Scatter Gallery Shift
      if (scatterGalleryRef.current) {
        const columns = scatterGalleryRef.current.children;
        gsap.to(columns[0], { yPercent: -15, ease: "none", scrollTrigger: { trigger: scatterGalleryRef.current, scrub: 1 } });
        gsap.to(columns[1], { yPercent: 20, ease: "none", scrollTrigger: { trigger: scatterGalleryRef.current, scrub: 1 } });
        gsap.to(columns[2], { yPercent: -5, ease: "none", scrollTrigger: { trigger: scatterGalleryRef.current, scrub: 1 } });
      }

      // Zone 06: Background Interpolation (#24261E -> #F4F4ED)
      if (bgTransitionRef.current) {
        gsap.to(bgTransitionRef.current, {
          backgroundColor: "#F4F4ED", color: "#111112", ease: "none",
          scrollTrigger: { trigger: scatterGalleryRef.current, start: "top center", end: "bottom center", scrub: 1 }
        });
      }

      // Zone 08 & 10: Neon Block-Wipes
      blockWipesRef.current.forEach(el => {
        if (el) {
          ScrollTrigger.create({
            trigger: el, start: "top 85%",
            onEnter: () => el.classList.add('wiped')
          });
        }
      });

      // Zone 11: 5-Card Arched Fan Deck
      if (fanDeckRef.current) {
        const cards = fanDeckRef.current.querySelectorAll('.fan-card');
        gsap.fromTo(cards, 
          { rotate: 0, y: 0, x: 0 }, 
          { 
            rotate: (i) => (i - 2) * 7.5,
            y: (i) => Math.abs(i - 2) * 15,
            x: (i) => (i - 2) * 45,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: fanDeckRef.current, start: "top 80%", end: "center center", scrub: 1
            }
          }
        );
      }
    }, mainWrapperRef);

    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div ref={mainWrapperRef} className="selection:bg-[#D2FF00] selection:text-[#111112]">
      
      {/* =========================================================================
          ZONE 01: TWO-STAGE NEON PRELOADER (00:01 - 00:11)
      ========================================================================= */}
      <div className={`fixed inset-0 z-50 bg-[#D2FF00] flex flex-col items-center justify-center transition-all duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${preloaderState === 2 ? "-translate-y-full rounded-b-[100%] pointer-events-none" : "translate-y-0 rounded-b-none"}`}>
        <div className="relative flex items-center justify-center h-40 w-40">
           {preloaderState === 0 ? (
             <svg className="w-24 h-24" viewBox="0 0 100 100">
               <path className="preloader-path" d="M20,75 L20,25 L45,25 L45,55 L80,25 L80,75" fill="none" stroke="#111112" strokeWidth="8" strokeLinecap="square" />
             </svg>
           ) : (
             <h1 className="text-[8rem] font-black tracking-tighter text-[#111112] leading-none animate-pulse">
               {SITE_CONFIG.identity.numberCode}
             </h1>
           )}
        </div>
        <div className="absolute bottom-12 text-[10px] font-black tracking-[0.2em] uppercase text-[#111112]">
          {SITE_CONFIG.identity.firstName} {SITE_CONFIG.identity.lastName}
        </div>
      </div>

      {/* =========================================================================
          ZONE 02: FIXED HUD & BOTTOM-LEFT WIREFRAME WIDGET (00:00 - 01:44)
      ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-5 flex items-start justify-between pointer-events-none mix-blend-difference text-white">
        <div className="pointer-events-auto font-black text-xl md:text-2xl leading-[0.88] tracking-grotesque uppercase">
          {SITE_CONFIG.identity.firstName}<br />{SITE_CONFIG.identity.lastName}
        </div>
        <div className="hidden md:flex items-center justify-center font-black text-xl tracking-grotesque">
          [{SITE_CONFIG.identity.shortCode}]
        </div>
        <div className="pointer-events-auto flex items-center gap-2.5 mix-blend-normal">
          <button className="flex items-center gap-2 bg-[#D2FF00] text-[#111112] px-4 py-2.5 rounded-xl font-black text-xs tracking-wider uppercase shadow-md hover:scale-105 transition">
            <ShoppingBag className="w-3.5 h-3.5" /><span>RESUME</span>
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="w-10 h-10 rounded-xl bg-[#F4F4ED] text-[#111112] flex items-center justify-center hover:bg-[#D2FF00] transition">
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>
      
      <div className="fixed bottom-5 left-5 z-30 hidden lg:flex flex-col gap-2 w-44 pointer-events-auto mix-blend-difference text-white">
        <div className="border border-white/20 rounded-xl p-3 text-center shadow-sm">
          <div className="text-[9px] font-bold tracking-widest uppercase opacity-60 mb-1">NEXT SPRINT</div>
          <svg className="w-24 h-12 mx-auto my-1" viewBox="0 0 120 60">
            <path d="M15,40 C10,20 40,15 65,25 C90,35 110,15 105,35 C100,50 45,45 15,40 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
          <div className="text-[10px] font-black uppercase tracking-wider">JABALPUR AI LAB</div>
        </div>
        <div className="border border-white/20 rounded-xl p-3 text-center hover:bg-[#D2FF00] hover:text-[#111112] hover:border-transparent transition mix-blend-normal cursor-pointer">
          <div className="text-[9px] font-black uppercase tracking-wider leading-tight">{SITE_CONFIG.identity.shortCode} PIPELINE</div>
          <div className="text-[8px] opacity-70 uppercase mt-0.5">SINCE 2020</div>
        </div>
      </div>

      {/* =========================================================================
          ZONE 03: HERO PORTRAIT & LIQUID-BLOB CURSOR MASK (00:12 - 00:31)
      ========================================================================= */}
      <section className="relative min-h-screen pt-32 pb-0 flex flex-col justify-end items-center overflow-hidden bg-[#F4F4ED] text-[#111112]">
        <TopographicLines dark={false} />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
          <HeroBlobRevealPortrait />
        </div>
      </section>

      {/* =========================================================================
          ZONE 04: DARK PARALLAX & SELF-DRAWING NEON SIGNATURE (00:31 - 00:35)
      ========================================================================= */}
      <section id="zone-04" className="relative min-h-screen bg-[#24261E] text-[#F4F4ED] flex flex-col items-center justify-center py-32 overflow-hidden">
        <TopographicLines dark={true} />
        <div className="relative w-full flex items-center justify-center my-6 h-[60vh]">
          {/* Parallax Background Typography */}
          <div className="absolute inset-x-0 flex flex-col gap-2 pointer-events-none select-none opacity-85 overflow-hidden">
            <div ref={marquee1Ref} className="whitespace-nowrap text-5xl md:text-[6rem] lg:text-[7.5rem] font-black uppercase tracking-grotesque text-[#F4F4ED]/90 relative -left-1/4">
              WE ENGINEER PRECISION PIPELINES — WE ENGINEER PRECISION PIPELINES
            </div>
            <div ref={marquee2Ref} className="whitespace-nowrap text-5xl md:text-[6rem] lg:text-[7.5rem] font-black uppercase tracking-grotesque relative left-1/4" style={{ WebkitTextStroke: "1.5px #F4F4ED", color: "transparent" }}>
              100% ALGORITHMIC VALIDATION — 100% ALGORITHMIC VALIDATION
            </div>
          </div>
          
          {/* Centered Grayscale Portrait + Signature Overlay */}
          <div className="relative z-10 w-72 sm:w-[22rem] h-[26rem] rounded-xl overflow-hidden shadow-2xl border border-white/10">
            <img src={SITE_CONFIG.images.signaturePortrait} alt="Portrait" className="w-full h-full object-cover grayscale contrast-125" />
          </div>
          
          {/* Self-Drawing Neon Signature */}
          <svg className="absolute z-20 w-[340px] sm:w-[560px] h-64 pointer-events-none drop-shadow-[0_0_15px_rgba(210,255,0,0.4)]" viewBox="0 0 600 260">
            <path ref={sigPathRef} d="M60,210 C140,60 220,220 290,90 C330,20 350,190 410,110 C460,45 490,150 550,60 M210,150 L490,120" fill="none" stroke="#D2FF00" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          
          {/* Badge overlays */}
          <div className="absolute top-10 text-[10px] font-bold tracking-[0.25em] uppercase text-[#D2FF00] z-20 bg-[#24261E]/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#D2FF00]/30">
            [{SITE_CONFIG.identity.shortCode}] AUTOMATION & DATA SCIENCE SINCE 2020
          </div>
          <div className="absolute bottom-10 w-16 h-1.5 bg-[#D2FF00] z-20 rounded-full shadow-[0_0_10px_rgba(210,255,0,0.6)]"></div>
        </div>
      </section>

      {/* =========================================================================
          WRAPPER FOR BACKGROUND COLOR SHIFT (ZONE 05 & 06)
      ========================================================================= */}
      <div ref={bgTransitionRef} className="bg-[#24261E] text-[#F4F4ED] transition-colors duration-0">
        
        {/* =========================================================================
            ZONE 05: MANIFESTO STATEMENT BLOCK (00:36 - 00:39)
        ========================================================================= */}
        <section className="relative py-32 px-6 text-center">
          <TopographicLines dark={true} />
          <div className="relative max-w-5xl mx-auto flex flex-col items-center z-10">
            <div className="flex flex-col items-center mb-10 opacity-70">
               <svg className="w-12 h-12 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12a8 8 0 0 1 16 0" /><path d="M12 4v16" /></svg>
               <span className="text-[10px] font-bold tracking-[0.2em] uppercase">BHABHA UNIVERSITY // HARVARDX CS109X // GSP BHOPAL</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-[5rem] font-black uppercase tracking-grotesque leading-[0.95] max-w-4xl">
              REDEFINING <span className="text-[#D2FF00] font-serif italic font-normal tracking-normal">LIMITS</span>, FIGHTING FOR <span className="text-[#D2FF00] font-serif italic font-normal tracking-normal">WINS</span>, BRINGING IT ALL IN PYTHON & AI. DEFINING A <span className="text-[#D2FF00] font-serif italic font-normal tracking-normal">LEGACY</span> IN DATA SCIENCE ON AND OFF THE TRACK.
            </h2>
          </div>
        </section>

        {/* =========================================================================
            ZONE 06: VERTICAL SCATTER GALLERY (00:40 - 00:48)
        ========================================================================= */}
        <section className="relative py-24 px-6 overflow-hidden min-h-[120vh]">
          <div ref={scatterGalleryRef} className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-start gap-8 md:gap-16 relative">
             
             {/* Column 1 (Scrolls up fast) */}
             <div className="w-full md:w-4/12 flex flex-col gap-24 mt-20">
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
             <div className="w-full md:w-5/12 flex flex-col gap-24 -mt-10">
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
             <div className="w-full md:w-3/12 flex flex-col gap-32 mt-32">
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
          ZONE 07: EDGE-FLUSH ON TRACK / OFF TRACK SPLIT (00:49 - 00:52)
      ========================================================================= */}
      <section className="relative flex flex-col border-y-[16px] border-[#111112] bg-[#F4F4ED]">
        <TopographicLines dark={false} />
        
        <div className="flex flex-col md:flex-row w-full h-[60vh] md:h-[80vh] relative z-10">
          
          {/* Edge Flush Images */}
          <img src={SITE_CONFIG.images.splitLeft} className="absolute left-0 top-1/2 -translate-y-1/2 h-[75%] object-contain opacity-20 hidden md:block" />
          <img src={SITE_CONFIG.images.splitRight} className="absolute right-0 top-1/2 -translate-y-1/2 h-[75%] object-contain opacity-20 hidden md:block" />

          {/* Center Columns */}
          <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center relative group cursor-pointer border-b md:border-b-0 md:border-r border-[#111112]/10 z-20">
            <h2 className="text-6xl md:text-[8rem] lg:text-[10rem] font-black relative tracking-grotesque uppercase leading-[0.8] text-center text-[#111112]">
              ON<br/>TRACK
              <svg className="absolute -inset-10 w-[140%] h-[140%] pointer-events-none drop-shadow-[0_0_10px_rgba(210,255,0,0.5)] z-20 opacity-90" viewBox="0 0 200 200">
                <path d="M40,100 Q80,20 120,90 T160,80 M50,120 Q100,180 150,110" fill="none" stroke="#D2FF00" strokeWidth="8" strokeLinecap="round" />
              </svg>
            </h2>
            <p className="mt-8 text-sm font-bold uppercase tracking-widest opacity-60 text-center max-w-xs">Production Python pipelines, OCR bots, and ML telemetry.</p>
            <div className="mt-8 bg-[#D2FF00] rounded-sm p-4 hover:scale-110 transition-transform"><ArrowUpRight className="w-6 h-6 text-[#111112]" /></div>
          </div>

          <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center relative group cursor-pointer z-20">
            <h2 className="text-6xl md:text-[8rem] lg:text-[10rem] font-black relative tracking-grotesque uppercase leading-[0.8] text-center text-[#111112]">
              OFF<br/>TRACK
            </h2>
            <p className="mt-8 text-sm font-bold uppercase tracking-widest opacity-60 text-center max-w-xs">AI & Robotics teaching, CNC machining, and drone builds.</p>
            <div className="mt-8 bg-[#D2FF00] rounded-sm p-4 hover:scale-110 transition-transform"><ArrowUpRight className="w-6 h-6 text-[#111112]" /></div>
          </div>
        </div>

        {/* Full Bleed Banner Underneath */}
        <div className="flex flex-col md:flex-row w-full h-72 md:h-96">
          <img src={SITE_CONFIG.images.bannerLeft} className="w-full md:w-1/2 h-full object-cover grayscale" />
          <img src={SITE_CONFIG.images.bannerRight} className="w-full md:w-1/2 h-full object-cover grayscale" />
        </div>
      </section>

      {/* =========================================================================
          ZONE 08: PROJECTS HALL OF FAME GRID (00:53 - 01:13)
      ========================================================================= */}
      <section className="bg-[#111112] text-white py-32 px-6">
        <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <h2 ref={el => blockWipesRef.current[0] = el} className="block-wipe text-5xl md:text-[6rem] font-black uppercase tracking-grotesque leading-[0.9] max-w-2xl text-[#F4F4ED]">
            PROJECTS <span className="font-serif italic text-[#D2FF00]">HALL OF FAME</span>
          </h2>
          <p ref={el => blockWipesRef.current[1] = el} className="block-wipe text-white/60 text-sm font-bold tracking-widest uppercase max-w-sm text-right pb-2">
            Explore the flagship enterprise automation and AI systems built for production.
          </p>
        </div>
        
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {SITE_CONFIG.flagshipProjects.map((item, idx) => (
             <div key={idx} className={`group relative w-full aspect-square cursor-pointer ${idx % 2 === 1 ? 'lg:translate-y-14' : ''}`}>
               <div className="w-full h-full bg-[#161718] border border-white/5 group-hover:border-[#D2FF00] transition-colors duration-500 overflow-hidden relative rounded-xl">
                 {/* Default floating cutout */}
                 <img src={item.defaultImg} className="absolute inset-0 w-full h-full object-contain p-12 transition-all duration-700 group-hover:scale-110 group-hover:opacity-0 drop-shadow-2xl" />
                 {/* Full bleed action photo swap */}
                 <img src={item.actionImg} className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105" />
               </div>
               {/* Label outside box */}
               <div className="absolute -bottom-8 right-0 text-right">
                 <span className="text-white font-black text-sm uppercase tracking-tighter mr-2">{item.name}</span>
                 <span className="text-[#D2FF00] font-black text-sm">{item.year}</span>
               </div>
             </div>
          ))}
        </div>
        
        <div className="flex flex-col items-center mt-40">
          <div className="w-16 h-16 rounded-full border border-[#D2FF00] text-[#D2FF00] flex items-center justify-center mb-6">
             <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12a8 8 0 0 1 16 0" /><path d="M12 4v16" /></svg>
          </div>
          <p className="font-serif italic text-2xl mb-8 text-center max-w-md">"See more pipelines and highlights from Abdul on the track"</p>
          <a href={SITE_CONFIG.identity.github} target="_blank" className="bg-[#D2FF00] text-[#111112] px-8 py-4 font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(210,255,0,0.3)] hover:scale-105 transition-transform flex items-center gap-2">
            VIEW ON GITHUB <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* =========================================================================
          ZONE 09: CHAMPION / FLAGSHIP SHOWCASE (01:14 - 01:19)
      ========================================================================= */}
      <section className="bg-[#F4F4ED] py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Column */}
          <div className="flex-1 space-y-8 relative z-10">
            <div className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase opacity-70">
              <ShoppingBag className="w-4 h-4" /> ATW ENGINEERING LAB
            </div>
            <h2 className="text-6xl md:text-[6rem] font-black uppercase tracking-grotesque leading-[0.85] text-[#111112]">
              TOPPER &<br/>AWARD <span className="font-serif italic text-[#111112] tracking-normal">CHAMPION</span>
            </h2>
            <p className="max-w-md text-sm font-bold tracking-widest uppercase opacity-70 leading-relaxed">
              Awarded "Most Outstanding Student of the Year" at Global Skills Park and 90.3% NCVT-MP Topper. Building enterprise python automation.
            </p>
            <a href={SITE_CONFIG.identity.github} target="_blank" className="inline-flex bg-[#111112] text-[#D2FF00] px-8 py-4 font-black text-xs uppercase tracking-widest hover:bg-[#D2FF00] hover:text-[#111112] transition-colors items-center gap-2">
              EXPLORE GITHUB REPOS <ArrowUpRight className="w-4 h-4" />
            </a>
            <div className="flex gap-6 mt-12 pt-8">
               <img src={SITE_CONFIG.images.showcaseFloat1} className="w-40 h-48 object-cover rounded-md shadow-2xl -rotate-6" />
               <img src={SITE_CONFIG.images.showcaseFloat2} className="w-40 h-48 object-cover rounded-md shadow-2xl rotate-3" />
            </div>
          </div>
          
          {/* Right Column */}
          <div className="flex-1 relative w-full aspect-[3/4] md:aspect-square overflow-hidden bg-[#111112]">
             <img src={SITE_CONFIG.images.showcaseMain} className="w-full h-full object-cover grayscale" />
             {/* 3D Beveled Emblem */}
             <div className="absolute bottom-12 right-12 text-[#D2FF00] font-black text-6xl md:text-8xl italic drop-shadow-[0_10px_0px_#111112]">
               ATW1
             </div>
             {/* Gold Foil Plaque */}
             <div className="absolute top-12 right-12 bg-gradient-to-tr from-yellow-600 via-yellow-300 to-yellow-100 text-[#111112] p-8 rounded-sm shadow-2xl rotate-3 border-2 border-yellow-200">
               <div className="font-serif italic text-3xl">Champion Collection</div>
             </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ZONE 10: PARTNERS & CAMPAIGNS ("COLLABS" GRAFFITI) (01:20 - 01:25)
      ========================================================================= */}
      <section className="bg-[#F4F4ED] py-32 overflow-hidden border-t border-[#111112]/10 relative">
        {/* Giant Diagonal Collabs SVG */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 pointer-events-none opacity-90 z-0 flex justify-center w-full">
          <svg viewBox="0 0 800 300" className="w-[150vw] h-auto text-[#D2FF00] fill-current drop-shadow-md">
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="font-serif italic font-black" fontSize="200">Collabs</text>
          </svg>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <h2 ref={el => blockWipesRef.current[2] = el} className="block-wipe text-5xl md:text-7xl font-black uppercase tracking-grotesque text-[#111112]">
            PARTNERS &<br/>CAMPAIGNS
          </h2>
          <p ref={el => blockWipesRef.current[3] = el} className="block-wipe max-w-sm text-sm font-bold tracking-widest uppercase opacity-80 text-right">
            Abdul is proud to collaborate with a range of institutions, sharing his passion for automation and education.
          </p>
        </div>
        
        <div className="py-12 overflow-hidden relative z-10 transform -rotate-1 bg-[#111112] shadow-2xl">
          <div className="marquee-track font-black text-4xl md:text-5xl text-[#F4F4ED] uppercase tracking-widest gap-16 px-8 items-center flex">
            {SITE_CONFIG.partners.map((partner, i) => (
              <span key={i} className="whitespace-nowrap hover:text-[#D2FF00] transition-colors cursor-pointer">{partner}</span>
            ))}
            {SITE_CONFIG.partners.map((partner, i) => (
              <span key={`dup-${i}`} className="whitespace-nowrap hover:text-[#D2FF00] transition-colors cursor-pointer">{partner}</span>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          ZONE 11: 5-CARD ARCHED SOCIAL FAN DECK (01:26 - 01:35)
      ========================================================================= */}
      <section className="bg-[#1C1F16] pt-32 pb-48 flex flex-col items-center justify-center overflow-hidden min-h-screen relative">
        <div className="w-16 h-16 rounded-full border border-white/20 text-[#D2FF00] flex items-center justify-center mb-8 z-10">
           <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        </div>
        <h2 className="text-[#F4F4ED] text-4xl md:text-5xl font-black uppercase tracking-grotesque mb-32 z-10">WHAT'S UP ON SOCIALS</h2>
        
        {/* Fan Deck */}
        <div ref={fanDeckRef} className="relative w-full max-w-4xl h-[28rem] flex justify-center items-end group z-20">
          {[
            "https://images.unsplash.com/photo-1544894468-1ebccb3eb720?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80"
          ].map((url, i) => (
             <div key={i} className="fan-card absolute w-48 md:w-60 h-72 md:h-80 rounded-3xl border-4 border-[#1C1F16] overflow-hidden shadow-2xl bg-[#111112] hover:-translate-y-12 transition-transform duration-300 cursor-pointer">
               <img src={url} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
             </div>
          ))}
        </div>
        
        <p className="font-serif italic text-2xl text-white mt-24 z-10 relative">"Connect with Abdul on social media"</p>
        
        <ul className="flex flex-wrap gap-8 md:gap-16 text-[#F4F4ED] font-black uppercase tracking-widest mt-8 z-10 relative text-sm md:text-base">
          <li><a href={SITE_CONFIG.identity.github} target="_blank" className="hover:text-[#D2FF00] transition-colors">GITHUB</a></li>
          <li><a href={SITE_CONFIG.identity.linkedin} target="_blank" className="hover:text-[#D2FF00] transition-colors">LINKEDIN</a></li>
          <li><a href={`mailto:${SITE_CONFIG.identity.email}`} className="hover:text-[#D2FF00] transition-colors">EMAIL</a></li>
          <li><a href={`tel:${SITE_CONFIG.identity.phone}`} className="hover:text-[#D2FF00] transition-colors">PHONE</a></li>
        </ul>
        
        {/* Soft #D2FF00 Neon Horizon Glow */}
        <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-[#D2FF00]/15 to-transparent pointer-events-none"></div>
      </section>

      {/* =========================================================================
          ZONE 12: RAISED-TAB DARK CARBON FOOTER (01:36 - 01:44)
      ========================================================================= */}
      <footer className="relative bg-[#181A14] text-[#F4F4ED] pt-32 pb-0 mt-[-4rem] z-30 flex flex-col border-t-4 border-[#D2FF00]">
        {/* Exact Racing Notch Tab (Simulated with pure polygon in CSS) */}
        <div className="absolute top-[-3rem] left-0 w-full h-12 bg-transparent overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-24 bg-[#181A14] clip-footer-notch"></div>
        </div>
        
        <div className="relative z-20 w-full">
          {/* Top Signature & Headline */}
          <div className="text-center mb-16 px-6">
            <svg className="w-[300px] h-20 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(210,255,0,0.4)]" viewBox="0 0 600 200">
               <path d="M100,100 C150,50 200,150 250,80 S300,120 350,90" fill="none" stroke="#D2FF00" strokeWidth="8" strokeLinecap="round" />
            </svg>
            <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-black tracking-grotesque uppercase leading-[0.85]">
              ALWAYS <span className="font-serif italic tracking-normal text-[#D2FF00]">BRINGING</span><br/>THE <span className="font-serif italic tracking-normal text-[#D2FF00]">FIGHT</span>.
            </h2>
          </div>
          
          {/* 3-Column Stage */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-y border-white/10 py-16 px-6 max-w-7xl mx-auto items-center">
            
            {/* Left: PAGES */}
            <div className="flex flex-col gap-6 text-xs md:text-sm font-bold uppercase tracking-widest text-[#F4F4ED]/60">
              <div className="text-[#F4F4ED] opacity-100">PAGES</div>
              <a href="#" className="hover:text-[#D2FF00] transition-colors">HOME</a>
              <a href="#" className="hover:text-[#D2FF00] transition-colors">ON TRACK</a>
              <a href="#" className="hover:text-[#D2FF00] transition-colors">OFF TRACK</a>
              <a href="#" className="hover:text-[#D2FF00] transition-colors">PROJECTS</a>
              <a href="#" className="bg-white/10 text-white px-4 py-2 rounded-full w-max hover:bg-[#D2FF00] hover:text-[#111112] transition-colors">RESUME</a>
            </div>
            
            {/* Center: Hero Cutout & Neon Button */}
            <div className="flex flex-col items-center justify-center gap-8">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#D2FF00] shadow-[0_0_30px_rgba(210,255,0,0.2)] bg-[#F4F4ED]">
                <img src={SITE_CONFIG.images.heroBase} className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
              <a href={`mailto:${SITE_CONFIG.identity.email}`} className="bg-[#D2FF00] text-[#111112] px-8 py-4 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2">
                BUSINESS ENQUIRIES <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
            
            {/* Right: FOLLOW ON */}
            <div className="flex flex-col md:items-end gap-6 text-xs md:text-sm font-bold uppercase tracking-widest text-[#F4F4ED]/60">
              <div className="text-[#F4F4ED] opacity-100">FOLLOW ON</div>
              <a href={SITE_CONFIG.identity.github} target="_blank" className="hover:text-[#D2FF00] transition-colors">GITHUB</a>
              <a href={SITE_CONFIG.identity.linkedin} target="_blank" className="hover:text-[#D2FF00] transition-colors">LINKEDIN</a>
              <a href={`mailto:${SITE_CONFIG.identity.email}`} className="hover:text-[#D2FF00] transition-colors">EMAIL</a>
              <a href={`tel:${SITE_CONFIG.identity.phone}`} className="hover:text-[#D2FF00] transition-colors">PHONE</a>
            </div>
          </div>
          
          {/* Scrolling Ticker at base of cutout */}
          <div className="py-8 overflow-hidden relative border-b border-white/5 bg-[#111112]">
             <div className="marquee-track-reverse font-black text-2xl uppercase tracking-widest gap-16 items-center flex text-[#D2FF00]">
               <span>{SITE_CONFIG.identity.firstName} {SITE_CONFIG.identity.lastName} {SITE_CONFIG.identity.numberCode}</span>
               <span>{SITE_CONFIG.identity.firstName} {SITE_CONFIG.identity.lastName} {SITE_CONFIG.identity.numberCode}</span>
               <span>{SITE_CONFIG.identity.firstName} {SITE_CONFIG.identity.lastName} {SITE_CONFIG.identity.numberCode}</span>
               <span>{SITE_CONFIG.identity.firstName} {SITE_CONFIG.identity.lastName} {SITE_CONFIG.identity.numberCode}</span>
             </div>
          </div>
          
          {/* Solid Copyright Bar */}
          <div className="w-full bg-[#D2FF00] text-[#111112] py-5 px-6 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-widest gap-4">
            <span>© 2026 {SITE_CONFIG.identity.firstName} {SITE_CONFIG.identity.lastName}. ALL RIGHTS RESERVED.</span>
            <span>PRIVACY POLICY // TERMS</span>
          </div>
        </div>
      </footer>
      
    </div>
  );
}