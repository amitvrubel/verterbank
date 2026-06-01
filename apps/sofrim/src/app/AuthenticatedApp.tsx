import { type ReactElement } from 'react';
import { useAuth } from '../hooks/useAuth.ts';
import { Outlet } from 'react-router-dom';
import styles from './App.module.scss';
import { yi } from '@verterbank/messages';
import { UserAvatar } from '../components/UserAvatar/UserAvatar.tsx';
export function AuthenticatedApp(): ReactElement {
  const { user, logout } = useAuth();

  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <span>
          <h1>{yi.sofrim.title}</h1>
        </span>
        <span>
          <UserAvatar label={user?.displayName ?? user?.email ?? 'User'} onClick={logout} />
        </span>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
