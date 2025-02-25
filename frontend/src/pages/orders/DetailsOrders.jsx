import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "@components/loader/Loader";
import { useModal } from "@context/modalContext";
import { useNotifications } from "@context/notificationsContext";
import { format, diffDays } from "@formkit/tempo";

const DetailsOrders = () => {
    const [loader, setLoader] = useState(false);
    const [modal, setModal] = useState(false);
    const [order, setOrder] = useState({});
    const [materialUsed, setMaterialUsed] = useState({});
    const [toolUsed, setToolUsed] = useState({});
    const [dayColorText, setDayColorText] = useState(null);

    const [updatedOrder, setUpdatedOrder] = useState({});
    const [productList, setProductList] = useState([]);
    const [clients, setClients] = useState([]);

    const [productRef, setProductRef] = useState({});
    const [UnitRef, setUnitRef] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams();
    const notify = useNotifications();
    const { openModal } = useModal();

    const handleFail = (msg) => {
        notify('fail', msg);
    };

    const handleSuccess = (msg) => {
        notify('success', msg);
    };

    const errorModal = (httpErr, errors) => {
        openModal({
            errorType: httpErr,
            validationErrors: errors,            
        })
    };

    useEffect(()=> {
        const fetchData = async () =>{
            try{
                setLoader(true);

                // RECUPERA LOS DATOS DETALLADOS DEL PEDIDO SELECCIONADO
                const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/details/${id}`);
                const responseJSON = await response.json();
                setOrder(responseJSON[0]);
                setMaterialUsed(responseJSON.materialUsed);
                setToolUsed(responseJSON.toolsUsed);

                const daysDiff = diffDays(responseJSON[0].delivery_day_order, new Date());

                if(daysDiff <= 3) {
                    setDayColorText('text-red-700');
                }else if(daysDiff >= 4 && daysDiff <= 5){
                    setDayColorText('text-yellow-700');
                }else {
                    setDayColorText('text-green-700');
                };

            }catch(err){
                const handleFail = (msg) => {
                    notify('fail', msg);
                };
                console.log(err);
                handleFail('Ops, ocurrio un error al momento de recuperar los datos de este pedido');
                navigate('/orders/getorders/1');
            }finally{
                setLoader(false);
            };
        };
        fetchData();

    }, [navigate, notify, id]);

    const handleUpdate = async () => {
        setLoader(true);
        setModal(true);
        try{
            setUpdatedOrder(order);
            
            // RECUPERA LOS DATOS NECESARIOS DE LOS PRODUCTOS Y CLIENTES EN LA DB PARA GENERAR UN PEDIDO
            const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/getProductsAndClients`);
            const responseJSON = await response.json();
            setClients(responseJSON.clients);

            // DESHABILITA LAS OPCIONES DE LOS PRODUCTOS SELECCIONADOS INICIALMENTE
            let newList = responseJSON.products;

            for(const product of order.products){
                const productFilter = newList.findIndex((usedProduct) => { return usedProduct.id_product === product.id_product});
                newList[productFilter].disabled = true;
            };
            setProductList(newList);

        }catch(err){
            console.log(err);
            handleFail('Ops, ocurrio un error al momento de querer ir a actualizar el pedido');
            setModal(false);
            setLoader(false);
        }finally{
            setLoader(false);
        }
    };

    const handleFinish = async () => {
        try{
            const confirmDelete = window.confirm(
                `¿Estás seguro de que quieres finalizar el pedido Nº${order.id_order}?`
            );
            if(confirmDelete){
                setLoader(true);
                const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/disabled/${id}`, {
                    method: 'PATCH',
                    headers: { "Content-Type": "application/json" }
                });
                const responseJSON = await response.json();

                if(!response.ok){
                    if(response.status === 500){
                        setLoader(false);
                        handleFail(responseJSON);
                        navigate("/orders/getorders/1");
                        return;
                    };
                }else {
                    setLoader(false);
                    handleSuccess(responseJSON);
                    navigate("/orders/getorders/1");
                    return;        
                };
            }

        }catch(err){
            console.log(err);
            handleFail('Ops, ocurrio un error al momento de finalizar el pedido');
            setLoader(false);
        };
    };

    const handleDelete = async () => {
        try{
            const confirmDelete = window.confirm(
                `¿Estás seguro de que quieres cancelar el pedido Nº${order.id_order}?`
            );
            if(confirmDelete){
                setLoader(true);
                const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/delete/${id}`, {
                    method: 'DELETE',
                    headers: { "Content-Type": "application/json" }
                });
                const responseJSON = await response.json();

                if(!response.ok){
                    if(response.status === 500){
                        setLoader(false);
                        handleFail(responseJSON);
                        navigate("/orders/getorders/1");
                        return;
                    };
                }else {
                    setLoader(false);
                    handleSuccess(responseJSON);
                    navigate("/orders/getorders/1");
                    return;        
                };
            }

        }catch(err){
            console.log(err);
            handleFail('Ops, ocurrio un error al momento de finalizar el pedido');
            setLoader(false);
        };
    };

    const handleAddProduct = () => {
        if(productRef && UnitRef > 0){
            let products = productList;
            const currentOrder = updatedOrder.products;
    
            // DESHABILITA EL PRODUCTO EN DE LA LISTA
            products.forEach((product)=> {
                if(product.id_product === productRef.id_product){
                    product.disabled = true;
                }
            });
            setProductList(products);
    
            // AGREGA EL PRODUCTO SELECCIONADO A LA LISTA 
            let orderList = [];
            if(currentOrder) orderList = currentOrder;
            orderList.push({'id_product': productRef.id_product, "name_product": productRef.name_product, "price_product": productRef.price_product, 'orderProductsAssociation': {'unit_product': UnitRef}});
            setOrder({...updatedOrder, products: orderList});
    
            // RESETEA LOS VALORES DE REFERENCIA
            setUnitRef(0);
            setProductRef('none');
        };
    };

    const handleRemoveMaterial = (id_product) => {
        let products = productList;
        const currentOrder = updatedOrder.products;

        // VUELVE A HABILITAR EL PRODUCTO EN LA LISTA
        products.forEach((product)=> {
            if(product.id_product === id_product){
                product.disabled = false;
            }
        });

        // ELIMINA EL PRODUCTO DEL "updatedOrder"
        const newProductSelectedList = currentOrder.filter((product)=> product.id_product !== id_product);
        setUpdatedOrder({...updatedOrder, products: newProductSelectedList});
    };

    const handleSubmit = async () => {
        try{
            setLoader(true);
            let Body = updatedOrder;

            // CREA EL BODY CORRECTO PARA LA ACTUALIZACION DEL PEDIDO
            const finalProductList = updatedOrder.products.map((product)=> {
                return {'id_product': product.id_product, 'price_product': product.price_product, 'unit_product': product.orderProductsAssociation.unit_product};
            });
            Body = {...Body, products:finalProductList};

            const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/update/${id}`,{
                method: 'PATCH',
                body: JSON.stringify(Body),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseJSON = await response.json();

            switch (response.status) {
                case 200:
                    setLoader(false);
                    handleSuccess(responseJSON);
                    navigate("/orders/getorders/1");
                    return;
                case 400:
                    setLoader(false);
                    const errors = responseJSON.errors.map((error) => error.msg)
                    errorModal(response.status, errors);
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
            }
        }catch(err){
            console.log(err);
            handleFail('Ops, ocurrio un error al momento de modificar el pedido');
            setLoader(false);
        };
    };

    return (
        <>
            {loader ? (
                <Loader/>
            ) : (
                <>
                    {/* FONDO */}
                    <section className="flex w-full h-full justify-center bg-gray-200">
                        {!modal ? (
                            // PRINCIPAL
                            <section className="flex flex-col bg-white rounded-xl shadow-xl mx-6 mb:my-6 mb:px-2 mb:py-5 md:py-5 md:my-3 md:px-20">
                                {/* TITULO */}
                                <h2 className="text-2xl justify-center text-center font-bold mb-4">
                                    Detalles del pedido {order.id_order}:
                                </h2>                               
                                {/* COLUMNAS DE INPUTS */}
                                <div className="flex fle-row w-full justify-center space-x-3 md:space-x-20">
                                    {/* COLUMNA Nº1 */}
                                    <div className="flex flex-col mb-4">
                                        {/* NOMBRE DEL CLIENTE */}
                                        <div className="flex flex-col mb-4">
                                            <h4 className="text-gray-500 font-semibold">Nombre del cliente:</h4>
                                            <p className="text-gray-800 text-lg">
                                                {order.client?.name_client} {order.client?.last_name_client}
                                            </p>
                                        </div>
                                        {/* PRECIO DEL PEDIDO */}
                                        <div className="flex flex-col mb-4">
                                            <h4 className="text-gray-500 font-semibold">Precio del pedido:</h4>
                                            <p className="text-gray-800 text-lg">
                                                $ {order.price_order}
                                            </p>
                                        </div>
                                    </div>
                                    {/* COLUMNA Nº 2 */}
                                    <div className="flex flex-col">
                                        {/* NOMBRE DEL CLIENTE */}
                                        <div className="flex flex-col mb-4">
                                            <h4 className="text-gray-500 font-semibold">Lugar de envío: </h4>
                                            <p className="text-gray-800 text-lg">
                                                {order.shipping_address_order || "No disponible"}   
                                            </p>
                                        </div>
                                        {/* DIA DE ENTREGA */}
                                        <div className="flex flex-col mb-4">
                                            <h4 className="text-gray-500 font-semibold">Día de entrega: </h4>
                                            <p className={`${dayColorText} text-lg`}>
                                                {format(order.delivery_day_order, 'DD/MM/YYYY') || "No disponible"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* LISTA DE PRODUCTOS QUE TIENE EL PEDIDO */}
                                <div className="flex flex-col justify-center mb-4">
                                    <label htmlFor="products" className="text-gray-500 font-semibold">Lista de productos:</label>
                                    <select 
                                    name="products" 
                                    id="products"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        {order.products?.length > 0 && order.products.map((product)=> (
                                            <option value={product.id}>
                                                {product.id_product} | {product.name_product} ({product.orderProductsAssociation.unit_product})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* LISTA DE MATERIALES Y HERRAMIENTAS UTILIZADAS EN EL PEDIDO */}
                                <div className="flex flex-row mb-4 justify-center items-center gap-3">
                                    {/* MATERIALES USADOS */}
                                    <div className="flex flex-col">
                                        <label htmlFor="materialUsed" className="text-gray-500 font-semibold">Materiales totales:</label>
                                        <select 
                                        name="materialUsed" 
                                        id="materialUsed"
                                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs md:text-sm"
                                        >
                                            {materialUsed.length > 0 && materialUsed.map((material)=> (
                                                <option value={material.id_material} key={material.id_material}>
                                                    {material.id_material} | {material.name_material} ({material.how_much_contains_use})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {/* HERRAMIENTAS USADAS */}
                                    <div className="flex flex-col">
                                        <label htmlFor="toolUsed" className="text-gray-500 font-semibold">Herramientas:</label>
                                        <select 
                                        name="toolUsed" 
                                        id="toolUsed"
                                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs md:text-sm"
                                        >
                                            {toolUsed.length > 0 && toolUsed.map((tool)=> (
                                                <option value={tool.id_tool} key={tool.id_tool}>
                                                    {tool.id_tool} | {tool.name_tool}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                {/* BOTONERA */}
                                <section className="flex flex-row justify-center gap-2">
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 font-bold"
                                    onClick={handleUpdate} 
                                    >
                                        Modificar
                                    </button>
                                    <button className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg"
                                    onClick={handleFinish} 
                                    >
                                        Entregado
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-500"
                                    >
                                        Cancelar 
                                    </button>
                                </section>
                            </section>
                        ) : (
                            // PRINCIPAL
                            <section className="flex flex-col bg-white rounded-xl shadow-xl mx-6 mb:my-6 mb:px-2 mb:py-5 md:py-5 md:my-3 md:px-20">
                                {/* TITULO */}
                                <h2 className="text-2xl font-bold mb-4 text-center">
                                    Actualizar pedido {updatedOrder.id_order}
                                </h2>     
                                {/* INPUTS */}
                                {/* SELECCIONAR CLIENTE */}
                                <div className="flex flex-col mb-4">
                                    <label htmlFor="client" className="text-gray-700">Lista de clientes: *</label>
                                    <select
                                    defaultValue={"none"} 
                                    name="client"
                                    id="client"
                                    value={updatedOrder.id_client_fk || "none"}
                                    onChange={(e)=> {setOrder({...updatedOrder, id_client_fk: e.target.value})}}
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
                                    value={updatedOrder.delivery_day_order || null}
                                    className="mt-1 block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-s"
                                    onChange={(e)=> setUpdatedOrder({...updatedOrder, delivery_day_order: e.target.value})}
                                    required
                                    />
                                </div>
                                {/* SECCION LUGAR DE ENTREGA */}
                                <div className="flex flex-col mb-4">
                                <label htmlFor="shipping_address_order" className="text-gray-700">Lugar de entrega: </label>
                                    <input 
                                    type='text'
                                    max={100} 
                                    value={updatedOrder.shipping_address_order || ""}
                                    className="mt-1 block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-s"
                                    onChange={(e)=> setUpdatedOrder({...updatedOrder, shipping_address_order: e.target.value})}
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
                                        className="mt-1 block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs md:text-sm"
                                        value={productRef.id_product || "none"}
                                        onChange={(e)=> setProductRef(productList.find((product)=> product.id_product === Number(e.target.value)))}
                                        >
                                            <option value="none">Seleccionar producto...</option>
                                            {productList.length > 0 && productList.map((product)=> {
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
                                        className="mt-1 w-20 md:w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs md:text-sm"
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
                                {Array.isArray(updatedOrder.products) && updatedOrder.products?.length > 0 && updatedOrder.products.map((product)=> (
                                    <div key={product.id_product} className="flex flex-row mb-4">
                                        <div className="flex flex-row px-5">
                                            <h3 className="text-gray-700">
                                                - {product.name_product} ({product.orderProductsAssociation.unit_product})
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
                                {/* Botonera */}
                                <section className="flex flex-row gap-3">
                                    <button className="mx-auto bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-lg"
                                    onClick={handleSubmit} 
                                    >
                                        Modificar
                                    </button>
                                    <button className="mx-auto bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-6 rounded-lg"
                                    onClick={()=> setModal(false)} 
                                    >
                                        Volver
                                    </button>
                                </section>
                            </section>
                        )}

                    </section>
                </>
            )}
        </>
    )
};

export default DetailsOrders;