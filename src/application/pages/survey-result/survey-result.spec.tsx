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
  // let surveyResult: LoadSurveyResultParams.Output

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

  // it('Should present SurveyResult data on success', async () => {
  //   surveyResult = Object.assign(mockSurveyResultModel(), {
  //     date: new Date('2023-07-30T00:00:00')
  //   })
  //   loadSurveyResultSpy.surveyResult = surveyResult
  //   await waitFor(() => screen.getByTestId('survey-result'))
  //   render(
  //     <ApiContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: () => mockAccountModel() }}>
  //       <Router location={'/'} navigator={history}>
  //         <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
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
})
