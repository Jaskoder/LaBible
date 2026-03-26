export function customCompare(term, string) {

    if (!term || term === null) return false;

    const regex = new RegExp(term, 'gi');
    const matches = string.match(regex);

    if (matches == null || matches?.length <= 0) return false;
    return true;
}