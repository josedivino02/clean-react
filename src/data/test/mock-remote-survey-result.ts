import { type RemoteLoadSurveyResult } from '@/data/usecases/load-survey-result/remote-load-survey-result';
import { faker } from '@faker-js/faker';

export const mockRemoteSurveyResultModel =
  (): RemoteLoadSurveyResult.Output => ({
    question: faker.word.words(10),
    date: faker.date.recent().toISOString(),
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
