import { faker } from '@faker-js/faker';
import { type RemoteLoadSurveyList } from '../usecases/load-survey-list/remote-load-survey-list';

export const mockRemoteSurveyModel = (): RemoteLoadSurveyList.Output => ({
  id: faker.string.uuid(),
  question: faker.word.words(10),
  didAnswer: faker.datatype.boolean(),
  date: faker.date.recent().toISOString(),
});

export const mockRemoteSurveyListModel = (): RemoteLoadSurveyList.Output[] => [
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
];
