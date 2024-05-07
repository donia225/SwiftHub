import { AnswerModel } from "./answer-model";
import { QuizModel } from "./quiz-model";

export interface QuestionModel {
    question_id: number;
    questiontxt: string;
    answered: boolean; 
  answers: AnswerModel[];
  quiz: QuizModel;
 
  
}
