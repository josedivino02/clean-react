import ApiContext from '@/application/contexts/api/api-context'
import { mockAccountModel } from '@/domain/test'
import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'
import SurveyResult from './survey-result'

describe('SurveyResult Component', () => {
  it('Should present correct initial state', async () => {
    render(
      <ApiContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: () => mockAccountModel() }}>
        <Router location={'/'} navigator={createMemoryHistory({ initialEntries: ['/'] })}>
          <SurveyResult />
        </Router >
      </ApiContext.Provider>

    )

    const surveyResult = screen.getByTestId('survey-result')

    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })
})
