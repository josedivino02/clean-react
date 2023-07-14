import { SurveyList } from '@/application/pages';
import { makeLogin } from '@/main/factories/pages/login/login-factory';
import { makeSignUp } from '@/main/factories/pages/signup/sign-up-factory';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' Component={makeLogin} />
        <Route path='/signup' Component={makeSignUp} />
        <Route path='/' Component={SurveyList} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
