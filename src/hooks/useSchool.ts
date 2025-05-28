import useSchools from "./useSchools.ts";
import { useMemo } from "react";

export function useSchoolId(municipality: string, schoolId: string) {
    const { data } = useSchools(municipality);
    console.log(data);
    const school = useMemo(() =>
            (data || []).find(school => school.id == schoolId),
        [data, schoolId]
    );

    return school
}

export function useSchoolName(municipality: string, schoolName: string) {
    const { data } = useSchools(municipality);
    const school = useMemo(() => 
        (data || []).find(school => school.name == schoolName), 
        [data, schoolName]
    );

    return school;
}