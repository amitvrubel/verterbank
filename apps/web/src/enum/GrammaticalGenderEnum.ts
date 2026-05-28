export enum GrammaticalGenderEnum {
  MASC = 'MASC',
  FEM = 'FEM',
  NEUT = 'NEUT',
}

export const grammaticalGenderLabel: Record<GrammaticalGenderEnum, string> = {
  [GrammaticalGenderEnum.MASC]: 'דער',
  [GrammaticalGenderEnum.FEM]: 'די',
  [GrammaticalGenderEnum.NEUT]: 'דאָס',
};
