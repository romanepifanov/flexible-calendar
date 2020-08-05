export interface Languages {
    en: Language,
    de: Language,
    ru: Language
}

export interface Language {
    month: Array<string>,
    monthShort: Array<string>,
    days: Array<string>,
    daysMiddle: Array<string>,
    daysShort: Array<string>
}