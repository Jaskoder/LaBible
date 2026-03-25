import React, { useMemo, useState, useCallback, useEffect, useRef } from "react";
import { useSearch, useView } from "../helpers/hooks";
import bibleData from '../bible.json';
import bibleMeta from '../biblemeta.json';
import './styles/searchscreen.css';

// Création d'un index de recherche à la volée
const createSearchIndex = () => {
    const index = new Map();
    
    bibleData.forEach(verse => {
        const words = verse.text.toLowerCase().split(/\s+/);
        words.forEach(word => {
            if (!index.has(word)) {
                index.set(word, new Set());
            }
            index.get(word).add(verse.id);
        });
    });
    
    return index;
};

// Recherche optimisée avec index
const searchWithIndex = (term, bibleData, searchIndex) => {
    if (!term || term.trim() === '') return [];
    
    const searchTerms = term.toLowerCase().split(/\s+/).filter(t => t.length > 0);
    if (searchTerms.length === 0) return [];
    
    // Utiliser l'index pour trouver rapidement les versets pertinents
    let matchingIds = null;
    
    for (const searchTerm of searchTerms) {
        const termIds = searchIndex.get(searchTerm);
        if (!termIds) return []; // Un terme n'existe pas dans l'index
        
        if (matchingIds === null) {
            matchingIds = new Set(termIds);
        } else {
            // Intersection des sets pour la recherche AND
            matchingIds = new Set([...matchingIds].filter(id => termIds.has(id)));
        }
        
        if (matchingIds.size === 0) return [];
    }
    
    // Récupérer les versets correspondants
    return bibleData.filter(verse => matchingIds.has(verse.id));
};

// Web Worker pour la recherche asynchrone
const createSearchWorker = () => {
    const workerCode = `
        self.onmessage = function(e) {
            const { searchTerm, bibleData, searchIndex } = e.data;
            
            const searchWithIndex = (term, data, index) => {
                if (!term || term.trim() === '') return [];
                
                const searchTerms = term.toLowerCase().split(/\\s+/).filter(t => t.length > 0);
                if (searchTerms.length === 0) return [];
                
                let matchingIds = null;
                
                for (const searchTerm of searchTerms) {
                    const termIds = index.get(searchTerm);
                    if (!termIds) return [];
                    
                    if (matchingIds === null) {
                        matchingIds = new Set(termIds);
                    } else {
                        matchingIds = new Set([...matchingIds].filter(id => termIds.has(id)));
                    }
                    
                    if (matchingIds.size === 0) return [];
                }
                
                return data.filter(verse => matchingIds.has(verse.id));
            };
            
            const results = searchWithIndex(searchTerm, bibleData, searchIndex);
            self.postMessage({ results });
        };
    `;
    
    const blob = new Blob([workerCode], { type: 'application/javascript' });
    return new Worker(URL.createObjectURL(blob));
};

