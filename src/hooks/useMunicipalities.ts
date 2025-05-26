import { useQuery } from "@tanstack/react-query";
import { getMunicipalities, type Municipality } from "../services/bakalariAPI.ts";

export default function useMunicipalities() {
    return useQuery<Municipality[]>({
        initialData: [],
        queryFn() {
            return getMunicipalities();
        },
        queryKey: ['municipalities'],
    });
}