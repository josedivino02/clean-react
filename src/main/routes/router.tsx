import { PrivateRoute } from '@/application/components';
import { ApiContext } from '@/application/contexts';
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters/current-account-adapter';
import { makeLogin } from '@/main/factories/pages/login/login-factory';
import { makeSignUp } from '@/main/factories/pages/signup/sign-up-factory';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { makeSurveyList } from '../factories/pages/survey-list/survey-list-factory';
import { makeSurveyResult } from '../factories/pages/survey-result/survey-result-factory';

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter
      }}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' Component={makeLogin} />
          <Route path='/signup' Component={makeSignUp} />
          <Route
            path='/'
            element={
              <PrivateRoute path='/'>
                <Route index Component={makeSurveyList} />
              </PrivateRoute>
            }
          />
          <Route
            path='/surveys/:id'
            element={
              <PrivateRoute path='/surveys/:id'>
                <Route index Component={makeSurveyResult} />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
