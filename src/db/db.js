export function fetchMarkedVerses() {

    try {
        return JSON.parse(localStorage.getItem('marked-verses')) || [];
    } catch (e) {
        console.log(e);
    }
}

export function writeToLocalStorage(key, data) {
    try {

        localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
        console.log(e)
    }
}