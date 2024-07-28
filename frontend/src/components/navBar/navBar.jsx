import React from 'react';
import { NavLink } from 'react-router-dom';
import './navBar.css'; // Importar los estilos personalizados
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../searchBar/searchBar';
const NavBar = ({ logged }) => {
  const handleSearch = (query) => {
    console.log('Search query:', query)
    // Aquí puedes manejar la búsqueda, por ejemplo, redirigir a una página de resultados
  }
  return (
    <div className="navbar bg-gray-700 text-white p-7 fixed w-full top-0 z-10">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Wotech</div>
        <SearchBar onSearch={handleSearch} />
        <div className="space-x-4">

          <NavLink to="/" exact className="hover:text-gray-400 active:text-red-500">
            Inicio
          </NavLink>
          <NavLink to="/stock" className="hover:text-gray-400 active:text-red-500">
            Materiales
          </NavLink>
          <NavLink to="/products" className="hover:text-gray-400 active:text-red-500">
            Productos
          </NavLink>
          <NavLink to="/tools" exact className="hover:text-gray-400 active:text-red-500">
            Herramientas
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
  );
};

export default NavBar;
