# SEG DATABASE FOUNDATION — EXECUTIVE SUMMARY

**Project:** Smart Emergency Guide (SEG)  
**Document type:** Executive summary of database-design packages  
**Mode:** `CONTROLLED READ-ONLY / DESIGN STATUS CONSOLIDATION`  
**Author:** Manus AI  
**As of:** 2026-08-22  
**Implementation boundary:** No SQL execution, migration execution, database write, Supabase modification, application modification, import, adapter execution, or content activation was authorized or performed.

---

## 1. Executive conclusion

تم استكمال حزم التصميم والتحليل الخاصة بـ **SEG Database Foundation** على مستوى الأدلة والتصميم المنطقي. النتيجة ليست موافقة على تنفيذ قاعدة البيانات، بل هي حزمة تصميم جاهزة للمراجعة النهائية والاعتماد المرحلي.

> **الحالة المعتمدة:** `DESIGN FOUNDATION READY — IMPLEMENTATION BLOCKED PENDING APPROVAL`

تم إنجاز محاذاة أولية لطبقات الهوية والتعلم والإدارة والسجلات التشغيلية، ثم أُضيف تصميم تخزين محتوى محكوم متوافق مع غلاف `SEG_CONTENT_RECORD_V1_1`. بعد ذلك أُنجزت Schema Review وCompatibility Matrix وSQL Migration Design Draft بصيغة غير تنفيذية. بقيت القرارات المتعلقة بـtarget runtime، وcontent root، والهوية المرجعية للمراجعين، وAtlas final FK/cardinality، والمراجعة الأمنية المستقلة مفتوحة قبل أي SQL artifact أو تنفيذ.[1] [2] [3] [4]

| المجال | الحالة الحالية | هل هو معتمد للتنفيذ؟ |
|---|---|---:|
| Database Alignment | مكتمل كتحليل evidence أولي | لا |
| Content Storage Design | تصميم مفاهيمي/منطقي مكتمل للمراجعة | لا |
| Database Foundation DRY-RUN | `DESIGN_EVIDENCE_READY_FOR_REVIEW` | لا |
| Compatibility Matrix v1 | `COMPLETE` مع قرارات reuse/verify/create | لا |
| Schema Review | `ACCEPTED_FOR_SCHEMA_REVIEW` | لا |
| Atlas foundation | `DESIGN_FOUNDATION_ACCEPTED_FOR_REVIEW`؛ N:M provisional | لا |
| SQL Migration Design Draft v1 | `DESIGN_COMPLETE_FOR_REVIEW` | لا؛ SQL غير منشأ |
| SQL execution | `BLOCKED` | لا |
| Database modification | `NOT PERFORMED` | لا |
| Import / adapter / activation | `NOT STARTED / NOT AUTHORIZED` | لا |

---

## 2. ما الذي غطته حزم التصميم؟

### 2.1 Database Alignment and Content Storage Design

بدأت المراجعة بفحص `supabase.zip` وملفات schema/migrations كأدلة declarative فقط. أظهرت الأدلة وجود طبقات مرتبطة بـ`auth.users` و`profiles`، وحقول الدور والمسار التعلمي، وجداول learner interaction، وcredential review، وبعض سجلات الإدارة والأمن. لكنها لم تثبت أن Supabase هو persistence layer الحي للتطبيق الحالي؛ فالتطبيق الفعلي يستخدم MySQL/Drizzle عبر `server/db.ts` وschema التطبيق، ولذلك بقيت حدود provider/runtime غير محسومة.[1] [5] [6]

خلصت حزمة المحاذاة إلى أن الموجود قابل لإعادة الاستخدام في نطاقات محدودة، مثل identity/profile routing وlearner interaction وبعض الأنماط الإدارية والأمنية. في المقابل، لم تثبت الأدلة وجود governed content repository كامل يحقق غلاف v1.1، ولا source registry وlineage وrights/display enforcement وcontent review queue وcontent-level audit وAtlas content relations كطبقة جاهزة.[1] [2]

