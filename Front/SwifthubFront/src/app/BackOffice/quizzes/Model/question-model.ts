import { AnswerModel } from "./answer-model";

export interface QuestionModel {
    question_id: number;
    questiontxt: string;
  
  answers: AnswerModel[];
  
}
