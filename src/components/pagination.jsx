import { useCallback, useEffect } from "react";

import './styles/pagination.css';

function Pagination({ offset, setOffset, dataLength, itemsPerPage }) {

    const safeSetOffset = () => {
        if (offset >= dataLength) setOffset(0);
    }

    const handleClick = useCallback((location, index = 0) => {
        const totalPages = Math.ceil(dataLength / itemsPerPage);
        const currentPage = Math.floor(offset / itemsPerPage);

        safeSetOffset()

        switch (location) {
            case 'prev':
                if (currentPage > 0) {
                    setOffset(offset - itemsPerPage);
                }
                break;
            case 'next':

                if (currentPage < totalPages - 1) {
                    setOffset(offset + itemsPerPage);
                }
                break;

            case 'target':
                if (index >= 0 && index < totalPages) {
                    setOffset(index * itemsPerPage);
                }
                break;

            default:
                break;
        }
    }, [offset, dataLength, itemsPerPage, setOffset]);


    return (

        <div className="pagination">
            <button className="prev" onClick={() => handleClick('prev')}>
                <i className="bi bi-chevron-left"></i>
            </button>
            <div className="pages">
                {
                    Array.from({ length: Math.round(dataLength / 15) }).map((_, i) => (
                        <button
                            key={`index_${i}`}
                            className={`${offset === i * 15 ? 'active' : ''}`}
                            onClick={() => handleClick('target', i)}><span>{i + 1}</span>
                        </button>
                    ))
                }
            </div>
            <button className="next" onClick={() => handleClick('next')}>
                <i className="bi bi-chevron-right"></i>
            </button>
        </div>
    )
}

export default Pagination;