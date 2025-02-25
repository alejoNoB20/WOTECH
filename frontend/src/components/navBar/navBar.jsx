import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navBar.css'; // Importar los estilos personalizados
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons';
import SearchBar from '@components/searchBar/searchBar';

const NavBar = () => {

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
      <div className="flex text-xs lg:text-lg items-center justify-between bg-gray-700 text-white px-4 py-7 fixed w-full top-0 z-10 border-b-2">
        <div className="text-lg font-semibold">Wotech</div>
        <div className="flex-grow">
          <SearchBar ref={formRef} onSearch={handleSearch} />
        </div>
        <div className="flex space-x-3 md:mt-2">
          <NavLink to="/home" exact className="hover:text-gray-400 active:text-red-500">
            Inicio
          </NavLink>
          <NavLink to="/stock/getstock/1" className="hover:text-gray-400 active:text-red-500">
            Materiales
          </NavLink>
          <NavLink to="/tools/gettools/1" exact className="hover:text-gray-400 active:text-red-500">
            Herramientas
          </NavLink>
          <NavLink to="/products/getproducts/1" className="hover:text-gray-400 active:text-red-500">
            Productos
          </NavLink>
          <NavLink to="/clients/getclients/1" exact className="hover:text-gray-400 active:text-red-500">
            Clientes
          </NavLink>
          <NavLink to="/suppliers/getsuppliers/1" exact className="hover:text-gray-400 active:text-red-500">
            Proveedores
          </NavLink>
          <NavLink to="/orders/getorders/1" exact className="hover:text-gray-400 active:text-red-500">
            Pedidos
          </NavLink>
          <NavLink to="/userInfo">
            <FontAwesomeIcon icon={faUser} className='w-6 h-6' />
          </NavLink>
        </div>
      </div>
      )}
    </>
  );
};

export default NavBar;
