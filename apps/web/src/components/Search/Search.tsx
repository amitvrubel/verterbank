import { type ReactElement, useState } from 'react';
import styles from './Search.module.scss';
import { useNavigate } from 'react-router-dom';
import _ from 'classnames';
import { useSearch } from '../../hooks/useSearch.ts';
import useDebouncedValue from '../../hooks/useDebouncedValue.ts';
import { useQueryClient } from '@tanstack/react-query';
import { getHeadwordById } from '../../api/headwords.ts';

type SearchProps = {
  variant: 'inline' | 'centered';
};

export function Search({ variant }: SearchProps): ReactElement {
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebouncedValue(query);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: results = [] } = useSearch(debouncedQuery);

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
      {query && (
        <div className={styles.searchResultsContainer}>
          {results.length > 0 ? (
            <div className={styles.searchResults}>
              {results.map((r) => (
                <div
                  key={r.id}
                  className={_(styles.searchResult, styles.clickable)}
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
                  {r.orth}
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
