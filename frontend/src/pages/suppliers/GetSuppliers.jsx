import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "@components/loader/Loader";
import { useModal } from "@context/modalContext";
import ItemSupplierList from "@components/itemSupplierList/ItemSupplierList";

const GetSuppliers = () => {
    const [list, setList] = useState([]);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { openModal } = useModal();
    
    useEffect(()=> {
        const fetchData = async () => {
            const queryParams = new URLSearchParams(location.search);
            const type = queryParams.get("search_type") || "";
            const value = queryParams.get("search_value") || "";

            let url = `${process.env.REACT_APP_API_URL}/suppliers`;

            if(type && value){
                url += `/search?search_type=${encodeURIComponent(type)}&search_value=${encodeURIComponent(value)}`;
            };

            try{
                setLoader(true);

                const response = await fetch(url);
                const responseJSON = await response.json();

                setList(responseJSON);

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
                navigate('/suppliers/getsuppliers');
            }finally{
                setLoader(false);
            }
        }
        fetchData();

    }, [location.search, navigate, openModal]);

    return(
        <>
            {loader ? (
                <Loader/>
            ) : (
                <ItemSupplierList list={list}/>
            )}
        </>
    )
};

export default GetSuppliers;