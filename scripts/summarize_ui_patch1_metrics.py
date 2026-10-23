import json
from pathlib import Path

base = Path('/home/ubuntu/seg-manus-status/SEG_UI_PATCH1_EVIDENCE')
for mode in ('light', 'dark'):
    data = json.loads((base / mode / 'metrics.json').read_text())
    print(f'[{mode}]')
    for item in data['results']:
        width = item['viewport']['width']
        route = item['route']
        rects = item['rects']
        if route == 'landing':
            key = rects['cta']
            label = f"CTA top={key['top']:.2f} bottom={key['bottom']:.2f} h={key['height']:.2f}"
        elif route == 'login':
            key = rects['card']
            label = f"card top={key['top']:.2f} bottom={key['bottom']:.2f} h={key['height']:.2f}"
        else:
            key = rects['form']
            label = f"form top={key['top']:.2f} bottom={key['bottom']:.2f} h={key['height']:.2f} heading_top={rects['heading']['top']:.2f}"
        parent = (item.get('focus') or {}).get('parent')
        focus_label = 'field-focus-parent-visible' if parent and (parent.get('borderColor') or parent.get('boxShadow')) else 'cta-focus-visible'
        print(f"{route:8} {width:3}px overflow={item['document']['horizontalOverflow']} {label} touch_under44={item['interactive']['under44px']} {focus_label}")
