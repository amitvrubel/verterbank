const API_BASE_URL = 'http://localhost:3000';

export type DraftDetailValue =
  | string
  | number
  | boolean
  | null
  | DraftDetailValue[]
  | { [key: string]: DraftDetailValue };

export type DraftLexemeSummary = {
  [key: string]: DraftDetailValue;
  id: string;
  partOfSpeech: string;
};

export type DraftHeadword = {
  [key: string]: DraftDetailValue;
  id: string;
  orth: string;
  status: string;
  lexemes: DraftLexemeSummary[];
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
