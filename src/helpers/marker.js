import db from "../db/db";

export async function hasBeenMarked(verse) {
    try {
        const markedVerses = await db.fetchall('marked-verses');
        const mark = markedVerses.find((v) => v.id === verse.id);
        return [mark, mark?.mark || null];
    } catch (e) {
        console.log(e.message);
        return [null, null];
    }
}

export async function markVerse(verse, mark) {
    try {
        await db.put('marked-verses', { id: verse.id, mark });
        return true;
    } catch (e) {
        console.log(e.message);
        return false;
    }
}

export async function getMarkedVerses() {
    try {
        const markedVerses = await db.fetchall('marked-verses');
        const marksMap = {};
        markedVerses.forEach(item => {
            marksMap[item.id] = item.mark;
        });
        return marksMap;
    } catch (e) {
        console.log(e.message);
        return {};
    }
}