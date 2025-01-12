import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/modalContext";
import { useNotifications } from "../../context/notificationsContext";
import Loader from "../../components/loader/Loader";

const AddClient = () => {
    const [client, setClient] = useState({});
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const notify = useNotifications();
    const { openModal } = useModal();

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
    
    const handleDNI = (e) => {
        e.preventDefault();
        let preValue = e.target.value;
        
        if(e.target.value.length < 8){
            const regExChar = /^[mMfF0-9]$/;
            const regExNum = /^[0-9]$/;
            if(!client.dni_client || client.dni_client.length === 0){
                if(regExChar.test(e.nativeEvent.key)){
                    setClient({...client, dni_client: e.nativeEvent.key});
                }
            };
            if(regExNum.test(e.nativeEvent.key)){
                setClient({...client, dni_client: preValue + e.nativeEvent.key});
            };
        }
        if(e.nativeEvent.key === 'Backspace'){
            if(e.target.value.length === 1){
                setClient({...client, dni_client: ""});
            }else {
                setClient({...client, dni_client: preValue.slice(0, -1)})
            }
        };
    };

    const handleCUITorCUIT = (e) => {
        e.preventDefault();
        let preValue = e.target.value;
        const regExNum = /^[0-9]$/;

        if(e.target.value.length < 11){
            if(regExNum.test(e.nativeEvent.key)){
                setClient({...client, cuil_or_cuit_client: preValue + e.nativeEvent.key});
            };
        }
        if(e.nativeEvent.key === 'Backspace'){
            if(e.target.value.length === 1){
                setClient({...client, cuil_or_cuit_client: ""});
            }else {
                setClient({...client, cuil_or_cuit_client: preValue.slice(0, -1)})
            }
        };
    };

    const handleCreate = async () => {
        try{
            setLoader(true);
            const Client = {...client};
            const response = await fetch(`${process.env.REACT_APP_API_URL}/clients/create`, {
                method: 'POST',
                body: JSON.stringify(Client),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const responseJSON = await response.json();

            switch (response.status) {
                case 201:
                    setLoader(false);
                    handleSuccess(responseJSON);
                    navigate("/clients/getclients");
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
                    navigate("/clients/getclients");
                    return
                default:
                    setLoader(false);
                    handleFail('Ah ocurrido un error inesperado');
                    navigate("/clients/getclients");
                    return;
                }

        }catch(err){
            console.log(err);
            navigate('/clients/getclients');
        }
    };

        return(
            <>
            {loader ? (
                <Loader/>
            ) : (
                <section className="flex w-full h-full justify-center bg-gray-200">
                    {/* SECCION PRINCIPAL */}
                    <section className="flex flex-col bg-white rounded-xl shadow-xl p-10 m-5 ">
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
                                    <label htmlFor="name_client" className="block text-gray-700">Nombre: *</label>
                                    <input
                                    type="text"
                                    value={client.name_client || ""}
                                    name="name_client"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={(e) => setClient({...client, name_client: e.target.value})}
                                    required
                                    />
                                </div>
                                {/* APELLIDO */}
                                <div className="mb-4">
                                    <label htmlFor="last_name_client" className="block text-gray-700">Apellido:</label>
                                    <input
                                    type="text"
                                    value={client.last_name_client || ""}
                                    name="last_name_client"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={(e) => setClient({...client, last_name_client: e.target.value})}
                                    />
                                </div>
                                {/* DNI */}
                                <div className="mb-4">
                                    <label htmlFor="dni_client" className="block text-gray-700">DNI:</label>
                                    <input
                                    type="text"
                                    value={client.dni_client || ""}
                                    name="dni_client"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onKeyDown={handleDNI}
                                    required
                                    />
                                </div>
                            </div>
                            {/* COLUMNA Nº2 */}
                            <div className="flex flex-col p-2 mx-5">
                                {/* NUMERO DE TELEFONO */}
                                <div className="mb-4">
                                    <label htmlFor="phone_number_client" className="block text-gray-700">Número de teléfono: *</label>
                                    <input
                                    type="text"
                                    value={client.phone_number_client || ""}
                                    name="phone_number_client"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={(e) => setClient({...client, phone_number_client: e.target.value})}
                                    required
                                    />
                                </div>  
                                {/* TIPO DE CLIENTE */}
                                <div className="mb-4">
                                    <label htmlFor="type_client" className="block text-gray-700">Tipo de cliente: *</label>
                                    <select
                                    name="type_client"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={(e) => {if (e.target.value !== "none") setClient({...client, type_client: e.target.value})}}
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
                                    value={client.cuil_or_cuit_client || ""}
                                    name="cuil_or_cuit_client"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onKeyDown={handleCUITorCUIT}
                                    />
                                </div>                                          
                            </div>
                            {/* COLUMNA Nº3 */}
                            <div className="flex flex-col p-2 mx-5">
                                {/* PROVINCIAS */}
                                <div className="mb-4">
                                    <label htmlFor="province_client" className="block text-gray-700">Provincia: *</label>
                                    <select
                                    name="province_client"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={(e) => {if (e.target.value !== "none") setClient({...client, province_client: e.target.value})}}
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
                                    value={client.direction_client || ""}
                                    name="direction_client"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={(e) => setClient({...client, direction_client: e.target.value})}
                                    required
                                    />
                                </div>  
                                {/* MAIL */}
                                <div className="mb-4">
                                    <label htmlFor="mail_client" className="block text-gray-700">Correo Electrónico:</label>
                                    <input
                                    type="email"
                                    value={client.mail_client || ""}
                                    name="mail_client"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={(e) => setClient({...client, mail_client: e.target.value})}
                                    />
                                </div>  
                            </div>
                        </div>
                        <button
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={handleCreate}
                        >
                            Registrar Cliente
                        </button>
                    </section>
                </section>
            )}
            </>
    )
};

export default AddClient;