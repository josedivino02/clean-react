import { SurveyContext } from '@/application/pages/survey-list/components'
import React, { useContext } from 'react'
import Styles from './error-styles.scss'

const Error: React.FC = () => {
  const { state } = useContext(SurveyContext)

  return (
    <div className={Styles.errorWrap}>
      <div>
        <span data-testid="error">{state.error}</span>
        <button>Recarregar</button>
      </div>
    </div>
  )
}

export default Error
