import { RemoteLoadSurveyList } from '@/data/usecases/load-survey-list/remote-load-survey-list';
import { type LoadSurveyList } from '@/domain/usecases';
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators';
import { makeApiUrl } from '@/main/factories/http/api-url-factory';

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(
    makeApiUrl('surveys'),
    makeAuthorizeHttpClientDecorator(),
  );
};
