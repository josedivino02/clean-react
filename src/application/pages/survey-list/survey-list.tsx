import { Footer, Header } from '@/application/components'
import { SurveyItem, SurveyItemEmpty } from '@/application/pages/survey-list/components'
import { type SurveyModel } from '@/domain/models'
import { type LoadSurveyList } from '@/domain/usecases'
import React, { useEffect, useState } from 'react'
import Styles from './survey-list-styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[]
  })

  useEffect(() => {
    loadSurveyList.loadAll().then(surveys => { setState({ surveys }); })
  }, [])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          {state.surveys.length
            ? state.surveys.map((survey: SurveyModel) => <SurveyItem key={survey.id} survey={survey} />)
            : <SurveyItemEmpty />
          }
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
