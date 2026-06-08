const API_BASE_URL = 'http://localhost:3000';

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  user: {
    id: string;
    email: string;
    displayName?: string | null;
    role: string;
    status: string;
  };
};

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
}
