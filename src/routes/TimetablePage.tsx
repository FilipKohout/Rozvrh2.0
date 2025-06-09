import Timetable from "../components/Timetable.tsx";
import { useParams } from "react-router";
import { useSchoolId } from "../hooks/useSchool.ts";
import Timer from "../components/Timer.tsx";
import { useContext, useEffect } from "react";
import { FiltersContext } from "../providers/FiltersProvider.tsx";
import { TimeProvider } from "../providers/TimeProvider.tsx";
import TimetableOptions from "../components/TimetableOptions.tsx";

export default function TimetablePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const time = urlParams.get("time") || "Actual";
    const counterMode = urlParams.get("counter") || "false";

    const { municipality, schoolId, classId } = useParams();
    const school = useSchoolId(municipality || "", schoolId || "");
    const { setFilters } = useContext(FiltersContext);

    useEffect(() => {
        if (school && classId) {
            setFilters({
                domain: school.schoolUrl,
                time,
                classId,
            });
        }
    }, [school, classId, time]);

    if (!municipality) return <h1>Invalid municipality</h1>;
    if (!schoolId) return <h1>Invalid school id</h1>;
    if (!classId) return <h1>Invalid class id</h1>;
    if (!school) return <h1>Error finding or fetching the school</h1>;

    return (
        <>
            <div className="mt-4">
                <TimeProvider>
                    <Timer/>
                </TimeProvider>
                {counterMode === "false" &&
                    <>
                        <TimetableOptions />
                        <Timetable/>
                    </>
                }
            </div>
        </>
    );
}