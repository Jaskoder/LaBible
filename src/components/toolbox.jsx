import { useTitle, useView } from "../helpers/hooks";

function SidebarToolBox({ safeOpen }) {

    const [_, setView] = useView();
    const [title, setTitle] = useTitle();

    const handleClick = (name, title) => {

        setTitle(title);
        setView(name);
    };
    return (
        <div className="toolbox">
            <li className="item" onClick={() => handleClick('settings', 'Réglages')}>
                <i className="bi bi-gear"></i>
                <span className="tooltip">Reglages</span>
            </li>
        </div>
    )
}

export default SidebarToolBox;