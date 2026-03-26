import ApplicationSearchBar from './searchbar';
import SearchResult from './searchresult';
import './styles/searchscreen.css';

function SearchScreen() {

    return (

        <div className="search-screen">
            <div className='title'>
                <h2>Recherche</h2>
            </div>
            <ApplicationSearchBar placeholder="Recherche dans la bible..."></ApplicationSearchBar>
            <SearchResult></SearchResult>
        </div>
    )
}

export default SearchScreen;