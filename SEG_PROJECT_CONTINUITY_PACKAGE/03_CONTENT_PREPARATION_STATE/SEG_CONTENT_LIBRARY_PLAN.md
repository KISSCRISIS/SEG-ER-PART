# SEG_CONTENT_LIBRARY Plan

## Purpose

توفير بنية محايدة لاستقبال مواد مستقبلية معتمدة، مع فصل المحتوى عن الواجهة وإجبار كل مادة على المرور عبر source, version, review, rights, taxonomy, and audit gates.

## Proposed structure

```text
SEG_CONTENT_LIBRARY/
├── README.md
├── manifest.schema.json
├── records/
│   ├── pending-intake/
│   ├── under-review/
│   ├── approved/
│   └── withdrawn/
├── sources/
├── references/
├── rights/
├── audit/
└── taxonomy/
```

## Required record shape

```json
{
  "article_id": "stable-id",
  "title": "",
  "content_type": "",
  "language": "",
  "publisher": "",
  "source_id": "",
  "source_url_or_file": "",
  "version": "",
  "checksum": "",
  "published_at": "",
  "accessed_at": "",
  "claims": [],
  "references": [],
  "taxonomy_id": "",
  "taxonomy_version": "",
  "rights": {
    "license": "",
    "text_usage": "",
    "image_usage": ""
  },
  "medical_review": {
    "reviewer": "",
    "decision": "draft",
    "reviewed_at": "",
    "expiry_or_next_review": ""
  },
  "audit": {
    "created_by": "",
    "created_at": "",
    "changed_by": "",
    "changed_at": "",
    "decision_reason": "",
    "withdrawal": null
  }
}
```

## Gate transitions

المادة تنتقل من `pending-intake` إلى `under-review` بعد اكتمال source وmetadata، ولا تنتقل إلى `approved` إلا بعد مراجعة طبية ومرجعية وحقوق وسجل تدقيق مكتمل. `withdrawn` لا يعاد تفعيلها دون قرار جديد. لا تُستخدم مجلدات الواجهة أو الشرائح الحالية كبديل عن taxonomy.

## Integration boundary

في البداية تبقى هذه البنية خارج مسارات العرض الفعلية. لا يُفتح البحث ولا تُعرض بطاقات المقالات إلا بعد نجاح readiness gate وتفويض تنفيذ مستقل. يجب أن تستلم الواجهة records approved فقط عبر adapter قابل للاختبار والتراجع.
