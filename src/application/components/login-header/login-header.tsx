import React from 'react';
import Styles from './login-header-styles.scss';
import Logo from '@/application/components/logo/logo';

const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.header}>
      <Logo />
      <h1>4Dev - Enquetes para programadores</h1>
    </header>
  )
}

export default React.memo(LoginHeader)
