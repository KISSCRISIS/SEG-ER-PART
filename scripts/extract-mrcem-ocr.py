import pymupdf
import easyocr
import json
import os
import re
import sys

PDF_PATH = r"D:\final alaa seg\MRCEM.pdf"
OUTPUT_DIR = r"D:\final alaa seg\المرفوع نهائي\smart-emergency-guide\SEG_CONTENT_LIBRARY\02_PROCESSED_CONTENT\RESIDENT_EMERGENCY_MEDICINE"
SAMPLE_DIR = r"D:\final alaa seg\المرفوع نهائي\smart-emergency-guide\scripts\mrcem-sample"

os.makedirs(SAMPLE_DIR, exist_ok=True)

# Initialize EasyOCR
print("Initializing EasyOCR...")
reader = easyocr.Reader(["en"], gpu=False, verbose=False)

# Open PDF
doc = pymupdf.open(PDF_PATH)
total_pages = len(doc)
print(f"Total pages: {total_pages}")

# Extract text from all pages
all_text = []
for page_num in range(total_pages):
    page = doc[page_num]
    # Render at 200 DPI for good quality
    pix = page.get_pixmap(dpi=200)
    img_path = os.path.join(SAMPLE_DIR, f"page_{page_num+1:03d}.png")
    pix.save(img_path)
    
    # OCR
    results = reader.readtext(img_path, detail=0, paragraph=True)
    page_text = "\n".join(results)
    all_text.append(page_text)
    
    if (page_num + 1) % 10 == 0 or page_num == 0:
        print(f"Processed page {page_num+1}/{total_pages}, text length: {len(page_text)}")
    
    # Clean up image to save disk space
    os.remove(img_path)

doc.close()

# Save raw OCR output for debugging
raw_path = os.path.join(SAMPLE_DIR, "raw_ocr_output.txt")
with open(raw_path, "w", encoding="utf-8") as f:
    for i, text in enumerate(all_text):
        f.write(f"\n{'='*60}\nPAGE {i+1}\n{'='*60}\n")
        f.write(text)
print(f"\nRaw OCR saved to {raw_path}")
print(f"Total pages processed: {len(all_text)}")
