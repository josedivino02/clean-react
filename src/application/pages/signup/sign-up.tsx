import { Footer, FormStatus, Input, LoginHeader, SubmitButton } from '@/application/components';
import { ApiContext, FormContext } from '@/application/contexts';
import { type Validation } from '@/application/contracts/validation';
import { type AddAccount } from '@/domain/usecases';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Styles from './sign-up-styles.scss';

type Props = {
  validation: Validation,
  addAccount: AddAccount,
}

const SignUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const navigate = useNavigate();

  const { setCurrentAccount } = useContext(ApiContext)

  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    passwordConfirmation: '',
    passwordConfirmationError: '',
    mainError: ''
  })

  // useEffect(() => { validate('name') }, [state.name])
  // useEffect(() => { validate('email') }, [state.email])
  // useEffect(() => { validate('password') }, [state.password])
  // useEffect(() => { validate('passwordConfirmation') }, [state.passwordConfirmation])

  // const validate = (field: string): void => {
  //   const { email, password } = state
  //   const formData = { email, password }
  //   setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
  //   setState(old => ({ ...old, isFormInvalid: !!old.nameError || !!old.emailError || !!old.passwordError || old.passwordConfirmationError }))
  // }

  useEffect(() => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }
    const nameError = validation.validate('name', formData)
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
    const passwordConfirmationError = validation.validate('passwordConfirmation', formData)

    setState(old => ({
      ...old,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid: !!emailError || !!nameError || !!passwordError || !!passwordConfirmationError
    }))
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (state.isLoading || state.isFormInvalid) return
      setState(old => ({ ...old, isLoading: true }))

      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
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
    <div className={Styles.signupWrap}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form data-testid='form' className={Styles.form} onSubmit={handleSubmit} >
          <h2>CRIAR CONTA</h2>
          <Input type='text' name='name' placeholder='Digite seu nome' />
          <Input type='email' name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <Input type='password' name='passwordConfirmation' placeholder='Confirme sua senha' />
          <SubmitButton text='Cadastrar' />
          <Link data-testid="login" to='/login' className={Styles.link}>Voltar para Login</Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
