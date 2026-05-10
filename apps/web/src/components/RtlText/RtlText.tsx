import type { PropsWithChildren, ReactElement } from 'react';

interface RtlText extends PropsWithChildren {
  className?: string;
  variant?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'strong';
}
export function RtlText({
  children,
  className,
  variant: Component = 'span',
}: PropsWithChildren<RtlText>): ReactElement {
  return (
    <Component dir="rtl" className={className}>
      {children}
    </Component>
  );
}
