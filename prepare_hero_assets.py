import sys
from PIL import Image, ImageDraw, ImageFont

def main():
    try:
        from rembg import remove
    except ImportError:
        print("Error: rembg is not installed. Please run pip install rembg.")
        sys.exit(1)

    input_path = "retouch_2026053121210995.jpg"
    try:
        img = Image.open(input_path).convert("RGBA")
    except Exception as e:
        print(f"Error opening image {input_path}: {e}")
        sys.exit(1)

    print("1. Removing background using rembg...")
    # rembg automatically crops some whitespace, but to maintain the user's exact crop ratios, 
    # we first remove bg, then crop using percentage of original image dimensions
    
    img_no_bg = remove(img)

    print("2. Cropping to tight bust framing...")
    width, height = img_no_bg.size
    left = int(width * 0.21)
    top = int(height * 0.08)
    right = int(width * 0.75)
    bottom = int(height * 0.73)
    
    cropped = img_no_bg.crop((left, top, right, bottom))

    print("Resizing to 1000x1200...")
    target_size = (1000, 1200)
    portrait = cropped.resize(target_size, Image.Resampling.LANCZOS)
    
    portrait_path = "public/my-portrait.png"
    portrait.save(portrait_path)
    print(f"Saved base portrait to {portrait_path}")

    print("3. Generating Formula-1 Cyber Helmet composite...")
    # Create a separate transparent layer for the helmet
    helmet_layer = Image.new("RGBA", target_size, (0, 0, 0, 0))
    h_draw = ImageDraw.Draw(helmet_layer)
    
    # Coordinates from user specs
    cx = 500
    top_y = 110
    bottom_y = 620
    w = 520
    hw = w // 2
    
    # --- HELMET SHELL ---
    # Matte carbon dome (#111112)
    h_draw.pieslice([cx - hw, top_y, cx + hw, top_y + w], 180, 360, fill="#111112")
    
    # Electric Lime lower shell and chin guard (#D2FF00)
    h_draw.polygon([
        (cx - hw, top_y + hw), 
        (cx + hw, top_y + hw), 
        (cx + hw - 40, bottom_y), 
        (cx - hw + 40, bottom_y)
    ], fill="#D2FF00")
    
    # Chin vent accents
    h_draw.polygon([(cx - 30, bottom_y - 40), (cx + 30, bottom_y - 40), (cx + 20, bottom_y - 10), (cx - 20, bottom_y - 10)], fill="#111112")

    # --- VISOR ---
    # Dark reflective iridium visor strip (Y: 320 to 435)
    visor_top = 320
    visor_bottom = 435
    visor_left = cx - hw + 15
    visor_right = cx + hw - 15
    
    # Draw visor base
    h_draw.rectangle([visor_left, visor_top, visor_right, visor_bottom], fill=(20, 22, 25, 240))
    # Visor neon rim
    h_draw.rectangle([visor_left, visor_top, visor_right, visor_bottom], fill=None, outline="#D2FF00", width=4)
    # Visor reflections
    h_draw.polygon([(visor_left + 20, visor_top), (visor_left + 80, visor_top), (visor_left + 40, visor_bottom), (visor_left - 10, visor_bottom)], fill=(255, 255, 255, 40))

    # --- TEXT ---
    # ATW // 01 printed on visor brow strip
    try:
        font = ImageFont.truetype("arial.ttf", 28)
    except:
        font = ImageFont.load_default()
        
    h_draw.text((cx - 65, visor_top + 10), "ATW // 01", fill="#D2FF00", font=font)

    # --- NOSE CUTOUT ---
    # Cutout around the nose/bridge so his eyes/face blend like the overlay
    # We erase pixels from the helmet_layer in an elliptical shape around the nose area (Y: 410 to 520)
    pixels = helmet_layer.load()
    nose_cx = cx
    nose_cy = 475
    rad_x = 75
    rad_y = 65
    
    for y in range(nose_cy - rad_y, nose_cy + rad_y):
        for x in range(nose_cx - rad_x, nose_cx + rad_x):
            if x >= 0 and x < 1000 and y >= 0 and y < 1200:
                # Ellipse equation for smooth cutout
                if ((x - nose_cx) ** 2) / (rad_x ** 2) + ((y - nose_cy) ** 2) / (rad_y ** 2) <= 1:
                    # Soft blending edge
                    dist = ((x - nose_cx) ** 2) / (rad_x ** 2) + ((y - nose_cy) ** 2) / (rad_y ** 2)
                    if dist < 0.7:
                        pixels[x, y] = (0, 0, 0, 0)
                    else:
                        alpha_fade = int(255 * (dist - 0.7) / 0.3)
                        r, g, b, a = pixels[x, y]
                        pixels[x, y] = (r, g, b, min(a, alpha_fade))

    # Composite the helmet over the base portrait
    final_helmet_composite = Image.alpha_composite(portrait, helmet_layer)
    
    helmet_path = "public/my-helmet.png"
    final_helmet_composite.save(helmet_path)
    print(f"Saved cyber helmet composite to {helmet_path}")

if __name__ == "__main__":
    main()
