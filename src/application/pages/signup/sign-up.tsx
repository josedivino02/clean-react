import { Footer, FormStatus, Input, LoginHeader } from '@/application/components';
import Context from '@/application/contexts/form/form-context';
import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './sign-up-styles.scss';

const SignUp: React.FC = () => {
  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state: {} }}>
        <form className={Styles.form} >
          <h2>Login</h2>
          <Input type='text' name='name' placeholder='Digite seu nome' />
          <Input type='email' name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <Input type='password' name='passwordConfirmation' placeholder='Confirme sua senha' />
          <button className={Styles.submit} type='submit'>Entrar</button>
          <Link to='/login' className={Styles.link}>Voltar para Login</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
