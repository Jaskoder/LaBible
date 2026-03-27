import { useTitle, useView } from "../helpers/hooks";

function SideBarNavigationItems() {

    const [title, setTitle] = useTitle();
    const [view, setView]  = useView();

    const links = [
        { icon: 'book', label: 'La Bible', view: 'bible', title : 'La Bible' },
        { icon: 'bi bi-bookmark', label: 'Marques', view: 'bookmarks', title : 'Marques pages' },
        { icon: 'pen', label: 'Notes', view: 'notes', title : 'Notes' },
        { icon: 'search', label : 'Recherche', view : 'search', title : 'Recherche'}
    ];

    const handleClick = (view, vtitle) => {
        setTitle(vtitle);
        setView(view);
    }
    return (
        <div className="nav-items mt-4 mb-4">
            {
                links.map((link) => (
                    <li key={link.icon} 
                        className={`nav-item ${ view === link.view && 'active'}`} 
                        onClick={() => handleClick(link.view, link.title)}
                    >
                        <i className={`bi bi-${link.icon}`}></i>
                        <span className="tooltip">{link.label}</span>
                    </li>
                ))
            }
        </div>
    )
}

export default SideBarNavigationItems;