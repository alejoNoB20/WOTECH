import { useEffect, useState } from "react"
import ItemList from '@components/itemStockList/itemStockList'
import Loader from "@components/loader/Loader"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useModal } from "@context/modalContext";
import Pagination from "@components/pagination/Pagination";

const GetStock = () => {
    const [items, setItems] = useState([]);
    const [maxPage, setMaxPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const { openModal } = useModal();
    const { page } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const queryParams = new URLSearchParams(location.search);
            const query = queryParams.get("search_type") || "" ;
            const option = queryParams.get("search_value") || "";

            let url = `${process.env.REACT_APP_API_URL}/stock`;
            
            if (query && option) {
                url += `/search/1?search_type=${encodeURIComponent(query)}&search_value=${encodeURIComponent(option)}`;
            }else {
                url += `/pages/${page}`;
            };

            const mostrarError = (httpErr, errors) => {
                openModal({
                    errorType: httpErr,
                    validationErrors: errors,
                })
            }

            try{
                const response = await fetch(url);
                const responseJSON = await response.json();

                setItems(responseJSON.resultado);
                setMaxPage(responseJSON.maxPage);

                if(!response.ok){
                    if(response.status === 400){
                        const errors = responseJSON.errors.map((error) => error.msg)
                        mostrarError(response.status, errors);
                        return;
                    }
                }
            }catch(err) {
                console.log(err)
                navigate('/stock/getstock/1');
            }finally{
                setLoading(false);
            }
        };
        fetchData();

    },[location.search, openModal, navigate, page]);

    return (
        <>
        {loading && (
            <Loader/>
        )}
        <div className="flex flex-col h-full mb:my-10 md:mt-4">
            <ItemList items = {items}/>
            <div className="flex justify-center items-center mb:mt-6 md:mt-3">
                <Pagination page={Number(page)} maxPage={maxPage}/>
            </div>
        </div>
        </>
    )
}
export default GetStock