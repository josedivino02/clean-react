import { Calendar } from '@/application/components';
import { SurveyResultAnswer } from '@/application/pages/survey-result/components';
import { type LoadSurveyResultParams } from '@/domain/usecases';
import React from 'react';
import FlipMove from 'react-flip-move';
import { useNavigate } from 'react-router-dom';
import Styles from './result-styles.scss';

type Props = {
  surveyResult: LoadSurveyResultParams.Output
}

const Result: React.FC<Props> = ({ surveyResult }: Props) => {
  const navigate = useNavigate()

  return (
    <div className={Styles.resultWrap}>
      <>
        <hgroup>
          <Calendar date={surveyResult.date} className={Styles.calendarWrap} />
          <h2 data-testid='question'>{surveyResult.question}</h2>
        </hgroup>

        <FlipMove data-testid="answers" className={Styles.answersList}>
          <>
            {surveyResult.answers.map(answer => <SurveyResultAnswer answer={answer} key={answer.answer} />)}
          </>
        </FlipMove>
        <button className={Styles.button} data-testid="back-button" onClick={() => { navigate('/'); }}>Voltar</button>
      </>
    </div>
  )
}

export default Result
