import type { ReactElement } from 'react';
import styles from './Loading.module.scss';
export function Loading(): ReactElement {
  return (
    <div className={styles.loader}>
      <span />
      <span />
      <span />
    </div>
  );
}
