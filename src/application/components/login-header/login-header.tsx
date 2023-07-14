import Logo from '@/application/components/logo/logo';
import React from 'react';
import Styles from './login-header-styles.scss';

const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.headerWrap}>
      <Logo />
      <h1>4Dev - Enquetes para programadores</h1>
    </header>
  )
}

export default React.memo(LoginHeader)
