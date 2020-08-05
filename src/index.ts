import { YearModel } from "./models/year.model";
import { MonthModel } from "./models/month.model";
import { WeekModel } from "./models/week.model";
import { DayModel } from "./models/day.model";

export class FlexibleCalendar {
	private calendar = {};
	private monthsLarge: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	private dayNames: Array<string> = ['Week #', 'Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
	private dayNumber = 1;
	private weekNumber = 0;
	private currentYear = new Date().getFullYear();
	private currentMonth = new Date().getMonth();

    constructor() { }

    public build = (yearAfter: number = 20, yearBefore: number = 20): any => {
        const currentDate = new Date;
        const endYear:number = currentDate.getFullYear() + yearAfter;
        const startYear:number = currentDate.getFullYear() - yearBefore;

        return this.generateYears(startYear, endYear);
    }

    private generateYears = (startYear: number, endYear: number): Array<YearModel> => {
        const currentDate = new Date;
        const years: Array<YearModel> = [];

        for (var i = startYear; i < endYear; i++) {
            years.push({
                name: i,
                months: this.generateMonths(i)
            });

            this.weekNumber = 0;
        }

        return years;
    }

    private generateMonths(year: number): Array<MonthModel> {
        const months: Array<MonthModel> = [];

        this.monthsLarge.forEach((monthName: string, index: number) => {
            months.push({
                name: monthName,
                weeks: this.generateWeeks(year, monthName, months[index - 1])
            });
        });

        return months;
    }

    private generateWeeks(year: number, month: string, previousMonth: MonthModel): Array<WeekModel> {
        const weeks: Array<WeekModel> = [];
        const currentWeeks = this.weekCount(year, this.monthsLarge.indexOf(month));
        const currentCountDays = this.daysInMonth(this.monthsLarge.indexOf(month), year);
        let weekIndex = 0;

        for (var j = 0; j < currentWeeks; j++) {
            this.weekNumber = j === 0 && previousMonth && previousMonth.weeks[Object.keys(previousMonth.weeks).length - 1] && previousMonth.weeks[Object.keys(previousMonth.weeks).length - 1].days && !previousMonth.weeks[Object.keys(previousMonth.weeks).length - 1].days[6] ? this.weekNumber : this.weekNumber + 1;
            let days = this.generateDays(year, month, currentCountDays, weekIndex);

            weeks.push({
                weekNumber: this.weekNumber,
                selected: false,
                month: this.monthsLarge.indexOf(month) + 1,
                options: {}, // user object
                days: days,
                date: this.getDateByDay(days)
            });

            weekIndex++;
        }

        this.dayNumber = 1;

        return weeks;
    }

    private generateDays(year: number, month: string, currentCountDays: number, week: number): Array<DayModel | null> {
        const days: Array<DayModel | null> = [];

        for (var i = 0; i < 7; i++) {
            if (this.daysName(this.monthsLarge.indexOf(month), year, this.dayNumber).getDay() === i) {
                days.push({
                    number: this.dayNumber,
                    selected: false, 
                    date: this.daysName(this.monthsLarge.indexOf(month), year, this.dayNumber),
                    options: {}
                });

                this.dayNumber = this.dayNumber === currentCountDays ? this.dayNumber : this.dayNumber + 1;
            } else {
                days.push(null);
            }
        }

        return days;
    }

    private daysInMonth(month: number, year: number) {
        var d = new Date(year, month + 1, 0);
        return d.getDate();
    }

    private getDateByDay(days: Array<DayModel | null>): Date | null {
        let date: Date | null = null;

        days.forEach((day: DayModel | null) => {
            if (day && !date) {
                date = day.date;
            }
        });

        return date;
    }

    private daysName(month: number, year: number, day: number) {
        return new Date(year, month, day);
    }

    private weekCount(year: number, month_number: number) {
        var firstOfMonth = this.daysName(month_number, year, 1);
        var numberOfDaysInMonth = this.daysInMonth(month_number, year);
        var notSunStart = 0;
        var daysInFirstWeek = 0;

        if (firstOfMonth.getDay() !== 0) {
            daysInFirstWeek = 6 - firstOfMonth.getDay() + 1;
            notSunStart++;
        }

        return Math.ceil((numberOfDaysInMonth - daysInFirstWeek) / 7) + notSunStart;
    }
}