سجلت المراجعة الأصلية **24 فجوة مفتوحة** في `SEG_DATABASE_GAP_REGISTER.md`. لم تُغلق أي فجوة نتيجة مراجعات `pasted_content_21` إلى `pasted_content_24`؛ فقد بقيت تلك الملفات أدلة نصية إضافية أو claims تحتاج direct attributable schema evidence، ولم تُغيّر التصميم أو قرار Content Root.[7] [8] [9]

### 2.2 Database Foundation DRY-RUN Design Package v1.0

حوّلت حزمة DRY-RUN متطلبات غلاف `SEG_CONTENT_RECORD_V1_1` إلى تصميم relational منطقي غير منفذ. المبدأ المركزي هو عدم استخدام جدول مسطح يحمل كل شيء، بل فصل المجالات الآتية:

| المجال | الطبقة المنطقية المقترحة | الغرض |
|---|---|---|
| Source Governance | `source_registry`, `source_artifacts`, `source_lineage` | تثبيت هوية المصدر والـartifact والنسخة والـhash والعلاقات lineage |
| Content Contract | content root مؤكد لاحقًا أو `content_records`، مع `content_payloads` عند الحاجة | حمل envelope v1.1 وحدود typed payloads |
| Review Governance | review state projections وreview events | فصل الحالة الحالية عن سجل القرارات append-only |
| Rights Governance | rights state وevidence/display scope | منع العرض قبل إثبات الحقوق والنطاق |
| Atlas Governance | `atlas_assets` وjunction مستقلة | إدارة الأصول والعلاقات دون خلطها مع review/storage القديم |
| Audit | `content_audit_events` | إعادة بناء التغييرات والقرارات المحكومة |
| Access Control | RLS predicates وحدود الأدوار | فرض least privilege وpublished-only learner access |

اعتمد التصميم مبدأ أن `source → version → governance record → clinical review → rights review → approval → implementation authorization → migration/import → activation` سلسلة منفصلة المراحل. وجود record أو source لا يساوي approval، ولا يساوي learner visibility.[2]

### 2.3 Schema Review and Existing Supabase Mapping

أغلقت Schema Review ثلاث بوابات تصميمية للمراجعة، لا للتنفيذ:

| Gate | القرار التصميمي | الحالة |
|---|---|---|
| Gate 1 — Existing Supabase Schema Mapping | تم توثيق الجداول declarative والـPK/FK وauth/profile وRLS والأنماط audit/review، مع فصلها عن MySQL/Drizzle runtime | `MAPPED_FOR_SCHEMA_REVIEW` |
| Gate 2 — v1.1 Storage Model | التوصية بـ`content_records` كمرساة envelope و`content_payloads` بعلاقة 1:1 وحدود typed payloads | `RECOMMENDED_MODEL_PENDING_SECURITY_REVIEW` |
| Gate 3 — Atlas Cardinality | التوصية بعلاقة many-to-many عبر junction صريحة | `RECOMMENDED_MANY_TO_MANY_PENDING_SECURITY_REVIEW` |
| Security Review | الأنماط الحالية مفيدة لكنها لا توفر content-level authorization مكتملًا | `SECURITY_REVIEW_REQUIRED` |

تم الإبقاء على `clinical_case` داخل عقد v1.1. العبارة السابقة `NOT_SUPPORTED` مسجلة كـ`UNRESOLVED` إلى أن يتحدد هل المقصود عدم دعمه في قاعدة البيانات الحالية أم عدم دعمه في العقد. لم يُحذف النوع ولم تُنشأ له سجلات.[3]

### 2.4 Compatibility Matrix v1

حددت Compatibility Matrix حدود إعادة الاستخدام بدقة:

| capability | القرار |
|---|---|
| Account identity وprofile routing | `REUSE` محدود ضمن نطاق الحساب، وليس content FK تلقائيًا |
| Existing roles/permissions/admin boundaries | `REUSE_PATTERN_ONLY` |
| Progress/bookmarks/exam attempts | `REUSE` downstream فقط |
| Operational/security logs | `DOMAIN-BOUND REUSE ONLY`؛ ليست بديلًا عن content audit |
| `_prisma_migrations` | `DO_NOT_REUSE` للمحتوى؛ security review فقط |
| `audit_logs` | `VERIFY_BEFORE_DECISION`؛ لا تُفترض صلاحيته كـcontent/medical/provenance audit |
| `content` و`content_versions` | `UNRESOLVED / VERIFY_BEFORE_DECISION` حتى تُلتقط التعريفات والـruntime parity مباشرة |
| v1.1 governed envelope | `CREATE_NEW_GOVERNED_LAYER UNLESS VERIFIED` |
| Atlas relation | `DESIGN ACCEPTED FOR REVIEW`؛ many-to-many منطقيًا |
| SQL migration | `BLOCKED` |

