import Header from '@/application/components/header/header'
import { ApiContext } from '@/application/contexts'
import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory, type MemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'

describe('Header Component', () => {
  let history: MemoryHistory
  let setCurrentAccountMock: jest.Mock

  beforeAll(() => {
    history = createMemoryHistory({ initialEntries: ['/'] })
    setCurrentAccountMock = jest.fn()
  })

  beforeEach(() => {
    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Router location={''} navigator={history}>
          <Header />
        </Router>
      </ApiContext.Provider>
    )
  })

  it('Should call SetCurrentAccount with null', () => {
    const logout = screen.getByTestId('logout')
    fireEvent.click(logout)
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })
})
