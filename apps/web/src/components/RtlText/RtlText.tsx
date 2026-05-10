import type { PropsWithChildren, ReactElement } from 'react';

interface RtlTextProps extends PropsWithChildren {
  className?: string;
  variant?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'strong';
}
export function RtlText({
  children,
  className,
  variant: Component = 'span',
}: RtlTextProps): ReactElement {
  return (
    <Component dir="rtl" className={className}>
      {children}
    </Component>
  );
}
