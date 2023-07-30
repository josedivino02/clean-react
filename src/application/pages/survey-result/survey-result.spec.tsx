import ApiContext from '@/application/contexts/api/api-context'
import { LoadSurveyResultSpy, mockAccountModel } from '@/domain/test'
import { render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory, type MemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'
import SurveyResult from './survey-result'

describe('SurveyResult Component', () => {
  let history: MemoryHistory
  let loadSurveyResultSpy: LoadSurveyResultSpy

  beforeEach(() => {
    history = createMemoryHistory({ initialEntries: ['/'] })
    loadSurveyResultSpy = new LoadSurveyResultSpy()

    render(
      <ApiContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: () => mockAccountModel() }}>
        <Router location={'/'} navigator={history}>
          <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
        </Router >
      </ApiContext.Provider>

    )
  })

  it('Should present correct initial state', async () => {
    const surveyResult = screen.getByTestId('survey-result')

    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    await waitFor(() => surveyResult)
  })

  it('Should call SurveyResultSpy', async () => {
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(loadSurveyResultSpy.callsCount).toBe(1)
  })
})
