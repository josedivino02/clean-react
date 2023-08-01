import { type SurveyResultModel } from '@/domain/models';

export namespace LoadSurveyResultParams {
  export type Output = SurveyResultModel;
}
export interface LoadSurveyResult {
  load: () => Promise<LoadSurveyResultParams.Output>;
}
