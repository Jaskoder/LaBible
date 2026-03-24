import { useState } from "react";
import { SettingsContex, useTheme } from "./helpers/hooks";

import ApplicationSideBar from "./components/sidebar";
import ApplicationContentDisplayer from "./components/content";
import SettingBox from "./components/settingsBox";

import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function AppComponent({ children }) {

  const [theme] = useTheme();

  return (
    <div className={`app ${theme} flex h-screen`}>
      {children}
    </div>
  )
}

function App() {
  const [currentView, setCurrentView] = useState("bible");
  const [settings, setSettings] = useState({
    theme: "dark",
    appFont: "",
  });

  return (
    <SettingsContex.Provider value={[settings, setSettings]}>
      <AppComponent>
        <ApplicationSideBar
          currentView={currentView}
          setCurrentView={setCurrentView}
        ></ApplicationSideBar>

        <div className="content-view">
          {currentView === "bible" && (
            <ApplicationContentDisplayer
              title={"La Bible"}
            ></ApplicationContentDisplayer>
          )}
          {currentView === "bookmarks" && <h1>BookMarks</h1>}
          {currentView === "notes" && <h1>Notes</h1>}
          {currentView === "settings" && <SettingBox></SettingBox>}
          {currentView === "user" && <h1>User</h1>}
        </div>
      </AppComponent>
    </SettingsContex.Provider>
  );
}

export default App;
