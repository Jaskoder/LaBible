import { useState } from 'react';
import { useSearch, useView, useValue, useTitle } from '../helpers/hooks';
import './styles/searchbar.css';

function ApplicationSearchBar({ placeholder, safeOpen }) {

    const [search, setSearch] = useSearch();
    const [value, setValue] = useValue();
    const [view, setView] = useView();
    const [title, setTitle] = useTitle();

    const handleChange = (e) => {
        if(view !== 'search') setView('search');
        
        const text = e.target.value;
        setValue(text);
    }

    const handleFocus = () => safeOpen && safeOpen();

    const handleClick = () => {

        if(safeOpen) safeOpen();
        if( value !== search) {
            setSearch(value);
        }

        if(view !== 'search') setView('search');
        if(title !== 'Recherche') setTitle('Recherche');

    }
    return (
        <div className='searchbar'>
            <input type='text' placeholder={placeholder} value={value} onInput={handleChange} onFocus={handleFocus}
            ></input>
            <button className='search' onClick={handleClick}>
                <i className='bi bi-search'></i>
            </button>
        </div>
    )
}

export default ApplicationSearchBar;