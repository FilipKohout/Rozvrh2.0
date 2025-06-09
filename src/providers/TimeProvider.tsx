import { createContext, type SetStateAction } from "react";
import * as React from "react";
import type { Subject } from "../services/timetableAPI.ts";

export interface CurrentClass {
    subjects: Subject[];
    index: number;
    day: number;
}

export interface TimeContextType {
    timerPrefix: string | null,
    currentClass: CurrentClass | null,

    setTimerPrefix: React.Dispatch<SetStateAction<string | null>>;
    setCurrentClass: React.Dispatch<SetStateAction<CurrentClass | null>>;
}

export const TimeContext = createContext<TimeContextType>({} as TimeContextType);

export const TimeProvider = ({ children }: {children: React.ReactNode}) => {
    const [timerPrefix, setTimerPrefix] = React.useState<string | null>(null);
    const [currentClass, setCurrentClass] = React.useState<CurrentClass | null>(null);

    return (
        <TimeContext.Provider value={{ timerPrefix, currentClass, setTimerPrefix, setCurrentClass }}>
            {children}
        </TimeContext.Provider>
    )
}