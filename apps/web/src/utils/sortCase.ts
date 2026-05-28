import { CaseEnum, isCase } from '../enum/CaseEnum.ts';
import type { NounForm } from '../view-models/Form.ts';

const CASE_ORDER: Record<CaseEnum, number> = {
  [CaseEnum.NOMINATIVE]: 0,
  [CaseEnum.ACCUSATIVE]: 1,
  [CaseEnum.DATIVE]: 2,
};

export function sortNounForms(forms: NounForm[]): NounForm[] {
  return [...forms].sort((a, b) => {
    if (a.case && isCase(a.case) && b.case && isCase(b.case)) {
      return CASE_ORDER[a.case] - CASE_ORDER[b.case];
    }
    return Number.MAX_SAFE_INTEGER;
  });
}
