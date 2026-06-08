import { yi } from '@verterbank/messages';

export enum AdjectiveDegreeEnum {
  POSITIVE = 'POSITIVE',
  COMPARATIVE = 'COMPARATIVE',
  SUPERLATIVE = 'SUPERLATIVE',
}

export const adjectiveDegreeLabel: Record<AdjectiveDegreeEnum, string> = {
  [AdjectiveDegreeEnum.POSITIVE]: yi.grammar.positive,
  [AdjectiveDegreeEnum.COMPARATIVE]: yi.grammar.comparative,
  [AdjectiveDegreeEnum.SUPERLATIVE]: yi.grammar.superlative,
};
