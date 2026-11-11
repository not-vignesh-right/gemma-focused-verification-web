import { SAMPLE_TASK } from '../../lib/sampleTask';

export const RUBRIC = [
  'No plausible edit relevance.',
  'Related concept with weak edit evidence.',
  'Plausible edit site tied to the described behavior.',
  'Direct evidence this definition implements the failing behavior and likely needs editing.',
];

/** Split a qualified symbol into a muted module path and the last two segments. */
export function splitSymbol(sym) {
  const parts = sym.split('.');
  const tail = parts.slice(-2).join('.');
  const head = parts.slice(0, -2).join('.');
  return { head, tail };
}

export const ROWS = SAMPLE_TASK.rows;
export const TASK = SAMPLE_TASK.task;

/** V20 rule: highest digit wins; ties follow original semantic rank. */
export const WINNER = ROWS.reduce((best, r) => (r.score > best.score ? r : best), ROWS[0]);

export const pad2 = (n) => String(n).padStart(2, '0');
