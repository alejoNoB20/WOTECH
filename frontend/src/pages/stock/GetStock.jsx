import { useEffect, useState } from "react"
import ItemList from 'components/itemStockList/itemStockList'
import Loader from "components/loader/Loader"
import { useLocation, useNavigate } from "react-router-dom";
import { useModal } from "../../context/modalContext";

const GetStock = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const { openModal } = useModal();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const queryParams = new URLSearchParams(location.search);
            const query = queryParams.get("search_type") || "" ;
            const option = queryParams.get("search_value") || "";

            let url = `${process.env.REACT_APP_API_URL}/stock`;
            
            if (query && option) {
                url += `/search?search_type=${encodeURIComponent(query)}&search_value=${encodeURIComponent(option)}`;
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

                setItems(responseJSON);

                if(!response.ok){
                    if(response.status === 400){
                        const errors = responseJSON.errors.map((error) => error.msg)
                        mostrarError(response.status, errors);
                        return;
                    }else if (response.status === 404){
                        mostrarError(response.status, [responseJSON]);
                        return
                    }
                }
            }catch(err) {
                console.log(err)
                navigate('/stock/getstock');
            }finally{
                setLoading(false);
            }
        };
        fetchData();

    },[location.search, openModal, navigate]);

    return (
        <>
        {loading? (
            <Loader/>
        ):(
            <ItemList items = {items}/>
        )}
        </>
    )
}
export default GetStock