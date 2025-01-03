import Loader from "../../components/loader/Loader";
import { useEffect, useRef, useState } from "react";
import { useNavigate} from "react-router-dom";
import { useModal } from "../../context/modalContext";
import { useNotifications } from "../../context/notificationsContext";

const AddProducts = () => {
    const [loader, setLoader] = useState(false);
    
    const [product, setProduct] = useState({});
    const [stock, setStock] = useState({});
    const [tools, setTools] = useState({});

    const [materialSelected, setMaterialSelected] = useState([]);
    const [toolSelected, setToolSelected] = useState([]);

    let selectRef = useRef(null);
    let quantityRef = useRef(0);
    const [toolRef, setToolRef] = useState(null);
    const [materialRef, setMaterialRef] = useState(null);
    const [quantityMaterialRef, setQuantityMaterialRef] = useState(null);

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
        const fetchData = async () => {
            setLoader(true);

            try{
                const response = await fetch(`${process.env.REACT_APP_API_URL}/products/getStockAndTools`);
                const responseJSON = await response.json();
                setStock(responseJSON.stock);
                setTools(responseJSON.tools);

            }catch(err){
                console.log(err);
            }finally{
                setLoader(false);
            };
        } 
        fetchData();
        
    }, [])

    const handleRef = (option, value) => {
        if(option === "material"){
            setMaterialRef(value);
        }else if(option === "quantity"){
            setQuantityMaterialRef(value);
        }else {
            setToolRef(value);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target
    
        if (type === "file") {
            setProduct({
            ...product,
            [name]: files[0]
        })
        } else {
            setProduct({
            ...product,
            [name]: value,
        })
        }
    }

    const handleAddMaterial = () => {
        if(materialRef && quantityMaterialRef.length != 0 && quantityMaterialRef > 0){
            const stocks = [...stock];
            const newStock = stocks.map((stock)=> {
                if(stock.id_material !== materialRef.id_material){
                    return stock;
                }else {
                    stock.disabled = true;
                    return stock;
                }
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

    const handleSubmit = async (e) => {
            e.preventDefault();
            
            const materialList = materialSelected.map(material=> {
                return {"id": material.id, "how_much_content": material.how_much_content};
            });
            const toolList = toolSelected.map(tool=> {
                return tool.id_tool;
            });

            const finalProduct = {
                ...product,
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
            console.log(finalProduct)
            try{
                setLoader(true);
                const response = await fetch(`${process.env.REACT_APP_API_URL}/products/create`, {
                    method: 'POST',
                    body: formData,
                });
                const responseJSON = await response.json();

                switch (response.status) {
                    case 201:
                        setLoader(false);
                        handleSuccess(responseJSON);
                        navigate("/products/getproducts");
                        return;
                    case 400:
                        setLoader(false);
                        const errors = responseJSON.errors.map((error) => error.msg)
                        mostrarError(response.status, errors);
                        handleFail(responseJSON);
                        return;
                    case 404:
                        setLoader(false);
                        mostrarError(response.status, [responseJSON]);
                        handleFail(responseJSON);
                        return
                    case 500:
                        setLoader(false);
                        handleFail(responseJSON);
                        navigate("/products/getproducts");
                        return
                    default:
                        setLoader(false);
                        handleFail('Ah ocurrido un error inesperado');
                        navigate("/products/getproducts");
                        return;
                }

            }catch(err) {
                handleFail('Ups!, un error ocurrio a la hora de manejar la información, inténtalo nuevamente');
                navigate('/products/getproducts');
            }
    };

    return (
        <>
            {loader ? (
                <Loader />
            ) : (
                <div className="w-auto h-auto mx-auto bg-gray-100 px-6 py-2 mt-2 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Ingresar producto</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-row">
                            {/* Primera columna */}
                            <div className="flex flex-col px-10 w-full">
                                <div className="mb-4">
                                    <label htmlFor="name_product" className="block text-gray-700">
                                        Nombre:
                                    </label>
                                    <input
                                        type="text"
                                        id="name_product"
                                        name="name_product"
                                        value={product.name_product || ""}
                                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="price_product" className="block text-gray-700">
                                        Precio:
                                    </label>
                                    <div className="flex flex-grow">
                                        <p className="text-lg text-gray-700 pr-2 pt-2">$</p>
                                        <input
                                            type="number"
                                            id="price_product"
                                            min={0}
                                            name="price_product"
                                            value={product.price_product || ""}
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
    
                            {/* Segunda columna */}
                            <div className="flex flex-col w-full px-10">
                                <div className="mb-2">
                                    <label htmlFor="img_product" className="block text-gray-700">
                                        Imagen del producto:
                                    </label>
                                    <input
                                        type="file"
                                        id="img_product"
                                        name="img_product"
                                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="map_product" className="block text-gray-700">
                                        Plano del producto:
                                    </label>
                                    <input
                                        type="file"
                                        id="map_product"
                                        name="map_product"
                                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                                value={product.description_product || ""}
                                className="mt-1 block w-full px-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={handleChange}
                                />
                        </div>
                    </form>
    
                    {/* Materiales y herramientas */}
                    <div className="flex flex-row mt-4 ml-10 mb-4">
                        {/* Materiales */}
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <label htmlFor="stockList" className="text-gray-700 mb-2">
                                    Lista de stock:
                                </label>
                                <label htmlFor="quantity" className="text-gray-700 mb-2 pl-32">
                                    Cantidad:
                                </label>
                            </div>
                            <div className="flex flex-row mb-4">
                                <select
                                    ref={selectRef}
                                    name="stockList"
                                    id="stockList"
                                    className="text-gray-700 rounded-lg mr-2 p-2 border border-gray-300"
                                    defaultValue="none"
                                    onChange={(e) =>
                                        handleRef("material", stock.find((material) => material.id_material === parseInt(e.target.value)))
                                    }
                                >
                                    <option value="none" className="text-gray-700">
                                        Seleccionar material...
                                    </option>
                                    {stock.length > 0 && stock.map((material) =>
                                        material.disabled ? (
                                            <option key={material.id_material} value={material.id_material} className="text-white bg-gray-500" disabled>
                                                {material.id_material} | {material.name_material}
                                            </option>
                                        ) : (
                                            <option key={material.id_material} value={material.id_material} className="text-gray-700">
                                                {material.id_material} | {material.name_material}
                                            </option>
                                        )
                                    )}
                                </select>
                                <input
                                    ref={quantityRef}
                                    type="number"
                                    min={0}
                                    name="quantity"
                                    id="quantity"
                                    className="text-gray-700 rounded-lg border border-gray-300 mr-2 px-3 max-w-24"
                                    onChange={(e) => handleRef("quantity", parseInt(e.target.value))}
                                    required
                                />
                                <button
                                    className="rounded-lg bg-green-700 text-white mr-2 p-2 border border-gray-300 hover:bg-green-800"
                                    onClick={handleAddMaterial}
                                >
                                    Agregar
                                </button>
                            </div>

                            {/* Listado de materiales seleccionados */}
                            <div className="flex flex-col">
                                {materialSelected.map((material) => (
                                    <div key={material.id} className="flex flex-row mb-3">
                                        <div className="flex flex-row px-5">
                                            <h3 className="text-gray-700">
                                                - {material.name_material} ({material.how_much_content})
                                            </h3>
                                        </div>
                                        <button
                                            className="bg-red-700 text-white rounded-lg border border-gray-300 px-2 hover:bg-red-800"
                                            onClick={() =>
                                                handleRemoveMaterial(materialSelected.find((mat) => mat.id === material.id))
                                            }
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
    
                        {/* Herramientas */}
                        <div className="flex flex-col ml-14">
                            <label htmlFor="toolList" className="text-gray-700 mb-2 pl-5">
                                Lista de herramientas:
                            </label>
                            <div className="flex flex-row px-5 mb-4">
                                <select
                                    ref={selectRef}
                                    name="toolList"
                                    id="toolList"
                                    className="text-gray-700 rounded-lg p-2 mr-2 border border-gray-300"
                                    defaultValue="none"
                                    onChange={(e) =>
                                        handleRef("tool", tools.find((tool) => tool.id_tool === parseInt(e.target.value)))
                                    }
                                >
                                    <option value="none" className="text-gray-700">
                                        Seleccionar herramienta...
                                    </option>
                                    {tools.length > 0 && tools.map((tool) =>
                                        tool.disabled ? (
                                            <option key={tool.id_tool} value={tool.id_tool} className="text-white bg-gray-500" disabled>
                                                {tool.id_tool} | {tool.name_tool}
                                            </option>
                                        ) : (
                                            <option key={tool.id_tool} value={tool.id_tool} className="text-gray-700">
                                                {tool.id_tool} | {tool.name_tool}
                                            </option>
                                        )
                                    )}
                                </select>
                                <button
                                    className="rounded-lg bg-green-700 text-white mr-2 p-2 border border-gray-300 hover:bg-green-800"
                                    onClick={handleAddTool}
                                >
                                    Agregar
                                </button>
                            </div>

                            {/* Listado de herramientas seleccionadas */}
                            <div className="flex flex-col">
                                {toolSelected.map((tool) => (
                                    <div key={tool.id_tool} className="flex flex-row mb-3">
                                        <div className="flex flex-row px-5">
                                            <h3 className="text-gray-700">- {tool.name_tool}</h3>
                                        </div>
                                        <button
                                            className="bg-red-700 text-white rounded-lg border border-gray-300 px-2 hover:bg-red-800"
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

                    {/* Botón de creación */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={handleSubmit}
                    >
                        Crear Producto
                    </button>
                </div>
            )}
        </>
    )};
    

export default AddProducts;