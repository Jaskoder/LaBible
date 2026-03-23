import { useState } from 'react';
import './styles/searchbar.css';

function ApplicationSearchBar({safeOpen}) {

    const [searchString, setSearchString] = useState("");

    const handleChange = (e) => {
        const text = e.target.value;

        setSearchString(text);
    }

    const handleClick = () => {

        safeOpen();
    }
    return (
        <div className='searchbar'>
            <input 
                type='text' 
                placeholder='Rechercher...' 
                value={searchString} 
                onInput={handleChange}>
                
            </input>
            <button className='search' onClick={handleClick}>
                <i className='bi bi-search'></i>
            </button>
        </div>
    )
}

export default ApplicationSearchBar;