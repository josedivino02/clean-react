import { type SurveyResultModel } from '@/domain/models';

export namespace SaveSurveyResultParams {
  export type Input = {
    answer: string;
  };

  export type Output = SurveyResultModel;
}
export interface SaveSurveyResult {
  save: (
    input: SaveSurveyResultParams.Input,
  ) => Promise<SaveSurveyResultParams.Output>;
}
