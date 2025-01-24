import { useNavigate } from "react-router-dom";
import { diffDays, format } from "@formkit/tempo";
import { useState } from "react";

const ItemOrder = ({order}) => {
    const { id_order, delivery_day_order, price_order, shipping_address_order } = order;
    const [dayColorText, setDayColorText] = useState(null);
    const navigate = useNavigate();

    useState(()=> {
        try{
            const daysDiff = diffDays(delivery_day_order, new Date());

            if(daysDiff <= 3) {
                setDayColorText('text-red-700');
            }else if(daysDiff >= 4 && daysDiff <= 5){
                setDayColorText('text-yellow-700');
            }else {
                setDayColorText('text-green-700');
            };
            
        }catch(err){
            console.log(err);
        };

    }, []);
    
    const handleDetailsClick = (id) => {
        navigate(`/orders/detailsorders/${id}`);
    };

    return (
        // TARJETA DEL PEDIDO
        <div className="bg-white flex justify-center text-center rounded-lg py-5 max-w-full max-h-28 transition duration-500 hover:bg-gray-300 shadow-xl" onClick={() => handleDetailsClick(id_order)}>
            {/* INFORMACION DE LA TARJETA */}
            <div className="flex flex-row p-6">
                {/* ID ORDEN */}
                <h1 className="font-bold text-lg mx-2">{id_order} |</h1>
                {/* NOMBRE DEL CLIENTE Y DIRECCION*/}
                <h1 className="font-bold text-lg mx-1 text-blue-500"> Cliente:</h1>
                {!shipping_address_order ? (
                    <h2 className="font-semibold text-lg mx-2">{order.client.name_client} {order.client.last_name_client && order.client.last_name_client}</h2>
                ) : (
                    <div className="flex flex-col justify-center text-center">
                        <h2 className="font-semibold text-lg mx-2">{order.client.name_client} {order.client.last_name_client && order.client.last_name_client}</h2>
                        <h2 className="font-semibold text-lg mx-2">({shipping_address_order})</h2>
                    </div> 
                )}
                {/* PRECIO */}
                <h1 className="font-bold text-lg mx-2 text-orange-500">Precio:</h1>
                <h2 className="font-semibold text-lg mx-2">$ {price_order}</h2>
                {/* FECHA */}
                <h1 className={`font-bold text-lg mx-2 ${dayColorText}`}>Fecha de entrega:</h1>
                <h2 className="font-semibold text-lg mx-2">{format(delivery_day_order, 'ddd DD/MM/YY')}</h2>
            </div>
        </div>
    )

};

export default ItemOrder;