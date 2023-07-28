import { IconName } from '@/application/components';
import { SurveyItem } from '@/application/pages/survey-list/components';
import { mockSurveyModel } from '@/domain/test';
import { type LoadSurveyListParams } from '@/domain/usecases';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('SurveyItem Component', () => {
  let surveyModel: LoadSurveyListParams.Output

  beforeEach(() => {
    surveyModel = mockSurveyModel()
  })

  it('Should render with correct values', () => {
    const survey = Object.assign(surveyModel, {
      didAnswer: true
    })

    render(<SurveyItem survey={surveyModel} />)

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })

  it('Should render with correct values', () => {
    const survey = Object.assign(surveyModel, {
      didAnswer: true
    })

    render(<SurveyItem survey={surveyModel} />)

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })
})
