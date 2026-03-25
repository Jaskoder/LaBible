import { useEffect, useState } from "react";
import { SettingsContex, ViewContext, PointsContex, SearchContext, useTheme } from "./helpers/hooks";

import ApplicationSideBar from "./components/sidebar";
import ApplicationContentDisplayer from "./components/content";
import SettingBox from "./components/settingsBox";
import BookMarks from "./components/bookmarks";
import SearchScreen from "./components/searchscreen";

import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function AppComponent({ children }) {

  const [theme] = useTheme();

  useEffect(() => {

    localStorage.setItem('bible_app_theme', theme);
  }, [theme])

  return (
    <div className={`app ${theme} flex h-screen`}>
      {children}
    </div>
  )
}

function App() {
  const [currentView, setCurrentView] = useState("bible");
  const [points, setPoints] = useState({ book: 1, chapter: 1 });
  const [search, setSearch] = useState(null);
  const [settings, setSettings] = useState({
    theme: localStorage.getItem('bible_app_theme') || 'dark',
    appFont: "",
  });

  return (
    <SettingsContex.Provider value={[settings, setSettings]}>
      <ViewContext.Provider value={[currentView, setCurrentView]}>
        <PointsContex.Provider value={[points, setPoints]}>
          <SearchContext.Provider value={[search, setSearch]}>
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
                {currentView === "bookmarks" && <BookMarks></BookMarks>}
                {currentView === "notes" && <h1>Notes</h1>}
                {currentView === "settings" && <SettingBox></SettingBox>}
                {currentView === "search" && <SearchScreen></SearchScreen>}
              </div>
            </AppComponent>
          </SearchContext.Provider>
        </PointsContex.Provider>
      </ViewContext.Provider>
    </SettingsContex.Provider>
  );
}

export default App;
