import { HttpGetClientSpy } from '@/data/test';
import { faker } from '@faker-js/faker';
import { RemoteLoadSurveyList } from './remote-load-survey-list';

describe('RemoteLoadSurveyList', () => {
  let url: string;
  let httpGetClientSpy: HttpGetClientSpy;
  let sut: RemoteLoadSurveyList;

  beforeEach(() => {
    url = faker.internet.url();
    httpGetClientSpy = new HttpGetClientSpy();
    sut = new RemoteLoadSurveyList(url, httpGetClientSpy);
  });

  it('should call HttpGetClient with correct URL', async () => {
    await sut.loadAll();

    expect(httpGetClientSpy.url).toBe(url);
  });
});
