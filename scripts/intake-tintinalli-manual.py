import hashlib
import json
import re
from pathlib import Path
from pypdf import PdfReader
import pypdfium2 as pdfium

source = Path('D:/New folder/ER BOOKS/Tintinalli’s Emergency Medicine Manual ( PDFDrive ).pdf')
root = Path(__file__).resolve().parents[1]
output = root / 'SEG_CONTENT_LIBRARY/02_PROCESSED_CONTENT/TINTINALLI_MANUAL_8E'
output.mkdir(parents=True, exist_ok=True)
reader = PdfReader(source)
low_text = []
chapters = {}
with (output / 'pages.jsonl').open('w', encoding='utf-8') as stream:
    for i, page in enumerate(reader.pages):
        text = page.extract_text() or ''
        if len(text.strip()) < 80: low_text.append(i+1)
        # InDesign chapter identifiers provide a stable locator, not a clinical classification.
        match = re.search(r'_Ch(\d+)\.indd', text, re.I)
        chapter = int(match.group(1)) if match else None
        if chapter:
            row = chapters.setdefault(chapter, dict(number=chapter, pdfStart=i+1, pdfEnd=i+1))
            row['pdfEnd'] = i+1
        stream.write(json.dumps(dict(pdfPage=i+1, chapterNumber=chapter, text=text), ensure_ascii=False)+'\n')
(output / 'contents.txt').write_text('\n\n'.join(reader.pages[i].extract_text() or '' for i in range(5,10)), encoding='utf-8')
manifest = dict(id='tintinalli-manual-8e', title="Tintinalli's Emergency Medicine Manual", edition=8, year=2018, publisher='McGraw-Hill Education', pages=len(reader.pages), sha256=hashlib.sha256(source.read_bytes()).hexdigest(), source=str(source), status='under-review', jordanBoardApproval='not-verified', expectedChapters=189, detectedChapters=len(chapters), chapters=list(chapters.values()), lowTextPages=low_text, summaryStatus='pending', note='Page-linked raw extraction is not a summary; tables/images and current clinical validity need review.')
(output / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
doc = pdfium.PdfDocument(str(source))
doc[5].render(scale=1).to_pil().save(output / 'contents-preview.png')
print(json.dumps(dict(pages=len(reader.pages), detectedChapters=len(chapters), lowTextPages=low_text, extractedBytes=(output/'pages.jsonl').stat().st_size, sourceBytes=source.stat().st_size)))
