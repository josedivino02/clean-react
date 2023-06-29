import { Login } from '@/application/pages';
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory';
import React from 'react';
import { makeValidation } from './login-validation-factory';

export const makeLogin: React.FC = () => {
  return (
    <Login authentication={makeRemoteAuthentication()} validation={makeValidation()} />
  )
};
