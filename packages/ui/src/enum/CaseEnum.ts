export enum CaseEnum {
  NOMINATIVE = 'NOMINATIVE',
  ACCUSATIVE = 'ACCUSATIVE',
  DATIVE = 'DATIVE',
}

export const caseLabel: Record<CaseEnum, string> = {
  [CaseEnum.NOMINATIVE]: 'נאָמינאַטיוו',
  [CaseEnum.ACCUSATIVE]: 'אַקוזאַטיוו',
  [CaseEnum.DATIVE]: 'דאַטיוו',
};

export function isCase(value: string): value is CaseEnum {
  return Object.values(CaseEnum).includes(value as CaseEnum);
}
