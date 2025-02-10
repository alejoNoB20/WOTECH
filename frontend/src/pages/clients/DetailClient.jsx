import { useState, useEffect } from "react";
import Loader from "@components/loader/Loader";
import { useNotifications } from "@context/notificationsContext";
import { useModal } from "@context/modalContext";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faArrowAltCircleLeft, faFloppyDisk, faTrash } from "@fortawesome/free-solid-svg-icons";

const DetailClient = () => {
    const [loader, setLoader] = useState(false);
    const [client, setClient] = useState({});
    const [modal, setModal] = useState(false);
    const [updatedClient, setUpdatedClient] = useState({});
    const { openModal } = useModal();
    const { id } = useParams();
    const notify = useNotifications();
    const navigate = useNavigate();

    const provinces = ["Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán"];

    const typeClients = ['Empresa', 'Consumidor Final', 'Otro'];

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

    useEffect(()=> {
        const fetchData = async () => {
            try{
                setLoader(true);
                const response = await fetch(`${process.env.REACT_APP_API_URL}/clients/details/${id}`);
                const responseJSON = await response.json();
                setClient(responseJSON[0]);
                
            }catch(err){
                console.log(err);
                navigate('/clients/getclients');
            }finally{
                setLoader(false);
            }
        };
        fetchData();

    }, [navigate, id]);
    
    const handleDNI = (e) => {
        e.preventDefault();
        let preValue = e.target.value;
        
        if(e.target.value.length < 8){
            const regExChar = /^[mMfF0-9]$/;
            const regExNum = /^[0-9]$/;
            if(!client.dni_client || client.dni_client.length === 0){
                if(regExChar.test(e.nativeEvent.key)){
                    setUpdatedClient({...updatedClient, dni_client: e.nativeEvent.key});
                }
            };
            if(regExNum.test(e.nativeEvent.key)){
                setUpdatedClient({...updatedClient, dni_client: preValue + e.nativeEvent.key});
            };
        }
        if(e.nativeEvent.key === 'Backspace'){
            if(e.target.value.length === 1){
                setUpdatedClient({...updatedClient, dni_client: ""});
            }else {
                setUpdatedClient({...updatedClient, dni_client: preValue.slice(0, -1)})
            }
        };
    };

    const handleCUITorCUIT = (e) => {
        e.preventDefault();
        let preValue = e.target.value;
        const regExNum = /^[0-9]$/;

        if(e.target.value.length < 11){
            if(regExNum.test(e.nativeEvent.key)){
                setUpdatedClient({...updatedClient, cuil_or_cuit_client: preValue + e.nativeEvent.key});
            };
        }
        if(e.nativeEvent.key === 'Backspace'){
            if(e.target.value.length === 1){
                setUpdatedClient({...updatedClient, cuil_or_cuit_client: ""});
            }else {
                setUpdatedClient({...updatedClient, cuil_or_cuit_client: preValue.slice(0, -1)})
            }
        };
    };

    const handleUpdate = () => {
        setModal(true);
        setUpdatedClient(client);
    };

    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
            const newClient = updatedClient; 
            console.log(newClient)
        
            const response = await fetch(`${process.env.REACT_APP_API_URL}/clients/update/${id}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newClient),
            });
            const responseJSON = await response.json();
        
            if(!response.ok){
                if(response.status === 400){
                    const errors = responseJSON.errors.map((error) => error.msg)
                    mostrarError(response.status, errors);
                    handleFail(responseJSON);
                    return;
                }else {
                    handleFail(responseJSON);
                    navigate("/clients/getclients");
                    return
                }
            }else {
                handleSuccess(responseJSON);
                navigate("/clients/getclients");
                return;        
            }
        }catch (err){
            handleFail('Ah ocurrido un error inesperado');
            navigate('/clients/getclients');
            return
        }
    };

    const handleDisable = async () => {
        try{
            const confirmDelete = window.confirm(
                `¿Estás seguro de que quieres eliminar el producto "${client.name_client}"?`
            );
            if(confirmDelete){
                setLoader(true);
                const response = await fetch(`${process.env.REACT_APP_API_URL}/clients/disabled/${id}`, {
                    method: 'PATCH',
                    headers: { "Content-Type": "application/json" }
                });
                const responseJSON = await response.json();
                if(!response.ok){
                    if(response.status === 500){
                        setLoader(false);
                        handleFail(responseJSON);
                        navigate("/clients/getclients");
                        return;
                    };
                }else {
                    setLoader(false);
                    handleSuccess(responseJSON);
                    navigate("/clients/getclients");
                    return;        
                };
            }
        }catch(err){
            console.log(err);
        }
    };
    
    return(
        <>
            {loader ? (
                <Loader/>
            ) : (
                <>
                    {!modal ? (
                        <section className="flex w-full h-full justify-center bg-gray-200">
                            {/* SECCION PRINCIPAL */}
                            <section className="flex flex-col bg-white rounded-xl shadow-xl mx-6 mb:my-6 mb:px-2 mb:py-5 md:py-5 md:my-3 md:px-20 justify-center items-center mb:text-center">
                                {/* TITULO */}
                                <h2 className="text-2xl font-bold mb-4 text-center">
                                    Detalles del cliente: {client.name_client} {client.last_name_client}
                                </h2>
                                {/* COLUMNA DE INPUTS */}
                                <div className="flex flex-col md:flex-row gap-2">
                                    {/* COLUMNA Nº 1 */}
                                    <div className="flex flex-col md:p-2 md:mx-5">
                                        {/* NOMBRE */}
                                        <div className="mb-4">
                                            <h4 className="text-gray-400 text-xs font-semibold">Nombre:</h4>
                                            <p className="text-gray-800 text-lg">
                                            {client.name_client || "No disponible"}
                                            </p>
                                        </div>
                                        {/* APELLIDO */}
                                        <div className="mb-4">
                                            <h4 className="text-gray-400 text-xs font-semibold">Apellido:</h4>
                                            <p className="text-gray-800 text-lg">
                                            {client.last_name_client || "No disponible"}
                                            </p>
                                        </div>
                                        {/* DNI */}
                                        <div className="mb-4">
                                            <h4 className="text-gray-400 text-xs font-semibold">DNI:</h4>
                                            <p className="text-gray-800 text-lg">
                                            {client.dni_client || "No disponible"}
                                            </p>
                                        </div>
                                    </div>
                                    {/* COLUMNA Nº2 */}
                                    <div className="flex flex-col md:p-2 md:mx-5">
                                        {/* NUMERO DE TELEFONO */}
                                        <div className="mb-4">
                                            <h4 className="text-gray-400 text-xs font-semibold">Número de teléfono:</h4>
                                            <p className="text-gray-800 text-lg">
                                            {client.phone_number_client || "No disponible"}
                                            </p>
                                        </div>  
                                        {/* TIPO DE CLIENTE */}
                                        <div className="mb-4">
                                            <h4 className="text-gray-400 text-xs font-semibold">Tipo de cliente:</h4>
                                            <p className="text-gray-800 text-lg">
                                            {client.type_client || "No disponible"}
                                            </p>
                                        </div>
                                        {/* CUIL O CUIT */}
                                        <div className="mb-4">
                                            <h4 className="text-gray-400 text-xs font-semibold">CUIL O CUIT:</h4>
                                            <p className="text-gray-800 text-lg">
                                            {client.cuil_or_cuit_client || "No disponible"}
                                            </p>
                                        </div>
                                    </div>
                                    {/* COLUMNA Nº3 */}
                                    <div className="flex flex-col md:p-2 md:mx-5">
                                        {/* PROVINCIA */}
                                        <div className="mb-4">
                                            <h4 className="text-gray-400 text-xs font-semibold">Provincia:</h4>
                                            <p className="text-gray-800 text-lg">
                                            {client.province_client || "No disponible"}
                                            </p>
                                        </div>
                                        {/* DIRECCION */}
                                        <div className="mb-4">
                                            <h4 className="text-gray-400 text-xs font-semibold">Dirección:</h4>
                                            <p className="text-gray-800 text-lg">
                                            {client.direction_client || "No disponible"}
                                            </p>
                                        </div>  
                                        {/* MAIL */}
                                        <div className="mb-4">
                                            <h4 className="text-gray-400 text-xs font-semibold">Correo Electrónico:</h4>
                                            <p className="text-gray-800 text-lg">
                                            {client.mail_client || "No disponible"}
                                            </p>
                                        </div>  
                                    </div>
                                </div>
                                {/* BOTONERA */}
                                <button
                                onClick={handleUpdate}
                                className="mx-auto px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                                >
                                <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
                                    Actualizar Cliente
                                </button>
                            </section>
                        </section>
                    ) : (
                        <section className="flex w-full h-full justify-center bg-gray-200">
                            {/* SECCION PRINCIPAL */}
                            <section className="flex flex-col bg-white rounded-xl shadow-xl mx-6 mb:my-6 mb:px-2 mb:py-5 md:py-5 md:my-3 md:px-20 justify-center items-center mb:text-center">
                                {/* TITULO */}
                                <h2 className="text-2xl font-bold mb-4 mx-5">
                                    Actualizar cliente: {updatedClient.name_client} {updatedClient.last_name_client}
                                </h2>
                                {/* COLUMNA DE INPUTS */}
                                <div className="flex flex-col md:flex-row gap-2">
                                    {/* COLUMNA Nº 1 */}
                                    <div className="flex flex-col md:p-2 md:mx-5">
                                        {/* NOMBRE */}
                                        <div className="mb-4">
                                            <label htmlFor="name_client" className="block text-gray-700">Nombre: *</label>
                                            <input
                                            type="text"
                                            value={updatedClient.name_client || null}
                                            name="name_client"
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            onChange={(e) => setUpdatedClient({...updatedClient, name_client: e.target.value})}
                                            required
                                            />
                                        </div>
                                        {/* APELLIDO */}
                                        <div className="mb-4">
                                            <label htmlFor="last_name_client" className="block text-gray-700">Apellido: *</label>
                                            <input
                                            type="text"
                                            value={updatedClient.last_name_client || null}
                                            name="last_name_client"
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            onChange={(e) => setUpdatedClient({...updatedClient, last_name_client: e.target.value})}
                                            required
                                            />
                                        </div>
                                        {/* DNI */}
                                        <div className="mb-4">
                                            <label htmlFor="dni_client" className="block text-gray-700">DNI:</label>
                                            <input
                                            type="text"
                                            value={updatedClient.dni_client || ""}
                                            name="dni_client"
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            onKeyDown={handleDNI}
                                            required
                                            />
                                        </div>
                                    </div>
                                    {/* COLUMNA Nº2 */}
                                    <div className="flex flex-col md:p-2 md:mx-5">
                                        {/* NUMERO DE TELEFONO */}
                                        <div className="mb-4">
                                            <label htmlFor="phone_number_client" className="block text-gray-700">Número de teléfono: *</label>
                                            <input
                                            type="text"
                                            value={updatedClient.phone_number_client || null}
                                            name="phone_number_client"
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            onChange={(e) => setUpdatedClient({...updatedClient, phone_number_client: e.target.value})}
                                            required
                                            />
                                        </div>  
                                        {/* TIPO DE CLIENTE */}
                                        <div className="mb-4">
                                            <label htmlFor="type_client" className="block text-gray-700">Tipo de cliente: *</label>
                                            <select
                                            value={updatedClient.type_client || "none"}
                                            name="type_client"
                                            defaultValue="none"
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            onChange={(e) => {if (e.target.value !== "none") setUpdatedClient({...updatedClient, type_client: e.target.value})}}
                                            required>
                                                <option id="none" value="none">Seleccionar tipo de cliente...</option>
                                                {typeClients.map((type)=> (
                                                    <option key={type} value={type}>
                                                        {type}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {/* CUIL O CUIT */}
                                        <div className="mb-4">
                                        <label htmlFor="cuil_or_cuit_client" className="block text-gray-700">CUIL o CUIT:</label>
                                            <input
                                            type="text"
                                            value={updatedClient.cuil_or_cuit_client || ""}
                                            name="cuil_or_cuit_client"
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            onKeyDown={handleCUITorCUIT}
                                            />
                                        </div>                                          
                                    </div>
                                    {/* COLUMNA Nº3 */}
                                    <div className="flex flex-col md:p-2 md:mx-5">
                                        {/* PROVINCIAS */}
                                        <div className="mb-4">
                                            <label htmlFor="province_client" className="block text-gray-700">Provincia: *</label>
                                            <select
                                            value={updatedClient.province_client || "none"}
                                            name="province_client"
                                            defaultValue="none"
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            onChange={(e) => {if (e.target.value !== "none") setUpdatedClient({...updatedClient, province_client: e.target.value})}}
                                            required>
                                                <option id="none" value="none">Seleccionar provincia...</option>
                                                {provinces.map((province)=> (
                                                    <option key={province} value={province}>
                                                        {province}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {/* DIRECCION */}
                                        <div className="mb-4">
                                            <label htmlFor="direction_client" className="block text-gray-700">Dirección: *</label>
                                            <input
                                            type="text"
                                            value={updatedClient.direction_client || null}
                                            name="direction_client"
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            onChange={(e) => setUpdatedClient({...updatedClient, direction_client: e.target.value})}
                                            required
                                            />
                                        </div>  
                                        {/* MAIL */}
                                        <div className="mb-4">
                                            <label htmlFor="mail_client" className="block text-gray-700">Correo Electrónico:</label>
                                            <input
                                            type="email"
                                            value={updatedClient.mail_client || null}
                                            name="mail_client"
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            onChange={(e) => setUpdatedClient({...updatedClient, mail_client: e.target.value})}
                                            />
                                        </div>  
                                    </div>
                                </div>
                                {/* BOTONERA */}
                                <section className="flex flex-row my-4 gap-3 md:gap-14">
                                    <button className="mx-auto bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-lg"
                                    onClick={handleSubmit} 
                                    >
                                        Actualizar
                                    </button>
                                    <button
                                        onClick={handleDisable}
                                        className="mx-auto px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700"
                                    >
                                        Eliminar
                                    </button>
                                    <button className="mx-auto bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-lg"
                                    onClick={()=> setModal(false)} 
                                    >
                                        Volver
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

export default DetailClient