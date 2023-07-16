import { render } from '@testing-library/react'
import { createMemoryHistory, type MemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'
import PrivateRoute from './private-route'

describe('PrivateRoute', () => {
  let history: MemoryHistory

  beforeEach(() => {
    history = createMemoryHistory({ initialEntries: ['/'] })
    render(
      <Router location={''} navigator={history}>
        <PrivateRoute />
      </Router>
    )
  })

  it('Should redirect to /login if token is empty', () => {
    expect(history.location.pathname).toBe('/login')
  })
})
