import { Footer, FormStatus, Input, LoginHeader, SubmitButton } from '@/application/components';
import { ApiContext, FormContext } from '@/application/contexts';
import { type Validation } from '@/application/contracts/validation';
import { type Authentication } from '@/domain/usecases';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Styles from './login-styles.scss';

type Props = {
  validation: Validation,
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const navigate = useNavigate();

  const { setCurrentAccount } = useContext(ApiContext)

  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => {
    const { email, password } = state
    const formData = { email, password }
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)

    setState(old => ({
      ...old,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError
    }))
  }, [state.email, state.password])

  // useEffect(() => { validate('email') }, [state.email])
  // useEffect(() => { validate('password') }, [state.password])

  // const validate = (field: string): void => {
  //   const { email, password } = state
  //   const formData = { email, password }
  //   setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
  //   setState(old => ({ ...old, isFormInvalid: !!old.emailError || !!old.passwordError }))
  // }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) return
      setState(old => ({ ...old, isLoading: true }))
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })

      setCurrentAccount(account)

      navigate('/')
    } catch (error) {
      setState(old => ({
        ...old,
        isLoading: false,
        mainError: error.message
      }))
    }
  }

  return (
    <div className={Styles.loginWrap}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form data-testid='form' className={Styles.form} onSubmit={handleSubmit}>
          <h2>LOGIN</h2>
          <Input type='email' name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <SubmitButton text='Entrar' />
          <Link data-testid="signup" to='/signup' className={Styles.link}>Criar conta</Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
