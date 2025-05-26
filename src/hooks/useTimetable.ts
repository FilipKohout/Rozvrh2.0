import { defaultTimetable, type Filters, getTimetable } from "../services/timetable.ts";
import { useQuery } from "@tanstack/react-query";

export default function useTimetable(filters: Filters) {
    return useQuery<typeof defaultTimetable>({
        initialData: defaultTimetable,
        queryFn() {
            return getTimetable(filters);
        },
        queryKey: ['timetable', filters],
    });
}