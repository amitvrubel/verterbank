import { type ReactElement, useEffect, useState } from 'react';
import type { DraftHeadword } from '../../api/headwords.ts';
import styles from './HeadwordCard.module.scss';
import { Label } from '../Label/Label.tsx';
import { ChevronDown } from '../ChevronDown/ChevronDown.tsx';
import { partOfSpeechLabel } from '@verterbank/ui';
import { yi } from '@verterbank/messages';
import { getLexeme } from '../../api/lexeme.ts';
import { useAuth } from '../../hooks/useAuth.ts';
interface HeadwordCardProps {
  headword: DraftHeadword;
  onClick?: () => void;
}
export function HeadwordCard({ headword, onClick }: HeadwordCardProps): ReactElement {
  const [selectedLexeme, setSelectedLexeme] = useState<string | null>(null);
  const { accessToken } = useAuth();
  const hasLexemes = headword.lexemes.length > 0;

  useEffect(() => {
    if (hasLexemes) {
      setSelectedLexeme(headword.lexemes[0].id);
    }
  });
  return (
    <div className={styles.card}>
      <div>{headword.orth}</div>
      <div>
        {!hasLexemes ? (
          <Label variant="warning">{yi.sofrim.missingPosLabel}</Label>
        ) : (
          headword.lexemes.map((lexeme) => (
            <Label onClick={() => setSelectedLexeme(lexeme.id)}>
              {partOfSpeechLabel[lexeme.partOfSpeech]}
            </Label>
          ))
        )}
      </div>
      {onClick && (
        <div
          className={styles.chevronContainer}
          onClick={async () => {
            const lexeme = await getLexeme(headword.id, selectedLexeme, accessToken);
            console.log({ lexeme });
          }}
        >
          <ChevronDown className={styles.chevronDown} />
        </div>
      )}
    </div>
  );
}
