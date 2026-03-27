import { useState, useMemo } from 'react';
import bibleMeta from '../biblemeta.json';
import resolveCurrentPart from '../helpers/resolvecurrentpart';
import splitBibleParts from '../helpers/splitBibleParts';

import './styles/picker.css';

function ReferencePicker({ points, setPoints, setOpen, ...props }) {

    const { book, chapter } = points;
    const [targetPart, setTargetPart] = useState(resolveCurrentPart(book));

    const bibleParts = useMemo(() => splitBibleParts(), []);
    const targetBook = useMemo(() => book, [points]);
    const targetBooks = useMemo(() => bibleParts[targetPart], [targetPart]);
    const numberOfChapters = useMemo(() => bibleMeta[targetBook - 1].chapters, [points]);

    const setTargetTo = (name, index) => setPoints(prev => ({ ...prev, [name]: index }));

    const handleSetBook = (bookOrder) => {

        const maximumChapters = bibleMeta[bookOrder - 1].chapters;
        let targetBookChapter = chapter;

        if (targetBookChapter > maximumChapters) targetBookChapter = 1;

        setTargetTo('book', bookOrder);
        setTargetTo('chapter', targetBookChapter);
    }

    const goToTarget = (chapindex) => {
        setTargetTo('chapter', chapindex);
        handleClosePicker();
    }

    const handleClosePicker = () => setOpen(false);

    return (
        <div {...props}>
            <div className='parts-picker'>
                <button className={`part ${targetPart === 0 && 'active'}`} onClick={() => setTargetPart(0)}>Ancien Testament</button>
                <button className={`part ${targetPart === 1 && 'active'}`} onClick={() => setTargetPart(1)}>Nouveau Testament</button>
            </div>
            <div className='books'>
                {
                    targetBooks.map((meta, i) => (
                        <li key={meta.name} className={`book-item ${targetBook == meta.order ? 'active' : ''}`}
                            onClick={() => handleSetBook(meta.order)}
                        >
                            <span>{meta.name}</span>
                        </li>
                    ))
                }
            </div>
            <div className='chapters'>
                {
                    Array.from({ length: numberOfChapters }).map((_, i) => (
                        <button key={`btn-${i}`} className={`chap-picker ${chapter === i + 1 ? 'active' : ''}`}
                            onClick={() => goToTarget(i + 1)}
                        > {i + 1} </button>
                    ))
                }
            </div>
        </div>
    )
}

export default ReferencePicker;