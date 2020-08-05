import { DayModel } from "./day.model";

export interface WeekModel {
    selected: boolean,
    month: number,
    options: any, // user object
    days: Array<DayModel | null>,
    date: Date | null,
    weekNumber: number
}