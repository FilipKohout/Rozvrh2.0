import useTimetable from "../hooks/useTimetable.ts";
import Subject from "./Subject.tsx";
import type { Filters } from "../services/timetable.ts";

export default function Timetable({ filters }: { filters: Filters }) {
    const { data, isError, isLoading } = useTimetable(filters)

    return (
        <div className="overflow-x-auto">
            {isError && <h1>Loading error</h1>}
            {isLoading && <h1>Loading...</h1>}
            {!isLoading && !isError && data &&
                <table className="w-max p-0 border-2 border-white/5 rounded-lg border-collapse mx-auto">
                    <thead>
                        <tr className="flex bg-test">
                            {data.times.map((hour, hourIndex) => hour &&
                                <td key={hourIndex} className="flex flex-col justify-center min-h-[80px] max-w-[90px]">
                                    <h1 className="m-0 text-center min-h-[20px]">{hourIndex}</h1>
                                    <p className="text-center m-0">{hour.toString()}</p>
                                </td>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                    {data.subjects.map((day, dayIndex) =>
                        <tr className="flex" key={dayIndex}>
                            {day.map((subjectGroup, subjectGroupIndex) =>
                                <td key={subjectGroupIndex} className="flex flex-col justify-center min-h-[80px] max-w-[90px]">
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