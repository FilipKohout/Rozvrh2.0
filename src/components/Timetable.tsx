import useTimetable from "../hooks/useTimetable.ts";
import Subject from "./Subject.tsx";
import type { Filters } from "../services/timetable.ts";

export default function Timetable({ filters }: { filters: Filters }) {
    const { data, isError, isLoading } = useTimetable(filters)

    return (
        <div className="overflow-x-auto rounded">
            {isError && <h1>Loading error</h1>}
            {isLoading && <h1>Loading...</h1>}
            {!isLoading && !isError && data &&
                <table className="border-2 border-white/5 rounded-lg border-collapse">
                    <thead>
                        <tr className="flex bg-background-alt">
                            {data.times.map((hour, hourIndex) => hour &&
                                <td key={hourIndex}>
                                    <div className="bg-background-alt m-0.5 rounded-lg flex flex-col">
                                        <h1 className="mx-0 text-center min-h-[20px] text-4xl">{hourIndex}</h1>
                                        <p className="text-center m-0 text-xs">{hour.toString()}</p>
                                    </div>
                                </td>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data.subjects.map((day, dayIndex) =>
                            <tr className="flex" key={dayIndex}>
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