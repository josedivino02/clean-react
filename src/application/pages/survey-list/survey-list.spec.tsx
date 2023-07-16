import { SurveyList } from '@/application/pages'
import { type SurveyModel } from '@/domain/models'
import { type LoadSurveyList } from '@/domain/usecases'
import { render, screen } from '@testing-library/react'
import React from 'react'

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0

  async loadAll(): Promise<SurveyModel[]> {
    this.callsCount++

    return []
  }
}

describe('SurveyList Component', () => {
  let loadSurveyListSpy: LoadSurveyListSpy

  beforeEach(() => {
    loadSurveyListSpy = new LoadSurveyListSpy()
    render(<SurveyList loadSurveyList={loadSurveyListSpy} />)
  })

  it('Should present 4 empty items on start', () => {
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
  })

  it('Should call LoadSurveyList', () => {
    expect(loadSurveyListSpy.callsCount).toBe(1)
  })
})
