import { useState, useEffect } from "react";
import Modal from "./modal";

export default function VerseCard(props) {
    const {
        verse,
        mark,
        focused,
        setFocused,
        handleDoubleClick,
        handleSetVmark,
        pos
    } = props;

    const [vmark, setVmark] = useState(mark);

    useEffect(() => {
        setVmark(mark);
    }, [mark]);

    const handleSetMark = (newMark) => {
        setVmark(newMark);
        handleSetVmark(verse.id, newMark);
    };

    const isFocused = focused && focused.id === verse.id;

    return (
        <div>
            <div className={`verse-card ${vmark}`} onDoubleClick={(e) => handleDoubleClick(e, verse)}>
                <span className="verse-num">{verse.verse}</span>
                <p className="verse-text">{verse.text}</p>
            </div>
            {isFocused && (
                <Modal
                    verse={verse}
                    pos={pos}
                    setFocused={setFocused}
                    setVmark={handleSetMark}
                />
            )}
        </div>
    );
}