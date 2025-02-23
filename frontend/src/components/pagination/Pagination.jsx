import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "@components/loader/Loader";

const Pagination = ({ page, maxPage }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleClick = (e) => {
        setLoading(true)
        if(e.target.id === "backButton" && page > 1){
            navigate(`/stock/getstock/${e.target.value}`);
            setLoading(false);
        };
        if(e.target.id === "forthButton" && page < maxPage){
            navigate(`/stock/getstock/${e.target.value}`);
            setLoading(false);
        };
        if(e.target.id === "pageButton"){
            navigate(`/stock/getstock/${e.target.value}`);
            setLoading(false);
        };
        setLoading(false)
    };

    return (
        <div className="flex flex-row gap-1">
            {loading && (
                <Loader/>
            )}
            {/* Botón pagina anterior */}
            <button value={page - 1} id="backButton" className="rounded rounded-l-xl p-2 border border-spacing-14 border-indigo-500 bg-white hover:bg-indigo-700 hover:text-white" onClick={handleClick}>
                <FontAwesomeIcon icon={faArrowLeft}/>
            </button>
            {(page - 3) >= 1 && (
                // Botón primera página y separador
                <>
                    <button value={1} id="pageButton" className="rounded-md p-2 border border-spacing-14 border-indigo-500 bg-white hover:bg-indigo-700 hover:text-white" onClick={handleClick}>
                        {1}
                    </button>
                    <button className="rounded-md p-2 border border-spacing-14 border-indigo-500 bg-white hover:bg-indigo-700 hover:text-white" onClick={handleClick}>
                        ...
                    </button>
                </>
            )}
            {(page - 2) >= 1 && (
                // Botón primera página - 2
                <button value={page - 2} id="pageButton" className="rounded-md p-2 border border-spacing-14 border-indigo-500 bg-white hover:bg-indigo-700 hover:text-white" onClick={handleClick}>
                    {page - 2}
                </button>                
            )}
            {(page - 1) >= 1 && (
                // Botón primera página - 1
                <button value={page - 1} id="pageButton" className="rounded-md p-2 border border-spacing-14 border-indigo-500 bg-white hover:bg-indigo-700 hover:text-white" onClick={handleClick}>
                    {page - 1}
                </button>                
            )}
            {/* Botón primera página */}
            <button value={page} id="pageButton" className="rounded-md p-2 border bg-indigo-600 text-white hover:bg-indigo-700" onClick={handleClick}>
                {page}
            </button>
            {(maxPage - page) >= 1 && (
                // Botón primera página + 1
                <button value={page + 1} id="pageButton" className="rounded-md p-2 border border-spacing-14 border-indigo-500 bg-white hover:bg-indigo-700 hover:text-white" onClick={handleClick}>
                    {page + 1}
                </button>
            )}
            {(maxPage - page) >= 2  && (
                // Botón primera página + 2
                <button value={page + 2} id="pageButton" className="rounded-md p-2 border border-spacing-14 border-indigo-500 bg-white hover:bg-indigo-700 hover:text-white" onClick={handleClick}>
                    {page + 2}
                </button>
            )}
            {(maxPage - page) >= 3 && (
                // Botón separador y ultima página
                <>
                    <button className="rounded-md p-2 border border-spacing-14 border-indigo-500 bg-white hover:bg-indigo-700 hover:text-white" onClick={handleClick}>
                        ...
                    </button>
                    <button value={maxPage} id="pageButton" className="rounded-md p-2 border border-spacing-14 border-indigo-500 bg-white hover:bg-indigo-700 hover:text-white" onClick={handleClick}>
                        {maxPage}
                    </button>
                </>
            )}
            {/* Botón pagina siguiente */}
            <button value={page + 1} id="forthButton"className="rounded rounded-r-xl p-2 border border-spacing-14 border-indigo-500 bg-white hover:bg-indigo-700 hover:text-white" onClick={handleClick}>
                <FontAwesomeIcon icon={faArrowRight}/>
            </button>
        </div>
    );

};

export default Pagination;