export namespace LoadSurveyResultParams {
  export type Output = {
    question: string;
    date: Date;
    answers: Array<{
      image?: string;
      answer: string;
      count: number;
      percent: number;
    }>;
  };
}
export interface LoadSurveyResult {
  load: () => Promise<LoadSurveyResultParams.Output>;
}
