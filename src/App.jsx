import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { ShoppingBag, Menu, X, ArrowRight, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// TEMPLATE CONFIGURATION — 100% 1:1 REPLICA
// ============================================================================
const TEMPLATE_CONFIG = {
  brand: {
    nameFirst: "LANDO",
    nameLast: "NORRIS",
    shortCode: "LN",
    numberCode: "04",
  },
  hero: {
    baseImg: "https://images.unsplash.com/photo-1544894468-1ebccb3eb720?auto=format&fit=crop&q=80",
    revealImg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80",
  },
  signatureImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
  split: {
    leftCutout: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80",
    rightCutout: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80",
    bannerLeft: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
    bannerRight: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
  },
  hallOfFame: [1, 2, 3, 4],
  showcase: {
    left: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80",
    right: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80",
  }
};

// ============================================================================
// TOPOGRAPHIC SVG BACKGROUND
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
// LERP CANVAS BLOB REVEAL (ZONE 03)
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

    baseImg.src = TEMPLATE_CONFIG.hero.baseImg;
    revealImg.src = TEMPLATE_CONFIG.hero.revealImg;
    imagesRef.current.base = baseImg;
    imagesRef.current.reveal = revealImg;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Base Layer
      if (imagesRef.current.base?.complete) {
        ctx.drawImage(imagesRef.current.base, 0, 0, width, height);
      }

      const now = performance.now();
      const m = mouseRef.current;
      m.vx += (m.targetX - m.x) * 0.15;
      m.vy += (m.targetY - m.y) * 0.15;
      m.vx *= 0.7;
      m.vy *= 0.7;
      m.x += m.vx;
      m.y += m.vy;
      
      if (Math.abs(m.vx) > 0.1 || Math.abs(m.vy) > 0.1) {
        pointsRef.current.push({ x: m.x, y: m.y, time: now });
      }
      pointsRef.current = pointsRef.current.filter(p => now - p.time < 900);

      if (pointsRef.current.length > 0 && imagesRef.current.reveal?.complete) {
        ctx.save();
        ctx.beginPath();
        pointsRef.current.forEach((pt, i) => {
          const age = Math.min(1, Math.max(0, (now - pt.time) / 900));
          const radius = (1 - age * 0.8) * 140;
          ctx.moveTo(pt.x + radius, pt.y);
          ctx.arc(pt.x, pt.y, Math.max(0, radius), 0, Math.PI * 2);
          ctx.arc(pt.x + Math.sin(i*0.5)*50, pt.y + Math.cos(i*0.5)*50, Math.max(0, radius * 0.7), 0, Math.PI * 2);
        });
        ctx.clip();
        ctx.drawImage(imagesRef.current.reveal, 0, 0, width, height);
        ctx.strokeStyle = "rgba(210,255,0,0.8)";
        ctx.lineWidth = 2;
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
      {/* 2D Wireframe Halo */}
      <svg className="absolute -top-8 left-1/2 -translate-x-1/2 w-[320px] sm:w-[420px] opacity-25 pointer-events-none" viewBox="0 0 400 260">
        <ellipse cx="200" cy="130" rx="165" ry="110" fill="none" stroke="#111112" strokeWidth="1" strokeDasharray="6 4" />
        <path d="M55,140 Q200,40 345,140 M75,180 Q200,110 325,180" fill="none" stroke="#111112" strokeWidth="1" />
      </svg>
      <canvas ref={canvasRef} onMouseMove={handleMouseMove} width={600} height={720} className="w-full h-full object-cover rounded-[3rem] sm:rounded-t-[180px] shadow-2xl" />
    </div>
  );
}

