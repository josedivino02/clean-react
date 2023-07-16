import { IconName } from '@/application/components';
import { SurveyItem } from '@/application/pages/survey-list/components';
import { type SurveyModel } from '@/domain/models';
import { mockSurveyModel } from '@/domain/test';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('SurveyItem Component', () => {
  let surveyModel: SurveyModel

  beforeEach(() => {
    surveyModel = mockSurveyModel()
  })

  it('Should render with correct values', () => {
    const survey = Object.assign(surveyModel, {
      didAnswer: true,
      date: new Date('2023-07-16T00:00:00')
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
      date: new Date('2022-06-05T00:00:00')
    })

    render(<SurveyItem survey={surveyModel} />)

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('05')
    expect(screen.getByTestId('month')).toHaveTextContent('jun')
    expect(screen.getByTestId('year')).toHaveTextContent('2022')
  })
})
