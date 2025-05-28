import { useCallback, useEffect, useState } from "react";
import useMunicipalities from "../hooks/useMunicipalities.ts";
import useSchools from "../hooks/useSchools.ts";
import { useSchoolId } from "../hooks/useSchool.ts";
import useTimetable from "../hooks/useTimetable.ts";
import { Link } from "react-router";

export default function InitPage() {
    const [municipality, setMunicipality] = useState("");
    const [schoolId, setSchoolId] = useState("");
    const [classId, setClassId] = useState("");
    const school = useSchoolId(municipality, schoolId);

    const { data: munis, isError: mError, isFetching: mLoading, isSuccess: mSuccess } = useMunicipalities();
    const { data: schools, isError: sError, isFetching: sLoading, isSuccess: sSuccess } = useSchools(municipality);
    const { data: timetable, isError: tError, isFetching: tLoading, isSuccess: tSuccess } = useTimetable(school && {
        domain: school?.schoolUrl,
        classId: "",
        time: "Actual",
    });

    const MunicipalityOptions = useCallback(() => {
        return munis && (
            munis.map(option =>
                <option key={option.name} value={option.name}>
                    {option.name}
                </option>
            )
        )
    }, [munis]);

    const SchoolOptions = useCallback(() => {
        return schools && (
            schools.map(option =>
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
            )
        )
    }, [schools]);

    const ClassOptions = useCallback(() => {
        return timetable && timetable.classes && (
            Array.from(timetable.classes).map(option =>
                <option key={option[0]} value={option[0]}>
                    {option[1]}
                </option>
            )
        )
    }, [timetable]);

    useEffect(() => {
        setClassId("");
        setSchoolId("");
    }, [municipality]);

    useEffect(() => {
        setClassId("");
    }, [schoolId]);

    return (
        <div className="flex flex-col items-center justify-center gap-4 p-4 transition-all">
            {munis && mSuccess && munis.length > 0 &&
                <>
                    <h1>Select Your Municipality</h1>
                    <select value={municipality} onChange={(e) => setMunicipality(e.target.value)}>
                        <option></option>
                        <MunicipalityOptions/>
                    </select>
                </>
            }
            {mError && (<p>Error fetching municipalities</p>)}
            {mLoading && (<p>Loading municipalities</p>)}

            {municipality != "" &&
                <>
                    {schools && sSuccess && schools.length > 0 &&
                        <>
                            <h1>Select Your School</h1>
                            <select value={schoolId} onChange={(e) => setSchoolId(e.target.value)}>
                                <option></option>
                                <SchoolOptions/>
                            </select>
                        </>
                    }
                    {sError && (<p>Error fetching schools</p>)}
                    {sLoading && (<p>Loading schools</p>)}
                </>
            }

            {municipality != "" && schoolId != "" &&
                <>
                    {timetable && tSuccess && Array.from(timetable.classes).length > 0 &&
                        <>
                            <h1>Select Your Class</h1>
                            <select value={classId} onChange={(e) => setClassId(e.target.value)}>
                                <option></option>
                                <ClassOptions/>
                            </select>
                        </>
                    }
                    {tError && (<p>This school's Bakaláři timetable domain can't be accessed or it doesn't exist</p>)}
                    {tLoading && (<p>Loading classes</p>)}
                    {!tLoading && !tError && timetable && Array.from(timetable.classes).length == 0 && (<p>This school's Bakaláři timetable is private</p>)}
                </>
            }

            {municipality != "" && schoolId != "" && classId != "" &&
                <Link to={`/timetable/${municipality}/${schoolId}/${classId}`}>
                    <button>View Timetable</button>
                </Link>
            }
        </div>
    )
}