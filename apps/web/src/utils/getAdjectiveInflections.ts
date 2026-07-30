import { CaseEnum } from '../../../../packages/ui/src/enum/CaseEnum.ts';
import type { AdjectiveForm } from '../view-models/Form.ts';
import { GrammaticalGenderEnum } from '@verterbank/ui';

export interface AdjectiveInflectionRow {
  case: CaseEnum;
  masculine?: string;
  feminine?: string;
  neuter?: string;
}

export interface AdjectiveInflections {
  rows: AdjectiveInflectionRow[];
  plural?: string;
}

const ADJECTIVE_CASES = [CaseEnum.NOMINATIVE, CaseEnum.ACCUSATIVE, CaseEnum.DATIVE];

function findSingularAdjectiveForm(
  forms: AdjectiveForm[],
  caseValue: CaseEnum,
  gender: GrammaticalGenderEnum,
): string | undefined {
  return forms.find(
    (form) => form.case === caseValue && form.gender === gender && form.number === 'SG',
  )?.valueOrth;
}

function findPluralAdjectiveForm(forms: AdjectiveForm[]): string | undefined {
  return forms.find((form) => form.number === 'PL')?.valueOrth;
}

export function getAdjectiveInflections(forms: AdjectiveForm[]): AdjectiveInflections {
  return {
    rows: ADJECTIVE_CASES.map((caseValue) => ({
      case: caseValue,
      masculine: findSingularAdjectiveForm(forms, caseValue, GrammaticalGenderEnum.MASC),
      feminine: findSingularAdjectiveForm(forms, caseValue, GrammaticalGenderEnum.FEM),
      neuter: findSingularAdjectiveForm(forms, caseValue, GrammaticalGenderEnum.NEUT),
    })),
    plural: findPluralAdjectiveForm(forms),
  };
}
