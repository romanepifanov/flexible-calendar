import { WeekModel } from "./week.model";

export interface MonthModel {
    name: string,
    weeks: Array<WeekModel>,
}