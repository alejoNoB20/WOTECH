import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Loader from "@components/loader/Loader";
import { useModal } from "@context/modalContext";
import { ItemClientList } from "@components/itemClientList/ItemClientList";
import Pagination from "@components/pagination/Pagination";

const GetClients = () => {
    const [loader, setLoader] = useState(false);
    const [maxPage, setMaxPage] = useState(null);
    const [list, setList] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const { openModal } = useModal(); 
    const { page } = useParams();

    useEffect(()=> {
        const fetchData = async () => {
            setLoader(true);
            try{
                const queryParams = new URLSearchParams(location.search);
                const query = queryParams.get("search_type") || "" ;
                const option = queryParams.get("search_value") || "";

                let url = `${process.env.REACT_APP_API_URL}/clients`;
                
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
            }catch(err) {
                console.log(err);
                navigate('/clients/getclients');
            }finally{
                setLoader(false);
            };

        };
        fetchData();

    }, [location.search, navigate, openModal, page]);

    return(
        
        <>
        {loader && (
            <Loader/>
        )}
        <div className="flex flex-col h-full md:mt-4">
            <ItemClientList clients={list}/>
            <div className="flex justify-center items-center mb:mt-4 md:mt-3">
                <Pagination url="/clients/getclients/" page={Number(page)} maxPage={maxPage}/>
            </div>
        </div>
        </>
    )
};

export default GetClients;