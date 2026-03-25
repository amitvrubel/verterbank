import type { ReactElement } from 'react';
import { Search } from '../Search/Search.tsx';
import styles from './Home.module.scss';
import { Logo } from '../Logo/Logo.tsx';

export function Home(): ReactElement {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeInner}>
        <Logo />
        <Search variant="centered" />
      </div>
    </div>
  );
}
