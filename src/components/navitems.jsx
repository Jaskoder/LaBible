function SideBarNavigationItems({open, setOpen}) {

    const links = [
        { icon: 'book', label: 'La Bible' },
        { icon: 'bi bi-bookmark', label: 'Marques' },
        { icon: 'pen', label: 'Notes' },
    ];

    const handleClick = () => {

        if(!open) setOpen(true);
    }
    return (
        <div className="nav-items mt-4 mb-4">
            {
                links.map((link) => (
                    <li className="nav-item" onClick={handleClick}>
                        <i className={`bi bi-${link.icon}`}></i>
                        <span className="tooltip">{link.label}</span>
                    </li>
                ))
            }
        </div>
    )
}

export default SideBarNavigationItems;