export namespace LoadSurveyListParams {
  export type Output = {
    id: string;
    question: string;
    didAnswer: boolean;
    date: Date;
  };
}
export interface LoadSurveyList {
  loadAll: () => Promise<LoadSurveyListParams.Output[]>;
}
