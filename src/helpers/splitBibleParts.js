import bibleMeta from '../biblemeta.json';

export default function splitBibleParts() {
    const oldTestamentBooks = bibleMeta.slice(0, 39);
    const newTestamentBooks = bibleMeta.slice(39);

    return [oldTestamentBooks, newTestamentBooks]
}