import { Language, Languages } from "../models/language.model";

const en: Language = {
    month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    daysMiddle: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
    daysShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
}

const de: Language = {
    month: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    monthShort: ['Jan', 'Feb', 'März', 'Apr', 'Mai', 'Juni', 'Juli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dez'],
    days: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    daysMiddle: ['Son', 'Mon', 'Die', 'Mit', 'Don', 'Fre', 'Sam'],
    daysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
}

const ru: Language = {
    month: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    daysMiddle: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
    daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
}


class LanguageHandler {
    private languages: Languages = {
        en: en,
        de: de,
        ru: ru
    }

    public get = (name: string): Language => {
        switch (name) {
            case 'de': return this.languages.de
            case 'ru': return this.languages.ru
            case 'en':
            default: return this.languages.en
        }
    }
}

export default LanguageHandler; 