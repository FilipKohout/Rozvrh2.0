export interface Subject {
    title: string;
    teacher: string;
    room: string;
    warning: boolean;
    group?: string;
}

export type HoursMinutes = { hours: number; minutes: number; }
export type Filters = {
    domain: string;
    time: string;
    class: string;
}

export class TimeSpan {
    from: HoursMinutes;
    to: HoursMinutes;

    constructor(text: string) {
        const split = text.split(' - ');

        const from = split[0].split(':');
        const to = split[1].split(':');

        this.from = { hours: parseInt(from[0]), minutes: parseInt(from[1]) };
        this.to = { hours: parseInt(to[0]), minutes: parseInt(to[1]) };
    }

    toString = () => `${this.from.hours}:${this.from.minutes} - ${this.to.hours}:${this.to.minutes}`;
}

export const defaultTimetable = {
    subjects: [[], [], [], [], []] as Subject[][][],
    classes: new Map<string, string>(),
    groups: [] as string[],
    times: [] as TimeSpan[]
}

export async function getTimetable(filters: Filters): Promise<typeof defaultTimetable> {
    const url = filters.class !== ''
        ? `${filters.domain}/Timetable/Public/${filters.time}/Class/${filters.class}`
        : `${filters.domain}/Timetable/Public`;
    const response = await fetch(url);
    const html = await response.text();

    const newTable = structuredClone(defaultTimetable);
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const $$ = (selector: string) => doc.querySelectorAll(selector);
    const rows = $$(".bk-timetable-row");
    const hours = $$(".bk-hour-wrapper");
    const classes = $$("#selectedClass option");

    rows.forEach((row, weekDay) => {
        const cells = row.querySelectorAll(".bk-timetable-cell");

        cells.forEach((cell, cellIndex) => {
            const multi = cell.querySelectorAll(".multi");
            const subjects: Subject[] = [];

            const addSubject = (element: Element) => {
                const subject = element.querySelector(".middle")?.innerHTML;
                const teacher = element.querySelector(".bottom span")?.innerHTML;
                const group = element.querySelector(".left div")?.innerHTML;
                const room = element.querySelector(".right div")?.innerHTML;
                const warning = element.querySelector(".day-item-hover")?.classList.contains('pink');

                if (subject && teacher && room)
                    subjects.push({ title: subject, teacher: teacher, group: group, room: room, warning: warning || false });

                if (group && !newTable.groups.find(value => value == group))
                    newTable.groups.push(group);
            };

            if (multi.length == 0) addSubject(cell);
            else multi.forEach((subjectElement) => addSubject(subjectElement));

            newTable.subjects[weekDay][cellIndex] = subjects;
        });
    });

    hours.forEach((hour, hourIndex) => {
        const spans = hour.querySelectorAll("span");
        let text = "";

        if (spans) {
            spans.forEach((span) => text = text + span.innerHTML);
        }

        newTable.times[hourIndex] = new TimeSpan(text);
    });

    classes.forEach((_class) => {
        if ((_class as HTMLOptionElement).value != '') {
            newTable.classes.set((_class as HTMLOptionElement).value, _class.innerHTML.replace(/\s/g, '').replace(/\r?\n|\r/, ''));
        }
    });

    console.log(newTable);

    return newTable;
}