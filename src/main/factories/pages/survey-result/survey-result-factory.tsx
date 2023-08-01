import { SurveyResult } from '@/application/pages';
import { makeRemoteLoadSurveyResult } from '@/main/factories/usecases/load-survey-result/remote-load-survey-result-factory';
import { makeRemoteSaveSurveyResult } from '@/main/factories/usecases/save-survey-result/remote-save-survey-result-factory';
import React from 'react';
import { useParams } from 'react-router-dom';

export const makeSurveyResult: React.FC = () => {
  const { id } = useParams()
  return (
    <SurveyResult
      loadSurveyResult={makeRemoteLoadSurveyResult(id)}
      saveSurveyResult={makeRemoteSaveSurveyResult(id)}
    />
  )
}
