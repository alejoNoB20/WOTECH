import { useEffect, useRef, useState } from "react";
import Loader from "@components/loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useModal } from "@context/modalContext";
import { useNotifications } from "@context/notificationsContext";

const DetailsProduct = () => {
    const [loader, setLoader] = useState(true);
    const [changeImg, setChangeImg] = useState(false);

    const [product, setProduct] = useState({});
    const [updateProduct, setUpdateProduct] = useState({});
    const [stock, setStock] = useState({});
    const [tools, setTools] = useState({});

    const [model, setModel] = useState(false);
    const [toolRef, setToolRef] = useState(null);
    const [materialRef, setMaterialRef] = useState(null);
    const [quantityMaterialRef, setQuantityMaterialRef] = useState(null);
    let selectRef = useRef(null);
    let quantityRef = useRef(0);
    
    const [materialSelected, setMaterialSelected] = useState([]);
    const [toolSelected, setToolSelected] = useState([]);

    const { id } = useParams();
    const { openModal } = useModal();
    const navigate = useNavigate();
    const notify = useNotifications();

    const mostrarError = (httpErr, errors) => {
        openModal({
            errorType: httpErr,
            validationErrors: errors,
        })
    };

    const handleSuccess = (msg) => {
        notify("success", msg)
    };
    
    const handleFail = (msg) => {
        notify("fail", msg)
    };
    
    useEffect(()=> {
        const fetchData = async () =>{
            try{
                const response = await fetch(`${process.env.REACT_APP_API_URL}/products/details/${id}`);
                const responseJSON = await response.json();
                setProduct(responseJSON[0]);
                setUpdateProduct(responseJSON[0]);

            }catch(err) {
                console.log(err);
            }finally{
                setLoader(false);
            }
        }

        fetchData();

    }, [id]);

    const handleRef = (option, value) => {
        if(option === "material"){
            setMaterialRef(value);
        }else if(option === "quantity"){
            setQuantityMaterialRef(value);
        }else {
            setToolRef(value);
        }
    };

    const handleUpdate = async () => {
        try{
            const response = await fetch(`${process.env.REACT_APP_API_URL}/products/getStockAndTools`);
            const responseJSON = await response.json();

            const listMaterialSelected = [];
            const listToolSelected = [];

            for(const material of updateProduct.stocks){
                const usedMaterialIndex  = responseJSON.stock.findIndex((usedMaterial)=> usedMaterial.id_material === material.id_material);
                responseJSON.stock[usedMaterialIndex].disabled = true; 
                listMaterialSelected.push({"id": material.id_material, "name_material": material.name_material, "how_much_content": Math.round(material.productStocksAssociation.how_much_contains_use)});
            };
            setStock(responseJSON.stock);
            setMaterialSelected(listMaterialSelected);

            for(const tool of updateProduct.tools){
                const usedToolIndex  = responseJSON.tools.findIndex((usedTaterial)=> usedTaterial.id_tool === tool.id_tool);
                responseJSON.tools[usedToolIndex].disabled = true; 
                listToolSelected.push(tool);
            };
            setTools(responseJSON.tools);
            setToolSelected(listToolSelected);

        }catch(err){
            console.log(err);  
        };   
        setModel(true);

    };

    const handleChange = (e) => {
        const { value, name, files, type } = e.target;

        if (type === "file") {
            setUpdateProduct({
            ...updateProduct,
            [name]: files[0]
        })
        } else {
            setUpdateProduct({
            ...updateProduct,
            [name]: value,
        })
        }
    };

    const handleMaterialRedirect = (e) => {
        navigate(`/stock/detailstock/${e.target.value}`);
    };

    const handleToolRedirect = (e) => {
        navigate(`/tools/updatetool/${e.target.value}`);
    };

    const handleButtonClick = (id) => {
        navigate(`/products/map/${id}`);
    };

    const handleAddMaterial = () => {
        if(materialRef && quantityMaterialRef.length !== 0 && quantityMaterialRef > 0){
            const stocks = [...stock];
            const newStock = stocks.map((stock)=> {
                if(stock.id_material !== materialRef.id_material){
                    return stock;
                }else {
                    stock.disabled = true;
                    return stock;
                };
            });
            setStock(newStock);
            
            const materials = [...materialSelected];
            materials.push({"id": materialRef.id_material, "name_material": materialRef.name_material, "how_much_content": Math.round(quantityMaterialRef)});
            setMaterialSelected(materials);
            selectRef.current.value = "none";
            quantityRef.current.value = 0;
            setMaterialRef(null);
            setQuantityMaterialRef(0);
        }
    };

    const handleRemoveMaterial = (material) => {
        const stocks = [...stock];
        const newStock = stocks.map((stock)=> {
            if(stock.id_material !== material.id){
                return stock;
            }else {
                stock.disabled = false;
                return stock;
            }
        });
        setStock(newStock);
        
        const materialSelectedList = [...materialSelected];
        const removeMaterial = materialSelectedList.filter((materialSelected)=> materialSelected.id !== material.id);
        setMaterialSelected(removeMaterial);
    }

    const handleAddTool = () => {
        if(toolRef){
            const choisedTool = [...toolSelected];
            const newToolList = tools.map((tool)=> {
                if(tool.id_tool !== toolRef.id_tool){
                    return tool;
                }else {
                    tool.disabled = true;
                    return tool;
                }
            });
            setTools(newToolList);

            choisedTool.push(toolRef);
            setToolSelected(choisedTool);
            selectRef.current.value = "none";
            setToolRef(null);
        }
    };
    
    const handleRemoveTool = (eliminatedTool) => {
        const toolList = [...tools];
        const newTools = toolList.map((tool)=> {
            if(tool.id_tool !== eliminatedTool.id_tool){
                return tool;
            }else {
                tool.disabled = false;
                return tool;
            }
        });
        setTools(newTools);
        
        const toolSelectedList = [...toolSelected];
        const removeTool = toolSelectedList.filter((toolSelected)=> toolSelected.id_tool !== eliminatedTool.id_tool);
        setToolSelected(removeTool);
    };

    const handleDisable = async (e) => {
        try{
            const confirmDelete = window.confirm(
                `¿Estás seguro de que quieres eliminar el producto "${product.name_product}"?`
            );
            if(confirmDelete){
                setLoader(true);
                const response = await fetch(`${process.env.REACT_APP_API_URL}/products/disabled/${id}`, {
                    method: 'PATCH',
                    headers: { "Content-Type": "application/json" }
                });
                const responseJSON = await response.json();
                if(!response.ok){
                    if(response.status === 500){
                        setLoader(false);
                        handleFail(responseJSON);
                        navigate("/products/getproducts/1");
                        return;
                    };
                }else {
                    setLoader(false);
                    handleSuccess(responseJSON);
                    navigate("/products/getproducts/1");
                    return;        
                };
            }
        }catch(err){
            console.log(err);
        }
    };

    const handleSubmit = async () => {        
        const materialList = materialSelected.map(material=> {
            return {"id": material.id, "how_much_content": material.how_much_content};
        });
        const toolList = toolSelected.map(tool=> {
            return tool.id_tool;
        });

        const finalProduct = {
            ...updateProduct,
            materials: JSON.stringify(materialList),
            tools: JSON.stringify(toolList)
        };
        const formData = new FormData();

        for (const key in finalProduct){
            const value = finalProduct[key]
            if(value !== undefined){
                formData.append(key, value)
            }else {
                formData.append(key, "");
            }
        };

        try{
            setLoader(true);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/products/update/${updateProduct.id_product}`, {
                method: 'PATCH',
                body: formData,
            });
            const responseJSON = await response.json();

            switch (response.status) {
                case 200:
                    setLoader(false);
                    handleSuccess(responseJSON);
                    navigate("/products/getproducts/1");
                    return;
                case 400:
                    setLoader(false);
                    const errors = responseJSON.errors.map((error) => error.msg)
                    mostrarError(response.status, errors);
                    handleFail(responseJSON);
                    return;
                case 500:
                    setLoader(false);
                    handleFail(responseJSON);
                    navigate("/products/getproducts/1");
                    return
                default:
                    setLoader(false);
                    handleFail('Ah ocurrido un error inesperado');
                    navigate("/products/getproducts/1");
                    return;
            }

        }catch(err) {
            console.log(err);
            handleFail('Ups!, un error ocurrio a la hora de manejar la información, inténtalo nuevamente');
            setLoader(false);
        }
};

    return(
        <>
            {loader ? (
                <Loader/>
            ) : (
                // FONDO
                <section className="flex w-full h-full justify-center bg-gray-200">
                {!model ? (
                    // PRINCIPAL
                    <div className="flex flex-col bg-white px-3 rounded-lg shadow-2xl text-center items-center py-2 m-5 md:m-3 md:px-14">
                        {/* TITULO */}
                        <h2 className="text-2xl font-bold mb-4 text-center">Detalles del producto: {product.name_product}</h2>
                        <div className="flex mb:flex-col md:flex-row justify-center items-center md:space-x-12">
                            {/* Imagen de la herramienta */}
                            <div className="flex justify-center mb-4">
                                <img
                                    src={
                                    product.img_product ||
                                    "https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png"
                                    }
                                    alt={product.name_product || "Imagen de la herramienta"}
                                    className="rounded-lg mb-4 max-w-40 max-h-40 md:max-w-56 md:max-h-56 shadow-xl"
                                />
                            </div>
                            {/* Datos Nombre, Plano, Precio */}
                            <div className="flex flex-col gap-2 mb-4">
                                <div className="flex flex-row md:flex-col space-x-4 mb-2">
                                    {/* Nombre */}
                                    <div className="flex flex-col">
                                        <h4 className="text-gray-400 text-xs font-semibold">Nombre:</h4>
                                        <p className="text-gray-800 text-lg">
                                        {product.name_product || "No disponible"}
                                        </p>
                                    </div>
                                    {/* Precio */}
                                    <div className="flex flex-col">
                                        <h4 className="text-gray-400 text-xs font-semibold">Precio:</h4>
                                        <p className="text-gray-800 text-lg">
                                        $ {product.price_product || "No disponible"}
                                        </p>
                                    </div>
                                </div>    
                                {/* Plano del producto */}
                                <div className="flex flex-col">
                                    <h4 className="text-gray-400 text-xs font-semibold">
                                    Plano del producto:
                                    </h4>
                                    {product.map_product ? (
                                    <button
                                        className="flex px-5 py-2 mt-4 bg-green-600 transition hover:bg-green-700 hover:text-white text-gray-700 rounded-lg"
                                        onClick={() => handleButtonClick(product.id_product)}
                                    >
                                        Ver plano
                                    </button>
                                    ) : (
                                    <p className="text-gray-800 text-lg">No disponible</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Descripción */}
                        <div className="flex flex-col mb-4">
                            <h4 className="text-gray-400 text-xs font-semibold">Descripción:</h4>
                            <p className="text-gray-800 text-lg rounded-lg text-center max-w-xs md:max-w-sm break-words">
                            {product.description_product || "Sin descripción"}
                            </p>
                        </div>

                        {/* Lista de materiales */}
                        <div className="flex flex-col mb-4">
                            <h4 className="text-gray-400 text-xs font-semibold">
                            Lista de materiales:
                            </h4>
                            <select
                            name="materialList"
                            id="materialList"
                            defaultValue="none"
                            onChange={handleMaterialRedirect}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb:text-xs"
                            >
                            <option value="none">
                                Seleccionar material para ver su descripción...
                            </option>
                            {product.stocks.length > 0 &&
                                product.stocks.map((material) => (
                                <option
                                    value={material.id_material}
                                    key={material.id_material}
                                >
                                    {material.id_material} | {material.name_material}{" "}
                                    {`(${material.productStocksAssociation.how_much_contains_use})`}
                                </option>
                                ))}
                            </select>
                        </div>

                        {/* Lista de herramientas */}
                        <div className="flex flex-col mb-4">
                            <h4 className="text-gray-400 text-xs font-semibold">
                            Lista de herramientas:
                            </h4>
                            <select
                            name="toolList"
                            id="toolList"
                            defaultValue="none"
                            onChange={handleToolRedirect}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb:text-xs"
                            >
                            <option value="none">
                                Seleccionar herramienta para ver su descripción...
                            </option>
                            {product.tools.length > 0 &&
                                product.tools.map((tool) => (
                                <option value={tool.id_tool} key={tool.id_tool}>
                                    {tool.id_tool} | {tool.name_tool}
                                </option>
                                ))}
                            </select>
                        </div>
                        {/* Botón Actualizar */}
                        <button
                            onClick={handleUpdate}
                            className="mx-auto px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                        >
                            <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
                            Actualizar herramienta
                        </button>
                    </div>
                ) : (
                    <section className="flex flex-col bg-white px-3 rounded-lg shadow-2xl text-center justify-center py-4 my-7 md:m-3 md:space-x-8">
                        <h2 className="text-2xl font-bold mb-4 mx-5 justify-center">Actualizar producto: {updateProduct.name_product}</h2>
                        {/* Inputs e imagen */}
                        <div className="flex flex-col md:flex-row mx-3">
                            {/* Imagen */}
                            <div className="flex flex-col w-auto min-w-[340px] px-10 justify-center text-center items-center">
                                <button className="rounded-lg text-white bg-indigo-600 hover:bg-indigo-800 font-bold mx-auto mb-2 py-2 px-10" onClick={()=>{!changeImg ? setChangeImg(true) : setChangeImg(false)}}>
                                <FontAwesomeIcon icon={faFileImage} className="mr-2"/>
                                    Cambiar Imagen
                                </button>
                                {changeImg ? (
                                    <input type="file" className="mt-3 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm my-3" id="img_product" name="img_product" onChange={handleChange}/>
                                ) : (
                                    <img id="img" src={product.img_product} alt={`Imagen de ${product.name_product}`} className="rounded-lg mb-4 max-w-40 max-h-40 md:max-w-56 md:max-h-56 shadow-xl" onClick={()=> console.log(product)}/>
                                )}
                            </div>
                            {/* Inputs */}
                            <div className="flex w-full flex-col space-y-4 mb-4 md:space-y-7 md:mx-10 items-center">
                                {/* Nombre */}
                                <div className="mb-2">
                                    <label htmlFor="name_product" className="block text-gray-700">
                                        Nombre: *
                                    </label>
                                    <input
                                        type="text"
                                        id="name_product"
                                        name="name_product"
                                        value={updateProduct.name_product || ""}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {/* Precio */}
                                <div className="mb-2">
                                    <label htmlFor="price_product" className="block text-gray-700">
                                        Precio: *
                                    </label>
                                    <div className="flex flex-row items-center">
                                        <p className="text-lg text-gray-700 justify-center text-center mr-2">$</p>
                                        <input
                                            type="number"
                                            id="price_product"
                                            min={0}
                                            name="price_product"
                                            value={updateProduct.price_product || ""}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                {/* PLANO */}
                                <div className="mb-2">
                                    <label htmlFor="map_product" className="block text-gray-700">
                                        Nuevo plano del producto:
                                    </label>
                                    <input
                                        type="file"
                                        id="map_product"
                                        name="map_product"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 mb:text-xs"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Descripción */}
                        <div className="mb-2 px-10">
                            <label htmlFor="description_product" className="block text-gray-700">
                                Descripción:
                            </label>
                            <textarea
                                id="description_product"
                                name="description_product"
                                value={updateProduct.description_product || "Sin descripción"}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                onChange={handleChange}
                                />
                        </div>
                        
                        {/* Materiales y herramientas */}
                        <div className="flex flex-col md:flex-row gap-4 mb-4 px-4">
                        {/* Materiales */}
                        <div className="flex flex-col w-full">
                            <div className="mb-4 items-center">
                            <label htmlFor="stockList" className="block text-gray-700">
                                Lista de materiales: *
                            </label>
                            <div className="flex flex-col md:flex-row gap-2">
                                {/* Selector de materiales */}
                                <select
                                ref={selectRef}
                                name="stockList"
                                id="stockList"
                                className="mt-1 block h-10 w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                defaultValue="none"
                                onChange={(e) =>
                                    handleRef(
                                    "material",
                                    stock.find((material) => material.id_material === parseInt(e.target.value))
                                    )
                                }
                                >
                                <option value="none" className="text-gray-700">
                                    Seleccionar material...
                                </option>
                                {Array.isArray(stock) &&
                                    stock.length > 0 &&
                                    stock.map((material) =>
                                    material.disabled ? (
                                        <option
                                        key={material.id_material}
                                        value={material.id_material}
                                        className="text-white bg-gray-500"
                                        disabled
                                        >
                                        {material.id_material} | {material.name_material}
                                        </option>
                                    ) : (
                                        <option
                                        key={material.id_material}
                                        value={material.id_material}
                                        className="text-gray-700"
                                        >
                                        {material.id_material} | {material.name_material}
                                        </option>
                                    )
                                    )}
                                </select>

                                {/* Cantidad */}
                                <div className="flex flex-col md:w-40">
                                <label htmlFor="quantity" className="block text-gray-700">
                                    Cantidad: *
                                </label>
                                <input
                                    ref={quantityRef}
                                    type="number"
                                    min={0}
                                    name="quantity"
                                    id="quantity"
                                    className="mt-1 w-full h-10 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    onChange={(e) => handleRef("quantity", parseInt(e.target.value))}
                                    required
                                />
                                </div>

                                {/* Botón Agregar */}
                                <button
                                className="self-end h-10 mb:w-full rounded-lg bg-green-700 text-white p-2 border border-gray-300 hover:bg-green-800"
                                onClick={handleAddMaterial}
                                >
                                Agregar
                                </button>
                            </div>
                            </div>

                            {/* Listado de materiales seleccionados */}
                            <div className="flex flex-col gap-2">
                            {materialSelected.map((material) => (
                                <div key={material.id} className="flex justify-between items-center">
                                <span className="text-gray-700">
                                    - {material.name_material} ({material.how_much_content})
                                </span>
                                <button
                                    className="bg-red-700 text-white rounded-lg border border-gray-300 px-2 py-1 hover:bg-red-800"
                                    onClick={() =>
                                    handleRemoveMaterial(
                                        materialSelected.find((mat) => mat.id === material.id)
                                    )
                                    }
                                >
                                    Eliminar
                                </button>
                                </div>
                            ))}
                            </div>
                        </div>
                
                        {/* Herramientas */}
                        <div className="flex flex-col w-full">
                            <div className="mb-4">
                                <label htmlFor="toolList" className="block text-gray-700">
                                Lista de herramientas: *
                                </label>
                                    <div className="flex flex-col md:flex-row gap-2">
                                    <select
                                        ref={selectRef}
                                        name="toolList"
                                        id="toolList"
                                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                        defaultValue="none"
                                        onChange={(e) =>
                                        handleRef(
                                            "tool",
                                            tools.find((tool) => tool.id_tool === parseInt(e.target.value))
                                        )
                                        }
                                    >
                                        <option value="none" className="text-gray-700">
                                        Seleccionar herramienta...
                                        </option>
                                        {Array.isArray(tools) &&
                                        tools.length > 0 &&
                                        tools.map((tool) =>
                                            tool.disabled ? (
                                            <option
                                                key={tool.id_tool}
                                                value={tool.id_tool}
                                                className="text-white bg-gray-500"
                                                disabled
                                            >
                                                {tool.id_tool} | {tool.name_tool}
                                            </option>
                                            ) : (
                                            <option
                                                key={tool.id_tool}
                                                value={tool.id_tool}
                                                className="text-gray-700"
                                            >
                                                {tool.id_tool} | {tool.name_tool}
                                            </option>
                                            )
                                        )}
                                    </select>
                                    <button
                                        className="rounded-lg bg-green-700 text-white p-2 border border-gray-300 hover:bg-green-800"
                                        onClick={handleAddTool}
                                    >
                                        Agregar
                                    </button>
                                    </div>
                                </div>
                
                                {/* Listado de herramientas seleccionadas */}
                                <div className="flex flex-col gap-2">
                                    {toolSelected.map((tool) => (
                                    <div key={tool.id_tool} className="flex justify-between items-center">
                                        <span className="text-gray-700">- {tool.name_tool}</span>
                                        <button
                                        className="bg-red-700 text-white rounded-lg border border-gray-300 px-2 py-1 hover:bg-red-800"
                                        onClick={() =>
                                            handleRemoveTool(toolSelected.find((t) => t.id_tool === tool.id_tool))
                                        }
                                        >
                                        Eliminar
                                        </button>
                                    </div>
                                    ))}
                                </div>
                            </div>
                        </div>                          

                        {/* Botonera */}
                        <section className="flex flex-row my-4 space-x-4 w-full justify-center items-center">
                            <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-lg"
                            onClick={handleSubmit} 
                            >
                                Actualizar 
                            </button>
                            <button
                                onClick={handleDisable}
                                className="px-5 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 justify-center items-center"
                            >
                                Eliminar
                            </button>
                            <button className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-6 rounded-lg"
                            onClick={()=> setModel(false)} 
                            >
                                Volver
                            </button>
                        </section>
                    </section>
                )}
                </section>
            )}
        </>
    )
}

export default DetailsProduct;
