import { defaultTimetable, type Filters, getTimetable } from "../services/timetable.ts";
import { useQuery } from "@tanstack/react-query";

export default function useTimetable(filters: Filters | null | undefined) {
    return useQuery<typeof defaultTimetable | null | undefined>({
        initialData: defaultTimetable,
        queryFn() {
            return getTimetable(filters);
        },
        queryKey: ['timetable', filters],
    });
}