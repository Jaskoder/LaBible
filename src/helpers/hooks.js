import { createContext, useContext, useState } from "react";

export const SettingsContex = createContext({});
export const ViewContext = createContext('bible');
export const PointsContex = createContext({ book: 1, chapter: 1 });
export const SearchContext = createContext(null);
export const SearchValueContext = createContext('');
 
export const useTheme = () => {

    const [settings, setSettings] = useContext(SettingsContex);

    const setTheme = (theme) => setSettings((prev) => ({ ...prev, ['theme']: theme }))


    return [settings.theme, setTheme];
}

export const useView = () => {

    const [view, setView] = useContext(ViewContext);

    return [view, setView]
}

export const usePoints = () => {

    const [points, setPoints] = useContext(PointsContex);

    return [points, setPoints]
}

export const useSearch = () => {

    const [search, setSearch] = useContext(SearchContext);

    return [search, setSearch]
}

export const useValue = () => {

    return useContext(SearchValueContext);
}