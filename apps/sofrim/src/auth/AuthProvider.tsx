import { createContext, type PropsWithChildren, type ReactElement, useMemo, useState } from 'react';

type AuthenticatedUser = {
  id: string;
  email: string;
  displayName?: string;
  role: string;
  status: string;
};

type AuthenticationContext = {
  accessToken: string | null;
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
  login: (accessToken: string, user: AuthenticatedUser) => void;
  logout: () => void;
};

const ACCESS_TOKEN_KEY = 'accessToken';
const AUTH_USER_KEY = 'authUser';

export const AuthContext = createContext<AuthenticationContext | null>(null);

function getStoredUser(): AuthenticatedUser | null {
  const rawUser = localStorage.getItem(AUTH_USER_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as AuthenticatedUser;
  } catch {
    localStorage.removeItem(AUTH_USER_KEY);
    return null;
  }
}

export function AuthProvider({ children }: PropsWithChildren): ReactElement {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem(ACCESS_TOKEN_KEY),
  );
  const [user, setUser] = useState<AuthenticatedUser | null>(getStoredUser);

  const value = useMemo<AuthenticationContext>(
    () => ({
      accessToken,
      user,
      isAuthenticated: Boolean(accessToken),
      login: (nextAccessToken, nextUser) => {
        localStorage.setItem(ACCESS_TOKEN_KEY, nextAccessToken);
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(nextUser));
        setAccessToken(nextAccessToken);
        setUser(nextUser);
      },
      logout: () => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
        setAccessToken(null);
        setUser(null);
      },
    }),
    [accessToken, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
