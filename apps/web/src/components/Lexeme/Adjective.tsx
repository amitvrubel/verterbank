import type { ReactElement } from 'react';
import styles from './Lexeme.module.scss';
import type { AdjectiveLexeme } from '../../view-models/Lexeme.ts';
import { KeyValueGrid, type KeyValueItem } from '../KevValueGrid/KeyValueGrid.tsx';
import { RtlText } from '../RtlText/RtlText.tsx';
import { getAdjectiveDegreeItems } from '../../utils/getAdjectiveDegrees.ts';
import { adjectiveDegreeLabel } from '../../enum/AdjectiveDegreeEnum.ts';
import { getAdjectiveInflections } from '../../utils/getAdjectiveInflections.ts';
import { InflectionGrid } from '../InflectionGrid/InflectionGrid.tsx';

interface AdjectiveProps {
  headwordOrth: string;
  adjective: AdjectiveLexeme;
}

export function Adjective({ headwordOrth, adjective }: AdjectiveProps): ReactElement {
  const degreeItems: KeyValueItem[] = getAdjectiveDegreeItems(adjective.forms, headwordOrth).map(
    ({ degree, valueOrth }) => ({
      label: <RtlText>{adjectiveDegreeLabel[degree]}</RtlText>,
      value: <RtlText>{valueOrth}</RtlText>,
    }),
  );
  const adjectiveInflections = getAdjectiveInflections(adjective.forms);

  return (
    <div className={styles.lexemeContainer}>
      <KeyValueGrid items={degreeItems} />
      <InflectionGrid inflections={adjectiveInflections} />
    </div>
  );
}
