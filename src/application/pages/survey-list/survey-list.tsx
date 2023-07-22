import { Footer, Header } from '@/application/components'
import { ApiContext } from '@/application/contexts'
import { Error, SurveyContext, SurveyListItem } from '@/application/pages/survey-list/components'
import { AccessDeniedError } from '@/domain/errors'
import { type LoadSurveyList, type LoadSurveyListParams } from '@/domain/usecases'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Styles from './survey-list-styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const navigate = useNavigate();
  const [state, setState] = useState({
    surveys: [] as LoadSurveyListParams.Output[],
    error: '',
    reload: false
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => { setState({ ...state, surveys }); })
      .catch(error => {
        if (error instanceof AccessDeniedError) {
          setCurrentAccount(undefined)
          navigate('/login')
        } else {
          setState({ ...state, error: error.message });
        }
      })
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
