import { HttpGetClientSpy } from '@/data/test';
import { faker } from '@faker-js/faker';
import { RemoteLoadSurveyResult } from './remote-load-survey-result';

describe('RemoteLoadSurveyResult', () => {
  it('Should call HttpGetClient with correct url', async () => {
    const url = faker.internet.url();
    const httpGetClientSpy = new HttpGetClientSpy();
    const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy);
    await sut.load();

    expect(httpGetClientSpy.url).toBe(url);
  });
});
