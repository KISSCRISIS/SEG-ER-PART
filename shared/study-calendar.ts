export function isCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

export function studyWeek(start: string, dailyHours: number, restDays: number[], examDate?: string) {
  if (!isCalendarDate(start) || (examDate && !isCalendarDate(examDate))) throw new Error("Invalid calendar date");
  return Array.from({ length: 7 }, (_, offset) => {
    const date = new Date(`${start}T12:00:00Z`);
    date.setUTCDate(date.getUTCDate() + offset);
    const day = date.toISOString().slice(0, 10);
    const rest = restDays.includes(date.getUTCDay());
    const examReached = Boolean(examDate && day >= examDate);
    return { date: day, rest, examReached, minutes: rest || examReached ? 0 : Math.round(dailyHours * 60) };
  });
}
