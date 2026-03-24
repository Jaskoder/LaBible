export default  function SaveToNotes(verse) {

    const saved = localStorage.getItem('verses-notes') || "[]";
    const parsed = JSON.parse(saved);

    saved.push( verse );

    localStorage.setItem( JSON.stringify(parsed));
}