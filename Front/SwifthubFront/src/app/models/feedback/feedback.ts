import { RatingType } from "src/app/enums/rating-type";
import { Workshop } from "../workshop/workshop";

export class Feedback {
    feedback_id!: string;
    description!: string;
    rating!: RatingType;
    creationDate!: Date;
    userId!: string;
    workshop!: Workshop;
}
