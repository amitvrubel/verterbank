import type { ReactElement } from 'react';

type ChevronDownProps = {
  className?: string;
};

export function ChevronDown({ className }: ChevronDownProps): ReactElement {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
