import { getHeadwordById } from '../api/headwords.ts';
import { useQuery } from '@tanstack/react-query';
import { toHeadwordViewModel } from '../mappers/headword.mapper.ts';
import type { HeadwordViewModel } from '../view-models/Lexeme.ts';

export function useGetHeadwordById(id?: string) {
  return useQuery<HeadwordViewModel>({
    queryKey: ['headword', id],
    queryFn: async () => {
      if (!id) {
        throw new Error('Missing headword id');
      }
      const data = await getHeadwordById(id);
      return toHeadwordViewModel(data);
    },
    enabled: !!id,
    staleTime: 1000 * 60,
  });
}
