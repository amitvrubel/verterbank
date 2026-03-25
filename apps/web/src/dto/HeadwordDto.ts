import type { PartOfSpeechEnum } from '../enum/PartOfSpeech.ts';

export type Translation = {
  id: string;
  lang: string;
  text: string;
};

export type Example = {
  id: string;
  textYi: string;
};

export type Sense = {
  id: string;
  definitionYi?: string;
  translations: Translation[];
  examples: Example[];
};

export type Form = {
  id: string;
  valueOrth: string;
};

export type Plural = Form & { number: 'PL' };

export type Lexeme = {
  id: string;
  partOfSpeech: keyof typeof PartOfSpeechEnum;
  senses: Sense[];
  forms: Form[];
};

export type Headword = {
  id: string;
  orth: string;
  lexemes: Lexeme[];
};
