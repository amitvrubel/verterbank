import classNames from 'classnames';
import type { ReactElement, ReactNode } from 'react';
import styles from './Label.module.scss';
type LabelVariant = 'default' | 'muted' | 'success' | 'warning' | 'danger';
interface LabelProps {
  children: ReactNode;
  variant?: LabelVariant;
  className?: string;
  onClick?: () => void;
}

export function Label({
  variant = 'default',
  children,
  className,
  onClick,
}: LabelProps): ReactElement {
  return (
    <span className={classNames(styles.label, styles[variant], className)} onClick={onClick}>
      {children}
    </span>
  );
}
