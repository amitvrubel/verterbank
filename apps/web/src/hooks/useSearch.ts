import { useQuery } from '@tanstack/react-query';
import { searchHeadword } from '../api/headwords.ts';

export function useSearch(query: string) {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => searchHeadword(query),
    enabled: query.length > 0,
  });
}
