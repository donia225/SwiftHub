import { QuestionModel } from "./question-model";

export interface QuizModel {
    quizId: number;
    quizName: string;
    quizTime: Date;
    questions: QuestionModel[];
    
}

