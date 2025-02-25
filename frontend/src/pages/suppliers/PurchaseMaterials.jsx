import { useState, useEffect, useRef } from "react";
import Loader from "@components/loader/Loader";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "@context/notificationsContext";
import { useModal } from "@context/modalContext";


const PurchaseMaterials = () => {
    const [loader, setLoader] = useState(false);
    const [supplierList, setSupplierList] = useState([]);
    const [supplier, setSupplier] = useState();
    const [finalPurchase, setFinalPurchase] = useState({
        "purchase": []
    });
    const [selectRef, setSelectRef] = useState("none");
    const [amountRef, setAmountRef] = useState(0);

    const navigate = useNavigate();
    const notify = useNotifications();
    const { openModal } = useModal();

    const Modal = (httpErr, errors) => {
        openModal({
            errorType: httpErr,
            validationErrors: errors,
        })
        };

    const handleSuccess = (text) => {
    notify('success', text);
    };
    
    const handleFail = (text) => {
        notify('fail', text);
    };

    useEffect(()=> {
        const fetchData = async () => {
            try{
                setLoader(true);
                // TRAEMOS LOS DATOS DE LOS PROVEEDORES DISPONIBLES
                const response = await fetch(`${process.env.REACT_APP_API_URL}/suppliers`);
                const responseJSON = await response.json();
                setSupplierList(responseJSON);

            }catch(err){    
                console.log(err);
            }finally{
                setLoader(false)
            };
        };
        fetchData();

    }, [])

    const handleSupplierList = async (e) => {
        try{
            // RECUPERA LOS DATOS DEL PROVEEDOR SELECCIONADO Y EN CASO DE CAMBIAR RESETEA LOS MATERIALES ELEGIDOS PARA ACTUALIZAR
            const response = await fetch(`${process.env.REACT_APP_API_URL}/suppliers/details/${e.target.value}`);
            const responseJSON = await response.json();
            setSupplier(responseJSON[0]);
            setFinalPurchase({
                "purchase": []
            });

        }catch(err){
            console.log(err);
        }
    };
    
    const handleAddMaterial = () => {
        if(selectRef !== "none" && selectRef && amountRef && amountRef > 0){
            const finalMaterialList = finalPurchase.purchase;

            // DESHABILITA LA OPCION DEL MATERIAL SELECCIONADO            
            const newListMaterials = supplier.stocks.map((material)=> {
                if(material.id_material === selectRef.id_material){
                    material.disabled = true;
                    return material;
                }else {
                    return material;
                };
            });
            setSupplier({...supplier, stocks: newListMaterials});
            
            // CREA EL OBJETO DEL MATERIAL SELECCIONADO 
            finalMaterialList.push({"id_material": selectRef.id_material, "name_material": selectRef.name_material, "price_material": selectRef.supplierStockAssociations.price_material, "amount_material": selectRef.supplierStockAssociations.amount_material, "id_supplier_material":selectRef.supplierStockAssociations.id_supplier_material, "unit_material": amountRef});

            // GUARDA EL MATERIAL A COMPRAR EN LA LISTA
            setFinalPurchase({"purchase": finalMaterialList});

            // RESETEA VALOR DE REF
            setSelectRef("none");
            setAmountRef(0);
        };
    };

    const handleRemoveMaterial = async (id_material) => {
        // VUELVE A HABILITAR EL MATERIAL LA OPCION DEL MATERIAL SELECCIONADO            
        const newListMaterials = supplier.stocks.map((material)=> {
            if(material.id_material === id_material){
                material.disabled = false;
                return material;
            }else {
                return material;
            };
        });
        setSupplier({...supplier, stocks: newListMaterials});
        
        const finalMaterialList = finalPurchase.purchase.filter((material)=> material.id_material !== id_material);
        setFinalPurchase({"purchase": finalMaterialList});
    };

    const handleBuy = async () => {
        try{
            setLoader(true)
            const finalList = finalPurchase.purchase.map((material)=> {
                return ({"id_supplier_material": material.id_supplier_material, "unit_material": material.unit_material});
            });
            
            const response = await fetch(`${process.env.REACT_APP_API_URL}/purchase`, {
                method: 'POST',
                body: JSON.stringify({"purchase": finalList}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseJSON = await response.json();

            switch (response.status) {
                case 201:
                    setLoader(false);
                    handleSuccess(responseJSON);
                    navigate("/suppliers/getsuppliers/1");
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
                    navigate("/suppliers/getsuppliers/1");
                    return
                default:
                    setLoader(false);
                    handleFail('Ah ocurrido un error inesperado');
                    navigate("/suppliers/getsuppliers/1");
                    return;
                };

        }catch(err) {
            console.log(err);
            handleFail('Ops! ah ocurrido un error inesperado a la hora de generar la compra');
            setLoader(false)
        }
    };

    return (
        <>
            {loader ? (
                <Loader/>
            ) : (
                // FONDO
                <section className="flex w-full h-full justify-center bg-gray-200">
                    {/* SECCION PRINCIPAL */}
                    <section className="flex flex-col bg-white rounded-xl shadow-xl mx-3 mb:my-9 mb:px-2 mb:py-5 md:py-5 md:my-3 md:px-20">
                        <h2 className="text-2xl font-bold mb-4 mx-5 text-center">
                            Seccion Compra de materiales:
                        </h2>
                        {/* LISTA DE PROVEEDORES */}
                        <div className="mb-6">
                            <label htmlFor="supplierList" className="block text-gray-500">Lista de proveedores: *</label>
                            <select 
                            name="supplierList" 
                            id="supplierList"
                            className="mt-1 w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={handleSupplierList}
                            >
                                <option value="none">Seleccionar proveedor...</option>
                                {Array.isArray(supplierList) && supplierList.length > 0 && supplierList.map((Supplier)=> (
                                    <option value={Supplier.id_supplier} key={Supplier.id_supplier}>
                                        - {Supplier.id_supplier} | {Supplier.name_company_supplier} ({Supplier.tax_address_supplier})
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* LISTA DE MATERIALES DEL PROVEEDOR */}
                        {supplier && (
                            <div className="flex flex-row justify-center gap-2 mx-2 mb-4">
                                {/* SELECCION DE MATERIAL */}
                                <div className="flex flex-col">
                                    <label htmlFor="supplier" className="block text-gray-500">Materiales: *</label>
                                    <select 
                                    name="supplier" 
                                    id="supplier"
                                    className="mt-1 w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                    defaultValue="none"
                                    onChange={(e)=> setSelectRef(supplier.stocks.find((material) => material.id_material === Number(e.target.value)))}
                                    value={selectRef?.id_material || "none"}
                                    >
                                        <option value="none" id="none">Seleccionar material...</option>
                                        {Array.isArray(supplier.stocks) && supplier.stocks?.length > 0 && supplier.stocks.map((material)=> (
                                            <>
                                                {!material.supplierStockAssociations.disabled && (
                                                    !material.disabled ? (
                                                        <option value={material.id_material} key={material.id_material}>
                                                            - {material.name_material}: ${`${material.supplierStockAssociations.price_material}`} {`(${material.supplierStockAssociations.amount_material})`}
                                                        </option>
                                                    ) : (
                                                        <option value={material.id_material} key={material.id_material} disabled className="text-white bg-gray-500">
                                                            - {material.name_material}: ${`${material.supplierStockAssociations.price_material}`} {`(${material.supplierStockAssociations.amount_material})`}
                                                        </option>
                                                    )
                                                )}
                                            </>
                                        ))}
                                    </select>
                                </div>
                                {/* INPUT CANTIDADES */}
                                <div className="mx-2">
                                    <label htmlFor="amountMaterial" className="block text-gray-500">Cantidades: *</label>
                                    <input 
                                    type="number"
                                    defaultValue={0}
                                    name="amountMaterial"
                                    id="amountMaterial"
                                    min={0}
                                    className="mt-1 w-24 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                    onChange={(e)=> setAmountRef(Number(e.target.value))}
                                    value={amountRef}
                                    />
                                </div>
                                {/* BOTON DE SELECCION */}
                                <button 
                                    className="rounded-lg bg-green-700 text-white px-2 border border-gray-300 hover:bg-green-800 mt-7"
                                    onClick={handleAddMaterial}                            
                                >
                                    Agregar
                                </button>
                            </div>
                        )}
                        {/* MATERIALES SELECCIONADOS */}
                        {finalPurchase.purchase?.length > 0 && finalPurchase.purchase.map((material)=> ( 
                            <div key={material.id_material} className="flex flex-row mb-3">
                                <div className="flex flex-row px-5">
                                    <h3 className="text-gray-700">
                                        - {material.name_material}: ${`${material.price_material}`} {`(${material.amount_material} x ${material.unit_material})`} | TOTAL: ({material.amount_material * material.unit_material})
                                    </h3>
                                </div>
                                <button
                                    className="bg-red-700 text-white rounded-lg border border-gray-300 px-2 hover:bg-red-800"
                                    onClick={() =>
                                        handleRemoveMaterial(material.id_material)
                                    }
                                >
                                    Eliminar
                                </button>
                            </div>                            
                        ))}
                        {/* BOTÓN DE GENERAR COMPRA */}
                        <button
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={handleBuy}
                        >
                            Generar Compra
                        </button>
                    </section>
                </section>
            )}
        </>
    )
};

export default PurchaseMaterials;