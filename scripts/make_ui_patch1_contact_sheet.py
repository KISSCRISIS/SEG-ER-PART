from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

root = Path('/home/ubuntu/seg-manus-status/SEG_UI_PATCH1_EVIDENCE/baseline')
out = Path('/home/ubuntu/seg-manus-status/SEG_UI_PATCH1_EVIDENCE/baseline-contact-sheet.png')
files = [root / f'{route}-{width}x844.png' for route in ('landing', 'login', 'register') for width in (320, 360, 390, 430)]
thumb_w, thumb_h = 430, 844
label_h = 34
cols = 4
rows = 3
sheet = Image.new('RGB', (cols * thumb_w, rows * (thumb_h + label_h)), 'white')
draw = ImageDraw.Draw(sheet)
for i, path in enumerate(files):
    image = Image.open(path).convert('RGB')
    image.thumbnail((thumb_w, thumb_h))
    x = (i % cols) * thumb_w
    y = (i // cols) * (thumb_h + label_h)
    sheet.paste(image, (x, y + label_h))
    draw.rectangle((x, y, x + thumb_w, y + label_h), fill='#0b1724')
    draw.text((x + 12, y + 9), path.stem, fill='white')
sheet.save(out, optimize=True)
print(out)
