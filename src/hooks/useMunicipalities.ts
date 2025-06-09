import { useQuery } from "@tanstack/react-query";
import { getMunicipalities, type Municipality } from "../services/schoolListAPI.ts";

export default function useMunicipalities() {
    return useQuery<Municipality[]>({
        initialData: [],
        queryFn() {
            return getMunicipalities();
        },
        queryKey: ['municipalities'],
    });
}