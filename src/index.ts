import { YearModel } from "./models/year.model";
import { MonthModel } from "./models/month.model";
import { WeekModel } from "./models/week.model";
import { DayModel } from "./models/day.model";
import { Language } from "./models/language.model";
import LanguageHandler from "./setting/languages";
import { InitialOptions } from "./models/initial-options.model";

export class FlexibleCalendar {
    private calendar = {};
    private month: Array<string> = [];
    private monthShort: Array<string> = [];
    private days: Array<string> = [];
    private daysMiddle: Array<string> = [];
    private daysShort: Array<string> = [];

    private dayNumber = 1;
    private weekNumber = 0;
    private currentYear = new Date().getFullYear();
    private currentMonth = new Date().getMonth();
    private _language: Language | null = null;
    private _languageHandler: LanguageHandler = new LanguageHandler()

    public build = (options: InitialOptions = {}): any => {
        this.pullTranslations(options && options.language ? options.language : 'en');
        const endYear: number = this.currentYear + (options && options.yearAfter ? options.yearAfter : 20);
        const startYear: number = this.currentYear - (options && options.yearBefore ? options.yearBefore : 20);

        return this.generateYears(startYear, endYear);
    }

    private generateYears = (startYear: number, endYear: number): Array<YearModel> => {
        const years: Array<YearModel> = [];

        for (let i = startYear; i < endYear; i++) {
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

        this.month.forEach((monthName: string, index: number) => {
            months.push({
                name: monthName,
                weeks: this.generateWeeks(year, monthName, months[index - 1])
            });
        });

        return months;
    }

    private generateWeeks(year: number, month: string, previousMonth: MonthModel): Array<WeekModel> {
        const weeks: Array<WeekModel> = [];
        const currentWeeks = this.weekCount(year, this.month.indexOf(month));
        const currentCountDays = this.daysInMonth(this.month.indexOf(month), year);
        let weekIndex = 0;

        for (let j = 0; j < currentWeeks; j++) {
            this.weekNumber = j === 0 && previousMonth && previousMonth.weeks[Object.keys(previousMonth.weeks).length - 1] && previousMonth.weeks[Object.keys(previousMonth.weeks).length - 1].days && !previousMonth.weeks[Object.keys(previousMonth.weeks).length - 1].days[6] ? this.weekNumber : this.weekNumber + 1;
            let days = this.generateDays(year, month, currentCountDays, weekIndex);

            weeks.push({
                weekNumber: this.weekNumber,
                selected: false,
                month: this.month.indexOf(month) + 1,
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

        for (let i = 0; i < 7; i++) {
            if (this.daysName(this.month.indexOf(month), year, this.dayNumber).getDay() === i) {
                days.push({
                    number: this.dayNumber,
                    selected: false,
                    date: this.daysName(this.month.indexOf(month), year, this.dayNumber),
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
        let d = new Date(year, month + 1, 0);
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
        let firstOfMonth = this.daysName(month_number, year, 1);
        let numberOfDaysInMonth = this.daysInMonth(month_number, year);
        let notSunStart = 0;
        let daysInFirstWeek = 0;

        if (firstOfMonth.getDay() !== 0) {
            daysInFirstWeek = 6 - firstOfMonth.getDay() + 1;
            notSunStart++;
        }

        return Math.ceil((numberOfDaysInMonth - daysInFirstWeek) / 7) + notSunStart;
    }

    private pullTranslations(language: string) {
        this._language = this._languageHandler.get(language);

        if (this._language) {
            this.month = this._language.month;
            this.monthShort = this._language.monthShort;
            this.days = this._language.days;
            this.daysMiddle = this._language.daysMiddle;
            this.daysShort = this._language.daysShort;
        }
    }
}
