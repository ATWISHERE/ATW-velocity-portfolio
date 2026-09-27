"""
ATW Velocity Portfolio - Complete Asset Vault Generator
Builds all photos, realistic engineering UI screenshots, floating cutouts, and 2 PDF resumes.
"""

import os
import sys
import math
import random
from pathlib import Path

# Paths
BASE_DIR = Path(__file__).resolve().parent.parent
PUBLIC_DIR = BASE_DIR / "public"
PHOTOS_DIR = PUBLIC_DIR / "photos"
PROJECTS_DIR = PUBLIC_DIR / "projects"
RESUMES_DIR = PUBLIC_DIR / "resumes"

for d in [PHOTOS_DIR, PROJECTS_DIR, RESUMES_DIR]:
    d.mkdir(parents=True, exist_ok=True)

from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

# Palette definitions
LIME = "#D2FF00"
LIME_RGB = (210, 255, 0)
LIME_DIM = (160, 200, 0)
DARK_BG = (10, 10, 13)
CARD_BG = (17, 17, 21)
CARD_BORDER = (34, 34, 43)
TEXT_WHITE = (245, 245, 250)
TEXT_MUTED = (140, 140, 160)
ACCENT_CYAN = (0, 240, 255)
ACCENT_AMBER = (255, 180, 0)
ACCENT_GREEN = (0, 230, 120)
ACCENT_RED = (255, 60, 80)
ACCENT_BLUE = (60, 130, 255)

# Font loading helper
def get_font(size, bold=False, mono=False):
    win_fonts = Path("C:/Windows/Fonts")
    candidates = []
    if mono:
        candidates = ["consolab.ttf" if bold else "consola.ttf", "courbd.ttf" if bold else "cour.ttf"]
    else:
        candidates = ["segoeuib.ttf" if bold else "segoeui.ttf", "arialbd.ttf" if bold else "arial.ttf"]
    
    for c in candidates:
        fp = win_fonts / c
        if fp.exists():
            try:
                return ImageFont.truetype(str(fp), size)
            except Exception:
                pass
    return ImageFont.load_default()

def draw_header_bar(draw, x, y, width, height, title, breadcrumb="ENGINEERING_SYS // PROD"):
    draw.rectangle([x, y, x + width, y + height], fill=(14, 14, 18))
    draw.line([x, y + height, x + width, y + height], fill=CARD_BORDER, width=1)
    
    # Window controls (macOS/Terminal style dots)
    dot_y = y + height // 2
    draw.ellipse([x + 16, dot_y - 5, x + 26, dot_y + 5], fill=(255, 95, 86))
    draw.ellipse([x + 32, dot_y - 5, x + 42, dot_y + 5], fill=(255, 189, 46))
    draw.ellipse([x + 48, dot_y - 5, x + 58, dot_y + 5], fill=(39, 201, 63))
    
    # Title & Breadcrumb
    f_title = get_font(14, bold=True, mono=True)
    f_crumb = get_font(12, mono=True)
    draw.text((x + 72, y + 10), title, fill=TEXT_WHITE, font=f_title)
    draw.text((x + width - 260, y + 12), breadcrumb, fill=LIME_RGB, font=f_crumb)

def draw_grid_background(draw, width, height, spacing=40, color=(18, 18, 24)):
    for gx in range(0, width, spacing):
        draw.line([gx, 0, gx, height], fill=color, width=1)
    for gy in range(0, height, spacing):
        draw.line([0, gy, width, gy], fill=color, width=1)

def draw_hud_bracket(draw, x1, y1, x2, y2, color=LIME_RGB, length=15, width=2):
    # Top-Left
    draw.line([x1, y1, x1 + length, y1], fill=color, width=width)
    draw.line([x1, y1, x1, y1 + length], fill=color, width=width)
    # Top-Right
    draw.line([x2, y1, x2 - length, y1], fill=color, width=width)
    draw.line([x2, y1, x2, y1 + length], fill=color, width=width)
    # Bottom-Left
    draw.line([x1, y2, x1 + length, y2], fill=color, width=width)
    draw.line([x1, y2, x1, y2 - length], fill=color, width=width)
    # Bottom-Right
    draw.line([x2, y2, x2 - length, y2], fill=color, width=width)
    draw.line([x2, y2, x2, y2 - length], fill=color, width=width)

