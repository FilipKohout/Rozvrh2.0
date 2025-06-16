import { createContext, type SetStateAction, useEffect } from "react";
import * as React from "react";
import { FiltersContext } from "./FiltersProvider.tsx";

export interface GroupsContextType {
    groups: string[];
    setGroups: React.Dispatch<SetStateAction<string[]>>;
}

export const GroupsContext = createContext<GroupsContextType>({} as GroupsContextType);

export const GroupsProvider = ({ children }: {children: React.ReactNode}) => {
    const { filters } = React.useContext(FiltersContext);
    const [groups, setGroups] = React.useState<string[]>([]);

    useEffect(() => {
        setGroups(
            JSON.parse(window.localStorage.getItem(`filters|${filters?.domain}|${filters?.classId}`) || "[]")
        );
    }, [filters]);

    useEffect(() => {
        window.localStorage.setItem(`filters|${filters?.domain}|${filters?.classId}`, JSON.stringify(groups));
    }, [groups]);

    return (
        <GroupsContext.Provider value={{ groups, setGroups }}>
            {children}
        </GroupsContext.Provider>
    )
}