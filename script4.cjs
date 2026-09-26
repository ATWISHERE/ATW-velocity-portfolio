const fs = require('fs');

let appCode = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Add the new HeroShrinkAndWriteTransition component just above the App component
const newComponent = `
// ============================================================================
// NEW ARCHITECTURE: HERO SHRINK & WRITE TRANSITION (Replaces Zone 3, 4, 5)
// ============================================================================
function HeroShrinkAndWriteTransition() {
  const pinRef = useRef(null);
  const heroRef = useRef(null);
  const canvasWrapperRef = useRef(null);
  const sigRef1 = useRef(null);
  const sigRef2 = useRef(null);
  const sigRef3 = useRef(null);
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);
  const manifestoLinesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Scrolling Typography
      gsap.to(marquee1Ref.current, {
        xPercent: -20, ease: "none",
        scrollTrigger: { trigger: pinRef.current, start: "top bottom", end: "+=300%", scrub: 1 }
      });
      gsap.to(marquee2Ref.current, {
        xPercent: 20, ease: "none",
        scrollTrigger: { trigger: pinRef.current, start: "top bottom", end: "+=300%", scrub: 1 }
      });

      // Pinned Animation Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          pin: true,
          scrub: 0.4,
          end: "+=220%",
        }
      });

      // Prepare Signature lengths
      [sigRef1, sigRef2, sigRef3].forEach(ref => {
        if(ref.current) {
          const l = ref.current.getTotalLength();
          gsap.set(ref.current, { strokeDasharray: l, strokeDashoffset: l });
        }
      });

      // Progress 0.00 to 0.45: Shrink, Morph to #787A6E, fade out blob canvas
      tl.to(heroRef.current, {
        width: "46vw",
        height: "54vh",
        backgroundColor: "#787A6E",
        borderRadius: "16px",
        ease: "power2.inOut"
      }, 0);
      
      tl.to(canvasWrapperRef.current, {
        opacity: 0,
        ease: "power2.inOut"
      }, 0);

      // Progress 0.42 to 0.95: Sequential Signature SVG Writing
      tl.to(sigRef1.current, { strokeDashoffset: 0, ease: "none" }, 0.42);
      tl.to(sigRef2.current, { strokeDashoffset: 0, ease: "none" }, 0.60);
      tl.to(sigRef3.current, { strokeDashoffset: 0, ease: "none" }, 0.78);

      // Manifesto Block Wipe Animation (Triggers below the pinned section)
      manifestoLinesRef.current.forEach((el, index) => {
        if (el) {
          ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            onEnter: () => {
              setTimeout(() => {
                el.classList.add('wiped');
              }, index * 150); // Stagger the wipe
            }
          });
        }
      });

    }, pinRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
    {/* Pinned Hero Section */}
    <div ref={pinRef} className="relative w-screen h-screen bg-[#1E2118] overflow-hidden flex items-center justify-center z-20">
      
      {/* Background Scrolling Typography */}
      <div className="absolute inset-x-0 flex flex-col gap-2 pointer-events-none select-none opacity-85 z-0">
        <div ref={marquee1Ref} className="whitespace-nowrap text-5xl md:text-[6rem] lg:text-[7.5rem] font-black uppercase tracking-grotesque text-[#F4F4ED]/90 relative -left-1/4">
          WE ENGINEER PRECISION PIPELINES — WE ENGINEER PRECISION PIPELINES
        </div>
        <div ref={marquee2Ref} className="whitespace-nowrap text-5xl md:text-[6rem] lg:text-[7.5rem] font-black uppercase tracking-grotesque relative left-1/4" style={{ WebkitTextStroke: "1.5px #F4F4ED", color: "transparent" }}>
          100% ALGORITHMIC VALIDATION — 100% ALGORITHMIC VALIDATION
        </div>
      </div>
      
      {/* Cream Hero Container */}
      <div ref={heroRef} className="relative z-10 w-screen h-screen bg-[#F4F4ED] flex flex-col justify-end items-center overflow-hidden origin-center shadow-2xl">
        <div className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-100"><TopographicLines dark={false} /></div>
        
        {/* Static Base Portrait (Reveals when canvas fades out) */}
        <div className="absolute inset-0 w-[340px] sm:w-[460px] md:w-[540px] mx-auto h-full flex flex-col justify-end">
           <img src={SITE_CONFIG.images.signaturePortrait} className="w-full h-[660px] object-cover grayscale mix-blend-multiply opacity-50 contrast-125" />
        </div>
        
        {/* Interactive Canvas wrapper that fades out */}
        <div ref={canvasWrapperRef} className="absolute inset-0 flex flex-col justify-end items-center pointer-events-auto z-20">
          <HeroBlobRevealPortrait />
        </div>
        
        {/* Signature SVG that writes over top */}
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[340px] sm:w-[560px] h-64 pointer-events-none drop-shadow-[0_0_15px_rgba(210,255,0,0.4)]" viewBox="0 0 600 260">
           <path ref={sigRef1} d="M60,210 C140,60 220,220 290,90" fill="none" stroke="#D2FF00" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
           <path ref={sigRef2} d="M290,90 C330,20 350,190 410,110 C460,45 490,150 550,60" fill="none" stroke="#D2FF00" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
           <path ref={sigRef3} d="M210,150 L490,120" fill="none" stroke="#D2FF00" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>

    {/* Manifesto Block (Zone 05 replacement) */}
    <div className="bg-[#1E2118] text-[#F4F4ED] relative z-20">
      <section className="relative py-32 px-6 text-center">
        <TopographicLines dark={true} />
        <div className="relative max-w-5xl mx-auto flex flex-col items-center z-10">
          <div className="flex flex-col items-center mb-10 opacity-70">
             <svg className="w-12 h-12 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12a8 8 0 0 1 16 0" /><path d="M12 4v16" /></svg>
             <span className="text-[10px] font-bold tracking-[0.2em] uppercase">BHABHA UNIVERSITY // HARVARDX CS109X // GSP BHOPAL</span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-[5rem] font-black uppercase tracking-grotesque leading-[1.1] max-w-4xl flex flex-col gap-2">
            <span ref={el => manifestoLinesRef.current[0] = el} className="block-wipe self-center">REDEFINING <span className="text-[#D2FF00] font-serif italic font-normal tracking-normal">LIMITS</span>, FIGHTING FOR <span className="text-[#D2FF00] font-serif italic font-normal tracking-normal">WINS</span>,</span>
            <span ref={el => manifestoLinesRef.current[1] = el} className="block-wipe self-center">BRINGING IT ALL IN PYTHON & AI.</span>
            <span ref={el => manifestoLinesRef.current[2] = el} className="block-wipe self-center">DEFINING A <span className="text-[#D2FF00] font-serif italic font-normal tracking-normal">LEGACY</span> IN DATA SCIENCE</span>
            <span ref={el => manifestoLinesRef.current[3] = el} className="block-wipe self-center">ON AND OFF THE TRACK.</span>
          </h2>
        </div>
      </section>
    </div>
    
    <div className="bg-[#1E2118] text-[#F4F4ED] transition-colors duration-0" id="bg-transition-wrapper">
    </>
  );
}
`;