# ==========================================
# PART A: PHOTOS (HERO PORTRAIT & HELMET)
# ==========================================
def build_hero_photos():
    print("-> Processing Hero Photos...")
    src_photo = None
    for candidate in [BASE_DIR / "my-photo.jpg", BASE_DIR / "retouch_2026053121210995.jpg"]:
        if candidate.exists():
            src_photo = candidate
            break
            
    if not src_photo:
        print("WARN: my-photo.jpg not found, creating synthetic portrait baseline.")
        img = Image.new("RGB", (1000, 1200), (25, 25, 30))
        d = ImageDraw.Draw(img)
        d.rectangle([200, 200, 800, 1000], fill=(40, 40, 50))
    else:
        orig = Image.open(src_photo).convert("RGB")
        ow, oh = orig.size
        # Crop: left: 20.8%, top: 8.5%, right: 74.8%, bottom: 73.3%
        box = (int(ow * 0.208), int(oh * 0.085), int(ow * 0.748), int(oh * 0.733))
        cropped = orig.crop(box)
        
        # Background removal: try rembg, fallback to smooth oval bust mask
        bust_rgba = None
        try:
            import rembg
            print("  Running rembg for AI background removal...")
            bust_rgba = rembg.remove(cropped)
            print("  rembg background removal successful.")
        except Exception as e:
            print(f"  rembg fallback (reason: {e}). Applying feathered bust mask in Pillow...")
            cw, ch = cropped.size
            mask = Image.new("L", (cw, ch), 0)
            mdraw = ImageDraw.Draw(mask)
            # Oval head and torso trapezoid
            head_box = (int(cw * 0.15), int(ch * 0.04), int(cw * 0.85), int(ch * 0.65))
            mdraw.ellipse(head_box, fill=255)
            torso_poly = [
                (int(cw * 0.05), ch),
                (int(cw * 0.18), int(ch * 0.45)),
                (int(cw * 0.82), int(ch * 0.45)),
                (int(cw * 0.95), ch)
            ]
            mdraw.polygon(torso_poly, fill=255)
            # Smooth feather blur
            mask = mask.filter(ImageFilter.GaussianBlur(radius=14))
            bust_rgba = cropped.convert("RGBA")
            bust_rgba.putalpha(mask)

        # Target 1000x1200 canvas
        canvas = Image.new("RGBA", (1000, 1200), (0, 0, 0, 0))
        # Scale cropped bust to fill lower 85% of canvas height
        bw, bh = bust_rgba.size
        target_h = int(1200 * 0.90)
        target_w = int(bw * (target_h / bh))
        bust_resized = bust_rgba.resize((target_w, target_h), Image.Resampling.LANCZOS)
        
        offset_x = (1000 - target_w) // 2
        offset_y = 1200 - target_h
        canvas.paste(bust_resized, (offset_x, offset_y), bust_resized)
        canvas.save(PHOTOS_DIR / "hero-portrait.png", "PNG")
        print(f"  Saved {PHOTOS_DIR / 'hero-portrait.png'}")

    # --- HERO HELMET & TELEMETRY HUD COMPOSITE ---
    portrait = Image.open(PHOTOS_DIR / "hero-portrait.png").convert("RGBA")
    helmet = portrait.copy()
    hdraw = ImageDraw.Draw(helmet)

    # Eye-line is at Y: 460px on 1000x1200 canvas
    # Visor bounds
    vx1, vy1, vx2, vy2 = 290, 400, 710, 525
    
    # 1. Visor tint glass layer
    visor_glass = Image.new("RGBA", (1000, 1200), (0, 0, 0, 0))
    vg_draw = ImageDraw.Draw(visor_glass)
    vg_draw.rounded_rectangle([vx1, vy1, vx2, vy2], radius=32, fill=(12, 14, 18, 220), outline=LIME_RGB, width=3)
    
    # Upper brow carbon strip
    brow_y1, brow_y2 = vy1 - 32, vy1 + 6
    vg_draw.rounded_rectangle([vx1 - 10, brow_y1, vx2 + 10, brow_y2], radius=10, fill=(20, 20, 24, 250), outline=(50, 50, 60), width=2)
    f_brow = get_font(18, bold=True, mono=True)
    vg_draw.text((vx1 + 40, brow_y1 + 6), "ATW // 01  •  RACING DYNAMICS", fill=LIME_RGB, font=f_brow)
    
    # Visor reflections & aerodynamic slope lines
    vg_draw.line([vx1 + 30, vy1 + 20, vx2 - 60, vy1 + 40], fill=(255, 255, 255, 70), width=4)
    vg_draw.line([vx1 + 45, vy1 + 28, vx2 - 90, vy1 + 46], fill=(255, 255, 255, 40), width=2)
    
    # Cyber HUD Telemetry over eye-line
    hud_center_x = (vx1 + vx2) // 2
    hud_center_y = (vy1 + vy2) // 2
    # Reticle
    vg_draw.ellipse([hud_center_x - 36, hud_center_y - 36, hud_center_x + 36, hud_center_y + 36], outline=LIME_RGB, width=1)
    vg_draw.ellipse([hud_center_x - 18, hud_center_y - 18, hud_center_x + 18, hud_center_y + 18], outline=ACCENT_CYAN + (180,), width=1)
    vg_draw.line([hud_center_x - 45, hud_center_y, hud_center_x + 45, hud_center_y], fill=LIME_RGB, width=1)
    vg_draw.line([hud_center_x, hud_center_y - 45, hud_center_x, hud_center_y + 45], fill=LIME_RGB, width=1)
    
    # HUD Metrics text
    f_hud = get_font(11, mono=True)
    vg_draw.text((vx1 + 20, vy1 + 38), "SYS.OK // SPD: 218 KM/H", fill=LIME_RGB, font=f_hud)
    vg_draw.text((vx1 + 20, vy1 + 54), "G-FORCE: 3.4G | RPM: 11.2K", fill=(0, 240, 255, 220), font=f_hud)
    vg_draw.text((vx2 - 145, vy1 + 38), "THROTTLE: 98.4%", fill=LIME_RGB, font=f_hud)
    vg_draw.text((vx2 - 145, vy1 + 54), "TARGET LOCK: ENGAGED", fill=ACCENT_GREEN + (220,), font=f_hud)
    
    # Side pivot bolts
    for pivot_x in [vx1 - 16, vx2 + 16]:
        vg_draw.ellipse([pivot_x - 12, hud_center_y - 12, pivot_x + 12, hud_center_y + 12], fill=(28, 28, 35), outline=LIME_RGB, width=2)
        vg_draw.ellipse([pivot_x - 4, hud_center_y - 4, pivot_x + 4, hud_center_y + 4], fill=LIME_RGB)

    # Composite visor onto helmet
    helmet = Image.alpha_composite(helmet, visor_glass)
    helmet.save(PHOTOS_DIR / "hero-helmet.png", "PNG")
    print(f"  Saved {PHOTOS_DIR / 'hero-helmet.png'}")

    # --- 6 GALLERY IMAGES ---
    gallery_data = [
        ("AI & OCR EXTRACTION LAB", "Multi-threaded text stream, bounding vectors & regex table parser", "01 / VISION"),
        ("PYAUTOGUI RPA ROBOTICS", "Hardware coordinate calibration, openpyxl batch runner", "02 / AUTOMATION"),
        ("DMG MORI 5-AXIS SPINDLE", "Omega Renk Bearings high-precision CNC toolpath telemetry", "03 / PRECISION"),
        ("AICTE EDUNET ML ENGINE", "Random Forest soil telemetry, confusion matrix & crop model", "04 / INTELLIGENCE"),
        ("JABALPUR ROBOTICS LAB", "Drone telemetry HUD, dual-motor PWM waveforms & STEM mentorship", "05 / HARDWARE"),
        ("EXECUTIVE ANALYTICS CORE", "Power BI dynamic KPI modeling, revenue spline & XLOOKUP", "06 / STRATEGY"),
    ]
    
    for idx, (title, desc, tag) in enumerate(gallery_data, start=1):
        g_img = Image.new("RGB", (1000, 750), DARK_BG)
        gd = ImageDraw.Draw(g_img)
        draw_grid_background(gd, 1000, 750, 40, (18, 18, 24))
        
        # Card inner
        gd.rounded_rectangle([40, 40, 960, 710], radius=16, fill=(14, 14, 18), outline=CARD_BORDER, width=2)
        draw_hud_bracket(gd, 40, 40, 960, 710, LIME_RGB, length=24, width=3)
        
        # Tag & Title
        f_tag = get_font(13, bold=True, mono=True)
        f_title = get_font(26, bold=True, mono=True)
        f_desc = get_font(14, mono=True)
        gd.text((80, 70), tag, fill=LIME_RGB, font=f_tag)
        gd.text((80, 100), title, fill=TEXT_WHITE, font=f_title)
        gd.text((80, 140), desc, fill=TEXT_MUTED, font=f_desc)
        
        # Graphic representation inside gallery
        # Waveform / telemetry grid
        for i in range(80, 920, 20):
            val = math.sin((i + idx * 40) * 0.03) * 120 + 400
            gd.line([i, 400, i, int(val)], fill=(30, 35, 45), width=2)
            gd.ellipse([i - 3, int(val) - 3, i + 3, int(val) + 3], fill=LIME_RGB if i % 60 == 0 else ACCENT_CYAN)
        
        # HUD Metrics box
        gd.rounded_rectangle([80, 560, 440, 670], radius=8, fill=(20, 20, 26), outline=CARD_BORDER, width=1)
        gd.text((100, 580), "LIVE TELEMETRY BUS", fill=LIME_RGB, font=f_tag)
        gd.text((100, 605), f"BUFFER: 0x8FA{idx:02X} | CLOCK: 4.8 GHz", fill=TEXT_WHITE, font=get_font(12, mono=True))
        gd.text((100, 630), "STATUS: OPTIMAL [ZERO LATENCY]", fill=ACCENT_GREEN, font=get_font(12, mono=True))
        
        gd.rounded_rectangle([480, 560, 920, 670], radius=8, fill=(20, 20, 26), outline=CARD_BORDER, width=1)
        gd.text((500, 580), "ENGINEERING STACK", fill=LIME_RGB, font=f_tag)
        gd.text((500, 605), "PYTHON • OPENCV • SCIPY • DMG MORI • ROS", fill=TEXT_WHITE, font=get_font(12, mono=True))
        gd.text((500, 630), "VERIFIED PRODUCTION BENCHMARK", fill=ACCENT_CYAN, font=get_font(12, mono=True))
        
        g_img.save(PHOTOS_DIR / f"gallery-{idx}.png", "PNG")
        print(f"  Saved {PHOTOS_DIR / f'gallery-{idx}.png'}")

    # --- 5 SOCIAL FAN CARDS ---
    social_data = [
        ("GITHUB // ATWISHERE", "Full-Stack AI, Python RPA & Robotics Repositories", "@ATWISHERE", "99.4% AUTOMATION COMMIT RATE"),
        ("LINKEDIN // PROFILE", "Abdul Tarique Warsi — AI & Precision Robotics Engineer", "in/abdul-tarique-warsi", "10+ ENTERPRISE AUTOMATION DELIVERIES"),
        ("VELOCITY DRIVER // 01", "Aerodynamics Telemetry & High-Speed Cyber Engineering", "DRIVER #01 // ATW", "MAX VELOCITY 342 KM/H • POLE POSITION"),
        ("ROOT SYSTEM TERMINAL", "Hardware Prototyping, ADB Daemons & Linux Automation", "KERNEL: 6.8.0-RT", "ZERO-TRUNCATION PARSER ARCHITECTURE"),
        ("AI & ROBOTICS EDUCATOR", "Jabalpur Innovation Hub • 150+ Future Engineers Mentored", "EDUCATOR / MENTOR", "GLOBAL SKILLS PARK TOURING FELLOW"),
    ]
    for idx, (title, subtitle, handle, stat) in enumerate(social_data, start=1):
        s_img = Image.new("RGB", (800, 1000), DARK_BG)
        sd = ImageDraw.Draw(s_img)
        draw_grid_background(sd, 800, 1000, 40, (18, 18, 24))
        
        sd.rounded_rectangle([30, 30, 770, 970], radius=20, fill=(15, 15, 20), outline=CARD_BORDER, width=2)
        draw_hud_bracket(sd, 30, 30, 770, 970, LIME_RGB, length=28, width=3)
        
        # Header strip
        sd.rounded_rectangle([50, 50, 750, 120], radius=10, fill=(22, 22, 28))
        sd.text((70, 65), title, fill=LIME_RGB, font=get_font(18, bold=True, mono=True))
        sd.text((70, 92), subtitle, fill=TEXT_MUTED, font=get_font(12, mono=True))
        
        # Center Emblem / Radar
        cx, cy = 400, 440
        for r in range(40, 220, 40):
            sd.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(35, 35, 45), width=1)
        sd.line([cx - 220, cy, cx + 220, cy], fill=(45, 45, 60), width=1)
        sd.line([cx, cy - 220, cx, cy + 220], fill=(45, 45, 60), width=1)
        
        # Radar sweep polygon
        radar_poly = [(cx, cy), (cx + 170, cy - 90), (cx + 200, cy - 30)]
        sd.polygon(radar_poly, fill=(210, 255, 0, 80))
        
        # Central Badge
        sd.ellipse([cx - 50, cy - 50, cx + 50, cy + 50], fill=(20, 20, 28), outline=LIME_RGB, width=2)
        sd.text((cx - 24, cy - 14), f"#{idx:02d}", fill=LIME_RGB, font=get_font(24, bold=True, mono=True))
        
        # Bottom Stats Bar
        sd.rounded_rectangle([50, 720, 750, 930], radius=14, fill=(20, 20, 26), outline=CARD_BORDER, width=1)
        sd.text((80, 750), "IDENTIFIER HANDLE:", fill=TEXT_MUTED, font=get_font(12, mono=True))
        sd.text((80, 775), handle, fill=LIME_RGB, font=get_font(20, bold=True, mono=True))
        
        sd.text((80, 825), "VERIFIED BENCHMARK:", fill=TEXT_MUTED, font=get_font(12, mono=True))
        sd.text((80, 850), stat, fill=TEXT_WHITE, font=get_font(15, bold=True, mono=True))
        
        s_img.save(PHOTOS_DIR / f"social-{idx}.png", "PNG")
        print(f"  Saved {PHOTOS_DIR / f'social-{idx}.png'}")

