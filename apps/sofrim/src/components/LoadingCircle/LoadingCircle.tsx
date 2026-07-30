import type { ReactElement } from 'react';
import styles from './LoadingCircle.module.scss';

export function LoadingCircle(): ReactElement {
  return <span aria-label="Loading" className={styles.loadingCircle} role="status" />;
}
