import pymupdf
import os

doc = pymupdf.open(r"D:\final alaa seg\MRCEM.pdf")
print(f"Pages: {len(doc)}")

# Render page 5 as image and check if it has visual content
page = doc[4]  # page 5
pix = page.get_pixmap(dpi=150)
print(f"Page 5 pixmap: {pix.width}x{pix.height}, {pix.n} channels")
print(f"Page 5 pixmap size: {len(pix.tobytes())} bytes")

# Save a sample page as image to check
os.makedirs(r"D:\final alaa seg\المرفوع نهائي\smart-emergency-guide\scripts\mrcem-sample", exist_ok=True)
pix.save(r"D:\final alaa seg\المرفوع نهائي\smart-emergency-guide\scripts\mrcem-sample\page5.png")
print("Saved page5.png")

# Try OCR text extraction
try:
    text = page.get_text("ocr")
    print(f"OCR text length: {len(text)}")
    if text.strip():
        print(text[:500])
except Exception as e:
    print(f"OCR error: {e}")

doc.close()
