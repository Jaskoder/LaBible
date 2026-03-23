import { useState, useMemo } from 'react';
import bibleMeta from '../biblemeta.json';

import './styles/picker.css';

function ReferencePicker({ points, setPoints, setOpen}) {

    const { book, chapter } = points;
    const targetBook = useMemo(() => book, [points])
    const numberOfChapters = useMemo(() => bibleMeta[targetBook-1].chapters, [points]);

    const setBook = (index) => setPoints(prev => ({ ...prev, ['book']: index }));
    const setChapter = (index) => setPoints(prev => ({ ...prev, ['chapter']: index }))

    console.log(numberOfChapters, targetBook)

    /*const gotTo = (index) => {

        setPoints({
            book: targetBook,
            chapter: index,
        })
    } */


    const goToTarget = (chapindex) => {
        setChapter(chapindex);
        setOpen(false);
    }

    return (
        <div className='picker'>
            <div className='books'>
                {
                    bibleMeta.map((meta, i) => (
                        <li className={`book-item ${targetBook == i+1  ? 'active' : ''}`}
                            onClick={() => setBook(i + 1)}
                        >
                            <span>{meta.name}</span>
                        </li>
                    ))
                }
            </div>
            <div className='chapters'>
                {
                    Array.from({ length: numberOfChapters }).map((_, i) => (
                        <button className={`chap-picker ${chapter === i + 1 ? 'active' : ''}`}
                            onClick={() => goToTarget(i + 1)}

                        >
                            {i + 1}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default ReferencePicker;