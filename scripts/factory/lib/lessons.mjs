// Parser and linter for LESSONS.md. Shared by the client-repo check and the
// factory's lessons harvest, so there is exactly one definition of the format.

export const STATUSES = ["candidate", "active", "superseded"];
export const SCOPES = ["repo", "factory"];
export const REQUIRED_FIELDS = [
  "Status",
  "Scope",
  "What happened",
  "Root cause",
  "Fix",
  "Evidence",
  "Applies to",
];

export const ACTIVE_WARN = 20;
export const ACTIVE_MAX = 30;

const HEADING = /^### (.+?) \((\d{4}-\d{2}-\d{2})\)\s*$/;
const FIELD = /^(?:[-*] )?\*\*([^*:]+):\*\*\s*(.*)$/;

/** Returns [{ title, date, line, fields: { Status, Scope, ... } }]. */
export function parseLessons(markdown) {
  const lessons = [];
  let current = null;
  let field = null;
  let inFence = false;
  markdown.split(/\r?\n/).forEach((raw, index) => {
    if (raw.trim().startsWith("```")) inFence = !inFence;
    if (inFence) return;
    const heading = raw.match(HEADING);
    if (heading) {
      current = { title: heading[1].trim(), date: heading[2], line: index + 1, fields: {} };
      lessons.push(current);
      field = null;
      return;
    }
    if (/^#{1,3} /.test(raw)) {
      current = null;
      field = null;
      return;
    }
    if (!current) return;
    const match = raw.match(FIELD);
    if (match) {
      field = match[1].trim();
      current.fields[field] = match[2].trim();
    } else if (field && raw.trim()) {
      current.fields[field] = `${current.fields[field]} ${raw.trim()}`.trim();
    }
  });
  return lessons;
}

/** Returns { errors: string[], warnings: string[], lessons }. */
export function lintLessons(markdown) {
  const errors = [];
  const warnings = [];
  const lessons = parseLessons(markdown);
  let inFence = false;
  const looseHeadings = markdown
    .split(/\r?\n/)
    .map((line, index) => ({ line, index }))
    .filter(({ line }) => {
      if (line.trim().startsWith("```")) inFence = !inFence;
      return !inFence && /^### /.test(line) && !HEADING.test(line);
    });
  for (const { line, index } of looseHeadings) {
    errors.push(`LESSONS.md:${index + 1} heading must be "### <Rule as a title> (YYYY-MM-DD)": ${line}`);
  }
  const seen = new Set();
  for (const lesson of lessons) {
    const where = `LESSONS.md:${lesson.line} "${lesson.title}"`;
    for (const name of REQUIRED_FIELDS) {
      if (!lesson.fields[name]) errors.push(`${where} is missing **${name}:**`);
    }
    const status = (lesson.fields.Status ?? "").toLowerCase();
    if (lesson.fields.Status && !STATUSES.some((value) => status.startsWith(value))) {
      errors.push(`${where} Status must be one of ${STATUSES.join(", ")}`);
    }
    const scope = (lesson.fields.Scope ?? "").toLowerCase();
    if (lesson.fields.Scope && !SCOPES.includes(scope)) {
      errors.push(`${where} Scope must be one of ${SCOPES.join(", ")}`);
    }
    const key = lesson.title.toLowerCase();
    if (seen.has(key)) errors.push(`${where} is a duplicate title. Update the existing lesson instead.`);
    seen.add(key);
  }
  const active = lessons.filter((lesson) => (lesson.fields.Status ?? "").toLowerCase().startsWith("active"));
  if (active.length > ACTIVE_MAX) {
    errors.push(
      `LESSONS.md has ${active.length} active lessons (limit ${ACTIVE_MAX}). Merge duplicates, turn rules into checks, or move old ones to docs/lessons-archive/.`,
    );
  } else if (active.length > ACTIVE_WARN) {
    warnings.push(`LESSONS.md has ${active.length} active lessons. Rotate before it reaches ${ACTIVE_MAX}.`);
  }
  return { errors, warnings, lessons };
}

export const isActive = (lesson) => (lesson.fields.Status ?? "").toLowerCase().startsWith("active");
export const isFactoryScope = (lesson) => (lesson.fields.Scope ?? "").toLowerCase() === "factory";
