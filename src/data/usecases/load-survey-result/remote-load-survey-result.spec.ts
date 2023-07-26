import { HttpGetClientSpy } from '@/data/test';
import { faker } from '@faker-js/faker';
import { RemoteLoadSurveyResult } from './remote-load-survey-result';

describe('RemoteLoadSurveyResult', () => {
  let url: string;
  let httpGetClientSpy: HttpGetClientSpy;
  let sut: RemoteLoadSurveyResult;

  beforeAll(() => {
    url = faker.internet.url();
  });

  beforeEach(() => {
    httpGetClientSpy = new HttpGetClientSpy();
    sut = new RemoteLoadSurveyResult(url, httpGetClientSpy);
  });

  it('Should call HttpGetClient with correct url', async () => {
    await sut.load();

    expect(httpGetClientSpy.url).toBe(url);
  });
});