تعارض migration history لم يُحسم: مخرجات API فارغة في مقابل صفوف مبلّغ عنها في جدول metadata، منها `20260730_uuid_migration` و`20260801_phase2c_journal_practice` و`20260801_phase2c_practice_core_expansion`. تم اعتمادها كـ`CONFLICTING EVIDENCE`، ولم يُنفذ replay أو migration اختيارية.[4] [10]

### 2.5 SQL Migration Design Draft v1

تم إعداد مسودة migration منطقية غير تنفيذية، بترتيب تبعية مقترح من `000` إلى `009`:

| الخطوة | design unit | الغرض | الحالة |
|---:|---|---|---|
| `000` | Target/parity preflight | تأكيد provider والبيئة والهوية والتعريفات القابلة لإعادة الاستخدام | `BLOCKED_PENDING_VERIFICATION` |
| `001` | `source_registry` | جذر هوية المصدر والحوكمة | تصميم فقط |
| `002` | `source_artifacts` | هوية artifact والـchecksum والنسخة | تصميم فقط |
| `003` | `source_lineage` | علاقات parent/child/derived غير قابلة للالتباس | تصميم فقط |
| `004` | `atlas_assets` | سجل Atlas مستقل | تصميم فقط |
| `005` | `atlas_asset_members` | N:M بين Atlas وcontent مع الدور والترتيب والنطاق | `PROVISIONAL N:M` |
| `006` | `review_events` | أحداث review والإسقاطات الحالية للحالة | تصميم فقط |
| `007` | `content_links` | source/reference/taxonomy/pathway/rights/Atlas links | `BLOCKED_PENDING_CONTENT_SCHEMA` |
| `008` | `rls_design` | تصميم policies واختبارات سلبية دون كتابة policies | غير تنفيذي |
| `009` | `indexes_constraints` | فهارس وقيود مستقبلية بعد كل البوابات | تصميم فقط |

المسودة ترفض ضمنيًا اعتبار هذا الترتيب تصريحًا بإنشاء الجداول أو policies. كما أنها لا تختار بالافتراض بين إعادة استخدام `content` كجذر v1.1 وبين إنشاء `content_records`; هذا القرار مؤجل إلى direct schema evidence.[11]

---

## 3. القرارات التصميمية المثبتة حاليًا

### 3.1 الحفاظ على العقد والحوكمة

يبقى `SEG_CONTENT_RECORD_V1_1` هو العقد المرجعي، ويبقى schema v1.0 canonical دون تعديل. لا يتم اختزال envelope إلى أعمدة مسطحة ولا يتم تغيير معنى الحقول الطبية أو الحقوقية أثناء التصميم.[2] [3]

### 3.2 Content Record Model

التوصية الحالية للمراجعة هي:

```text
content_records
        |
        | 1:1
        v
content_payloads
        |
        +--> typed payload boundaries

content_records
        +--> source/version/references
        +--> taxonomy/pathway scope
        +--> medical/rights/visual/accessibility review
        +--> append-only audit
```

لكن **Content Root غير نهائي**. يجب أولًا التحقق من `content` و`content_versions` مباشرة. إذا ثبتت compatibility الكاملة، يمكن إعادة الاستخدام مع إضافة relations مفقودة. وإذا كانت الجداول learner-facing فقط ولا تحمل envelope، فالتصميم الآمن هو governed `content_records` root مع downstream links. أما generic polymorphic table فمرفوض كتوجه أساسي لأنه يضعف referential integrity وtype integrity وRLS وauditability.[3] [11]

### 3.3 Atlas Model

القرار المبدئي المقبول للمراجعة هو:

```text
atlas_assets 1 ----< atlas_asset_members >---- 1 content_records
```