appCode = appCode.replace('export default function App() {', newComponent + '\nexport default function App() {');

// 2. Remove the old GSAP logic for Zone 04 & 06 Background from App()
appCode = appCode.replace(/\/\/ Zone 04: Dark Parallax & Signature Drawing[\s\S]*?\/\/ Zone 06: Background Interpolation \(\#24261E \-\> \#F4F4ED\)/g, '// Zone 06: Background Interpolation (#24261E -> #F4F4ED)');

// 3. Remove the old jsx for Zone 03, 04, and 05 and the start of bgTransitionRef
const zone3Regex = /\{\/\* =========================================================================\s*ZONE 03: HERO PORTRAIT & LIQUID-BLOB CURSOR MASK.*?<\/section>\s*\{\/\* =========================================================================\s*ZONE 04: DARK PARALLAX.*?<\/section>\s*<div ref=\{bgTransitionRef\} className="bg-\\[#24261E\\] text-\\[#F4F4ED\\] transition-colors duration-0">\s*\{\/\* =========================================================================\s*ZONE 05: MANIFESTO STATEMENT BLOCK.*?<\/section>/s;

appCode = appCode.replace(zone3Regex, '<HeroShrinkAndWriteTransition />\n\n        <div ref={bgTransitionRef} className="bg-[#1E2118] text-[#F4F4ED] transition-colors duration-0">');

// 4. Clean up any trailing broken closing tags if needed (the previous replace handles the exact block)
fs.writeFileSync('src/App.jsx', appCode);
console.log("Successfully replaced Zone 03, 04, and 05 with HeroShrinkAndWriteTransition.");
