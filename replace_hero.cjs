const fs = require('fs');

let appCode = fs.readFileSync('src/App.jsx', 'utf8');

const newHeroComponent = `// ============================================================================
function HeroBlobRevealPortrait() {
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const mouseRef = useRef({ x: 300, y: 350, targetX: 300, targetY: 350, vx: 0, vy: 0 });
  const imagesRef = useRef({ base: null });
  
  // Calibration State
  const [showCalibration, setShowCalibration] = useState(false);
  const [calib, setCalib] = useState({ offsetX: 0, offsetY: 0, scale: 1, showGrid: false });
  const calibRef = useRef(calib);
  
  useEffect(() => { calibRef.current = calib; }, [calib]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'KeyC') {
        setShowCalibration(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const baseImg = new Image();
    baseImg.src = \`\${import.meta.env.BASE_URL}my-photo.jpg\`;
    imagesRef.current.base = baseImg;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Raw image Crop calibration
      let sx = 0, sy = 0, sw = 0, sh = 0;
      if (imagesRef.current.base?.complete && imagesRef.current.base.naturalWidth > 0) {
        const img = imagesRef.current.base;
        sx = img.naturalWidth * 0.208;
        sy = img.naturalHeight * 0.085;
        sw = img.naturalWidth * 0.540;
        sh = img.naturalHeight * 0.648;
        
        // 1. Draw Base Portrait
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height);
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
      if (pointsRef.current.length > 0) {
        ctx.save();
        ctx.beginPath();
        pointsRef.current.forEach((pt, i) => {
          const age = Math.min(1, Math.max(0, (now - pt.time) / 900));
          const radius = (1 - age * 0.8) * 140; // Starts huge, shrinks out
          ctx.moveTo(pt.x + radius, pt.y);
          ctx.arc(pt.x, pt.y, Math.max(0, radius), 0, Math.PI * 2);
          // Multi-lobe organic shape
          ctx.arc(pt.x + Math.sin(i * 0.5) * 50, pt.y + Math.cos(i * 0.5) * 50, Math.max(0, radius * 0.7), 0, Math.PI * 2);
        });
        ctx.clip();

        // 4. Draw Cyber Helmet overlay dynamically
        if (imagesRef.current.base?.complete && sw > 0) {
          const img = imagesRef.current.base;
          ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height);
        }

        const cSettings = calibRef.current;
        const cx = 300 + cSettings.offsetX;
        const cy = 276 + cSettings.offsetY;
        const s = cSettings.scale;
        
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(s, s);

        // Draw Matte Carbon Dome (#111112)
        ctx.fillStyle = "#111112";
        ctx.beginPath();
        ctx.arc(0, 0, 160, Math.PI, 0); // Dome
        ctx.fill();

        // Electric Lime Lower Shell (#D2FF00)
        ctx.fillStyle = "#D2FF00";
        ctx.beginPath();
        ctx.moveTo(-160, 0);
        ctx.lineTo(160, 0);
        ctx.lineTo(140, 220);
        ctx.lineTo(-140, 220);
        ctx.fill();

        // Chin vent accents
        ctx.fillStyle = "#111112";
        ctx.beginPath();
        ctx.moveTo(-40, 170);
        ctx.lineTo(40, 170);
        ctx.lineTo(30, 200);
        ctx.lineTo(-30, 200);
        ctx.fill();

        // Dark Reflective Visor (Eye-line Y = 244 to 324 -> relative to cy=276 -> -32 to +48)
        const visorTop = -32;
        const visorBottom = 48;
        ctx.fillStyle = "rgba(20, 22, 25, 0.95)";
        ctx.fillRect(-145, visorTop, 290, visorBottom - visorTop);
        ctx.strokeStyle = "#D2FF00";
        ctx.lineWidth = 4;
        ctx.strokeRect(-145, visorTop, 290, visorBottom - visorTop);
        
        // Visor reflection
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx.beginPath();
        ctx.moveTo(-120, visorTop);
        ctx.lineTo(-60, visorTop);
        ctx.lineTo(-100, visorBottom);
        ctx.lineTo(-140, visorBottom);
        ctx.fill();

        // ATW // 01 printed on visor brow strip
        ctx.fillStyle = "#D2FF00";
        ctx.font = "bold 20px Arial";
        ctx.fillText("ATW // 01", -50, visorTop + 22);
        
        // Nose Cutout (hard cut using destination-out)
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        // Nose relative to cy=276: approx +130, radius 60
        ctx.ellipse(0, 130, 60, 75, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over'; // restore

        ctx.restore(); // Restore scale/translate
        ctx.restore(); // Restore clip
      }

      // 5. Draw Calibration Grid if active
      if (calibRef.current.showGrid) {
        ctx.strokeStyle = "rgba(0, 255, 0, 0.5)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(300, 0); ctx.lineTo(300, height);
        ctx.moveTo(0, 276); ctx.lineTo(width, 276);
        ctx.stroke();
        ctx.fillStyle = "#0f0";
        ctx.fillRect(298, 274, 4, 4);
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
      
      {/* Calibration UI Panel */}
      {showCalibration && (
        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md p-4 rounded border border-[#D2FF00] text-xs font-mono text-white flex flex-col gap-3 w-56 z-50 pointer-events-auto shadow-2xl">
          <div className="text-[#D2FF00] font-bold mb-1 tracking-widest uppercase">Helmet Calibrator</div>
          
          <div className="flex flex-col gap-1">
            <label className="flex justify-between"><span>Offset X</span> <span>{calib.offsetX}px</span></label>
            <input type="range" min="-200" max="200" value={calib.offsetX} onChange={(e) => setCalib({...calib, offsetX: Number(e.target.value)})} className="accent-[#D2FF00]" />
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="flex justify-between"><span>Offset Y</span> <span>{calib.offsetY}px</span></label>
            <input type="range" min="-200" max="200" value={calib.offsetY} onChange={(e) => setCalib({...calib, offsetY: Number(e.target.value)})} className="accent-[#D2FF00]" />
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex justify-between"><span>Scale</span> <span>{calib.scale.toFixed(2)}x</span></label>
            <input type="range" min="0.5" max="1.5" step="0.05" value={calib.scale} onChange={(e) => setCalib({...calib, scale: Number(e.target.value)})} className="accent-[#D2FF00]" />
          </div>
          
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
            <input type="checkbox" id="showGrid" checked={calib.showGrid || false} onChange={(e) => setCalib({...calib, showGrid: e.target.checked})} className="accent-[#D2FF00]" />
            <label htmlFor="showGrid">Show Crosshair Grid</label>
          </div>
          
          <div className="text-gray-400 text-[10px] mt-2 italic text-center">Press 'C' to hide overlay</div>
        </div>
      )}
    </div>
  );
}`;

const heroRegex = /\/\/ ============================================================================\s*function HeroBlobRevealPortrait\(\) \{.*?\}\s*\/\/\s*============================================================================/s;

appCode = appCode.replace(heroRegex, newHeroComponent + "\n// ============================================================================");

fs.writeFileSync('src/App.jsx', appCode);
console.log("Successfully replaced HeroBlobRevealPortrait component");
