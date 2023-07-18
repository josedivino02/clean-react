import { SurveyList } from '@/application/pages';
import React from 'react';
import { makeRemoteLoadSurveyList } from '../../usecases/load-survey-list/remote-load-survey-list-factory';

export const makeSurveyList: React.FC = () => {
  return (
    <SurveyList
      loadSurveyList={makeRemoteLoadSurveyList()}
    />
  )
}
