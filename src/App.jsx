import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Lenis from '@studio-freight/lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, ArrowUpRight, Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// MASTER TEMPLATE CONFIGURATION (SWAP ANY PHOTO URL OR TEXT HERE!)
// ============================================================================
const SITE_CONFIG = {
  brand: {
    firstName: "ABDUL TARIQUE",
    lastName: "WARSI",
    shortCode: "ATW",
    numberCode: "01",
    PreloaderBottomText: "ABDUL TARIQUE WARSI // PORTFOLIO",
    storeBtnText: "RESUME",
    email: "abdultarique5@gmail.com",
    phone: "+91 8770463418",
    github: "https://github.com/ATWISHERE",
    linkedin: "https://www.linkedin.com",
  },

  // --------------------------------------------------------------------------
  // [ZONE 02 & 03]: HERO PORTRAIT & MOUSE-BLOB REVEAL IMAGES (00:12 - 00:31)
  // Replace `basePortrait` with your normal portrait photo, and `helmetReveal`
  // with a second photo (e.g., helmet/cyber-visor edit or robotics lab portrait).
  // --------------------------------------------------------------------------
  hero: {
    basePortrait:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85",
    helmetReveal:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=85",
    widgetTopLabel: "NEXT SPRINT",
    widgetTrackName: "JABALPUR // AI LAB",
    widgetBottomTitle: "STATUS BRIEF",
    widgetBottomSub: "OPEN FOR AI & DATA ROLES",
  },

  // --------------------------------------------------------------------------
  // [ZONE 04]: PARALLAX SIGNATURE SECTION (00:31 - 00:35)
  // --------------------------------------------------------------------------
  signatureSection: {
    marqueeLine1: "WE ENGINEER PRECISION PIPELINES — ZERO SILENT TRUNCATION —",
    marqueeLine2: "100% ALGORITHMIC VALIDATION — FROM 5-AXIS CNC TO AI & ML —",
    subBadge: "AUTOMATION & DATA SCIENCE SINCE 2020",
    centerImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80",
  },

  // --------------------------------------------------------------------------
  // [ZONE 05]: MANIFESTO HIGHLIGHT BLOCK (00:36 - 00:39)
  // --------------------------------------------------------------------------
  manifesto: {
    topLabel: "BHABHA UNIVERSITY // HARVARDX CS109X // GSP BHOPAL",
    // Wrap any word in *asterisks* to color it in #D2FF00 Electric Lime!
    text: "*REDEFINING* AUTOMATION, ENGINEERED FOR *ACCURACY*, BRINGING IT ALL IN PYTHON & AI. DEFINING A *LEGACY* IN DATA SCIENCE ON AND OFF THE *TERMINAL*.",
  },

  // --------------------------------------------------------------------------
  // [ZONE 06]: HORIZONTAL SCATTER TIMELINE GALLERY (00:40 - 00:48)
  // --------------------------------------------------------------------------
  horizontalGallery: [
    {
      id: 1,
      location: "JABALPUR, PRESENT",
      title: "AI & Robotics Educator",
      size: "small",
      grayscale: false,
      image:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 2,
      location: "GLOBAL SKILLS PARK, 2024",
      title: "Most Outstanding Student of the Year",
      size: "medium",
      grayscale: true,
      image:
        "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 3,
      location: "ENTERPRISE PIPELINE, 2026",
      title: "Multi-Threaded PDF & OCR Engine",
      size: "large",
      grayscale: false,
      quote:
        "It doesn't matter how messy the raw dataset is, it's how you engineer the validation pipeline from there.",
      image:
        "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 4,
      location: "AICTE EDUNET, 2025",
      title: "10K+ Rows Crop ML System",
      size: "small",
      grayscale: true,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80",
    },
    {
      id: 5,
      location: "OMEGA RENK BHOPAL, 2024",
      title: "5-Axis DMG MORI (+20% Efficiency)",
      size: "large",
      grayscale: false,
      quote:
        "Since my first experience with precision machining and ITI (90.3% Topper), I've worked tirelessly to turn raw systems into automated intelligence.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    },
  ],

  // --------------------------------------------------------------------------
  // [ZONE 07]: ON TRACK / OFF TRACK SPLIT CHOOSER (00:49 - 00:52)
  // --------------------------------------------------------------------------
  splitChooser: {
    leftCutoutImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=700&q=80",
    rightCutoutImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
    onTrackDesc:
      "Production Python pipelines, PDF OCR extraction, PyAutoGUI bots, and ML telemetry.",
    offTrackDesc:
      "AI & Robotics teaching, 5-Axis CNC machining, drone builds, and high-altitude trails.",
    bannerLeftImage:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80",
    bannerRightImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80",
  },

  // --------------------------------------------------------------------------
  // [ZONE 08]: HALL OF FAME 4-COLUMN HOVER-SWAP GRID (00:53 - 01:13)
  // Each card has `cutoutImg` (default floating object) and `hoverActionImg`
  // (full-bleed photo revealed on mouse hover, matching 00:56 - 01:09!)
  // --------------------------------------------------------------------------
  hallOfFame: {
    titleLine1: "PROJECTS",
    titleLine2: "HALL OF FAME",
    subtitle:
      "From multi-threaded Python OCR extractors to 90%+ accuracy Machine Learning models and 5-axis CNC optimization.",
    items: [
      {
        name: "PDF OCR Pipeline",
        year: "2026",
        offsetDown: false,
        cutoutImg:
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
        hoverActionImg:
          "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "PyAutoGUI Bot",
        year: "2026",
        offsetDown: true,
        cutoutImg:
          "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80",
        hoverActionImg:
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Crop & Soil ML",
        year: "2025",
        offsetDown: false,
        cutoutImg:
          "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
        hoverActionImg:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Sales MIS BI",
        year: "2025",
        offsetDown: true,
        cutoutImg:
          "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80",
        hoverActionImg:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "AI & Robotics Lab",
        year: "2026",
        offsetDown: false,
        cutoutImg:
          "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80",
        hoverActionImg:
          "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "n8n & ADB Scripts",
        year: "2025",
        offsetDown: true,
        cutoutImg:
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
        hoverActionImg:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "5-Axis DMG MORI",
        year: "2024",
        offsetDown: false,
        cutoutImg:
          "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
        hoverActionImg:
          "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "GSP Award & ITI",
        year: "2023",
        offsetDown: true,
        cutoutImg:
          "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80",
        hoverActionImg:
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },

  // --------------------------------------------------------------------------
  // [ZONE 09]: CHAMPION / STORE EDITORIAL SHOWCASE (01:14 - 01:19)
  // --------------------------------------------------------------------------
  championShowcase: {
    tag: "ATW ENGINEERING LAB",
    headingLine1: "TOPPER & AWARD",
    headingLine2: "CHAMPION",
    description:
      "Awarded 'Most Outstanding Student of the Year' at Global Skills Park Bhopal and 90.3% NCVT-MP Board Topper at Govt. Divisional ITI Jabalpur, now building enterprise AI & Python automation.",
    ctaText: "EXPLORE GITHUB REPOS",
    mainRightImage:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=900&q=80",
    floatingCard1:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=80",
    floatingCard2:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80",
  },

  // --------------------------------------------------------------------------
  // [ZONE 10]: PARTNERS & CAMPAIGNS ("COLLABS" GRAFFITI) (01:20 - 01:25)
  // --------------------------------------------------------------------------
  partners: {
    description:
      "Abdul collaborates across education, manufacturing, and AI ecosystems, applying Python, SQL, Power BI, and automation across diverse industries.",
    logos: [
      "PYTHON // PANDAS",
      "HARVARDX CS109X",
      "AICTE EDUNET",
      "OMEGA RENK",
      "GLOBAL SKILLS PARK",
      "BHABHA UNIVERSITY",
      "POWER BI // SQL",
      "PYAUTOGUI // OCR",
    ],
  },

  // --------------------------------------------------------------------------
  // [ZONE 11]: 5-CARD ARCHED SOCIAL FAN DECK (01:26 - 01:35)
  // --------------------------------------------------------------------------
  socialsFan: {
    cards: [
      {
        angle: -14,
        yOffset: 40,
        img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
      },
      {
        angle: -7,
        yOffset: 15,
        img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=600&q=80",
      },
      {
        angle: 0,
        yOffset: 0,
        img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      },
      {
        angle: 7,
        yOffset: 15,
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
      },
      {
        angle: 14,
        yOffset: 40,
        img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      },
    ],
    links: [
      { label: "GITHUB", url: "https://github.com/ATWISHERE" },
      { label: "LINKEDIN", url: "https://www.linkedin.com" },
      { label: "EMAIL", url: "mailto:abdultarique5@gmail.com" },
      { label: "PHONE", url: "tel:+918770463418" },
    ],
  },
};

// ============================================================================
// TOPOGRAPHIC CONTOUR LINES SVG BACKGROUND
// ============================================================================
function TopographicLines({ dark = false }) {
  const stroke = dark ? "rgba(210,255,0,0.08)" : "rgba(17,17,18,0.07)";
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
    >
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
// [ZONE 03 COMPONENT]: HTML5 CANVAS LIQUID-BLOB MOUSE-REVEAL PORTRAIT (00:12-00:31)
// Moving your mouse over the portrait paints a trailing organic blob mask that
// reveals the Helmet/Cyber layer directly aligned over the face!
// ============================================================================
function HeroBlobRevealPortrait() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const pointsRef = useRef([]);
  const mouseRef = useRef({ x: 300, y: 350, targetX: 300, targetY: 350, vx: 0, vy: 0 });
  const imagesRef = useRef({ base: null, reveal: null, loaded: 0 });

  useEffect(() => {
    const baseImg = new Image();
    const revealImg = new Image();
    baseImg.crossOrigin = "anonymous";
    revealImg.crossOrigin = "anonymous";

    const onLoad = () => {
      imagesRef.current.loaded += 1;
    };
    baseImg.onload = onLoad;
    revealImg.onload = onLoad;
    baseImg.src = SITE_CONFIG.hero.basePortrait;
    revealImg.src = SITE_CONFIG.hero.helmetReveal;
    imagesRef.current.base = baseImg;
    imagesRef.current.reveal = revealImg;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Base Portrait
      if (imagesRef.current.base?.complete) {
        ctx.drawImage(imagesRef.current.base, 0, 0, width, height);
      }

      // 2. Age and filter trailing mouse blob points
      const now = performance.now();
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
      pointsRef.current = pointsRef.current.filter((p) => now - p.time < 800);

      // 3. If mouse has moved, mask-in the Helmet/Cyber Reveal Layer
      if (pointsRef.current.length > 0 && imagesRef.current.reveal?.complete) {
        ctx.save();
        ctx.beginPath();
        pointsRef.current.forEach((pt, i) => {
          const age = (now - pt.time) / 650;
          const radius = (1 - age * 0.75) * 115;
          ctx.moveTo(pt.x + radius, pt.y);
          ctx.arc(pt.x, pt.y, Math.max(10, radius), 0, Math.PI * 2);
          // Secondary organic satellite lobe
          ctx.arc(
            pt.x + Math.sin(i) * 35,
            pt.y + Math.cos(i) * 35,
            Math.max(6, radius * 0.65),
            0,
            Math.PI * 2
          );
        });
        ctx.clip();

        // Draw the Helmet/Cyber overlay inside the organic blob mask
        ctx.drawImage(imagesRef.current.reveal, 0, 0, width, height);

        // Draw crisp #D2FF00 telemetry scan accents inside the mask
        ctx.strokeStyle = "#D2FF00";
        ctx.lineWidth = 3;
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
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-[340px] sm:w-[460px] md:w-[540px] h-[440px] sm:h-[580px] md:h-[660px] mx-auto select-none cursor-crosshair"
    >
      {/* Faint 2D Wireframe Helmet Halo Behind Head (Matches 00:00 & 00:12) */}
      <svg
        className="absolute -top-8 left-1/2 -translate-x-1/2 w-[320px] sm:w-[420px] opacity-25 pointer-events-none"
        viewBox="0 0 400 260"
      >
        <ellipse
          cx="200"
          cy="130"
          rx="165"
          ry="110"
          fill="none"
          stroke="#111112"
          strokeWidth="1"
          strokeDasharray="6 4"
        />
        <path
          d="M55,140 Q200,40 345,140 M75,180 Q200,110 325,180"
          fill="none"
          stroke="#111112"
          strokeWidth="1"
        />
      </svg>

      {/* Interactive Blob-Mask Canvas */}
      <canvas
        ref={canvasRef}
        width={600}
        height={720}
        className="w-full h-full object-cover rounded-t-[180px] shadow-2xl"
      />

      {/* Helper Badge */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#111112]/80 text-[#D2FF00] text-[10px] font-bold tracking-widest uppercase backdrop-blur-md pointer-events-none">
        MOVE CURSOR OVER PORTRAIT TO REVEAL HELMET LAYER
      </div>
    </div>
  );
}

// ============================================================================
// MAIN 12-ZONE APPLICATION
// ============================================================================
export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredHallIndex, setHoveredHallIndex] = useState(null);

  const mainWrapperRef = useRef(null);
  const sigPathRef = useRef(null);
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);
  const gallerySectionRef = useRef(null);
  const galleryTrackRef = useRef(null);
  const fanDeckRef = useRef(null);

  
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

  // [ZONE 01]: Neon Lime Preloader Timer (00:01 - 00:11)
  useEffect(() => {
    const timer = setTimeout(() => {
      setPreloaderDone(true);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  // GSAP Scroll Choreography for Zones 04, 06, 08
  useEffect(() => {
    if (!preloaderDone) return;
    const ctx = gsap.context(() => {
      // [ZONE 04]: Draw Neon Signature on Scroll (00:32 - 00:35)
      if (sigPathRef.current) {
        const length = sigPathRef.current.getTotalLength();
        gsap.set(sigPathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(sigPathRef.current, {
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
        }
      }

      // [ZONE 06]: Pinned Horizontal Scatter Gallery + Dark-to-Cream Shift (00:40 - 00:48)
      if (fanDeckRef.current) {
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
      
      if (gallerySectionRef.current && galleryTrackRef.current) {
        gsap.to(galleryTrackRef.current, {
          xPercent: -62,
          ease: "none",
          scrollTrigger: {
            trigger: gallerySectionRef.current,
            start: "top top",
            end: "+=2200",
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
              // Flip background from Dark Olive (#1E2118) to Cream (#F4F4ED) at 45% scroll (00:44)
              if (self.progress > 0.45) {
                gallerySectionRef.current.style.backgroundColor = "#F4F4ED";
                gallerySectionRef.current.style.color = "#111112";
              } else {
                gallerySectionRef.current.style.backgroundColor = "#1E2118";
                gallerySectionRef.current.style.color = "#F4F4ED";
              }
            },
          },
        });
      }
    }, mainWrapperRef);

    return () => ctx.revert();
  }, [preloaderDone]);

  // Helper to render Manifesto text with #D2FF00 highlighted words
  const renderManifestoText = (raw) => {
    return raw.split(" ").map((word, i) => {
      if (word.startsWith("*") && word.endsWith("*")) {
        const clean = word.replace(/\*/g, "");
        return (
          <span key={i} className="text-[#D2FF00] font-serif italic font-normal">
            {clean}{" "}
          </span>
        );
      }
      return <span key={i}>{word} </span>;
    });
  };

  return (
    <div
      ref={mainWrapperRef}
      className="bg-[#F4F4ED] text-[#111112] font-sans  selection:bg-[#D2FF00] selection:text-[#111112]"
    >
      {/* =====================================================================
          [ZONE 01]: NEON LIME PRELOADER CURTAIN (00:01 - 00:11)
      ===================================================================== */}
      <div
        className={`fixed inset-0 z-50 bg-[#D2FF00] flex flex-col items-center justify-between py-10 transition-transform duration-1000 ease-in-out ${preloaderDone ? "-translate-y-full pointer-events-none" : "translate-y-0"
          }`}
      >
        <div />
        {/* Animated Geometric Center Logo */}
        <div className="relative flex items-center justify-center">
          <svg className="w-24 h-24 animate-pulse" viewBox="0 0 100 100">
            <path
              d="M20,75 L20,25 L45,25 L45,55 L80,25 L80,75"
              fill="none"
              stroke="#111112"
              strokeWidth="9"
              strokeLinecap="square"
            />
          </svg>
        </div>
        <div className="text-[11px] font-black tracking-[0.25em] uppercase text-[#111112]">
          {SITE_CONFIG.brand.PreloaderBottomText}
        </div>
      </div>

      {/* =====================================================================
          [ZONE 02]: FIXED TOP HUD & BOTTOM-LEFT WIREFRAME WIDGET (00:00 - 01:44)
      ===================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-5 flex items-start justify-between pointer-events-none">
        {/* Top-Left Stacked Brand Name */}
        <a
          href="#top"
          className="pointer-events-auto font-black text-xl md:text-2xl leading-[0.88] tracking-tighter uppercase mix-blend-difference text-white"
        >
          {SITE_CONFIG.brand.firstName}
          <br />
          {SITE_CONFIG.brand.lastName}
        </a>

        {/* Top-Center Geometric Monogram */}
        <div className="hidden md:flex items-center justify-center font-black text-xl tracking-tighter mix-blend-difference text-white">
          [{SITE_CONFIG.brand.shortCode}]
        </div>

        {/* Top-Right STORE Pill + Hamburger Button */}
        <div className="pointer-events-auto flex items-center gap-2.5">
          <a
            href="#zone-09-store"
            className="flex items-center gap-2 bg-[#D2FF00] text-[#111112] px-4 py-2.5 rounded-xl font-black text-xs tracking-wider uppercase shadow-md hover:scale-105 transition"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{SITE_CONFIG.brand.storeBtnText}</span>
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 rounded-xl bg-[#F4F4ED] border border-[#111112]/20 flex items-center justify-center text-[#111112] hover:bg-[#D2FF00] transition cursor-pointer"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Full-Screen Menu Curtain Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-[#111112] text-[#F4F4ED] flex flex-col justify-center items-center gap-6 text-4xl md:text-6xl font-black uppercase tracking-tighter">
          <a href="#top" onClick={() => setMenuOpen(false)} className="hover:text-[#D2FF00]">
            01 // HERO PORTRAIT
          </a>
          <a href="#zone-06-gallery" onClick={() => setMenuOpen(false)} className="hover:text-[#D2FF00]">
            02 // TIMELINE ARCHIVE
          </a>
          <a href="#zone-08-hall" onClick={() => setMenuOpen(false)} className="hover:text-[#D2FF00]">
            03 // PROJECTS HALL OF FAME
          </a>
          <a href="#zone-12-footer" onClick={() => setMenuOpen(false)} className="hover:text-[#D2FF00]">
            04 // CONTACT & LINKS
          </a>
        </div>
      )}

      {/* Bottom-Left Fixed 2D Track Wireframe & Helmet Widget (00:00 - 00:30) */}
      <div className="fixed bottom-5 left-5 z-30 hidden lg:flex flex-col gap-2 w-36 pointer-events-auto">
        <div className="bg-[#F4F4ED]/90 backdrop-blur-md border border-[#111112]/15 rounded-xl p-3 text-center shadow-sm hover:border-[#111112] transition">
          <div className="text-[9px] font-bold tracking-widest uppercase opacity-60 mb-1">
            {SITE_CONFIG.hero.widgetTopLabel}
          </div>
          {/* 2D Circuit Wireframe SVG */}
          <svg className="w-20 h-10 mx-auto my-1" viewBox="0 0 120 60">
            <path
              d="M15,40 C10,20 40,15 65,25 C90,35 110,15 105,35 C100,50 45,45 15,40 Z"
              fill="none"
              stroke="#111112"
              strokeWidth="2"
            />
          </svg>
          <div className="text-[10px] font-black uppercase tracking-wider">
            {SITE_CONFIG.hero.widgetTrackName}
          </div>
        </div>

        <a
          href="#zone-08-hall"
          className="bg-[#F4F4ED]/90 backdrop-blur-md border border-[#111112]/15 rounded-xl p-3 text-center shadow-sm hover:bg-[#D2FF00] transition"
        >
          <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-[#111112] text-[#D2FF00] flex items-center justify-center font-black text-xs">
            {SITE_CONFIG.brand.shortCode}
          </div>
          <div className="text-[9px] font-black uppercase tracking-wider leading-tight">
            {SITE_CONFIG.hero.widgetBottomTitle}
          </div>
          <div className="text-[8px] opacity-70 uppercase mt-0.5">
            {SITE_CONFIG.hero.widgetBottomSub}
          </div>
        </a>
      </div>

      {/* =====================================================================
          [ZONE 03]: HERO X-RAY HELMET BLOB-MASK PORTRAIT (00:12 - 00:31)
      ===================================================================== */}
      <section
        id="top"
        className="relative min-h-screen pt-24 flex flex-col justify-end items-center overflow-hidden bg-[#F4F4ED]"
      >
        <TopographicLines dark={false} />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
          <HeroBlobRevealPortrait />
        </div>
      </section>

      {/* =====================================================================
          [ZONE 04]: PARALLAX SIGNATURE & SCROLLING TEXT (00:31 - 00:35)
      ===================================================================== */}
      <section
        id="zone-04-signature"
        className="relative min-h-screen bg-[#1E2118] text-[#F4F4ED] flex flex-col items-center justify-center py-28 overflow-hidden"
      >
        <TopographicLines dark={true} />

        {/* Top Mini Monogram */}
        <div className="relative z-10 text-center mb-8">
          <div className="text-[#D2FF00] font-black text-lg tracking-tighter">
            [{SITE_CONFIG.brand.shortCode}]
          </div>
          <div className="text-[10px] tracking-[0.25em] uppercase opacity-70 mt-1">
            {SITE_CONFIG.signatureSection.subBadge}
          </div>
        </div>

        {/* Giant Background Scrolling Text Behind Center Portrait */}
        <div className="relative w-full flex items-center justify-center my-6">
          <div className="absolute inset-x-0 flex flex-col gap-2 pointer-events-none select-none opacity-85">
            <div className="whitespace-nowrap text-5xl md:text-7xl font-black uppercase tracking-tighter text-[#F4F4ED]/90 animate-marquee">
              {SITE_CONFIG.signatureSection.marqueeLine1}{" "}
              {SITE_CONFIG.signatureSection.marqueeLine1}
            </div>
            <div
              style={{ WebkitTextStroke: "1.5px #F4F4ED", color: "transparent" }}
              ref={marquee2Ref} className="whitespace-nowrap text-5xl md:text-7xl font-black uppercase tracking-tighter"
            >
              {SITE_CONFIG.signatureSection.marqueeLine2}{" "}
              {SITE_CONFIG.signatureSection.marqueeLine2}
            </div>
          </div>

          {/* Center Framed Portrait */}
          <div className="relative z-10 w-72 sm:w-96 h-80 sm:h-[420px] rounded-xl overflow-hidden shadow-2xl border border-white/10">
            <img
              src={SITE_CONFIG.signatureSection.centerImage}
              alt="Portrait"
              className="w-full h-full object-cover grayscale contrast-125"
            />
          </div>

          {/* Self-Drawing Neon #D2FF00 Handwritten Signature SVG (00:32 - 00:35) */}
          <svg
            className="absolute z-20 w-[340px] sm:w-[560px] h-64 pointer-events-none"
            viewBox="0 0 600 260"
          >
            <path
              ref={sigPathRef}
              d="M60,210 C140,60 220,220 290,90 C330,20 350,190 410,110 C460,45 490,150 550,60 M210,150 L490,120"
              fill="none"
              stroke="#D2FF00"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* =====================================================================
          [ZONE 05]: MANIFESTO STATEMENT BLOCK (00:36 - 00:39)
      ===================================================================== */}
      <section className="relative bg-[#1E2118] text-[#F4F4ED] py-28 px-6 text-center overflow-hidden">
        <TopographicLines dark={true} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#D2FF00] mb-6">
            (( {SITE_CONFIG.manifesto.topLabel} ))
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[0.95]">
            {renderManifestoText(SITE_CONFIG.manifesto.text)}
          </h2>
        </div>
      </section>

      {/* =====================================================================
          [ZONE 06]: PINNED HORIZONTAL TIMELINE GALLERY (00:40 - 00:48)
          Automatically transitions from Dark Olive (#1E2118) to Cream (#F4F4ED)!
      ===================================================================== */}
      <section
        id="zone-06-gallery"
        ref={gallerySectionRef}
        style={{ backgroundColor: "#1E2118", color: "#F4F4ED" }}
        className="relative h-screen w-full overflow-hidden flex items-center transition-colors duration-700"
      >
        <TopographicLines dark={false} />
        <div
          ref={galleryTrackRef}
          className="flex items-center gap-16 px-16 md:px-32 w-max"
        >
          {SITE_CONFIG.horizontalGallery.map((item) => (
            <div key={item.id} className="flex items-center gap-12">
              <div
                className={`group relative shrink-0 ${item.size === "large"
                    ? "w-[340px] md:w-[480px]"
                    : item.size === "medium"
                      ? "w-[260px] md:w-[340px] translate-y-12"
                      : "w-[220px] md:w-[280px] -translate-y-10"
                  }`}
              >
                <div className="text-[10px] font-bold tracking-widest uppercase opacity-70 mb-2">
                  {item.location} — {item.title}
                </div>
                <div className="overflow-hidden rounded-lg shadow-xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-72 md:h-96 object-cover transition-all duration-700 group-hover:scale-105 ${item.grayscale ? "grayscale group-hover:grayscale-0" : ""
                      }`}
                  />
                </div>
              </div>

              {item.quote && (
                <div className="w-72 md:w-96 shrink-0">
                  <p className="text-xl md:text-2xl font-serif italic leading-snug">
                    "{item.quote}"
                  </p>
                  <div className="mt-3 text-[#D2FF00] font-black text-sm tracking-widest uppercase">
                    — {SITE_CONFIG.brand.shortCode}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          [ZONE 07]: ON TRACK / OFF TRACK FACE-TO-FACE SPLIT CHOOSER (00:49 - 00:52)
      ===================================================================== */}
      <section className="relative bg-[#F4F4ED] text-[#111112] pt-24 overflow-hidden">
        <TopographicLines dark={false} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 pb-20">
          {/* Left Side Profile Cutout (Helmet / Tech) */}
          <div className="lg:col-span-3 flex justify-center">
            <img
              src={SITE_CONFIG.splitChooser.leftCutoutImage}
              alt="On Track Profile"
              className="w-56 md:w-72 h-72 object-cover rounded-full shadow-xl border-4 border-[#D2FF00]"
            />
          </div>

          {/* Center Dual Columns: ON TRACK vs OFF TRACK */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-10 text-center">
            {/* ON TRACK */}
            <div className="flex flex-col items-center">
              <div className="relative inline-block">
                <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.88]">
                  ON
                  <br />
                  TRACK
                </h3>
                {/* Neon Scribble Overlay */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 200 120"
                >
                  <path
                    d="M20,95 L110,20 L90,100 L180,25"
                    fill="none"
                    stroke="#D2FF00"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="text-xs opacity-75 max-w-xs mt-4 mb-6">
                {SITE_CONFIG.splitChooser.onTrackDesc}
              </p>
              <a
                href="#zone-08-hall"
                className="w-11 h-11 rounded-xl bg-[#D2FF00] text-[#111112] flex items-center justify-center hover:scale-110 transition shadow-md"
              >
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>

            {/* OFF TRACK */}
            <div className="flex flex-col items-center">
              <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.88]">
                OFF
                <br />
                TRACK
              </h3>
              <p className="text-xs opacity-75 max-w-xs mt-4 mb-6">
                {SITE_CONFIG.splitChooser.offTrackDesc}
              </p>
              <a
                href="#zone-08-hall"
                className="w-11 h-11 rounded-xl bg-[#D2FF00] text-[#111112] flex items-center justify-center hover:scale-110 transition shadow-md"
              >
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Side Profile Cutout (Personal Portrait) */}
          <div className="lg:col-span-3 flex justify-center">
            <img
              src={SITE_CONFIG.splitChooser.rightCutoutImage}
              alt="Off Track Profile"
              className="w-56 md:w-72 h-72 object-cover rounded-full shadow-xl border-4 border-[#111112]"
            />
          </div>
        </div>

        {/* Full-Bleed 2-Column Split Banner (00:51 - 00:52) */}
        <div className="grid grid-cols-1 md:grid-cols-2 h-[360px] md:h-[480px]">
          <img
            src={SITE_CONFIG.splitChooser.bannerLeftImage}
            alt="Left Split"
            className="w-full h-full object-cover"
          />
          <img
            src={SITE_CONFIG.splitChooser.bannerRightImage}
            alt="Right Split"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* =====================================================================
          [ZONE 08]: HELMETS / PROJECTS HALL OF FAME GRID (00:53 - 01:13)
          Hovering any cell turns border #D2FF00 and swaps cutout for full photo!
      ===================================================================== */}
      <section
        id="zone-08-hall"
        className="relative bg-[#111112] text-[#F4F4ED] py-28 px-6"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] block-wipe" style={{clipPath: "inset(0 100% 0 0)"}}>
              {SITE_CONFIG.hallOfFame.titleLine1}
              <br />
              <span className="font-serif italic font-normal text-[#D2FF00]">
                {SITE_CONFIG.hallOfFame.titleLine2}
              </span>
            </h2>
            <p className="max-w-sm text-xs opacity-75 leading-relaxed">
              {SITE_CONFIG.hallOfFame.subtitle}
            </p>
          </div>

          {/* 4-Column Staggered Interactive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SITE_CONFIG.hallOfFame.items.map((item, idx) => {
              const isHovered = hoveredHallIndex === idx;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredHallIndex(idx)}
                  onMouseLeave={() => setHoveredHallIndex(null)}
                  className={`relative h-80 rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer flex flex-col justify-between p-5 ${item.offsetDown ? "lg:translate-y-12" : ""
                    } ${isHovered
                      ? "border-[#D2FF00] shadow-[0_0_25px_rgba(210,255,0,0.25)]"
                      : "border-white/10 bg-[#18191A]"
                    }`}
                >
                  {/* Default Floating Cutout vs Full-Bleed Action Photo on Hover */}
                  {isHovered ? (
                    <img
                      src={item.hoverActionImg}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="my-auto flex items-center justify-center">
                      <img
                        src={item.cutoutImg}
                        alt={item.name}
                        className="w-40 h-40 object-cover rounded-full shadow-lg transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Bottom-Right Label */}
                  <div className="relative z-10 mt-auto flex justify-end items-baseline gap-1.5 text-xs bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded self-end">
                    <span className="font-bold text-white">{item.name}</span>
                    <span className="font-black text-[#D2FF00]">{item.year}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA Block (01:08 - 01:13) */}
          <div className="mt-32 text-center flex flex-col items-center">
            <div className="text-[#D2FF00] text-xs font-black tracking-widest uppercase mb-3">
              (( TELEMETRY ARCHIVE ))
            </div>
            <p className="text-xl md:text-2xl font-serif max-w-md mb-6">
              See more automation pipelines and highlights from Abdul on the track
            </p>
            <a
              href={SITE_CONFIG.brand.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#D2FF00] text-[#111112] px-6 py-3 rounded-xl font-black text-xs tracking-widest uppercase hover:scale-105 transition"
            >
              <span>VIEW ON GITHUB</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================================
          [ZONE 09]: CHAMPION / STORE SHOWCASE (01:14 - 01:19)
      ===================================================================== */}
      <section
        id="zone-09-store"
        className="relative bg-[#F4F4ED] text-[#111112] py-28 px-6 overflow-hidden"
      >
        <TopographicLines dark={false} />
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Editorial Column */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-70 mb-3">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{SITE_CONFIG.championShowcase.tag}</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.88] mb-6">
              {SITE_CONFIG.championShowcase.headingLine1}
              <br />
              <span className="font-serif italic font-normal">
                {SITE_CONFIG.championShowcase.headingLine2}
              </span>
            </h2>
            <p className="text-sm opacity-80 leading-relaxed mb-8 max-w-md">
              {SITE_CONFIG.championShowcase.description}
            </p>
            <a
              href={SITE_CONFIG.brand.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#D2FF00] text-[#111112] px-6 py-3.5 rounded-xl font-black text-xs tracking-widest uppercase shadow-md hover:scale-105 transition"
            >
              <span>{SITE_CONFIG.championShowcase.ctaText}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {/* Floating Mini Product/Tool Cards */}
            <div className="mt-12 flex gap-6">
              <img
                src={SITE_CONFIG.championShowcase.floatingCard1}
                alt="Tool Card 1"
                className="w-36 h-44 object-cover rounded-xl shadow-lg border border-black/10"
              />
              <img
                src={SITE_CONFIG.championShowcase.floatingCard2}
                alt="Tool Card 2"
                className="w-36 h-44 object-cover rounded-xl shadow-lg border border-black/10 translate-y-8"
              />
            </div>
          </div>

          {/* Right Visual Collage + Gold Badge + Metallic LN1/ATW1 */}
          <div className="lg:col-span-7 relative">
            <img
              src={SITE_CONFIG.championShowcase.mainRightImage}
              alt="Champion Feature"
              className="w-full max-w-lg mx-auto h-[500px] object-cover rounded-2xl shadow-2xl"
            />
            {/* Gold Foil Plaque Card */}
            <div className="hidden sm:flex absolute top-12 -right-4 w-60 h-36 rounded-xl bg-gradient-to-br from-amber-300 via-yellow-500 to-amber-700 p-5 flex-col justify-center items-center text-[#111112] shadow-2xl">
              <span className="font-serif italic text-3xl">Champion</span>
              <span className="text-[10px] font-black tracking-[0.25em] uppercase mt-1">
                90.3% TOPPER // GSP AWARD
              </span>
            </div>
            {/* Metallic ATW1 / LN1 Graphic */}
            <div className="absolute -bottom-8 right-12 bg-[#111112] text-[#D2FF00] px-6 py-3 rounded-xl font-black text-4xl tracking-tighter shadow-xl border-2 border-[#D2FF00]">
              {SITE_CONFIG.brand.shortCode}
              {SITE_CONFIG.brand.numberCode}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          [ZONE 10]: PARTNERS & CAMPAIGNS ("COLLABS" GRAFFITI) (01:20 - 01:25)
      ===================================================================== */}
      <section className="relative bg-[#F4F4ED] text-[#111112] py-28 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center mb-24 gap-8">
            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.88]">
                PARTNERS
                <br />
                <span className="font-serif italic font-normal">&amp; CAMPAIGNS</span>
              </h2>
            </div>

            {/* Giant Diagonal #D2FF00 Graffiti "Collabs" Script Overlay */}
            <svg
              className="absolute -left-6 -top-10 w-[360px] md:w-[520px] pointer-events-none z-0 opacity-90"
              viewBox="0 0 500 220"
            >
              <text
                x="20"
                y="160"
                transform="rotate(-14 200 100)"
                fill="#D2FF00"
                fontSize="115"
                fontWeight="900"
                fontStyle="italic"
              >
                Collabs
              </text>
            </svg>

            <p className="relative z-10 max-w-sm text-xs opacity-80 leading-relaxed">
              {SITE_CONFIG.partners.description}
            </p>
          </div>

          {/* Partner Logo Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 items-center pt-8 border-t border-black/10">
            {SITE_CONFIG.partners.logos.map((logo, i) => (
              <div
                key={i}
                className="text-center font-black text-xs tracking-widest uppercase py-3 px-2 rounded border border-black/10 hover:bg-[#D2FF00] transition"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          [ZONE 11]: WHAT'S UP ON SOCIALS — 5-CARD ARCHED FAN DECK (01:26 - 01:35)
      ===================================================================== */}
      <section className="relative bg-gradient-to-b from-[#F4F4ED] via-[#F4F4ED] to-[#D2FF00]/60 text-[#111112] pt-24 pb-28 px-6 text-center overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs font-black uppercase tracking-widest opacity-60 mb-2">
            (( LIVE FEED ))
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.88] mb-16">
            WHAT'S UP
            <br />
            <span className="font-serif italic font-normal">ON SOCIALS</span>
          </h2>

          {/* 5 Fanned/Arched Cards */}
          <div className="flex justify-center items-center -space-x-6 sm:-space-x-10 my-12 py-10">
            {SITE_CONFIG.socialsFan.cards.map((card, idx) => (
              <div
                key={idx}
                style={{
                  transform: `rotate(${card.angle}deg) translateY(${card.yOffset}px)`,
                }}
                className="w-40 sm:w-56 md:w-64 h-64 sm:h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transition-all duration-300 hover:-translate-y-6 hover:scale-105 hover:z-30 cursor-pointer"
              >
                <img
                  src={card.img}
                  alt={`Social ${idx}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <p className="text-xl font-serif italic mt-12 mb-4">
            Connect with Abdul across platforms
          </p>
          <div className="flex justify-center gap-6 text-xs font-black tracking-widest uppercase">
            {SITE_CONFIG.socialsFan.links.map((lnk, i) => (
              <a
                key={i}
                href={lnk.url}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                {lnk.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          [ZONE 12]: NOTCHED DARK CARBON CURTAIN FOOTER (01:36 - 01:44)
      ===================================================================== */}
      <footer
        id="zone-12-footer"
        className="relative bg-[#181A14] text-[#F4F4ED] pt-24 rounded-t-[48px] overflow-hidden"
      >
        <TopographicLines dark={true} />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Top Signature + Slogan */}
          <div className="text-center mb-12">
            <div className="text-[#D2FF00] font-serif italic text-3xl mb-1">
              {SITE_CONFIG.brand.firstName}
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
              ALWAYS <span className="font-serif italic font-normal">BRINGING</span>
              <br />
              THE <span className="text-[#D2FF00]">ACCURACY.</span>
            </h2>
          </div>

          {/* 3-Column Footer Stage (Left Pages, Center Helmet/Bust Cutout, Right Socials) */}
          <div className="grid grid-cols-1 md:grid-cols-12 items-end gap-8 pt-6">
            {/* Left Column: PAGES */}
            <div className="md:col-span-3 text-center md:text-left pb-12">
              <div className="text-[10px] font-bold tracking-widest uppercase opacity-50 mb-3">
                PAGES
              </div>
              <ul className="space-y-1 text-2xl font-black uppercase tracking-tight">
                <li><a href="#top" className="hover:text-[#D2FF00]">HOME</a></li>
                <li><a href="#zone-08-hall" className="hover:text-[#D2FF00]">ON TRACK</a></li>
                <li><a href="#zone-06-gallery" className="hover:text-[#D2FF00]">OFF TRACK</a></li>
                <li><a href="#zone-09-store" className="hover:text-[#D2FF00]">PROJECTS</a></li>
              </ul>
            </div>

            {/* Center Bust Cutout + Business Enquiries Pill */}
            <div className="md:col-span-6 relative flex flex-col items-center">
              <img
                src={SITE_CONFIG.hero.basePortrait}
                alt="Footer Cutout"
                className="w-72 sm:w-80 h-80 sm:h-96 object-cover rounded-t-full border-t-4 border-[#D2FF00] shadow-2xl"
              />
              <a
                href={`mailto:${SITE_CONFIG.brand.email}`}
                className="absolute bottom-6 inline-flex items-center gap-2 bg-[#D2FF00] text-[#111112] px-5 py-2.5 rounded-xl font-black text-xs tracking-widest uppercase shadow-xl hover:scale-105 transition"
              >
                <span>BUSINESS ENQUIRIES</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Right Column: FOLLOW ON */}
            <div className="md:col-span-3 text-center md:text-right pb-12">
              <div className="text-[10px] font-bold tracking-widest uppercase opacity-50 mb-3">
                FOLLOW ON
              </div>
              <ul className="space-y-1 text-2xl font-black uppercase tracking-tight">
                <li>
                  <a href={SITE_CONFIG.brand.github} target="_blank" rel="noreferrer" className="hover:text-[#D2FF00]">
                    GITHUB
                  </a>
                </li>
                <li>
                  <a href={SITE_CONFIG.brand.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#D2FF00]">
                    LINKEDIN
                  </a>
                </li>
                <li>
                  <a href={`mailto:${SITE_CONFIG.brand.email}`} className="hover:text-[#D2FF00]">
                    EMAIL
                  </a>
                </li>
                <li>
                  <a href={`tel:${SITE_CONFIG.brand.phone}`} className="hover:text-[#D2FF00]">
                    PHONE
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Solid #D2FF00 Bottom Copyright Bar (01:38 - 01:44) */}
        <div className="bg-[#D2FF00] text-[#111112] px-6 py-3 flex flex-col sm:flex-row justify-between items-center text-[11px] font-bold tracking-wider uppercase">
          <span>© 2026 {SITE_CONFIG.brand.firstName} {SITE_CONFIG.brand.lastName}. ALL RIGHTS RESERVED.</span>
          <span>JABALPUR &amp; BHOPAL, MP // PRIVACY &amp; TELEMETRY</span>
        </div>
      </footer>
    </div>
  );
}