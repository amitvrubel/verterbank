import type { GrammaticalGenderEnum } from '../enum/GrammaticalGenderEnum.ts';
import type { PastAuxiliary } from '../view-models/Lexeme.ts';
import { PartOfSpeech } from '@verterbank/ui';

export type ApiTranslation = {
  id: string;
  lang: string;
  note?: string;
  order: number;
  text: string;
};

export type ApiExample = {
  id: string;
  order: number;
  textYi: string;
};

export type ApiSense = {
  definitionYi?: string;
  examples: ApiExample[];
  glossYi?: string;
  id: string;
  order: number;
  translations: ApiTranslation[];
};

export type ApiForm = {
  id: string;
  valueOrth: string;
  valueSearch: string;
  number?: string;
  person?: number;
  tense?: string;
  mood?: string;
  degree?: string;
  gender?: string;
  order: number;
  status: string;
  case?: string;
};

export type ApiLexeme = {
  id: string;
  partOfSpeech: PartOfSpeech;
  grammaticalGender?: GrammaticalGenderEnum;
  pastAuxiliary?: PastAuxiliary;
  yivo?: string;
  ipa?: string;
  notes?: string;
  status: string;
  senses: ApiSense[];
  forms: ApiForm[];
};

export type ApiHeadword = {
  id: string;
  orth: string;
  lexemes: ApiLexeme[];
};
