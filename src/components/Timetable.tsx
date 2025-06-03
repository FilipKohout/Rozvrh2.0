import useTimetable from "../hooks/useTimetable.ts";
import Subject from "./Subject.tsx";

export default function Timetable() {
    const { data, isError, isLoading } = useTimetable();

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
                                        <h1 className="mx-0 text-center my-1.5 font-extrabold text-4xl">{hourIndex}</h1>
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
                                    <td key={subjectGroupIndex} className="flex flex-col justify-center">
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