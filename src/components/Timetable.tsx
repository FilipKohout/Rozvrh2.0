import useTimetable from "../hooks/useTimetable.ts";
import Subject from "./Subject.tsx";
import { useContext } from "react";
import { GroupsContext } from "../providers/GroupsProvider.tsx";

export default function Timetable() {
    const { data, isError, isFetching } = useTimetable();
    const { groups } = useContext(GroupsContext);

    console.log("Timetable data:", data);

    return (
        <div className="flex justify-center">
            <div className="overflow-x-auto rounded max-w-full w-max">
                {isError && <h1>Loading error</h1>}
                {isFetching && <h1>Loading...</h1>}
                {!isFetching && !isError && data &&
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
                                        <td key={subjectGroupIndex} className={"flex flex-col justify-center " + (dayIndex % 2 !== 0 ? "bg-background" : "")}>
                                            {subjectGroup.map((subject, subjectIndex) =>
                                                (groups == null || groups.length === 0 || subject.group == "" || (groups && groups.includes(subject.group!))) &&
                                                    <Subject
                                                        key={`${dayIndex}-${subjectGroupIndex}-${subjectIndex}`}
                                                        subject={subject}
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
        </div>
    )
}