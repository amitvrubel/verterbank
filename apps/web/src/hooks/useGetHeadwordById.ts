import type { Headword } from '../dto/HeadwordDto.ts';
import { getHeadwordById } from '../api/headwords.ts';
import { useQuery } from '@tanstack/react-query';

export function useGetHeadwordById(id?: string) {
  return useQuery<Headword>({
    queryKey: ['headword', id],
    queryFn: () => {
      if (!id) {
        throw new Error('Missing headword id');
      }
      return getHeadwordById(id);
    },
    enabled: !!id,
    staleTime: 1000 * 60,
  });
}
