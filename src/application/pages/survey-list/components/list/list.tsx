import { SurveyContext, SurveyItem, SurveyItemEmpty } from '@/application/pages/survey-list/components'
import React, { useContext } from 'react'

import { type LoadSurveyListParams } from '@/domain/usecases'
import Styles from './list-styles.scss'

const List: React.FC = () => {
  const { state } = useContext(SurveyContext)

  return (
    <ul className={Styles.listWrap} data-testid="survey-list">
      {state.surveys.length
        ? (state.surveys.map((survey: LoadSurveyListParams.Output) => (<SurveyItem key={survey.id} survey={survey} />))
        )
        : (<SurveyItemEmpty />
        )}
    </ul>
  )
}

export default List
