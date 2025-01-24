import Loader from "@components/loader/Loader";
import { useModal } from "@context/modalContext";
import { useNotifications } from "@context/notificationsContext";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ItemOrderList from "@components/itemOrderList/ItemOrderList";


const GetOrders = () => {
    const [list, setList] = useState([]);
    const [loader, setLoader] = useState(false);
    const { openModal } = useModal();
    const notify = useNotifications();
    const location = useLocation();

    useEffect(()=> {
        const fetchData = async () => {
            try{
                setLoader(true);
                const queryParams = new URLSearchParams(location.search);
                const query = queryParams.get("search_type") || "" ;
                const option = queryParams.get("search_value") || "";
    
                let url = `${process.env.REACT_APP_API_URL}/orders`;
                
                if (query && option) {
                    url += `/search?search_type=${encodeURIComponent(query)}&search_value=${encodeURIComponent(option)}`;
                };

                const Modal = (httpErr, errors) => {
                    openModal ({
                        errorType: httpErr,
                        validationErrors: errors,
                    });
                }

                const response = await fetch(url);
                const responseJSON = await response.json();
                setList(responseJSON);

                if(!response.ok){
                    if(response.status === 400){
                        const errors = responseJSON.errors.map((error) => error.msg)
                        Modal(response.status, errors);
                        return;
                    }
                }

            }catch(err){
                const handleFail = (msg) => {
                    notify("fail", msg);
                }
                console.log(err);
                handleFail("Ops! un error inesperado ah ocurrido a la hora de procesar la información");
            }finally{
                setLoader(false);
            }
        };
        fetchData();

    }, [location.search, openModal, notify]);

    return(
        <>
            {loader ? (
                <Loader/>
            ) : (
                <ItemOrderList list={list}/>
            )}
        </>
    )
};

export default GetOrders;