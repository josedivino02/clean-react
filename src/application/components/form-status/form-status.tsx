import Spinner from '@/application/components/spinner/spinner';
import { FormContext } from '@/application/contexts';
import React, { useContext } from 'react';
import Styles from './form-status-styles.scss';

const FormStatus: React.FC = () => {
  const { state } = useContext(FormContext)
  const { isLoading, mainError } = state

  return (
    <div data-testid='error-wrap' className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {mainError && <span data-testid='main-error' className={Styles.error}>{mainError}</span>}
    </div>
  )
}

export default FormStatus
