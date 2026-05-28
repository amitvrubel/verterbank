type BaseForm = {
  id: string;
  valueOrth: string;
  status: string;
};

export type AdjectiveForm = BaseForm & {
  degree?: string;
  person?: number;
  number?: string;
  case?: string;
  gender?: string;
};

export type VerbForm = BaseForm & {
  tense?: string;
  person?: number;
  number?: string;
  mood?: string;
  order?: number;
};

export type NounForm = BaseForm & {
  number?: string;
  gender?: string;
  case?: string;
};

export type GenericForm = BaseForm;

export type FormViewModel = BaseForm | AdjectiveForm | VerbForm;
