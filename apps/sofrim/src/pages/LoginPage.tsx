import { type ReactElement, type SubmitEventHandler, useState } from 'react';
import { login as loginRequest } from '../api/auth.ts';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.ts';
import styles from './LoginPage.module.scss';
import { yi } from '@verterbank/messages';
import { RtlText } from '@verterbank/ui';
export function LoginPage(): ReactElement {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await loginRequest({ email, password });
      login(response.accessToken, response.user);
      navigate('/', { replace: true });
    } catch (error) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.loginHeaderContainer}>
          <RtlText variant="h1" className={styles.loginHeader}>
            {yi.verterbank}
          </RtlText>
          <RtlText variant="h3">{yi.sofrim.title}</RtlText>
        </div>
        <div className={styles.loginFormWrapper}>
          <form onSubmit={handleSubmit}>
            <div>
              <label dir="rtl" htmlFor="email">
                {yi.sofrim.email}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
              />
            </div>

            <div>
              <label dir="rtl" htmlFor="password">
                {yi.sofrim.password}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
              />
            </div>
            <button type="submit" disabled={loading}>
              {yi.sofrim.login}
            </button>
          </form>
        </div>
        {error && (
          <RtlText variant="div" className={styles.loginError}>
            {yi.sofrim.loginError}
          </RtlText>
        )}
      </div>
    </div>
  );
}
