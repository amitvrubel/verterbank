import type { VerbForm } from '../view-models/Form.ts';
import { yi } from '../i18n/messages.ts';

type Auxiliary = 'HABN' | 'ZAYN';
const auxiliaryLabel = {
  HABN: 'האָבן',
  ZAYN: 'זײַן',
};

const PRESENT_FORM_ORDER: Record<string, number> = {
  '1-SG': 10,
  '2-SG': 20,
  '3-SG': 30,
  '1-PL': 40,
  '2-PL': 50,
  '3-PL': 60,
};

const yiPronounByPersonAndNumber: Record<string, string> = {
  '1-SG': 'איך',
  '2-SG': 'דו',
  '3-SG': 'ער/זי/עס',
  '1-PL': 'מיר',
  '2-PL': 'איר',
  '3-PL': 'זיי',
};

export interface VerbInflectionItem {
  label: string;
  valueOrth: string;
}

function getVerbFormSortOrder(form: VerbForm): number {
  if (form.tense === 'PRESENT' && form.person && form.number) {
    return PRESENT_FORM_ORDER[`${form.person}-${form.number}`] ?? 999;
  }

  if (form.tense === 'PAST') {
    return 100;
  }

  return form.order ?? 999;
}

export function sortVerbForms(a: VerbForm, b: VerbForm) {
  return getVerbFormSortOrder(a) - getVerbFormSortOrder(b);
}

function getVerbFormValue(form: VerbForm, aux?: Auxiliary) {
  if (form.tense === 'PAST' && aux) {
    return `${auxiliaryLabel[aux]} + ${form.valueOrth}`;
  }

  return form.valueOrth;
}

function getVerbFormLabel(form: VerbForm): string | undefined {
  if (form.tense === 'PRESENT' && form.person && form.number) {
    return yiPronounByPersonAndNumber[`${form.person}-${form.number}`];
  }

  if (form.tense === 'PAST') {
    return yi.participle;
  }

  return undefined;
}

export function getVerbInflectionItems(forms: VerbForm[], aux?: Auxiliary): VerbInflectionItem[] {
  return [...forms].sort(sortVerbForms).flatMap((form) => {
    const label = getVerbFormLabel(form);

    if (!label) return [];

    return [
      {
        label,
        valueOrth: getVerbFormValue(form, aux),
      },
    ];
  });
}
