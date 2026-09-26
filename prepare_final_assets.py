import sys
from PIL import Image, ImageDraw, ImageFont

def main():
    try:
        from rembg import remove
    except ImportError:
        sys.exit(1)

    input_path = "public/my-photo.jpg"
    try:
        img = Image.open(input_path).convert("RGBA")
    except Exception as e:
        input_path = "retouch_2026053121210995.jpg"
        img = Image.open(input_path).convert("RGBA")

    img_no_bg = remove(img)

    width, height = img_no_bg.size
    left = int(width * 0.208)
    top = int(height * 0.085)
    right = int(width * 0.748)
    bottom = int(height * 0.733)
    
    cropped = img_no_bg.crop((left, top, right, bottom))
    target_size = (1000, 1200)
    portrait = cropped.resize(target_size, Image.Resampling.LANCZOS)
    
    portrait.save("public/my-portrait-cutout.png")

    helmet_layer = Image.new("RGBA", target_size, (0, 0, 0, 0))
    h_draw = ImageDraw.Draw(helmet_layer)
    
    # cx is 50% of 1000 = 500. Eye-line Y is 46% of 1200 = 552.
    cx = 500
    w = 520
    hw = w // 2
    top_y = 150
    bottom_y = 750
    visor_top = 480
    visor_bottom = 600
    
    h_draw.pieslice([cx - hw, top_y, cx + hw, top_y + w], 180, 360, fill="#111112")
    h_draw.polygon([
        (cx - hw, top_y + hw), 
        (cx + hw, top_y + hw), 
        (cx + hw - 40, bottom_y), 
        (cx - hw + 40, bottom_y)
    ], fill="#D2FF00")
    
    h_draw.rectangle([cx - hw + 15, visor_top, cx + hw - 15, visor_bottom], fill=(20, 22, 25, 240))
    h_draw.rectangle([cx - hw + 15, visor_top, cx + hw - 15, visor_bottom], fill=None, outline="#D2FF00", width=4)
    h_draw.polygon([(cx - hw + 35, visor_top), (cx - hw + 95, visor_top), (cx - hw + 55, visor_bottom), (cx - hw + 5, visor_bottom)], fill=(255, 255, 255, 40))

    try:
        font = ImageFont.truetype("arial.ttf", 28)
    except:
        font = ImageFont.load_default()
        
    h_draw.rectangle([cx - hw + 15, visor_top, cx + hw - 15, visor_top + 40], fill="#FFFFFF")
    h_draw.text((cx - 100, visor_top + 5), "ATW // AUTOMATION", fill="#111112", font=font)

    pixels = helmet_layer.load()
    nose_cx = cx
    nose_cy = 630
    rad_x = 75
    rad_y = 65
    for y in range(nose_cy - rad_y, nose_cy + rad_y):
        for x in range(nose_cx - rad_x, nose_cx + rad_x):
            if 0 <= x < 1000 and 0 <= y < 1200:
                dist = ((x - nose_cx) ** 2) / (rad_x ** 2) + ((y - nose_cy) ** 2) / (rad_y ** 2)
                if dist <= 1:
                    if dist < 0.7:
                        pixels[x, y] = (0, 0, 0, 0)
                    else:
                        alpha_fade = int(255 * (dist - 0.7) / 0.3)
                        r, g, b, a = pixels[x, y]
                        pixels[x, y] = (r, g, b, min(a, alpha_fade))

    final_helmet_composite = Image.alpha_composite(portrait, helmet_layer)
    final_helmet_composite.save("public/my-helmet-cutout.png")

if __name__ == "__main__":
    main()
