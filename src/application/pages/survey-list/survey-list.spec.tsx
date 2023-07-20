import { SurveyList } from '@/application/pages'
import { mockSurveyListModel } from '@/domain/test'
import { type LoadSurveyList, type LoadSurveyListParams } from '@/domain/usecases'
import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0
  surveys = mockSurveyListModel()

  async loadAll(): Promise<LoadSurveyListParams.Output[]> {
    this.callsCount++

    return this.surveys
  }
}

describe('SurveyList Component', () => {
  let loadSurveyListSpy: LoadSurveyListSpy

  beforeEach(() => {
    loadSurveyListSpy = new LoadSurveyListSpy()
    render(<SurveyList loadSurveyList={loadSurveyListSpy} />)
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

  // it('Should render error on failure', async () => {
  //   const error = new UnexpectedError()
  //   jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)

  //   await waitFor(() => screen.getByRole('heading'))

  //   expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
  //   expect(screen.getByTestId('error')).toHaveTextContent(error.message)
  // })

  // it('Should call LoadSurveyList on reload', async () => {
  //   jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError())

  //   await waitFor(() => screen.getByRole('heading'))
  //   fireEvent.click(screen.getByTestId('reload'))
  //   expect(loadSurveyListSpy.callsCount).toBe(1)
  //   await waitFor(() => screen.getByRole('heading'))
  // })
})