import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Loader from "@components/loader/Loader";
import { useModal } from "@context/modalContext";
import ItemSupplierList from "@components/itemSupplierList/ItemSupplierList";
import Pagination from "@components/pagination/Pagination";

const GetSuppliers = () => {
    const [list, setList] = useState([]);
    const [maxPage, setMaxPage] = useState(null);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { openModal } = useModal();
    const { page } = useParams();
    
    useEffect(()=> {
        const fetchData = async () => {
            const queryParams = new URLSearchParams(location.search);
            const type = queryParams.get("search_type") || "";
            const value = queryParams.get("search_value") || "";

            let url = `${process.env.REACT_APP_API_URL}/suppliers`;

            if(type && value){
                url += `/search/1?search_type=${encodeURIComponent(type)}&search_value=${encodeURIComponent(value)}`;
            }else {
                url += `/pages/${page}`
            };

            try{
                setLoader(true);

                const response = await fetch(url);
                const responseJSON = await response.json();
                setList(responseJSON.resultado);
                setMaxPage(responseJSON.maxPage);

                const mostrarError = (httpErr, errors) => {
                    openModal({
                        errorType: httpErr,
                        validationErrors: errors,
                    })
                };  

                if(!response.ok){
                    if(response.status === 400){
                        const errors = responseJSON.errors.map((error) => error.msg)
                        mostrarError(response.status, errors);
                        return;
                    };
                };

            }catch(err){
                console.log(err);
                navigate('/suppliers/getsuppliers/1');
            }finally{
                setLoader(false);
            }
        }
        fetchData();

    }, [location.search, navigate, openModal, page]);

    return(
        <>
        {loader && (
            <Loader/>
        )}
        <div className="flex flex-col h-full md:mt-4">
            <ItemSupplierList list={list}/>
            <div className="flex justify-center items-center mb:mt-4 md:mt-3">
                <Pagination url="/suppliers/getsuppliers/" page={Number(page)} maxPage={maxPage}/>
            </div>
        </div>
        </>
    )
};

export default GetSuppliers;