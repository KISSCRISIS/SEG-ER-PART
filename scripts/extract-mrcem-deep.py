import pymupdf

doc = pymupdf.open(r"D:\final alaa seg\MRCEM.pdf")
print(f"Pages: {len(doc)}")
import os
print(f"File size: {os.path.getsize(r'D:\\final alaa seg\\MRCEM.pdf')} bytes")
print(f"Metadata: {doc.metadata}")
print(f"Is_encrypted: {doc.is_encrypted}")
print(f"Needs_pass: {doc.needs_pass}")

# Check page 1 in detail
page = doc[0]
print(f"\nPage 1 mediabox: {page.mediabox}")
print(f"Page 1 rotation: {page.rotation}")

# Try xhtml output
xhtml = page.get_text("xhtml")
print(f"\nPage 1 xhtml length: {len(xhtml)}")
if xhtml.strip():
    print(xhtml[:1000])
else:
    print("xhtml is empty")

# Try html output
html = page.get_text("html")
print(f"\nPage 1 html length: {len(html)}")

# Try rawdict
raw = page.get_text("rawdict")
print(f"\nPage 1 rawdict blocks: {len(raw.get('blocks', []))}")
print(f"Page 1 rawdict width: {raw.get('width')}")
print(f"Page 1 rawdict height: {raw.get('height')}")

# Check if there are any annotations
annots = list(page.annots()) if page.annots() else []
print(f"Page 1 annotations: {len(annots)}")

# Check page 50 (middle of book)
page50 = doc[49]
text50 = page50.get_text()
print(f"\nPage 50 text length: {len(text50)}")
blocks50 = page50.get_text("rawdict")["blocks"]
print(f"Page 50 blocks: {len(blocks50)}")

doc.close()
