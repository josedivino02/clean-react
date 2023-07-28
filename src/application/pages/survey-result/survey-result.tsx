import { Calendar, Loading } from '@/application/components'
import Footer from '@/application/components/footer/footer'
import Header from '@/application/components/header/header'
import React from 'react'
import FlipMove from 'react-flip-move'
import Styles from './survey-result-styles.scss'

const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <hgroup>
          <Calendar date={new Date()} className={Styles.calendarWrap} />
          <h2>Pergunta</h2>
        </hgroup>

        <FlipMove className={Styles.answersList}>
          <li>
            <img src="" alt="" />
            <span className={Styles.answer}>ReactJs</span>
            <span className={Styles.percent}>50%</span>
          </li>
          <li className={Styles.active}>
            <img src="" alt="" />
            <span className={Styles.answer}>ReactJs</span>
            <span className={Styles.percent}>50%</span>
          </li>
        </FlipMove>
        <button>Voltar</button>
        {true && <Loading />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
