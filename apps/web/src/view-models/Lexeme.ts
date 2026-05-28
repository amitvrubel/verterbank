import type { ApiSense } from '../dto/HeadwordDto.ts';
import type { PartOfSpeech } from '../enum/PartOfSpeech.ts';
import type { GrammaticalGenderEnum } from '../enum/GrammaticalGenderEnum.ts';
import type { AdjectiveForm, GenericForm, NounForm, VerbForm } from './Form.ts';

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
  partOfSpeech: PartOfSpeech.VERB;
  pastAuxiliary?: PastAuxiliary;
  forms: VerbForm[];
};

export type NounLexeme = BaseLexeme & {
  partOfSpeech: PartOfSpeech.NOUN;
  grammaticalGender?: GrammaticalGenderEnum;
  forms: NounForm[];
};

export type AdjectiveLexeme = BaseLexeme & {
  partOfSpeech: PartOfSpeech.ADJECTIVE;
  forms: AdjectiveForm[];
};

export type GenericLexeme = BaseLexeme & {
  partOfSpeech: Exclude<
    PartOfSpeech,
    PartOfSpeech.VERB | PartOfSpeech.NOUN | PartOfSpeech.ADJECTIVE
  >;
  forms: GenericForm[];
};

export type LexemeViewModel = VerbLexeme | NounLexeme | AdjectiveLexeme | GenericLexeme;

export type HeadwordViewModel = {
  id: string;
  orth: string;
  lexemes: LexemeViewModel[];
};
