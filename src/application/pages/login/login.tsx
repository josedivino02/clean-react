import React from 'react';
import Styles from './login-styles.scss';
import Spinner from '@/application/components/spinner/spinner';
import Header from '@/application/components/login-header/login-header';
import Footer from '@/application/components/footer/footer';
import Input from '@/application/components/input/input';

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <Header />
      <form className={Styles.form} >
        <h2>Login</h2>
        <Input type="email" name='email' placeholder='Digite seu e-mail' />
        <Input type="password" name='password' placeholder='Digite sua senha' />
        <button className={Styles.submit} type='submit'>Entrar</button>
        <span className={Styles.link}>Criar conta</span>

        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>Erro</span>
        </div>
      </form>
      <Footer />
    </div>
  )
}

export default Login