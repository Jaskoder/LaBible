import { useView, usePoints, useAlert } from '../helpers/hooks';
import bibleMeta from '../biblemeta.json';

import './styles/bookmark.css';
import { useCallback } from 'react';

function BookMark({ verse }) {

    const [view, setView] = useView();
    const [points, setPoints] = usePoints();
    const [alert, setAlert] = useAlert();

    const { book, chapter } = verse;
    const actionButtons = [
        { action: 'copy', label: 'Copier', icon: 'clipboard' },
        { action: 'share', label: 'Copier', icon: 'share' },
        { action: 'goto', label: 'Copier', icon: 'box-arrow-up-right' },
    ];

    const createAlert = (message, type) => setAlert({ message, type });

    const handleButtonsAction = useCallback((action) => {

        switch (action) {

            case 'copy':
                navigator.clipboard.writeText(verse.text);
                createAlert('Copié dans le presse papier', 'success');
                break;
            case 'share':
                break;
            case 'goto':

                setPoints({ book, chapter });
                setView('bible')
                break;

            default:
                break;
        }
    }, [])

    return (

        <div className="bookmark">
            <div className="meta">
                <span className='book'>{bibleMeta[book - 1].name}</span>
                <span className='chap'>{chapter} :</span>
                <span>{verse.verse}</span>
            </div>
            <div className="content">
                <p className='verse'>{verse.text}</p>
            </div>
            <div className="actions">
                {
                    actionButtons.map((button) => (
                        <button className='action-btn' onClick={() => handleButtonsAction(button.action)}>
                            <i className={`bi bi-${button.icon}`}></i>
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default BookMark;