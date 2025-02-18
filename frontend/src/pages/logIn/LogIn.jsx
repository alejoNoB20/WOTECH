import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNotifications } from "@context/notificationsContext";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Loader from '@components/loader/Loader'
import backGroundImage from "@assets/BackGround.jpg";
import logoImage from "@assets/PinosRosarioLogo.jpg";

const LogIn = ({ onLoginSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [account, setAccount] = useState({});
    const [typePassword, setTypePassword] = useState('password');
    const notify = useNotifications();

    const handleSuccess = (text) => {
        notify("success", text);
    };

    const handleFail = (text) => {
        notify("fail", text);
    };

    const handleChange = (e) => {
        const target = e.target.name;
        const value = e.target.value;

        setAccount({...account, [target]: value});
    };

    const handleClick = async () => {
        try{
            setLoading(true);
            const bodyResponse = account;

            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(bodyResponse),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseJSON = await response.json();

            switch (response.status) {
                case 400:
                    setLoading(false);
                    handleFail(responseJSON);
                    break;
                case 404:
                    setLoading(false);
                    handleFail(responseJSON);                
                    break;
                case 200:
                    setLoading(false);
                    handleSuccess(responseJSON);
                    onLoginSuccess();
                    break;
                default:
                    setLoading(false);
                    handleFail(responseJSON);                
                    break;
            }
        }catch(err){
            console.log(err);
            setLoading(false);
            handleFail('Ah ocurrido un error al momento de procesar la información');                
        };
    };

    return (
        // FONDO
        <>
            {loading && (
                <Loader/>
            )}
            <div className="flex w-screen h-screen justify-center items-center">
                <img src={backGroundImage} alt="Fondo" className="object-cover bg-center h-screen w-screen fixed inset-0 opacity-60 z-0"/>
                {/* MAIN */}
                <div className="flex flex-col md:flex-row justify-center items-center z-10 bg-gray-100 rounded-lg shadow-xl p-6 mb:mb-6 md:space-x-6">
                    {/* LOGO */}
                    <img src={logoImage} alt="Logo Pinos Rosario" className="max-w-36 max-h-36 rounded-full shadow-lg"/>
                    {/* INPUTS */}
                    <div className="flex flex-col gap-5 mb:my-2">
                        {/* NOMBRE DE USUARIO */}
                        <div className="flex flex-col">
                            <label htmlFor="username_user">Nombre de usuario:</label>
                            <input 
                            type="text" 
                            name="username_user"
                            id="username_user"
                            value={account.username_user || ""}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb:text-xs"
                            onChange={handleChange}
                            />
                        </div>
                        {/* CONTRASEÑA */}
                        <div className="flex flex-col">
                            <label htmlFor="password_user">Contraseña:</label>
                            <div className="flex flex-row space-x-2">
                                {/* INPUT */}
                                <input 
                                type={typePassword}
                                name="password_user"
                                id="password_user"
                                value={account.password_user || ""}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb:text-xs"
                                onChange={handleChange}
                                />
                                {/* VER CONTRASEÑA */}
                                    {typePassword === 'password' ? (
                                        <button className="rounded-md px-2 mt-1 bg-white border border-gray-300" onClick={()=> setTypePassword('text')}>
                                            <FontAwesomeIcon icon={faEyeSlash}/>
                                        </button>
                                    ) : (
                                        <button className="rounded-md px-2 mt-1 bg-gray-300 border outline-none ring-indigo-500 border-indigo-500" onClick={()=> setTypePassword('password')}>
                                            <FontAwesomeIcon icon={faEye}/>
                                        </button>
                                    )}
                            </div>
                        </div>
                        {/* BOTON */}
                        <button 
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={handleClick}
                        >
                            Ingresar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default LogIn