from pathlib import Path
from PIL import Image, ImageDraw

base = Path('/home/ubuntu/seg-manus-status/SEG_UI_PATCH1_EVIDENCE')
for mode in ('light', 'dark'):
    root = base / mode
    out = base / f'{mode}-contact-sheet.png'
    files = [root / f'{route}-{width}x844.png' for route in ('landing', 'login', 'register') for width in (320, 360, 390, 430)]
    thumb_w, thumb_h, label_h = 430, 844, 34
    sheet = Image.new('RGB', (thumb_w * 4, (thumb_h + label_h) * 3), 'white')
    draw = ImageDraw.Draw(sheet)
    for i, path in enumerate(files):
        image = Image.open(path).convert('RGB')
        image.thumbnail((thumb_w, thumb_h))
        x = (i % 4) * thumb_w
        y = (i // 4) * (thumb_h + label_h)
        draw.rectangle((x, y, x + thumb_w, y + label_h), fill='#0b1724')
        draw.text((x + 12, y + 9), path.stem, fill='white')
        sheet.paste(image, (x, y + label_h))
    sheet.save(out, optimize=True)
    print(out)
