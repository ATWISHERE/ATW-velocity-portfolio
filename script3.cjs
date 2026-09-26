const fs = require('fs');

let appCode = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Crisp Canvas Blob with Neon Border
appCode = appCode.replace(
  /ctx\.strokeStyle = "rgba\(210,255,0,0\.8\)";\s*ctx\.lineWidth = 2;\s*ctx\.stroke\(\);/,
  `// Draw a crisp neon border inside the mask
        ctx.strokeStyle = "#D2FF00";
        ctx.lineWidth = 6;
        ctx.stroke();
        // Add a slight drop shadow to the mask edge
        ctx.shadowColor = "#D2FF00";
        ctx.shadowBlur = 15;
        ctx.stroke();
        ctx.shadowBlur = 0;`
);

// 2. Parallax effect for Scatter Gallery
appCode = appCode.replace(
  /const fanDeckRef = useRef\(null\);/,
  'const fanDeckRef = useRef(null);\n  const scatterGalleryRef = useRef(null);'
);

appCode = appCode.replace(
  /if \(fanDeckRef\.current\) \{/,
  `if (scatterGalleryRef.current) {
        const columns = scatterGalleryRef.current.children;
        gsap.to(columns[0], { yPercent: -15, ease: "none", scrollTrigger: { trigger: scatterGalleryRef.current, scrub: 1 } });
        gsap.to(columns[1], { yPercent: 20, ease: "none", scrollTrigger: { trigger: scatterGalleryRef.current, scrub: 1 } });
        gsap.to(columns[2], { yPercent: -5, ease: "none", scrollTrigger: { trigger: scatterGalleryRef.current, scrub: 1 } });
      }
      if (fanDeckRef.current) {`
);

appCode = appCode.replace(
  /<div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-12 md:gap-24 relative">/,
  '<div ref={scatterGalleryRef} className="max-w-7xl mx-auto flex flex-wrap justify-center gap-12 md:gap-24 relative">'
);

// 3. Fix the "ON TRACK" neon scribble (Zone 07)
appCode = appCode.replace(
  /<h2 className="text-6xl md:text-8xl font-black relative z-10 tracking-tighter uppercase">ON<br\/>TRACK<\/h2>/,
  `<h2 className="text-6xl md:text-[8rem] lg:text-[10rem] font-black relative z-10 tracking-tighter uppercase leading-[0.8] text-center">
            ON<br/>TRACK
            <svg className="absolute -inset-10 w-[140%] h-[140%] pointer-events-none drop-shadow-[0_0_10px_rgba(210,255,0,0.5)] z-20 opacity-80" viewBox="0 0 200 200">
              <path d="M40,100 Q80,20 120,90 T160,80 M50,120 Q100,180 150,110" fill="none" stroke="#D2FF00" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </h2>`
);

appCode = appCode.replace(
  /<h2 className="text-6xl md:text-8xl font-black relative z-10 tracking-tighter uppercase">OFF<br\/>TRACK<\/h2>/,
  `<h2 className="text-6xl md:text-[8rem] lg:text-[10rem] font-black relative z-10 tracking-tighter uppercase leading-[0.8] text-center">
            OFF<br/>TRACK
          </h2>`
);


// 4. Refine the Notched Footer (Zone 12) colors to exactly match the video's dark olive carbon (#1C1F16 or #141611)
appCode = appCode.replace(
  /<footer className="relative bg-\\[#181A14\\] text-white pt-32 pb-6 mt-\[-4rem\] z-30">/,
  `<footer className="relative bg-[#141511] text-white pt-32 pb-6 mt-[-4rem] z-30">`
);
appCode = appCode.replace(
  /<div className="absolute top-0 left-0 w-full h-full bg-\\[#181A14\\] clip-footer-notch z-10"><\/div>/,
  `<div className="absolute top-0 left-0 w-full h-full bg-[#141511] clip-footer-notch z-10"></div>
        <div className="absolute top-[3rem] left-[calc(50%-6rem)] w-[12rem] h-1 bg-[#D2FF00] shadow-[0_0_15px_#D2FF00] z-20"></div>`
);


fs.writeFileSync('src/App.jsx', appCode);
console.log("Done");