أي أن العلاقة الأساسية **many-to-many**: يمكن للسجل استخدام أكثر من asset، ويمكن للـasset أن يعاد استخدامه عبر سجلات متعددة دون تكرار المصدر الأصلي. العلاقة لا تزال provisional حتى تُحسم content schema وasset-version targeting وrelation vocabulary وFK strategy وdisplay predicates وrights scope. جدول `visual_asset_reviews` الحالي precedent للمراجعة فقط، وليس Atlas registry أو content junction.[3] [12]

### 3.4 فصل Security عن Atlas وMigration

لا تُخلط Atlas migration مع security remediation. تبقى `_prisma_migrations` خارج content model، ولا يتم تلقائيًا تشغيل RLS عليها. كما تبقى `audit_logs` وSECURITY DEFINER وleaked-password protection وservice-role exposure داخل Security Review Queue، ولا تدخل كـmigration targets قبل قرار أمني مستقل.[4] [13]

### 3.5 Review and Publication Gates

Review events منفصلة عن current-state projections. ولكل سجل، يجب أن تبقى medical review وrights review وprovenance review وvisual/accessibility review وpublication gates مستقلة. Learner visibility لا تتحقق إلا باجتماع applicable predicates: active publication، medical approval، rights/display permission، structural/visual/accessibility acceptance عند الحاجة، pathway match، وعدم وجود withdrawal أو restriction.[11] [13]

---

## 4. النقاط العالقة بانتظار الاعتماد

### 4.1 قرارات target وruntime

لم يُحسم هل target النهائي هو Supabase/PostgreSQL، أم MySQL/Drizzle المستخدم في التطبيق، أم boundary متكامل بينهما. لا يجوز اقتراح physical FK أو RLS أو migration provider-specific قبل تثبيت هذا القرار بدليل مباشر واعتماد تقني.[3] [4]

### 4.2 Existing Schema Parity

يلزم direct attributable evidence لكل object يُدّعى أنه reusable، يتضمن environment/target identity، وقت وطريقة الاستخراج، DDL أو catalog definition، PK/FK، unique constraints، grants، RLS status، policies، ownership، وruntime parity. هذا ينطبق خصوصًا على `content` و`content_versions` و`audit_logs` و`_prisma_migrations` وstorage وtaxonomy وpathway claims.[4] [13]

### 4.3 Content Root and payload boundary

يحتاج المشروع إلى اعتماد أحد الخيارات التالية بعد parity review:

| الخيار | شرط اعتماده |
|---|---|
| إعادة استخدام `content` كـv1.1 root | إثبات keys/versioning/provenance/rights/review/taxonomy/audit/RLS compatibility |
| إعادة استخدام `content` كـdownstream content فقط | إثبات أنه learner-facing ولا يحمل governed envelope كاملًا |
| إنشاء `content_records` + `content_payloads` | عدم وجود root متوافق أو الحاجة إلى typed payload boundaries |
| polymorphic root | غير موصى به ويحتاج architecture review مستقلًا إذا طُرح |

لا تزال `clinical_case` نقطة governance غير محسومة، لا نقطة حذف أو تعديل عقد.[3] [11]

### 4.4 Actor identity and reviewer authorization

يجب حسم العلاقة بين Manus OAuth `openId`، وMySQL numeric user IDs، وSupabase `auth.users.id`، وحقول actor/reviewer في v1.1. كما يجب تحديد reviewer assignment، conflict-of-interest، reviewer-not-self، escalation، وMedical Decision Owner authority.[3] [11] [13]

### 4.5 Pathway and professional-track scope

حقول profile مثل `clinical_role` و`professional_grade` و`primary_learning_track` لا تكفي وحدها لفرض record-level scope. يجب تصميم واعتماد scope صريح للمسارات: Internship Doctor، Emergency Medicine Resident، وShared Medical Core، مع negative tests تمنع تسرب المحتوى بين المسارات.[3] [13]

### 4.6 Atlas final cardinality and FK strategy

يبقى N:M هو الأساس الموصى به، لكنه يحتاج اعتمادًا نهائيًا على: relation vocabulary، asset version targeting، هل rights على asset أم relation أم كليهما، هل relation تحتاج review state مستقلة، هل asset يعرض عبر مسارات متعددة، وما هي uniqueness exceptions للـcover أو الأدوار الخاصة.[3] [12]

