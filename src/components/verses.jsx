import { useState, useCallback, useEffect } from "react";
import { getMarkedVerses, markVerse } from "../helpers/marker";
import VerseCard from "./versercard";

export default function VersesReader({ verses }) {
    const [focused, setFocused] = useState(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [markedVerses, setMarkedVerses] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // Charger les marquages au montage
    useEffect(() => {

        const loadMarks = async () => {

            setIsLoading(true);
            const marks = await getMarkedVerses();
            setMarkedVerses(marks);
            setIsLoading(false);
        };
        loadMarks();
    }, []);

    const handleDoubleClick = useCallback((e, verse) => {

        setFocused(verse);
        setPos({ x: e.clientX, y: e.clientY < 360 ? 360 : e.clientY });
    }, []);

    const handleSetVmark = useCallback(async (verseId, mark) => {

        const verse = verses.find(v => v.id === verseId);
        if (!verse) return;

        // Mettre à jour l'état local immédiatement
        setMarkedVerses(prev => ({
            ...prev,
            [verseId]: mark
        }));

        // Persister dans IndexedDB
        await markVerse(verse, mark);
    }, [verses]);

    const handleCloseModal = useCallback(() => {

        setFocused(null);

    }, []);

    if (isLoading) {
        return <div className="loading">Chargement des marquages...</div>;
    }

    return (
        <div className="verses">
            {verses.map((verse) => {
                const mark = markedVerses[verse.id] || null;
                return (
                    <VerseCard
                        key={verse.id}
                        verse={verse}
                        mark={mark}
                        focused={focused}
                        setFocused={handleCloseModal}
                        handleDoubleClick={handleDoubleClick}
                        handleSetVmark={handleSetVmark}
                        pos={pos}
                    />
                );
            })}
        </div>
    );
}