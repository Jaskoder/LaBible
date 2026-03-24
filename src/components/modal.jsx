import { markVerse } from '../helpers/marker';

import './styles/modal.css';

export default function Modal({ verse, style, setMark, setModal, ...props }) {


    const controls = [
        { label: 'Marquer', action: 'mark', icon: 'bookmarks' },
        { label: 'Ajouter aux notes', action: 'note', icon: 'pen' },
        { label: 'Partager', action: 'share', icon: 'share' },
    ]

    const colorMarks = ['green', 'red', 'blue', 'yellow'];

    const handleMarkClick = (mark) => {
        markVerse(verse, mark);
        setMark(mark);
    };

    return (
        <div className="modal" {...props} style={style}>
            <div className="verse">
                <p>{verse.text}</p>
            </div>
            <div className="actions">
                {
                    controls.map((c) => (
                        <li key={c.add}>
                            <i className={`bi bi-${c.icon}`}></i>
                            <span className='tooltip'>{c.label}</span>
                        </li>
                    ))
                }
            </div>
            <div className="marks">
                {
                    colorMarks.map((c) => (
                        <span
                            key={c}
                            className={`mark active ${c}`}
                            onClick={() => handleMarkClick(c)}
                        ></span>
                    ))
                }
                <button className='copy'>
                    <i className='bi bi-clipboard'></i>
                </button>
                <button className='close' onClick={() => setModal(false)}>
                    <i className='bi bi-x'></i>
                </button>
            </div>
        </div>
    )
}