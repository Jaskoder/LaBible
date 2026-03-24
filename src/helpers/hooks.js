import { createContext, useContext } from "react";

export const SettingsContex = createContext({});

export const useTheme = () => {

    const [settings, setSettings] = useContext(SettingsContex);

    const setTheme = (theme) => setSettings((prev) => ({ ...prev, ['theme']: theme }))


    return [settings.theme, setTheme];
}