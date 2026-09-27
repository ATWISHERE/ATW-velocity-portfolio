
(function() {
  const PORTRAIT_URL    = "./public/photos/hero-new-portrait.png?v=1790451769";
  const SIG_URL         = "./public/photos/atw-signature-lime.png?v=1790451769";
  const REAL_PHOTOS     = ["./public/gallery/1.jpeg", "./public/gallery/2.jpeg", "./public/gallery/3.jpeg", "./public/gallery/4.jpeg", "./public/gallery/5.jpeg", "./public/gallery/6.jpeg", "./public/gallery/7.jpg", "./public/gallery/8.jpg", "./public/gallery/9.jpg", "./public/gallery/10.jpg", "./public/gallery/11.jpg", "./public/gallery/12.jpg", "./public/gallery/13.jpg", "./public/gallery/14.png", "./public/gallery/15.png"];
  const PROJ_SHOTS      = ["./public/projects/project-1-ocr.png", "./public/projects/project-2-pyautogui.png", "./public/projects/project-3-crop-ml.png", "./public/projects/project-4-powerbi.png", "./public/projects/project-5-robotics.png", "./public/projects/project-6-n8n-adb.png", "./public/projects/project-7-cnc.png", "./public/projects/project-8-awards.png"];
  const SKILL_TREE_HTML = "\n<style>\n  #atw-page3-skill-tree {\n    position: relative !important; width: 100%; background: #262922; color: #F4F4ED;\n    font-family: 'Inter', system-ui, -apple-system, sans-serif;\n    padding: 72px 24px 84px 24px; overflow: hidden; z-index: 25 !important;\n    border-top: 1px solid rgba(210,255,0,0.14); border-bottom: 1px solid rgba(210,255,0,0.14);\n  }\n  #atw-page3-skill-tree .st-topo {\n    position: absolute; inset: 0; opacity: 0.07; pointer-events: none;\n    background-image: repeating-radial-gradient(circle at 50% 28%, transparent 0, transparent 38px, #D2FF00 39px, transparent 40px);\n  }\n  #atw-page3-skill-tree .st-obj-wrap {\n    position: relative; z-index: 2; max-width: 1120px; margin: 0 auto 40px auto; text-align: center;\n  }\n  #atw-page3-skill-tree .st-obj-tag {\n    display: inline-block; font-size: 11px; font-weight: 800; letter-spacing: 2.5px; color: #D2FF00;\n    border: 1px solid rgba(210,255,0,0.45); padding: 6px 16px; border-radius: 99px; margin-bottom: 16px;\n    text-transform: uppercase; background: rgba(24,26,20,0.65);\n  }\n  #atw-page3-skill-tree .st-obj-title {\n    font-size: clamp(26px, 3.5vw, 50px); font-weight: 900; line-height: 1.06;\n    letter-spacing: -1px; text-transform: uppercase; color: #F4F4ED;\n  }\n  #atw-page3-skill-tree .st-obj-title .st-serif {\n    font-family: 'Georgia', serif; font-weight: 400; font-style: italic; color: #D2FF00;\n  }\n  #atw-page3-skill-tree .st-tree-wrap {\n    position: relative; z-index: 2; max-width: 1380px; margin: 0 auto;\n    display: flex; flex-direction: column; align-items: center;\n  }\n  #atw-page3-skill-tree .st-me-node {\n    position: relative; width: 118px; height: 118px; border-radius: 50%;\n    background-color: #181A14;\n    background-image: url(\"./public/photos/hero-new-portrait.png?v=1790451769\");\n    background-size: cover; background-position: 50% 15%;\n    filter: grayscale(100%) contrast(1.16);\n    border: 3px solid #D2FF00;\n    box-shadow: 0 0 35px rgba(210,255,0,0.28);\n    display: flex; align-items: center; justify-content: center;\n    z-index: 5; overflow: hidden; transition: transform 0.25s ease;\n  }\n  #atw-page3-skill-tree .st-me-node:hover { transform: scale(1.08); }\n  #atw-page3-skill-tree .st-me-node img {\n    width: 100% !important; height: 100% !important; object-fit: cover !important; object-position: 50% 15% !important;\n    display: block !important; opacity: 1 !important; visibility: visible !important; pointer-events: none;\n  }\n  #atw-page3-skill-tree .st-branches {\n    width: 100%; height: 95px; margin-top: -8px; margin-bottom: -4px; overflow: visible; z-index: 3;\n  }\n  #atw-page3-skill-tree .st-grid {\n    display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; width: 100%; z-index: 4; align-items: stretch;\n  }\n  @media (max-width: 720px) { #atw-page3-skill-tree .st-grid { grid-template-columns: 1fr; } }\n  #atw-page3-skill-tree .st-col { display: flex; flex-direction: column; align-items: center; }\n  #atw-page3-skill-tree .st-head {\n    width: 100%; background: #181A14; border: 2px solid #3D4235; border-radius: 14px;\n    padding: 16px 10px; text-align: center; transition: 0.25s ease;\n  }\n  #atw-page3-skill-tree .st-col:hover .st-head {\n    border-color: #D2FF00; background: #20241A; transform: translateY(-4px);\n    box-shadow: 0 10px 28px rgba(210,255,0,0.15);\n  }\n  #atw-page3-skill-tree .st-ptitle {\n    font-size: clamp(14px, 1.4vw, 20px); min-height: 28px; display: flex;\n    align-items: center; justify-content: center; font-weight: 900; color: #F4F4ED;\n    letter-spacing: -0.4px; text-transform: uppercase;\n  }\n  #atw-page3-skill-tree .st-arrow {\n    color: #D2FF00; font-size: 20px; font-weight: 900; margin: 8px 0;\n  }\n  #atw-page3-skill-tree .st-card {\n    width: 100%; background: rgba(20, 22, 16, 0.92); border: 1px solid #34382C;\n    border-radius: 14px; padding: 16px 14px; flex: 1; display: flex; flex-direction: column; gap: 14px;\n    transition: border-color 0.25s ease;\n  }\n  #atw-page3-skill-tree .st-col:hover .st-card { border-color: rgba(210,255,0,0.55); }\n  #atw-page3-skill-tree .st-tier-title {\n    font-size: 10px; font-weight: 800; letter-spacing: 1.4px; color: #D2FF00;\n    text-transform: uppercase; margin-bottom: 7px; border-bottom: 1px solid #2B2F24; padding-bottom: 4px;\n  }\n  #atw-page3-skill-tree .st-tags { display: flex; flex-wrap: wrap; gap: 6px; }\n  #atw-page3-skill-tree .st-tag {\n    background: #23271E; color: #E6E6DC; border: 1px solid #3A3F32;\n    padding: 5px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; line-height: 1.2;\n    transition: 0.18s ease;\n  }\n  #atw-page3-skill-tree .st-col:hover .st-tag:hover {\n    background: #D2FF00; color: #111112; border-color: #D2FF00; transform: translateY(-1px);\n  }\n</style>\n\n<div class=\"st-topo\"></div>\n<div class=\"st-obj-wrap\">\n  <div class=\"st-obj-tag\"></div>\n  <div class=\"st-obj-title\">\n    <span class=\"st-serif\">REDEFINING</span> LIMITS, FIGHTING FOR <span class=\"st-serif\">ACCURACY</span><br>\n    THROUGH ACHIEVING <span class=\"st-serif\">PRECISION</span> IN AI, ROBOTICS<br>\n    AND DATA SCIENCE.\n  </div>\n</div>\n<div class=\"st-tree-wrap\">\n  <div class=\"st-me-node\">\n    <img src=\"./public/photos/hero-new-portrait.png?v=1790451769\" alt=\"Abdul Tarique Warsi\" />\n  </div>\n  <svg class=\"st-branches\" viewBox=\"0 0 1000 95\" preserveAspectRatio=\"none\">\n    <path d=\"M 500 4 C 500 48, 125 40, 125 90\" fill=\"none\" stroke=\"#D2FF00\" stroke-width=\"2.4\" opacity=\"0.8\"/>\n    <path d=\"M 500 4 C 500 48, 375 40, 375 90\" fill=\"none\" stroke=\"#D2FF00\" stroke-width=\"2.4\" opacity=\"0.8\"/>\n    <path d=\"M 500 4 C 500 48, 625 40, 625 90\" fill=\"none\" stroke=\"#D2FF00\" stroke-width=\"2.4\" opacity=\"0.8\"/>\n    <path d=\"M 500 4 C 500 48, 875 40, 875 90\" fill=\"none\" stroke=\"#D2FF00\" stroke-width=\"2.4\" opacity=\"0.8\"/>\n    <circle cx=\"125\" cy=\"90\" r=\"4.5\" fill=\"#D2FF00\"/>\n    <circle cx=\"375\" cy=\"90\" r=\"4.5\" fill=\"#D2FF00\"/>\n    <circle cx=\"625\" cy=\"90\" r=\"4.5\" fill=\"#D2FF00\"/>\n    <circle cx=\"875\" cy=\"90\" r=\"4.5\" fill=\"#D2FF00\"/>\n  </svg>\n  <div class=\"st-grid\">\n    <div class=\"st-col\">\n      <div class=\"st-head\"><div class=\"st-ptitle\">PRECISION ENGINEERING</div></div>\n      <div class=\"st-arrow\">\u2193</div>\n      <div class=\"st-card\">\n        <div>\n          <div class=\"st-tier-title\">Core CNC & Controllers</div>\n          <div class=\"st-tags\">\n            <span class=\"st-tag\">CNC Programming & Operation</span><span class=\"st-tag\">5-Axis Machining</span>\n            <span class=\"st-tag\">FANUC</span><span class=\"st-tag\">Siemens</span><span class=\"st-tag\">Heidenhain</span>\n            <span class=\"st-tag\">G-Code / M-Code</span><span class=\"st-tag\">CNC Turning</span><span class=\"st-tag\">CNC Milling</span>\n            <span class=\"st-tag\">GD&T</span><span class=\"st-tag\">CMM Inspection</span>\n            <span class=\"st-tag\">Tool-Life Optimization</span><span class=\"st-tag\">CNC Code Optimization</span>\n          </div>\n        </div>\n        <div>\n          <div class=\"st-tier-title\">CAD / CAM & Simulation</div>\n          <div class=\"st-tags\">\n            <span class=\"st-tag\">Mastercam</span><span class=\"st-tag\">Siemens NX CAM</span><span class=\"st-tag\">PowerMill</span>\n            <span class=\"st-tag\">Autodesk Fusion</span><span class=\"st-tag\">SolidWorks</span><span class=\"st-tag\">AutoCAD</span>\n          </div>\n        </div>\n        <div>\n          <div class=\"st-tier-title\">Industrial & Quality Systems</div>\n          <div class=\"st-tags\">\n            <span class=\"st-tag\">Precision Engineering</span><span class=\"st-tag\">Bi-Metal Bearing Mfg</span>\n            <span class=\"st-tag\">Process Planning & Accuracy</span><span class=\"st-tag\">Mfg Process Documentation</span>\n            <span class=\"st-tag\">SPC & FMEA</span><span class=\"st-tag\">Lean Mfg & Six Sigma</span>\n            <span class=\"st-tag\">Production Optimization</span><span class=\"st-tag\">Technical Team Collaboration</span>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"st-col\">\n      <div class=\"st-head\"><div class=\"st-ptitle\">DATA SCIENCE</div></div>\n      <div class=\"st-arrow\">\u2193</div>\n      <div class=\"st-card\">\n        <div>\n          <div class=\"st-tier-title\">Level 1 \u2014 Core Data & BI</div>\n          <div class=\"st-tags\">\n            <span class=\"st-tag\">Python</span><span class=\"st-tag\">Pandas</span><span class=\"st-tag\">NumPy</span>\n            <span class=\"st-tag\">Advanced SQL</span><span class=\"st-tag\">Power BI & DAX</span><span class=\"st-tag\">Power Query</span>\n            <span class=\"st-tag\">Advanced Excel & Automation</span><span class=\"st-tag\">Matplotlib & Seaborn</span>\n            <span class=\"st-tag\">Statistics & Data Modeling</span><span class=\"st-tag\">EDA & Data Cleaning</span>\n            <span class=\"st-tag\">Data Validation</span><span class=\"st-tag\">Regex & PDF Extraction</span><span class=\"st-tag\">Tally</span>\n          </div>\n        </div>\n        <div>\n          <div class=\"st-tier-title\">Level 2 \u2014 Statistical ML</div>\n          <div class=\"st-tags\">\n            <span class=\"st-tag\">Scikit-Learn</span><span class=\"st-tag\">Feature Engineering</span>\n            <span class=\"st-tag\">Regression & Classification</span><span class=\"st-tag\">Clustering</span>\n            <span class=\"st-tag\">XGBoost / LightGBM</span><span class=\"st-tag\">Model Evaluation</span>\n            <span class=\"st-tag\">Cross-Validation</span><span class=\"st-tag\">Hyperparameter Tuning</span>\n          </div>\n        </div>\n        <div>\n          <div class=\"st-tier-title\">Level 3 \u2014 MLOps & Cloud</div>\n          <div class=\"st-tags\">\n            <span class=\"st-tag\">Git / GitHub</span><span class=\"st-tag\">FastAPI & REST APIs</span><span class=\"st-tag\">Docker</span>\n            <span class=\"st-tag\">PostgreSQL</span><span class=\"st-tag\">MLflow</span><span class=\"st-tag\">AWS / Azure Cloud Basics</span>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"st-col\">\n      <div class=\"st-head\"><div class=\"st-ptitle\">AI & GEN-AI</div></div>\n      <div class=\"st-arrow\">\u2193</div>\n      <div class=\"st-card\">\n        <div>\n          <div class=\"st-tier-title\">Deep Learning & Vision/NLP</div>\n          <div class=\"st-tags\">\n            <span class=\"st-tag\">PyTorch</span><span class=\"st-tag\">TensorFlow / Keras</span>\n            <span class=\"st-tag\">Neural Networks & CNNs</span><span class=\"st-tag\">Transformers</span>\n            <span class=\"st-tag\">Computer Vision & OCR</span><span class=\"st-tag\">Natural Language Processing (NLP)</span>\n            <span class=\"st-tag\">End-to-End ML Pipelines</span>\n          </div>\n        </div>\n        <div>\n          <div class=\"st-tier-title\">Generative AI & LLM Agents</div>\n          <div class=\"st-tags\">\n            <span class=\"st-tag\">Generative AI & LLMs</span><span class=\"st-tag\">Agentic Workflows</span>\n            <span class=\"st-tag\">Prompt Engineering</span><span class=\"st-tag\">Vector Embeddings</span>\n            <span class=\"st-tag\">Local LLMs</span><span class=\"st-tag\">Model APIs & JSON</span>\n          </div>\n        </div>\n        <div>\n          <div class=\"st-tier-title\">AI & Workflow Automation</div>\n          <div class=\"st-tags\">\n            <span class=\"st-tag\">AI Automation</span><span class=\"st-tag\">n8n Workflows</span><span class=\"st-tag\">Zapier</span>\n            <span class=\"st-tag\">PyAutoGUI</span><span class=\"st-tag\">Python GUI Applications</span>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"st-col\">\n      <div class=\"st-head\"><div class=\"st-ptitle\">ROBOTICS</div></div>\n      <div class=\"st-arrow\">\u2193</div>\n      <div class=\"st-card\">\n        <div>\n          <div class=\"st-tier-title\">Controllers & Hardware</div>\n          <div class=\"st-tags\">\n            <span class=\"st-tag\">Raspberry Pi</span><span class=\"st-tag\">ESP32</span><span class=\"st-tag\">Arduino</span>\n            <span class=\"st-tag\">Sensors & Actuators</span><span class=\"st-tag\">Encoders</span>\n            <span class=\"st-tag\">Relay & Control Systems</span><span class=\"st-tag\">Serial Communication</span>\n          </div>\n        </div>\n        <div>\n          <div class=\"st-tier-title\">ROS 2, Simulation & Kinematics</div>\n          <div class=\"st-tags\">\n            <span class=\"st-tag\">ROS 2</span><span class=\"st-tag\">Gazebo Simulation</span><span class=\"st-tag\">Robot Kinematics</span>\n            <span class=\"st-tag\">OpenCV Vision</span><span class=\"st-tag\">C++ & Linux</span>\n          </div>\n        </div>\n        <div>\n          <div class=\"st-tier-title\">Aerial & Applied Robotics</div>\n          <div class=\"st-tags\">\n            <span class=\"st-tag\">Autonomous Drone Systems</span><span class=\"st-tag\">AI & Robotics Lab Instruction</span>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n";
  const P4_GALLERY_HTML = "\n<style>\n  #atw-page4-pin-wrap {\n    position: relative !important; width: 100%; height: 220vh; background: #F4F4ED; color: #111112;\n    font-family: 'Inter', system-ui, -apple-system, sans-serif; z-index: 25 !important;\n  }\n  #atw-page4-sticky {\n    position: sticky; top: 0; left: 0; width: 100vw; height: 100vh; overflow: hidden;\n    display: flex; flex-direction: column; justify-content: center; background: #F4F4ED;\n  }\n  .atw-p4-topo {\n    position: absolute; inset: 0; opacity: 0.22; pointer-events: none;\n    background-image: repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 34px, #8C8D84 35px, transparent 36px);\n  }\n  .atw-p4-watermark {\n    position: absolute; top: 50%; left: 0; transform: translateY(-50%);\n    font-size: clamp(75px, 12vw, 170px); font-weight: 900; color: rgba(17,17,18,0.045);\n    white-space: nowrap; pointer-events: none; text-transform: uppercase; letter-spacing: -3px;\n    will-change: transform;\n  }\n  .atw-p4-topbar {\n    position: absolute; top: 28px; left: 42px; right: 42px; z-index: 6;\n    display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;\n  }\n  .atw-p4-topbar h2 {\n    font-size: clamp(20px, 2.4vw, 32px); font-weight: 900; letter-spacing: -0.8px; text-transform: uppercase; color: #111112; margin: 0;\n  }\n  .atw-p4-topbar h2 span {\n    font-family: 'Georgia', serif; font-style: italic; font-weight: 400; color: #555650;\n  }\n  .atw-p4-counter {\n    background: #111112; color: #D2FF00; padding: 7px 16px; border-radius: 99px;\n    font-size: 11.5px; font-weight: 900; letter-spacing: 1.2px;\n  }\n  #atw-p4-track {\n    display: flex; align-items: center; gap: 32px; padding: 0 9vw;\n    width: max-content; will-change: transform; z-index: 5;\n  }\n  .atw-p4-card {\n    width: 340px; background: #181A14; color: #F4F4ED; border-radius: 16px; padding: 12px;\n    box-shadow: 0 22px 48px rgba(17,17,18,0.18); border: 1.5px solid #2E3227;\n    flex-shrink: 0; cursor: pointer;\n    transition: transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.25s ease, box-shadow 0.25s ease;\n  }\n  .atw-p4-card:hover {\n    transform: translateY(0px) rotate(0deg) scale(1.07) !important;\n    border-color: #D2FF00;\n    box-shadow: 0 28px 60px rgba(17,17,18,0.32), 0 0 25px rgba(210,255,0,0.25);\n    z-index: 15;\n  }\n  .atw-p4-img-wrap {\n    position: relative; width: 100%; height: 240px; border-radius: 10px; overflow: hidden;\n    background-color: #12140F; display: flex; align-items: center; justify-content: center;\n  }\n  .atw-p4-blur-bg {\n    position: absolute; inset: -12px; background-size: cover; background-position: center;\n    filter: blur(14px) brightness(0.38); z-index: 1; pointer-events: none;\n  }\n  img.atw-p4-locked-img {\n    position: relative; z-index: 2;\n    width: 100% !important; height: 100% !important; object-fit: contain !important;\n    padding: 6px !important; display: block !important;\n    opacity: 1 !important; visibility: visible !important;\n    transition: transform 0.38s ease;\n  }\n  .atw-p4-card:hover img.atw-p4-locked-img { transform: scale(1.04); }\n  .atw-p4-badge {\n    position: absolute; top: 10px; left: 10px; background: #D2FF00; color: #111112;\n    font-size: 9.5px; font-weight: 900; padding: 4px 9px; border-radius: 5px; letter-spacing: 0.6px; z-index: 4;\n    box-shadow: 0 4px 12px rgba(0,0,0,0.35);\n  }\n  .atw-p4-zoom-hint {\n    position: absolute; inset: 0; background: rgba(17,17,18,0.58); color: #D2FF00;\n    display: flex; align-items: center; justify-content: center;\n    font-size: 11px; font-weight: 900; letter-spacing: 1px; opacity: 0; transition: opacity 0.22s ease; z-index: 3;\n  }\n  .atw-p4-card:hover .atw-p4-zoom-hint { opacity: 1; }\n  .atw-p4-caption {\n    padding: 11px 4px 4px 4px; display: flex; justify-content: space-between; align-items: center; gap: 8px;\n  }\n  .atw-p4-caption strong {\n    font-size: 11.5px; font-weight: 800; color: #F4F4ED; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;\n  }\n  .atw-p4-caption span {\n    font-size: 10px; font-weight: 800; color: #D2FF00; flex-shrink: 0;\n  }\n  #atw-lightbox {\n    position: fixed; inset: 0; background: rgba(17,17,18,0.94); backdrop-filter: blur(10px);\n    z-index: 999999; display: none; flex-direction: column; align-items: center; justify-content: center;\n    padding: 28px; cursor: zoom-out;\n  }\n  #atw-lightbox img {\n    max-width: 92vw !important; max-height: 82vh !important; border-radius: 12px; border: 2px solid #D2FF00;\n    box-shadow: 0 25px 70px rgba(0,0,0,0.8); object-fit: contain !important; background: #111112;\n    display: block !important; opacity: 1 !important; visibility: visible !important;\n  }\n  #atw-lightbox-title {\n    margin-top: 16px; color: #D2FF00; font-size: 15px; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase;\n  }\n</style>\n\n<div id=\"atw-page4-sticky\">\n  <div class=\"atw-p4-topo\"></div>\n  <div class=\"atw-p4-watermark\" id=\"atw-p4-wm\">HARVARDX \u2022 GLOBAL SKILLS PARK \u2022 ITI TOPPER \u2022 IGTR CNC \u2022</div>\n  <div class=\"atw-p4-topbar\">\n    <h2><span>HONORS ARCHIVE</span></h2>\n    <div class=\"atw-p4-counter\" id=\"atw-p4-counter\">ARCHIVE // 1 OF 15 (CLICK CARD TO ZOOM)</div>\n  </div>\n  <div id=\"atw-p4-track\">\n    \n      <div class=\"atw-p4-card\" onclick=\"window.openATWLightbox('./public/gallery/1.jpeg?v=1790451769', 'HARVARDX // DATA SCIENCE WITH PYTHON')\" style=\"transform: translateY(-30px) rotate(-1.4deg);\">\n        <div class=\"atw-p4-img-wrap\">\n          <div class=\"atw-p4-blur-bg\" style=\"background-image: url('./public/gallery/1.jpeg?v=1790451769');\"></div>\n          <img class=\"atw-p4-locked-img\" src=\"./public/gallery/1.jpeg?v=1790451769\" alt=\"HARVARDX // DATA SCIENCE WITH PYTHON\" />\n          <span class=\"atw-p4-badge\">// DATA SCIENCE WIT</span>\n          <div class=\"atw-p4-zoom-hint\">CLICK TO VIEW FULLSCREEN</div>\n        </div>\n        <div class=\"atw-p4-caption\">\n          <strong>HARVARDX // DATA SCIENCE WITH PYTHON</strong>\n          <span>#</span>\n        </div>\n      </div>\n    \n      <div class=\"atw-p4-card\" onclick=\"window.openATWLightbox('./public/gallery/2.jpeg?v=1790451769', 'TECHNICAL ARCHIVE & CERTIFICATION')\" style=\"transform: translateY(30px) rotate(-0.8deg);\">\n        <div class=\"atw-p4-img-wrap\">\n          <div class=\"atw-p4-blur-bg\" style=\"background-image: url('./public/gallery/2.jpeg?v=1790451769');\"></div>\n          <img class=\"atw-p4-locked-img\" src=\"./public/gallery/2.jpeg?v=1790451769\" alt=\"TECHNICAL ARCHIVE & CERTIFICATION\" />\n          <span class=\"atw-p4-badge\"></span>\n          <div class=\"atw-p4-zoom-hint\">CLICK TO VIEW FULLSCREEN</div>\n        </div>\n        <div class=\"atw-p4-caption\">\n          <strong>TECHNICAL ARCHIVE & CERTIFICATION</strong>\n          <span>#</span>\n        </div>\n      </div>\n    \n      <div class=\"atw-p4-card\" onclick=\"window.openATWLightbox('./public/gallery/3.jpeg?v=1790451769', 'DDI & SHIKHAR // DRONE PARTICIPATION')\" style=\"transform: translateY(-30px) rotate(1.3deg);\">\n        <div class=\"atw-p4-img-wrap\">\n          <div class=\"atw-p4-blur-bg\" style=\"background-image: url('./public/gallery/3.jpeg?v=1790451769');\"></div>\n          <img class=\"atw-p4-locked-img\" src=\"./public/gallery/3.jpeg?v=1790451769\" alt=\"DDI & SHIKHAR // DRONE PARTICIPATION\" />\n          <span class=\"atw-p4-badge\">// DRONE PARTI</span>\n          <div class=\"atw-p4-zoom-hint\">CLICK TO VIEW FULLSCREEN</div>\n        </div>\n        <div class=\"atw-p4-caption\">\n          <strong>DDI & SHIKHAR // DRONE PARTICIPATION</strong>\n          <span>#</span>\n        </div>\n      </div>\n    \n      <div class=\"atw-p4-card\" onclick=\"window.openATWLightbox('./public/gallery/4.jpeg?v=1790451769', 'GLOBAL SKILLS PARK // BEST STUDENT AWARD')\" style=\"transform: translateY(30px) rotate(-1.4deg);\">\n        <div class=\"atw-p4-img-wrap\">\n          <div class=\"atw-p4-blur-bg\" style=\"background-image: url('./public/gallery/4.jpeg?v=1790451769');\"></div>\n          <img class=\"atw-p4-locked-img\" src=\"./public/gallery/4.jpeg?v=1790451769\" alt=\"GLOBAL SKILLS PARK // BEST STUDENT AWARD\" />\n          <span class=\"atw-p4-badge\">// BEST S</span>\n          <div class=\"atw-p4-zoom-hint\">CLICK TO VIEW FULLSCREEN</div>\n        </div>\n        <div class=\"atw-p4-caption\">\n          <strong>GLOBAL SKILLS PARK // BEST STUDENT AWARD</strong>\n          <span>#</span>\n        </div>\n      </div>\n    \n      <div class=\"atw-p4-card\" onclick=\"window.openATWLightbox('./public/gallery/5.jpeg?v=1790451769', 'GOVT. ITI JABALPUR // CONVOCATION MERIT')\" style=\"transform: translateY(-30px) rotate(1.3deg);\">\n        <div class=\"atw-p4-img-wrap\">\n          <div class=\"atw-p4-blur-bg\" style=\"background-image: url('./public/gallery/5.jpeg?v=1790451769');\"></div>\n          <img class=\"atw-p4-locked-img\" src=\"./public/gallery/5.jpeg?v=1790451769\" alt=\"GOVT. ITI JABALPUR // CONVOCATION MERIT\" />\n          <span class=\"atw-p4-badge\">. ITI JABALPUR // CONVOC</span>\n          <div class=\"atw-p4-zoom-hint\">CLICK TO VIEW FULLSCREEN</div>\n        </div>\n        <div class=\"atw-p4-caption\">\n          <strong>GOVT. ITI JABALPUR // CONVOCATION MERIT</strong>\n          <span>#</span>\n        </div>\n      </div>\n    \n      <div class=\"atw-p4-card\" onclick=\"window.openATWLightbox('./public/gallery/6.jpeg?v=1790451769', 'DATA ANALYTICS, ML, PYTHON & POWER BI')\" style=\"transform: translateY(30px) rotate(-0.8deg);\">\n        <div class=\"atw-p4-img-wrap\">\n          <div class=\"atw-p4-blur-bg\" style=\"background-image: url('./public/gallery/6.jpeg?v=1790451769');\"></div>\n          <img class=\"atw-p4-locked-img\" src=\"./public/gallery/6.jpeg?v=1790451769\" alt=\"DATA ANALYTICS, ML, PYTHON & POWER BI\" />\n          <span class=\"atw-p4-badge\">, ML, PYTHON &</span>\n          <div class=\"atw-p4-zoom-hint\">CLICK TO VIEW FULLSCREEN</div>\n        </div>\n        <div class=\"atw-p4-caption\">\n          <strong>DATA ANALYTICS, ML, PYTHON & POWER BI</strong>\n          <span>#</span>\n        </div>\n      </div>\n    \n      <div class=\"atw-p4-card\" onclick=\"window.openATWLightbox('./public/gallery/7.jpg?v=1790451769', 'TECHNICAL & INNOVATION CERTIFICATE')\" style=\"transform: translateY(-30px) rotate(-1.4deg);\">\n        <div class=\"atw-p4-img-wrap\">\n          <div class=\"atw-p4-blur-bg\" style=\"background-image: url('./public/gallery/7.jpg?v=1790451769');\"></div>\n          <img class=\"atw-p4-locked-img\" src=\"./public/gallery/7.jpg?v=1790451769\" alt=\"TECHNICAL & INNOVATION CERTIFICATE\" />\n          <span class=\"atw-p4-badge\"></span>\n          <div class=\"atw-p4-zoom-hint\">CLICK TO VIEW FULLSCREEN</div>\n        </div>\n        <div class=\"atw-p4-caption\">\n          <strong>TECHNICAL & INNOVATION CERTIFICATE</strong>\n          <span>#</span>\n        </div>\n      </div>\n    \n      <div class=\"atw-p4-card\" onclick=\"window.openATWLightbox('./public/gallery/8.jpg?v=1790451769', 'IGTR HI-TECH CENTRE // CNC & CAD/CAM')\" style=\"transform: translateY(30px) rotate(-0.8deg);\">\n        <div class=\"atw-p4-img-wrap\">\n          <div class=\"atw-p4-blur-bg\" style=\"background-image: url('./public/gallery/8.jpg?v=1790451769');\"></div>\n          <img class=\"atw-p4-locked-img\" src=\"./public/gallery/8.jpg?v=1790451769\" alt=\"IGTR HI-TECH CENTRE // CNC & CAD/CAM\" />\n          <span class=\"atw-p4-badge\">// CNC &</span>\n          <div class=\"atw-p4-zoom-hint\">CLICK TO VIEW FULLSCREEN</div>\n        </div>\n        <div class=\"atw-p4-caption\">\n          <strong>IGTR HI-TECH CENTRE // CNC & CAD/CAM</strong>\n          <span>#</span>\n        </div>\n      </div>\n    \n      <div class=\"atw-p4-card\" onclick=\"window.openATWLightbox('./public/gallery/9.jpg?v=1790451769', 'ISO 9001:2015 // TECHNICAL CERTIFICATION')\" style=\"transform: translateY(-30px) rotate(1.3deg);\">\n        <div class=\"atw-p4-img-wrap\">\n          <div class=\"atw-p4-blur-bg\" style=\"background-image: url('./public/gallery/9.jpg?v=1790451769');\"></div>\n          <img class=\"atw-p4-locked-img\" src=\"./public/gallery/9.jpg?v=1790451769\" alt=\"ISO 9001:2015 // TECHNICAL CERTIFICATION\" />\n          <span class=\"atw-p4-badge\">:2015 // TECHNICAL C</span>\n          <div class=\"atw-p4-zoom-hint\">CLICK TO VIEW FULLSCREEN</div>\n        </div>\n        <div class=\"atw-p4-caption\">\n          <strong>ISO 9001:2015 // TECHNICAL CERTIFICATION</strong>\n          <span>#</span>\n        </div>\n      </div>\n    \n      <div class=\"atw-p4-card\" onclick=\"window.openATWLightbox('./public/gallery/10.jpg?v=1790451769', 'GLOBAL SKILLS PARK // PRECISION ENGINEERING')\" style=\"transform: translateY(30px) rotate(-1.4deg);\">\n        <div class=\"atw-p4-img-wrap\">\n          <div class=\"atw-p4-blur-bg\" style=\"background-image: url('./public/gallery/10.jpg?v=1790451769');\"></div>\n          <img class=\"atw-p4-locked-img\" src=\"./public/gallery/10.jpg?v=1790451769\" alt=\"GLOBAL SKILLS PARK // PRECISION ENGINEERING\" />\n          <span class=\"atw-p4-badge\">10 // GLOBAL SKILLS PARK // PRECIS</span>\n          <div class=\"atw-p4-zoom-hint\">CLICK TO VIEW FULLSCREEN</div>\n        </div>\n        <div class=\"atw-p4-caption\">\n          <strong>GLOBAL SKILLS PARK // PRECISION ENGINEERING</strong>\n          <span>#</span>\n        </div>\n      </div>\n    \n      <div class=\"atw-p4-card\" onclick=\"window.openATWLightbox('./public/gallery/11.jpg?v=1790451769', 'ISO 9001:2015 // SOFTWARE PROFICIENCY')\" style=\"transform: translateY(-30px) rotate(1.3deg);\">\n        <div class=\"atw-p4-img-wrap\">\n          <div class=\"atw-p4-blur-bg\" style=\"background-image: url('./public/gallery/11.jpg?v=1790451769');\"></div>\n          <img class=\"atw-p4-locked-img\" src=\"./public/gallery/11.jpg?v=1790451769\" alt=\"ISO 9001:2015 // SOFTWARE PROFICIENCY\" />\n          <span class=\"atw-p4-badge\">11 // ISO 9001:2015 // SOFTWARE PR</span>\n          <div class=\"atw-p4-zoom-hint\">CLICK TO VIEW FULLSCREEN</div>\n        </div>\n        <div class=\"atw-p4-caption\">\n          <strong>ISO 9001:2015 // SOFTWARE PROFICIENCY</strong>\n          <span>#</span>\n        </div>\n      </div>\n    \n      <div class=\"atw-p4-card\" onclick=\"window.openATWLightbox('./public/gallery/12.jpg?v=1790451769', 'ISO 9001:2015 // ADVANCED COMPUTING')\" style=\"transform: translateY(30px) rotate(-0.8deg);\">\n        <div class=\"atw-p4-img-wrap\">\n          <div class=\"atw-p4-blur-bg\" style=\"background-image: url('./public/gallery/12.jpg?v=1790451769');\"></div>\n          <img class=\"atw-p4-locked-img\" src=\"./public/gallery/12.jpg?v=1790451769\" alt=\"ISO 9001:2015 // ADVANCED COMPUTING\" />\n          <span class=\"atw-p4-badge\">12 // ISO 9001:2015 // ADVANCED CO</span>\n          <div class=\"atw-p4-zoom-hint\">CLICK TO VIEW FULLSCREEN</div>\n        </div>\n        <div class=\"atw-p4-caption\">\n          <strong>ISO 9001:2015 // ADVANCED COMPUTING</strong>\n          <span>#</span>\n        </div>\n      </div>\n    \n      <div class=\"atw-p4-card\" onclick=\"window.openATWLightbox('./public/gallery/13.jpg?v=1790451769', 'HARVARD UNIVERSITY // CS CERTIFICATION')\" style=\"transform: translateY(-30px) rotate(-1.4deg);\">\n        <div class=\"atw-p4-img-wrap\">\n          <div class=\"atw-p4-blur-bg\" style=\"background-image: url('./public/gallery/13.jpg?v=1790451769');\"></div>\n          <img class=\"atw-p4-locked-img\" src=\"./public/gallery/13.jpg?v=1790451769\" alt=\"HARVARD UNIVERSITY // CS CERTIFICATION\" />\n          <span class=\"atw-p4-badge\">13 // HARVARD UNIVERSITY // CS CER</span>\n          <div class=\"atw-p4-zoom-hint\">CLICK TO VIEW FULLSCREEN</div>\n        </div>\n        <div class=\"atw-p4-caption\">\n          <strong>HARVARD UNIVERSITY // CS CERTIFICATION</strong>\n          <span>#</span>\n        </div>\n      </div>\n    \n      <div class=\"atw-p4-card\" onclick=\"window.openATWLightbox('./public/gallery/14.png?v=1790451769', 'AWARD & HONOR FELICITATION CEREMONY')\" style=\"transform: translateY(30px) rotate(-0.8deg);\">\n        <div class=\"atw-p4-img-wrap\">\n          <div class=\"atw-p4-blur-bg\" style=\"background-image: url('./public/gallery/14.png?v=1790451769');\"></div>\n          <img class=\"atw-p4-locked-img\" src=\"./public/gallery/14.png?v=1790451769\" alt=\"AWARD & HONOR FELICITATION CEREMONY\" />\n          <span class=\"atw-p4-badge\">14 // AWARD & HONOR FELICITATION C</span>\n          <div class=\"atw-p4-zoom-hint\">CLICK TO VIEW FULLSCREEN</div>\n        </div>\n        <div class=\"atw-p4-caption\">\n          <strong>AWARD & HONOR FELICITATION CEREMONY</strong>\n          <span>#</span>\n        </div>\n      </div>\n    \n      <div class=\"atw-p4-card\" onclick=\"window.openATWLightbox('./public/gallery/15.png?v=1790451769', 'AI & ROBOTICS LAB ARCHIVE')\" style=\"transform: translateY(-30px) rotate(1.3deg);\">\n        <div class=\"atw-p4-img-wrap\">\n          <div class=\"atw-p4-blur-bg\" style=\"background-image: url('./public/gallery/15.png?v=1790451769');\"></div>\n          <img class=\"atw-p4-locked-img\" src=\"./public/gallery/15.png?v=1790451769\" alt=\"AI & ROBOTICS LAB ARCHIVE\" />\n          <span class=\"atw-p4-badge\">15 // AI & ROBOTICS LAB ARCHIVE</span>\n          <div class=\"atw-p4-zoom-hint\">CLICK TO VIEW FULLSCREEN</div>\n        </div>\n        <div class=\"atw-p4-caption\">\n          <strong>AI & ROBOTICS LAB ARCHIVE</strong>\n          <span>#</span>\n        </div>\n      </div>\n    \n  </div>\n</div>\n\n<div id=\"atw-lightbox\" onclick=\"this.style.display='none'\">\n  <img id=\"atw-lightbox-img\" src=\"\" alt=\"Fullscreen Certificate\" />\n  <div id=\"atw-lightbox-title\"></div>\n  <div style=\"color:#A5A89E;font-size:12px;margin-top:6px;\">Click anywhere to close</div>\n</div>\n";
  const TOTAL_P4_ITEMS  = 15;

  function getATWHoverLogoHTML(size, extraClass) {
    const s = size || 46;
    const cls = extraClass ? `atw-interactive-logo ${extraClass}` : 'atw-interactive-logo';
    return `<div class="${cls}" title="Home — Abdul Tarique Warsi">
      <svg class="atw-only-logo-svg" width="${s}" height="${s}" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;overflow:visible;">
        <g transform="skewX(-8) translate(8, 0)">
          <path d="M 16 70 L 38 12 C 40 7, 46 7, 48 12 L 66 56 L 54 56 L 43 26 L 28 70 Z"/>
          <polygon points="18,44 88,44 84,55 14,55"/>
          <path d="M 43 58 L 55 58 L 55 88 L 68 65 C 70 61, 75 61, 77 65 L 88 88 L 96 56 L 108 56 L 96 104 C 94 110, 87 110, 84 104 L 72.5 80 L 61 104 C 58 110, 43 108, 43 96 Z"/>
        </g>
      </svg>
    </div>`;
  }

  function forceUnlockScroll() {
    document.querySelectorAll('.transition-w, .preloader').forEach(tw => {
      tw.style.setProperty('display', 'none', 'important');
      tw.style.setProperty('opacity', '0', 'important');
      tw.style.setProperty('pointer-events', 'none', 'important');
    });
    document.documentElement.style.removeProperty('overflow');
    document.documentElement.style.removeProperty('height');
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('height');
    document.documentElement.style.overflowX = 'clip';
    document.body.style.overflowX = 'clip';
    document.body.classList.remove('w-editor', 'no-scroll', 'is-loading', 'overflow-hidden');
    if (window.lenis && typeof window.lenis.start === 'function') {
      window.lenis.start();
    }
  }

  function handlePreloaderLifecycle() {
    const preloader = document.getElementById('atw-green-preloader');
    const fromResume = sessionStorage.getItem('atw_visited_resume') === '1';
    if (fromResume) {
      sessionStorage.removeItem('atw_visited_resume');
      if (preloader) preloader.style.display = 'none';
      forceUnlockScroll();
      return;
    }
    if (preloader && !preloader.dataset.atwTimerSet) {
      preloader.dataset.atwTimerSet = '1';
      setTimeout(() => {
        preloader.style.transform = 'translateY(-100%)';
        forceUnlockScroll();
        setTimeout(() => {
          if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
        }, 750);
      }, 1650);
    } else {
      forceUnlockScroll();
    }
  }

  window.addEventListener('pageshow', (e) => {
    if (e.persisted || sessionStorage.getItem('atw_visited_resume') === '1') {
      sessionStorage.removeItem('atw_visited_resume');
      const p = document.getElementById('atw-green-preloader');
      if (p) p.style.display = 'none';
      forceUnlockScroll();
    }
  });

  window.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = (a.getAttribute('href') || '').toLowerCase();
    const txt  = (a.textContent || '').trim().toUpperCase();
    if (href.includes('resume.html') || txt === 'RESUMES' || txt.includes('DOWNLOAD RESUMES')) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      sessionStorage.setItem('atw_visited_resume', '1');
      window.location.href = './resume.html';
    }
  }, true);

  function hideDefaultCenterLNLogosAndCursorBugs() {
    document.querySelectorAll('svg, canvas, img').forEach(el => {
      if (el.classList.contains('atw-only-logo-svg') || el.classList.contains('atw-p4-locked-img') || el.id === 'atw-blob-canvas' || el.id === 'atw-sig-img') return;
      if (el.closest('#atw-master-stage') || el.closest('#atw-green-preloader') || el.closest('#atw-single-brand-logo') || el.closest('#atw-page3-skill-tree') || el.closest('#atw-page4-pin-wrap') || el.closest('#atw-lightbox')) return;

      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return;
      if (r.top < 110 && r.left > window.innerWidth - 220) return;

      const centerX = r.left + r.width / 2;
      const distFromCenter = Math.abs(centerX - window.innerWidth / 2);

      if (distFromCenter < 210 && r.width < 180 && r.height < 180) {
        el.style.setProperty('display', 'none', 'important');
        el.style.setProperty('opacity', '0', 'important');
        el.style.setProperty('visibility', 'hidden', 'important');
      }

      const parentA = el.closest('a');
      if (parentA && r.top < 120 && distFromCenter < 260) {
        parentA.style.setProperty('opacity', '0', 'important');
        parentA.style.setProperty('pointer-events', 'none', 'important');
      }
    });
  }

  const EXACT_WORD_MAP = {
    "NEXT RACE": "OPEN TO WORK",
    "BAKU GP": "ACCEPTING DATA SCIENCE & ANALYTICS ROLES",
    "MCLAREN F1": "CURRENT ROLE:",
    "SINCE 2019": "AI & ROBOTICS TEACHER",
    "HELMETS": "PROJECTS & LABS",
    "STORE": "RESUMES",
    "VISIT THE STORE": "DOWNLOAD RESUMES",
    "LANDO STORE": "ATW ENGINEERING",
    "MESSAGE FROM LANDO": "MESSAGE FROM FUTURE DATA SCIENTIST",
    "MESSAGE FROM ABDUL": "MESSAGE FROM FUTURE DATA SCIENTIST",
    "LOAD NORRIS": "Load ATW // Portfolio - 1",
    "LOAD ATW // 01": "Load ATW // Portfolio - 1",
    "WORLD DRIVERS'": "TOPPER & AWARD",
    "TIKTOK": "GITHUB",
    "INSTAGRAM": "LINKEDIN",
    "YOUTUBE": "EMAIL",
    "TWITCH": "PHONE"
  };

  function updateTextAndBrand() {
    let brandEl = document.getElementById('atw-single-brand-logo');
    if (!brandEl) {
      const navLinks = Array.from(document.querySelectorAll('a, div')).filter(el => {
        if (el.closest('.transition-w') || el.closest('#atw-master-stage')) return false;
        const txt = (el.textContent || '').toUpperCase();
        const href = (el.getAttribute('href') || '').toLowerCase();
        if (txt.includes('RESUMES') || txt.includes('STORE') || href.includes('resume') || href.includes('store')) return false;
        const r = el.getBoundingClientRect();
        return (r.top >= 0 && r.top < 95 && r.left >= 0 && r.left < 200 && r.width > 45 && r.width < 250 && el.querySelector('svg'));
      });
      if (navLinks.length > 0) {
        const target = navLinks[0];
        target.querySelectorAll('svg').forEach(s => s.style.display = 'none');
        brandEl = document.createElement('div');
        brandEl.id = 'atw-single-brand-logo';
        brandEl.style.cssText = "font-family:Georgia,serif;font-size:20px;line-height:0.92;letter-spacing:0.5px;color:#111112;text-transform:uppercase;font-weight:400;pointer-events:none;z-index:9999;transition:color 0.25s ease;";
        brandEl.innerHTML = "ABDUL TARIQUE<br><span style='font-family:Inter,system-ui,sans-serif;font-weight:900;font-size:21px;letter-spacing:-0.6px;'>WARSI</span>";
        target.appendChild(brandEl);
      }
    }

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while ((node = walker.nextNode())) {
      let raw = node.nodeValue;
      if (!raw || !raw.trim()) continue;
      let trimmed = raw.trim();
      let upper = trimmed.toUpperCase();

      if (EXACT_WORD_MAP[upper]) {
        node.nodeValue = raw.replace(trimmed, EXACT_WORD_MAP[upper]);
        continue;
      }

      let updated = raw
        .replace(/NEXT RACE/gi, "OPEN TO WORK")
        .replace(/BAKU\s*GP/gi, "ACCEPTING DATA SCIENCE & ANALYTICS ROLES")
        .replace(/MCLAREN F1/gi, "CURRENT ROLE:")
        .replace(/SINCE 2019/gi, "AI & ROBOTICS TEACHER")
        .replace(/MESSAGE FROM LANDO/gi, "MESSAGE FROM FUTURE DATA SCIENTIST")
        .replace(/MESSAGE FROM ABDUL/gi, "MESSAGE FROM FUTURE DATA SCIENTIST")
        .replace(/LOAD NORRIS/gi, "Load ATW // Portfolio - 1")
        .replace(/WE DID IT AT HOME/gi, "FIRST SOLVE YOUR PROBLEM")
        .replace(/A?\s*BRITISH GP WEEKEND I WILL REMEMBER FOREVER/gi, "BECAUSE YOUR PROBLEM LEADS TO THE SOLUTION OF OTHERS PROBLEM");

      if (updated !== raw) node.nodeValue = updated;
    }

    document.querySelectorAll('a').forEach(a => {
      const t = (a.textContent || '').trim().toUpperCase();
      if (t === 'RESUMES' || t === 'STORE' || t.includes('DOWNLOAD RESUMES') || t.includes('VISIT THE STORE') || (a.href && a.href.includes('lando.store'))) {
        a.href = './resume.html';
        a.removeAttribute('target');
      }
      if (a.href && a.href.includes('tiktok.com')) a.href = 'https://github.com/ATWISHERE';
      if (a.href && a.href.includes('instagram.com')) a.href = 'https://www.linkedin.com/in/abdul-tarique-warsi';
      if (a.href && a.href.includes('youtube.com')) a.href = 'mailto:abdultarique5@gmail.com';
      if (a.href && a.href.includes('twitch.tv')) a.href = 'tel:+918770463418';
    });
  }

  function mountApprovedHeroAndShrunkStage() {
    if (document.getElementById('atw-master-stage')) return;

    const stage = document.createElement('div');
    stage.id = 'atw-master-stage';
    stage.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;z-index:2;pointer-events:none;display:flex;align-items:center;justify-content:center;overflow:hidden;';

    const bgQuoteWrap = document.createElement('div');
    bgQuoteWrap.id = 'atw-shrunk-bg-quote';
    bgQuoteWrap.style.cssText = 'position:absolute;inset:0;background:#262922;opacity:0;pointer-events:none;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:1;overflow:hidden;';
    bgQuoteWrap.innerHTML = `
      <style>
        @keyframes atwSlideLeft { 0% { transform: translateX(4%); } 100% { transform: translateX(-38%); } }
        @keyframes atwSlideRight { 0% { transform: translateX(-38%); } 100% { transform: translateX(4%); } }
      </style>
      <div style="position:absolute;top:10%;left:50%;transform:translateX(-50%);text-align:center;z-index:4;display:flex;flex-direction:column;align-items:center;">
        <div id="atw-msg-home-btn">${getATWHoverLogoHTML(52, 'on-dark')}</div>
        <div style="color:#F4F4ED;font-size:11px;font-weight:800;letter-spacing:2.4px;margin-top:10px;font-family:Inter,sans-serif;text-transform:uppercase;">
          MESSAGE FROM FUTURE DATA SCIENTIST
        </div>
      </div>
      <div style="position:absolute;left:0;right:0;top:52%;transform:translateY(-50%);display:flex;flex-direction:column;gap:8px;pointer-events:none;">
        <div style="white-space:nowrap;font-size:clamp(42px, 5.5vw, 76px);font-weight:900;line-height:0.95;color:#D2FF00;font-family:Georgia,serif;text-transform:uppercase;animation:atwSlideLeft 15s linear infinite alternate;">
          FIRST SOLVE YOUR PROBLEM — FIRST SOLVE YOUR PROBLEM — FIRST SOLVE YOUR PROBLEM —
        </div>
        <div style="white-space:nowrap;font-size:clamp(42px, 5.5vw, 76px);font-weight:900;line-height:0.95;color:#F4F4ED;font-family:Inter,sans-serif;text-transform:uppercase;animation:atwSlideRight 15s linear infinite alternate;">
          BECAUSE YOUR PROBLEM LEADS TO THE SOLUTION OF OTHERS PROBLEM — BECAUSE YOUR PROBLEM LEADS TO THE SOLUTION OF OTHERS PROBLEM —
        </div>
      </div>
    `;

    const morphBox = document.createElement('div');
    morphBox.id = 'atw-morph-box';
    morphBox.style.cssText = 'position:relative;width:100vw;height:100vh;background:#F4F4ED;overflow:hidden;display:flex;align-items:flex-end;justify-content:center;perspective:1100px;will-change:width,height;z-index:2;box-shadow:0 24px 60px rgba(0,0,0,0.35);';

    // LAYER 1 (z-index: 1): Live Moving Topographic Background Lines ONLY (Strictly behind canvas & UI)
    const bgTopo = document.createElement('div');
    bgTopo.id = 'atw-bg-topo';
    bgTopo.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:1;';
    bgTopo.innerHTML = `
      <style>
        @keyframes ogWave1 { 0% { transform: scale(1) rotate(0deg) translate(0px, 0px); } 50% { transform: scale(1.06) rotate(2deg) translate(-18px, 12px); } 100% { transform: scale(1) rotate(0deg) translate(0px, 0px); } }
        @keyframes ogWave2 { 0% { transform: scale(1.04) rotate(0deg) translate(0px, 0px); } 50% { transform: scale(0.96) rotate(-2.5deg) translate(22px, -14px); } 100% { transform: scale(1.04) rotate(0deg) translate(0px, 0px); } }
        @keyframes ogRibbon { 0% { transform: translateY(0px) scaleX(1); } 50% { transform: translateY(-16px) scaleX(1.04); } 100% { transform: translateY(0px) scaleX(1); } }
      </style>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:-4%;width:108%;height:108%;opacity:0.32;animation:ogWave1 14s ease-in-out infinite;transform-origin:center;">
        <g fill="none" stroke="#9A9B90" stroke-width="1.4">
          <path d="M 120 -40 C 360 280, 290 740, 80 1120" />
          <path d="M 260 -40 C 480 300, 420 720, 210 1120" />
          <path d="M 1800 -40 C 1560 280, 1630 740, 1840 1120" />
          <path d="M 1660 -40 C 1440 300, 1500 720, 1710 1120" />
          <ellipse cx="960" cy="460" rx="580" ry="510"/>
          <ellipse cx="960" cy="460" rx="740" ry="640"/>
          <ellipse cx="960" cy="460" rx="920" ry="790"/>
        </g>
      </svg>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:-4%;width:108%;height:108%;opacity:0.28;animation:ogWave2 11s ease-in-out infinite;transform-origin:center;">
        <g fill="none" stroke="#85867C" stroke-width="1.3">
          <ellipse cx="960" cy="440" rx="210" ry="210"/>
          <ellipse cx="960" cy="440" rx="315" ry="300"/>
          <ellipse cx="960" cy="440" rx="440" ry="405"/>
        </g>
      </svg>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:0;opacity:0.75;animation:ogRibbon 9s ease-in-out infinite;">
        <path d="M380,590 C680,440 1240,440 1560,590 C1340,720 660,720 380,590 Z" fill="#E5E5DC"/>
      </svg>
    `;

    // LAYER 2 (z-index: 2): Cursor Quote Reveal + Clean Portrait Canvas
    const bCanvas = document.createElement('canvas');
    bCanvas.id = 'atw-blob-canvas';
    bCanvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;z-index:2;pointer-events:none;';

    // LAYER 3 (z-index: 9 — ABOVE bCanvas!): Top-Center ATW Logo & Bottom-Left Notched Status Card
    // Because this layer is at z-index: 9 (above bCanvas at z-index: 2), the cursor liquid blob goes BEHIND them and NEVER hides them!
    const bgDecor = document.createElement('div');
    bgDecor.id = 'atw-hero-decor';
    bgDecor.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:9;';
    bgDecor.innerHTML = `
      <div id="atw-helmet-halo" style="position:absolute;left:50%;top:2.2%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;">
        <div id="atw-hero-home-btn" style="margin-bottom:2px;z-index:10;pointer-events:auto;">
          ${getATWHoverLogoHTML(48, '')}
        </div>
      </div>

      <div id="atw-notched-card" style="position:absolute;left:24px;bottom:24px;width:168px;z-index:10;color:#555650;font-family:Inter,system-ui,sans-serif;">
        <div style="font-size:10.5px;font-weight:800;letter-spacing:0.6px;text-transform:uppercase;margin-bottom:4px;color:#4B4C46;">OPEN TO WORK</div>
        <div style="position:relative;padding:18px 14px 16px 14px;text-align:center;">
          <svg viewBox="0 0 170 235" fill="none" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;">
            <path d="M 1 24 C 1 19, 5 15, 10 15 L 82 15 C 90 15, 95 2, 104 2 L 160 2 C 165 2, 169 6, 169 11 L 169 225 C 169 230, 165 234, 160 234 L 10 234 C 5 234, 1 230, 1 225 Z" stroke="#555650" stroke-width="1.2" fill="rgba(244,244,237,0.88)"/>
          </svg>
          <div style="position:relative;z-index:2;">
            <svg width="48" height="38" viewBox="0 0 60 46" fill="none" style="margin:4px auto 8px auto;display:block;">
              <path d="M8 34 L22 20 L34 26 L50 10 M50 10 L40 10 M50 10 L50 20" stroke="#555650" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="22" cy="20" r="3" fill="#555650"/>
              <circle cx="34" cy="26" r="3" fill="#555650"/>
              <circle cx="50" cy="10" r="3.5" fill="#111112"/>
            </svg>
            <div style="font-size:10px;font-weight:800;line-height:1.25;letter-spacing:0.4px;color:#3E3F3A;text-transform:uppercase;">
              ACCEPTING DATA SCIENCE<br>& ANALYTICS ROLES
            </div>
            <div style="height:1.5px;background:#555650;margin:12px 2px;"></div>
            <svg width="86" height="48" viewBox="0 0 110 60" fill="none" style="margin:0 auto 6px auto;display:block;">
              <path d="M28 50 C14 42, 10 24, 22 10 M18 42 C12 36, 12 28, 18 22 M22 47 C16 42, 16 34, 22 28" stroke="#555650" stroke-width="1.8" stroke-linecap="round"/>
              <path d="M82 50 C96 42, 100 24, 88 10 M92 42 C98 36, 98 28, 92 22 M88 47 C94 42, 94 34, 88 28" stroke="#555650" stroke-width="1.8" stroke-linecap="round"/>
              <ellipse cx="55" cy="30" rx="18" ry="19" stroke="#555650" stroke-width="1.4"/>
              <path d="M37 28 Q55 20 73 28 M38 35 Q55 39 72 35 M55 11 L55 49 M45 14 C42 26, 42 36, 45 46 M65 14 C68 26, 68 36, 65 46" stroke="#555650" stroke-width="1"/>
            </svg>
            <div style="font-size:9.5px;font-weight:800;line-height:1.22;letter-spacing:0.4px;color:#3E3F3A;text-transform:uppercase;">
              CURRENT: AI &<br>ROBOTICS TEACHER
            </div>
          </div>
        </div>
      </div>
    `;

    // LAYER 4 (z-index: 4): Grayscale Portrait Box on Scroll-Down
    const bwWrap = document.createElement('div');
    bwWrap.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;background:#6C6E65;opacity:0;overflow:hidden;display:flex;align-items:center;justify-content:center;pointer-events:none;z-index:4;';
    bwWrap.innerHTML = `<img src="${PORTRAIT_URL}" style="width:100%;height:100%;object-fit:cover;object-position:50% 15%;transform:scale(1.22);filter:grayscale(100%) contrast(1.16);" alt="Abdul Portrait" />`;

    // LAYER 5 (z-index: 12): Mode 1 Neon Signature Wipe
    const sigWrap = document.createElement('div');
    sigWrap.id = 'atw-sig-overlay';
    sigWrap.style.cssText = 'position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:500px;max-width:92vw;z-index:12;pointer-events:none;opacity:0;transition:opacity 0.25s ease;';
    sigWrap.innerHTML = `<img id="atw-sig-img" src="${SIG_URL}" style="width:100%;height:auto;display:block;filter:drop-shadow(0 6px 18px rgba(210,255,0,0.45));clip-path:inset(0 100% 0 0);transition:clip-path 0.9s cubic-bezier(0.4,0,0.2,1);" alt="Atw is here signature" />`;

    morphBox.appendChild(bgTopo);
    morphBox.appendChild(bCanvas);
    morphBox.appendChild(bwWrap);
    morphBox.appendChild(bgDecor);
    stage.appendChild(bgQuoteWrap);
    stage.appendChild(morphBox);
    stage.appendChild(sigWrap);
    document.body.appendChild(stage);

    ['atw-hero-home-btn', 'atw-msg-home-btn'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    });

    const ctx = bCanvas.getContext('2d');
    function syncCanvasSize() {
      const dpr = window.devicePixelRatio || 1;
      bCanvas.width = window.innerWidth * dpr;
      bCanvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    syncCanvasSize();
    window.addEventListener('resize', syncCanvasSize);

    const baseImg = new Image();
    baseImg.src = PORTRAIT_URL;

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight * 0.45, nx: 0, ny: 0, active: false };
    let tilt  = { nx: 0, ny: 0 };
    let trail = Array.from({ length: 10 }, () => ({ x: window.innerWidth / 2, y: window.innerHeight * 0.45 }));

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.nx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ny = (e.clientY / window.innerHeight - 0.5) * 2;
      mouse.active = true;
    });

    window.addEventListener('touchmove', (e) => {
      if (!e.touches[0]) return;
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
      mouse.active = true;
    }, { passive: true });

    function drawQuoteWallBehindPortrait(c, w, h) {
      c.save();
      c.fillStyle = '#1C1F18';
      c.fillRect(0, 0, w, h);

      c.strokeStyle = 'rgba(210, 255, 0, 0.12)';
      c.lineWidth = 1;
      for (let x = 0; x < w; x += 52) {
        c.beginPath(); c.moveTo(x, 0); c.lineTo(x, h); c.stroke();
      }
      for (let y = 0; y < h; y += 52) {
        c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke();
      }

      const fontSize = Math.max(34, Math.min(68, w * 0.045));
      const rows = [
        { text: "FIRST SOLVE YOUR PROBLEM", y: h * 0.22, font: `italic 900 ${fontSize}px Georgia, serif`, lime: true, depth: 0.7 },
        { text: "BECAUSE YOUR PROBLEM LEADS", y: h * 0.41, font: `900 ${fontSize}px Inter, sans-serif`, lime: false, depth: 1.0 },
        { text: "TO THE SOLUTION OF", y: h * 0.60, font: `italic 900 ${fontSize}px Georgia, serif`, lime: true, depth: 1.2 },
        { text: "OTHERS PROBLEM.", y: h * 0.79, font: `900 ${fontSize * 1.08}px Inter, sans-serif`, lime: false, depth: 1.4 }
      ];

      rows.forEach((row) => {
        c.save();
        c.font = row.font;
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        const tx = (w / 2) - tilt.nx * 28 * row.depth;
        const ty = row.y - tilt.ny * 14 * row.depth;

        c.fillStyle = 'rgba(0, 0, 0, 0.65)';
        for (let s = 6; s >= 1; s--) {
          c.fillText(row.text, tx + s * 1.2, ty + s * 1.2);
        }
        c.fillStyle = row.lime ? '#D2FF00' : '#F4F4ED';
        c.fillText(row.text, tx, ty);
        c.restore();
      });

      c.restore();
    }

    function animate() {
      hideDefaultCenterLNLogosAndCursorBugs();

      document.querySelectorAll('canvas').forEach(c => {
        if (c.id !== 'atw-blob-canvas') {
          const r = c.getBoundingClientRect();
          if (r.width > 280 && r.height > 180) c.style.opacity = '0';
        }
      });

      const w = window.innerWidth;
      const h = window.innerHeight;
      const sy = window.scrollY;

      tilt.nx += (mouse.nx - tilt.nx) * 0.14;
      tilt.ny += (mouse.ny - tilt.ny) * 0.14;

      ctx.clearRect(0, 0, w, h);

      trail[0].x += (mouse.x - trail[0].x) * 0.25;
      trail[0].y += (mouse.y - trail[0].y) * 0.25;
      for (let i = 1; i < trail.length; i++) {
        trail[i].x += (trail[i-1].x - trail[i].x) * 0.32;
        trail[i].y += (trail[i-1].y - trail[i].y) * 0.32;
      }

      // Only draw cursor quote portal on Page 1, and keep it clear of the top navbar & bottom-left card!
      if (mouse.active && sy < h * 0.25 && mouse.y > 70) {
        ctx.save();
        ctx.beginPath();
        trail.forEach((p, idx) => {
          const rad = Math.max(40, 140 - idx * 12);
          ctx.moveTo(p.x + rad, p.y);
          ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        });
        ctx.clip();
        drawQuoteWallBehindPortrait(ctx, w, h);
        ctx.restore();
      }

      if (baseImg.complete && baseImg.naturalWidth) {
        const aspect = baseImg.naturalWidth / baseImg.naturalHeight;
        const targetH = h * 0.88;
        const targetW = targetH * aspect;
        const dx = (w - targetW) / 2 + tilt.nx * 14;
        const dy = h - targetH + Math.max(0, tilt.ny * 6);
        ctx.drawImage(baseImg, dx, dy, targetW, targetH);
      }

      const shrinkProgress = Math.max(0, Math.min(1, sy / (h * 0.55)));
      const targetW = Math.min(400, w * 0.84);
      const targetH = Math.min(295, h * 0.44);

      morphBox.style.width = (w + (targetW - w) * shrinkProgress) + 'px';
      morphBox.style.height = (h + (targetH - h) * shrinkProgress) + 'px';

      const heroFade = Math.max(0, 1 - shrinkProgress * 2.8).toFixed(3);
      bgTopo.style.opacity = heroFade;
      bgDecor.style.opacity = heroFade;
      bgDecor.style.visibility = shrinkProgress > 0.30 ? 'hidden' : 'visible';

      bwWrap.style.opacity = Math.pow(shrinkProgress, 1.35).toFixed(3);
      bCanvas.style.opacity = (1 - shrinkProgress * 0.95).toFixed(3);
      bgQuoteWrap.style.opacity = Math.min(1, shrinkProgress * 1.35).toFixed(3);

      const logoEl = document.getElementById('atw-single-brand-logo');
      if (logoEl) {
        logoEl.style.color = shrinkProgress > 0.35 ? '#F4F4ED' : '#111112';
      }

      const sigImg = document.getElementById('atw-sig-img');
      if (shrinkProgress > 0.70) {
        sigWrap.style.opacity = '1';
        if (sigImg) sigImg.style.clipPath = 'inset(0 0% 0 0)';
      } else {
        sigWrap.style.opacity = '0';
        if (sigImg) sigImg.style.clipPath = 'inset(0 100% 0 0)';
      }

      const exitStart = h * 1.30;
      if (sy > exitStart) {
        const exitOffset = sy - exitStart;
        stage.style.transform = `translateY(${-exitOffset}px)`;
        stage.style.visibility = exitOffset > h * 0.9 ? 'hidden' : 'visible';
      } else {
        stage.style.transform = 'translateY(0px)';
        stage.style.visibility = 'visible';
      }

      requestAnimationFrame(animate);
    }
    animate();
  }

  function mountPage3SkillTree() {
    if (document.getElementById('atw-page3-skill-tree')) return;
    const candidates = Array.from(document.querySelectorAll('section, div')).filter(el => {
      if (el.closest('#atw-master-stage') || el.id === 'atw-page3-skill-tree') return false;
      const t = (el.textContent || '').toUpperCase();
      return (t.includes('REDEFINING') && t.includes('LEGACY') && el.offsetHeight > 220 && el.offsetHeight < 1400);
    });
    if (candidates.length > 0) {
      const target = candidates[candidates.length - 1];
      const treeSec = document.createElement('section');
      treeSec.id = 'atw-page3-skill-tree';
      treeSec.innerHTML = SKILL_TREE_HTML;
      target.parentNode.insertBefore(treeSec, target);
      target.style.display = 'none';
    }
  }

  window.openATWLightbox = function(src, title) {
    const lb = document.getElementById('atw-lightbox');
    const im = document.getElementById('atw-lightbox-img');
    const tl = document.getElementById('atw-lightbox-title');
    if (lb && im && tl) {
      im.src = src;
      tl.textContent = title;
      lb.style.display = 'flex';
    }
  };

  function mountPage4HorizontalGallery() {
    if (document.getElementById('atw-page4-pin-wrap')) return;
    const p3 = document.getElementById('atw-page3-skill-tree');
    if (!p3) return;

    const pinWrap = document.createElement('section');
    pinWrap.id = 'atw-page4-pin-wrap';
    pinWrap.innerHTML = P4_GALLERY_HTML;
    p3.parentNode.insertBefore(pinWrap, p3.nextSibling);

    let currentX = 0;
    let targetX  = 0;

    function updateP4Scroll() {
      const wrap = document.getElementById('atw-page4-pin-wrap');
      const track = document.getElementById('atw-p4-track');
      const wm = document.getElementById('atw-p4-wm');
      const counter = document.getElementById('atw-p4-counter');
      if (wrap && track) {
        const rect = wrap.getBoundingClientRect();
        const scrollable = Math.max(1, wrap.offsetHeight - window.innerHeight);
        const rawProgress = -rect.top / scrollable;
        const progress = Math.max(0, Math.min(1, rawProgress));

        const maxShift = Math.max(0, track.scrollWidth - window.innerWidth + 140);
        targetX = progress * maxShift;
        currentX += (targetX - currentX) * 0.14;

        track.style.transform = `translate3d(${-currentX.toFixed(1)}px, 0, 0)`;
        if (wm) wm.style.transform = `translate3d(${(-currentX * 0.35).toFixed(1)}px, -50%, 0)`;
        if (counter) {
          const curIdx = Math.min(TOTAL_P4_ITEMS, Math.max(1, Math.round(progress * (TOTAL_P4_ITEMS - 1)) + 1));
          counter.textContent = `ARCHIVE // ${curIdx} OF ${TOTAL_P4_ITEMS} (CLICK CARD TO ZOOM)`;
        }
      }
      requestAnimationFrame(updateP4Scroll);
    }
    requestAnimationFrame(updateP4Scroll);
  }

  function swapPhotosAndProjects() {
    return; // Disabled so sections after Page 4 stay untouched until we number them!
    const imgs = Array.from(document.querySelectorAll('img')).filter(img => {
      if (img.id === 'atw-sig-img' || img.classList.contains('atw-p4-locked-img') || img.closest('#atw-master-stage') || img.closest('#atw-page3-skill-tree') || img.closest('#atw-page4-pin-wrap') || img.closest('#atw-lightbox')) return false;
      const s = (img.getAttribute('src') || '').toLowerCase();
      if (!s || s.endsWith('.svg')) return false;
      return true;
    });

    let pIdx = 0, projIdx = 0;
    imgs.forEach(img => {
      img.removeAttribute('srcset');
      img.removeAttribute('sizes');
      const sectionCls = ((img.parentElement?.className || '') + ' ' + (img.closest('section, div')?.className || '')).toLowerCase();
      if (sectionCls.includes('helmet') && PROJ_SHOTS.length > 0) {
        img.src = PROJ_SHOTS[projIdx % PROJ_SHOTS.length];
        projIdx++;
      } else if (REAL_PHOTOS.length > 0) {
        img.src = REAL_PHOTOS[pIdx % REAL_PHOTOS.length];
        pIdx++;
      }
    });
  }

  function init() {
    handlePreloaderLifecycle();
    hideDefaultCenterLNLogosAndCursorBugs();
    updateTextAndBrand();
    mountApprovedHeroAndShrunkStage();
    mountPage3SkillTree();
    mountPage4HorizontalGallery();
    swapPhotosAndProjects();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  window.addEventListener('load', () => { init(); setTimeout(init, 500); setTimeout(init, 1400); });
})();
