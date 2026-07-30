import type { ReactElement } from 'react';
import type { DraftLexeme } from '../../api/lexeme.ts';
import { NounDraft } from './PartOfSpeechContent/NounDraft.tsx';

interface HeadwordCardContentProps {
  lexeme: DraftLexeme;
  headword: string;
}
export function HeadwordCardContent({ lexeme, headword }: HeadwordCardContentProps): ReactElement {
  switch (lexeme.partOfSpeech) {
    case 'NOUN': {
      return <NounDraft noun={lexeme} headword={headword} />;
    }
  }
  return <section>{lexeme.partOfSpeech}</section>;
}
