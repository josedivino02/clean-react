import { faker } from '@faker-js/faker';
import { type LoadSurveyListParams } from '../usecases';

export const mockSurveyModel = (): LoadSurveyListParams.Output => ({
  id: faker.string.uuid(),
  question: faker.word.words(10),
  didAnswer: faker.datatype.boolean(),
  date: faker.date.recent(),
});

export const mockSurveyListModel = (): LoadSurveyListParams.Output[] => [
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel(),
];
