import { useQuery } from "@tanstack/react-query";
import { getSchools, type School } from "../services/bakalariAPI.ts";

export default function useSchools(municipality: string) {
    return useQuery<School[]>({
        queryFn() {
            return municipality == "" ? [] : getSchools(municipality);
        },
        queryKey: ['municipality', municipality],
    });
}