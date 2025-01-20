import { useState, useEffect, useRef } from "react";
import Loader from "@components/loader/Loader";
import { useNotifications } from "@context/notificationsContext";
import { useModal } from "@context/modalContext";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faArrowAltCircleLeft, faFloppyDisk, faTrash } from "@fortawesome/free-solid-svg-icons";

const DetailsSupplier = () => {
        const [supplier, setSupplier] = useState({});
        const [updatedSupplier, setUpdatedSupplier] = useState({});
        const [materials, setMaterials] = useState([]);
        const [modal, setModal] = useState(false);
        const [loader, setLoader] = useState(false);
        const navigate = useNavigate();
        const notify = useNotifications();
        const { openModal } = useModal();
        const { id } = useParams();
    
        const [materialRef, setMaterialRef] = useState(null);
        const [priceMaterialRef, setPriceMaterialRef] = useState(null);
        const [amountMaterialRef, setAmountMaterialRef] = useState(null);
        let selectedRef = useRef("none");
        let priceRef = useRef(null);
        let amountRef = useRef(null);
        let hasMaterials = null;
    
        const payMethod = ['Efectivo', 'Transferencia', 'Débito', 'Crédito'];
    
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
                setLoader(true);
                try{
                    // RECUPERA LOS DATOS DE LOS DETALLES DE UN PROVEEDOR
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/suppliers/details/${id}`);
                    const responseJSON = await response.json();
                    setSupplier(responseJSON[0]);
                    
                }catch(err){
                    console.log(err);
                }finally{
                    setLoader(false);
                };
            };
            fetchData();
            
        }, []);
        
        const handleCUITorCUIT = (e) => {
            e.preventDefault();
            let preValue = e.target.value;
            // VERIFICA QUE SOLO SE INGRESEN NUMEROS POSITIVOS DEL 0 AL 9
            const regExNum = /^[0-9]$/;
            // LIMITA LA LONGITUD DEL INPUT A 11 CARACTERES
            if(e.target.value.length < 11){
                if(regExNum.test(e.nativeEvent.key)){
                    setUpdatedSupplier({...updatedSupplier, cuit_company_supplier: preValue + e.nativeEvent.key});
                };
            }
            // MODIFICA LA ACTION DE BORRADO DEL INPUT
            if(e.nativeEvent.key === 'Backspace'){
                if(e.target.value.length === 1){
                    setUpdatedSupplier({...updatedSupplier, cuit_company_supplier: ""});
                }else {
                    setUpdatedSupplier({...updatedSupplier, cuit_company_supplier: preValue.slice(0, -1)})
                }
            };
        };
        
        const handlePriceControl = () => {

        };

        const handleUpdate = async () => {
            setModal(true);
            const updatedMaterials = supplier.stocks;

            // RECUPERA LOS DATOS DEL STOCK 
            const responseMaterials = await fetch(`${process.env.REACT_APP_API_URL}/stock`);
            const responseMaterialsJSON = await responseMaterials.json();
            
            // VERIFICA SI EL PROVEEDOR TIENE O NO MATERIALES REGISTRADOS
            if(updatedMaterials.length > 0){
                hasMaterials = true;
                const supplierMaterials = updatedMaterials.map((material)=> {
                    return {"id_material_fk": material.id_material, "id_supplier_fk": material.supplierStockAssociations.id_supplier_fk, "amount_material": material.supplierStockAssociations.amount_material, "price_material": material.supplierStockAssociations.price_material, "disabled": material.supplierStockAssociations.disabled, "name_material": material.name_material};
                })
                setUpdatedSupplier({...supplier, stocks: supplierMaterials});

                // DESHABILITA LAS OPCIONES DE LOS MATERIALES PREVIAMENTE SELECCIONADOS POR EL PROVEEDOR 
                for(const material of supplierMaterials){
                    if(!material.disabled){
                        const usedMaterialIndex  = responseMaterialsJSON.findIndex((usedMaterial)=> usedMaterial.id_material === material.id_material_fk);
                        responseMaterialsJSON[usedMaterialIndex].disabled = true; 
                    };
                };
            }else {
                // SI NO TIENE MATERIALES REGISTRADOS
                hasMaterials = false;
                setUpdatedSupplier({...supplier, stocks: "Este proveedor aún no tiene materiales asociados"});
            };

            setMaterials(responseMaterialsJSON);
        };
        
        const handleRef = (option, value) => {
            if(option === "material"){
                setMaterialRef(value);
            }else if(option === "price"){
                setPriceMaterialRef(value);
            }else {
                setAmountMaterialRef(value);
            }
        };
    
        const handleAddMaterial = () => {
            if(materialRef && priceMaterialRef.length !== 0 && priceMaterialRef > 0 && amountMaterialRef.length !== 0 && amountMaterialRef > 0){
                const stock = materials;
                const materialSelected = updatedSupplier.stocks;

                // DESHABILITA LA OPCION DEL MATERIAL SELECCIONADO
                const newStock = stock.map((stock)=> {
                    if(stock.id_material !== materialRef.id_material){
                        return stock;
                    }else {
                        stock.disabled = true;
                        return stock;
                    }
                });
                setMaterials(newStock);
                
                // GUARDA LA OPCION SELECCIONADA 
                let stocks = [];
                if(typeof(materialSelected) !== 'string'){
                    stocks = [...materialSelected];
                    stocks.push({"id_material_fk": materialRef.id_material, "id_supplier_fk": supplier.id_supplier, "amount_material": Math.round(amountMaterialRef), "price_material": Math.round(priceMaterialRef), "disabled": false, "name_material": materialRef.name_material});
                    setUpdatedSupplier({...updatedSupplier, stocks});
                }else {
                    stocks = [{"id_material_fk": materialRef.id_material, "id_supplier_fk": supplier.id_supplier, "amount_material": Math.round(amountMaterialRef), "price_material": Math.round(priceMaterialRef), "disabled": false, "name_material": materialRef.name_material}];
                    setUpdatedSupplier({...updatedSupplier, stocks});
                };

                // REINICIO DE VALORES REF 
                selectedRef.current.value = "none";
                amountRef.current.value = 0;
                priceRef.current.value = 0;
                setMaterialRef(null);
                setAmountMaterialRef(0);
                setPriceMaterialRef(0);
            }
        };
    
        const handleRemoveMaterial = (material) => {

            // DESHABILITA LA OPCION DEL MATERIAL SELECCIONADO
            const stocks = [...materials];
            const newStock = stocks.map((stock)=> {
                if(stock.id_material !== material.id_material_fk){
                    return stock;
                }else {
                    stock.disabled = false;
                    return stock;
                }
            });
            setMaterials(newStock);
            
            const materialSelectedList = updatedSupplier.stocks;
            const removeMaterial = materialSelectedList.filter((materialSelected)=> materialSelected.id_material_fk !== material.id_material_fk);
            setUpdatedSupplier({...updatedSupplier, stocks: removeMaterial});
        };

        const handleDisable = async () => {
            try{
                // CARTEL DE CONFIRMACION DE DESHABILITACION DEL MATERIAL
                const confirmDelete = window.confirm(
                    `¿Estás seguro de que quieres eliminar el proveedor "${supplier.name_company_supplier}"?`
                );

                if(confirmDelete){
                    setLoader(true);
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/suppliers/disabled/${id}`, {
                        method: 'PATCH',
                        headers: { "Content-Type": "application/json" }
                    });
                    const responseJSON = await response.json();
                    if(!response.ok){
                        if(response.status === 500){
                            setLoader(false);
                            handleFail(responseJSON);
                            navigate("/suppliers/getsuppliers");
                            return;
                        };
                    }else {
                        setLoader(false);
                        handleSuccess(responseJSON);
                        navigate("/suppliers/getsuppliers");
                        return;        
                    };
                }
            }catch(err){
                console.log(err);
            }    
        };

        const handleSubmit = async (e) => {
            try{
                const { stocks, ...newSupplier } = updatedSupplier;

                // ACTUALIZA LA INFORMACION DEL PROVEEDOR
                const response = await fetch(`${process.env.REACT_APP_API_URL}/suppliers/update/${id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(newSupplier),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const responseJSON = await response.json();

                // ACTUALIZA O CREA LOS MATERIALES DE PROVEEDORES
                let materialResponse = null;
                let materialResponseJSON = null;

                if(typeof(stocks) !== 'string'){
                    if(!hasMaterials){
                        // EN CASO DE QUE TENGA MATERIALES PREVIAMENTE CARGADOS ACTUALIZA
                        materialResponse = await fetch(`${process.env.REACT_APP_API_URL}/suppliers/supplierMaterials/update/${id}`,{
                            method: 'PATCH',
                            body: JSON.stringify(stocks),
                            headers: {
                                'Content-Type': "application/json"
                            }
                        });
                        materialResponseJSON = await materialResponse.json();
                    }else {
                        // EN CASO DE QUE NO TENGA MATERIALES PREVIAMENTE CARGADOS CREA
                        materialResponse = await fetch(`${process.env.REACT_APP_API_URL}/suppliers/supplierMaterials/create`,{
                            method: 'POST',
                            body: JSON.stringify(stocks),
                            headers: {
                                'Content-Type': "application/json"
                            }
                        });
                        materialResponseJSON = await materialResponse.json();
                    }
                }

                // RESPUESTAS VISUALES DE LA CREACION O ACTUALIZACION DE MATERIALES DE PROVEEDORES
                if(materialResponse && !materialResponse.ok){
                    if(materialResponse.status === 400){
                        const errors = materialResponseJSON.errors.map((error) => error.msg)
                        Modal(materialResponse.status, errors);
                        handleFail(materialResponseJSON);
                    }else {
                        handleFail(materialResponseJSON);
                    }
                }else {
                    handleSuccess(materialResponseJSON);
                };

                // RESPUES VISUALES DE L ACTUALIZACION DEL PROVEEDOR
                if(!response.ok){
                    if(response.status === 400){
                        const errors = responseJSON.errors.map((error) => error.msg)
                        Modal(response.status, errors);
                        handleFail(responseJSON);
                        return;
                    }else {
                        handleFail(responseJSON);
                        navigate("/suppliers/getsuppliers");
                        return
                    }
                }else {
                    handleSuccess(responseJSON);
                    navigate("/suppliers/getsuppliers");
                    return;        
                };
                
            }catch (err){
                console.log(err);
                handleFail('Ah ocurrido un error inesperado');
                navigate("/suppliers/getsuppliers");
                return
            }    
        };

        return (
            <>
                {loader ? (
                    <Loader/>
                ) : (
                    <>
                        {!modal ? (
                            <section className="flex w-full h-full justify-center bg-gray-200">
                                {/* SECCION PRINCIPAL */}
                                <section className="flex flex-col bg-white rounded-xl shadow-xl p-10 m-5">
                                    {/* TITULO */}
                                    <h2 className="text-2xl font-bold mb-4 mx-5">
                                        Detalles del proveedor: {supplier.name_company_supplier} {supplier.reason_social_supplier && `(${supplier.reason_social_supplier})`}
                                    </h2>
                                    {/* COLUMNA D   E INPUTS */}
                                    <div className="flex flex-row mx-3">
                                        {/* COLUMNA Nº 1 */}
                                        <div className="flex flex-col p-2 mx-5 w-full">
                                            {/* NOMBRE */}
                                            <div className="mb-4">
                                                <h4 className="text-gray-400 text-xs font-semibold">Nombre:</h4>
                                                <p className="text-gray-800 ">
                                                {supplier.name_company_supplier || "No disponible"}
                                                </p>
                                            </div>
                                            {/* RAZON SOCIAL */}
                                            <div className="mb-4">
                                                <h4 className="text-gray-400 text-xs font-semibold">Razon social:</h4>
                                                <p className="text-gray-800 ">
                                                {supplier.reason_social_supplier || "No disponible"}
                                                </p>
                                            </div>
                                            {/* CUIT */}
                                            <div className="mb-4">
                                                <h4 className="text-gray-400 text-xs font-semibold">CUIT:</h4>
                                                <p className="text-gray-800 ">
                                                {supplier.cuit_company_supplier || "No disponible"}
                                                </p>
                                            </div>
                                            {/* DIRECCION */}
                                            <div className="mb-4">
                                                <h4 className="text-gray-400 text-xs font-semibold">Direccion:</h4>
                                                <p className="text-gray-800 ">
                                                {supplier.tax_address_supplier || "No disponible"}
                                                </p>
                                            </div>
                                        </div>
                                        {/* COLUMNA Nº2 */}
                                        <div className="flex flex-col p-2 mx-5 w-full">
                                            {/* NUMERO DE TELEFONO */}
                                            <div className="mb-4">
                                                <h4 className="text-gray-400 text-xs font-semibold">Número de teléfono:</h4>
                                                <p className="text-gray-800 ">
                                                {supplier.number_phone_company_supplier || "No disponible"}
                                                </p>
                                            </div>  
                                            {/* SITIO WEB */}
                                            <div className="mb-4">
                                                <h4 className="text-gray-400 text-xs font-semibold">Sitio Web:</h4>
                                                <p className="text-gray-800 ">
                                                {supplier.website_company_supplier || "No disponible"}
                                                </p>
                                            </div>
                                            {/* MAIL */}
                                            <div className="mb-4">
                                                <h4 className="text-gray-400 text-xs font-semibold">Correo Electrónico:</h4>
                                                <p className="text-gray-800 ">
                                                {supplier.mail_company_supplier || "No disponible"}
                                                </p>
                                            </div>
                                            {/* NOMBRE DEL DISTRIBUIDOR */}
                                            <div className="mb-4">
                                                <h4 className="text-gray-400 text-xs font-semibold">Nombre del distribuidor:</h4>
                                                <p className="text-gray-800 ">
                                                {supplier.distributor_name_supplier || "No disponible"}
                                                </p>
                                            </div>
                                        </div>
                                        {/* COLUMNA Nº3 */}
                                        <div className="flex flex-col p-2 mx-5 w-full">
                                            {/* NUMERO DE TELEFONO DEL DISTRIBUIDOR */}
                                            <div className="mb-4">
                                                <h4 className="text-gray-400 text-xs font-semibold">Número del distribuidor:</h4>
                                                <p className="text-gray-800 ">
                                                {supplier.number_phone_distributor_supplier || "No disponible"}
                                                </p>
                                            </div>
                                            {/* MAIL DEL DISTRIBUIDOR */}
                                            <div className="mb-4">
                                                <h4 className="text-gray-400 text-xs font-semibold">Email del distribuidor:</h4>
                                                <p className="text-gray-800 ">
                                                {supplier.mail_distributor_supplier || "No disponible"}
                                                </p>
                                            </div>  
                                            {/* DIAS DE REPARTO */}
                                            <div className="mb-4">
                                                <h4 className="text-gray-400 text-xs font-semibold">Días de reparto:</h4>
                                                <p className="text-gray-800 ">
                                                {supplier.delivery_days_suppier || "No disponible"}
                                                </p>
                                            </div>  
                                            {/* METODOS DE PAGO */}
                                            <div className="mb-4">
                                                <h4 className="text-gray-400 text-xs font-semibold">Método de pago:</h4>
                                                <p className="text-gray-800 ">
                                                {supplier.payment_method_supplier || "No disponible"}
                                                </p>
                                            </div>  
                                        </div>
                                    </div>
                                    {/* LISTA DE MATERIALES DE PROVEEDORES */}
                                    <div className="flex flex-col mb-4 w-auto mx-40">
                                        <h4 className="text-gray-400 text-xs font-semibold">Lista de materiales que vende {supplier.name_company_supplier}:</h4>
                                        <select 
                                        name="priceControl"
                                        id="priceControl"
                                        className="mt-1 w-auto px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        onChange={
                                            handlePriceControl
                                        }
                                        >
                                            <option value="none">Lista de materiales asociados...</option>
                                            {supplier.stocks?.length > 0 && supplier.stocks.map((material)=> (
                                                <>
                                                    {!material.supplierStockAssociations.disabled && (
                                                        <option value={material.id_material} key={material.id_material}>
                                                            - {material.name_material}: ${`${material.supplierStockAssociations.price_material}`} {`(${material.supplierStockAssociations.amount_material})`}
                                                        </option>
                                                    )}
                                                </>
                                            ))}
                                        </select>
                                    </div>
                                    {/* BOTONERA */}
                                    <button
                                    onClick={handleUpdate}
                                    className="mx-auto px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                                    >
                                    <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
                                        Actualizar Proveedor
                                    </button>
                                </section>
                            </section>                            
                        ) : (
                            <section className="flex w-full h-full justify-center bg-gray-200">
                            {/* SECCION PRINCIPAL */}
                            <section className="flex flex-col bg-white rounded-xl shadow-xl p-10 m-5 ">
                                {/* TITULO */}
                                <h2 className="text-2xl font-bold mb-4 mx-5">
                                    Actualizar Proveedor: {updatedSupplier.name_company_supplier} {updatedSupplier.reason_social_supplier && `(${updatedSupplier.reason_social_supplier})`}
                                </h2>
                                {/* COLUMNA DE INPUTS */}
                                <div className="flex flex-row mx-3">
                                    {/* COLUMNA Nº 1 */}
                                    <div className="flex flex-col p-2 mx-5">
                                        {/* NOMBRE */}
                                        <div className="mb-4">
                                            <label htmlFor="name_company_supplier" className="block text-gray-700">Nombre: *</label>
                                            <input
                                            type="text"
                                            value={updatedSupplier.name_company_supplier || ""}
                                            name="name_company_supplier"
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            onChange={(e) => setUpdatedSupplier({...updatedSupplier, name_company_supplier: e.target.value})}
                                            required
                                            />
                                        </div>
                                        {/* APELLIDO */}
                                        <div className="mb-4">
                                            <label htmlFor="reason_social_supplier" className="block text-gray-700">Razón social:</label>
                                            <input
                                            type="text"
                                            value={updatedSupplier.reason_social_supplier || ""}
                                            name="reason_social_supplier"
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            onChange={(e) => setUpdatedSupplier({...updatedSupplier, reason_social_supplier: e.target.value})}
                                            />
                                        </div>
                                        {/* CUIT */}
                                        <div className="mb-4">
                                            <label htmlFor="cuit_company_supplier" className="block text-gray-700">CUIT:</label>
                                            <input
                                            type="text"
                                            value={updatedSupplier.cuit_company_supplier || ""}
                                            name="cuit_company_supplier"
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            onKeyDown={handleCUITorCUIT}
                                            />
                                        </div>   
                                        {/* DIRECCION */}
                                        <div className="mb-4">
                                            <label htmlFor="tax_address_supplier" className="block text-gray-700">Dirección: *</label>
                                            <input
                                            type="text"
                                            value={updatedSupplier.tax_address_supplier || ""}
                                            name="tax_address_supplier"
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            onChange={(e) => setUpdatedSupplier({...updatedSupplier, tax_address_supplier: e.target.value})}
                                            required
                                            />
                                        </div>                                  
                                    </div>
                                    {/* COLUMNA Nº2 */}
                                    <div className="flex flex-col p-2 mx-5">
                                        {/* NUMERO DE TELEFONO */}
                                        <div className="mb-4">
                                            <label htmlFor="number_phone_company_supplier" className="block text-gray-700">Número de teléfono: *</label>
                                            <input
                                            type="text"
                                            value={updatedSupplier.number_phone_company_supplier || ""}
                                            name="number_phone_company_supplier"
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            onChange={(e) => setUpdatedSupplier({...updatedSupplier, number_phone_company_supplier: e.target.value})}
                                            required
                                            />
                                        </div>
                                        {/* SITIO WEB */}
                                        <div className="mb-4">
                                            <label htmlFor="website_company_supplier" className="block text-gray-700">Sitio Web:</label>
                                            <input
                                            type="text"
                                            value={updatedSupplier.website_company_supplier || ""}
                                            name="website_company_supplier"
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            onChange={(e) => setUpdatedSupplier({...updatedSupplier, website_company_supplier: e.target.value})}
                                            />
                                        </div>
                                        {/* MAIL */}
                                        <div className="mb-4">
                                            <label htmlFor="mail_company_supplier" className="block text-gray-700">Correo Electrónico:</label>
                                            <input
                                            type="email"
                                            value={updatedSupplier.mail_company_supplier || ""}
                                            name="mail_company_supplier"
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            onChange={(e) => setUpdatedSupplier({...updatedSupplier, mail_company_supplier: e.target.value})}
                                            />
                                        </div>  
                                        {/* NOMBRE DEL DISTRIBUIDOR */}
                                        <div className="mb-4">
                                            <label htmlFor="distributor_name_supplier" className="block text-gray-700">Nombre del distribuidor:</label>
                                            <input
                                            type="text"
                                            value={updatedSupplier.distributor_name_supplier || ""}
                                            name="distributor_name_supplier"
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            onChange={(e) => setUpdatedSupplier({...updatedSupplier, distributor_name_supplier: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    {/* COLUMNA Nº3 */}
                                    <div className="flex flex-col p-2 mx-5">
                                        {/* NUMERO DE TELEFONO DEL DISTRIBUIDOR */}
                                        <div className="mb-4">
                                            <label htmlFor="number_phone_distributor_supplier" className="block text-gray-700">Número del distribuidor:</label>
                                            <input
                                            type="text"
                                            value={updatedSupplier.number_phone_distributor_supplier || ""}
                                            name="number_phone_distributor_supplier"
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            onChange={(e) => setUpdatedSupplier({...updatedSupplier, number_phone_distributor_supplier: e.target.value})}
                                            />
                                        </div>
                                        {/* MAIL DEL DISTRIBUIDOR */}
                                        <div className="mb-4">
                                            <label htmlFor="mail_distributor_supplier" className="block text-gray-700">Email del distribuidor:</label>
                                            <input
                                            type="email"
                                            value={updatedSupplier.mail_distributor_supplier || ""}
                                            name="mail_distributor_supplier"
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            onChange={(e) => setUpdatedSupplier({...updatedSupplier, mail_distributor_supplier: e.target.value})}
                                            />
                                        </div>  
                                        {/* DIAS DE DISTRIBUCION */}
                                        <div className="mb-4">
                                            <label htmlFor="delivery_days_suppier" className="block text-gray-700">Días de distribución:</label>
                                            <input
                                            type="text"
                                            value={updatedSupplier.delivery_days_suppier || ""}
                                            name="delivery_days_suppier"
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            onChange={(e) => setUpdatedSupplier({...updatedSupplier, delivery_days_suppier: e.target.value})}
                                            />
                                        </div>
                                        {/* METODO DE PAGO */}
                                        <div className="mb-4">
                                            <label htmlFor="payment_method_supplier" className="block text-gray-700">Método de pago:</label>
                                            <select 
                                            name="payment_method_supplier" 
                                            id="payment_method_supplier"
                                            value={updatedSupplier.payment_method_supplier || ""}
                                            defaultValue={null}
                                            className="mt-1 w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            onChange={(e)=> setUpdatedSupplier({...updatedSupplier, payment_method_supplier: e.target.value})}
                                            >
                                                <option value={null}>Seleccionar método de pago...</option>
                                                {payMethod.map((method)=> (
                                                    <option key={method} value={method}>{method}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                {/* DESCRIPCION */}
                                <div className="mb-4">
                                    <label htmlFor="description_supplier" className="block text-gray-700">
                                        Descripción del proveedor:
                                    </label>
                                    <textarea
                                        id="description_supplier"
                                        name="description_supplier"
                                        value={updatedSupplier.description_supplier || ""}
                                        className="mt-1 block w-full px-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        onChange={(e)=> setUpdatedSupplier({...updatedSupplier, description_supplier: e.target.value})}
                                        />
                                </div>
                                {/* SELECCION DE MATERIALES DE PROVEEDORES */}
                                <div className="flex flex-row w-full mb-3">
                                    {/* MATERIALES */}
                                    <div className="flex flex-col mx-3">
                                        <label htmlFor="supplierMaterials" className="block text-gray-700">Productos que vende este proveedor:</label>
                                        <select 
                                        name="supplierMaterials" 
                                        id="supplierMaterials"
                                        defaultValue="none"
                                        ref={selectedRef}
                                        className="mt-1 w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        onChange={(e) =>
                                            handleRef("material", materials.find((material) => material.id_material === parseInt(e.target.value)))
                                        }
                                        >
                                            <option value="none">Seleccionar material...</option>
                                            {materials.length > 0 && materials.map(material=> (
                                                material.disabled ? (
                                                    <option key={material.id_material} value={material.id_material} className="text-white bg-gray-500" disabled>
                                                        {material.id_material} | {material.name_material}
                                                    </option>
                                                ) : (
                                                    <option key={material.id_material} value={material.id_material} className="text-gray-700">
                                                        {material.id_material} | {material.name_material}
                                                    </option>
                                                )
                                            ))}
                                        </select>
                                    </div>
                                    {/* CANTIDADES */}
                                    <div className="flex flex-col mx-3">
                                        <label htmlFor="amountMaterial" className="block text-gray-700">Cantidades: </label>
                                        <input 
                                        type="number"
                                        ref={amountRef}
                                        min={0}
                                        className="mt-1 w-auto px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        onChange={(e) =>
                                            handleRef("amount", parseInt(e.target.value))
                                        }
                                        />
                                    </div>
                                    {/* PRECIO */}
                                    <div className="flex flex-col mx-3">
                                        <label htmlFor="amountMaterial" className="block text-gray-700">Precio: </label>
                                        <div className="flex flex-row justify-center text-center">
                                            <h2 className="block text-gray-700 mt-1 py-2">$</h2>
                                            <input 
                                            type="number"
                                            ref={priceRef}
                                            min={0}
                                            className="mt-1 w-auto ml-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            onChange={(e) =>
                                                handleRef("price", parseInt(e.target.value))
                                            }    
                                            />
                                        </div>
                                    </div>
                                    {/* BOTON DE AGREGAR */}
                                    <button 
                                    className="rounded-lg bg-green-700 text-white mr-2 p-2 border border-gray-300 hover:bg-green-800"
                                    onClick={handleAddMaterial}                            
                                    >
                                        Agregar
                                    </button>
                                </div>
                                {/* MATERIALES SELECCIONADOS */}
                                {typeof(updatedSupplier.stocks) === 'string' ? (
                                    <div className="flex flex-row px-5">
                                        <h3 className="text-gray-700">
                                            {updatedSupplier.stocks}
                                        </h3>
                                    </div>                                    
                                ) : (
                                    <>
                                        {updatedSupplier.stocks?.length > 0 && updatedSupplier.stocks.map((material) => (
                                            <>
                                            {!material.disabled && (
                                                <div key={material.id_material_fk} className="flex flex-row mb-3">
                                                    <div className="flex flex-row px-5">
                                                        <h3 className="text-gray-700">
                                                            - {material.name_material}: ${`${material.price_material}`} {`(${material.amount_material})`}
                                                        </h3>
                                                    </div>
                                                    <button
                                                        className="bg-red-700 text-white rounded-lg border border-gray-300 px-2 hover:bg-red-800"
                                                        onClick={() =>
                                                            handleRemoveMaterial((updatedSupplier.stocks).find((mat) => mat.id_material_fk === material.id_material_fk))
                                                        }
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            )}
                                            </>
                                        ))}
                                    </>
                                )}
                                {/* BOTONERA */}
                                <section className="flex flex-row my-4">
                                    <button className="mx-auto bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-lg"
                                    onClick={handleSubmit} 
                                    >
                                    <FontAwesomeIcon icon={faFloppyDisk} className="mr-2" />
                                        Actualizar Proveedor
                                    </button>
                                    <button
                                        onClick={handleDisable}
                                        className="mx-auto px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700"
                                    >
                                        <FontAwesomeIcon icon={faTrash} className="mr-2" />
                                        Eliminar
                                    </button>
                                    <button className="mx-auto bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-lg"
                                    onClick={()=> setModal(false)} 
                                    >
                                    <FontAwesomeIcon icon={faArrowAltCircleLeft} className="mr-2" />
                                        Volver a detalles
                                    </button>
                                </section>
                            </section>
                        </section>
                        )}
                    </>
                )}
            </>
        )
};

export default DetailsSupplier;