import { defaultTimetable, type Filters, getTimetable } from "../services/timetable.ts";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FiltersContext } from "../providers/FiltersProvider.tsx";

export default function useTimetable(filters?: Filters) {
    const { filters: contextFilters } = useContext(FiltersContext);

    return useQuery<typeof defaultTimetable | null | undefined>({
        initialData: defaultTimetable,
        queryFn() {
            return getTimetable(filters ?? contextFilters);
        },
        queryKey: ['timetable', filters],
    });
}