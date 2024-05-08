import { Answer } from "src/app/requests/Models/Answer";



export interface Request{
    idRequest: number;
    title: string;
    description: string;
    status: string;
    creationDate: Date;
    categoryName:string;
    answers:Answer [];
    
    
}