import type { ReactElement } from 'react';
import type { DraftHeadword } from '../../api/headwords.ts';
import styles from './HeadwordCard.module.scss';
import { Label } from '../Label/Label.tsx';
interface HeadwordCardProps {
  headword: DraftHeadword;
}
export function HeadwordCard({ headword }: HeadwordCardProps): ReactElement {
  return (
    <div className={styles.card}>
      <div>{headword.orth}</div>
      <div>
        {headword.lexemes.length === 0 ? (
          <Label>No POS</Label>
        ) : (
          headword.lexemes.map((lexeme) => <Label>{lexeme.partOfSpeech}</Label>)
        )}
      </div>
    </div>
  );
}
