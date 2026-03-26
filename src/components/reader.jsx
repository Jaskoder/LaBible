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

    const goNext = () => {

        let bookIndex = book - 1;
        let next = chapter + 1;
        const maximumChapters = bibleMeta[bookIndex].chapters;

        if (next > maximumChapters) {

            bookIndex < 65 ? bookIndex++ : bookIndex = 0;
            next = 1;
        }

        setPoints({ book: bookIndex + 1, chapter: next })

    }

    const goPrev = () => {

        let bookIndex = book - 1;
        let prev = chapter - 1;

        if (prev < 1) {
            bookIndex = bookIndex > 1 ? bookIndex - 1 : bookIndex = 65;
            prev = bibleMeta[bookIndex].chapters;
        }

        setPoints({ book: bookIndex + 1, chapter: prev })
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
                        <button onClick={goPrev}><i className='bi bi-chevron-left'></i></button>
                        <button onClick={goNext}><i className='bi bi-chevron-right'></i></button>
                    </div>
                </div>
                <ReferencePicker points={points} setPoints={setPoints} setOpen={setOpen} className={`picker ${open && 'open'}`}></ReferencePicker>
            </div>
            <VersesReader verses={bibleChapter}></VersesReader>
        </div>
    )
}

export default Reader;