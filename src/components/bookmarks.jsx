import { useEffect, useMemo, useState } from "react";
import { matchMarkedVerses } from "../helpers/matcher";
import { useView } from "../helpers/hooks";

import BookMark from "./bookmark";
import db from "../db/db";

import './styles/bookmarks.css';

function BookMarks() {

    const [markedVerses, setMarkedVerses] = useState([]);
    const [view, setView] = useView();
    const verses = matchMarkedVerses(markedVerses);

    useEffect(() => {
        const fetchMarked = async () => {
            try {
                setMarkedVerses(await db.fetchall('marked-verses'));
            } catch (e) {
                console.log(e);
            }
        }
        fetchMarked();
    }, []);

    const handleClick = () => setView('bible')

    return (

        <div className="bookmarks">
            {
                verses.length > 0 ? (
                    <div className="bmarks">
                        {
                            verses.map((verse) => <BookMark verse={verse}></BookMark>)
                        }
                    </div>
                ) : (
                    <div className="empty">
                        <p>
                            Vous n'avez pas des versets marqués
                            <span className="link" onClick={handleClick}>Cliquez ici pour acceder à la Bible</span>
                        </p>
                    </div>
                )
            }
        </div>
    )
}

export default BookMarks;