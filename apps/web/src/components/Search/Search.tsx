import { type ReactElement, useEffect, useState } from 'react';
import styles from './Search.module.scss';
import { API_BASE_URL } from '../../api/config.ts';
import { useNavigate } from 'react-router-dom';
import _ from 'classnames';
type SearchResult = {
  id: string;
  orth: string;
};

type SearchProps = {
  variant: 'inline' | 'centered';
};

export function Search({ variant }: SearchProps): ReactElement {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/headwords/search?q=${encodeURIComponent(query)}`,
        );
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [query]);
  return (
    <div
      className={_(styles.searchContainer, {
        [styles.inline]: variant === 'inline',
        [styles.centered]: variant === 'centered',
      })}
    >
      <input
        className={_(styles.input, {
          [styles.inlineInput]: variant === 'inline',
          [styles.centeredInput]: variant === 'centered',
        })}
        name="search"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="זוך אַ וואָרט"
        dir="rtl"
      />
      {results.length > 0 && (
        <ul className={styles.searchResults}>
          {results.map((r) => (
            <li
              key={r.id}
              className={_(styles.searchResult, styles.clickable)}
              onClick={() => {
                navigate(`/headwords/${r.id}`);
                setResults([]);
                setQuery(r.orth);
              }}
            >
              {r.orth}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
