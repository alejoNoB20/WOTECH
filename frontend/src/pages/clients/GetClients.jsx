import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "@components/loader/Loader";
import { useModal } from "@context/modalContext";
import { ItemClientList } from "@components/itemClientList/ItemClientList";

const GetClients = () => {
    const [loader, setLoader] = useState(false);
    const [list, setList] = useState([]);
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

                let url = `${process.env.REACT_APP_API_URL}/clients`;
                
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
                setList(responseJSON);

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

    }, [location.search, navigate, openModal]);

    return(
        <>
            {loader ? (
                <Loader/>
            ) : (
                <ItemClientList clients={list}/>
            )}
        </>
    )
};

export default GetClients;