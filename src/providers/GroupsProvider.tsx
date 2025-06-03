import { createContext, type SetStateAction } from "react";
import * as React from "react";

export interface GroupsContextType {
    groups: string[];
    setGroups: React.Dispatch<SetStateAction<string[]>>;
}

export const GroupsContext = createContext<GroupsContextType>({} as GroupsContextType);

export const GroupsProvider = ({ children }: {children: React.ReactNode}) => {
    const [groups, setGroups] = React.useState<string[]>([]);

    return (
        <GroupsContext.Provider value={{ groups, setGroups }}>
            {children}
        </GroupsContext.Provider>
    )
}