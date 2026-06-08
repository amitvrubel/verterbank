import type { ReactElement } from 'react';
import type { LexemeViewModel } from '../../view-models/Lexeme.ts';
import { DefaultLexeme } from './DefaultLexeme.tsx';
import { Verb } from './Verb.tsx';
import { Noun } from './Noun.tsx';
import styles from './Lexeme.module.scss';
import { Senses } from '../Sense/Senses.tsx';
import { Adjective } from './Adjective.tsx';
import { PartOfSpeech } from '@verterbank/ui';

type LexemeProps = {
  lexeme: LexemeViewModel;
  headwordOrth: string;
};

export function Lexeme({ lexeme, headwordOrth }: LexemeProps): ReactElement {
  let specificContent: ReactElement;

  switch (lexeme.partOfSpeech) {
    case PartOfSpeech.VERB:
      specificContent = <Verb verb={lexeme} />;
      break;
    case PartOfSpeech.NOUN:
      specificContent = <Noun noun={lexeme} headwordOrth={headwordOrth} />;
      break;
    case PartOfSpeech.ADJECTIVE:
      specificContent = <Adjective headwordOrth={headwordOrth} adjective={lexeme} />;
      break;
    default:
      specificContent = <DefaultLexeme generic={lexeme} />;
      break;
  }

  return (
    <div className={styles.lexemeContainer}>
      {specificContent}
      <Senses senses={lexeme.senses} />
    </div>
  );
}
