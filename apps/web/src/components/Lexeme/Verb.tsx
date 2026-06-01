import type { VerbLexeme } from '../../view-models/Lexeme.ts';
import type { ReactElement } from 'react';
import styles from './Lexeme.module.scss';
import { KeyValueGrid, type KeyValueItem } from '../KevValueGrid/KeyValueGrid.tsx';
import { getVerbInflectionItems } from '../../utils/getVerbInflections.ts';
import { RtlText } from '@verterbank/ui';

interface VerbProps {
  verb: VerbLexeme;
}
export function Verb({ verb }: VerbProps): ReactElement {
  const inflections: KeyValueItem[] = getVerbInflectionItems(verb.forms, verb.pastAuxiliary).map(
    (item) => ({
      label: <RtlText>{item.label}</RtlText>,
      value: <RtlText>{item.valueOrth}</RtlText>,
    }),
  );
  return (
    <div className={styles.lexemeContainer}>
      <KeyValueGrid items={inflections} />
    </div>
  );
}
