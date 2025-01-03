import { useNavigate } from "react-router-dom";

const Product = ({product}) => {
    const { id_product, name_product, img_product, price_product} = product;
    const navigate = useNavigate();

    const handleDetailsClick = (id) => {
        return navigate(`product/detailproduct/${id}`);
    };

    const handleButtonClick = (id) => {
        return navigate(`product/map/${id}`)
    };

    return (
        <div className="container bg-white flex flex-col justify-start rounded-lg p-4 h-full transition duration-500 hover:bg-gray-500 group">
            <div className="max-h-24 mb-8 hover:text-white" onClick={() => handleDetailsClick(id_product)}>
                <img src={img_product} alt={`Imagen de ${name_product}`} className="object-contain w-full max-h-28"/>
                <h3 className="text-gray-700 py-3 pl-3 group-hover:text-white transition duration-500">
                    {id_product} | {name_product}
                </h3>
                <h4 className="text-gray-700 pb-3 pl-3 group-hover:text-white transition duration-500">
                    ${price_product}
                </h4>
            </div>
            <div className="container flex flex-col items-center text-center">
                <button className="flex px-5 py-2 mt-16 bg-green-600 transition hover:bg-green-700 hover:text-white text-gray-700 rounded-lg" onClick={() => handleButtonClick(id_product)}>
                    Ver plano
                </button>
            </div>
        </div>
    )
}

export default Product