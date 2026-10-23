import fitz
import sys

doc = fitz.open(r"D:\final alaa seg\MRCEM.pdf")
print(f"Pages: {len(doc)}")
print(f"Title: {doc.metadata.get('title', 'N/A')}")
print(f"Author: {doc.metadata.get('author', 'N/A')}")
print()

# Print first 10 pages to understand structure
for i in range(min(10, len(doc))):
    text = doc[i].get_text()
    print(f"=== PAGE {i+1} ===")
    print(text[:4000])
    print()

doc.close()
