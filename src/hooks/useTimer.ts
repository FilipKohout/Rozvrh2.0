import { useContext, useEffect, useState } from "react";
import useTimetable from "./useTimetable";
import { type CurrentClass, TimeContext } from "../providers/TimeProvider.tsx";
import { GroupsContext } from "../providers/GroupsProvider.tsx";
import type { Subject } from "../services/timetable.ts";

type TimerData = {
    current: number;
    end: number;
}

export default function useTimer() {
    const { data, isError, isLoading } = useTimetable();
    const [time, setTime] = useState<TimerData | null>(null);
    const [running, setRunning] = useState(false);

    const { timerPrefix, currentClass, setTimerPrefix, setCurrentClass } = useContext(TimeContext);
    const { groups } = useContext(GroupsContext);

    const filterSubjectGroup = (subjectGroup: Subject[]) => structuredClone(subjectGroup).filter(
        subject => groups.length == 0 || groups.find(g => g == subject.group) || subject.group == ""
    );

    useEffect(() => {
        if (data == null) return;

        setRunning(true);

        const date = new Date();
        const [hour, minute, second] = [date.getHours(), date.getMinutes(), date.getSeconds()];
        let day = date.getDay();

        if (day === 0)
            day = 7;

        day--;

        if (day > 4) {
            setTimerPrefix("🎉It's weekend🎉");
            setTime(null);
            return;
        }

        let isBreak = false;
        let current = data.subjects[day]?.findIndex((_subject, index) => {
            const time = data.times[index];
            const prev = data.times[index - 1];

            if (time && Number(time.from.minutes) + time.from.hours * 60 <= minute + hour * 60 && Number(time.to.minutes) + time.to.hours * 60 > minute + hour * 60)
                return true;
            else if (time && prev && Number(prev.to.minutes) + prev.to.hours * 60 <= minute + hour * 60 && Number(time.from.minutes) + time.from.hours * 60 > minute + hour * 60) {
                isBreak = true;
                return true;
            }
        })

        if (current === -1) {
            setTimerPrefix("No classes now");
            setTime(null);
            return;
        }

        let subjects = filterSubjectGroup(data.subjects[day][current]);
        const nextSubjects = filterSubjectGroup(data.subjects[day][current + 1] ?? []);

        if (subjects.length === 0 && nextSubjects.length !== 0) {
            isBreak = true;
            subjects = nextSubjects;
            current++;
        }

        const currentClassData: CurrentClass = {
            subjects: subjects,
            index: current,
            day: day
        };

        let end = structuredClone(data.subjects[day])?.reverse().findIndex(
            subjectGroup => filterSubjectGroup(subjectGroup)?.length !== 0
        )

        if (end !== -1) end = data.times.length - end;

        const time = data.times[current];
        const endTime = data.times[end - 1];

        if (isBreak) {
            setTimerPrefix("Class starts in");
            setTime({
                current: (time.from.hours * 3600 + time.from.minutes * 60) - (hour * 3600 + minute * 60 + second),
                end: (endTime.to.hours * 3600 + endTime.to.minutes * 60) - (hour * 3600 + minute * 60 + second)
            });
            setCurrentClass(currentClassData);
        } else {
            setTimerPrefix("Class ends in");
            setTime({
                current: (time.to.hours * 3600 + time.to.minutes * 60) - (hour * 3600 + minute * 60 + second),
                end: (endTime.to.hours * 3600 + endTime.to.minutes * 60) - (hour * 3600 + minute * 60 + second)
            });
            setCurrentClass(currentClassData);
        }

        const timer = setInterval(() => {
            setTime(prevTime => {
                if (prevTime == null || prevTime.current === 0) {
                    clearInterval(timer);
                    setCurrentClass(null);
                    setRunning(false);
                    return null;
                } else
                    return {
                        current: prevTime.current - 1,
                        end: prevTime.end - 1
                    };
            });
        }, 1000);

        return () => {
            clearInterval(timer);
        }
    }, [data, running, groups]);

    return {
        timerPrefix,
        time,
        currentClass,
        isLoading,
        isError
    };
}