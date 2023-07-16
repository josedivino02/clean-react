import { type SurveyModel } from '@/domain/models';
import { faker } from '@faker-js/faker';

export const mockSurveyModel = (): SurveyModel => ({
  id: faker.string.uuid(),
  question: faker.word.words(10),
  answers: [
    {
      answer: faker.word.words(4),
      image: faker.internet.url(),
    },
    {
      answer: faker.word.words(5),
    },
  ],
  didAnswer: faker.datatype.boolean(),
  date: faker.date.recent(),
});

export const mockSurveyListModel = (): SurveyModel[] => [
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel(),
];
