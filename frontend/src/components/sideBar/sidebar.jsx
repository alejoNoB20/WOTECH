import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './sidebar.css'; // Importar los estilos personalizados

const Sidebar = ({ links }) => {
  return (
    <sidebar className="sidebar bg-gray-800 text-white p-4">
      <nav className="space-y-4">
        {links.map((link, index) => (
          <NavLink 
            key={index} 
            to={link.path} 
            activeClassName="active" 
            className="block text-gray-300 hover:text-white"
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </sidebar>
  );
};

Sidebar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Sidebar;