// ============================================================================
// MAIN 12-ZONE COMPONENT
// ============================================================================
export default function App() {
  const [preloaderState, setPreloaderState] = useState(0); // 0=draw, 1=number, 2=lift
  const [menuOpen, setMenuOpen] = useState(false);
  
  const mainWrapperRef = useRef(null);
  const bgTransitionRef = useRef(null);
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);
  const sigPathRef = useRef(null);
  const fanDeckRef = useRef(null);
  const blockWipesRef = useRef([]);

  // ZONE 01: Preloader Timeline
  useEffect(() => {
    const t1 = setTimeout(() => setPreloaderState(1), 1800);
    const t2 = setTimeout(() => setPreloaderState(2), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // LENIS & GSAP TIMELINES
  useEffect(() => {
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
      // Zone 04: Signature Parallax
      if (sigPathRef.current && marquee1Ref.current && marquee2Ref.current) {
        const length = sigPathRef.current.getTotalLength();
        gsap.set(sigPathRef.current, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(sigPathRef.current, {
          strokeDashoffset: 0, ease: "none",
          scrollTrigger: { trigger: "#zone-04", start: "top 70%", end: "bottom 60%", scrub: 1 }
        });
        gsap.to(marquee1Ref.current, {
          xPercent: -20, ease: "none",
          scrollTrigger: { trigger: "#zone-04", start: "top bottom", end: "bottom top", scrub: 1 }
        });
        gsap.to(marquee2Ref.current, {
          xPercent: 20, ease: "none",
          scrollTrigger: { trigger: "#zone-04", start: "top bottom", end: "bottom top", scrub: 1 }
        });
      }

      // Zone 06: Dark-to-Cream Background Shift
      if (bgTransitionRef.current) {
        gsap.to(bgTransitionRef.current, {
          backgroundColor: "#F4F4ED", color: "#111112", ease: "none",
          scrollTrigger: { trigger: bgTransitionRef.current, start: "center center", end: "bottom center", scrub: 1 }
        });
      }

      // Zone 08 & 10: Neon Block-Wipes
      blockWipesRef.current.forEach(el => {
        ScrollTrigger.create({
          trigger: el, start: "top 85%",
          onEnter: () => el.classList.add('wiped')
        });
      });

      // Zone 11: 5-Card Fan Deck
      if (fanDeckRef.current) {
        const cards = fanDeckRef.current.querySelectorAll('.fan-card');
        gsap.fromTo(cards, 
          { rotate: 0, y: 0, x: 0 }, 
          { 
            rotate: (i) => (i - 2) * 7.5,
            y: (i) => Math.abs(i - 2) * 15,
            x: (i) => (i - 2) * 35,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: fanDeckRef.current, start: "top 75%", end: "center center", scrub: 1
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
    <div ref={mainWrapperRef} className="font-sans selection:bg-[#D2FF00] selection:text-[#111112]">
      
      {/* ZONE 01: Preloader */}
      <div className={`fixed inset-0 z-50 bg-[#D2FF00] flex flex-col items-center justify-center transition-all duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${preloaderState === 2 ? "-translate-y-full rounded-b-[100%] pointer-events-none" : "translate-y-0 rounded-b-none"}`}>
        <div className="relative flex items-center justify-center h-40 w-40">
           {preloaderState === 0 ? (
             <svg className="w-24 h-24" viewBox="0 0 100 100">
               <path className="preloader-path" d="M20,75 L20,25 L45,25 L45,55 L80,25 L80,75" fill="none" stroke="#111112" strokeWidth="8" strokeLinecap="square" />
             </svg>
           ) : (
             <h1 className="text-[8rem] font-black tracking-tighter text-[#111112] leading-none animate-pulse">04</h1>
           )}
        </div>
      </div>

      {/* ZONE 02: Fixed HUD & Bottom-Left Widget */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-5 flex items-start justify-between pointer-events-none mix-blend-difference text-white">
        <div className="pointer-events-auto font-black text-xl md:text-2xl leading-[0.88] tracking-tighter uppercase">
          {TEMPLATE_CONFIG.brand.nameFirst}<br />{TEMPLATE_CONFIG.brand.nameLast}
        </div>
        <div className="hidden md:flex items-center justify-center font-black text-xl tracking-tighter">
          [{TEMPLATE_CONFIG.brand.shortCode}]
        </div>
        <div className="pointer-events-auto flex items-center gap-2.5 mix-blend-normal">
          <button className="flex items-center gap-2 bg-[#D2FF00] text-[#111112] px-4 py-2.5 rounded-xl font-black text-xs tracking-wider uppercase shadow-md hover:scale-105 transition">
            <ShoppingBag className="w-3.5 h-3.5" /><span>STORE</span>
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="w-10 h-10 rounded-xl bg-[#F4F4ED] text-[#111112] flex items-center justify-center hover:bg-[#D2FF00] transition">
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>
      
      <div className="fixed bottom-5 left-5 z-30 hidden lg:flex flex-col gap-2 w-36 pointer-events-auto mix-blend-difference text-white">
        <div className="border border-white/20 rounded-xl p-3 text-center shadow-sm">
          <div className="text-[9px] font-bold tracking-widest uppercase opacity-60 mb-1">NEXT RACE</div>
          <svg className="w-20 h-10 mx-auto my-1" viewBox="0 0 120 60">
            <path d="M15,40 C10,20 40,15 65,25 C90,35 110,15 105,35 C100,50 45,45 15,40 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
          <div className="text-[10px] font-black uppercase tracking-wider">AUSTIN // USA</div>
        </div>
        <div className="border border-white/20 rounded-xl p-3 text-center hover:bg-[#D2FF00] hover:text-[#111112] hover:border-transparent transition mix-blend-normal cursor-pointer">
          <div className="text-[9px] font-black uppercase tracking-wider leading-tight">VIEW DRIVER</div>
          <div className="text-[8px] opacity-70 uppercase mt-0.5">STATISTICS</div>
        </div>
      </div>

      {/* ZONE 03: Hero Portrait & Liquid-Blob Cursor Mask */}
      <section className="relative min-h-screen pt-24 pb-12 flex flex-col justify-end items-center overflow-hidden bg-[#F4F4ED] text-[#111112]">
        <TopographicLines dark={false} />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
          <HeroBlobRevealPortrait />
        </div>
      </section>

      {/* ZONE 04: Dark Parallax & Signature */}
      <section id="zone-04" className="relative min-h-screen bg-[#1E2118] text-[#F4F4ED] flex flex-col items-center justify-center py-32 overflow-hidden">
        <TopographicLines dark={true} />
        <div className="relative w-full flex items-center justify-center my-6 h-[50vh]">
          <div className="absolute inset-x-0 flex flex-col gap-2 pointer-events-none select-none opacity-85 overflow-hidden">
            <div ref={marquee1Ref} className="whitespace-nowrap text-5xl md:text-[6rem] lg:text-[8rem] font-black uppercase tracking-tighter text-[#F4F4ED]/90 relative -left-1/4">
              WE DID IT AT HOME — WE DID IT AT HOME — WE DID IT AT HOME
            </div>
            <div ref={marquee2Ref} className="whitespace-nowrap text-5xl md:text-[6rem] lg:text-[8rem] font-black uppercase tracking-tighter relative left-1/4" style={{ WebkitTextStroke: "1.5px #F4F4ED", color: "transparent" }}>
              FIRST WIN — MIAMI 2024 — FIRST WIN — MIAMI 2024
            </div>
          </div>
          <div className="relative z-10 w-72 sm:w-[22rem] h-[26rem] rounded-xl overflow-hidden shadow-2xl border border-white/10">
            <img src={TEMPLATE_CONFIG.signatureImg} alt="Portrait" className="w-full h-full object-cover grayscale contrast-125" />
          </div>
          <svg className="absolute z-20 w-[340px] sm:w-[560px] h-64 pointer-events-none" viewBox="0 0 600 260">
            <path ref={sigPathRef} d="M60,210 C140,60 220,220 290,90 C330,20 350,190 410,110 C460,45 490,150 550,60 M210,150 L490,120" fill="none" stroke="#D2FF00" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ZONE 05 & 06: Manifesto & Scatter Gallery (with Color Shift) */}
      <div ref={bgTransitionRef} className="bg-[#1E2118] text-[#F4F4ED] transition-colors duration-1000">
        
        {/* Zone 05: Manifesto Block */}
        <section className="relative py-28 px-6 text-center">
          <div className="max-w-5xl mx-auto flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border border-current flex items-center justify-center mb-8">
               <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 12a7.5 7.5 0 0 1 15 0" /><path d="M12 4.5v15" /></svg>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.95]">
              REDEFINING <span className="text-[#D2FF00] font-serif italic font-normal">LIMITS</span>, ONE LAP AT A TIME. BRINGING HOME THE <span className="text-[#D2FF00] font-serif italic font-normal">WINS</span> AND BUILDING A <span className="text-[#D2FF00] font-serif italic font-normal">LEGACY</span>.
            </h2>
          </div>
        </section>

        {/* Zone 06: Scatter Gallery */}
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-12 md:gap-24 relative">
             <div className="w-full md:w-5/12 -mt-12 group">
               <img src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&q=80" className="w-full h-[400px] object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-700" />
               <p className="mt-6 text-2xl font-serif italic">"Precision is everything."</p>
             </div>
             <div className="w-full md:w-4/12 mt-24 group">
               <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80" className="w-full h-[500px] object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-700" />
             </div>
             <div className="w-full md:w-6/12 -mt-32 group relative">
               <img src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80" className="w-full h-[350px] object-cover rounded-xl" />
             </div>
          </div>
        </section>
      </div>

      {/* ZONE 07: Split Chooser */}
      <section className="relative flex flex-col md:flex-row border-y-[16px] border-[#111112]">
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen bg-[#111112] text-[#D2FF00] flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer border-b md:border-b-0 md:border-r border-[#1C1F16]">
          <img src={TEMPLATE_CONFIG.split.leftCutout} className="absolute left-0 top-1/2 -translate-y-1/2 h-[80%] object-contain opacity-20 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700" />
          <h2 className="text-6xl md:text-8xl font-black relative z-10 tracking-tighter uppercase">ON<br/>TRACK</h2>
          <div className="mt-6 border border-[#D2FF00] rounded-full p-3"><ArrowRight className="w-6 h-6" /></div>
        </div>
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen bg-[#F4F4ED] text-[#111112] flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer">
          <img src={TEMPLATE_CONFIG.split.rightCutout} className="absolute right-0 top-1/2 -translate-y-1/2 h-[80%] object-contain opacity-20 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700" />
          <h2 className="text-6xl md:text-8xl font-black relative z-10 tracking-tighter uppercase">OFF<br/>TRACK</h2>
          <div className="mt-6 border border-[#111112] rounded-full p-3"><ArrowRight className="w-6 h-6" /></div>
        </div>
      </section>

      {/* 2-Column Banner Underneath */}
      <div className="flex flex-col md:flex-row w-full h-64 md:h-96">
        <img src={TEMPLATE_CONFIG.split.bannerLeft} className="w-full md:w-1/2 h-full object-cover grayscale" />
        <img src={TEMPLATE_CONFIG.split.bannerRight} className="w-full md:w-1/2 h-full object-cover grayscale" />
      </div>

      {/* ZONE 08: Hall of Fame */}
      <section className="bg-[#111112] text-white py-32 px-6">
        <div className="text-center mb-20">
          <h2 ref={el => blockWipesRef.current[0] = el} className="block-wipe text-5xl md:text-[5rem] font-black uppercase tracking-tighter text-[#D2FF00]">HELMETS HALL OF FAME</h2>
          <p className="mt-6 max-w-2xl mx-auto text-white/60 text-sm font-bold tracking-widest uppercase">Explore the iconic helmet designs worn across the globe.</p>
        </div>
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEMPLATE_CONFIG.hallOfFame.map((item, idx) => (
             <div key={idx} className={`group relative rounded-3xl overflow-hidden border border-white/10 hover:border-[#D2FF00] transition-colors duration-500 bg-[#181A14] h-[28rem] flex flex-col cursor-pointer ${idx % 2 === 1 ? 'lg:mt-16' : ''}`}>
               <div className="relative flex-1 overflow-hidden flex items-center justify-center p-8">
                 <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-contain transition-all duration-700 group-hover:scale-110 group-hover:opacity-0 drop-shadow-2xl" />
                 <img src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=600&q=80" className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105" />
               </div>
               <div className="p-6 border-t border-white/5 relative z-10 bg-[#111112]/50 backdrop-blur-md">
                 <h3 className="font-black text-xl mb-1 group-hover:text-[#D2FF00] transition-colors uppercase tracking-tight">HELMET 0{idx+1}</h3>
                 <p className="text-xs font-bold text-white/50 tracking-widest uppercase">2026 SEASON</p>
               </div>
             </div>
          ))}
        </div>
        <div className="flex flex-col items-center mt-24">
          <CheckCircle2 className="w-12 h-12 text-[#D2FF00] mb-6" />
          <button className="bg-[#D2FF00] text-[#111112] px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(210,255,0,0.3)] hover:scale-105 transition-transform">
            VIEW ON TRACK
          </button>
        </div>
      </section>

      {/* ZONE 09: Champion Showcase */}
      <section className="bg-[#F4F4ED] py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8 relative z-10">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">VISIT THE<br/>STORE</h2>
            <button className="bg-[#111112] text-[#D2FF00] px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#D2FF00] hover:text-[#111112] transition-colors">
              SHOP ALL
            </button>
            <div className="flex gap-6 mt-12">
               <img src={TEMPLATE_CONFIG.showcase.left} className="w-40 h-40 object-cover rounded-2xl shadow-xl -rotate-6" />
               <img src={TEMPLATE_CONFIG.showcase.right} className="w-40 h-40 object-cover rounded-2xl shadow-xl rotate-3" />
            </div>
          </div>
          <div className="flex-1 relative w-full aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden bg-[#111112] border-8 border-[#D2FF00]">
             <img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale" />
             <div className="absolute top-8 right-8 bg-[#D2FF00] text-[#111112] font-black text-4xl px-4 py-2 rounded-xl shadow-2xl -rotate-12">LN4</div>
             <div className="absolute bottom-8 left-8 bg-gradient-to-tr from-yellow-500 to-yellow-200 text-black p-4 rounded-xl shadow-2xl">
               <div className="font-black text-xl tracking-tighter">GOLD PLAQUE</div>
             </div>
          </div>
        </div>
      </section>

      {/* ZONE 10: Partners & Campaigns */}
      <section className="bg-[#F4F4ED] py-32 overflow-hidden border-t border-[#111112]/10 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 pointer-events-none opacity-20">
          <svg viewBox="0 0 500 200" className="w-[120vw] h-auto text-[#D2FF00] fill-current">
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontFamily="serif" fontStyle="italic" fontWeight="bold" fontSize="120">Collabs</text>
          </svg>
        </div>
        <div className="relative z-10 text-center mb-16">
          <h2 ref={el => blockWipesRef.current[1] = el} className="block-wipe text-5xl md:text-7xl font-black uppercase tracking-tighter">PARTNERS & CAMPAIGNS</h2>
        </div>
        <div className="bg-[#111112] py-8 mt-12 overflow-hidden relative z-10 transform -rotate-2 scale-105 shadow-2xl">
          <div className="marquee-track font-black text-4xl text-white uppercase tracking-widest gap-16 px-8">
            <span>QUADRANT</span><span>MCLAREN</span><span>BELL</span><span>QUADRANT</span><span>MCLAREN</span><span>BELL</span>
            <span>QUADRANT</span><span>MCLAREN</span><span>BELL</span><span>QUADRANT</span><span>MCLAREN</span><span>BELL</span>
          </div>
        </div>
      </section>

      {/* ZONE 11: 5-Card Arched Fan Deck */}
      <section className="bg-[#1C1F16] py-40 flex flex-col items-center justify-center overflow-hidden min-h-screen relative">
        <h2 className="text-[#F4F4ED] text-4xl font-black uppercase tracking-widest mb-32 z-10">WHAT'S UP ON SOCIALS</h2>
        <div ref={fanDeckRef} className="relative w-full max-w-4xl h-[28rem] flex justify-center items-end group z-20">
          {[1,2,3,4,5].map((item, i) => (
             <div key={i} className="fan-card absolute w-48 sm:w-56 h-72 sm:h-80 rounded-3xl border-4 border-[#1C1F16] overflow-hidden shadow-2xl bg-white hover:-translate-y-8 transition-transform duration-300 cursor-pointer">
               <img src={`https://images.unsplash.com/photo-1544894468-1ebccb3eb720?auto=format&fit=crop&q=80&w=400&sig=${i}`} className="w-full h-full object-cover grayscale hover:grayscale-0" />
             </div>
          ))}
        </div>
        <ul className="flex flex-wrap gap-8 md:gap-16 text-white font-black uppercase tracking-widest mt-24 z-10 relative text-sm md:text-base">
          <li className="hover:text-[#D2FF00] cursor-pointer transition-colors">TIKTOK</li>
          <li className="hover:text-[#D2FF00] cursor-pointer transition-colors">INSTAGRAM</li>
          <li className="hover:text-[#D2FF00] cursor-pointer transition-colors">YOUTUBE</li>
          <li className="hover:text-[#D2FF00] cursor-pointer transition-colors">TWITCH</li>
        </ul>
        <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-[#D2FF00]/10 to-transparent pointer-events-none"></div>
      </section>

      {/* ZONE 12: Notched Dark Footer */}
      <footer className="relative bg-[#181A14] text-white pt-32 pb-6 mt-[-4rem] z-30">
        {/* Exact Notched Racing Tab Top Edge */}
        <div className="absolute top-0 left-0 w-full h-16 bg-[#F4F4ED] z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[#181A14] clip-footer-notch z-10"></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <svg className="w-[300px] h-20 mx-auto mb-8 drop-shadow-[0_0_15px_rgba(210,255,0,0.4)]" viewBox="0 0 600 200">
               <path d="M100,100 C150,50 200,150 250,80 S300,120 350,90" fill="none" stroke="#D2FF00" strokeWidth="8" strokeLinecap="round" />
            </svg>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">ALWAYS BRINGING<br/>THE FIGHT.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-y border-white/10 py-16">
            <div className="flex flex-col gap-6 text-sm font-bold uppercase tracking-widest text-white/60">
              <div className="text-white">PAGES</div>
              <a href="#" className="hover:text-[#D2FF00]">HOME</a>
              <a href="#" className="hover:text-[#D2FF00]">ON TRACK</a>
              <a href="#" className="hover:text-[#D2FF00]">STORE</a>
            </div>
            
            <div className="flex flex-col items-center justify-center gap-6">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#D2FF00] shadow-[0_0_20px_rgba(210,255,0,0.2)]">
                <img src={TEMPLATE_CONFIG.hero.baseImg} className="w-full h-full object-cover grayscale" />
              </div>
              <button className="bg-[#D2FF00] text-[#111112] px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white transition-colors">
                BUSINESS ENQUIRIES
              </button>
            </div>
            
            <div className="flex flex-col md:items-end gap-6 text-sm font-bold uppercase tracking-widest text-white/60">
              <div className="text-white">FOLLOW ON</div>
              <a href="#" className="hover:text-[#D2FF00]">INSTAGRAM</a>
              <a href="#" className="hover:text-[#D2FF00]">TWITTER</a>
              <a href="#" className="hover:text-[#D2FF00]">LINKEDIN</a>
            </div>
          </div>
          
          <div className="py-6 overflow-hidden relative opacity-30 pointer-events-none">
             <div className="marquee-track-reverse font-black text-xl uppercase tracking-widest gap-12">
               <span>LANDO NORRIS 04</span><span>LANDO NORRIS 04</span><span>LANDO NORRIS 04</span><span>LANDO NORRIS 04</span>
             </div>
          </div>
        </div>
        
        {/* Solid #D2FF00 Bottom Bar */}
        <div className="absolute bottom-0 left-0 w-full bg-[#D2FF00] text-[#111112] py-4 px-6 flex justify-between items-center text-[10px] font-black uppercase tracking-widest z-20">
          <span>© 2026 LN4. ALL RIGHTS RESERVED.</span>
          <span>PRIVACY // TERMS</span>
        </div>
      </footer>
      
    </div>
  );
}