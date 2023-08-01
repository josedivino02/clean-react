import { Error, Loading } from '@/application/components'
import Footer from '@/application/components/footer/footer'
import Header from '@/application/components/header/header'
import { useErrorHandler } from '@/application/hooks'
import { SurveyResultContext, SurveyResultData } from '@/application/pages/survey-result/components'
import { type LoadSurveyResult, type LoadSurveyResultParams, type SaveSurveyResult } from '@/domain/usecases'
import React, { useEffect, useState } from 'react'
import Styles from './survey-result-styles.scss'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, surveyResult: null, isLoading: false, error: error.message }));
  })

  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResultParams.Output,
    reload: false
  })

  const onAnswer = (answer: string): void => {
    if (state.isLoading) {
      return
    }
    setState(old => ({ ...old, isLoading: true }))
    saveSurveyResult.save({ answer })
      .then(surveyResult => { setState(old => ({ ...old, isLoading: false, surveyResult })); })
      .catch(handleError)
  }

  const reload = (): void => { setState(old => ({ surveyResult: null, error: '', reload: !old.reload, isLoading: false })); }

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => { setState(old => ({ ...old, surveyResult })); })
      .catch(handleError)
  }, [state.reload])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <SurveyResultContext.Provider value={{ onAnswer }}>
        <div data-testid="survey-result" className={Styles.contentWrap}>
          {state.surveyResult && <SurveyResultData surveyResult={state.surveyResult} />}
          {state.isLoading && <Loading />}
          {state.error && <Error error={state.error} reload={reload} />}
        </div>
      </SurveyResultContext.Provider>
      <Footer />
    </div>
  )
}

export default SurveyResult
