import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navBar.css'; // Importar los estilos personalizados
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '@components/searchBar/searchBar';

const NavBar = ({ logged }) => {

  const [isMobile, setIsMobile] = useState(null);
  const formRef = useRef(null);
  const handleSearch = (query, option) => {
    formRef.current.reset()
  };

  useEffect(()=> {

    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 640px)').matches);
    };

    checkMobile();

    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);

  }, []);

  return (
    <>
      {!isMobile && (
      <div className=" flex navbar bg-gray-700 text-white p-7 fixed w-full top-0 z-10">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">Wotech</div>
          <div className="flex-grow mx-4">
            <SearchBar ref={formRef} onSearch={handleSearch} />
          </div>
          <div className="flex-grow md:space-x-3">
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
            <NavLink to="/user">
              <FontAwesomeIcon icon={faUser} className='w-6 h-6' />
            </NavLink>
            {logged ? (
              <NavLink to="/user">
                <FontAwesomeIcon icon={faRightFromBracket} className='w-6 h-6 text-red-600' />
              </NavLink>
            ) : (
              false
            )}
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default NavBar;
