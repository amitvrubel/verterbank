import type { ApiForm, ApiHeadword, ApiLexeme } from '../dto/HeadwordDto.ts';
import type { BaseLexeme, HeadwordViewModel, LexemeViewModel } from '../view-models/Lexeme.ts';
import { PartOfSpeech } from '../enum/PartOfSpeech.ts';
import type { AdjectiveForm, GenericForm, NounForm, VerbForm } from '../view-models/Form.ts';
import { sortNounForms } from '../utils/sortCase.ts';
import { sortVerbForms } from '../utils/getVerbInflections.ts';

function toGenericForm(form: ApiForm): GenericForm {
  return {
    id: form.id,
    valueOrth: form.valueOrth,
    status: form.status,
  };
}

function toVerbForm(form: ApiForm): VerbForm {
  return {
    ...toGenericForm(form),
    tense: form.tense,
    person: form.person,
    number: form.number,
    mood: form.mood,
  };
}

function toNounForm(form: ApiForm): NounForm {
  return {
    ...toGenericForm(form),
    number: form.number,
    gender: form.gender,
    case: form.case,
  };
}

function toAdjectiveForm(form: ApiForm): AdjectiveForm {
  return {
    ...toGenericForm(form),
    number: form.number,
    gender: form.gender,
    case: form.case,
    degree: form.degree,
    person: form.person,
  };
}
function toLexemeViewModel(apiLexeme: ApiLexeme): LexemeViewModel {
  const base: BaseLexeme = {
    id: apiLexeme.id,
    yivo: apiLexeme.yivo,
    ipa: apiLexeme.ipa,
    notes: apiLexeme.notes,
    status: apiLexeme.status,
    senses: apiLexeme.senses,
  };

  switch (apiLexeme.partOfSpeech) {
    case PartOfSpeech.VERB:
      return {
        ...base,
        partOfSpeech: apiLexeme.partOfSpeech,
        pastAuxiliary: apiLexeme.pastAuxiliary,
        forms: apiLexeme.forms.map(toVerbForm).sort(sortVerbForms),
      };
    case PartOfSpeech.NOUN:
      return {
        ...base,
        partOfSpeech: apiLexeme.partOfSpeech,
        grammaticalGender: apiLexeme.grammaticalGender,
        forms: sortNounForms(apiLexeme.forms.map(toNounForm)),
      };
    case PartOfSpeech.ADJECTIVE:
      return {
        ...base,
        partOfSpeech: apiLexeme.partOfSpeech,
        forms: apiLexeme.forms.map(toAdjectiveForm),
      };
    default:
      return {
        ...base,
        partOfSpeech: apiLexeme.partOfSpeech,
        forms: apiLexeme.forms.map(toGenericForm),
      };
  }
}

export function toHeadwordViewModel(apiHeadword: ApiHeadword): HeadwordViewModel {
  return {
    id: apiHeadword.id,
    orth: apiHeadword.orth,
    lexemes: apiHeadword.lexemes.map(toLexemeViewModel),
  };
}
