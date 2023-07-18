import { SurveyContext } from '@/application/pages/survey-list/components'
import React, { useContext } from 'react'
import Styles from './error-styles.scss'

const Error: React.FC = () => {
  const { state, setState } = useContext(SurveyContext)
  const reload = (): void => {
    setState({ surveys: [], error: '', reload: !state.reload })
  }
  return (
    <div className={Styles.errorWrap}>
      <div>
        <span data-testid="error">{state.error}</span>
        <button onClick={reload} data-testid="reload">Tentar novamente</button>
      </div>
    </div>
  )
}

export default Error
