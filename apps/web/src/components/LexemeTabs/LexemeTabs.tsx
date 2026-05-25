import { type ReactElement } from 'react';
import _ from 'classnames';
import styles from './LexemeTabs.module.scss';
import { partOfSpeechLabel } from '../../enum/PartOfSpeech.ts';
import type { LexemeViewModel } from '../../view-models/Lexeme.ts';
type LexemeTabProps = {
  activeIndex: number;
  lexemes: LexemeViewModel[];
  onChange: (index: number) => void;
};

export function LexemeTabs({ activeIndex, lexemes, onChange }: LexemeTabProps): ReactElement {
  return (
    <div className={styles.lexemeTabs}>
      {lexemes.map((lexeme, index) => (
        <button
          key={lexeme.id}
          onClick={() => {
            onChange(index);
          }}
          className={_(styles.tabBtn, { [styles.active]: index === activeIndex })}
          dir="rtl"
        >
          {partOfSpeechLabel[lexeme.partOfSpeech]}
        </button>
      ))}
    </div>
  );
}
