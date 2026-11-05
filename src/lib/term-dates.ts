export type TermDate = {
  _key?: string;
  year?: number | null;
  term?: number | null;
  start?: string | null;
  end?: string | null;
  note?: string | null;
};

export function todayInNz(now: Date = new Date()) {
  return now.toLocaleDateString("en-CA", { timeZone: "Pacific/Auckland" });
}

export function upcomingTerms(
  terms: TermDate[] | null | undefined,
  limit = 2,
  today = todayInNz(),
) {
  return (terms ?? [])
    .filter((t) => t.start && t.end && t.term && t.year && t.end >= today)
    .sort((a, b) => (a.start! < b.start! ? -1 : 1))
    .slice(0, limit);
}

export function formatTermDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-NZ", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

export function isCurrentTerm(term: TermDate, today = todayInNz()) {
  return Boolean(term.start && term.end && term.start <= today && term.end >= today);
}
