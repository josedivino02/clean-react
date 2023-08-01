import { faker } from '@faker-js/faker';
import {
  type LoadSurveyResult,
  type LoadSurveyResultParams,
  type SaveSurveyResult,
  type SaveSurveyResultParams,
} from '../usecases';

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams.Input => ({
  answer: faker.word.words(10),
});

export const mockSurveyResultModel = (): LoadSurveyResultParams.Output => ({
  question: faker.word.words(10),
  date: faker.date.recent(),
  answers: [
    {
      image: faker.internet.url(),
      answer: faker.word.words(),
      count: faker.number.int(),
      percent: faker.number.int(100),
      isCurrentAccountAnswer: true,
    },
    {
      answer: faker.word.words(),
      count: faker.number.int(),
      percent: faker.number.int(100),
      isCurrentAccountAnswer: false,
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

export class SaveSurveyResultSpy implements SaveSurveyResult {
  input: SaveSurveyResultParams.Input;
  surveyResult = mockSurveyResultModel();

  async save(
    input: SaveSurveyResultParams.Input,
  ): Promise<SaveSurveyResultParams.Output> {
    this.input = input;

    return this.surveyResult;
  }
}
