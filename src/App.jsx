import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Float,
  Environment,
  MeshTransmissionMaterial,
  ContactShadows,
  useGLTF,
} from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// 1. MASTER TEMPLATE CONFIGURATION — ABDUL TARIQUE WARSI (ATW // 01 v2.0)
// ============================================================================
const SITE_CONFIG = {
  brand: {
    code: "ATW // 01",
    nameFirst: "ABDUL TARIQUE",
    nameLast: "WARSI",
    role: "AI & ROBOTICS EDUCATOR // AUTOMATION & DATA SCIENCE ENGINEER",
    location: "JABALPUR & BHOPAL, MP // INDIA",
    statusBadge: "AI & ROBOTICS EDUCATOR // B.TECH CS @ BHABHA UNIVERSITY",
    ctaText: "HIRE / CONTACT ME",
    ctaLink: "#contact-footer",
    email: "abdultarique5@gmail.com",
    phone: "+91 8770463418",
    github: "https://github.com/ATWISHERE",
    linkedin: "https://www.linkedin.com",
  },
  theme: {
    accent: "#D2FF00",             // Lando Norris Electric Lime
    secondaryAccent: "#FF6B00",    // McLaren Papaya Orange
    darkBg: "#111112",             // Carbon Black ("On Track" Mode)
    darkSurface: "#282C20",        // Dark Olive Carbon Card Surface
    lightBg: "#F4F4ED",            // Monastic Cream ("Off Track" Mode)
    lightSurface: "#EFEFE5",       // Recessed Cream Card Surface
    mutedText: "#B9BBAD",          // Telemetry Gray
  },
  modes: {
    onTrackLabel: "ON TRACK // PYTHON AUTOMATION & DATA",
    offTrackLabel: "OFF TRACK // AI EDUCATION, ROBOTICS & CNC",
  },
  threeD: {
    useCustomGLB: false,
    glbPath: "/atw_cyber_core.glb",
  },
  marqueeItems: [
    "PYTHON AUTOMATION & MULTITHREADING",
    "PYAUTOGUI & TKINTER DESKTOP GUIS",
    "PDFPLUMBER & PYTESSERACT OCR",
    "PANDAS, NUMPY & REGEX PIPELINES",
    "N8N, ZAPIER & ADB SCRIPTING",
    "POWER BI, SQL & ADVANCED EXCEL",
    "AI & ROBOTICS EDUCATION",
    "HARVARDX CS109X DATA SCIENCE",
  ],
  telemetry: [
    { label: "DATA VALIDATION", value: "100%", unit: "ACCURACY" },
    { label: "DATASET TELEMETRY", value: "10K+", unit: "ROWS" },
    { label: "CNC CODE EFFICIENCY", value: "+20%", unit: "GAIN" },
    { label: "ITI NCVT-MP BOARD", value: "90.3%", unit: "TOPPER" },
  ],
  projectsOnTrack: [
    {
      id: "AUTO-01",
      title: "ENTERPRISE PDF EXTRACTION & OCR PIPELINE",
      category: "PYTHON // TKINTER // PDFPLUMBER // PYTESSERACT // REGEX",
      year: "2026",
      metric: "100% Accuracy",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
      description:
        "Multi-threaded desktop GUI application performing multi-layered PDF table extraction with PyTesseract OCR fallback, Regex column splitting, master Excel cross-referencing, and page-by-page forensic logging.",
      highlights: [
        "Multi-threaded Tkinter desktop GUI for complex PDF pipelines",
        "pdfplumber structured extraction + PyTesseract OCR fallback",
        "Pandas & Regex engine splitting merged receipt columns automatically",
        "Comparative logic isolating new/missing entries vs. master Excel files",
      ],
    },
    {
      id: "AUTO-02",
      title: "AUTOMATED STUDENT DATA ENTRY SYSTEM",
      category: "PYTHON // PYAUTOGUI // JSON CONFIG // OPENPYXL",
      year: "2026",
      metric: "Batch GUI Bot",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      description:
        "Custom GUI automation script that reads cleaned .xlsx files and injects records into legacy web/desktop portals at scale with interactive coordinate mapping and failsafe triggers.",
      highlights: [
        "Interactive screen-coordinate setup saved to persistent JSON config",
        "Automated batch injection from cleaned Excel (.xlsx) datasets",
        "Strict failsafe triggers, custom delays & lag-resilient logging",
      ],
    },
    {
      id: "ML-03",
      title: "CROP & FERTILIZER ML RECOMMENDATION SYSTEM",
      category: "PYTHON // PANDAS // NUMPY // SEABORN // AICTE-EDUNET",
      year: "2025",
      metric: "90%+ ML Accuracy",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      description:
        "Machine learning recommendation system assisting farmers in selecting optimal crops and fertilizers from 10,000+ rows of soil and weather data.",
      highlights: [
        "Processed 10,000+ rows of agricultural data using Pandas & NumPy",
        "Supervised learning with Decision Trees & Random Forests (90%+ accuracy)",
        "Exploratory Data Analysis (EDA) with Matplotlib & Seaborn",
      ],
    },
    {
      id: "BI-04",
      title: "DYNAMIC SALES PERFORMANCE KPI DASHBOARD",
      category: "POWER BI // MS EXCEL // XLOOKUP // SQL",
      year: "2025",
      metric: "Automated BI",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      description:
        "Interactive MIS dashboard tracking daily, monthly, and quarterly revenue growth, target achievement, and regional sales performance.",
      highlights: [
        "Real-time KPI tracking: Revenue, Target vs. Actual, Regional Sales",
        "Automated Excel & Power BI reporting workflows for decision support",
      ],
    },
  ],
  projectsOffTrack: [
    {
      id: "EDU-01",
      title: "AI & ROBOTICS EDUCATOR // ADMIN AUTOMATION",
      category: "JABALPUR, MP // AI & LOGICAL PROGRAMMING // PRESENT",
      year: "PRESENT",
      metric: "Educator & Builder",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      description:
        "Instructing students in artificial intelligence, robotics, and logical programming while engineering internal Python tools for administrative workflows and student records cross-referencing.",
      highlights: [
        "Hands-on mentorship in AI fundamentals, robotics & logic",
        "Built internal school administrative automation tools in Python",
      ],
    },
    {
      id: "OPS-02",
      title: "WORKFLOW ORCHESTRATION & ADB SCRIPTING",
      category: "N8N // ZAPIER // ANDROID DEBUG BRIDGE // TALLY + GST",
      year: "SYSTEMS",
      metric: "End-to-End Ops",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      description:
        "Cross-platform operational automation combining Android Debug Bridge (ADB) scripting, n8n, Zapier, and enterprise accounting workflows.",
      highlights: [
        "ADB (Android Debug Bridge) device automation scripting",
        "No-code/low-code workflow pipelines with n8n and Zapier",
      ],
    },
    {
      id: "CNC-03",
      title: "5-AXIS DMG MORI PRECISION CNC PROGRAMMING",
      category: "OMEGA RENK BEARINGS // SIEMENS, FANUC & HEIDENHAIN",
      year: "2024",
      metric: "+20% Efficiency",
      image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=800&q=80",
      description:
        "Operated and programmed DMG MORI CNC machines at Omega Renk Bearings, Bhopal, boosting efficiency by 20% with zero-defect production and CAD/CAM modeling.",
      highlights: [
        "20% efficiency boost via optimized CNC code structuring",
        "SolidWorks, AutoCAD, PowerMill & CMM Metrology expertise",
      ],
    },
    {
      id: "ACAD-04",
      title: "HARVARDX CS109X, GLOBAL SKILLS PARK & ITI TOPPER",
      category: "BHABHA UNIVERSITY // HARVARDX // GSP AWARD // ITI",
      year: "ACADEMICS",
      metric: "Award Winner",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
      description:
        "Pursuing B.Tech CS at Bhabha University (with official work permission), HarvardX CS109x Data Science with Python, Global Skills Park 'Most Outstanding Student of the Year', and 90.3% ITI Topper.",
      highlights: [
        "B.Tech in Computer Science — Bhabha University, Bhopal",
        "HarvardX CS109x — Data Science with Python",
        "Most Outstanding Student of the Year — Global Skills Park, Bhopal",
        "90.3% NCVT-MP Board Topper — Govt. Divisional ITI, Jabalpur",
      ],
    },
  ],
  skillsMatrix: [
    {
      group: "LANGUAGES & DATA SCIENCE",
      items: ["Python", "Pandas", "NumPy", "Scikit-learn", "SQL", "Regex (re)", "openpyxl", "Tkinter"],
    },
    {
      group: "AUTOMATION & EXTRACTION",
      items: ["PyAutoGUI", "pdfplumber", "PyTesseract (OCR)", "Multithreading", "JSON Configs", "ADB Scripting", "n8n", "Zapier"],
    },
    {
      group: "BI & VISUALIZATION",
      items: ["Power BI", "MS Excel (XLOOKUP)", "Matplotlib", "Seaborn", "EDA", "Tally + GST"],
    },
    {
      group: "PRECISION ENGINEERING & TOOLS",
      items: ["5-Axis CNC (Siemens/Fanuc/Heidenhain)", "SolidWorks", "AutoCAD", "PowerMill", "Drone Operations", "Git & VS Code"],
    },
  ],
};

