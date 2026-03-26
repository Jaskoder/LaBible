import { createContext, useContext, useState } from "react";

export const SettingsContex = createContext({});
export const ViewContext = createContext('bible');
export const PointsContex = createContext({ book: 1, chapter: 1 });
export const SearchContext = createContext(null);
export const SearchValueContext = createContext('');
export const ContentTitleContext = createContext(null);
export const AlertContext = createContext(null);
 
export const useTheme = () => {

    const [settings, setSettings] = useContext(SettingsContex);
    const setTheme = (theme) => setSettings((prev) => ({ ...prev, ['theme']: theme }))
    return [settings.theme, setTheme];
}

export const useView = () => useContext(ViewContext);
export const usePoints = () => useContext(PointsContex);
export const useSearch = () => useContext(SearchContext);
export const useValue = () => useContext(SearchValueContext);
export const useTitle = () => useContext(ContentTitleContext);
export const useAlert = () => useContext(AlertContext);