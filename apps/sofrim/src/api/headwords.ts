const API_BASE_URL = 'http://localhost:3000';
export type DraftHeadword = {
  id: string;
  orth: string;
  status: string;
  lexemes: {
    id: string;
    partOfSpeech: string;
  }[];
};

export async function getDraftHeadwords(accessToken: string): Promise<DraftHeadword[]> {
  const response = await fetch(`${API_BASE_URL}/headwords/drafts`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to load draft headwords');
  }

  return response.json();
}
