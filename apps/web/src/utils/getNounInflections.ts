import { CaseEnum, isCase } from '../../../../packages/ui/src/enum/CaseEnum.ts';
import type { NounLexeme } from '../view-models/Lexeme.ts';
import { getDeterminer } from './getDeterminer.ts';
import { yi } from '@verterbank/messages';

type CaseInflectionItem = {
  kind: 'case';
  case: CaseEnum;
  determiner?: string;
  valueOrth: string;
};

type PluralInflectionItem = {
  kind: 'plural';
  determiner?: string;
  valueOrth: string;
};

type NounInflectionItem = CaseInflectionItem | PluralInflectionItem;

const DECLENSION_SLOTS = [
  { kind: 'case', case: CaseEnum.NOMINATIVE },
  { kind: 'case', case: CaseEnum.ACCUSATIVE },
  { kind: 'case', case: CaseEnum.DATIVE },
  { kind: 'plural' },
] as const;

function parseCase(value?: string): CaseEnum | undefined {
  return value && isCase(value) ? CaseEnum[value] : undefined;
}

export function getNounInflections(noun: NounLexeme, headwordOrth: string): NounInflectionItem[] {
  const formsByCase = new Map(
    noun.forms.flatMap((form) => {
      const parsedCase = parseCase(form.case);
      return parsedCase ? [[parsedCase, form] as const] : [];
    }),
  );

  const pluralForm = noun.forms.find((form) => form.number === 'PL');

  return DECLENSION_SLOTS.flatMap((slot): NounInflectionItem[] => {
    if (slot.kind === 'plural') {
      return pluralForm?.valueOrth
        ? [
            {
              kind: 'plural',
              determiner: yi.articles.di,
              valueOrth: pluralForm.valueOrth,
            },
          ]
        : [];
    }

    const form = formsByCase.get(slot.case);

    return [
      {
        kind: 'case',
        case: slot.case,
        determiner: getDeterminer(slot.case, noun.grammaticalGender),
        valueOrth:
          slot.case === CaseEnum.NOMINATIVE ? headwordOrth : (form?.valueOrth ?? headwordOrth),
      },
    ];
  });
}
