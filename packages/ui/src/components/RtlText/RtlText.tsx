import type { PropsWithChildren, ReactElement } from 'react';
import _ from 'classnames';
import styles from './RtlText.module.scss';
interface RtlTextProps extends PropsWithChildren {
  className?: string;
  variant?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'strong' | 'i';
}
export function RtlText({
  children,
  className,
  variant: Component = 'span',
}: RtlTextProps): ReactElement {
  return (
    <Component dir="rtl" className={_(styles.rtlText, className)}>
      {children}
    </Component>
  );
}
