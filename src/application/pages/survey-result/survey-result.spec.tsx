import ApiContext from '@/application/contexts/api/api-context'
import { AccessDeniedError } from '@/domain/errors'
import { type AccountModel } from '@/domain/models'
import { LoadSurveyResultSpy, SaveSurveyResultSpy, mockAccountModel, mockSurveyResultModel } from '@/domain/test'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory, type MemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'
import SurveyResult from './survey-result'

describe('SurveyResult Component', () => {
  let history: MemoryHistory
  let loadSurveyResultSpy: LoadSurveyResultSpy
  let saveSurveyResultSpy: SaveSurveyResultSpy
  // let surveyResult: LoadSurveyResultParams.Output
  let setCurrentAccountMock: (account: AccountModel) => void

  beforeEach(() => {
    history = createMemoryHistory({ initialEntries: ['/', '/surveys/any_id'], initialIndex: 1 })
    loadSurveyResultSpy = new LoadSurveyResultSpy()
    saveSurveyResultSpy = new SaveSurveyResultSpy()
    setCurrentAccountMock = jest.fn()

    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
        <Router location={'/'} navigator={history}>
          <SurveyResult
            loadSurveyResult={loadSurveyResultSpy}
            saveSurveyResult={saveSurveyResultSpy}
          />
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
  //   expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer)
  //   const percents = screen.queryAllByTestId('percent')
  //   expect(percents[0]).toHaveTextContent(`${surveyResult.answers[0].percent}%`)
  //   expect(percents[1]).toHaveTextContent(`${surveyResult.answers[1].percent}%`)
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

  // it('Should call LoadSurveyResult on reload', async () => {
  //   const loadSurveyResultSpy2 = new LoadSurveyResultSpy()
  //   jest.spyOn(loadSurveyResultSpy2, 'load').mockRejectedValueOnce(new UnexpectedError())

  //   render(
  //     <ApiContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: () => mockAccountModel() }}>
  //       <Router location={'/'} navigator={history}>
  //         <SurveyResult loadSurveyResult={loadSurveyResultSpy2} />
  //       </Router >
  //     </ApiContext.Provider>
  //   )

  //   await waitFor(() => screen.getByRole('survey-result'))
  //   fireEvent.click(screen.getByTestId('reload'))
  //   expect(loadSurveyListSpy.callsCount).toBe(1)
  //   await waitFor(() => screen.getByRole('survey-result'))
  // })

  it('Should goto SurveyList on back button click', async () => {
    await waitFor(() => screen.getByTestId('survey-result'))
    fireEvent.click(screen.getByTestId('back-button'))
    expect(history.location.pathname).toBe('/')
  })

  it('Should not present Loading on active answer click', async () => {
    await waitFor(() => screen.getByTestId('survey-result'))
    const answerWrap = screen.queryAllByTestId('answer-wrap')
    fireEvent.click(answerWrap[0])
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })

  it('Should call SaveSurveyResult on non active answer click', async () => {
    await waitFor(() => screen.getByTestId('survey-result'))
    const answerWrap = screen.queryAllByTestId('answer-wrap')
    fireEvent.click(answerWrap[1])
    expect(screen.queryByTestId('loading')).toBeInTheDocument()
    expect(saveSurveyResultSpy.input).toEqual({
      answer: loadSurveyResultSpy.surveyResult.answers[1].answer
    })
    await waitFor(() => screen.getByTestId('survey-result'))
  })

  // it('Should render error on UnexpectedError', async () => {
  //   const error = new UnexpectedError()
  //   jest.spyOn(saveSurveyResultSpy, 'save').mockRejectedValueOnce(error)
  //   await waitFor(() => screen.getByTestId('survey-result'))
  //   const answerWrap = screen.queryAllByTestId('answer-wrap')
  //   fireEvent.click(answerWrap[1])
  //   await waitFor(() => screen.getByTestId('survey-result'))
  //   expect(screen.queryByTestId('question')).not.toBeInTheDocument()
  //   expect(screen.getByTestId('error')).toHaveTextContent(error.message)
  //   expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  // })

  it('Should logout on AccessDeniedError', async () => {
    jest.spyOn(saveSurveyResultSpy, 'save').mockRejectedValueOnce(new AccessDeniedError())
    await waitFor(() => screen.getByTestId('survey-result'))
    const answerWrap = screen.queryAllByTestId('answer-wrap')
    fireEvent.click(answerWrap[1])
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe('/login')
  })

  it('Should present SurveyResult data on SaveSurveyResult success', async () => {
    const surveyResult = Object.assign(mockSurveyResultModel(), {
      date: new Date('2023-08-01T00:00:00')
    })
    saveSurveyResultSpy.surveyResult = surveyResult
    await waitFor(() => screen.getByTestId('survey-result'))
    const answerWrap = screen.queryAllByTestId('answer-wrap')
    fireEvent.click(answerWrap[1])
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(screen.getByTestId('day')).toHaveTextContent('01')
    expect(screen.getByTestId('month')).toHaveTextContent('ago')
    expect(screen.getByTestId('year')).toHaveTextContent('2023')
    expect(screen.getByTestId('question')).toHaveTextContent(surveyResult.question)
    expect(screen.getByTestId('answers').childElementCount).toBe(2)
    expect(answerWrap[0]).toHaveClass('active')
    expect(answerWrap[1]).not.toHaveClass('active')
    const images = screen.queryAllByTestId('image')
    expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image)
    expect(images[0]).toHaveAttribute('alt', surveyResult.answers[0].answer)
    expect(images[1]).toBeFalsy()
    const answers = screen.queryAllByTestId('answer')
    expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer)
    expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer)
    const percents = screen.queryAllByTestId('percent')
    expect(percents[0]).toHaveTextContent(`${surveyResult.answers[0].percent}%`)
    expect(percents[1]).toHaveTextContent(`${surveyResult.answers[1].percent}%`)
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })

  it('Should present multiple answer click', async () => {
    await waitFor(() => screen.getByTestId('survey-result'))
    const answerWrap = screen.queryAllByTestId('answer-wrap')
    fireEvent.click(answerWrap[1])
    fireEvent.click(answerWrap[1])
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(saveSurveyResultSpy.callsCount).toBe(1)
  })
})
