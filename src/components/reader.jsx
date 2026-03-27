import { useMemo, useState } from 'react';
import { usePoints } from '../helpers/hooks';

import bibleData from '../bible.json';
import bibleMeta from '../biblemeta.json';
import VersesReader from './verses';
import ReferencePicker from './picker';

import "./styles/reader.css";


function Reader() {

    const [points, setPoints] = usePoints();
    const [open, setOpen] = useState(false);
    const { book, chapter } = points;

    const bibleBook = useMemo(() => bibleData.filter((verse) => verse.book === book), [points]);
    const bibleChapter = useMemo(() => bibleBook.filter((verser) => verser.chapter === chapter), [points]);

    const navigate = (direction) => {

        let dirIndex = direction === 'next' ? 1 : -1;
        let bookIndex = book - 1, targetChapter = chapter + dirIndex;
        let bookChapters = bibleMeta[bookIndex].chapters;
        let minBookIndex = 0, minChapter = 1, maxBookIndex = 65;

        //"Ensure that the target chapter never goes under the minimum chapter when direction is set on "prev";//

        if (direction === 'prev' && targetChapter < minChapter) {
            bookIndex = bookIndex > 0 ? bookIndex - 1 : maxBookIndex;
            targetChapter = bibleMeta[bookIndex].chapters;
        }

        //"Ensure that the target chapter never goes over the maximum chapter when direction is set on "next";//

        if (direction === 'next' && targetChapter > bookChapters) {
            bookIndex = bookIndex < maxBookIndex ? bookIndex + 1 : minBookIndex;
            targetChapter = minChapter;
        }

        setPoints({ book: bookIndex + 1, chapter: targetChapter });
    }

    return (
        <div className='reader'>
            <div className="reader-header">
                <div className='meta-wrapper'>
                    <div className='meta'>
                        <span className='book'>{bibleMeta[book - 1].name}</span>
                        <span className='chapter'>{chapter}</span>
                        <button className='picker-toogle' onClick={() => setOpen(!open)}><i className='bi bi-chevron-down'></i></button>
                    </div>
                    <div className='controls'>
                        <button onClick={() => navigate('prev')}><i className='bi bi-chevron-left'></i></button>
                        <button onClick={() => navigate('next')}><i className='bi bi-chevron-right'></i></button>
                    </div>
                </div>
                <ReferencePicker points={points} setPoints={setPoints} setOpen={setOpen} className={`picker ${open && 'open'}`}></ReferencePicker>
            </div>
            <VersesReader verses={bibleChapter}></VersesReader>
        </div>
    )
}

export default Reader;