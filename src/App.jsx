import ApplicationSideBar from "./components/sidebar";
import ApplicationContentDisplayer from "./components/content";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";

function App() {

  const [currentView, setCurrentView] = useState('bookmarks');

  return (
    <div className="app dark h-screen flex">
      <ApplicationSideBar
        currentView={currentView}
        setCurrentView={setCurrentView}
      ></ApplicationSideBar>

      {currentView === 'bible' && (
        <ApplicationContentDisplayer title={'La Bible'}></ApplicationContentDisplayer>
      )}
      {currentView === 'bookmarks' && (
        <h1>BookMarks</h1>
      )}
      {currentView === 'notes' && (
        <h1>Notes</h1>
      )}
      {currentView === 'settings' && (
        <h1>Settings</h1>
      )}
      {currentView === 'user' && (
        <h1>User</h1>
      )}
    </div>
  )
}

export default App;