export type AnswerOption = { key: string; text: string };

export type AnswerableQuestion = {
  options: AnswerOption[];
  correctAnswerKey?: string | null;
  correctAnswer?: string | null;
};

const normalized = (value: string) => value.trim().toLocaleLowerCase();

export function hasValidAnswerOptions(question: AnswerableQuestion): boolean {
  if (question.options.length < 2) return false;
  const keys = question.options.map(option => option.key.trim().toUpperCase());
  return (
    keys.every(Boolean) &&
    new Set(keys).size === keys.length &&
    question.options.every(option => Boolean(option.text.trim()))
  );
}

/** Resolve only an explicit existing key or an exact, unique option-text match. */
export function resolveCorrectAnswerKey(question: AnswerableQuestion): string | null {
  if (!hasValidAnswerOptions(question)) return null;
  const explicit = question.correctAnswerKey?.trim().toUpperCase();
  if (explicit && question.options.some(option => option.key === explicit)) return explicit;

  const answer = question.correctAnswer?.trim();
  if (!answer) return null;
  const matches = question.options.filter(option => normalized(option.text) === normalized(answer));
  return matches.length === 1 ? matches[0].key : null;
}

/** Null means the answer cannot be graded safely. */
export function gradeSelectedAnswer(question: AnswerableQuestion, selectedAnswer: string): boolean | null {
  const correctKey = resolveCorrectAnswerKey(question);
  const selectedKey = selectedAnswer.trim().toUpperCase();
  if (!correctKey || !question.options.some(option => option.key === selectedKey)) return null;
  return selectedKey === correctKey;
}
