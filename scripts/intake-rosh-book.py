import hashlib
import json
from pathlib import Path
from pypdf import PdfReader
import pypdfium2 as pdfium

source = Path('D:/study/Copy of Emergency-Medicine-FULL.pdf')
root = Path(__file__).resolve().parents[1]
output = root / 'SEG_CONTENT_LIBRARY/02_PROCESSED_CONTENT/ROSH_ROTATION_2019'
output.mkdir(parents=True, exist_ok=True)
reader = PdfReader(source)
starts = [1, 66, 126, 187, 225, 294, 343, 382, 412, 441, 476, 503]
titles = ['Cardiovascular System', 'Orthopedics/Rheumatology', 'Gastrointestinal/Nutritional', 'Pulmonology', 'Neurology', 'ENOT/Ophthalmology', 'Urology/Renal', 'Dermatology', 'Endocrinology', 'Obstetrics/Gynecology', 'Psychiatry/Behavioral Medicine', 'Hematology']
chapters = []
for i, start in enumerate(starts):
    end = starts[i+1]-1 if i+1 < len(starts) else len(reader.pages)-10
    chapters.append(dict(id=f'rosh-2019-ch-{i+1:02}', title=titles[i], printedStart=start, printedEnd=end, pdfStart=start+10, pdfEnd=end+10))
low_text = []
with (output / 'pages.jsonl').open('w', encoding='utf-8') as stream:
    for i, page in enumerate(reader.pages):
        text = page.extract_text() or ''
        if len(text.strip()) < 80: low_text.append(i+1)
        chapter = next((c['id'] for c in chapters if c['pdfStart'] <= i+1 <= c['pdfEnd']), None)
        stream.write(json.dumps(dict(pdfPage=i+1, printedPage=i-9 if i>=10 else None, chapterId=chapter, text=text), ensure_ascii=False)+'\n')
manifest = dict(id='rosh-rotation-2019', title='Emergency Medicine Rotation Exam - Rapid Review', publisher='Rosh Review', edition=1, year=2019, pages=len(reader.pages), sha256=hashlib.sha256(source.read_bytes()).hexdigest(), source=str(source), status='under-review', jordanBoardApproval='not-verified', role='supplementary-review', chapters=chapters, lowTextPages=low_text, extractionNote='Raw text preserves page references; layout, duplicated lettering, figures and clinical accuracy require review.')
(output / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
doc = pdfium.PdfDocument(str(source))
for page in [0, 9, 12]:
    doc[page].render(scale=1).to_pil().save(output / f'preview-{page+1}.png')
print(json.dumps(dict(pages=len(reader.pages), chapters=len(chapters), lowTextPages=low_text, output=str(output))))
