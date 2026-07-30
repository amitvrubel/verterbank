import type { ApiSense } from '../dto/HeadwordDto.ts';

import type { AdjectiveForm, GenericForm, NounForm, VerbForm } from './Form.ts';
import { GrammaticalGenderEnum, PartOfSpeech, type PartOfSpeechValue } from '@verterbank/ui';

export type BaseLexeme = {
  id: string;
  yivo?: string;
  ipa?: string;
  notes?: string;
  status: string;
  senses: ApiSense[];
};

export type PastAuxiliary = 'HABN' | 'ZAYN';

export type VerbLexeme = BaseLexeme & {
  partOfSpeech: typeof PartOfSpeech.VERB;
  pastAuxiliary?: PastAuxiliary;
  forms: VerbForm[];
};

export type NounLexeme = BaseLexeme & {
  partOfSpeech: typeof PartOfSpeech.NOUN;
  grammaticalGender?: GrammaticalGenderEnum;
  forms: NounForm[];
};

export type AdjectiveLexeme = BaseLexeme & {
  partOfSpeech: typeof PartOfSpeech.ADJECTIVE;
  forms: AdjectiveForm[];
};

export type GenericLexeme = BaseLexeme & {
  partOfSpeech: Exclude<
    PartOfSpeechValue,
    typeof PartOfSpeech.VERB | typeof PartOfSpeech.NOUN | typeof PartOfSpeech.ADJECTIVE
  >;
  forms: GenericForm[];
};

export type LexemeViewModel = VerbLexeme | NounLexeme | AdjectiveLexeme | GenericLexeme;

export type HeadwordViewModel = {
  id: string;
  orth: string;
  lexemes: LexemeViewModel[];
};
