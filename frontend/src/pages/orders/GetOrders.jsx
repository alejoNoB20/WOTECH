import Loader from "@components/loader/Loader";
import { useModal } from "@context/modalContext";
import { useNotifications } from "@context/notificationsContext";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ItemOrderList from "@components/itemOrderList/ItemOrderList";
import Pagination from "@components/pagination/Pagination";


const GetOrders = () => {
    const [list, setList] = useState([]);
    const [maxPage, setMaxPage] = useState(null);
    const [loader, setLoader] = useState(false);
    const { openModal } = useModal();
    const notify = useNotifications();
    const location = useLocation();
    const { page } = useParams();

    useEffect(()=> {
        const fetchData = async () => {
            try{
                setLoader(true);
                const queryParams = new URLSearchParams(location.search);
                const query = queryParams.get("search_type") || "" ;
                const option = queryParams.get("search_value") || "";
    
                let url = `${process.env.REACT_APP_API_URL}/orders`;
                
                if (query && option) {
                    url += `/search/1?search_type=${encodeURIComponent(query)}&search_value=${encodeURIComponent(option)}`;
                }else {
                    url += `/pages/${page}`;
                };

                const Modal = (httpErr, errors) => {
                    openModal ({
                        errorType: httpErr,
                        validationErrors: errors,
                    });
                }

                const response = await fetch(url);
                const responseJSON = await response.json();
                console.log(responseJSON)
                setList(responseJSON.resultado);
                setMaxPage(responseJSON.maxPage);

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

    }, [location.search, openModal, notify, page]);

    return(
        <>
        {loader && (
            <Loader/>
        )}
        <div className="flex flex-col h-full md:mt-4">
            <ItemOrderList list={list}/>
            <div className="flex justify-center items-center mb:mt-4 md:mt-3">
                <Pagination url="/orders/getorders/" page={Number(page)} maxPage={maxPage}/>
            </div>
        </div>
        </>
    )
};

export default GetOrders;