function SideBarNavigationItems({ safeOpen, setView }) {

    const links = [
        { icon: 'book', label: 'La Bible', view: 'bible' },
        { icon: 'bi bi-bookmark', label: 'Marques', view: 'bookmarks' },
        { icon: 'pen', label: 'Notes', view: 'notes' },
    ];

    const handleClick = (view) => {
        safeOpen();
        setView(view);
    }
    return (
        <div className="nav-items mt-4 mb-4">
            {
                links.map((link) => (
                    <li key={link.icon} className="nav-item" onClick={() => handleClick(link.view)}>
                        <i className={`bi bi-${link.icon}`}></i>
                        <span className="tooltip">{link.label}</span>
                    </li>
                ))
            }
        </div>
    )
}

export default SideBarNavigationItems;