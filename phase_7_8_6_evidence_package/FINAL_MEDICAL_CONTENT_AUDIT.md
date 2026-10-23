# Final Medical Content Audit — Smart Emergency Guide

Smart Emergency Guide is an educational and exam-preparation platform. Before release, every high-risk clinical item must be checked by qualified clinical reviewers and aligned with local hospital protocol.

## Mandatory audit domains

1. **Drug doses and concentrations**
   - Adult/pediatric doses
   - Route and maximum dose
   - Dilution and local concentration
   - Contraindications and monitoring

2. **RSI and airway medications**
   - Induction agent selection
   - Paralytic doses
   - Post-intubation sedation/analgesia
   - Post-intubation hypotension management

3. **Vasopressors and inotropes**
   - Norepinephrine, epinephrine, dopamine, dobutamine, vasopressin
   - Starting dose, titration range, concentration, line safety
   - MAP/perfusion targets and extravasation response

4. **Toxicology antidote regimens**
   - NAC, naloxone, atropine/pralidoxime, calcium, glucagon, fomepizole, hydroxocobalamin, sodium bicarbonate
   - Poison-center/local availability check
   - Monitoring and repeat-dose logic

5. **Ventilator settings and NIV/HFNC**
   - Initial invasive settings
   - COPD/asthma dynamic hyperinflation precautions
   - ARDS lung-protective ventilation
   - NIV contraindications
   - Device-specific Hamilton-G5 workflow notes

6. **Critical care pathways**
   - Sepsis, cardiogenic shock, hyperkalemia, DKA/HHS, post-intubation hypotension
   - First-minute actions
   - Escalation and ICU disposition
   - Monitoring targets and red flags

7. **ACLS / resuscitation logic**
   - Shockable/non-shockable rhythm pathways
   - Reversible causes
   - Post-ROSC care
   - Current resuscitation committee guidance

8. **Trauma and obstetric emergencies**
   - Massive transfusion, TXA timing, airway in trauma
   - C-spine/spinal precautions
   - Obstetric bleeding and eclampsia pathways

9. **Pediatrics**
   - Weight-based dosing
   - Equipment size
   - Fluids, seizure medications, sepsis, airway

10. **Jordan/local protocol compatibility**
   - Medication availability and concentration may vary
   - ED/ICU escalation pathways may vary by hospital
   - Final patient-care use must follow local protocol and senior supervision

## Mandatory release labels

Every high-risk treatment page should include:

> Educational content only — verify medication doses, infusion concentrations, ventilator settings, and treatment pathways with local hospital protocol, pharmacy, toxicology/poison center, ICU, and senior clinical supervision before patient care use.

Arabic support:

> هذا المحتوى للتعليم والدراسة. أي جرعة أو إعدادات منفسة أو ترياق أو قرار علاجي حساس يجب مراجعته مع بروتوكول المستشفى أو الطبيب المسؤول قبل استخدامه على مريض حقيقي.

## Release decision

Do not mark the platform as final until:

- Medical reviewer signs off critical pages.
- Drug image sourcing is reviewed.
- PDF visual mappings are reviewed.
- Supabase/Auth is tested with approved and pending users.
- AI keys are tested in a secure backend environment.
- `npm run typecheck`, `npm run lint`, and local `npm run build` pass.
