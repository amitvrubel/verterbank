const API_BASE_URL = 'http://localhost:3000';

export type DraftPartOfSpeech =
  | 'NOUN'
  | 'VERB'
  | 'ADJECTIVE'
  | 'ADVERB'
  | 'PRONOUN'
  | 'DETERMINER'
  | 'PREPOSITION'
  | 'CONJUNCTION'
  | 'PARTICLE'
  | 'INTERJECTION'
  | 'NUMERAL'
  | 'PROPER_NOUN'
  | 'OTHER';

export type DraftGrammaticalGender = 'MASC' | 'FEM' | 'NEUT';

export type DraftPastAuxiliary = 'HABN' | 'ZAYN' | 'BOTH';

export type DraftTranslation = {
  id: string;
  lang: string;
  note?: string | null;
  order: number;
  text: string;
};

export type DraftExample = {
  id: string;
  order: number;
  textYi: string;
};

export type DraftSense = {
  createdAt?: string;
  createdBy?: string | null;
  definitionYi?: string | null;
  examples?: DraftExample[];
  glossYi?: string | null;
  id: string;
  lexemeId?: string;
  order: number;
  status: string;
  translations?: DraftTranslation[];
  updatedAt?: string;
  updatedBy?: string | null;
};

type BaseDraftForm = {
  createdAt?: string;
  createdBy?: string | null;
  id: string;
  ipa?: string | null;
  lexemeId?: string;
  note?: string | null;
  order: number;
  status: string;
  updatedAt?: string;
  updatedBy?: string | null;
  valueOrth: string;
  valueSearch?: string;
  yivo?: string | null;
};

export type DraftAdjectiveForm = BaseDraftForm & {
  case?: string | null;
  degree?: string | null;
  gender?: string | null;
  number?: string | null;
  person?: number | null;
};

export type DraftVerbForm = BaseDraftForm & {
  mood?: string | null;
  number?: string | null;
  order: number;
  person?: number | null;
  tense?: string | null;
};

export type DraftNounForm = BaseDraftForm & {
  case?: string | null;
  gender?: string | null;
  number?: string | null;
};

export type DraftGenericForm = BaseDraftForm;

export type DraftUsageLabel = {
  labelId: string;
  lexemeId: string;
};

type BaseDraftLexeme = {
  id: string;
  ipa?: string | null;
  notes?: string | null;
  // TODO(backend): include nested sense examples/translations and usage label details if Sofrim views need web view-model parity.
  senses: DraftSense[];
  status: string;
  usageLabels: DraftUsageLabel[];
  yivo?: string | null;
};

export type DraftVerbLexeme = BaseDraftLexeme & {
  forms: DraftVerbForm[];
  partOfSpeech: 'VERB';
  pastAuxiliary?: DraftPastAuxiliary | null;
};

export type DraftNounLexeme = BaseDraftLexeme & {
  forms: DraftNounForm[];
  grammaticalGender?: DraftGrammaticalGender | null;
  partOfSpeech: 'NOUN';
};

export type DraftAdjectiveLexeme = BaseDraftLexeme & {
  forms: DraftAdjectiveForm[];
  partOfSpeech: 'ADJECTIVE';
};

export type DraftGenericLexeme = BaseDraftLexeme & {
  forms: DraftGenericForm[];
  partOfSpeech: Exclude<DraftPartOfSpeech, 'VERB' | 'NOUN' | 'ADJECTIVE'>;
};

export type DraftLexeme =
  | DraftVerbLexeme
  | DraftNounLexeme
  | DraftAdjectiveLexeme
  | DraftGenericLexeme;

export async function getLexeme(
  headwordId: string,
  lexemeId: string,
  accessToken: string,
): Promise<DraftLexeme> {
  const response = await fetch(`${API_BASE_URL}/headwords/${headwordId}/lexemes/${lexemeId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to load draft headwords');
  }

  return response.json();
}
