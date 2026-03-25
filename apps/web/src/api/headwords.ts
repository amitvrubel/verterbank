import type { Headword } from '../dto/HeadwordDto.ts';
import { apiFetch } from './client.ts';

export function getHeadwordById(id: string): Promise<Headword> {
  return apiFetch(`headwords/${id}`);
}
