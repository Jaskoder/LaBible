import { useState } from 'react';
import { useSearch, useView } from '../helpers/hooks';
import './styles/searchbar.css';

function ApplicationSearchBar({ safeOpen }) {

    const [search, setSearch] = useSearch();
    const [view, setView] = useView();

    const handleChange = (e) => {
        const text = e.target.value;

        if(view !== 'search') setView('search');

        setSearch(text);
    }

    const handleFocus = () => safeOpen();

    const handleClick = () => {

        safeOpen();
    }
    return (
        <div className='searchbar'>
            <input
                type='text'
                placeholder='Rechercher...'
                value={search}
                onInput={handleChange}
                onFocus={handleFocus}
            >

            </input>
            <button className='search' onClick={handleClick}>
                <i className='bi bi-search'></i>
            </button>
        </div>
    )
}

export default ApplicationSearchBar;