import { faker } from '@faker-js/faker';
import {
  type LoadSurveyResult,
  type LoadSurveyResultParams,
} from '../usecases';

export const mockSurveyResultModel = (): LoadSurveyResultParams.Output => ({
  question: faker.word.words(10),
  date: faker.date.recent(),
  answers: [
    {
      image: faker.internet.url(),
      answer: faker.word.words(),
      count: faker.number.int(),
      percent: faker.number.int(100),
      isCurrentAccountAnswer: faker.datatype.boolean(),
    },
    {
      answer: faker.word.words(),
      count: faker.number.int(),
      percent: faker.number.int(100),
      isCurrentAccountAnswer: faker.datatype.boolean(),
    },
  ],
});

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount = 0;
  surveyResult = mockSurveyResultModel();

  async load(): Promise<LoadSurveyResultParams.Output> {
    this.callsCount++;

    return this.surveyResult;
  }
}
