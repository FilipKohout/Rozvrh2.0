import { createContext, type SetStateAction } from "react";
import * as React from "react";
import type { Filters } from "../services/timetableAPI.ts";

export interface FiltersContextType {
    filters: Filters | null;
    setFilters: React.Dispatch<SetStateAction<Filters | null>>;
}

export const FiltersContext = createContext<FiltersContextType>({} as FiltersContextType);

export const FiltersProvider = ({ children }: {children: React.ReactNode}) => {
    const [filters, setFilters] = React.useState<Filters | null>(null);

    return (
        <FiltersContext.Provider value={{ filters, setFilters }}>
            {children}
        </FiltersContext.Provider>
    )
}