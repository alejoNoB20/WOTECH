import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "@components/searchBar/searchBar";
import { NavLink } from "react-router-dom";
import { useState, useRef } from "react";

const Dropdown = ({ links }) => {
    const [isOpen, setIsOpen] = useState(false);
    const formRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSearch = (query, option) => {
        formRef.current.reset()
    };

    return(
        <>
            {isOpen ? (
                <div className="fixed inset-0 bg-black bg-opacity-75 z-20 transition">
                    <div className="fixed w-full bg-gray-700 text-white top-0 z-40">
                        <div className="flex flex-row items-center">
                            <p className="text-lg font-semibold px-4">Wotech</p>
                            <p className="text-lg font-semibold m-auto">Menu Desplegable</p>
                            <button
                                onClick={toggleDropdown}
                                className="bg-green-600 text-white px-4 py-2 rounded-full border border-gray-600 m-4"
                            >
                                <FontAwesomeIcon icon={faBars}/>
                            </button>
                        </div>
                    </div>
                    <div className="fixed inset-0 flex justify-center items-start p-20 z-30">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="mb-4">
                                <SearchBar ref={formRef} onSearch={handleSearch}/>
                            </div>
                            <div className="flex flex-row space-x-20 justify-center">
                                <div className="flex flex-col text-center" onClick={toggleDropdown}>
                                    <p className="text-orange-400 text-xl">ACCIONES</p>
                                    <div className="flex flex-col space-y-4 text-xl">
                                        {links.map((link, index) => (
                                        <NavLink 
                                            key={index} 
                                            to={link.path} 
                                            
                                            className="block hover:text-gray-300"
                                        >
                                            {link.name}
                                        </NavLink>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col text-center" onClick={toggleDropdown}>
                                    <p className="text-orange-400 text-xl">SECCIONES</p>
                                    <div className="flex flex-col space-y-4 text-xl">
                                        <NavLink to="/" exact className="hover:text-gray-400 active:text-red-500">
                                            Inicio
                                        </NavLink>
                                        <NavLink to="/stock/getstock" className="hover:text-gray-400 active:text-red-500">
                                            Materiales
                                        </NavLink>
                                        <NavLink to="/tools/gettools" exact className="hover:text-gray-400 active:text-red-500">
                                            Herramientas
                                        </NavLink>
                                        <NavLink to="/products/getproducts" className="hover:text-gray-400 active:text-red-500">
                                            Productos
                                        </NavLink>
                                        <NavLink to="/clients/getclients" exact className="hover:text-gray-400 active:text-red-500">
                                            Clientes
                                        </NavLink>
                                        <NavLink to="/suppliers/getsuppliers" exact className="hover:text-gray-400 active:text-red-500">
                                            Proveedores
                                        </NavLink>
                                        <NavLink to="/orders/getorders" exact className="hover:text-gray-400 active:text-red-500">
                                            Pedidos
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="fixed w-full bg-gray-700 text-white top-0 z-10">
                    <div className="flex flex-row items-center">
                        <p className="text-lg font-semibold px-4">Wotech</p>
                        <div className="ml-auto">
                            <button
                                onClick={toggleDropdown}
                                className="bg-green-600 text-white px-4 py-2 rounded-full border border-gray-600 m-4"
                            >
                                <FontAwesomeIcon icon={faBars}/>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
};

export default Dropdown;