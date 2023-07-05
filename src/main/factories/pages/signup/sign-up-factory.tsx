import { SignUp } from '@/application/pages';
import { makeRemoteAddAccount } from '@/main/factories/usecases/add-account/remote-add-account-factory';
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory';
import React from 'react';
import { makeSignUpValidation } from './sign-up-validation-factory';

export const makeSignUp: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      saveAccessToken={makeLocalSaveAccessToken()} />
  )
};
