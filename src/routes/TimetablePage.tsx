import Timetable from "../components/Timetable.tsx";
import { useParams } from "react-router";

export default function TimetablePage() {
    const { schoolId, time, class: className } = useParams();

    if (!time) return <h1>Invalid time</h1>;
    if (!className) return <h1>Invalid class</h1>;
    if (!schoolId) return <h1>Invalid school id</h1>;

    return (
        <Timetable filters={{
            domain: "https://delta-skola.bakalari.cz/",
            time: time,
            class: className,
        }} />
    );
}