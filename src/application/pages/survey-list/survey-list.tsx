import { Footer, Header } from '@/application/components'
import { Error, SurveyContext, SurveyListItem } from '@/application/pages/survey-list/components'
import { type LoadSurveyList, type LoadSurveyListParams } from '@/domain/usecases'
import React, { useEffect, useState } from 'react'
import Styles from './survey-list-styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as LoadSurveyListParams.Output[],
    error: '',
    reload: false
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => { setState({ ...state, surveys }); })
      .catch(error => { setState({ ...state, error: error.message }); })
  }, [state.reload])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error ? (<Error />) : (<SurveyListItem />)}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
