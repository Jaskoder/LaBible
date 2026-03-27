import { useEffect, useState } from "react";
import {
  AlertContext,
  ContentTitleContext,
  PointsContex,
  SearchContext,
  SearchValueContext,
  SettingsContex,
  ViewContext,
  useTheme,
} from "./helpers/hooks";

import AlertBox from "./components/alert";
import ApplicationSideBar from "./components/sidebar";
import BookMarks from "./components/bookmarks";
import Content from "./components/content";
import Reader from "./components/reader";
import SearchScreen from "./components/searchscreen";
import SettingBox from "./components/settingsBox";

import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

function AppComponent({ children }) {

  const [theme] = useTheme();

  useEffect(() => localStorage.setItem('bible_app_theme', theme), [theme]);

  return <div className={`app ${theme} flex h-screen`}>{children}</div>
}

function App() {

  const [alert, setAlert] = useState({ message: '', type: '' });
  const [currentView, setCurrentView] = useState("bible");
  const [points, setPoints] = useState({ book: 1, chapter: 1 });
  const [search, setSearch] = useState(null);
  const [settings, setSettings] = useState({ theme: localStorage.getItem('bible_app_theme') || 'dark' });
  const [title, setTitle] = useState('La Bible');
  const [value, setValue] = useState('');

  return (
    <AlertContext.Provider value={[alert, setAlert]}>
      <ContentTitleContext.Provider value={[title, setTitle]}>
        <PointsContex.Provider value={[points, setPoints]}>
          <SearchContext.Provider value={[search, setSearch]}>
            <SearchValueContext.Provider value={[value, setValue]}>
              <SettingsContex.Provider value={[settings, setSettings]}>
                <ViewContext.Provider value={[currentView, setCurrentView]}>
                  <AppComponent>
                    <ApplicationSideBar currentView={currentView} setCurrentView={setCurrentView}></ApplicationSideBar>
                    <Content>
                      {currentView === 'bible' && (<Reader />)}
                      {currentView === 'bookmarks' && (<BookMarks />)}
                      {currentView === 'settings' && (<SettingBox />)}
                      {currentView === 'search' && (<SearchScreen />)}
                      {currentView === 'notes' && (<h1>Notes</h1>)}
                    </Content>
                    {alert.message && <AlertBox></AlertBox>}
                  </AppComponent>
                </ViewContext.Provider>
              </SettingsContex.Provider>
            </SearchValueContext.Provider>
          </SearchContext.Provider>
        </PointsContex.Provider>
      </ContentTitleContext.Provider>
    </AlertContext.Provider>
  );
}

export default App;