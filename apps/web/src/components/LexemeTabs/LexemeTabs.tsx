import type { Lexeme } from '../../dto/HeadwordDto.ts';
import type { ReactElement } from 'react';
import _ from 'classnames';
import styles from './LexemeTabs.module.scss';
import { PartOfSpeechEnum } from '../../enum/PartOfSpeech.ts';
type LexemeTabProps = {
  activeIndex: number;
  lexemes: Lexeme[];
  onChange: (index: number) => void;
};

export function LexemeTabs({ activeIndex, lexemes, onChange }: LexemeTabProps): ReactElement {
  return (
    <div className={styles.lexemeTabs}>
      {lexemes.map((lexeme, index) => (
        <button
          key={lexeme.id}
          onClick={() => onChange(index)}
          className={_(styles.tabBtn, { [styles.tabBtn]: index === activeIndex })}
        >
          {PartOfSpeechEnum[lexeme.partOfSpeech]}
        </button>
      ))}
    </div>
  );
}
