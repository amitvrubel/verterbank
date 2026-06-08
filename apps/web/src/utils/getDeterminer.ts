import { GrammaticalGenderEnum, grammaticalGenderLabel } from '../enum/GrammaticalGenderEnum.ts';
import { CaseEnum } from '../enum/CaseEnum.ts';
import { yi } from '@verterbank/messages';

function getAccusativeDeterminer(grammaticalGender: GrammaticalGenderEnum) {
  if (GrammaticalGenderEnum.MASC === GrammaticalGenderEnum[grammaticalGender]) {
    return yi.articles.dem;
  }
  return grammaticalGenderLabel[grammaticalGender];
}

function getDativeDeterminer(grammaticalGender: GrammaticalGenderEnum) {
  if (
    GrammaticalGenderEnum.MASC === GrammaticalGenderEnum[grammaticalGender] ||
    GrammaticalGenderEnum.NEUT === GrammaticalGenderEnum[grammaticalGender]
  ) {
    return yi.articles.dem;
  }
  if (GrammaticalGenderEnum.FEM === GrammaticalGenderEnum[grammaticalGender]) {
    return yi.articles.der;
  }
  return grammaticalGenderLabel[grammaticalGender];
}

export function getDeterminer(
  grammaticalCase: CaseEnum,
  grammaticalGender?: GrammaticalGenderEnum,
) {
  if (!grammaticalCase || !grammaticalGender) {
    return undefined;
  }
  if (CaseEnum[grammaticalCase] === CaseEnum.NOMINATIVE) {
    return grammaticalGenderLabel[grammaticalGender];
  }
  if (CaseEnum[grammaticalCase] === CaseEnum.DATIVE) {
    return getDativeDeterminer(grammaticalGender);
  }

  if (CaseEnum[grammaticalCase] === CaseEnum.ACCUSATIVE) {
    return getAccusativeDeterminer(grammaticalGender);
  }
}