// Composant pour le highlight optimisé
const renderTextWithHighlight = (term, text) => {
    if (!term || !text) return text;
    
    try {
        const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedTerm})`, 'gi');
        const parts = text.split(regex);
        
        return parts.map((part, index) => {
            if (regex.test(part)) {
                return <span key={index} className="match-mark">{part}</span>;
            }
            return <React.Fragment key={index}>{part}</React.Fragment>;
        });
    } catch (error) {
        console.warn('Error highlighting text:', error);
        return text;
    }
};

// Composant pour un résultat de recherche
const VerseMatch = React.memo(({ verse, searchTerm, bibleMeta }) => {
    const highlightedText = useMemo(() => 
        renderTextWithHighlight(searchTerm, verse.text),
        [searchTerm, verse.text]
    );
    
    const reference = useMemo(() => {
        const book = bibleMeta[verse.book - 1];
        return book ? `${book.name} ${verse.chapter}:${verse.verse}` : 'Référence inconnue';
    }, [verse.book, verse.chapter, verse.verse, bibleMeta]);
    
    return (
        <div className="verse-match">
            <p className="verse-text">{highlightedText}</p>
            <span className="ref">{reference}</span>
        </div>
    );
});

VerseMatch.displayName = 'VerseMatch';

// Composant pour le debounce
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    
    return debouncedValue;
};

// Composant principal avec recherche optimisée
function SearchScreen() {
    const [search] = useSearch();
    const [, setView] = useView();
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const workerRef = useRef(null);
    const searchIndexRef = useRef(null);
    
    const debouncedSearch = useDebounce(search, 300);
    
    // Initialiser l'index de recherche et le worker
    useEffect(() => {
        console.log('Creating search index...');
        searchIndexRef.current = createSearchIndex();
        workerRef.current = createSearchWorker();
        
        workerRef.current.onmessage = (e) => {
            setResults(e.data.results);
            setIsSearching(false);
        };
        
        return () => {
            if (workerRef.current) {
                workerRef.current.terminate();
            }
        };
    }, []);
    
    // Effectuer la recherche quand le terme change
    useEffect(() => {
        if (!debouncedSearch || debouncedSearch.trim() === '') {
            setResults([]);
            setIsSearching(false);
            return;
        }
        
        setIsSearching(true);
        
        // Utiliser le worker pour la recherche asynchrone
        if (workerRef.current && searchIndexRef.current) {
            workerRef.current.postMessage({
                searchTerm: debouncedSearch,
                bibleData: bibleData,
                searchIndex: searchIndexRef.current
            });
        } else {
            // Fallback synchrone si le worker n'est pas disponible
            const searchResults = searchWithIndex(debouncedSearch, bibleData, searchIndexRef.current);
            setResults(searchResults);
            setIsSearching(false);
        }
    }, [debouncedSearch]);
    
    const hasResults = results.length > 0;
    const searchWords = search.split(" ").filter(Boolean);
    const displayTerm = searchWords.join(', ');
    
    return (
        <div className="verses-search">
            <div className="header">
                <h2 className="title">Recherche</h2>
                {search && search.trim() !== '' && (
                    <span className="tips">
                        {isSearching ? (
                            'Recherche en cours...'
                        ) : hasResults ? (
                            `La recherche a trouvé ${results.length} correspondance${results.length > 1 ? 's' : ''} pour ${displayTerm}`
                        ) : (
                            `Aucune correspondance trouvée pour ${displayTerm}`
                        )}
                    </span>
                )}
            </div>
            
            {isSearching ? (
                <div className="loading">
                    <p>Recherche en cours...</p>
                </div>
            ) : hasResults ? (
                <div className="results-container">
                    {results.map(verse => (
                        <VerseMatch 
                            key={`match-${verse.id}`}
                            verse={verse}
                            searchTerm={debouncedSearch}
                            bibleMeta={bibleMeta}
                        />
                    ))}
                </div>
            ) : search && search.trim() !== '' ? (
                <div className="empty">
                    <p>Aucune correspondance trouvée pour {displayTerm}</p>
                </div>
            ) : null}
        </div>
    );
}

export default React.memo(SearchScreen);


/*import React, { useMemo, Fragment } from "react";
import { useSearch, useView } from "../helpers/hooks";
import bibleData from '../bible.json';
import bibleMeta from '../biblemeta.json';
import './styles/searchscreen.css';

// Constantes pour éviter les recréations
const EMPTY_ARRAY = [];

// Fonction utilitaire optimisée pour la recherche
const matchesSearchTerm = (term, text) => {
    if (!term || !text) return false;

    try {
        const regex = new RegExp(term, 'gi');
        return regex.test(text);
    } catch (error) {
        console.warn('Invalid regex pattern:', term);
        return text.toLowerCase().includes(term.toLowerCase());
    }
};

// Fonction optimisée pour le highlight
const renderTextWithHighlight = (term, text) => {
    if (!term || !text) return text;

    try {
        const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, index) => {
            if (regex.test(part)) {
                return <span key={index} className="match-mark">{part}</span>;
            }
            return <Fragment key={index}>{part}</Fragment>;
        });
    } catch (error) {
        console.warn('Error highlighting text:', error);
        return text;
    }
};

// Composant pour un résultat de recherche individuel
const VerseMatch = React.memo(({ verse, searchTerm, bibleMeta }) => {
    const highlightedText = useMemo(() =>
        renderTextWithHighlight(searchTerm, verse.text),
        [searchTerm, verse.text]
    );

    const reference = useMemo(() => {
        const book = bibleMeta[verse.book - 1];
        return book ? `${book.name} ${verse.chapter}:${verse.verse}` : 'Référence inconnue';
    }, [verse.book, verse.chapter, verse.verse, bibleMeta]);

    return (
        <div className="verse-match">
            <p className="verse-text">{highlightedText}</p>
            <span className="ref">{reference}</span>
        </div>
    );
});

VerseMatch.displayName = 'VerseMatch';

// Composant pour l'en-tête
const SearchHeader = ({ resultsCount, searchTerm }) => {
    if (resultsCount === null) return null;

    const searchWords = searchTerm.split(" ").filter(Boolean);
    const displayTerm = searchWords.join(', ');

    return (
        <div className="header">
            <h2 className="title">Recherche</h2>
            {resultsCount > 0 && (
                <span className="tips">
                    La recherche a trouvé {resultsCount} correspondance{resultsCount > 1 ? 's' : ''} pour {displayTerm}
                </span>
            )}
        </div>
    );
};

// Composant pour l'état vide
const EmptyState = ({ searchTerm }) => {
    const searchWords = searchTerm.split(" ").filter(Boolean);
    const displayTerm = searchWords.join(', ');

    return (
        <div className="empty">
            <p>Aucune correspondance trouvée pour {displayTerm}</p>
        </div>
    );
};

// Composant principal optimisé
function SearchScreen() {
    const [search] = useSearch();
    const [, setView] = useView(); // setView non utilisé, mais gardé pour la compatibilité

    // Optimisation de la recherche avec useMemo
    const versesMatches = useMemo(() => {
        if (!search || search.trim() === '') return EMPTY_ARRAY;

        return bibleData.filter(verse =>
            matchesSearchTerm(search, verse.text)
        );
    }, [search]);

    // Pas besoin de vérifier versesMatches.length > 0 ici car c'est déjà fait
    const hasResults = versesMatches.length > 0;

    return (
        <div className="verses-search">
            <SearchHeader
                resultsCount={hasResults ? versesMatches.length : null}
                searchTerm={search}
            />

            {hasResults ? (
                versesMatches.map(verse => (
                    <VerseMatch
                        key={`match-${verse.id}`}
                        verse={verse}
                        searchTerm={search}
                        bibleMeta={bibleMeta}
                    />
                ))
            ) : (
                <EmptyState searchTerm={search} />
            )}
        </div>
    );
}

export default React.memo(SearchScreen);


/*import React, { Fragment, useMemo, useState } from "react";
import { useSearch, useView } from "../helpers/hooks";
import bibleData from '../bible.json';
import bibleMeta from '../biblemeta.json';

import './styles/searchscreen.css';

const compareStrings = (term, string) => {

    if (!term) return false;

    const regex = new RegExp(term, 'gi');
    const match = string.match(regex);

    if (!match || match.length <= 0) {

        return false
    }

    return true;
}

const renderTextWithHighlight = (term, text) => {

    const matches = text.match(new RegExp(term, 'gi'));
    const elements = [];

    text.split(" ").forEach((unit) => {

        if (matches.includes(unit)) {
            elements.push(
                <span className="match-mark">{unit}</span>
            )
        } else {
            elements.push(
                <Fragment>{unit}</Fragment>
            )
        }
    })

    return elements;
}

function SearchScreen() {

    const [search, setSearch] = useSearch();
    const [view, setView] = useView();

    const versesMatches = useMemo(() => bibleData.filter(verse => compareStrings(search, verse.text)), [search]);

    return (
        <div className="verses-search">
            <div className="header">
                <h2 className="title"> Récherche </h2>
                {
                    versesMatches && (
                        <span className="tips">
                            La récherche a trouvé {versesMatches.length} correspondances pour le groupe {
                                search.split(" ").join(',')
                            }
                        </span>
                    )
                }
            </div>
            {
                versesMatches.length > 0 ? (

                    versesMatches.map((verse) => {
                        const children = renderTextWithHighlight(search, verse.text)
                        return (
                            <div key={`match-${verse.id}`} className="verse-match">
                                <p className="verse-text">{children}</p>
                                <span className="ref">
                                    {
                                        `${bibleMeta[verse.book - 1].name} ${verse.chapter}:${verse.verse}`
                                    }
                                </span>
                            </div>
                        )
                    })
                ) : (
                    <div className="empty">
                        <p>Aucune correspondance trouvé pour le groupe {search.split(" ").join(',')}</p>
                    </div>
                )
            }
        </div>
    )
}

export default SearchScreen;

*/