### 4.7 Security review closure

تحتوي `SEG_SECURITY_REVIEW_QUEUE` على 12 محورًا مفتوحًا، أهمها:

| المحور | القرار الحالي |
|---|---|
| `_prisma_migrations` | لا `ALTER TABLE` تلقائي؛ يجب فحص owner/grants/tooling/exposure أولًا |
| `audit_logs` | لا policies جديدة قبل تحديد writers/readers/service/admin/reviewer semantics |
| Content audit | يجب فصلها عن operational/admin/security logs |
| SECURITY DEFINER | فحص owner و`search_path` وexecute grants والمدخلات والتدقيق |
| Leaked-password protection | تحقق من Auth configuration عبر مسار موثق؛ لا استنتاج من schema SQL |
| Service role | server-only allowlist مع attribution/audit وnegative tests |
| Reviewer separation | medical/rights/structural/technical domains مستقلة ومنع self-approval |
| Pathway RLS | record-level pathway junction وlearner predicates مطلوبة |
| Atlas display | content gate + asset gate + relation gate + pathway/display scope |
| Migration history | direct evidence موحد للـAPI والجدول والبيئة والوقت والchecksum |
| Runtime/provider mismatch | حسم target قبل physical design |
| Audit immutability | append-only semantics وقيود update/delete وactor attribution |

لا يُغلق أي بند أمني لمجرد أن policy يمكن أن تُكتب أو أن table يمكن الوصول إليه؛ المطلوب evidence، وقرار owner/security، ونطاق أدوار، واختبارات سلبية، وأثر rollback.[13]

### 4.8 Operational readiness

قبل أي SQL artifact أو تنفيذ، يلزم اعتماد backup/restore evidence، وmigration ownership، وcheckpoint strategy، وrollback rehearsal، وQA acceptance criteria، وقائمة الجداول المسموح بتغييرها. يجب أن تكون العملية additive وقابلة للعكس، وألا تلمس الجداول الحالية أو تحذف تاريخ القرارات.[11]

---

## 5. ما تم إغلاقه وما لم يتم إغلاقه

| البند | النتيجة |
|---|---|
| جمع الأدلة النصية الإضافية `pasted_content_21`–`24` | مكتمل؛ لا design change |
| Database Alignment baseline | مكتمل كتحليل declarative evidence |
| 24 DB gaps | مفتوحة؛ لم يُغلق أي Gap |
| Source governance need | مؤكد تصميميًا |
| Governed envelope boundary | مؤكد كمتطلب v1.1 |
| Content root final choice | غير محسوم |
| `clinical_case` interpretation | غير محسوم؛ النوع محفوظ |
| Atlas direction | N:M مقبول للمراجعة، غير نهائي للتنفيذ |
| Existing `visual_asset_reviews` as Atlas model | مرفوض؛ precedent فقط |
| `_prisma_migrations` as content target | مرفوض |
| `audit_logs` as universal content audit | غير مثبت ومرفوض كافتراض |
| Security remediation | مفتوحة ومنفصلة عن migration |
| SQL migration design | مكتمل كتصميم غير تنفيذي |
| SQL file | غير منشأ |
| SQL execution | محظور |
| Database change authorization | غير ممنوح |
| Content import/activation | غير مبدوء وغير مصرح |

---

## 6. بوابة الاعتماد المطلوبة

### Approval Gate A — Project and runtime

يجب أن يعتمد Project/Technical Owner target provider/runtime، وأن يحدد ما إذا كانت Supabase declarative evidence هي target أو archival/candidate evidence، وأن يعتمد canonical actor identity وFK boundary.

### Approval Gate B — Schema and content model

يجب أن يعتمد Schema Reviewer وContent Governance Owner content root، و`content_payloads` boundary، وtyped payload strategy، وقرار `clinical_case` التفسيري دون تعديل v1.1 ضمنيًا.

### Approval Gate C — Atlas and rights

يجب أن يعتمد Atlas/rights/security owners N:M junction، relation vocabulary، asset-version target، rights scope، display predicates، والاستثناءات الخاصة بالأدوار.

