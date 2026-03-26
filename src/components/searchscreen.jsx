import ApplicationSearchBar from './searchbar';
import SearchResult from './searchresult';
import './styles/searchscreen.css';
 
function SearchScreen() {

    return (

        <div className="search-screen">
            <ApplicationSearchBar placeholder="Recherche dans la bible..."/>
            <SearchResult/>
        </div>
    )
}

export default SearchScreen;