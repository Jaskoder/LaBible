import React, { Fragment, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useSearch, useView, usePoints } from "../helpers/hooks";
import { customCompare } from "../helpers/compare";

import bibleData from '../bible.json';
import bibleMeta from '../biblemeta.json';
import Pagination from "./pagination";
import './styles/searchresult.css';


function Loading() {

    return <span>Recherche en cours...</span>
}

const HighlightText = ({ text, term, highlightClass = 'match-highlight' }) => {
    // Si le terme est vide ou non défini, retourner le texte brut
    if (!term || term.trim() === '') {
        return <span>{text}</span>;
    }

    // Échapper les caractères spéciaux regex dans le terme
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Créer une expression régulière pour trouver toutes les occurrences (insensible à la casse)
    const regex = new RegExp(`(${escapedTerm})`, 'gi');

    // Diviser le texte en parties avec les correspondances
    const parts = text.split(regex);

    // Filtrer les parties vides et rendre avec surbrillance
    return (
        <span>
            {parts.map((part, index) => {
                // Vérifier si cette partie correspond au terme recherché
                const isMatch = part && part.toLowerCase() === term.toLowerCase();

                return isMatch ? (
                    <span key={index} className={highlightClass}>
                        {part}
                    </span>
                ) : (
                    <span key={index}>{part}</span>
                );
            })}
        </span>
    );
};

function SearchResult() {

    const [search, setSearch] = useSearch();
    const [offset, setOffset] = useState(0);
    const [_p, setPoints] = usePoints();
    const [_v, setView] = useView();


    const matches = useMemo(() => {
        const verses = bibleData.filter((verse) => customCompare(search, verse.text));
        return verses;
    }, [search, offset]);

    const lazymatches = useMemo(() => matches.slice(offset, offset + 15), [offset, search]);

    const goTo = useCallback((book, chapter) => {

        setPoints({ book, chapter });
        setView('bible');
    }, []);

    return (

        <div className="result">
            <Suspense fallback={<Loading />}>
                <div className="result-verses">
                    {
                        matches?.length > 0 ? (
                            <span className="tips"> La recherche a trouvé <span className="highlight">{matches.length}</span> correspondances pour le terme <span className="highlight">{search}</span></span>
                        ) : (
                            <span className="tips"> Aucune corespondance trouvé pour le terme {search}</span>
                        )
                    }
                    {
                        lazymatches.map((verse) => {

                            
                            return (
                                <div key={`match-${verse.id}`} className="verse-match">
                                    <p>
                                        <HighlightText term={search} text={verse.text}></HighlightText>
                                    </p>
                                    <div className="ref-actions-wrapper">
                                        <span className="ref">
                                            {`${bibleMeta[verse.book - 1].name} ${verse.chapter}:${verse.verse}`}
                                        </span>
                                        <div className="actions flex items-center justify-end gap-1">
                                            <button><i className="bi bi-clipboard"></i></button>
                                            <button><i className="bi bi-share"></i></button>
                                            <button onClick={() => goTo(verse.book, verse.chapter)}>
                                                <i className="bi bi-box-arrow-up-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </Suspense>
            <Pagination offset={offset} setOffset={setOffset} dataLength={matches.length} itemsPerPage={15}></Pagination>
        </div>
    )
}

export default React.memo(SearchResult);