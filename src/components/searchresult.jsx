import React, { Fragment, Suspense, useCallback, useEffect, useMemo } from "react";
import { useSearch, useView, usePoints } from "../helpers/hooks";
import { customCompare } from "../helpers/compare";

import bibleData from '../bible.json';
import bibleMeta from '../biblemeta.json'
import './styles/searchresult.css';


function Loading() {

    return <span>Recherche en cours...</span>
}

function renderWithTextHighlight(term, text) {

    const elements = [];
    const parts = text.split(" ");
    const re = new RegExp(term, 'i');

    parts.forEach((part, i) => {

        if (re.test(part)) {

            elements.push(<span key={`part-${i}`} className="match-highlight">{term + ' '}</span>)
        } else {
            elements.push(part + ' ')
        }
    })

    return elements;

}

function SearchResult() {

    const [search, setSearch] = useSearch();
    const [_p, setPoints] = usePoints();
    const [_v, setView] = useView();


    const matches = useMemo(() => {
        const verses = bibleData.filter((verse) => customCompare(search, verse.text));
        return verses;
    }, [search]);

    const goTo = useCallback((book, chapter) => {

        setPoints({ book, chapter });
        setView('bible');
    }, []);

    return (

        <div className="result">
            <Suspense fallback={<Loading />}>
                {
                    matches?.length > 0 ? (
                        <span className="tips"> La recherche a trouvé <span className="highlight">{matches.length}</span> correspondances pour le terme <span className="highlight">{search}</span></span>
                    ) : (
                        <span className="tips"> Aucune corespondance trouvé pour le terme {search}</span>
                    )
                }
                {
                    matches.map((verse) => {

                        const children = renderWithTextHighlight(search, verse.text);

                        return (
                            <div key={`match-${verse.id}`} className="verse-match">
                                <p>
                                    {children}
                                </p>
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
                        )
                    })
                }
            </Suspense>
        </div>
    )
}

export default React.memo(SearchResult);