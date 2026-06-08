const API_BASE_URL = 'http://localhost:3000';

export async function getLexeme(headwordId: string, lexemeId: string, accessToken: string) {
  const response = await fetch(`${API_BASE_URL}/headwords/${headwordId}/lexemes/${lexemeId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to load draft headwords');
  }

  return response.json();
}
