import { Spinner } from '@/application/components'
import React from 'react'
import Styles from './loading-styles.scss'

const Loading: React.FC = () => {
  return (
    <div className={Styles.loadingWrap}>
      <div className={Styles.loading}>
        <span>Aguarde...</span>
        <Spinner isNegative />
      </div>
    </div>
  )
}

export default Loading