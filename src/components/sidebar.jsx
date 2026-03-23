import { useState } from "react"

import ApplicationSearchBar from "./searchbar";
import SideBarNavigationItems from "./navitems";
import SidebarToolBox from "./toolbox";

import "./styles/sidebar.css";

function ApplicationSideBar() {

    const [open, setOpen] = useState(true);

    const safeOpen = () => !open && setOpen(true);

    return (
        <div className={`sidebar ${open && 'open'}`}>
            <div className="toogle-button mb-4">
                <button onClick={() => setOpen(!open)}>
                    <i className="bi bi-list"></i>
                </button>
            </div>
            <ApplicationSearchBar safeOpen={safeOpen}></ApplicationSearchBar>
            <SideBarNavigationItems open={open} setOpen={setOpen}></SideBarNavigationItems>
            <SidebarToolBox></SidebarToolBox>
        </div>
    )
}

export default ApplicationSideBar