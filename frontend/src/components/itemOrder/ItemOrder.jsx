import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { diffDays, format } from "@formkit/tempo";

const ItemOrder = ({ order }) => {
  const [isMobile, setIsMobile] = useState(false);
  const { id_order, delivery_day_order, price_order, shipping_address_order } =
    order;
  const [dayColorText, setDayColorText] = useState(null);
  const [backgroundColor, setBackgrounColor] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 640px)").matches);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useState(() => {
    try {
      const daysDiff = diffDays(delivery_day_order, new Date());
      console.log(daysDiff);

      if (daysDiff <= 3) {
        setDayColorText("text-red-700");
      } else if (daysDiff >= 4 && daysDiff <= 5) {
        setDayColorText("text-yellow-700");
      } else {
        setDayColorText("text-green-700");
      }

      if (order.disabled) {
        setBackgrounColor("bg-red-300");
      } else {
        setBackgrounColor("bg-white");
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleDetailsClick = (id) => {
    navigate(`/orders/detailsorders/${id}`);
  };

  return (
    // TARJETA DEL PEDIDO
    <>
      {!isMobile ? (
        <div
          className={`${backgroundColor} bg-red flex justify-center text-center rounded-lg m-5 py-3 h-20 transition duration-500 hover:bg-gray-300 shadow-xl w-[90%]`}
          onClick={() => handleDetailsClick(id_order)}
        >
          {/* INFORMACION DE LA TARJETA */}
          <div className="flex flex-row justify-center text-center items-center">
            {/* ID ORDEN */}
            <h1 className="font-bold text-lg mx-2">{id_order} |</h1>
            {/* NOMBRE DEL CLIENTE Y DIRECCION*/}
            <h1 className="font-bold text-lg mx-1 text-blue-500"> Cliente:</h1>
            {!shipping_address_order ? (
              <h2 className="font-semibold text-lg mx-2">
                {order.client.name_client}{" "}
                {order.client.last_name_client && order.client.last_name_client}
              </h2>
            ) : (
              <div className="flex flex-col justify-center text-center">
                <h2 className="font-semibold text-lg mx-2">
                  {order.client.name_client}{" "}
                  {order.client.last_name_client &&
                    order.client.last_name_client}
                </h2>
                <h2 className="font-semibold text-lg mx-2">
                  ({shipping_address_order})
                </h2>
              </div>
            )}
            {/* PRECIO */}
            <h1 className="font-bold text-lg mx-2 text-orange-500">Precio:</h1>
            <h2 className="font-semibold text-lg mx-2">$ {price_order}</h2>
            {/* FECHA */}
            <h1 className={`font-bold text-lg mx-2 ${dayColorText}`}>
              Fecha de entrega:
            </h1>
            <h2 className="font-semibold text-lg mx-2">
              {format(delivery_day_order, "ddd DD/MM/YY")}
            </h2>
          </div>
        </div>
      ) : (
        <div
          className="bg-white flex justify-center text-center rounded-lg m-5 py-3 max-h-28 transition duration-500 hover:bg-gray-300 shadow-xl w-[90%]"
          onClick={() => handleDetailsClick(id_order)}
        >
          {/* INFORMACION DE LA TARJETA */}
          <div className="flex flex-row justify-center text-center items-center gap-2">
            {/* ID ORDEN */}
            <h1 className="font-bold text-sm ">{id_order} |</h1>
            {/* NOMBRE DEL CLIENTE Y DIRECCION*/}
            <div className="flex flex-row gap-1">
              <h1 className="font-bold text-sm text-blue-500">Cliente:</h1>
              <h2 className="font-semibold text-sm">
                {order.client.name_client}
              </h2>
            </div>
            {/* FECHA */}
            <div className="flex flex-row gap-1">
              <h1 className={`font-bold text-sm ${dayColorText}`}>Entrega:</h1>
              <h2 className="font-semibold text-sm">
                {format(delivery_day_order, "ddd DD/MM")}
              </h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemOrder;
