/**
 * Exam-trap normalization for the offline bundle.
 * Browser-safe copy of server/normalizeExamTraps.ts + server/examTrapArabic.ts.
 * server/* must never be imported by client code (it pulls node:fs into the
 * web bundle); parity with the server originals is covered by
 * client/src/lib/offline/parity.test.ts. If the server files change, mirror
 * the change here and the sync script needs no update (trap JSON is static).
 */
export const examTrapArabic: Record<string, string> = {
  TRP_0173: "الفرز اليومي المعتاد يختلف عن الفرز عند وجود عدد كبير من المصابين.",
  TRP_0174: "لا تخلط بين متلازمة بروغادا واحتشاء القلب المصحوب بارتفاع مقطع ST.",
  TRP_0175: "بحسب هذه النقطة، يُتجنب الدوبامين كخيار أول عندما يتوفر النورإبينفرين.",
  TRP_0176: "الارتفاع المفاجئ والمستمر في ثاني أكسيد الكربون بنهاية الزفير قد يشير إلى عودة الدورة الدموية التلقائية.",
  TRP_0177: "الإفراط في الإنعاش بالسوائل البلورية قد يزيد اضطراب التخثر.",
  TRP_0178: "تذكر النقطة تجنب الفازوبريسين والجرعات العالية من الإبينفرين عند توقف القلب الناتج عن السمية الجهازية للمخدر الموضعي.",
  TRP_0179: "يجب أن تتوافق الجرعة مع الهدف: تسكين الألم أم إحداث التخدير التفارقي.",
  TRP_0180: "تجنب الدبابيس عندما تكون دقة النتيجة التجميلية مهمة، مثل جروح الوجه.",
  TRP_0181: "ظهور الدهون الحجاجية أو إصابة الزاوية الإنسية للعين يستلزم إصلاحًا لدى المختص.",
  TRP_0182: "وفق الصياغة الامتحانية الواردة في المصدر، تُتجنب حاصرات بيتا في ألم الصدر المرتبط بالكوكايين.",
  TRP_0183: "تفرق النقطة بين اندحاس القلب المصحوب بعدم الاستقرار، الذي يستدعي بزل التامور، والانصباب المستقر.",
  TRP_0184: "تخص المراقبة حالات مختارة من الاسترواح الصدري الأولي، ولا تُعمم على الاسترواح الثانوي وفق النص.",
  TRP_0185: "تذكر النقطة عدم تأخير مثبط مضخة البروتون انتظارًا للتنظير في النزف الهضمي العلوي المرتبط بالقرحة.",
  TRP_0186: "لا تستخدم مواد تطرية اللحوم لمعالجة انحشار الطعام.",
  TRP_0187: "عند الاشتباه السريري المرتفع بغرغرينا فورنييه، لا تؤخر الجراحة انتظارًا للتصوير المقطعي.",
  TRP_0188: "افحص سكر الدم؛ فقد يحجب انخفاض الضغط وجود نقص السكر لدى مريض السكري الخاضع لغسيل الكلى.",
  TRP_0189: "وجود حمل داخل الرحم لا يستبعد وجود حمل خارج الرحم بالتزامن، خاصة بعد تقنيات المساعدة على الإنجاب.",
  TRP_0190: "تجنب الفحص المهبلي الإصبعي الروتيني عند الاشتباه بتمزق الأغشية قبل المخاض.",
  TRP_0191: "لا تنتظر ظهور البراز الشبيه بهلام الكشمش لتشخيص الانغلاف المعوي؛ فهو علامة متأخرة.",
  TRP_0192: "هذه ملاحظة عن جودة البيانات: يُشتبه باختلاط مصدر الفصل الإلكتروني، وليست قاعدة طبية.",
  TRP_0193: "على الطبيب إعادة تقييم مسار قرار الفرز وعدم الاستمرار فيه تلقائيًا دون مراجعة.",
  TRP_0194: "بحسب النص، تُعالج الأخطار المهددة للحياة قبل إزالة التلوث.",
};

type Trap = {
  id: string;
  text: string;
  topic: string;
  topicId?: string;
  referenceId?: string;
  source?: string;
};
type Card = {
  cardId: string;
  answer: string;
  topicId?: string;
  source?: string;
};
type Mentor = {
  topicId?: string;
  referenceId?: string;
  explanation: string;
};

/** Resolve recovered formats only through explicit IDs and exact text evidence. */
export function normalizeExamTraps(traps: Trap[], cards: Card[], mentors: Mentor[]) {
  return traps.map(item => {
    const evidence = item.topicId
      ? cards.filter(card => card.topicId === item.topicId && card.answer === item.text && card.source)
      : [];
    const sources = Array.from(new Set(evidence.map(card => card.source as string)));
    const sameText = traps.filter(other => other.id !== item.id && other.text === item.text && other.referenceId);
    const original = sameText.length === 1 ? sameText[0] : undefined;
    const referenceId = item.referenceId ?? original?.referenceId;
    const topicMentors = item.topicId ? mentors.filter(mentor => mentor.topicId === item.topicId) : [];
    const referenceMentors = referenceId ? mentors.filter(mentor => mentor.referenceId === referenceId) : [];
    const mentor =
      topicMentors.length === 1 ? topicMentors[0] : referenceMentors.length === 1 ? referenceMentors[0] : undefined;
    return {
      ...item,
      source: item.source || (sources.length === 1 ? sources[0] : "Source unresolved"),
      referenceId,
      arabicExplanation:
        examTrapArabic[item.id] ?? (original ? examTrapArabic[original.id] : undefined) ?? mentor?.explanation ?? null,
      provenance: {
        method: item.source ? "original-record" : sources.length === 1 ? "topic-id-and-exact-card-text" : "unresolved",
        evidenceFile: item.source ? "examTraps.json" : "flashcards.json",
        evidenceIds: evidence.map(card => card.cardId),
        topicId: item.topicId ?? null,
        referenceId: referenceId ?? null,
        duplicateOf: original?.id ?? null,
        reviewStatus: "under-review",
        // Recovered source labels do not establish a PDF edition or page.
        edition: null,
        page: null,
      },
    };
  });
}
