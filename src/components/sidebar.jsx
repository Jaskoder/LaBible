import { useState } from "react"

import ApplicationSearchBar from "./searchbar";
import SideBarNavigationItems from "./navitems";
import SidebarToolBox from "./toolbox";

import "./styles/sidebar.css";

function ApplicationSideBar({currentView, setCurrentView}) {

    const [open, setOpen] = useState(true);

    const safeOpen = () => !open && setOpen(true);
    const setView = (name) => currentView !== name && setCurrentView(name);

    return (
        <div className={`sidebar ${open && 'open'}`}>
            <div className="toogle-button mb-4">
                <button onClick={() => setOpen(!open)}>
                    <i className="bi bi-list"></i>
                </button>
            </div>
            <ApplicationSearchBar safeOpen={safeOpen} ></ApplicationSearchBar>
            <SideBarNavigationItems safeOpen={safeOpen} setView={setView}></SideBarNavigationItems>
            <SidebarToolBox safeOpen={safeOpen} setView={setView}></SidebarToolBox>
        </div>
    )
}

export default ApplicationSideBar