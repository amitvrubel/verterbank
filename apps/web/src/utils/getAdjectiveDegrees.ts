import type { AdjectiveForm } from '../view-models/Form.ts';
import { AdjectiveDegreeEnum } from '../enum/AdjectiveDegreeEnum.ts';

export interface AdjectiveDegreeItem {
  degree: AdjectiveDegreeEnum;
  valueOrth: string;
}

const adjectiveDegreeOrder = [
  AdjectiveDegreeEnum.POSITIVE,
  AdjectiveDegreeEnum.COMPARATIVE,
  AdjectiveDegreeEnum.SUPERLATIVE,
];

export function getAdjectiveDegreeItems(
  forms: AdjectiveForm[],
  headwordOrth: string,
): AdjectiveDegreeItem[] {
  return adjectiveDegreeOrder
    .map((degree) => {
      if (degree === AdjectiveDegreeEnum.POSITIVE) {
        return { degree, valueOrth: headwordOrth };
      }

      const form = forms.find((form) => form.degree === degree);

      return form?.valueOrth ? { degree, valueOrth: form.valueOrth } : undefined;
    })
    .filter((item): item is AdjectiveDegreeItem => Boolean(item));
}
