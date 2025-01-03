import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import ItemList from "../../components/itemProductList/ItemProductList";

const GetProducts = () => {
    const [list, setList] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(()=> {
        const fetchData = async () => {
            setLoader(true);
            try{
                    let url = `${process.env.REACT_APP_API_URL}/products`;

                    const response = await fetch(url);
                    const responseJSON = await response.json();
                    setList(responseJSON);

                }catch(err){
                    console.log(err);
                }finally{
                    setLoader(false);
                }
            };
            
        fetchData();
        
    }, []);
    
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