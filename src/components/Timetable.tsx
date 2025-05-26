import useTimetable from "../hooks/useTimetable.ts";
import Subject from "./Subject.tsx";
import type { Filters } from "../services/timetable.ts";

export default function Timetable({ filters }: { filters: Filters }) {
    const { data, isError, isLoading } = useTimetable(filters)

    return (
        <div className="timetable-layout">
            {isError && <h1>Loading error</h1>}
            {isLoading && <h1>Loading...</h1>}
            {!isLoading && !isError && data &&
                <table className="timetable">
                    <thead>
                        <tr className="times">
                            {data.times.map((hour, hourIndex) => hour &&
                                <td key={hourIndex}>
                                    <h1>{hourIndex}</h1>
                                    <p>{hour.toString()}</p>
                                </td>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                    {data.subjects.map((day, dayIndex) =>
                        <tr className="day" key={dayIndex}>
                            {day.map((subjectGroup, subjectGroupIndex) =>
                                <td key={subjectGroupIndex}>
                                    {subjectGroup.map((subject, subjectIndex) =>
                                        <Subject
                                            key={`${dayIndex}-${subjectGroupIndex}-${subjectIndex}`}
                                            {...subject}
                                        />
                                    )}
                                </td>
                            )}
                        </tr>
                    )}
                    </tbody>
                </table>
            }
        </div>
    )
}