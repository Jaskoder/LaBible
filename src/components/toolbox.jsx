function SidebarToolBox({ safeOpen, setView }) {

    const handleClick = (name) => {
        setView(name);
        safeOpen()
    };
    return (
        <div className="toolbox">
            <li className="item" onClick={() => handleClick('settings')}>
                <i className="bi bi-gear"></i>
                <span className="tooltip">Reglages</span>
            </li>
            <li className="item" onClick={() => handleClick('user')}>
                <i className="bi bi-person"></i>
                <span className="tooltip">Utilisateur</span>
            </li>
        </div>
    )
}

export default SidebarToolBox;