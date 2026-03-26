import { useEffect, useState } from "react";
import {
  AlertContext,
  SettingsContex,
  ViewContext,
  PointsContex,
  SearchContext,
  SearchValueContext,
  useTheme,
  ContentTitleContext
} from "./helpers/hooks";

import AlertBox from "./components/alert";
import ApplicationSideBar from "./components/sidebar";
import Content from "./components/content";
import SettingBox from "./components/settingsBox";
import BookMarks from "./components/bookmarks";
import SearchScreen from "./components/searchscreen";
import Reader from "./components/reader";

import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function AppComponent({ children }) {

  const [theme] = useTheme();
  useEffect(() => {
    localStorage.setItem('bible_app_theme', theme);
  }, [theme]);

  return (
    <div className={`app ${theme} flex h-screen`}>{children}</div>
  )
}

function App() {

  const [alert, setAlert] = useState({ message: '', type: '' });
  const [currentView, setCurrentView] = useState("bible");
  const [title, setTitle] = useState('La Bible');
  const [points, setPoints] = useState({ book: 1, chapter: 1 });
  const [search, setSearch] = useState(null);
  const [value, setValue] = useState('');
  const [settings, setSettings] = useState({
    theme: localStorage.getItem('bible_app_theme') || 'dark',
    appFont: "",
  });

  return (
    <AlertContext.Provider value={[alert, setAlert]}>
      <SettingsContex.Provider value={[settings, setSettings]}>
        <ViewContext.Provider value={[currentView, setCurrentView]}>
          <PointsContex.Provider value={[points, setPoints]}>
            <SearchContext.Provider value={[search, setSearch]}>
              <SearchValueContext.Provider value={[value, setValue]}>
                <ContentTitleContext.Provider value={[title, setTitle]}>
                  <AppComponent>
                    <ApplicationSideBar currentView={currentView} setCurrentView={setCurrentView}></ApplicationSideBar>
                    <Content>
                      {currentView === 'bible' && (<Reader />)}
                      {currentView === 'bookmarks' && (<BookMarks />)}
                      {currentView === 'settings' && (<SettingBox />)}
                      {currentView === 'search' && (<SearchScreen />)}
                      {currentView === 'notes' && (<h1>Notes</h1>)}
                    </Content>
                    { alert.message && <AlertBox></AlertBox>}
                  </AppComponent>
                </ContentTitleContext.Provider>
              </SearchValueContext.Provider>
            </SearchContext.Provider>
          </PointsContex.Provider>
        </ViewContext.Provider>
      </SettingsContex.Provider>
    </AlertContext.Provider>
  );
}

export default App;
