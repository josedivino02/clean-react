import { SurveyList } from '@/application/pages'
import { render, screen } from '@testing-library/react'
import React from 'react'

describe('SurveyList Component', () => {
  beforeEach(() => {
    render(<SurveyList />)
  })

  it('Should present 4 empty items on start', () => {
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
  })
})
