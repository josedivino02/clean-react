import { Router } from '@/application/components';
import '@/application/styles/global.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { makeLogin } from './factories/pages/login/login-factory';
import { makeSignUp } from './factories/pages/signup/sign-up-factory';

ReactDOM.render(
  <Router
    makeLogin={makeLogin}
    makeSignUp={makeSignUp}
  />,
  document.getElementById('main')
)
