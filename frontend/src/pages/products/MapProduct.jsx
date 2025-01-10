import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const MapProduct = () => {
    const [product, setProduct] = useState({});
    const [loader, setLoader] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();   

    useEffect(()=> {
        const fetchData = async () => {
            setLoader(true);
            try{
                const response = await fetch(`${process.env.REACT_APP_API_URL}/products/details/${id}`);
                const responseJSON = await response.json();
                setProduct(responseJSON[0]);

            }catch(err){
                console.log(err);
            }finally{
                setLoader(false);
            }
        };    
        fetchData()

    }, []);

    return (
        <>
            {loader ? (
                <Loader/>
            ) : (
                <section className="flex w-full h-full justify-center">
                    <img src={product.map_product} alt={`Plano de ${product.name_product}`}/>
                </section>
            )}
        </>
    )
};

export default MapProduct;