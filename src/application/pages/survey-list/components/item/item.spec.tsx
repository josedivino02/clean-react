import { IconName } from '@/application/components';
import { SurveyItem } from '@/application/pages/survey-list/components';
import { mockSurveyModel } from '@/domain/test';
import { type LoadSurveyListParams } from '@/domain/usecases';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('SurveyItem Component', () => {
  let surveyModel: LoadSurveyListParams.Output
  let date: Date

  beforeEach(() => {
    surveyModel = mockSurveyModel()
    date = new Date('2023-07-16T00:00:00')
  })

  it('Should render with correct values', () => {
    const survey = Object.assign(surveyModel, {
      didAnswer: true,
      date
    })

    render(<SurveyItem survey={surveyModel} />)

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('16')
    expect(screen.getByTestId('month')).toHaveTextContent('jul')
    expect(screen.getByTestId('year')).toHaveTextContent('2023')
  })

  it('Should render with correct values', () => {
    const survey = Object.assign(surveyModel, {
      didAnswer: true,
      date
    })

    render(<SurveyItem survey={surveyModel} />)

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('16')
    expect(screen.getByTestId('month')).toHaveTextContent('jul')
    expect(screen.getByTestId('year')).toHaveTextContent('2023')
  })
})
