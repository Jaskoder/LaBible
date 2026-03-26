import { useState } from 'react';
import { useSearch, useView, useValue } from '../helpers/hooks';
import './styles/searchbar.css';

function ApplicationSearchBar({ placeholder, safeOpen }) {

    const [search, setSearch] = useSearch();
    const [value, setValue] = useValue();
    const [view, setView] = useView();

    const handleChange = (e) => {
        const text = e.target.value;

        if(view !== 'search') setView('search');

        setValue(text);
    }

    const handleFocus = () => {
        if(safeOpen) safeOpen();
    };

    const handleClick = () => {

        if(safeOpen) safeOpen();
        if( value !== search) {
            setSearch(value);
        }

    }
    return (
        <div className='searchbar'>
            <input
                type='text'
                placeholder={placeholder}
                value={value}
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