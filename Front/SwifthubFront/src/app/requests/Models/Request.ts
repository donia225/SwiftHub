import { Answer } from "./Answer";
import { Category } from "./Category";


export interface Request{
    idRequest: number;
    title: string;
    description: string;
    status: string;
    creationDate: Date;
    attachment: string;
    category: Category;
    categoryName: string;
    answers:Answer[];
}