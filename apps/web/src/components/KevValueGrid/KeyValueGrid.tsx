import type { ReactElement, ReactNode } from 'react';
import styles from './KeyValueGrid.module.scss';
export type KeyValueItem = {
  label: ReactNode;
  value: ReactNode;
};

type KeyValueGridProps = {
  items: KeyValueItem[];
};

export function KeyValueGrid({ items }: KeyValueGridProps): ReactElement {
  return (
    <dl className={styles.keyValueGrid}>
      {items.map((item, index) => (
        <div className={styles.keyValueGridRow} key={index}>
          <dt className={styles.label}>{item.label}</dt>
          <dd className={styles.value}>{item.value} </dd>
        </div>
      ))}
    </dl>
  );
}
