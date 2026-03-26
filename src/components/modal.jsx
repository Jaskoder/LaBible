import { useCallback } from 'react';
import { markVerse } from '../helpers/marker';
import { unMarkVerse } from '../helpers/marker';
import { useAlert } from '../helpers/hooks';
import './styles/modal.css';

export default function Modal(props) {

    const [_, setAlert] = useAlert();

    const {
        verse,
        setVmark,
        deleteMark,
        setFocused,
        pos
    } = props;

    const controls = [
        { label: 'Marquer', action: 'mark', icon: 'bookmarks' },
        { label: 'Ajouter aux notes', action: 'note', icon: 'pen' },
        { label: 'Copier', action: 'copy', icon: 'clipboard' },
    ];

    const colorMarks = ['green', 'red', 'blue', 'yellow'];

    const handleMarkClick = (mark) => {
        markVerse(verse, mark);
        setVmark(mark);
        setFocused();
    };

    const createAlert = (message, type) => setAlert({message, type});

    const handleControlsClic = useCallback((action) => {

        switch (action) {
            case 'mark':
                break;
            case 'note':
                break;
            case 'copy':
                navigator.clipboard.writeText(verse.text);
                createAlert('Copié dans le presse-papier', 'success');
                break;
            default:
                break;
        }
    }, [])


    return (
        <div className="modal" style={{
            top: pos.y,
            left: pos.x
        }}>
            <div className="verse">
                <p>{verse.text}</p>
            </div>
            <div className="actions">
                {controls.map((c) => (
                    <li key={c.action} onClick={() => handleControlsClic(c.action)}>
                        <i className={`bi bi-${c.icon}`}></i>
                        <span className='tooltip'>{c.label}</span>
                    </li>
                ))}
            </div>
            <div className="marks">
                {colorMarks.map((c) => (
                    <span
                        key={c}
                        className={`mark active ${c}`}
                        onClick={() => handleMarkClick(c)}
                    />
                ))}
                <button className='delete-btn' onClick={() => deleteMark(verse.id)}>
                    <i className='bi bi-trash'></i>
                </button>
                <button className='close' onClick={() => setFocused()}>
                    <i className='bi bi-x'></i>
                </button>
            </div>
        </div>
    );
}