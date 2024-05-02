import { Category } from "./Category";


export interface Request{
    idRequest: string;
    title: string;
    description: string;
    status: string;
    creationDate: Date;
    attachment: string;
    //category: Category;
    categoryName: string;
}