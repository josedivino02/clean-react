import { SurveyItem, SurveyItemEmpty } from '@/application/pages/survey-list/components'
import React from 'react'

import { type LoadSurveyListParams } from '@/domain/usecases'
import Styles from './list-styles.scss'

type Props = {
  surveys: LoadSurveyListParams.Output[],
}

const List: React.FC<Props> = ({ surveys }: Props) => {
  return (
    <ul className={Styles.listWrap} data-testid="survey-list">
      {surveys.length
        ? (surveys.map((survey: LoadSurveyListParams.Output) => (<SurveyItem key={survey.id} survey={survey} />))
        )
        : (<SurveyItemEmpty />
        )}
    </ul>
  )
}

export default List
