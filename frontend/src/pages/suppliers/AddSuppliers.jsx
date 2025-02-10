import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "@context/modalContext";
import { useNotifications } from "@context/notificationsContext";
import Loader from "@components/loader/Loader";

const AddSuppliers = () => {
    const [supplier, setSupplier] = useState({});
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const notify = useNotifications();
    const { openModal } = useModal();

    const payMethod = ['Efectivo', 'Transferencia', 'Débito', 'Crédito'];

    const mostrarError = (httpErr, errors) => {
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

    const handleCUITorCUIT = (e) => {
        e.preventDefault();
        let preValue = e.target.value;
        const regExNum = /^[0-9]$/;

        if(e.target.value.length < 11){
            if(regExNum.test(e.nativeEvent.key)){
                setSupplier({...supplier, cuit_company_supplier: preValue + e.nativeEvent.key});
            };
        }
        if(e.nativeEvent.key === 'Backspace'){
            if(e.target.value.length === 1){
                setSupplier({...supplier, cuit_company_supplier: ""});
            }else {
                setSupplier({...supplier, cuit_company_supplier: preValue.slice(0, -1)})
            }
        };
    };

    const handleCreate = async () => {
        try{
            setLoader(true);
            const Supplier = {...supplier};
            console.log(Supplier)
            const response = await fetch(`${process.env.REACT_APP_API_URL}/suppliers/create`, {
                method: 'POST',
                body: JSON.stringify(Supplier),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const responseJSON = await response.json();

            switch (response.status) {
                case 201:
                    setLoader(false);
                    handleSuccess(responseJSON);
                    navigate("/suppliers/getsuppliers");
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
                    navigate("/suppliers/getsuppliers");
                    return
                default:
                    setLoader(false);
                    handleFail('Ah ocurrido un error inesperado');
                    navigate("/suppliers/getsuppliers");
                    return;
                };

        }catch(err){
            console.log(err);
            handleFail('Ops! Error inesperado ocurrido a la hora de crear el proveedor');
            setLoader(false);
        }
    };

        return(
            <>
            {loader ? (
                <Loader/>
            ) : (
                <section className="flex w-full h-full justify-center bg-gray-200">
                    {/* SECCION PRINCIPAL */}
                    <section className="flex flex-col bg-white rounded-xl shadow-xl p-10 m-5">
                        {/* TITULO */}
                        <h2 className="text-2xl font-bold mb-4 mx-5">
                            Registrar Proveedor
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
                                    value={supplier.name_company_supplier || ""}
                                    name="name_company_supplier"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={(e) => setSupplier({...supplier, name_company_supplier: e.target.value})}
                                    required
                                    />
                                </div>
                                {/* RAZON SOCIAL */}
                                <div className="mb-4">
                                    <label htmlFor="reason_social_supplier" className="block text-gray-700">Razón social:</label>
                                    <input
                                    type="text"
                                    value={supplier.reason_social_supplier || ""}
                                    name="reason_social_supplier"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={(e) => setSupplier({...supplier, reason_social_supplier: e.target.value})}
                                    />
                                </div>
                                {/* CUIT */}
                                <div className="mb-4">
                                    <label htmlFor="cuit_company_supplier" className="block text-gray-700">CUIT:</label>
                                    <input
                                    type="text"
                                    value={supplier.cuit_company_supplier || ""}
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
                                    value={supplier.tax_address_supplier || ""}
                                    name="tax_address_supplier"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={(e) => setSupplier({...supplier, tax_address_supplier: e.target.value})}
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
                                    value={supplier.number_phone_company_supplier || ""}
                                    name="number_phone_company_supplier"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={(e) => setSupplier({...supplier, number_phone_company_supplier: e.target.value})}
                                    required
                                    />
                                </div>
                                {/* SITIO WEB */}
                                <div className="mb-4">
                                    <label htmlFor="website_company_supplier" className="block text-gray-700">Sitio Web:</label>
                                    <input
                                    type="text"
                                    value={supplier.website_company_supplier || ""}
                                    name="website_company_supplier"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={(e) => setSupplier({...supplier, website_company_supplier: e.target.value})}
                                    />
                                </div>
                                {/* MAIL */}
                                <div className="mb-4">
                                    <label htmlFor="mail_company_supplier" className="block text-gray-700">Correo Electrónico:</label>
                                    <input
                                    type="email"
                                    value={supplier.mail_company_supplier || ""}
                                    name="mail_company_supplier"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={(e) => setSupplier({...supplier, mail_company_supplier: e.target.value})}
                                    />
                                </div>  
                                {/* NOMBRE DEL DISTRIBUIDOR */}
                                <div className="mb-4">
                                    <label htmlFor="distributor_name_supplier" className="block text-gray-700">Nombre del distribuidor:</label>
                                    <input
                                    type="text"
                                    value={supplier.distributor_name_supplier || ""}
                                    name="distributor_name_supplier"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={(e) => setSupplier({...supplier, distributor_name_supplier: e.target.value})}
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
                                    value={supplier.number_phone_distributor_supplier || ""}
                                    name="number_phone_distributor_supplier"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={(e) => setSupplier({...supplier, number_phone_distributor_supplier: e.target.value})}
                                    />
                                </div>
                                {/* MAIL DEL DISTRIBUIDOR */}
                                <div className="mb-4">
                                    <label htmlFor="mail_distributor_supplier" className="block text-gray-700">Email del distribuidor:</label>
                                    <input
                                    type="email"
                                    value={supplier.mail_distributor_supplier || ""}
                                    name="mail_distributor_supplier"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={(e) => setSupplier({...supplier, mail_distributor_supplier: e.target.value})}
                                    />
                                </div>  
                                {/* DIAS DE REPARTO */}
                                <div className="mb-4">
                                    <label htmlFor="delivery_days_suppier" className="block text-gray-700">Días de reparto:</label>
                                    <input
                                    type="text"
                                    value={supplier.delivery_days_suppier || ""}
                                    name="delivery_days_suppier"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={(e) => setSupplier({...supplier, delivery_days_suppier: e.target.value})}
                                    />
                                </div>
                                {/* METODO DE PAGO */}
                                <div className="mb-4">
                                    <label htmlFor="payment_method_supplier" className="block text-gray-700">Método de pago:</label>
                                    <select 
                                    name="payment_method_supplier" 
                                    id="payment_method_supplier"
                                    defaultValue={null}
                                    className="mt-1 w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={(e)=> setSupplier({...supplier, payment_method_supplier: e.target.value})}
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
                                value={supplier.description_supplier || ""}
                                className="mt-1 block w-full px-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={(e)=> setSupplier({...supplier, description_supplier: e.target.value})}
                                />
                        </div>
                        <button
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={handleCreate}
                        >
                            Registrar Proveedor
                        </button>
                    </section>
                </section>
            )}
            </>
    )
};

export default AddSuppliers;