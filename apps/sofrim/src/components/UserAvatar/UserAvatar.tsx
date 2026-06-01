import type { ReactElement } from 'react';
import styles from './UserAvatar.module.scss';

type UserAvatarProps = {
  label: string;
  onClick?: () => void;
};

export function UserAvatar({ label, onClick }: UserAvatarProps): ReactElement {
  return (
    <button
      type="button"
      className={styles.userAvatar}
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" />
      </svg>
    </button>
  );
}