// ============================================================================
// 2. 3D INTERACTIVE CENTERPIECE (MOUSE LERP + SCROLL ROTATION)
// ============================================================================
function CustomGLBModel({ url, isOffTrack }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={isOffTrack ? 1.8 : 2.2} />;
}

function Centerpiece3D({ isOffTrack, scrollProgress }) {
  const groupRef = useRef();
  const innerCoreRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const targetX = (state.pointer.x * Math.PI) / 6;
    const targetY = (state.pointer.y * Math.PI) / 8;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetX + scrollProgress.current * Math.PI * 2,
      0.06
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -targetY + scrollProgress.current * 0.8,
      0.06
    );

    if (innerCoreRef.current && ringRef.current) {
      innerCoreRef.current.rotation.z += delta * (isOffTrack ? 0.35 : 0.9);
      ringRef.current.rotation.x -= delta * 0.5;
      ringRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <Float speed={2.4} rotationIntensity={0.45} floatIntensity={1.2}>
      <group ref={groupRef}>
        {SITE_CONFIG.threeD.useCustomGLB ? (
          <Suspense fallback={null}>
            <CustomGLBModel url={SITE_CONFIG.threeD.glbPath} isOffTrack={isOffTrack} />
          </Suspense>
        ) : (
          <group>
            {/* Outer Refractive Visor Shell */}
            <mesh castShadow>
              <icosahedronGeometry args={[1.35, 6]} />
              <MeshTransmissionMaterial
                backside
                samples={6}
                thickness={0.6}
                roughness={isOffTrack ? 0.15 : 0.05}
                clearcoat={1}
                metalness={0.2}
                transmission={0.92}
                ior={1.45}
                chromaticAberration={0.08}
                color={isOffTrack ? "#ffffff" : SITE_CONFIG.theme.accent}
              />
            </mesh>

            {/* Inner Telemetry / Mechanical Core */}
            <mesh ref={innerCoreRef} scale={0.78}>
              <octahedronGeometry args={[1, 2]} />
              <meshStandardMaterial
                color={isOffTrack ? SITE_CONFIG.theme.darkBg : SITE_CONFIG.theme.accent}
                metalness={0.9}
                roughness={0.15}
                wireframe={!isOffTrack}
              />
            </mesh>

            {/* Orbital Velocity Ring */}
            <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
              <torusGeometry args={[1.9, 0.035, 32, 128]} />
              <meshStandardMaterial
                color={SITE_CONFIG.theme.accent}
                emissive={SITE_CONFIG.theme.accent}
                emissiveIntensity={isOffTrack ? 0.4 : 2.2}
              />
            </mesh>
          </group>
        )}
      </group>
    </Float>
  );
}

