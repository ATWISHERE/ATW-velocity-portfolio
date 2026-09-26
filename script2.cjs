const fs = require('fs');

let appCode = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Inertia Physics to Blob Reveal
if (!appCode.includes('mouseRef.current.targetX')) {
  appCode = appCode.replace('const pointsRef = useRef([]);', 'const pointsRef = useRef([]);\n  const mouseRef = useRef({ x: 300, y: 350, targetX: 300, targetY: 350, vx: 0, vy: 0 });');

  appCode = appCode.replace(
    /const now = performance\.now\(\);\s*pointsRef\.current = pointsRef\.current\.filter[^\n]*/,
    `const now = performance.now();
      const m = mouseRef.current;
      m.vx += (m.targetX - m.x) * 0.15;
      m.vy += (m.targetY - m.y) * 0.15;
      m.vx *= 0.7;
      m.vy *= 0.7;
      m.x += m.vx;
      m.y += m.vy;
      if (Math.abs(m.vx) > 0.01 || Math.abs(m.vy) > 0.01) {
        pointsRef.current.push({ x: m.x, y: m.y, time: now });
      }
      pointsRef.current = pointsRef.current.filter((p) => now - p.time < 800);`
  );

  appCode = appCode.replace(
    /const handleMouseMove = \(e\) => \{[\s\S]*?pointsRef\.current\.push\(\{ x, y, time: performance\.now\(\) \}\);\n  \};/,
    `const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current.targetX = ((e.clientX - rect.left) / rect.width) * canvasRef.current.width;
    mouseRef.current.targetY = ((e.clientY - rect.top) / rect.height) * canvasRef.current.height;
  };`
  );
}

// 2. Block wipes for Zone 08 (Hall of Fame) and Zone 10 (Collabs)
// Let's find "PROJECTS HALL OF FAME" and add block-wipe
appCode = appCode.replace(
  /<h2 className="([^"]*?)">(\s*)\{SITE_CONFIG.hallOfFame.titleLine1\}/,
  '<h2 className="$1 block-wipe" style={{clipPath: "inset(0 100% 0 0)"}}>$2{SITE_CONFIG.hallOfFame.titleLine1}'
);
// And Zone 10 Partners
appCode = appCode.replace(
  /<h2 className="([^"]*?)">(\s*)\{SITE_CONFIG.partners.logos/,
  '<h2 className="$1 block-wipe" style={{clipPath: "inset(0 100% 0 0)"}}>$2{SITE_CONFIG.partners.logos'
);
// Wait, the user's code for Zone 10 uses SITE_CONFIG.partners.description or logos. Let's just add it to any <h2 className="text-4xl...
appCode = appCode.replace(
  /className="text-center text-4xl md:text-5xl font-black uppercase tracking-\[0.2em\] text-transparent bg-clip-text bg-gradient-to-r from-white to-white\/40"/g,
  'className="text-center text-4xl md:text-5xl font-black uppercase tracking-[0.2em] text-white block-wipe" style={{clipPath: "inset(0 100% 0 0)"}}'
);

// 3. Exact SVG notched footer (Zone 12)
appCode = appCode.replace(
  /<footer className="relative bg-\\[#111112\\] text-white pt-24 pb-12 px-6 overflow-hidden clip-notched-top mt-\[-2rem\] z-10">/,
  `<footer className="relative bg-[#111112] text-white pt-32 pb-12 px-6 mt-12 z-10">
        <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-16 text-[#111112] -mt-16 pointer-events-none drop-shadow-[0_-5px_15px_rgba(210,255,0,0.15)]" viewBox="0 0 200 40" fill="currentColor">
          <path d="M0,40 L40,0 L160,0 L200,40 Z" />
        </svg>
        <div className="absolute top-[-2rem] left-1/2 -translate-x-1/2 w-64 h-1 bg-[#D2FF00] shadow-[0_0_20px_#D2FF00] rounded-full z-20"></div>`
);

fs.writeFileSync('src/App.jsx', appCode);
console.log("Done");
