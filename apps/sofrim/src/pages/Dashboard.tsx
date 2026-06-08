import { type ReactElement, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth.ts';
import { type DraftHeadword, getDraftHeadwords } from '../api/headwords.ts';
import { HeadwordCard } from '../components/HeadwordCard/HeadwordCard.tsx';
import styles from './Dashboard.module.scss';
import { yi } from '@verterbank/messages';
export function Dashboard(): ReactElement {
  const { accessToken, user } = useAuth();
  const [draftHeadwords, setDraftHeadwords] = useState<DraftHeadword[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    (async function () {
      if (!accessToken) {
        return;
      }
      try {
        setErrorMessage('');
        setIsLoading(true);
        const data = await getDraftHeadwords(accessToken);
        setDraftHeadwords(data);
      } catch {
        setErrorMessage('Failed to load draft headwords');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [accessToken]);

  if (isLoading) {
    return <div>Loading drafts...</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <div>
        <h1 dir="rtl">
          {yi.sofrim.greeting}, {user.displayName ?? user.email}
        </h1>
      </div>
      <h1>{yi.sofrim.drafts}</h1>

      {draftHeadwords.length === 0 ? (
        <p>{yi.sofrim.noNewDraftsFound}</p>
      ) : (
        <div>
          {draftHeadwords.map((headword) => {
            let onClick;
            if (headword.lexemes.length > 0) {
              onClick = () => {};
            }
            return <HeadwordCard headword={headword} key={headword.id} onClick={onClick} />;
          })}
        </div>
      )}
    </div>
  );
}
