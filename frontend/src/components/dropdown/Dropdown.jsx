import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "@components/searchBar/searchBar";
import { NavLink } from "react-router-dom";
import { useState, useRef } from "react";

const Dropdown = ({ links }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('Inicio');
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
                <div className="fixed inset-0 bg-black bg-opacity-75 z-30 transition">
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
                    <div className="fixed inset-0 flex justify-center items-start p-36 z-30">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <div className="mb-4">
                                <SearchBar ref={formRef} onSearch={handleSearch}/>
                            </div>
                            <div className="flex flex-row space-x-8 justify-center">
                                <div className="flex flex-col text-center" onClick={toggleDropdown}>
                                    <p className="text-orange-400 text-xl">ACCIONES</p>
                                    <div className="flex flex-col space-y-4 text-xl">
                                        {links.map((link, index) => (
                                        <NavLink 
                                            key={index} 
                                            to={link.path} 
                                            onClick={()=> setTitle(link.name)}
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
                                        <NavLink to="/home" exact className="hover:text-gray-400 active:text-red-500" onClick={(e)=> setTitle(e.target.innerText)}>
                                            Inicio
                                        </NavLink>
                                        <NavLink to="/stock/getstock/1" className="hover:text-gray-400 active:text-red-500" onClick={(e)=> setTitle(e.target.innerText)}>
                                            Materiales
                                        </NavLink>
                                        <NavLink to="/tools/gettools/1" exact className="hover:text-gray-400 active:text-red-500" onClick={(e)=> setTitle(e.target.innerText)}>
                                            Herramientas
                                        </NavLink>
                                        <NavLink to="/products/getproducts/1" className="hover:text-gray-400 active:text-red-500" onClick={(e)=> setTitle(e.target.innerText)}>
                                            Productos
                                        </NavLink>
                                        <NavLink to="/clients/getclients/1" exact className="hover:text-gray-400 active:text-red-500" onClick={(e)=> setTitle(e.target.innerText)}>
                                            Clientes
                                        </NavLink>
                                        <NavLink to="/suppliers/getsuppliers/1" exact className="hover:text-gray-400 active:text-red-500" onClick={(e)=> setTitle(e.target.innerText)}>
                                            Proveedores
                                        </NavLink>
                                        <NavLink to="/orders/getorders/1" exact className="hover:text-gray-400 active:text-red-500" onClick={(e)=> setTitle(e.target.innerText)}>
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
                        <p className="text-lg font-semibold mx-auto">{title}</p>
                        <button
                            onClick={toggleDropdown}
                            className="bg-green-600 text-white px-4 py-2 rounded-full border border-gray-600 m-4"
                        >
                            <FontAwesomeIcon icon={faBars}/>
                        </button>
                    </div>
                </div>
            )}
        </>
    )
};

export default Dropdown;