import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// MASTER CONFIGURATION — ABDUL TARIQUE WARSI (ATW // 01)
// ============================================================================
const SITE_CONFIG = {
  brand: {
    code: "ATW // 01",
    nameFirst: "ABDUL TARIQUE",
    nameLast: "WARSI",
    role: "AI & ROBOTICS EDUCATOR // AUTOMATION & DATA SCIENCE ENGINEER",
  },
  theme: {
    accent: "#D2FF00",
    darkBg: "#111112",
    darkOlive: "#1C1F16",
    lightBg: "#F4F4ED",
  }
};

export default function App() {
  const [preloaderActive, setPreloaderActive] = useState(true);
  const [logoText, setLogoText] = useState("ATW");
  const mainRef = useRef(null);
  
  useEffect(() => {
    // Zone 01: Preloader Animation
    const tl = gsap.timeline();
    tl.to(".preloader-logo", { duration: 0.6, letterSpacing: "1em", opacity: 0, ease: "power2.inOut" })
      .call(() => setLogoText("01"))
      .to(".preloader-logo", { duration: 0.6, letterSpacing: "0em", opacity: 1, ease: "power2.inOut" })
      .to(".preloader", { duration: 0.8, yPercent: -100, ease: "power4.inOut", delay: 0.5, onComplete: () => setPreloaderActive(false) });

    // GSAP ScrollTrigger setups
    const ctx = gsap.context(() => {
      // Zone 03: Signature Animation
      gsap.to(".signature-path", {
        strokeDashoffset: 0,
        scrollTrigger: {
          trigger: "#zone-03",
          start: "top center",
          end: "center center",
          scrub: 1
        }
      });

      // Block wipe reveals for Manifesto
      gsap.utils.toArray('.block-wipe').forEach(block => {
        gsap.to(block, {
          clipPath: 'inset(0 0 0 0)',
          ease: "power3.out",
          duration: 1.2,
          scrollTrigger: {
            trigger: block,
            start: "top 85%"
          }
        });
      });

      // Zone 04: Horizontal Scroll Editorial
      const horizontalSections = gsap.utils.toArray(".horizontal-panel");
      if (horizontalSections.length > 0) {
        gsap.to(horizontalSections, {
          xPercent: -100 * (horizontalSections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: "#zone-04",
            pin: true,
            scrub: 1,
            snap: 1 / (horizontalSections.length - 1),
            end: () => "+=" + document.querySelector("#zone-04").offsetWidth
          }
        });
      }
    }, mainRef);

    return () => ctx.revert();
  }, []);

  // Liquid mask mouse tracking
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <div ref={mainRef} className="bg-[#F4F4ED] text-[#111112] selection:bg-[#D2FF00] selection:text-[#111112]">
      
      {/* Zone 01: NeonPreloader */}
      <div className="preloader fixed inset-0 z-50 bg-[#D2FF00] flex flex-col items-center justify-center pointer-events-none">
        <h1 className="preloader-logo text-8xl md:text-[10rem] font-black tracking-tighter uppercase">{logoText}</h1>
        <p className="absolute bottom-12 font-bold text-xs uppercase tracking-widest opacity-80">Initializing Systems // Standby</p>
      </div>

      {/* Persistent HUD */}
      <header className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-start pointer-events-none mix-blend-difference text-white">
        <div className="font-black leading-none pointer-events-auto tracking-tighter uppercase">
          {SITE_CONFIG.brand.nameFirst}<br/>{SITE_CONFIG.brand.nameLast}
        </div>
        <div className="text-2xl font-black tracking-tighter pointer-events-auto">{SITE_CONFIG.brand.code}</div>
        <div className="flex items-center gap-4 pointer-events-auto mix-blend-normal">
          <button className="hidden md:block bg-[#D2FF00] text-black px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">
            Business Enquiries
          </button>
          <div className="w-10 h-10 bg-[#D2FF00] rounded-full flex flex-col items-center justify-center gap-1 cursor-pointer hover:scale-105 transition-transform shadow-[0_0_15px_rgba(210,255,0,0.4)]">
            <div className="w-4 h-[2px] bg-black"></div>
            <div className="w-4 h-[2px] bg-black"></div>
          </div>
        </div>
      </header>

      {/* Zone 02: Hero Liquid Mask */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100,200 Q300,50 800,250 T1800,150" fill="none" stroke="black" strokeWidth="2"/>
          <path d="M-100,400 Q400,200 900,450 T1800,350" fill="none" stroke="black" strokeWidth="2"/>
          <path d="M-100,600 Q500,800 1000,550 T1800,750" fill="none" stroke="black" strokeWidth="2"/>
        </svg>

        <div className="absolute bottom-12 left-6 border border-black/10 p-4 rounded-xl bg-white/40 backdrop-blur-md max-w-xs z-30">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#D2FF00] animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest">{SITE_CONFIG.brand.role}</span>
          </div>
          <p className="text-xs font-semibold opacity-75">B.Tech CS @ Bhabha University. Delivering high-performance Python, AI, and robotics solutions.</p>
        </div>

        <div 
          className="relative w-full max-w-lg lg:max-w-2xl aspect-[3/4] md:aspect-square z-20 cursor-crosshair overflow-hidden rounded-[2rem] shadow-2xl"
          onMouseMove={handleMouseMove}
          onMouseLeave={(e) => {
             e.currentTarget.style.setProperty('--mouse-x', '50%');
             e.currentTarget.style.setProperty('--mouse-y', '50%');
          }}
        >
          <img src="https://images.unsplash.com/photo-1544894468-1ebccb3eb720?auto=format&fit=crop&q=80" alt="Base Portrait" className="absolute inset-0 w-full h-full object-cover grayscale opacity-90" />
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" alt="Cyber Visor Portrait" className="absolute inset-0 w-full h-full object-cover liquid-mask transition-all duration-75 mix-blend-color-burn" />
        </div>
      </section>

      {/* Zone 03: Scroll Signature & Manifesto */}
      <section id="zone-03" className="relative bg-[#1C1F16] text-[#F4F4ED] py-40 overflow-hidden">
        <div className="absolute top-32 left-0 w-full opacity-[0.03] pointer-events-none overflow-hidden">
          <div className="text-[12rem] md:text-[18rem] font-black whitespace-nowrap marquee-track">
            AUTOMATION // AI // DATA SCIENCE // ROBOTICS // AUTOMATION // AI // DATA SCIENCE // ROBOTICS
          </div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-6 z-10 flex flex-col items-center">
          <div className="w-48 h-64 md:w-64 md:h-80 bg-[#111112] rounded-2xl mb-16 relative overflow-hidden border border-white/5">
             <img src="https://images.unsplash.com/photo-1544894468-1ebccb3eb720?auto=format&fit=crop&q=80" alt="Small Portrait" className="w-full h-full object-cover grayscale opacity-40" />
             <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_0_10px_rgba(210,255,0,0.5)]" viewBox="0 0 400 200">
               <path className="signature-path" d="M100,100 C150,50 200,150 250,80 S300,120 350,90" fill="none" stroke="#D2FF00" strokeWidth="6" strokeLinecap="round" />
             </svg>
          </div>

          <div className="text-4xl md:text-7xl lg:text-[5.5rem] font-black leading-[0.9] text-center max-w-5xl uppercase tracking-tighter">
            <span className="block block-wipe" style={{clipPath: 'inset(0 100% 0 0)'}}>I ENGINEER SOLUTIONS</span>
            <span className="block text-[#D2FF00] font-serif italic font-normal block-wipe my-4" style={{clipPath: 'inset(0 100% 0 0)'}}>where accuracy meets execution.</span>
            <span className="block block-wipe" style={{clipPath: 'inset(0 100% 0 0)'}}>NO FLUFF. JUST CODE.</span>
          </div>
        </div>
      </section>

      {/* Zone 04: Editorial Horizontal Track */}
      <section id="zone-04" className="bg-[#F4F4ED] h-screen overflow-hidden flex items-center border-b border-black/10">
        <div className="flex h-full w-[300vw]">
          {[1,2,3].map((panel, i) => (
            <div key={i} className="horizontal-panel w-screen h-full flex items-center justify-center p-6 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center max-w-6xl w-full">
                <div className="w-full md:w-1/2 relative group">
                  <div className="absolute inset-0 bg-[#D2FF00] rounded-2xl transform translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
                  <img src={`https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&sig=${i}`} className="relative w-full h-[40vh] md:h-[60vh] object-cover rounded-2xl shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700" alt="Editorial" />
                </div>
                <div className="w-full md:w-1/2 space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] opacity-40">0{i+1} // METRIC OVERVIEW</h3>
                  <p className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-black leading-tight">
                    {i === 0 && "\"Performance isn't a goal. It's the baseline standard.\""}
                    {i === 1 && "\"Scaling automation requires a foundation built on data accuracy.\""}
                    {i === 2 && "\"Precision engineering translates directly to flawless code logic.\""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Zone 05: Dual Face-Off Portal */}
      <section className="relative h-screen flex flex-col md:flex-row border-y-[12px] border-[#111112]">
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#111112] text-[#D2FF00] p-8 md:p-16 flex flex-col justify-between group overflow-hidden relative border-b md:border-b-0 md:border-r border-[#1C1F16]">
          <img src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-50 group-hover:scale-105 transition-all duration-1000 grayscale mix-blend-luminosity" />
          <div className="relative z-10 font-black text-xs uppercase tracking-widest opacity-60">Mode // 01</div>
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black relative z-10 tracking-tighter uppercase leading-none">ON<br/>TRACK</h2>
          <div className="relative z-10 text-right text-3xl md:text-5xl font-serif italic transform -rotate-6 opacity-90">Python & Data</div>
        </div>
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#F4F4ED] text-[#111112] p-8 md:p-16 flex flex-col justify-between items-end group overflow-hidden relative">
          <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000 grayscale mix-blend-multiply" />
          <div className="relative z-10 font-black text-xs uppercase tracking-widest opacity-40">Mode // 02</div>
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black relative z-10 tracking-tighter uppercase leading-none text-right">OFF<br/>TRACK</h2>
          <div className="relative z-10 text-left text-3xl md:text-5xl font-serif italic text-[#D2FF00] mix-blend-difference transform rotate-6">AI Education</div>
        </div>
        
        {/* Center Split Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#D2FF00] text-black w-24 h-24 rounded-full flex items-center justify-center font-black text-sm uppercase tracking-widest z-20 shadow-[0_0_30px_rgba(210,255,0,0.3)] hidden md:flex">
          VS
        </div>
      </section>

      {/* Zone 06: Hall of Fame Grid */}
      <section className="bg-[#111112] text-white py-32 px-6">
        <h2 className="text-center text-4xl md:text-5xl font-black uppercase tracking-[0.2em] mb-20 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Projects Hall of Fame</h2>
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1,2,3,4].map((proj) => (
             <div key={proj} className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-[#D2FF00] transition-colors duration-500 bg-[#1C1F16] h-[28rem] flex flex-col cursor-pointer mt-0 lg:even:mt-12">
               <div className="relative flex-1 overflow-hidden">
                 <img src={`https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80&sig=${proj}A`} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0 grayscale" />
                 <img src={`https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=600&q=80&sig=${proj}B`} className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105" />
                 <div className="absolute top-4 right-4 bg-[#D2FF00] text-black text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg">TELEMETRY // LIVE</div>
               </div>
               <div className="p-6 border-t border-white/5 bg-[#111112]/80 backdrop-blur-md">
                 <h3 className="font-black text-xl mb-2 group-hover:text-[#D2FF00] transition-colors uppercase tracking-tight">Enterprise Pipeline 0{proj}</h3>
                 <p className="text-xs font-bold text-white/50 tracking-widest uppercase">Python • OCR • Tkinter</p>
               </div>
             </div>
          ))}
        </div>
        <div className="text-center mt-20 relative overflow-hidden inline-block mx-auto flex justify-center">
          <button className="group relative bg-[#D2FF00] text-[#111112] px-10 py-5 rounded-full font-black text-sm uppercase tracking-[0.2em] hover:-translate-y-1 transition-transform overflow-hidden">
            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-[150%] inline-block">Load Full Grid</span>
            <span className="absolute inset-0 z-10 flex items-center justify-center translate-y-[150%] transition-transform duration-300 group-hover:translate-y-0 text-white bg-black rounded-full">Explore Now →</span>
          </button>
        </div>
      </section>

      {/* Zone 07: Showcase & Collabs */}
      <section className="py-32 bg-[#F4F4ED] overflow-hidden relative border-t border-black/10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[10deg] w-[150vw] text-center pointer-events-none opacity-30 text-[#D2FF00] font-black text-[15rem] uppercase leading-none mix-blend-darken select-none">
          ARSENAL ARSENAL
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-8">
            <div className="text-xs font-black tracking-[0.3em] uppercase opacity-50">Award Winning Excellence</div>
            <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85]">Most Outstanding Student</h2>
            <p className="text-xl font-medium opacity-80 leading-relaxed max-w-xl">
              Recognized at Global Skills Park for demonstrating exceptional technical capabilities across Artificial Intelligence, Workflow Automation, and Precision CNC Engineering pipelines.
            </p>
          </div>
          <div className="flex-1 w-full max-w-md aspect-square bg-black rounded-full overflow-hidden border-[12px] border-[#D2FF00] shadow-2xl relative group">
            <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
            <div className="absolute inset-0 bg-[#D2FF00]/10 mix-blend-overlay"></div>
          </div>
        </div>

        <div className="mt-32 border-y-2 border-black/5 py-8 overflow-hidden bg-white/50 backdrop-blur-sm">
          <div className="flex gap-20 w-max marquee-track font-black text-3xl uppercase tracking-[0.1em] text-black/10">
            <span>PYTHON</span><span>POWER BI</span><span>SQL</span><span>N8N</span><span>ZAPIER</span><span>REACT</span><span>THREE.JS</span><span>GSAP</span>
            <span>PYTHON</span><span>POWER BI</span><span>SQL</span><span>N8N</span><span>ZAPIER</span><span>REACT</span><span>THREE.JS</span><span>GSAP</span>
          </div>
        </div>
      </section>

      {/* Zone 08: Fanned Deck Socials */}
      <section className="py-40 bg-[#1C1F16] flex flex-col items-center justify-center overflow-hidden h-auto min-h-[80vh]">
        <h2 className="text-white text-4xl md:text-5xl font-black uppercase tracking-[0.2em] mb-24 text-center">Connect // Network</h2>
        <div className="relative w-full max-w-5xl h-[28rem] flex justify-center items-end group">
          {[
            {label: 'GITHUB', color: '#111112', text: '#fff'},
            {label: 'LINKEDIN', color: '#0077b5', text: '#fff'},
            {label: 'EMAIL', color: '#D2FF00', text: '#111112'},
            {label: 'TWITTER', color: '#1DA1F2', text: '#fff'},
            {label: 'RESUME', color: '#F4F4ED', text: '#111112'},
          ].map((item, idx) => {
            const offset = idx - 2; 
            return (
             <a href="#" key={idx} 
                style={{ 
                  transform: `rotate(${offset * 10}deg) translateY(${Math.abs(offset) * 25}px) translateX(${offset * 45}px)`,
                  transformOrigin: 'bottom center',
                  backgroundColor: item.color,
                  color: item.text,
                  zIndex: 10 - Math.abs(offset)
                }}
                className="absolute w-48 h-72 rounded-[2rem] border-4 border-[#1C1F16] shadow-2xl flex flex-col items-center justify-center gap-6 transition-all duration-500 hover:z-50 hover:-translate-y-16 hover:scale-110 hover:rotate-0 cursor-pointer"
             >
               <div className="font-black text-4xl opacity-50">0{idx+1}</div>
               <div className="text-sm font-black uppercase tracking-widest">{item.label}</div>
             </a>
            )
          })}
        </div>
      </section>

      {/* Zone 09: Notched Cockpit Footer */}
      <footer className="relative bg-[#111112] text-white pt-32 pb-12 px-6 overflow-hidden clip-notched-top mt-[-3rem] z-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#D2FF00] blur-[150px] opacity-15 pointer-events-none rounded-full"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16 mt-16 border-b border-white/10 pb-20">
          <div className="flex-1 relative z-10">
            <h2 className="text-7xl md:text-8xl lg:text-[7rem] font-black tracking-tighter uppercase mb-4 text-transparent leading-[0.85]" style={{WebkitTextStroke: '2px #D2FF00'}}>
              ALWAYS<br/>BRINGING<br/>THE PRECISION.
            </h2>
          </div>
          <div className="flex flex-wrap gap-16 lg:gap-24 text-sm font-bold tracking-widest uppercase relative z-10">
            <ul className="space-y-5">
              <li className="text-white/40 mb-8">PAGES</li>
              <li className="hover:text-[#D2FF00] cursor-pointer transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#D2FF00] opacity-0 transition-opacity hover:opacity-100"></span>HOME</li>
              <li className="hover:text-[#D2FF00] cursor-pointer transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#D2FF00] opacity-0 transition-opacity hover:opacity-100"></span>PROJECTS</li>
              <li className="hover:text-[#D2FF00] cursor-pointer transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#D2FF00] opacity-0 transition-opacity hover:opacity-100"></span>TELEMETRY</li>
            </ul>
            <ul className="space-y-5">
              <li className="text-white/40 mb-8">CONNECT</li>
              <li className="hover:text-[#D2FF00] cursor-pointer transition-colors">LINKEDIN</li>
              <li className="hover:text-[#D2FF00] cursor-pointer transition-colors">GITHUB</li>
              <li className="hover:text-[#D2FF00] cursor-pointer transition-colors">EMAIL</li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mt-12 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 relative z-10">
          <div>© 2026 ATW // 01. ENGINEERED WITH PRECISION.</div>
          <button className="bg-[#D2FF00] text-[#111112] px-8 py-4 rounded-full mt-8 md:mt-0 hover:bg-white transition-colors shadow-[0_0_20px_rgba(210,255,0,0.2)]">
            INITIATE CONTACT
          </button>
        </div>
      </footer>
    </div>
  );
}
