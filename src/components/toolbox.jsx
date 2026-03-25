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
        </div>
    )
}

export default SidebarToolBox;