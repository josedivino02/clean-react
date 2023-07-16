import { ApiContext } from '@/application/contexts';
import { type AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/test';
import { render } from '@testing-library/react';
import { createMemoryHistory, type MemoryHistory } from 'history';
import React from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import PrivateRoute from './private-route';

describe('PrivateRoute', () => {
  let history: MemoryHistory;
  let account: AccountModel;

  beforeEach(() => {
    account = mockAccountModel()
    history = createMemoryHistory({ initialEntries: ['/'] });
  });

  it('Should render current component if token is not empty', () => {
    render(<ApiContext.Provider value={{ getCurrentAccount: () => account }}>
      <Router location='' navigator={history}>
        <Routes>
          <Route element={<PrivateRoute />} />
        </Routes>
      </Router>
    </ApiContext.Provider>
    );

    expect(history.location.pathname).toBe('/');
  });
});