// ============================================================================
// 3. TOPOGRAPHIC SVG BACKGROUND CONTOURS
// ============================================================================
function TopographicBackground({ isOffTrack }) {
  const strokeColor = isOffTrack ? "rgba(17,17,18,0.07)" : "rgba(210,255,0,0.08)";
  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <g fill="none" stroke={strokeColor} strokeWidth="1.5">
        <path d="M-100,200 C300,50 600,450 1000,150 C1250,-20 1400,300 1600,100" />
        <path d="M-100,350 C250,200 650,600 1050,300 C1300,120 1450,450 1600,250" />
        <path d="M-100,500 C200,350 700,750 1100,450 C1350,280 1500,600 1600,400" />
        <circle cx="720" cy="450" r="340" strokeDasharray="8 8" />
        <circle cx="720" cy="450" r="480" />
      </g>
    </svg>
  );
}

// ============================================================================
// 4. MAIN PORTFOLIO APPLICATION
// ============================================================================
export default function App() {
  const [isOffTrack, setIsOffTrack] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const scrollProgress = useRef(0);
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-reveal",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power4.out" }
      );

      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
        },
      });
    }, mainRef);

    return () => ctx.revert();
  }, [isOffTrack]);

  const activeProjects = isOffTrack
    ? SITE_CONFIG.projectsOffTrack
    : SITE_CONFIG.projectsOnTrack;

  return (
    <div
      ref={mainRef}
      style={{
        backgroundColor: isOffTrack ? SITE_CONFIG.theme.lightBg : SITE_CONFIG.theme.darkBg,
        color: isOffTrack ? SITE_CONFIG.theme.darkBg : SITE_CONFIG.theme.lightBg,
      }}
      className="min-h-screen transition-colors duration-700 relative selection:bg-[#D2FF00] selection:text-[#111112] font-sans overflow-x-hidden"
    >
      <TopographicBackground isOffTrack={isOffTrack} />

      {/* 3D WebGL Viewport */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <Canvas camera={{ position: [0, 0, 5.2], fov: 42 }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={isOffTrack ? 1.2 : 0.6} />
          <spotLight
            position={[8, 10, 8]}
            angle={0.25}
            penumbra={1}
            intensity={isOffTrack ? 1.5 : 3}
            color={SITE_CONFIG.theme.accent}
          />
          <pointLight position={[-8, -5, -5]} intensity={1.2} color="#FF6B00" />
          <Environment preset="city" />
          <Centerpiece3D isOffTrack={isOffTrack} scrollProgress={scrollProgress} />
          <ContactShadows position={[0, -2.2, 0]} opacity={0.35} scale={10} blur={2.5} far={4} />
        </Canvas>
      </div>

      {/* Header & Mode Switcher */}
      <header className="fixed top-0 left-0 right-0 z-30 px-6 py-4 flex items-center justify-between backdrop-blur-md border-b border-current/10">
        <div className="flex items-center gap-3">
          <span
            style={{ backgroundColor: SITE_CONFIG.theme.accent }}
            className="w-3 h-3 rounded-full inline-block animate-pulse"
          />
          <span className="font-black tracking-tighter text-lg">{SITE_CONFIG.brand.code}</span>
        </div>

        <button
          onClick={() => setIsOffTrack(!isOffTrack)}
          className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase border transition-all duration-300 hover:scale-105 cursor-pointer"
          style={{
            borderColor: isOffTrack ? "#111112" : SITE_CONFIG.theme.accent,
            backgroundColor: isOffTrack ? "#111112" : "rgba(210, 255, 0, 0.12)",
            color: isOffTrack ? "#F4F4ED" : SITE_CONFIG.theme.accent,
          }}
        >
          <span>{isOffTrack ? SITE_CONFIG.modes.offTrackLabel : SITE_CONFIG.modes.onTrackLabel}</span>
          <span
            style={{ backgroundColor: SITE_CONFIG.theme.accent }}
            className="px-2 py-0.5 rounded-full text-[#111112] text-[10px] font-black"
          >
            SWITCH
          </span>
        </button>

        <a
          href={SITE_CONFIG.brand.ctaLink}
          style={{ backgroundColor: SITE_CONFIG.theme.accent }}
          className="hidden md:inline-block px-5 py-2.5 rounded-full text-[#111112] font-extrabold text-xs tracking-widest uppercase hover:brightness-110 transition"
        >
          {SITE_CONFIG.brand.ctaText}
        </a>
      </header>

      {/* Hero Section */}
      <section className="relative z-20 min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 max-w-7xl mx-auto pointer-events-none">
        <div className="flex flex-wrap justify-between items-start gap-2 text-xs uppercase tracking-[0.15em] opacity-75">
          <span>{SITE_CONFIG.brand.location}</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D2FF00]" />
            {SITE_CONFIG.brand.statusBadge}
          </span>
        </div>

        <div className="my-auto py-14">
          <p
            style={{ color: isOffTrack ? "#535450" : SITE_CONFIG.theme.accent }}
            className="hero-reveal text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-3"
          >
            {SITE_CONFIG.brand.role}
          </p>
          <h1 className="hero-reveal text-5xl sm:text-7xl md:text-[8.5rem] font-black tracking-tighter leading-[0.88] uppercase">
            {SITE_CONFIG.brand.nameFirst}
            <br />
            <span
              style={{
                WebkitTextStroke: isOffTrack ? "2px #111112" : `2px ${SITE_CONFIG.theme.accent}`,
                color: "transparent",
              }}
            >
              {SITE_CONFIG.brand.nameLast}
            </span>
          </h1>
        </div>

        {/* Telemetry Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-current/15 pointer-events-auto">
          {SITE_CONFIG.telemetry.map((stat, i) => (
            <div key={i} className="p-4 rounded-xl backdrop-blur-md border border-current/10">
              <div className="text-[11px] tracking-[0.12em] uppercase opacity-60">{stat.label}</div>
              <div className="text-2xl md:text-4xl font-black tracking-tight mt-1 flex items-baseline gap-2">
                <span>{stat.value}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#111112] text-[#D2FF00]">
                  {stat.unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Kinetic Ticker Marquee */}
      <div
        style={{ backgroundColor: SITE_CONFIG.theme.accent }}
        className="relative z-20 py-3 text-[#111112] font-black text-sm tracking-[0.2em] uppercase overflow-hidden flex whitespace-nowrap"
      >
        <div className="flex gap-12 animate-marquee">
          {[...SITE_CONFIG.marqueeItems, ...SITE_CONFIG.marqueeItems].map((item, idx) => (
            <span key={idx} className="flex items-center gap-4">
              <span>{item}</span>
              <span>///</span>
            </span>
          ))}
        </div>
      </div>

      {/* Bento Projects Grid */}
      <section id="projects-grid" className="relative z-20 max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase opacity-60">
              {isOffTrack ? "EDUCATION, ROBOTICS & PRECISION CNC" : "AUTOMATION PIPELINES, AI & BI"}
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mt-2">
              {isOffTrack ? "BEYOND THE TERMINAL" : "ENGINEERED FOR ACCURACY"}
            </h2>
          </div>
          <p className="max-w-md text-sm opacity-75">
            Click any card to inspect full technical telemetry, or toggle the mode switch above.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              style={{
                backgroundColor: isOffTrack
                  ? SITE_CONFIG.theme.lightSurface
                  : SITE_CONFIG.theme.darkSurface,
              }}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-current/10 flex flex-col justify-between transition-transform duration-500 hover:-translate-y-2"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span
                  style={{ backgroundColor: SITE_CONFIG.theme.accent }}
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-[11px] font-black text-[#111112] uppercase"
                >
                  {project.metric}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between text-xs font-bold tracking-widest opacity-60 mb-2">
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="text-2xl font-black tracking-tight mb-3">{project.title}</h3>
                  <p className="text-sm opacity-80 leading-relaxed">{project.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-current/10 flex items-center justify-between text-xs font-bold tracking-widest uppercase">
                  <span>INSPECT ARCHITECTURE</span>
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Arsenal / Skills Matrix */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 py-16 border-t border-current/10">
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-10">
          TECHNICAL ARSENAL // TELEMETRY STACK
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SITE_CONFIG.skillsMatrix.map((skillGroup, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-current/15 backdrop-blur-md"
            >
              <h3
                style={{ color: isOffTrack ? "#111112" : SITE_CONFIG.theme.accent }}
                className="text-xs font-black tracking-[0.18em] uppercase mb-4"
              >
                {skillGroup.group}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1 rounded-full text-xs font-semibold border border-current/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Project Modal */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: isOffTrack ? SITE_CONFIG.theme.lightBg : SITE_CONFIG.theme.darkSurface,
            }}
            className="max-w-2xl w-full rounded-2xl p-8 border border-current/20 shadow-2xl"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-bold tracking-widest uppercase opacity-70">
                {selectedProject.category}
              </span>
              <button
                onClick={() => setSelectedProject(null)}
                className="px-3 py-1 rounded-full text-xs font-black bg-[#D2FF00] text-[#111112]"
              >
                CLOSE [X]
              </button>
            </div>
            <h3 className="text-3xl font-black tracking-tight mb-4">{selectedProject.title}</h3>
            <p className="text-sm opacity-85 leading-relaxed mb-6">{selectedProject.description}</p>
            <div className="space-y-2 border-t border-current/15 pt-4">
              <div className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">
                KEY ENGINEERING SPECS:
              </div>
              {selectedProject.highlights?.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-[#D2FF00]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contact Footer */}
      <footer
        id="contact-footer"
        className="relative z-20 border-t border-current/15 px-6 py-20 mt-12"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase opacity-60">
              READY FOR DEPLOYMENT // {SITE_CONFIG.brand.location}
            </span>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase mt-2">
              LET'S BUILD THE NEXT PIPELINE.
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href={`mailto:${SITE_CONFIG.brand.email}`}
              style={{ backgroundColor: SITE_CONFIG.theme.accent }}
              className="px-6 py-3 rounded-full text-[#111112] font-black text-xs tracking-widest uppercase"
            >
              {SITE_CONFIG.brand.email}
            </a>
            <a
              href={`tel:${SITE_CONFIG.brand.phone}`}
              className="px-6 py-3 rounded-full border border-current font-black text-xs tracking-widest uppercase"
            >
              {SITE_CONFIG.brand.phone}
            </a>
            <a
              href={SITE_CONFIG.brand.github}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full border border-current font-black text-xs tracking-widest uppercase"
            >
              GITHUB // ATWISHERE
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
