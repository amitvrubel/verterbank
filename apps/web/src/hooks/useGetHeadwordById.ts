import { useEffect, useState } from 'react';
import type { Headword } from '../dto/HeadwordDto.ts';
import { getHeadwordById } from '../api/headwords.ts';

type ReturnType = {
  headword?: Headword;
  loading: boolean;
  error: string | null;
};
export function useGetHeadwordById(id?: string): ReturnType {
  const [headword, setHeadword] = useState<Headword>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHeadword() {
      if (!id) {
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const result = await getHeadwordById(id);
        setHeadword(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown Error');
      } finally {
        setLoading(false);
      }
    }
    void fetchHeadword();
  }, [id]);

  return {
    loading,
    error,
    headword,
  };
}
