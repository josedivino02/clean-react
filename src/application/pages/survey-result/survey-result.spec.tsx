import ApiContext from '@/application/contexts/api/api-context'
import { type AccountModel } from '@/domain/models'
import { LoadSurveyResultSpy, mockAccountModel } from '@/domain/test'
import { render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory, type MemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'
import SurveyResult from './survey-result'

describe('SurveyResult Component', () => {
  let history: MemoryHistory
  let loadSurveyResultSpy: LoadSurveyResultSpy
  // let surveyResult: LoadSurveyResultParams.Output
  let setCurrentAccountMock: (account: AccountModel) => void

  beforeEach(() => {
    history = createMemoryHistory({ initialEntries: ['/'] })
    loadSurveyResultSpy = new LoadSurveyResultSpy()
    setCurrentAccountMock = jest.fn()

    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
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

  // it('Should present SurveyResult data on success', async () => {
  //   const loadSurveyResultSpy2 = new LoadSurveyResultSpy()
  //   surveyResult = Object.assign(mockSurveyResultModel(), {
  //     date: new Date('2023-07-30T00:00:00')
  //   })
  //   loadSurveyResultSpy2.surveyResult = surveyResult
  //   await waitFor(() => screen.getByTestId('survey-result'))
  //   render(
  //     <ApiContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: () => mockAccountModel() }}>
  //       <Router location={'/'} navigator={history}>
  //         <SurveyResult loadSurveyResult={loadSurveyResultSpy2} />
  //       </Router >
  //     </ApiContext.Provider>
  //   )

  //   expect(screen.getByTestId('day')).toHaveTextContent('30')
  //   expect(screen.getByTestId('month')).toHaveTextContent('jul')
  //   expect(screen.getByTestId('year')).toHaveTextContent('2023')
  //   expect(screen.getByTestId('question')).toHaveTextContent(surveyResult.question)
  //   expect(screen.getByTestId('answers').childElementCount).toBe(2)
  //   const answerWrap = screen.queryAllByTestId('answer-wrap')
  //   expect(answerWrap[0]).toHaveClass('active')
  //   expect(answerWrap[1]).not.toHaveClass('active')
  //   const images = screen.queryAllByTestId('image')
  //   expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image)
  //   expect(images[0]).toHaveAttribute('alt', surveyResult.answers[0].answer)
  //   expect(images[1]).toBeFalsy()
  //   const answers = screen.queryAllByTestId('answer')
  //   expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer)
  //   expect(answers[1]).toHaveAttribute(surveyResult.answers[1].answer)
  //   const percents = screen.queryAllByTestId('percent')
  //   expect(percents[0]).toHaveTextContent(`${surveyResult.answers[0].percent}%`)
  //   expect(percents[1]).toHaveAttribute(`${surveyResult.answers[1].percent}%`)
  // })

  // it('Should render error on UnexpectedError', async () => {
  //   const loadSurveyResultSpy2 = new LoadSurveyResultSpy()
  //   const error = new UnexpectedError()
  //   jest.spyOn(loadSurveyResultSpy2, 'load').mockRejectedValueOnce(error)
  //   await waitFor(() => screen.getByTestId('survey-result'))

  //   render(
  //     <ApiContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: () => mockAccountModel() }}>
  //       <Router location={'/'} navigator={history}>
  //         <SurveyResult loadSurveyResult={loadSurveyResultSpy2} />
  //       </Router >
  //     </ApiContext.Provider>
  //   )

  //   expect(screen.queryByTestId('question')).not.toBeInTheDocument()
  //   expect(screen.getByTestId('error')).toHaveTextContent(error.message)
  //   expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  // })

  // it('Should logout on AccessDeniedError', async () => {
  //   const loadSurveyResultSpy2 = new LoadSurveyResultSpy()
  //   await waitFor(() => screen.getByRole('survey-result'))
  //   jest.spyOn(loadSurveyResultSpy2, 'load').mockRejectedValueOnce(new AccessDeniedError())

  //   render(
  //     <ApiContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: () => mockAccountModel() }}>
  //       <Router location={'/'} navigator={history}>
  //         <SurveyResult loadSurveyResult={loadSurveyResultSpy2} />
  //       </Router >
  //     </ApiContext.Provider>
  //   )

  //   await waitFor(() => screen.getByTestId('survey-result'))
  //   expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
  //   expect(history.location.pathname).toBe('/login')
  // })
})
