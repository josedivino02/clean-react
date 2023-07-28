import { Calendar, Icon, IconName } from '@/application/components'
import { type LoadSurveyListParams } from '@/domain/usecases'
import React from 'react'
import Styles from './item-styles.scss'

type Props = {
  survey: LoadSurveyListParams.Output
}

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown

  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.iconWrap} iconName={iconName} />
        <Calendar date={survey.date} className={Styles.calendarWrap} />
        <p data-testid="question">{survey.question}`</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  )
}

export default SurveyItem
