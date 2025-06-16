import { useCallback, useEffect, useState } from "react";
import useMunicipalities from "../hooks/useMunicipalities.ts";
import useSchools from "../hooks/useSchools.ts";
import { useSchoolId } from "../hooks/useSchool.ts";
import useTimetable from "../hooks/useTimetable.ts";
import { Link } from "react-router";
import SearchSelect from "../components/SearchSelect.tsx";

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

    const schoolVisible = schools && sSuccess && schools.length > 0;
    const classVisible = timetable && tSuccess && Array.from(timetable.classes).length > 0;

    return (
        <div className="flex flex-col items-center justify-center gap-4 p-4 h-screen overflow-hidden">
            {munis && mSuccess && munis.length > 0 &&
                <div
                    className="flex flex-col items-center p-1 justify-center gap-2 transition-all duration-1000 ease-in-out">
                    <h1>Select Your Municipality</h1>
                    <SearchSelect
                        options={munis.map((option) => ({
                            value: option.name,
                            label: option.name
                        }))}
                        onChange={option => setMunicipality(option?.value || "")}
                        value={municipality} />
                </div>
            }
            <p className={mError ? "" : "hidden"}>Error fetching municipalities</p>
            <p className={mLoading ? "" : "hidden"}>Loading municipalities</p>

            <div className={`flex flex-col items-center p-1 justify-center gap-2 transition-all duration-700 ease-in-out overflow-hidden ${municipality === "" ? "max-h-0 opacity-0 pointer-events-none" : "max-h-64 opacity-100"}`}>
                <h1 className={schoolVisible ? "" : "hidden"}>Select Your School</h1>
                {schoolVisible &&
                    <SearchSelect
                        options={schools.map((option) => ({
                            value: option.id,
                            label: option.name
                        }))}
                        onChange={option => setSchoolId(option?.value || "")}
                        value={schoolId} />
                }
                <p className={sError ? "" : "hidden"}>Error fetching schools</p>
                <p className={sLoading ? "" : "hidden"}>Loading schools</p>
            </div>

            <div
                className={`flex flex-col items-center p-1 justify-center gap-2 transition-all duration-700 ease-in-out overflow-hidden ${(municipality !== "" && schoolId !== "") ? "max-h-64 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
                <h1 className={classVisible ? "" : "hidden"}>Select Your Class</h1>
                {classVisible &&
                    <select value={classId}
                            onChange={(e) => setClassId(e.target.value)}>
                        <option></option>
                        <ClassOptions/>
                    </select>
                }
                <p className={tError ? "" : "hidden"}>This school's Bakaláři timetable domain can't be accessed or it
                    doesn't exist</p>
                <p className={tLoading ? "" : "hidden"}>Loading classes</p>
                <p className={(!tLoading && !tError && timetable && Array.from(timetable.classes).length == 0) ? "" : "hidden"}>This
                    school's Bakaláři timetable is private</p>
            </div>

            <Link to={`/timetable/${municipality}/${schoolId}/${classId}`} className={`transition-all duration-700 p-0.5 ease-in-out overflow-hidden ${(municipality != "" && schoolId != "" && classId != "") ? "max-h-64 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
                <button>View Timetable</button>
            </Link>
        </div>
    )
}