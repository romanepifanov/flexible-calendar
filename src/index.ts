
export class FlexibleCalendar {
	private calendar = {};

	private monthsLarge: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	private dayNames: Array<string> = ['Week #', 'Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

	private dayNumber = 1;
	private weekNumber = 0;

	private currentYear = new Date().getFullYear();
	private currentMonth = new Date().getMonth();

    constructor() { }

    public build = (): any => {
        return this.generateYears();
    }

    private generateYears() {
        const currentDate = new Date;
        var years = {};

        for (var i = currentDate.getFullYear() - 1; i < currentDate.getFullYear() + 1; i++) {
            years[i] = { 'name': i, 'months': this.generateMonths(i) };
            this.weekNumber = 0;
        }

        return { 'years': years };
    }

    private generateMonths(year) {
        var months = {};

        this.monthsLarge.forEach((monthName, index) {
            months[index] = { 'name': monthName, 'weeks': this.generateWeeks(year, monthName, months[index - 1]) };
        });

        return months;
    }

    private generateWeeks(year, month, previousMonth) {

        var week = {
            PhenologicalStage: '',
            cropId: {},
            choosed: false,
            month: this.monthsLarge.indexOf(month) + 1,
            items: [{
                FertilizerName: '',
                Other: '',
                FertilizerAmount: '',
                Units: '',
                Id: null
            }],
            Position: null,
            days: {}
        };

        var weeks = {};
        var currentWeeks = this.weekCount(year, this.monthsLarge.indexOf(month));
        var currentCountDays = this.daysInMonth(this.monthsLarge.indexOf(month), year);
        var weekIndex = 0;

        for (var j = 0; j < currentWeeks; j++) {
            this.weekNumber = j === 0 && previousMonth && previousMonth.weeks[Object.keys(previousMonth.weeks).length - 1] && previousMonth.weeks[Object.keys(previousMonth.weeks).length - 1].days && !previousMonth.weeks[Object.keys(previousMonth.weeks).length - 1].days[6] ? this.weekNumber : this.weekNumber + 1;
            week.showing = this.weekNumber;
            week.Position = year + '-' + month + '-' + weekIndex;
            week.days = this.generateDays(year, month, currentCountDays, weekIndex);
            week['Date'] = this.getDateByDay(week.days);
            weeks[weekIndex] = Object.assign({}, week);
            weekIndex++;
        }

        this.dayNumber = 1;

        return weeks;
    }

    generateDays(year, month, currentCountDays, week) {

        var day = {
            Position: null,
            Id: null,
            namber: 1,
            choosed: false,
            IrrigationVolume: ''
        };
        var days = {};

        for (var i = 0; i < 7; i++) {
            if (this.daysName(this.monthsLarge.indexOf(month), year, this.dayNumber).getDay() === i) {
                day.namber = this.dayNumber;
                day.date = this.daysName(this.monthsLarge.indexOf(month), year, this.dayNumber);
                day.Position = year + '-' + month + '-' + week + '-' + i;
                days[i] = Object.assign({}, day);
                this.dayNumber = this.dayNumber === currentCountDays ? this.dayNumber : this.dayNumber + 1;
            } else {
                days[i] = null;

            }
        }

        return days;
    }

    daysInMonth(month, year) {
        var d = new Date(year, month + 1, 0);
        return d.getDate();
    }

    getDateByDay(days) {
        var date = null;
        Object.keys(days).forEach((day) => {
            if (days[day] && !date) {
                date = days[day].date;
            }
        });

        return date;
    }

    daysName(month, year, day) {
        return new Date(year, month, day);
    }

    weekCount(year, month_number) {
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
