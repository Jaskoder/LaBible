import { useState, Fragment, useMemo, useEffect } from "react";
import Modal from "./modal";
import { hasBeenMarked, markVerse } from "../helpers/marker";

function VerseCard({ verse, ...props }) {

    const [isMarked, mark] = useMemo(() => hasBeenMarked(verse), []);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [modal, setModal] = useState(false);
    const [vmark, setMark] = useState( mark || 'default');

    //console.log(isMarked, mark)


    const handleClick = (e) => {
        let x = e.clientX;
        let y = e.clientY;

        if (y < 300) y = 360;

        setPosition({ x, y });
        setModal(true);
    }

    return (
        <Fragment>
            <div className={`verse-card ${vmark}`} onDoubleClick={handleClick}>
                <span className="verse-num">{verse.verse}</span>
                <p className="verse-text">{verse.text}</p>
            </div>

            {modal && (
                <Modal setModal={setModal} verse={verse} setMark={setMark} style={
                    {
                        top: position.y,
                        left: position.x
                    }
                }></Modal>
            )}
        </Fragment>

    )
}

export default VerseCard