import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom'; // Importa el hook useLocation

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const location = useLocation(); // Obtén la ruta actual
  const navigate = useNavigate();
  // Función para cargar opciones dependiendo de la ruta o subruta
  useEffect(() => {
    const fetchOptionsByRoute = () => {
      if (location.pathname.startsWith('/tools')) {
        setOptions([
          { value: 'id_tool', label: 'ID' },
          { value: 'name_tool', label: 'Nombre' },
          { value: 'status_tool', label: 'Estado' },
          { value: 'location_tool', label: 'Ubicación' },
          { value: 'repair_shop_tool', label: 'Tienda de reparación' },
        ]);
      } else if (location.pathname.startsWith('/stock')) {
        setOptions([
          { value: 'id_material', label: 'ID' },
          { value: 'name_material', label: 'Nombre' },
          { value: 'amount_material', label: 'Cantidad de Stock' },
        ]);
      } else if (location.pathname.startsWith('/products')) {
        setOptions([
          { value: 'id_product', label: 'ID' },
          { value: 'name_product', label: 'Nombre' },
        ]);
      } else if (location.pathname.startsWith('/clients')) {
        setOptions([
          { value: 'id_client', label: 'ID' },
          { value: 'name_client', label: 'Nombre' },
          { value: 'last_name_client', label: 'Apellido' },
          { value: 'dni_client', label: 'DNI' },
          { value: 'cuil_or_cuit_client', label: 'CUIL o CUIT' },
          { value: 'type_client', label: 'TIPO' },
        ]);
      } else if (location.pathname.startsWith('/suppliers')) {
        setOptions([
          { value: 'name_company_supplier', label: 'Nombre del proveedor' },
          { value: 'distributor_name_supplier', label: 'Nombre del distribuidor' },
        ]);
      } else if (location.pathname.startsWith('/orders')) {
        setOptions([
          { value: 'id_order', label: 'ID del pedido' },
          { value: 'id_client', label: 'ID del cliente' },
          { value: 'shipping_address_order', label: 'Dirección de envío' },
          { value: 'delivery_day_order', label: 'Día de entrega' },
        ]);
      }else {
        setOptions([]); // Opciones vacías si la ruta no coincide
      }
    };

    fetchOptionsByRoute();
  }, [location.pathname]); // Actualiza las opciones cuando la ruta cambia

  const formRef = useRef(null);
  
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    navigate(`/${location.pathname.split('/')[1]}/search?search_type=${encodeURIComponent(selectedOption)}&search_value=${encodeURIComponent(query)}`)
  };
  if(options.length === 0){
    return
  }
  return (
    <form ref={formRef} onSubmit={handleSearch} className="flex items-center space-x-4 w-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Buscar..."
          className="w-full m-0 p-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
        </div>
      </div>

      {/* Select con opciones dinámicas basadas en la ruta */}
      <select
        value={selectedOption}
        onChange={handleSelectChange}
        className="flex w-auto border border-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700" 
        // required
      >
        <option value="">Selecciona una opción</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className='text-gray-700'>
            {option.label}
          </option>
        ))}
      </select>
    </form>
  );
};

export default SearchBar;
