import { Feedback } from "../feedback/feedback";

export class Workshop {
    workshop_id!: string;
    title!: string;
    description!: string;
    capacity!: number;
    start_date!: Date;
    end_date!: Date;
    location!: string;
    link!: string;
    userId!:string;
    feedbacks!: Feedback[];
    joinedUsers!:string[];
    meetingId!:string;
}
