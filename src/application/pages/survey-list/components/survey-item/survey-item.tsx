import { Icon, IconName } from '@/application/components'
import React from 'react'
import Styles from './survey-item-styles.scss'

const SurveyItem: React.FC = () => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.iconWrap} iconName={IconName.thumbUp} />
        <time>
          <span className={Styles.day}>22</span>
          <span className={Styles.month}>22</span>
          <span className={Styles.year}>2222</span>
        </time>
        <p>Qual é seu framework</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  )
}

export default SurveyItem
