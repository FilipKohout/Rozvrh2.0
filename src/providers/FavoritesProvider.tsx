import { createContext, type SetStateAction } from "react";
import * as React from "react";

export interface FavoritesContextType {
    groups: string[];
    setGroups: React.Dispatch<SetStateAction<string[]>>;
}

export const FavoritesContext = createContext<FavoritesContextType>({} as FavoritesContextType);

export const FavoritesProvider = ({ children }: {children: React.ReactNode}) => {
    const [favorites, setFavorites] = React.useState<string[]>([]);

    return (
        <FavoritesContext.Provider value={{ favorites, setFavorites }}>
            {children}
        </FavoritesContext.Provider>
    )
}