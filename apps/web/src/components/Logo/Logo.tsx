import type { ReactElement } from 'react';
import logo from '../../assets/logo.svg';
import logoSmall from '../../../../sofrim/src/assets/logo-small.svg';
import { useNavigate } from 'react-router-dom';
import _ from 'classnames';
import styles from './Logo.module.scss';
type LogoProps = {
  small?: boolean;
};
export function Logo({ small }: LogoProps): ReactElement {
  const navigate = useNavigate();
  if (small) {
    return (
      <img
        src={logoSmall}
        alt="Verterbank Logo"
        height={30}
        width={30}
        className={styles.clickable}
        onClick={() => {
          navigate('/');
        }}
      />
    );
  }
  return <img src={logo} alt="Verterbank Logo" />;
}
