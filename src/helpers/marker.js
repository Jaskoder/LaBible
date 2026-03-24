import { fetchMarkedVerses } from "../db/db";
import { writeToLocalStorage } from "../db/db";

export function hasBeenMarked(verse) {

    const markedVerses = fetchMarkedVerses();
    const { id } = verse;
    const mark = markedVerses.find((v) => v.id == verse.id);

    return [mark, mark?.mark];
}

export function markVerse(verse, mark) {

    const markedVerses = fetchMarkedVerses();
    const newVerse = { id: verse.id, mark };

    markedVerses.push(newVerse);

    writeToLocalStorage('marked-verses', markedVerses);
}