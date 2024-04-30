import { QuestionModel } from "./question-model";

export interface QuizModel {
    quiz_id: number;
    quizName: string;
    quizTime: Date;
    questions: QuestionModel[];
}