### Approval Gate D — Security

يجب أن يغلق Security Owner بنود `_prisma_migrations` و`audit_logs` وSECURITY DEFINER وAuth وservice role وreviewer separation وpathway RLS وaudit immutability، مع negative-test evidence.

### Approval Gate E — Migration readiness

بعد إغلاق Gates A–D فقط يمكن اعتماد قائمة الجداول الجديدة، migration ownership، backup/restore، rollback rehearsal، QA acceptance، وقرار مستقل يسمح بإنشاء **SQL Migration Draft غير منفذ**. هذا الاعتماد لا يساوي تنفيذًا ولا يسمح بالـimport أوactivation تلقائيًا.

---

## 7. الموقف التنفيذي الحالي

```text
SEG DATABASE FOUNDATION

Design Foundation       = COMPLETE
Compatibility Matrix    = COMPLETE
Schema Review           = ACCEPTED FOR REVIEW
Atlas Foundation        = ACCEPTED FOR REVIEW / PROVISIONAL N:M
Security Review         = OPEN
Content Root            = NOT FINALIZED
SQL Migration Design    = COMPLETE FOR REVIEW
SQL                   = NOT CREATED
SQL Execution           = BLOCKED
Database Change         = NOT AUTHORIZED
Import / Activation     = NOT AUTHORIZED
```

> **الخلاصة:** حزمة التصميم كاملة بما يكفي للمراجعة والاعتماد، لكنها لا تمنح صلاحية تنفيذ قاعدة البيانات. الخطوة التالية الصحيحة هي **Final Review Package and Approval Gate**؛ وبعد الاعتماد المستقل وإغلاق البنود الأمنية والعلاقية فقط يمكن النظر في SQL Migration Plan/Draft غير منفذ.

---

## 8. References

[1]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_ALIGNMENT_REPORT.md "SEG Database Alignment Report"

[2]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_FOUNDATION_DRY_RUN_DESIGN_PACKAGE_V1_0.md "SEG Database Foundation DRY-RUN Design Package v1.0"

[3]: file:///home/ubuntu/seg-internship-output/SEG_SCHEMA_REVIEW_EXISTING_SUPABASE_MAPPING_PACKAGE_V1_0.md "SEG Schema Review Existing Supabase Mapping Package v1.0"

[4]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_COMPATIBILITY_GATE_REPORT_V1.md "SEG Database Compatibility Gate Report v1"

[5]: file:///tmp/seg-supabase-review/supabase/schema.sql "Declarative Supabase schema evidence"

[6]: file:///home/ubuntu/seg-manus-status/drizzle/schema.ts "Current application-side Drizzle schema"

[7]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_GAP_REGISTER.md "SEG Database Gap Register"

[8]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_EVIDENCE_REVIEW_22.md "Database Evidence Review 22"

[9]: file:///home/ubuntu/seg-internship-output/SEG_PASTED_CONTENT_24_SCHEMA_EVIDENCE_REVIEW.md "Pasted Content 24 Schema Evidence Review"

[10]: file:///home/ubuntu/seg-internship-output/SEG_DATABASE_MIGRATION_HISTORY_EVIDENCE_REVIEW_V1_0.md "Migration History Evidence Review v1.0"

[11]: file:///home/ubuntu/seg-internship-output/SEG_SQL_MIGRATION_DESIGN_DRAFT_V1.md "SEG SQL Migration Design Draft v1"

[12]: file:///home/ubuntu/seg-internship-output/SEG_SCHEMA_REVIEW_ATLAS_CARDINALITY_DECISION_V1_0.md "SEG Schema Review Atlas Cardinality Decision v1.0"

[13]: file:///home/ubuntu/seg-internship-output/SEG_SECURITY_REVIEW_QUEUE.md "SEG Security Review Queue"

[14]: file:///home/ubuntu/seg-internship-output/SEG_CONTENT_STORAGE_DESIGN.md "SEG Content Storage Design"

[15]: file:///home/ubuntu/seg-internship-output/SEG_SQL_MIGRATION_DESIGN_PACKAGE_MANIFEST_V1.md "SEG SQL Migration Design Package Manifest v1"
