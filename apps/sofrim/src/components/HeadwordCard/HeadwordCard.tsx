import classNames from 'classnames';
import { type ReactElement, useEffect, useState } from 'react';
import type { DraftHeadword } from '../../api/headwords.ts';
import styles from './HeadwordCard.module.scss';
import { Label } from '../Label/Label.tsx';
import { ChevronDown } from '../ChevronDown/ChevronDown.tsx';
import { yi } from '@verterbank/messages';
import { type DraftLexeme, getLexeme } from '../../api/lexeme.ts';
import { useAuth } from '../../hooks/useAuth.ts';
import { PartOfSpeechLabel } from '../PartOfSpeechLabel/PartOfSpeechLabel.tsx';
import { HeadwordCardContent } from './HeadwordCardContent.tsx';
import { LoadingCircle } from '../LoadingCircle/LoadingCircle.tsx';
import { RtlText } from '@verterbank/ui';
interface HeadwordCardProps {
  headword: DraftHeadword;
}

export function HeadwordCard({ headword }: HeadwordCardProps): ReactElement {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedLexemeId, setSelectedLexemeId] = useState<string | null>(
    headword.lexemes[0]?.id ?? null,
  );
  const [selectedLexemeDetails, setSelectedLexemeDetails] = useState<DraftLexeme | null>(null);
  const [isLexemeLoading, setIsLexemeLoading] = useState(false);
  const [lexemeErrorMessage, setLexemeErrorMessage] = useState('');
  const { accessToken } = useAuth();
  const hasLexemes = headword.lexemes.length > 0;

  useEffect(() => {
    if (!isExpanded || !selectedLexemeId || !accessToken) {
      return;
    }

    let shouldIgnore = false;
    const lexemeId = selectedLexemeId;
    const token = accessToken;

    async function loadSelectedLexeme() {
      try {
        setIsLexemeLoading(true);
        setLexemeErrorMessage('');
        const lexeme = await getLexeme(headword.id, lexemeId, token);

        if (!shouldIgnore) {
          setSelectedLexemeDetails(lexeme);
        }
      } catch {
        if (!shouldIgnore) {
          setSelectedLexemeDetails(null);
          setLexemeErrorMessage(yi.sofrim.lexemeError);
        }
      } finally {
        if (!shouldIgnore) {
          setIsLexemeLoading(false);
        }
      }
    }

    void loadSelectedLexeme();

    return () => {
      shouldIgnore = true;
    };
  }, [accessToken, headword.id, isExpanded, selectedLexemeId]);

  return (
    <article className={styles.card}>
      <div className={styles.summary}>
        <div className={styles.summaryText}>
          <div className={styles.orth} dir="rtl">
            {headword.orth}
          </div>
          <div className={styles.labels}>
            {!hasLexemes ? (
              <Label variant="warning">{yi.sofrim.missingPosLabel}</Label>
            ) : (
              headword.lexemes.map((lexeme) => (
                <PartOfSpeechLabel
                  className={classNames(
                    styles.partOfSpeechLabel,
                    selectedLexemeId === lexeme.id && styles.selectedLabel,
                  )}
                  partOfSpeech={lexeme.partOfSpeech}
                  key={lexeme.id}
                  onClick={() => setSelectedLexemeId(lexeme.id)}
                />
              ))
            )}
          </div>
        </div>
        {hasLexemes && (
          <button
            aria-expanded={isExpanded}
            aria-label={isExpanded ? `Collapse ${headword.orth}` : `Expand ${headword.orth}`}
            className={styles.chevronContainer}
            onClick={() => setIsExpanded((currentValue) => !currentValue)}
            type="button"
          >
            <ChevronDown
              className={classNames(styles.chevronDown, isExpanded && styles.chevronDownOpen)}
            />
          </button>
        )}
      </div>

      {isExpanded && (
        <div className={styles.expandedContent}>
          <section className={styles.detailSection}>
            {hasLexemes && isLexemeLoading && <LoadingCircle />}
            {hasLexemes && lexemeErrorMessage && (
              <RtlText variant="p" className={styles.errorMessage}>
                {lexemeErrorMessage}
              </RtlText>
            )}
            {hasLexemes && !isLexemeLoading && selectedLexemeDetails && (
              <HeadwordCardContent lexeme={selectedLexemeDetails} headword={headword.orth} />
            )}
          </section>
        </div>
      )}
    </article>
  );
}
