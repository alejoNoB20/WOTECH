import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import ItemList from "../../components/itemProductList/ItemProductList";
import { useLocation, useNavigate } from "react-router-dom";
import { useModal } from "../../context/modalContext";

const GetProducts = () => {
    const [list, setList] = useState([]);
    const [loader, setLoader] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { openModal } = useModal();

    useEffect(()=> {
        const fetchData = async () => {
            setLoader(true);
            try{
                const queryParams = new URLSearchParams(location.search);
                const query = queryParams.get("search_type") || "" ;
                const option = queryParams.get("search_value") || "";
    
                let url = `${process.env.REACT_APP_API_URL}/products`;
                
                if (query && option) {
                    url += `/search?search_type=${encodeURIComponent(query)}&search_value=${encodeURIComponent(option)}`;
                };

                const mostrarError = (httpErr, errors) => {
                    openModal({
                        errorType: httpErr,
                        validationErrors: errors,
                    })
                };    

                const response = await fetch(url);
                const responseJSON = await response.json();
                console.log(responseJSON)
                setList(responseJSON);

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
                }catch(err){
                    console.log(err);
                    navigate('/products/getproducts');
                }finally{
                    setLoader(false);
                }
            };
            
        fetchData();
        
    }, [location.search, openModal, navigate]);
    
    return(
        <>
            {loader ? (
                <Loader/>
            ) : (
                <ItemList list = {list}/>
            )}
        </>
    );
};

export default GetProducts;