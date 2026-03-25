import bibleData from '../bible.json';

export function matchMarkedVerses(markedVerses) {

    const matches = markedVerses.map((verse) => {

        const match = bibleData.find((vers) => vers.id == verse.id);

        return match;
    });

    return matches;
}