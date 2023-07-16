import { ApiContext } from '@/application/contexts';
import { SurveyList } from '@/application/pages';
import { setCurrentAccountAdapter } from '@/main/adapters/current-account-adapter';
import { makeLogin } from '@/main/factories/pages/login/login-factory';
import { makeSignUp } from '@/main/factories/pages/signup/sign-up-factory';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter
      }}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' Component={makeLogin} />
          <Route path='/signup' Component={makeSignUp} />
          <Route path='/' Component={SurveyList} />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
