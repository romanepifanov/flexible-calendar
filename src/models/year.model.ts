import { MonthModel } from "./month.model";

export interface YearModel {
    name: number,
    months: Array<MonthModel>,
}