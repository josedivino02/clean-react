import { Footer, Header, Icon, IconName } from '@/application/components'
import React from 'react'
import Styles from './survey-list-styles.scss'

const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          <li>
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
          <li></li>
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
