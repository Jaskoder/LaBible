import ApplicationSideBar from "./components/sidebar";
import ApplicationContentDisplayer from "./components/content";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";

function App() {
    
  return (
    <div className="app dark h-screen flex">
      <ApplicationSideBar></ApplicationSideBar>
      <ApplicationContentDisplayer title={'La Bible'}></ApplicationContentDisplayer>
    </div>
  )
}

export default App;