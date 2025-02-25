import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "@components/loader/Loader";
import { useNotifications } from "@context/notificationsContext";
import { useModal } from "@context/modalContext";

const AddOrders = () => {
    const [order, setOrder] = useState({});
    const [productList, setProductList] = useState([]);
    const [clients, setClients] = useState([]);
    const [loader, setLoader] = useState(false);

    const [productRef, setProductRef] = useState({});
    const [UnitRef, setUnitRef] = useState(null);

    const navigate = useNavigate();
    const notify = useNotifications();
    const { openModal } = useModal();

    const handleSuccess = (msg) => {
        notify('success', msg);
    };

    const handleFail = (msg) => {
        notify('fail', msg)
    };

    const Modal = (httpErr, errors) => {
        openModal({
            errorType: httpErr,
            validationErrors: errors,            
        })
    }

    useEffect(()=> {
        const fetchData = async () => {
            try{
                setLoader(true);

                // RECUPERA LOS DATOS NECESARIOS DE LOS PRODUCTOS Y CLIENTES EN LA DB PARA GENERAR UN PEDIDO
                const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/getProductsAndClients`);
                const responseJSON = await response.json();
                setProductList(responseJSON.products);
                setClients(responseJSON.clients);

            }catch(err){
                const handleFail = (msg) => {
                    notify('fail', msg)
                };
                console.log(err);
                handleFail('Ops ah ocurrido un error a la hora de cargar los datos');
            }finally{
                setLoader(false);
            }
        };
        fetchData();

    }, [notify]);

    const handleAddProduct = () => {
        const currentProductList = productList;

        if(productRef !== "none" && UnitRef > 0){
            // DESHABILITA DEL SELECTOR LA OPCION DEL PRODUCTO ELEGIDA
            const newProductList = currentProductList.map((product)=> {
                if(product.id_product === productRef.id_product){
                    product.disabled = true;
                    return product;
                }else {
                    return product;
                }
            })
            setProductList(newProductList);
    
            // AGREGA EL PRODUCTO SELECCIONADO A LA LISTA 
            let orderList = [];
            if(order.products) orderList = order.products;
            orderList.push({'id_product': productRef.id_product, "name_product": productRef.name_product,"price_product": productRef.price_product, "unit_product": UnitRef});
            setOrder({...order, products: orderList});
    
            // RESETEA LOS VALORES DE REFERENCIA
            setUnitRef(0);
            setProductRef('none');
        }
    };

    const handleRemoveMaterial = (id)=> {
        const currentProductList = productList;

        // HABILITA DEL SELECTOR LA OPCION DEL PRODUCTO ELIMINADA
        const newProductList = currentProductList.map((product)=> {
            if(product.id_product === productRef.id_product){
                product.disabled = false;
                return product;
            }else {
                return product;
            }
        })
        setProductList(newProductList);

        // ELIMINA EL PRODUCTO SELECCIONADO DEL PEDIDO
        const newOrderList = order.products.filter((product)=> product.id !== id);
        setOrder({...order, products: newOrderList});
    };

    const handleSubmit = async () => {
        try{
            const finalOrder = order;

            const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/create`, {
                method: 'POST',
                body: JSON.stringify(finalOrder),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseJSON = await response.json();

            switch (response.status) {
                case 201:
                    setLoader(false);
                    handleSuccess(responseJSON);
                    navigate("/orders/getorders/1");
                    return;
                case 400:
                    setLoader(false);
                    const errors = responseJSON.errors.map((error) => error.msg)
                    Modal(response.status, errors);
                    handleFail(responseJSON);
                    return;
                case 500:
                    setLoader(false);
                    handleFail(responseJSON);
                    navigate("/orders/getorders/1");
                    return
                default:
                    setLoader(false);
                    handleFail('Ah ocurrido un error inesperado');
                    navigate("/orders/getorders/1");
                    return;
            };
        }catch(err){
            console.log(err);
            handleFail('Ops, ah ocurrido un error interno al momento de crear el pedido');
        };
    };

    return (
        <>
        {loader ? (
            <Loader/>
        ) : (
            // FONDO
            <section className="flex w-full h-full justify-center bg-gray-200">
                {/* SECCION PRINCIPAL */}
                <section className="flex flex-col bg-white rounded-xl shadow-xl mx-3 mb:my-8 mb:px-5 mb:py-5 md:py-5 md:my-3 md:px-20">
                    {/* TITULO */}
                    <h2 className="text-2xl font-bold mb-4 text-center">
                        Crear pedido
                    </h2>     
                    {/* INPUTS */}
                    {/* SELECCIONAR CLIENTE */}
                    <div className="flex flex-col mb-4">
                        <label htmlFor="client" className="text-gray-700">Lista de clientes: *</label>
                        <select
                        defaultValue={"none"} 
                        name="client"
                        id="client"
                        value={order.id_client_fk || "none"}
                        onChange={(e)=> {setOrder({...order, id_client_fk: e.target.value})}}
                        className="mt-1 block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                        >
                            <option value="none">Seleccionar cliente...</option>
                            {clients.length > 0 && clients.map((client)=> (
                                <option 
                                value={client.id_client}
                                key={client.id_client}
                                >
                                    {client.id_client} | {client.name_client}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* SECCION DE FECHA */}
                    <div className="flex flex-col mb-4">
                        <label htmlFor="deliberyDay" className="text-gray-700">Fecha de entrega: *</label>
                        <input 
                        type='date' 
                        className="mt-1 block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-s"
                        onChange={(e)=> setOrder({...order, delivery_day_order: e.target.value})}
                        required
                        />
                    </div>
                    {/* SECCION LUGAR DE ENTREGA */}
                    <div className="flex flex-col mb-4">
                    <label htmlFor="shipping_address_order" className="text-gray-700">Lugar de entrega: </label>
                        <input 
                        type='text'
                        max={100} 
                        className="mt-1 block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-s"
                        onChange={(e)=> setOrder({...order, shipping_address_order: e.target.value})}
                        />
                    </div>
                    {/* SELECCIONAR PRODUCTOS */}
                    <div className="flex flex-row mb-4 gap-2">
                        {/* SELECTOR */}
                        <div className="flex flex-col">
                            <label htmlFor="products" className="text-gray-700">Productos: *</label>
                            <select 
                            defaultValue={"none"}
                            name="products" 
                            id="products"
                            className="mt-1 w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            value={productRef.id_product || "none"}
                            onChange={(e)=> setProductRef(productList.find((product)=> product.id_product === Number(e.target.value)))}
                            >
                                <option value="none">Seleccionar producto...</option>
                                {Array.isArray(productList) && productList.length > 0 && productList.map((product)=> {
                                    if(product.disabled){
                                        return (
                                            <option 
                                            value={product.id_product}
                                            key={product.id_product}
                                            className="text-white bg-gray-500"
                                            disabled
                                            >
                                                {product.id_product} | {product.name_product}
                                            </option>
                                        )
                                    }else {
                                        return (
                                            <option 
                                            value={product.id_product}
                                            key={product.id_product}
                                            className="text-gray-700"
                                            >
                                                {product.id_product} | {product.name_product}
                                            </option>                                            
                                        )
                                    }
                                })}
                            </select>
                        </div>
                        {/* INPUT DE UNIDADES DE VENTA DEL PRODUCTO */}
                        <div className="flex flex-col">
                            <label htmlFor="unit" className="text-gray-700">Cantidad: *</label>
                            <input 
                            type="number"
                            min={0}
                            value={UnitRef || 0}
                            onChange={(e)=> setUnitRef(Number(e.target.value))} 
                            className="mt-1 w-20 md:w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            />
                        </div>
                        <button
                            className="rounded-lg bg-green-700 text-white p-2 border border-gray-300 hover:bg-green-800 mt-6"
                            onClick={handleAddProduct}
                        >
                            Agregar
                        </button>
                    </div>
                    {/* PRODUCTOS SELECCIONADO */}
                    {order.products?.length > 0 && order.products.map((product)=> (
                        <div key={product.id_product} className="flex flex-row mb-3">
                            <div className="flex flex-row px-5">
                                <h3 className="text-gray-700">
                                    - {product.name_product} ({product.unit_product})
                                </h3>
                            </div>
                            <button
                                className="bg-red-700 text-white rounded-lg border border-gray-300 px-2 hover:bg-red-800"
                                onClick={() =>
                                    handleRemoveMaterial(product.id_product)
                                }
                            >
                                Eliminar
                            </button>
                        </div>                        
                    ))}
                    {/* Botón de creación */}
                    <button
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={handleSubmit}
                    >
                        Crear Pedido
                    </button>
                </section>
            </section>
        )}
        </>
    )
};

export default AddOrders;