import { IconName } from '@/application/components';
import { SurveyItem } from '@/application/pages/survey-list/components';
import { type SurveyModel } from '@/domain/models';
import { mockSurveyModel } from '@/domain/test';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('SurveyItem Component', () => {
  let survey: SurveyModel

  beforeAll(() => {
    survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
      date: new Date('2023-07-16T00:00:00')
    })
  })

  beforeEach(() => {
    render(<SurveyItem survey={survey} />)
  })

  it('Should render with correct values', () => {
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('16')
    expect(screen.getByTestId('month')).toHaveTextContent('jul')
    expect(screen.getByTestId('year')).toHaveTextContent('2023')
  })
})