# ==========================================
# PART B: 8 REALISTIC PROJECT SCREENSHOTS & 8 CUTOUTS
# ==========================================
def build_projects():
    print("-> Generating 8 Project UI Screenshots (1200x900) & Cutouts (600x600)...")
    
    # -------------------------------------------------------------------------
    # PROJECT 1: Multi-Threaded PDF & PyTesseract OCR Table Extraction
    # -------------------------------------------------------------------------
    im1 = Image.new("RGB", (1200, 900), DARK_BG)
    d1 = ImageDraw.Draw(im1)
    draw_grid_background(d1, 1200, 900, 30, (16, 16, 22))
    
    # Window Frame
    d1.rounded_rectangle([30, 30, 1170, 870], radius=14, fill=CARD_BG, outline=CARD_BORDER, width=2)
    draw_header_bar(d1, 30, 30, 1140, 48, "TKINTER_OCR_PARSER_V3.4 — MULTI-THREADED TABLE EXTRACTOR", "STATUS: 100% VALIDATED")
    
    # Left Sidebar: Thread Pool & Pipeline controls
    d1.rectangle([30, 78, 300, 870], fill=(13, 13, 17))
    d1.line([300, 78, 300, 870], fill=CARD_BORDER, width=1)
    
    f_mono_sm = get_font(11, mono=True)
    f_mono_md = get_font(13, bold=True, mono=True)
    f_mono_lg = get_font(16, bold=True, mono=True)
    
    d1.text((50, 100), "THREAD POOL CONTROLLER", fill=LIME_RGB, font=f_mono_md)
    threads = [("Worker-01", "PDF Rasterizer", "100%", ACCENT_GREEN),
               ("Worker-02", "Tesseract LSTM", "100%", ACCENT_GREEN),
               ("Worker-03", "Regex Col Splitter", "98.4%", LIME_RGB),
               ("Worker-04", "CSV Validator", "RUNNING", ACCENT_CYAN)]
    for i, (name, job, pct, col) in enumerate(threads):
        ty = 135 + i * 55
        d1.rounded_rectangle([45, ty, 285, ty + 45], radius=6, fill=(20, 20, 26), outline=CARD_BORDER)
        d1.text((55, ty + 6), f"{name}: {job}", fill=TEXT_WHITE, font=f_mono_sm)
        d1.text((55, ty + 24), f"STATE: {pct}", fill=col, font=f_mono_sm)
    
    # Regex Filter Parameters
    d1.text((50, 380), "REGEX RULES ACTIVE", fill=LIME_RGB, font=f_mono_md)
    regexes = [r"^(\d{2,4})\s+([A-Z\s]{4,})\s+(\d+\.\d{2})",
               r"TOTAL_AMT:\s*INR\s*([0-9,]+\.[0-9]{2})",
               r"SPLIT_RULE: \t|\s{2,}"]
    for i, reg in enumerate(regexes):
        ry = 415 + i * 45
        d1.rounded_rectangle([45, ry, 285, ry + 36], radius=4, fill=(16, 16, 22), outline=(30, 30, 40))
        d1.text((55, ry + 10), reg, fill=(200, 200, 220), font=get_font(10, mono=True))
        
    # Main Pane: Dual Viewer (Scanned PDF left vs Extracted Table right)
    d1.text((325, 100), "DOCUMENT PARSER // LIVE FEED", fill=TEXT_MUTED, font=f_mono_sm)
    
    # Left Doc Preview
    d1.rounded_rectangle([325, 125, 715, 680], radius=8, fill=(22, 22, 28), outline=CARD_BORDER)
    d1.text((345, 140), "SCANNED INVOICE BATCH (PAGE 14/48)", fill=TEXT_WHITE, font=f_mono_md)
    # Mock scanned lines with red OCR bounding boxes
    for r in range(12):
        ly = 180 + r * 38
        d1.rectangle([345, ly, 695, ly + 26], fill=(28, 28, 35))
        # Bounding boxes
        d1.rectangle([350, ly + 2, 430, ly + 24], outline=ACCENT_RED, width=1)
        d1.rectangle([440, ly + 2, 580, ly + 24], outline=ACCENT_RED, width=1)
        d1.rectangle([590, ly + 2, 690, ly + 24], outline=ACCENT_RED, width=1)
        d1.text((355, ly + 6), f"SKU-{1000+r}", fill=(180, 180, 190), font=f_mono_sm)
        d1.text((445, ly + 6), f"INDUSTRIAL BEARING #{r+1}", fill=(180, 180, 190), font=f_mono_sm)
        d1.text((595, ly + 6), f"${(r+1)*142.50:.2f}", fill=LIME_RGB, font=f_mono_sm)
        
    # Right Table Extractor Preview
    d1.rounded_rectangle([735, 125, 1145, 680], radius=8, fill=(16, 20, 24), outline=LIME_RGB, width=1)
    d1.text((755, 140), "EXTRACTED CSV MATRIX (ZERO TRUNCATION)", fill=LIME_RGB, font=f_mono_md)
    # Table header
    d1.rectangle([745, 175, 1135, 205], fill=(24, 30, 36))
    d1.text((755, 182), "ITEM ID", fill=LIME_RGB, font=f_mono_sm)
    d1.text((840, 182), "DESCRIPTION", fill=LIME_RGB, font=f_mono_sm)
    d1.text((990, 182), "QTY", fill=LIME_RGB, font=f_mono_sm)
    d1.text((1050, 182), "CONFIDENCE", fill=LIME_RGB, font=f_mono_sm)
    
    for r in range(11):
        ty = 215 + r * 40
        d1.line([745, ty + 35, 1135, ty + 35], fill=(25, 32, 40), width=1)
        d1.text((755, ty + 8), f"0x{r+1:04X}", fill=TEXT_WHITE, font=f_mono_sm)
        d1.text((840, ty + 8), f"PARSED_REC_{r+101}", fill=TEXT_WHITE, font=f_mono_sm)
        d1.text((995, ty + 8), f"{r*5+12}", fill=TEXT_WHITE, font=f_mono_sm)
        d1.text((1055, ty + 8), "99.98%", fill=ACCENT_GREEN, font=f_mono_sm)
        
    # Bottom Status Bar: "100% VALIDATED — ZERO TRUNCATION"
    d1.rounded_rectangle([325, 705, 1145, 845], radius=8, fill=(14, 18, 16), outline=ACCENT_GREEN, width=1)
    d1.text((350, 725), "STATUS: 100% VALIDATED — ZERO TRUNCATION LOG", fill=LIME_RGB, font=f_mono_lg)
    d1.text((350, 760), "THROUGHPUT: 42.8 PAGES/SEC  •  THREAD CONSUMPTION: 248 MB RAM  •  ERROR COUNT: 0", fill=TEXT_WHITE, font=f_mono_md)
    d1.text((350, 795), "DESTINATION: SQLite3 / atw_validated_records.db [SYNCHRONIZED]", fill=ACCENT_CYAN, font=f_mono_sm)
    
    im1.save(PROJECTS_DIR / "project-1-ocr.png", "PNG")
    print(f"  Saved {PROJECTS_DIR / 'project-1-ocr.png'}")

    # Cutout 1: OCR Document & Vision Target Scanner (600x600 transparent)
    c1 = Image.new("RGBA", (600, 600), (0, 0, 0, 0))
    cd1 = ImageDraw.Draw(c1)
    cd1.rounded_rectangle([100, 80, 500, 520], radius=24, fill=(18, 20, 26, 240), outline=LIME_RGB, width=4)
    draw_hud_bracket(cd1, 80, 60, 520, 540, LIME_RGB, length=30, width=5)
    # Scanning laser
    cd1.line([120, 280, 480, 280], fill=LIME_RGB, width=6)
    for yline in range(140, 480, 36):
        cd1.line([140, yline, 460, yline], fill=(50, 60, 75, 200), width=4)
    cd1.text((160, 440), "OCR // ZERO-TRUNCATION", fill=LIME_RGB, font=get_font(18, bold=True, mono=True))
    c1.save(PROJECTS_DIR / "cutout-1.png", "PNG")

    # -------------------------------------------------------------------------
    # PROJECT 2: PyAutoGUI Student Data Entry RPA Bot
    # -------------------------------------------------------------------------
    im2 = Image.new("RGB", (1200, 900), DARK_BG)
    d2 = ImageDraw.Draw(im2)
    draw_grid_background(d2, 1200, 900, 30, (18, 16, 24))
    d2.rounded_rectangle([30, 30, 1170, 870], radius=14, fill=CARD_BG, outline=CARD_BORDER, width=2)
    draw_header_bar(d2, 30, 30, 1140, 48, "PYAUTOGUI RPA ENGINE — LIVE COORDINATE CALIBRATION & INGESTION", "QUEUE: 1,450 / 1,450 RECORDS")
    
    # Left Coordinate Inspector
    d2.rectangle([30, 78, 360, 870], fill=(14, 14, 19))
    d2.line([360, 78, 360, 870], fill=CARD_BORDER, width=1)
    d2.text((50, 100), "SCREEN TARGET MATRIX", fill=LIME_RGB, font=f_mono_md)
    
    coords = [
        ("Student Name Field", "X: 842  Y: 312", "TOLERANCE ±2px", ACCENT_GREEN),
        ("Enrollment ID Input", "X: 842  Y: 374", "TOLERANCE ±1px", ACCENT_GREEN),
        ("Department Dropdown", "X: 842  Y: 436", "TOLERANCE ±3px", ACCENT_GREEN),
        ("Semester Grade Cell", "X: 980  Y: 498", "TOLERANCE ±2px", ACCENT_GREEN),
        ("Submit Action Button", "X: 910  Y: 580", "CLICK DURATION 80ms", LIME_RGB),
    ]
    for i, (fld, xy, tol, col) in enumerate(coords):
        cy = 135 + i * 70
        d2.rounded_rectangle([45, cy, 345, cy + 60], radius=6, fill=(22, 22, 28), outline=CARD_BORDER)
        d2.text((55, cy + 8), fld, fill=TEXT_WHITE, font=f_mono_sm)
        d2.text((55, cy + 26), xy, fill=col, font=f_mono_md)
        d2.text((55, cy + 44), tol, fill=TEXT_MUTED, font=get_font(10, mono=True))
        
    # Queue Telemetry Box
    d2.rounded_rectangle([45, 520, 345, 830], radius=8, fill=(18, 20, 26), outline=LIME_RGB, width=1)
    d2.text((60, 540), "OPENPYXL WORKBOOK BATCH", fill=LIME_RGB, font=f_mono_md)
    d2.text((60, 575), "Source: student_records_2024.xlsx", fill=TEXT_WHITE, font=f_mono_sm)
    d2.text((60, 605), "Processed: 1,450 rows (100%)", fill=ACCENT_GREEN, font=f_mono_sm)
    d2.text((60, 635), "Cadence: 3.2 form fields/sec", fill=TEXT_WHITE, font=f_mono_sm)
    d2.text((60, 665), "Failed Transactions: 0", fill=ACCENT_GREEN, font=f_mono_sm)
    d2.text((60, 695), "Fallback Fail-Safe: PyAutoGUI.FAILSAFE=True", fill=ACCENT_CYAN, font=get_font(10, mono=True))
    
    # Right Main: Live RPA HUD Screen Capture with Crosshairs
    d2.rounded_rectangle([390, 100, 1140, 660], radius=10, fill=(10, 12, 16), outline=CARD_BORDER)
    d2.text((410, 120), "AUTOMATED DESKTOP PORTAL VIEW [CALIBRATED]", fill=TEXT_MUTED, font=f_mono_sm)
    
    # Target Input Fields Mockup
    inputs = ["FULL NAME: Abdul Tarique Warsi", "ROLL NO: 0103CS201042", "BRANCH: Computer Science & Eng.", "CGPA: 9.03 / 10.0 (Board Topper)"]
    for i, inp in enumerate(inputs):
        iy = 160 + i * 90
        d2.rounded_rectangle([420, iy, 1110, iy + 65], radius=6, fill=(18, 18, 24), outline=CARD_BORDER)
        d2.text((440, iy + 22), inp, fill=TEXT_WHITE, font=f_mono_md)
        # Laser crosshair on active field
        if i == 1:
            d2.rounded_rectangle([420, iy, 1110, iy + 65], radius=6, outline=LIME_RGB, width=2)
            d2.line([842 - 25, iy + 32, 842 + 25, iy + 32], fill=LIME_RGB, width=2)
            d2.line([842, iy + 32 - 25, 842, iy + 32 + 25], fill=LIME_RGB, width=2)
            d2.ellipse([842 - 12, iy + 32 - 12, 842 + 12, iy + 32 + 12], outline=LIME_RGB, width=1)
            d2.text((880, iy + 14), "TARGET LOCK [X:842, Y:374]", fill=LIME_RGB, font=get_font(10, mono=True))

    # Bottom Terminal Output
    d2.rounded_rectangle([390, 680, 1140, 845], radius=8, fill=(12, 12, 16), outline=(35, 35, 45))
    d2.text((410, 695), "SYSTEM LOG // RPA_WORKER_DAEMON", fill=LIME_RGB, font=f_mono_sm)
    logs = [
        "[INFO] 17:42:01 - OpenPyXL workbook loaded: 1,450 rows parsed.",
        "[EXEC] 17:42:08 - Form batch #42 completed in 312ms. Checksum OK.",
        "[SUCCESS] All 1,450 records verified with zero human-intervention faults."
    ]
    for i, lg in enumerate(logs):
        d2.text((410, 725 + i * 26), lg, fill=(180, 240, 180) if "SUCCESS" in lg else TEXT_WHITE, font=f_mono_sm)
        
    im2.save(PROJECTS_DIR / "project-2-pyautogui.png", "PNG")
    print(f"  Saved {PROJECTS_DIR / 'project-2-pyautogui.png'}")

    # Cutout 2: RPA Robot Gripper & Coordinate Cursor (600x600)
    c2 = Image.new("RGBA", (600, 600), (0, 0, 0, 0))
    cd2 = ImageDraw.Draw(c2)
    cd2.rounded_rectangle([100, 100, 500, 500], radius=30, fill=(16, 18, 24, 240), outline=LIME_RGB, width=4)
    # Cursor crosshair
    cd2.line([160, 300, 440, 300], fill=LIME_RGB, width=4)
    cd2.line([300, 160, 300, 440], fill=LIME_RGB, width=4)
    cd2.ellipse([240, 240, 360, 360], outline=ACCENT_CYAN, width=3)
    cd2.text((190, 430), "RPA // PYAUTOGUI", fill=LIME_RGB, font=get_font(20, bold=True, mono=True))
    c2.save(PROJECTS_DIR / "cutout-2.png", "PNG")

    # -------------------------------------------------------------------------
    # PROJECT 3: AICTE Edunet Crop & Fertilizer ML Dashboard
    # -------------------------------------------------------------------------
    im3 = Image.new("RGB", (1200, 900), DARK_BG)
    d3 = ImageDraw.Draw(im3)
    draw_grid_background(d3, 1200, 900, 30, (16, 20, 18))
    d3.rounded_rectangle([30, 30, 1170, 870], radius=14, fill=CARD_BG, outline=CARD_BORDER, width=2)
    draw_header_bar(d3, 30, 30, 1140, 48, "AICTE EDUNET // CROP & FERTILIZER ML INTELLIGENCE SYSTEM", "MODEL: RANDOM FOREST (92.4% ACCURACY)")
    
    # Left Telemetry Inputs (Soil Parameters)
    d3.rectangle([30, 78, 360, 870], fill=(13, 16, 15))
    d3.line([360, 78, 360, 870], fill=CARD_BORDER, width=1)
    d3.text((50, 100), "SOIL TELEMETRY PARAMETERS", fill=LIME_RGB, font=f_mono_md)
    
    soil_params = [
        ("Nitrogen (N Ratio)", "84 mg/kg", 0.75, ACCENT_GREEN),
        ("Phosphorus (P Ratio)", "42 mg/kg", 0.45, ACCENT_CYAN),
        ("Potassium (K Ratio)", "120 mg/kg", 0.88, LIME_RGB),
        ("Soil pH Value", "6.5 pH (Neutral)", 0.65, ACCENT_AMBER),
        ("Annual Rainfall", "202.4 mm", 0.58, ACCENT_BLUE),
        ("Ambient Temperature", "26.8 °C", 0.62, ACCENT_RED),
    ]
    for i, (name, val, ratio, col) in enumerate(soil_params):
        py = 135 + i * 80
        d3.text((50, py), name, fill=TEXT_MUTED, font=f_mono_sm)
        d3.text((50, py + 18), val, fill=TEXT_WHITE, font=f_mono_md)
        # Meter bar
        d3.rectangle([50, py + 42, 330, py + 52], fill=(25, 30, 30))
        d3.rectangle([50, py + 42, int(50 + 280 * ratio), py + 52], fill=col)
        
    d3.rounded_rectangle([45, 680, 345, 830], radius=8, fill=(18, 24, 20), outline=LIME_RGB, width=1)
    d3.text((60, 700), "DATASET SPECIFICATIONS", fill=LIME_RGB, font=f_mono_md)
    d3.text((60, 730), "Rows Processed: 10,000+ Samples", fill=TEXT_WHITE, font=f_mono_sm)
    d3.text((60, 755), "Source: AICTE Edunet Green Tech", fill=TEXT_WHITE, font=f_mono_sm)
    d3.text((60, 780), "Cross-Validation: 10-Fold Stratified", fill=ACCENT_GREEN, font=f_mono_sm)
    
    # Right Main: Model Benchmark + Confusion Matrix
    # Metric Cards Top Right
    metrics = [
        ("MODEL ACCURACY", "92.4%", "Random Forest Classifier", LIME_RGB),
        ("DECISION TREE", "87.1%", "Pruned Depth=12", TEXT_WHITE),
        ("ROC-AUC SCORE", "0.968", "Multi-Class Micro Avg", ACCENT_CYAN),
    ]
    for i, (m_title, m_val, m_sub, m_col) in enumerate(metrics):
        mx = 390 + i * 255
        d3.rounded_rectangle([mx, 100, mx + 240, 210], radius=8, fill=(18, 22, 22), outline=CARD_BORDER)
        d3.text((mx + 16, 116), m_title, fill=TEXT_MUTED, font=f_mono_sm)
        d3.text((mx + 16, 142), m_val, fill=m_col, font=get_font(28, bold=True, mono=True))
        d3.text((mx + 16, 182), m_sub, fill=TEXT_WHITE, font=get_font(10, mono=True))
        
    # Confusion Matrix Heatmap
    d3.rounded_rectangle([390, 230, 760, 620], radius=8, fill=(16, 20, 20), outline=CARD_BORDER)
    d3.text((410, 245), "CONFUSION MATRIX (TOP 5 CROPS)", fill=LIME_RGB, font=f_mono_md)
    crops = ["WHEAT", "RICE", "MAIZE", "COTTON", "JUTE"]
    for row in range(5):
        for col in range(5):
            bx = 470 + col * 52
            by = 310 + row * 52
            intensity = 220 if row == col else 30
            c_fill = (int(intensity * 0.8), intensity, 0) if row == col else (20, 25, 30)
            d3.rectangle([bx, by, bx + 48, by + 48], fill=c_fill)
            d3.text((bx + 10, by + 16), str(94 if row == col else 2), fill=(10, 10, 10) if row == col else TEXT_MUTED, font=f_mono_sm)
            
    # Crop Prediction Recommendation Card
    d3.rounded_rectangle([780, 230, 1145, 620], radius=8, fill=(14, 24, 18), outline=LIME_RGB, width=2)
    d3.text((805, 250), "OPTIMAL CROP RECOMMENDATION", fill=LIME_RGB, font=f_mono_md)
    d3.text((805, 290), "WHEAT (Triticum aestivum)", fill=TEXT_WHITE, font=get_font(20, bold=True, mono=True))
    d3.text((805, 330), "CONFIDENCE FACTOR: 98.4%", fill=ACCENT_GREEN, font=f_mono_md)
    d3.text((805, 365), "NPK Ratio match: 94.2% within optimal envelope.", fill=TEXT_MUTED, font=f_mono_sm)
    d3.text((805, 395), "Recommended Fertilizer: Urea + DAP (4:2:1)", fill=TEXT_WHITE, font=f_mono_sm)
    
    # Feature Importance Bars
    d3.rounded_rectangle([390, 640, 1145, 845], radius=8, fill=(16, 20, 20), outline=CARD_BORDER)
    d3.text((410, 660), "FEATURE IMPORTANCE (GINI IMPURITY REDUCTION)", fill=LIME_RGB, font=f_mono_md)
    feats = [("Rainfall", 0.34), ("Humidity", 0.26), ("Potassium (K)", 0.18), ("Nitrogen (N)", 0.14), ("pH Value", 0.08)]
    for i, (fn, fv) in enumerate(feats):
        fy = 700 + i * 26
        d3.text((410, fy), f"{fn:16s}", fill=TEXT_WHITE, font=f_mono_sm)
        d3.rectangle([560, fy + 4, 1100, fy + 14], fill=(25, 30, 30))
        d3.rectangle([560, fy + 4, int(560 + 540 * fv), fy + 14], fill=LIME_RGB)
        
    im3.save(PROJECTS_DIR / "project-3-crop-ml.png", "PNG")
    print(f"  Saved {PROJECTS_DIR / 'project-3-crop-ml.png'}")

    # Cutout 3: ML Seedling & Neural Node (600x600)
    c3 = Image.new("RGBA", (600, 600), (0, 0, 0, 0))
    cd3 = ImageDraw.Draw(c3)
    cd3.rounded_rectangle([100, 100, 500, 500], radius=30, fill=(14, 22, 18, 240), outline=LIME_RGB, width=4)
    # Neural Connections
    pts = [(200, 200), (400, 200), (300, 300), (200, 400), (400, 400)]
    for p1 in pts:
        for p2 in pts:
            cd3.line([p1[0], p1[1], p2[0], p2[1]], fill=(30, 60, 40, 180), width=2)
    for px, py in pts:
        cd3.ellipse([px - 14, py - 14, px + 14, py + 14], fill=LIME_RGB)
    cd3.text((180, 440), "ML // 92.4% ACCURACY", fill=LIME_RGB, font=get_font(18, bold=True, mono=True))
    c3.save(PROJECTS_DIR / "cutout-3.png", "PNG")

    # -------------------------------------------------------------------------
    # PROJECT 4: Executive Power BI & Excel Sales KPI Dashboard
    # -------------------------------------------------------------------------
    im4 = Image.new("RGB", (1200, 900), DARK_BG)
    d4 = ImageDraw.Draw(im4)
    draw_grid_background(d4, 1200, 900, 30, (18, 18, 24))
    d4.rounded_rectangle([30, 30, 1170, 870], radius=14, fill=CARD_BG, outline=CARD_BORDER, width=2)
    draw_header_bar(d4, 30, 30, 1140, 48, "POWER BI EXECUTIVE SUITE — SALES & REGIONAL PERFORMANCE", "DATA ENGINE: DYNAMIC XLOOKUP")
    
    # 4 Top KPI Cards
    top_kpis = [
        ("TOTAL REVENUE", "$4,824,500", "+18.4% YoY", ACCENT_GREEN),
        ("GROSS PROFIT MARGIN", "42.6%", "+3.2% vs Plan", LIME_RGB),
        ("ACTIVE ACCOUNTS", "12,480", "99.1% Retention", ACCENT_CYAN),
        ("TOP SALES TERRITORY", "NORTH INDIA", "148% of Quota", ACCENT_AMBER),
    ]
    for i, (k_name, k_val, k_delta, k_col) in enumerate(top_kpis):
        kx = 50 + i * 275
        d4.rounded_rectangle([kx, 95, kx + 260, 205], radius=8, fill=(20, 22, 28), outline=CARD_BORDER)
        d4.text((kx + 16, 110), k_name, fill=TEXT_MUTED, font=f_mono_sm)
        d4.text((kx + 16, 134), k_val, fill=TEXT_WHITE, font=get_font(24, bold=True, mono=True))
        d4.text((kx + 16, 174), k_delta, fill=k_col, font=f_mono_sm)
        
    # Main Revenue Chart with Spline curve
    d4.rounded_rectangle([50, 225, 760, 560], radius=8, fill=(16, 18, 22), outline=CARD_BORDER)
    d4.text((70, 245), "ANNUAL REVENUE TRAJECTORY (ACTUAL VS FORECAST)", fill=LIME_RGB, font=f_mono_md)
    # Chart Grid
    for gy in range(300, 540, 50):
        d4.line([70, gy, 740, gy], fill=(28, 30, 38), width=1)
    # Revenue spline
    chart_points = [(100, 480), (180, 450), (260, 420), (340, 440), (420, 380), (500, 340), (580, 310), (660, 280)]
    for i in range(len(chart_points) - 1):
        d4.line([chart_points[i][0], chart_points[i][1], chart_points[i+1][0], chart_points[i+1][1]], fill=LIME_RGB, width=3)
        d4.ellipse([chart_points[i][0] - 4, chart_points[i][1] - 4, chart_points[i][0] + 4, chart_points[i][1] + 4], fill=LIME_RGB)
    d4.ellipse([chart_points[-1][0] - 5, chart_points[-1][1] - 5, chart_points[-1][0] + 5, chart_points[-1][1] + 5], fill=ACCENT_CYAN)
    
    # Regional Breakdown Bar Chart
    d4.rounded_rectangle([780, 225, 1145, 560], radius=8, fill=(16, 18, 22), outline=CARD_BORDER)
    d4.text((800, 245), "REGIONAL CONTRIBUTION", fill=LIME_RGB, font=f_mono_md)
    regions = [("North Zone", 0.85, LIME_RGB), ("West Zone", 0.65, ACCENT_CYAN), ("South Zone", 0.52, ACCENT_BLUE), ("East Zone", 0.40, ACCENT_AMBER)]
    for i, (rn, rv, rc) in enumerate(regions):
        ry = 300 + i * 55
        d4.text((800, ry), rn, fill=TEXT_WHITE, font=f_mono_sm)
        d4.rectangle([800, ry + 22, 1120, ry + 36], fill=(28, 30, 38))
        d4.rectangle([800, ry + 22, int(800 + 320 * rv), ry + 36], fill=rc)
        
    # Excel Dynamic XLOOKUP Table
    d4.rounded_rectangle([50, 580, 1145, 845], radius=8, fill=(14, 16, 20), outline=CARD_BORDER)
    d4.text((70, 600), "MICROSOFT EXCEL DATA ENGINE // AUTOMATED XLOOKUP RECONCILIATION", fill=LIME_RGB, font=f_mono_md)
    # Formula bar
    d4.rounded_rectangle([70, 630, 1125, 665], radius=4, fill=(22, 24, 30), outline=(40, 42, 50))
    d4.text((80, 640), "fx =XLOOKUP(E2, tbl_Products[SKU], tbl_Products[Target_Rev] * tbl_Regional[Multiplier], 0, 1)", fill=LIME_RGB, font=f_mono_sm)
    
    # Spreadsheet headers
    d4.rectangle([70, 680, 1125, 710], fill=(28, 32, 40))
    cols = ["REGION_ID", "PRODUCT_SKU", "ACTUAL_SALES", "FORECAST", "VARIANCE", "RECONCILED_STATUS"]
    for i, col in enumerate(cols):
        d4.text((85 + i * 170, 688), col, fill=TEXT_WHITE, font=f_mono_sm)
        
    for r in range(3):
        ry = 720 + r * 38
        d4.line([70, ry + 32, 1125, ry + 32], fill=(24, 26, 32))
        d4.text((85, ry + 6), f"TERR-0{r+1}", fill=TEXT_MUTED, font=f_mono_sm)
        d4.text((255, ry + 6), f"BEARING-V{r+4}", fill=TEXT_WHITE, font=f_mono_sm)
        d4.text((425, ry + 6), f"${(r+2)*420}K", fill=TEXT_WHITE, font=f_mono_sm)
        d4.text((595, ry + 6), f"${(r+2)*390}K", fill=TEXT_WHITE, font=f_mono_sm)
        d4.text((765, ry + 6), "+7.4%", fill=ACCENT_GREEN, font=f_mono_sm)
        d4.text((935, ry + 6), "MATCHED [AUTO]", fill=LIME_RGB, font=f_mono_sm)
        
    im4.save(PROJECTS_DIR / "project-4-powerbi.png", "PNG")
    print(f"  Saved {PROJECTS_DIR / 'project-4-powerbi.png'}")

    # Cutout 4: Power BI Area Chart / KPI Gauge (600x600)
    c4 = Image.new("RGBA", (600, 600), (0, 0, 0, 0))
    cd4 = ImageDraw.Draw(c4)
    cd4.rounded_rectangle([100, 100, 500, 500], radius=30, fill=(18, 20, 26, 240), outline=LIME_RGB, width=4)
    # Bar Chart columns
    bars = [(150, 420, 60, 160), (230, 360, 60, 220), (310, 280, 60, 300), (390, 200, 60, 380)]
    for bx, by, bw, bh in bars:
        cd4.rectangle([bx, by, bx + bw, 420], fill=LIME_RGB if bx == 390 else (40, 50, 65))
    cd4.text((170, 450), "POWER BI // KPI INTEL", fill=LIME_RGB, font=get_font(18, bold=True, mono=True))
    c4.save(PROJECTS_DIR / "cutout-4.png", "PNG")

    # -------------------------------------------------------------------------
    # PROJECT 5: Jabalpur AI & Robotics Educator Lab HUD
    # -------------------------------------------------------------------------
    im5 = Image.new("RGB", (1200, 900), DARK_BG)
    d5 = ImageDraw.Draw(im5)
    draw_grid_background(d5, 1200, 900, 30, (16, 22, 24))
    d5.rounded_rectangle([30, 30, 1170, 870], radius=14, fill=CARD_BG, outline=CARD_BORDER, width=2)
    draw_header_bar(d5, 30, 30, 1140, 48, "JABALPUR ROBOTICS LAB — TELEMETRY & HARDWARE PROTOTYPING HUD", "MENTOR: ABDUL TARIQUE WARSI")
    
    # Dual Oscilloscope Channels
    d5.rounded_rectangle([50, 95, 760, 480], radius=8, fill=(12, 16, 18), outline=CARD_BORDER)
    d5.text((70, 115), "DUAL CHANNEL OSCILLOSCOPE // PWM MOTOR DRIVER (20 kHz)", fill=LIME_RGB, font=f_mono_md)
    # Grid lines
    for gx in range(70, 740, 40):
        d5.line([gx, 150, gx, 450], fill=(20, 28, 32), width=1)
    for gy in range(150, 450, 40):
        d5.line([70, gy, 740, gy], fill=(20, 28, 32), width=1)
    # Channel 1: Square PWM Waveform (Duty Cycle 74%)
    pwm_pts = []
    for step in range(8):
        sx = 80 + step * 80
        pwm_pts.extend([(sx, 320), (sx, 220), (sx + 58, 220), (sx + 58, 320), (sx + 80, 320)])
    for i in range(len(pwm_pts) - 1):
        d5.line([pwm_pts[i][0], pwm_pts[i][1], pwm_pts[i+1][0], pwm_pts[i+1][1]], fill=LIME_RGB, width=3)
    # Channel 2: Sine sensor echo (Cyan)
    for x in range(80, 720):
        y = int(380 + 35 * math.sin(x * 0.05))
        d5.point((x, y), fill=ACCENT_CYAN)
        
    # Drone Power Telemetry Box
    d5.rounded_rectangle([780, 95, 1145, 480], radius=8, fill=(16, 20, 24), outline=LIME_RGB, width=1)
    d5.text((805, 115), "COMPETITION DRONE TELEMETRY", fill=LIME_RGB, font=f_mono_md)
    
    drone_stats = [
        ("BATTERY PACK", "14.8V 4S LiPo (84%)", ACCENT_GREEN),
        ("CURRENT CONSUMPTION", "18.2 A (Hover State)", TEXT_WHITE),
        ("ESC PROTOCOL", "DShot600 (Bidirectional)", LIME_RGB),
        ("GYRO / ACCEL VECTOR", "X: 0.02  Y: -0.01  Z: 1.00", ACCENT_CYAN),
        ("FAILSAFE LINK", "ELRS 2.4GHz @ 500Hz", ACCENT_GREEN),
        ("ALTITUDE HOLD", "12.4 METERS AGL", TEXT_WHITE),
    ]
    for i, (k, v, c) in enumerate(drone_stats):
        dy = 155 + i * 50
        d5.text((805, dy), k, fill=TEXT_MUTED, font=f_mono_sm)
        d5.text((805, dy + 18), v, fill=c, font=f_mono_md)
        
    # Bottom: Educator Lab Workshop HUD & Sensor Array
    d5.rounded_rectangle([50, 500, 1145, 845], radius=8, fill=(14, 18, 20), outline=CARD_BORDER)
    d5.text((70, 520), "JABALPUR INNOVATION HUB // STUDENT PROTOTYPE LAB TELEMETRY", fill=LIME_RGB, font=f_mono_md)
    
    # 4 Lab Stations
    stations = [
        ("STATION 01: ARDUINO SENSOR MESH", "Ultrasonic HC-SR04 • Calibration: 42.8 cm • Zero Drift", ACCENT_CYAN),
        ("STATION 02: 4WD ROBOT CHASSIS", "L298N H-Bridge • Dual Encoders: 480 CPR • Speed: 1.2 m/s", LIME_RGB),
        ("STATION 03: IOT WEATHER TELEMETRY", "ESP32 Wi-Fi Node • MQTT Broker: atw_broker.local", ACCENT_GREEN),
        ("STATION 04: STUDENT COMPETITION RIG", "150+ Students Mentored • Drone Frame Structural FEA", ACCENT_AMBER),
    ]
    for i, (s_title, s_desc, s_col) in enumerate(stations):
        sy = 560 + i * 65
        d5.rounded_rectangle([70, sy, 1125, sy + 52], radius=6, fill=(20, 24, 28), outline=CARD_BORDER)
        d5.ellipse([90, sy + 18, 106, sy + 34], fill=s_col)
        d5.text((120, sy + 10), s_title, fill=TEXT_WHITE, font=f_mono_md)
        d5.text((120, sy + 30), s_desc, fill=TEXT_MUTED, font=f_mono_sm)
        
    im5.save(PROJECTS_DIR / "project-5-robotics.png", "PNG")
    print(f"  Saved {PROJECTS_DIR / 'project-5-robotics.png'}")

    # Cutout 5: Competition Quadcopter Drone Frame (600x600)
    c5 = Image.new("RGBA", (600, 600), (0, 0, 0, 0))
    cd5 = ImageDraw.Draw(c5)
    cd5.rounded_rectangle([100, 100, 500, 500], radius=30, fill=(16, 22, 26, 240), outline=LIME_RGB, width=4)
    # X-Frame arms
    cd5.line([160, 160, 440, 440], fill=LIME_RGB, width=8)
    cd5.line([160, 440, 440, 160], fill=LIME_RGB, width=8)
    # 4 Motors
    for mx, my in [(160, 160), (440, 160), (160, 440), (440, 440)]:
        cd5.ellipse([mx - 24, my - 24, mx + 24, my + 24], fill=(25, 35, 40), outline=ACCENT_CYAN, width=3)
    cd5.ellipse([270, 270, 330, 330], fill=LIME_RGB)
    cd5.text((170, 460), "ROBOTICS // TELEMETRY", fill=LIME_RGB, font=get_font(18, bold=True, mono=True))
    c5.save(PROJECTS_DIR / "cutout-5.png", "PNG")

    # -------------------------------------------------------------------------
    # PROJECT 6: n8n Node Mesh & ADB Android Debug Bridge Automation
    # -------------------------------------------------------------------------
    im6 = Image.new("RGB", (1200, 900), DARK_BG)
    d6 = ImageDraw.Draw(im6)
    draw_grid_background(d6, 1200, 900, 30, (22, 16, 24))
    d6.rounded_rectangle([30, 30, 1170, 870], radius=14, fill=CARD_BG, outline=CARD_BORDER, width=2)
    draw_header_bar(d6, 30, 30, 1140, 48, "N8N WORKFLOW AUTOMATION MESH & ADB DAEMON PIPELINE", "BRIDGE: EMULATOR-5554 (ONLINE)")
    
    # Workflow Canvas (Top Area)
    d6.rounded_rectangle([50, 95, 1145, 540], radius=8, fill=(14, 15, 20), outline=CARD_BORDER)
    d6.text((70, 115), "ENTERPRISE AUTOMATION GRAPH // EVENT-DRIVEN ORCHESTRATION", fill=LIME_RGB, font=f_mono_md)
    
    # 5 n8n Workflow Nodes
    nodes = [
        (100, 240, "WEBHOOK TRIGGER", "POST /api/v1/inbound", ACCENT_CYAN),
        (340, 240, "JSON SANITIZER", "Schema Validation", LIME_RGB),
        (580, 240, "ADB BRIDGE DAEMON", "Shell Command Execution", ACCENT_GREEN),
        (820, 170, "POSTGRESQL AUDIT", "INSERT INTO sys_log", ACCENT_BLUE),
        (820, 310, "TELEGRAM NOTIFIER", "Dispatch Security Alert", ACCENT_AMBER),
    ]
    # Connectors
    d6.line([280, 280, 340, 280], fill=LIME_RGB, width=3)
    d6.line([520, 280, 580, 280], fill=LIME_RGB, width=3)
    d6.line([760, 280, 820, 210], fill=LIME_RGB, width=2)
    d6.line([760, 280, 820, 350], fill=LIME_RGB, width=2)
    
    for nx, ny, n_name, n_sub, n_col in nodes:
        d6.rounded_rectangle([nx, ny, nx + 180, ny + 80], radius=8, fill=(22, 24, 32), outline=n_col, width=2)
        d6.text((nx + 14, ny + 16), n_name, fill=TEXT_WHITE, font=f_mono_sm)
        d6.text((nx + 14, ny + 44), n_sub, fill=n_col, font=get_font(10, mono=True))
        # Port dots
        d6.ellipse([nx - 6, ny + 34, nx + 6, ny + 46], fill=LIME_RGB)
        d6.ellipse([nx + 174, ny + 34, nx + 186, ny + 46], fill=LIME_RGB)
        
    # ADB Terminal Shell at Bottom
    d6.rounded_rectangle([50, 560, 1145, 845], radius=8, fill=(10, 10, 14), outline=LIME_RGB, width=1)
    d6.text((70, 580), "ADB TERMINAL INTERACTIVE SHELL [DEVICE: GOOGLE PIXEL 7 / ANDROID 14]", fill=LIME_RGB, font=f_mono_md)
    
    adb_commands = [
        ("$ adb devices -l", "List of devices attached: emulator-5554 device product:lynx model:Pixel_7"),
        ("$ adb shell am start -n com.atw.automation/.MainActivity", "Starting: Intent { cmp=com.atw.automation/.MainActivity } -> Status: OK"),
        ("$ adb shell input tap 450 820", "Input event dispatched [TAP @ 450, 820] latency: 12ms"),
        ("$ adb shell uiautomator dump /sdcard/view.xml", "UI hierarchy dumped to: /sdcard/view.xml (100% matched)"),
        ("[STATUS]", "PIPELINE ACTIVE — ZERO DISCONNECTIONS ACROSS 48-HOUR STRESS RUN"),
    ]
    for i, (cmd, out) in enumerate(adb_commands):
        ay = 620 + i * 42
        d6.text((70, ay), cmd, fill=LIME_RGB if "STATUS" in cmd else TEXT_WHITE, font=f_mono_sm)
        d6.text((70, ay + 18), out, fill=ACCENT_GREEN if "STATUS" in cmd else TEXT_MUTED, font=get_font(11, mono=True))
        
    im6.save(PROJECTS_DIR / "project-6-n8n-adb.png", "PNG")
    print(f"  Saved {PROJECTS_DIR / 'project-6-n8n-adb.png'}")

    # Cutout 6: n8n Connected Node Mesh (600x600)
    c6 = Image.new("RGBA", (600, 600), (0, 0, 0, 0))
    cd6 = ImageDraw.Draw(c6)
    cd6.rounded_rectangle([100, 100, 500, 500], radius=30, fill=(18, 16, 26, 240), outline=LIME_RGB, width=4)
    # Node hexagons
    n_pts = [(200, 260), (320, 180), (400, 320), (260, 400)]
    for p1 in n_pts:
        for p2 in n_pts:
            cd6.line([p1[0], p1[1], p2[0], p2[1]], fill=LIME_RGB, width=3)
    for px, py in n_pts:
        cd6.rounded_rectangle([px - 28, py - 28, px + 28, py + 28], radius=8, fill=(28, 25, 40), outline=LIME_RGB, width=2)
    cd6.text((180, 450), "N8N // ADB AUTOMATION", fill=LIME_RGB, font=get_font(18, bold=True, mono=True))
    c6.save(PROJECTS_DIR / "cutout-6.png", "PNG")

    # -------------------------------------------------------------------------
    # PROJECT 7: 5-Axis DMG MORI CNC Controller HUD (Omega Renk Bearings)
    # -------------------------------------------------------------------------
    im7 = Image.new("RGB", (1200, 900), DARK_BG)
    d7 = ImageDraw.Draw(im7)
    draw_grid_background(d7, 1200, 900, 30, (20, 20, 24))
    d7.rounded_rectangle([30, 30, 1170, 870], radius=14, fill=CARD_BG, outline=CARD_BORDER, width=2)
    draw_header_bar(d7, 30, 30, 1140, 48, "DMG MORI 5-AXIS CNC CONTROLLER — SIEMENS SINUMERIK / HEIDENHAIN", "FACILITY: OMEGA RENK BEARINGS")
    
    # 3D Toolpath Bearing Wireframe View (Left)
    d7.rounded_rectangle([50, 95, 680, 600], radius=8, fill=(10, 12, 16), outline=CARD_BORDER)
    d7.text((70, 115), "3D SPHERICAL BEARING WIREFRAME & TOOLPATH SIMULATION", fill=LIME_RGB, font=f_mono_md)
    # Wireframe rings of bearing
    cx, cy = 365, 360
    for r in range(40, 220, 30):
        d7.ellipse([cx - r, cy - int(r * 0.45), cx + r, cy + int(r * 0.45)], outline=ACCENT_CYAN, width=1)
    for r in range(40, 220, 30):
        d7.ellipse([cx - int(r * 0.45), cy - r, cx + int(r * 0.45), cy + r], outline=(40, 60, 80), width=1)
        
    # Toolpath cut line (Electric lime vector)
    tool_pts = [(cx - 160, cy + 30), (cx - 80, cy - 60), (cx + 40, cy + 40), (cx + 140, cy - 20)]
    for i in range(len(tool_pts) - 1):
        d7.line([tool_pts[i][0], tool_pts[i][1], tool_pts[i+1][0], tool_pts[i+1][1]], fill=LIME_RGB, width=3)
    # Tool head position
    d7.line([tool_pts[-1][0], tool_pts[-1][1], tool_pts[-1][0], tool_pts[-1][1] - 80], fill=ACCENT_AMBER, width=4)
    d7.rectangle([tool_pts[-1][0] - 12, tool_pts[-1][1] - 110, tool_pts[-1][0] + 12, tool_pts[-1][1] - 80], fill=ACCENT_AMBER)
    
    # Right: Axis Coordinates & Live Spindle Telemetry
    d7.rounded_rectangle([705, 95, 1145, 600], radius=8, fill=(14, 16, 20), outline=LIME_RGB, width=1)
    d7.text((730, 115), "5-AXIS MACHINE TELEMETRY", fill=LIME_RGB, font=f_mono_md)
    
    axes = [
        ("X-AXIS (LINEAR)", "+142.085 mm", "FEED: 1,250 mm/min"),
        ("Y-AXIS (LINEAR)", "-89.412 mm", "FEED: 1,250 mm/min"),
        ("Z-AXIS (SPINDLE)", "+34.500 mm", "RAPID POSITIONING"),
        ("A-AXIS (ROTARY TILT)", "+15.000 °", "SERVO TORQUE: 42 Nm"),
        ("C-AXIS (TABLE ROTATION)", "+240.500 °", "SYNCHRONIZED"),
    ]
    for i, (ax_name, ax_pos, ax_sub) in enumerate(axes):
        ay = 150 + i * 58
        d7.text((730, ay), ax_name, fill=TEXT_MUTED, font=f_mono_sm)
        d7.text((730, ay + 18), ax_pos, fill=LIME_RGB, font=get_font(18, bold=True, mono=True))
        d7.text((950, ay + 20), ax_sub, fill=TEXT_WHITE, font=get_font(10, mono=True))
        d7.line([730, ay + 48, 1120, ay + 48], fill=(25, 28, 35), width=1)
        
    # Spindle Speed & Efficiency Highlight
    d7.rounded_rectangle([730, 460, 1120, 580], radius=6, fill=(20, 24, 20), outline=ACCENT_GREEN, width=1)
    d7.text((750, 475), "PRODUCTION BENCHMARK AT OMEGA RENK", fill=ACCENT_GREEN, font=f_mono_sm)
    d7.text((750, 500), "+20% CYCLE EFFICIENCY", fill=LIME_RGB, font=get_font(24, bold=True, mono=True))
    d7.text((750, 540), "G-Code Toolpath Optimization • Zero Scrap Defect Rate", fill=TEXT_WHITE, font=f_mono_sm)
    
    # Bottom: G-Code Block Monitor
    d7.rounded_rectangle([50, 620, 1145, 845], radius=8, fill=(12, 14, 18), outline=CARD_BORDER)
    d7.text((70, 640), "G-CODE REAL-TIME EXECUTION BLOCK // HEIDENHAIN TNC 640", fill=LIME_RGB, font=f_mono_md)
    gcode = [
        "N0140 G00 X142.085 Y-89.412 Z50.000 S8500 M03",
        "N0150 G01 Z34.500 F1250 M08 (FLOOD COOLANT ACTIVE)",
        "N0160 G02 X150.000 Y-75.000 I12.500 J-8.200 (HELICAL INTERPOLATION)",
        "N0170 CYCLE DEF 247 DATUM SETTING ~ Q339=1",
        "N0180 TOLERANCE ENVELOPE: ISO 286-1 JS6 (±0.008 mm) -> VALIDATED PASS",
    ]
    for i, gc in enumerate(gcode):
        d7.text((70, 675 + i * 32), gc, fill=LIME_RGB if "TOLERANCE" in gc else TEXT_WHITE, font=f_mono_sm)
        
    im7.save(PROJECTS_DIR / "project-7-cnc.png", "PNG")
    print(f"  Saved {PROJECTS_DIR / 'project-7-cnc.png'}")

    # Cutout 7: 5-Axis Milling Cutter Head (600x600)
    c7 = Image.new("RGBA", (600, 600), (0, 0, 0, 0))
    cd7 = ImageDraw.Draw(c7)
    cd7.rounded_rectangle([100, 100, 500, 500], radius=30, fill=(18, 20, 24, 240), outline=LIME_RGB, width=4)
    # End mill bit
    cd7.rectangle([270, 140, 330, 260], fill=(60, 65, 75))
    cd7.rectangle([285, 260, 315, 420], fill=LIME_RGB)
    # Flute spirals
    for fy in range(270, 410, 28):
        cd7.line([285, fy, 315, fy + 14], fill=(20, 25, 30), width=4)
    cd7.text((180, 450), "CNC // 5-AXIS SPINDLE", fill=LIME_RGB, font=get_font(18, bold=True, mono=True))
    c7.save(PROJECTS_DIR / "cutout-7.png", "PNG")

    # -------------------------------------------------------------------------
    # PROJECT 8: Academic Honors, Distinctions & Certifications
    # -------------------------------------------------------------------------
    im8 = Image.new("RGB", (1200, 900), DARK_BG)
    d8 = ImageDraw.Draw(im8)
    draw_grid_background(d8, 1200, 900, 30, (24, 20, 16))
    d8.rounded_rectangle([30, 30, 1170, 870], radius=14, fill=CARD_BG, outline=CARD_BORDER, width=2)
    draw_header_bar(d8, 30, 30, 1140, 48, "ACADEMIC HONORS, BOARD TOPPER DISTINCTIONS & ACCREDITATIONS", "CANDIDATE: ABDUL TARIQUE WARSI")
    
    # 4 Distinction Showcases
    honors = [
        ("GLOBAL SKILLS PARK BHOPAL", "MOST OUTSTANDING STUDENT OF THE YEAR (2024)", "Valedictorian honor for premier precision manufacturing, automation & student leadership.", ACCENT_AMBER),
        ("GOVT. ITI JABALPUR", "90.3% NCVT-MP BOARD TOPPER (STATE RANK 1)", "Highest distinction across Madhya Pradesh State NCVT Examinations.", LIME_RGB),
        ("BHABHA UNIVERSITY", "BACHELOR OF TECHNOLOGY IN COMPUTER SCIENCE", "Core Specialization: Artificial Intelligence, Data Structures, Automation & Software Eng.", ACCENT_CYAN),
        ("HARVARDX CS109x", "VERIFIED DATA SCIENCE & MACHINE LEARNING", "Harvard University edX credential in ML algorithms, statistics and data modeling.", ACCENT_GREEN),
    ]
    for i, (inst, award, desc, col) in enumerate(honors):
        hx = 60 + (i % 2) * 550
        hy = 110 + (i // 2) * 360
        d8.rounded_rectangle([hx, hy, hx + 520, hy + 330], radius=12, fill=(18, 18, 24), outline=col, width=2)
        draw_hud_bracket(d8, hx, hy, hx + 520, hy + 330, col, length=20, width=2)
        
        # Medal Icon
        d8.ellipse([hx + 30, hy + 30, hx + 80, hy + 80], fill=(25, 25, 35), outline=col, width=2)
        d8.text((hx + 46, hy + 44), "★", fill=col, font=get_font(24, bold=True))
        
        d8.text((hx + 100, hy + 32), inst, fill=col, font=f_mono_sm)
        d8.text((hx + 100, hy + 54), "OFFICIAL ACCREDITATION", fill=TEXT_MUTED, font=get_font(10, mono=True))
        
        d8.text((hx + 30, hy + 105), award, fill=TEXT_WHITE, font=get_font(17, bold=True, mono=True))
        
        # Description paragraph
        d8.text((hx + 30, hy + 165), desc, fill=TEXT_MUTED, font=f_mono_sm)
        
        # Verification Seal
        d8.rounded_rectangle([hx + 30, hy + 240, hx + 490, hy + 300], radius=6, fill=(12, 12, 16), outline=CARD_BORDER)
        d8.text((hx + 45, hy + 252), "VERIFIED RECORD HASH: 0x9F4C...B82E [AUTHENTIC]", fill=col, font=get_font(11, mono=True))
        d8.text((hx + 45, hy + 274), "INSTITUTIONAL REGISTRATION: CONFIRMED & ACTIVE", fill=TEXT_WHITE, font=get_font(10, mono=True))
        
    im8.save(PROJECTS_DIR / "project-8-awards.png", "PNG")
    print(f"  Saved {PROJECTS_DIR / 'project-8-awards.png'}")

    # Cutout 8: Golden Star Laurel Distinction (600x600)
    c8 = Image.new("RGBA", (600, 600), (0, 0, 0, 0))
    cd8 = ImageDraw.Draw(c8)
    cd8.rounded_rectangle([100, 100, 500, 500], radius=30, fill=(24, 20, 16, 240), outline=LIME_RGB, width=4)
    # Medal Laurel
    cd8.ellipse([200, 180, 400, 380], outline=ACCENT_AMBER, width=6)
    cd8.text((260, 240), "01", fill=LIME_RGB, font=get_font(64, bold=True, mono=True))
    cd8.text((170, 440), "TOPPER // DISTINCTION", fill=LIME_RGB, font=get_font(18, bold=True, mono=True))
    c8.save(PROJECTS_DIR / "cutout-8.png", "PNG")

# ==========================================
# PART C: REPORTLAB PDF RESUMES
# ==========================================
def build_resumes():
    print("-> Generating 2 Downloadable PDF Resumes with ReportLab...")
    try:
        from reportlab.lib.pagesizes import letter
        from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.lib import colors
    except Exception as e:
        print(f"ERROR loading reportlab: {e}")
        return

    lime_color = colors.HexColor("#A4C600") # Darker lime readable on white paper
    dark_text = colors.HexColor("#111116")
    muted_text = colors.HexColor("#555566")

    # 1. AI, Python & Data Science Resume
    pdf1_path = str(RESUMES_DIR / "Abdul_Tarique_Warsi_AI_Python_Resume.pdf")
    doc1 = SimpleDocTemplate(pdf1_path, pagesize=letter, rightMargin=36, leftMargin=36, topMargin=36, bottomMargin=36)
    styles = getSampleStyleSheet()

    title_style = ParagraphStyle('TitleStyle', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=20, leading=24, textColor=dark_text)
    sub_style = ParagraphStyle('SubStyle', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=11, leading=15, textColor=lime_color)
    contact_style = ParagraphStyle('ContactStyle', parent=styles['Normal'], fontName='Helvetica', fontSize=9, leading=13, textColor=muted_text)
    heading_style = ParagraphStyle('HeadingStyle', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=12, leading=16, textColor=dark_text, spaceBefore=8, spaceAfter=4)
    body_style = ParagraphStyle('BodyStyle', parent=styles['Normal'], fontName='Helvetica', fontSize=9.5, leading=14, textColor=dark_text)
    bullet_style = ParagraphStyle('BulletStyle', parent=styles['Normal'], fontName='Helvetica', fontSize=9, leading=13, textColor=dark_text, leftIndent=12)

    story1 = []
    story1.append(Paragraph("ABDUL TARIQUE WARSI", title_style))
    story1.append(Paragraph("AI, PYTHON AUTOMATION & DATA SCIENCE ENGINEER", sub_style))
    story1.append(Paragraph("Phone: +91 8770463418 &nbsp;|&nbsp; Email: abdultarique5@gmail.com &nbsp;|&nbsp; LinkedIn: linkedin.com/in/abdul-tarique-warsi &nbsp;|&nbsp; GitHub: github.com/ATWISHERE &nbsp;|&nbsp; Jabalpur & Bhopal, MP, India", contact_style))
    story1.append(Spacer(1, 8))
    story1.append(HRFlowable(width="100%", thickness=1.5, color=dark_text, spaceAfter=8))

    # Executive Summary
    story1.append(Paragraph("EXECUTIVE SUMMARY", heading_style))
    story1.append(Paragraph("Innovative Python Engineer & Automation Specialist with a track record in developing high-throughput OCR extraction engines, RPA bots, and Machine Learning predictive models. Board Topper (90.3%) with strong analytical foundations, experienced in processing tens of thousands of complex records with zero truncation and deploying event-driven orchestration workflows.", body_style))
    story1.append(Spacer(1, 6))

    # Technical Skills
    story1.append(Paragraph("TECHNICAL PROFICIENCIES", heading_style))
    skills_data = [
        [Paragraph("<b>Programming & Core:</b>", body_style), Paragraph("Python (Advanced), SQL, C++, Bash/Shell, Git/GitHub, Docker Basics", body_style)],
        [Paragraph("<b>AI, ML & Data Science:</b>", body_style), Paragraph("Scikit-learn, Pandas, NumPy, OpenCV, PyTesseract OCR, Random Forest, Decision Trees", body_style)],
        [Paragraph("<b>Automation & RPA:</b>", body_style), Paragraph("PyAutoGUI, openpyxl, n8n, Zapier, Android Debug Bridge (ADB), Tkinter GUI", body_style)],
        [Paragraph("<b>Analytics & BI:</b>", body_style), Paragraph("Microsoft Power BI, Advanced Excel (Dynamic XLOOKUP, Pivot, Solver)", body_style)]
    ]
    t1 = Table(skills_data, colWidths=[140, 400])
    t1.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('BOTTOMPADDING', (0,0), (-1,-1), 2)]))
    story1.append(t1)
    story1.append(Spacer(1, 6))

    # Key Projects & Experience
    story1.append(Paragraph("ENGINEERING PROJECTS & EXPERIENCE", heading_style))
    
    story1.append(Paragraph("<b>Multi-Threaded PDF & PyTesseract OCR Table Extraction Engine</b>", body_style))
    story1.append(Paragraph("• Architected a multi-threaded desktop extraction pipeline in Python Tkinter processing scanned PDF invoices at 40+ pages/sec.<br/>• Designed regex column-splitting algorithms achieving 100% data validation with zero string truncation.<br/>• Integrated direct-to-database structured synchronization for automated accounting ledger entry.", bullet_style))
    story1.append(Spacer(1, 4))

    story1.append(Paragraph("<b>PyAutoGUI Student Ingestion RPA Bot</b>", body_style))
    story1.append(Paragraph("• Programmed an autonomous RPA bot utilizing PyAutoGUI and openpyxl, automating 1,450+ student record entries.<br/>• Implemented dynamic screen coordinate calibration with fail-safe error handling, eliminating manual entry errors.<br/>• Reduced administrative processing turnaround time by 82%.", bullet_style))
    story1.append(Spacer(1, 4))

    story1.append(Paragraph("<b>AICTE Edunet — 10,000+ Records Crop & Fertilizer ML Predictor</b>", body_style))
    story1.append(Paragraph("• Developed and evaluated Random Forest and Decision Tree models across 10,000+ soil telemetry samples.<br/>• Attained 92.4% test accuracy and 0.968 ROC-AUC score in recommending optimal crop and fertilizer schedules.<br/>• Built interactive exploratory data analysis (EDA) dashboards illustrating feature importance.", bullet_style))
    story1.append(Spacer(1, 4))

    story1.append(Paragraph("<b>Enterprise Workflow Automation: n8n Mesh & ADB Daemon</b>", body_style))
    story1.append(Paragraph("• Engineered an event-driven automation mesh connecting webhooks, data sanitizers, and Android devices via ADB.<br/>• Automated mobile app test runs and log scraping with zero disconnect faults over 48-hour reliability trials.", bullet_style))
    story1.append(Spacer(1, 6))

    # Education & Honors
    story1.append(Paragraph("EDUCATION & HONORS", heading_style))
    story1.append(Paragraph("• <b>Bachelor of Technology in Computer Science & Engineering</b> — Bhabha University<br/>• <b>Most Outstanding Student of the Year (2024)</b> — Global Skills Park Bhopal<br/>• <b>90.3% NCVT Board Topper (State Rank 1)</b> — Govt. ITI Jabalpur<br/>• <b>HarvardX CS109x Verified Credential</b> in Data Science & Machine Learning", body_style))

    doc1.build(story1)
    print(f"  Saved {pdf1_path}")

    # 2. Robotics & 5-Axis CNC Resume
    pdf2_path = str(RESUMES_DIR / "Abdul_Tarique_Warsi_Robotics_CNC_Resume.pdf")
    doc2 = SimpleDocTemplate(pdf2_path, pagesize=letter, rightMargin=36, leftMargin=36, topMargin=36, bottomMargin=36)
    
    story2 = []
    story2.append(Paragraph("ABDUL TARIQUE WARSI", title_style))
    story2.append(Paragraph("AI & ROBOTICS EDUCATOR | 5-AXIS CNC & INDUSTRIAL AUTOMATION SPECIALIST", sub_style))
    story2.append(Paragraph("Phone: +91 8770463418 &nbsp;|&nbsp; Email: abdultarique5@gmail.com &nbsp;|&nbsp; LinkedIn: linkedin.com/in/abdul-tarique-warsi &nbsp;|&nbsp; GitHub: github.com/ATWISHERE &nbsp;|&nbsp; Jabalpur & Bhopal, MP, India", contact_style))
    story2.append(Spacer(1, 8))
    story2.append(HRFlowable(width="100%", thickness=1.5, color=dark_text, spaceAfter=8))

    # Executive Summary
    story2.append(Paragraph("EXECUTIVE SUMMARY", heading_style))
    story2.append(Paragraph("Multidisciplinary Robotics Educator and Precision Manufacturing Specialist combining hands-on 5-axis CNC machining (DMG MORI, Siemens Sinumerik) with micro-controller telemetry and STEM mentoring. Honored as Most Outstanding Student of the Year (2024) at Global Skills Park Bhopal and 90.3% Board Topper.", body_style))
    story2.append(Spacer(1, 6))

    # Technical Skills
    story2.append(Paragraph("TECHNICAL PROFICIENCIES", heading_style))
    skills_data2 = [
        [Paragraph("<b>CNC & Machining:</b>", body_style), Paragraph("5-Axis DMG MORI, Siemens Sinumerik 840D, Heidenhain TNC 640, Fanuc, G-Code/M-Code", body_style)],
        [Paragraph("<b>Robotics & Hardware:</b>", body_style), Paragraph("Arduino, ESP32, Raspberry Pi, PWM Motor Drivers, Drone Aerodynamics (ELRS/Betaflight)", body_style)],
        [Paragraph("<b>Industrial Manufacturing:</b>", body_style), Paragraph("High-tolerance bearing fabrication (Omega Renk Bearings), GD&T, CMM Quality Inspection", body_style)],
        [Paragraph("<b>Instruction & Mentorship:</b>", body_style), Paragraph("Robotics Curriculum Design, Prototyping Lab Management, 150+ Students Mentored", body_style)]
    ]
    t2 = Table(skills_data2, colWidths=[140, 400])
    t2.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('BOTTOMPADDING', (0,0), (-1,-1), 2)]))
    story2.append(t2)
    story2.append(Spacer(1, 6))

    # Professional Experience
    story2.append(Paragraph("PROFESSIONAL EXPERIENCE & ACHIEVEMENTS", heading_style))
    
    story2.append(Paragraph("<b>Lead AI & Robotics Educator</b> — Jabalpur Robotics Innovation Lab", body_style))
    story2.append(Paragraph("• Mentored over 150 students in competitive robotics, circuit prototyping, and autonomous drone assembly.<br/>• Built dual-channel oscilloscope telemetry testbenches for PWM motor control and ultrasonic sensor calibration.<br/>• Coached youth teams for national STEM and drone racing competitions with top podium finishes.", bullet_style))
    story2.append(Spacer(1, 4))

    story2.append(Paragraph("<b>Precision CNC Machining Specialist</b> — Omega Renk Bearings", body_style))
    story2.append(Paragraph("• Programmed and set up 5-axis DMG MORI machining centers producing spherical roller bearing housings.<br/>• Optimized cutting toolpaths and feed rates, achieving a measured +20% cycle efficiency increase.<br/>• Maintained ISO 286-1 JS6 precision tolerances (within ±0.008 mm) with zero scrap defect rates.", bullet_style))
    story2.append(Spacer(1, 4))

    story2.append(Paragraph("<b>Autonomous Drone & Embedded Telemetry Prototyping</b>", body_style))
    story2.append(Paragraph("• Built custom carbon-fiber racing quadcopters featuring 4S LiPo power distribution, DShot600 ESCs, and ELRS 2.4GHz.<br/>• Developed embedded logging scripts in Python to analyze pitch, roll, and G-force flight telemetry.", bullet_style))
    story2.append(Spacer(1, 6))

    # Education & Distinctions
    story2.append(Paragraph("EDUCATION & HONORS", heading_style))
    story2.append(Paragraph("• <b>Global Skills Park Bhopal</b> — Advanced Precision Manufacturing & CNC Specialist (Most Outstanding Student 2024)<br/>• <b>Govt. ITI Jabalpur</b> — 90.3% NCVT Board Topper (State Rank 1)<br/>• <b>Bhabha University</b> — Bachelor of Technology in Computer Science & Engineering<br/>• <b>HarvardX CS109x</b> — Verified Data Science Certification", body_style))

    doc2.build(story2)
    print(f"  Saved {pdf2_path}")

def main():
    print("=== STARTING ASSET VAULT GENERATION ===")
    build_hero_photos()
    build_projects()
    build_resumes()
    print("=== ASSET VAULT GENERATION COMPLETE ===")

if __name__ == "__main__":
    main()
