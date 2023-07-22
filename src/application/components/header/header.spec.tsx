import Header from '@/application/components/header/header'
import { ApiContext } from '@/application/contexts'
import { type AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory, type MemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'

describe('Header Component', () => {
  let history: MemoryHistory
  let setCurrentAccountMock: jest.Mock
  let account: AccountModel

  beforeAll(() => {
    history = createMemoryHistory({ initialEntries: ['/'] })
    setCurrentAccountMock = jest.fn()
    account = mockAccountModel()
  })

  beforeEach(() => {
    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => account }}>
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

  it('Should render username correctly', () => {
    expect(screen.getByTestId('username')).toHaveTextContent(account.name)
  })
})
