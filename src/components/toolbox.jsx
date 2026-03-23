function SidebarToolBox( ) {
    return (
        <div className="toolbox">
            <li className="item">
                <i className="bi bi-gear"></i>
                <span className="tooltip">Reglages</span>
            </li>
            <li className="item">
                <i className="bi bi-person"></i>
                <span className="tooltip">Utilisateur</span>
            </li>
        </div>
    )
}

export default SidebarToolBox;