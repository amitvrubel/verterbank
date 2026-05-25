import type { ApiHeadword } from '../dto/HeadwordDto.ts';
import { apiFetch } from './client.ts';

type SearchResult = {
  id: string;
  orth: string;
};

export function getHeadwordById(id: string): Promise<ApiHeadword> {
  return apiFetch(`headwords/${id}`);
}

export function searchHeadword(query: string): Promise<SearchResult[]> {
  return apiFetch(`headwords/search?q=${encodeURIComponent(query)}`);
}
