export const LAWYER_TOTALS_MAR_2026: Record<string, number> = {
  SP: 404461,
  RJ: 172504,
  MG: 158161,
  RS: 104135,
  PR: 100639,
  BA: 69474,
  DF: 62686,
  GO: 61767,
  SC: 60046,
  PE: 48093,
  CE: 43456,
  PA: 32364,
  ES: 30821,
  MT: 29377,
  MA: 27952,
  PB: 24226,
  MS: 21629,
  PI: 19865,
  RN: 18553,
  AM: 18459,
  AL: 17250,
  SE: 14866,
  RO: 12596,
  TO: 11621,
  AP: 5056,
  AC: 4736,
  RR: 3479,
};

export function getLawyerTotalByUF(uf: string): number | undefined {
  return LAWYER_TOTALS_MAR_2026[String(uf).toUpperCase()];
}
