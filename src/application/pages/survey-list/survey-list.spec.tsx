import { ApiContext } from '@/application/contexts'
import SurveyList from '@/application/pages/survey-list/survey-list'
import { type AccountModel } from '@/domain/models'
import { LoadSurveyListSpy, mockAccountModel } from '@/domain/test'
import { render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory, type MemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'

describe('SurveyList Component', () => {
  let loadSurveyListSpy: LoadSurveyListSpy
  let history: MemoryHistory
  let setCurrentAccountMock: (account: AccountModel) => void

  beforeEach(() => {
    loadSurveyListSpy = new LoadSurveyListSpy()
    history = createMemoryHistory({ initialEntries: ['/'] })
    setCurrentAccountMock = jest.fn()

    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
        <Router location={''} navigator={history}>
          <SurveyList loadSurveyList={loadSurveyListSpy} />
        </Router >
      </ApiContext.Provider>
    )
  })

  it('Should present 4 empty items on start', async () => {
    const surveyList = screen.getByTestId('survey-list')

    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    await waitFor(() => surveyList)
  })

  it('Should call LoadSurveyList', async () => {
    expect(loadSurveyListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })

  it('Should render SurveyItems on success', async () => {
    const surveyList = screen.getByTestId('survey-list')

    await waitFor(() => surveyList)

    expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(3)
  })

  // it('Should render error on UnexpectedError', async () => {
  //   const error = new UnexpectedError()
  //   jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)

  //   await waitFor(() => screen.getByRole('heading'))

  //   expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
  //   expect(screen.getByTestId('error')).toHaveTextContent(error.message)
  // })

  // it('Should logout on AccessDeniedError', async () => {
  //   jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new AccessDeniedError())

  //   await waitFor(() => screen.getByRole('heading'))
  //   expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
  //   expect(history.location.pathname).toBe('/login')
  // })

  // it('Should call LoadSurveyList on reload', async () => {
  //   jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError())

  //   await waitFor(() => screen.getByRole('heading'))
  //   const reload = screen.getByTestId('reload')
  //   fireEvent.click(reload)
  //   expect(loadSurveyListSpy.callsCount).toBe(1)
  //   await waitFor(() => screen.getByRole('heading'))
  // })
})
