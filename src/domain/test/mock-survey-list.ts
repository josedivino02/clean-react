import { faker } from '@faker-js/faker';
import { type LoadSurveyList, type LoadSurveyListParams } from '../usecases';

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

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;
  surveys = mockSurveyListModel();

  async loadAll(): Promise<LoadSurveyListParams.Output[]> {
    this.callsCount++;

    return this.surveys;
  }
}
