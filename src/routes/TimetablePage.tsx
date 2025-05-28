import Timetable from "../components/Timetable.tsx";
import { useParams } from "react-router";
import { useSchoolId } from "../hooks/useSchool.ts";

export default function TimetablePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const time = urlParams.get("time") || "Actual";

    const { municipality, schoolId, classId } = useParams();
    const school = useSchoolId(municipality || "", schoolId || "");

    if (!municipality) return <h1>Invalid municipality</h1>;
    if (!schoolId) return <h1>Invalid school id</h1>;
    if (!classId) return <h1>Invalid class id</h1>;
    if (!school) return <h1>Error finding or fetching the school</h1>;

    return (
        <Timetable filters={{
            domain: school.schoolUrl,
            time,
            classId,
        }} />
    );
}