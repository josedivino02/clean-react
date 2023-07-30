import { Calendar, Error, Loading } from '@/application/components'
import Footer from '@/application/components/footer/footer'
import Header from '@/application/components/header/header'
import { type LoadSurveyListParams, type LoadSurveyResult } from '@/domain/usecases'
import React, { useEffect, useState } from 'react'
import FlipMove from 'react-flip-move'
import Styles from './survey-result-styles.scss'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [state] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyListParams.Output
  })

  useEffect(() => {
    loadSurveyResult.load()
  }, [])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.surveyResult &&
          <>
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
          </>
        }
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={() => { }} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
