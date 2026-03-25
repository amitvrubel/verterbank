import { type ReactElement, useState, type KeyboardEvent } from 'react';
import styles from './Search.module.scss';
import { useNavigate } from 'react-router-dom';
import _ from 'classnames';
import { useSearch } from '../../hooks/useSearch.ts';
import useDebouncedValue from '../../hooks/useDebouncedValue.ts';
import { useQueryClient } from '@tanstack/react-query';
import { getHeadwordById } from '../../api/headwords.ts';
import { highlight } from '../../utils/highlight.tsx';

type SearchProps = {
  variant: 'inline' | 'centered';
};

export function Search({ variant }: SearchProps): ReactElement {
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebouncedValue(query);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: results = [] } = useSearch(debouncedQuery);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!results?.length) {
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? (prev - 1) % results.length : prev - 1));
    }

    if (e.key === 'Enter' && activeIndex >= 0) {
      const selected = results[activeIndex];
      navigate(`/headwords/${selected.id}`);
      setQuery('');
    }
  }

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
        onKeyDown={handleKeyDown}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="זוך אַ וואָרט"
        dir="rtl"
      />
      {query && (
        <div className={styles.searchResultsContainer}>
          {results.length > 0 ? (
            <div className={styles.searchResults}>
              {results.map((r, i) => (
                <div
                  key={r.id}
                  className={_(styles.searchResult, styles.clickable, {
                    [styles.active]: i === activeIndex,
                  })}
                  onMouseEnter={() => {
                    void queryClient.prefetchQuery({
                      queryKey: ['headword', r.id],
                      queryFn: () => getHeadwordById(r.id),
                    });
                  }}
                  onClick={() => {
                    navigate(`/headwords/${r.id}`);
                    setQuery('');
                  }}
                >
                  {highlight(r.orth, query)}
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptySearchResults}>קיין רעזולטאַטען נישט געפֿונען</div>
          )}
        </div>
      )}
    </div>
  );
}
