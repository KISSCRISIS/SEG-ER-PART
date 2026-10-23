import pymupdf
import json

doc = pymupdf.open(r"D:\final alaa seg\MRCEM.pdf")
print(f"Pages: {len(doc)}")

for i in range(min(5, len(doc))):
    page = doc[i]
    blocks = page.get_text("rawdict")["blocks"]
    print(f"\nPage {i+1}: {len(blocks)} blocks")
    for j, b in enumerate(blocks[:5]):
        btype = b.get("type")
        bbox = b.get("bbox")
        print(f"  Block {j}: type={btype}, bbox={bbox}")
        if btype == 0:
            for line in b.get("lines", [])[:3]:
                spans_text = " ".join(s.get("text", "") for s in line.get("spans", []))
                print(f"    Line: {spans_text[:150]}")
    imgs = page.get_images()
    print(f"  Images on page: {len(imgs)}")

doc.close()
