export namespace LoadSurveyResultParams {
  export type Output = {
    id: string;
    question: string;
    answers: [
      {
        image?: string;
        answer: string;
        count: number;
        percent: number;
      },
    ];
    date: Date;
  };
}
export interface LoadSurveyResult {
  load: () => Promise<LoadSurveyResultParams.Output>;
}
