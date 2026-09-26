const fs = require('fs');

let appCode = fs.readFileSync('src/App.jsx', 'utf8');
let cssCode = fs.readFileSync('src/index.css', 'utf8');

// 1. CSS: body overflow-x: clip
if (!cssCode.includes('overflow-x: clip;')) {
  cssCode = cssCode.replace('body {', 'body {\n  overflow-x: clip;');
}
fs.writeFileSync('src/index.css', cssCode);

// 2. App.jsx: Remove overflow-x-hidden
appCode = appCode.replace('overflow-x-hidden', '');

// 3. Lenis Import and Init
if (!appCode.includes('import Lenis')) {
  appCode = appCode.replace("import gsap from 'gsap';", "import gsap from 'gsap';\nimport Lenis from '@studio-freight/lenis';");
  
  const lenisCode = `
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);
`;
  appCode = appCode.replace('// [ZONE 01]: Neon Lime Preloader Timer', lenisCode + '\n  // [ZONE 01]: Neon Lime Preloader Timer');
}

// 4. Preloader Morph & Lift
// Replace preloader div with one that has curved clip-path lift
appCode = appCode.replace(
  /className={\`fixed inset-0 z-50 bg-\\[#D2FF00\\] flex flex-col items-center justify-between py-10 transition-transform duration-1000 ease-in-out \\$\\{preloaderDone \? "-translate-y-full pointer-events-none" : "translate-y-0"[\s\S]*?<\/svg>/,
  `className={\`fixed inset-0 z-50 bg-[#D2FF00] flex flex-col items-center justify-between py-10 transition-all duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)] \${preloaderDone ? "-translate-y-full pointer-events-none rounded-b-[100%]" : "translate-y-0 rounded-b-none"}\`}
      >
        <div />
        <div className="relative flex items-center justify-center">
          <svg className="w-24 h-24" viewBox="0 0 100 100">
            <path
              d={preloaderDone ? "M30,50 L70,50 M30,50 L70,50 M30,50 L70,50" : "M20,75 L20,25 L45,25 L45,55 L80,25 L80,75"}
              fill="none"
              stroke="#111112"
              strokeWidth="9"
              strokeLinecap="square"
              className="transition-all duration-1000 ease-in-out"
            />
          </svg>`
);

// 5. Zone 04: Parallax Background Text Scrub
appCode = appCode.replace(
  'const sigPathRef = useRef(null);',
  'const sigPathRef = useRef(null);\n  const marquee1Ref = useRef(null);\n  const marquee2Ref = useRef(null);'
);

// Add gsap scrolltrigger for marquee1 and 2
appCode = appCode.replace(
  /gsap\.to\(sigPathRef\.current, \{[\s\S]*?\}\);/,
  `gsap.to(sigPathRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "#zone-04-signature",
            start: "top 70%",
            end: "bottom 60%",
            scrub: 1,
          },
        });
        
        if (marquee1Ref.current && marquee2Ref.current) {
          gsap.to(marquee1Ref.current, {
            xPercent: -20,
            ease: "none",
            scrollTrigger: {
              trigger: "#zone-04-signature",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            }
          });
          gsap.to(marquee2Ref.current, {
            xPercent: 20,
            ease: "none",
            scrollTrigger: {
              trigger: "#zone-04-signature",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            }
          });
        }`
);

appCode = appCode.replace(
  /className="whitespace-nowrap text-5xl md:text-7xl font-black uppercase tracking-tighter text-\\[#F4F4ED\\]\/90 animate-marquee"/,
  'ref={marquee1Ref} className="whitespace-nowrap text-5xl md:text-7xl font-black uppercase tracking-tighter text-[#F4F4ED]/90"'
);
appCode = appCode.replace(
  /className="whitespace-nowrap text-5xl md:text-7xl font-black uppercase tracking-tighter animate-marquee"/,
  'ref={marquee2Ref} className="whitespace-nowrap text-5xl md:text-7xl font-black uppercase tracking-tighter"'
);

// 6. Fan Deck Animation (Zone 11)
appCode = appCode.replace(
  'const galleryTrackRef = useRef(null);',
  'const galleryTrackRef = useRef(null);\n  const fanDeckRef = useRef(null);'
);

appCode = appCode.replace(
  /\} \/\/ End of gallery GSAP/, // just looking for end of gallery to insert... wait, I don't have this.
  ''
);

// Let's insert Fan Deck animation inside the GSAP context
appCode = appCode.replace(
  /if \(gallerySectionRef\.current && galleryTrackRef\.current\) \{/,
  `if (fanDeckRef.current) {
        const cards = fanDeckRef.current.querySelectorAll('.fan-card');
        gsap.fromTo(cards, 
          { rotate: 0, y: 0, x: 0 }, 
          { 
            rotate: (i) => (i - 2) * 10,
            y: (i) => Math.abs(i - 2) * 25,
            x: (i) => (i - 2) * 45,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: fanDeckRef.current,
              start: "top 70%",
              end: "bottom bottom",
              scrub: 1,
            }
          }
        );
      }
      
      if (gallerySectionRef.current && galleryTrackRef.current) {`
);

appCode = appCode.replace(
  /<div className="relative w-full max-w-5xl h-\[28rem\] flex justify-center items-end group">/,
  '<div ref={fanDeckRef} className="relative w-full max-w-5xl h-[28rem] flex justify-center items-end group">'
);
appCode = appCode.replace(
  /className="absolute w-48 h-72 rounded-\[2rem\] border-4/g,
  'className="fan-card absolute w-48 h-72 rounded-[2rem] border-4'
);
// Remove inline transform from fan cards since GSAP will handle it
appCode = appCode.replace(
  /transform: \`rotate\(\$\{offset \* 10\}deg\) translateY\(\$\{Math\.abs\(offset\) \* 25\}px\) translateX\(\$\{offset \* 45\}px\)\`,/g,
  ''
);

fs.writeFileSync('src/App.jsx', appCode);
console.log("Done");
