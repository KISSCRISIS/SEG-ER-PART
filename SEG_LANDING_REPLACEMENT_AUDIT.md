# SEG Landing Replacement Audit

**Route:** `/`  
**Approved replacement reference:** `ChatGPTImageAug13,2026,10_25_56AM.png` (1402 × 1122)  
**Decision:** **Implementation authorized** by the user’s explicit instruction to replace the prior Landing screen completely.

## Visual Gap Summary

The current Landing screen is structurally and visually different from the approved replacement. It presents a sparse public marketing layout with a small header, a two-column anatomy card hero, four feature cards, and a narrow text-only trust rail. The approved screen is a dense authenticated-product-style command surface: it has an icon-led navigation rail, a broad intelligence-scene hero with a central circular **Get Started** control, three stacked benefit chips, a five-item metrics band, six capability cards, and a final trust strip.

| Layer | Current `/` | Approved replacement requirement | Implementation decision |
|---|---|---|---|
| Header | Text-only public navigation and generic code-drawn brand | Full SEG lockup, icon-led command navigation, user/profile utility cluster | Replace visual layer; preserve existing public Login/Register routes only. |
| Hero | Text column plus anatomy-card stage | Wide composed emergency-intelligence scene with anatomical, brain-heart, emergency-response, and medical-assistant stages around the central action | Use isolated, reference-derived stages from the approved supplied reference rather than substitutes. |
| Primary action | Text CTA pair | Prominent circular **Get Started** visual control with directional action; current registered public route remains available | Keep the exact public **Start Journey** label in an accessible action, presented as the approved central action treatment. |
| Information hierarchy | Four equal cards | Three left benefit chips, five metric cells, six capability cards, then six trust values | Replace page bands and card geometry. |
| Responsive behavior | Basic two-column-to-stack treatment | Preserve hierarchy: navigation condenses, scene crops safely, metrics and cards stack | Implement source-limited mobile stacking without altering routes or data. |

## Approved Asset Map

| Distinct visual | Source | Delivery plan |
|---|---|---|
| Official SEG header lockup | Approved supplied Landing reference | Isolate a clean header crop, remove only its non-semantic matte, and publish via managed static storage. |
| Anatomy intelligence stage | Approved supplied Landing reference | Isolate stage crop and publish via managed static storage. |
| Brain-heart intelligence stage | Approved supplied Landing reference | Isolate stage crop and publish via managed static storage. |
| Emergency response stage | Approved supplied Landing reference | Isolate stage crop and publish via managed static storage. |
| Medical assistant stage | Approved supplied Landing reference | Isolate stage crop and publish via managed static storage. |
| Hero ring and metric/card iconography | Reference geometry and existing approved visual language | Recreate as functional CSS/SVG interface treatment; no distinctive medical illustration is replaced. |

## Boundary Confirmation

Only the visual layer of `Home.tsx`, route-specific CSS, managed asset registry, and focused page tests may change. The existing Wouter routes, Manus OAuth flow, database contracts, server logic, protected dashboard boundary, and security configuration remain unchanged.
