import { Workshop } from "../models/workshop/workshop";

export  class WorkshopUtils {
    workshop!:Workshop;
    //chech date range validity
  static checkDateValidity(endDate:Date,startDate:Date) :boolean{
    return endDate <= startDate;
  }
    // static doSomethingElse(val: string) { return val; }
}
