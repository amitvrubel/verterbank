import { yi } from '../i18n/messages.ts';

export enum AdjectiveDegreeEnum {
  POSITIVE = 'POSITIVE',
  COMPARATIVE = 'COMPARATIVE',
  SUPERLATIVE = 'SUPERLATIVE',
}

export const adjectiveDegreeLabel: Record<AdjectiveDegreeEnum, string> = {
  [AdjectiveDegreeEnum.POSITIVE]: yi.positive,
  [AdjectiveDegreeEnum.COMPARATIVE]: yi.comparative,
  [AdjectiveDegreeEnum.SUPERLATIVE]: yi.superlative,
};
