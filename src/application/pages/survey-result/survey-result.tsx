import { Error, Loading } from '@/application/components'
import Footer from '@/application/components/footer/footer'
import Header from '@/application/components/header/header'
import { useErrorHandler } from '@/application/hooks'
import { SurveyResultData } from '@/application/pages/survey-result/components'
import { type LoadSurveyResult, type LoadSurveyResultParams } from '@/domain/usecases'
import React, { useEffect, useState } from 'react'
import Styles from './survey-result-styles.scss'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const handleError = useErrorHandler((error: Error) => { setState(old => ({ ...old, surveyResult: null, error: error.message })); })

  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResultParams.Output,
    reload: false
  })

  const reload = (): void => { setState(old => ({ surveyResult: null, error: '', reload: !old.reload, isLoading: false })); }

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => { setState(old => ({ ...old, surveyResult })); })
      .catch(handleError)
  }, [state.reload])

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.surveyResult && <SurveyResultData surveyResult={state.surveyResult} />}
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
