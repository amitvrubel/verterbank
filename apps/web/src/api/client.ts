import { API_BASE_URL } from './config.ts';

export async function apiFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}/${path}`);

  if (!response.ok) {
    throw new Error(`Request ${path} failed with status ${response.status}`);
  }
  return await response.json();
}
