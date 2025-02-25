import { useEffect, useState } from "react";
import Loader from "@components/loader/Loader";
import ItemList from "@components/itemProductList/ItemProductList";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useModal } from "@context/modalContext";
import Pagination from "@components/pagination/Pagination";

const GetProducts = () => {
    const [list, setList] = useState([]);
    const [maxPage, setMaxPage] = useState(null);
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const location = useLocation();
    const { openModal } = useModal();
    const { page } = useParams();

    useEffect(()=> {
        const fetchData = async () => {
            setLoader(true);
            try{
                const queryParams = new URLSearchParams(location.search);
                const query = queryParams.get("search_type") || "" ;
                const option = queryParams.get("search_value") || "";
    
                let url = `${process.env.REACT_APP_API_URL}/products`;
                
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
                };    

                const response = await fetch(url);
                const responseJSON = await response.json();

                setList(responseJSON.resultado);
                setMaxPage(responseJSON.maxPage);

                if(!response.ok){
                    if(response.status === 400){
                        const errors = responseJSON.errors.map((error) => error.msg)
                        mostrarError(response.status, errors);
                        return;
                    }
                }
                }catch(err){
                    console.log(err);
                    navigate('/products/getproducts/1');
                }finally{
                    setLoader(false);
                }
            };
            
        fetchData();
        
    }, [location.search, openModal, page, navigate]);
    
    return(
        <>
            {loader && (
                <Loader/>
            )}
            <div className="flex flex-col h-full md:mt-4">
                <ItemList list = {list}/>
                <div className="flex justify-center items-center mb:mt-4 md:mt-3">
                    <Pagination url="/products/getproducts/" page={Number(page)} maxPage={maxPage}/>
                </div>
            </div>
        </>
    );
};

export default GetProducts;