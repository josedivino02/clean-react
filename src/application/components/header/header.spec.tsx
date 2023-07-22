import Header from '@/application/components/header/header'
import { ApiContext } from '@/application/contexts'
import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'

describe('Header Component', () => {
  it('Should call SetCurrentAccount with null', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    const setCurrentAccountMock = jest.fn()

    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Router location={''} navigator={history}>
          <Header />
        </Router>
      </ApiContext.Provider>
    )

    const logout = screen.getByTestId('logout')
    fireEvent.click(logout)
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })
})
