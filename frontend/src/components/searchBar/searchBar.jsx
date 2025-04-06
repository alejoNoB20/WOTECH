import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Importa el hook useLocation

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [input, setInput] = useState("text");
  const [selectedOption, setSelectedOption] = useState("none");
  const location = useLocation(); // Obtén la ruta actual
  const navigate = useNavigate();

  // Función para cargar opciones dependiendo de la ruta o subruta
  useEffect(() => {
    const fetchOptionsByRoute = () => {
      let newOptions = [];

      if (location.pathname.startsWith("/tools")) {
        newOptions = [
          { value: "id_tool", label: "ID" },
          { value: "name_tool", label: "Nombre" },
          { value: "status_tool", label: "Estado" },
          { value: "location_tool", label: "Ubicación" },
          { value: "repair_shop_tool", label: "Tienda de reparación" },
        ];
      } else if (location.pathname.startsWith("/stock")) {
        newOptions = [
          { value: "id_material", label: "ID" },
          { value: "name_material", label: "Nombre" },
          { value: "amount_material", label: "Cantidad de Stock" },
        ];
      } else if (location.pathname.startsWith("/products")) {
        newOptions = [
          { value: "id_product", label: "ID" },
          { value: "name_product", label: "Nombre" },
        ];
      } else if (location.pathname.startsWith("/clients")) {
        newOptions = [
          { value: "id_client", label: "ID" },
          { value: "name_client", label: "Nombre" },
          { value: "last_name_client", label: "Apellido" },
          { value: "dni_client", label: "DNI" },
          { value: "cuil_or_cuit_client", label: "CUIL o CUIT" },
          { value: "type_client", label: "TIPO" },
        ];
      } else if (location.pathname.startsWith("/suppliers")) {
        newOptions = [
          { value: "name_company_supplier", label: "Nombre del proveedor" },
          {
            value: "distributor_name_supplier",
            label: "Nombre del distribuidor",
          },
        ];
      } else if (location.pathname.startsWith("/orders")) {
        newOptions = [
          { value: "id_order", label: "ID del pedido" },
          { value: "id_client", label: "ID del cliente" },
          { value: "shipping_address_order", label: "Dirección de envío" },
          { value: "delivery_day_order", label: "Día de entrega" },
        ];
      }

      setOptions(newOptions);

      if (!newOptions.some((option) => option.value === selectedOption)) {
        setSelectedOption("none");
        setQuery("");
      }
    };

    fetchOptionsByRoute();
  }, [location.pathname, selectedOption]); // Actualiza las opciones cuando la ruta cambia

  const formRef = useRef(null);

  const handleSelectChange = (e) => {
    if (e.target.value === "status_tool" || e.target.value === "type_client") {
      setInput("select");
      setSelectedOption(e.target.value);
    } else if (e.target.value === "delivery_day_order") {
      setInput("date");
      setSelectedOption(e.target.value);
    } else {
      setInput("text");
      setSelectedOption(e.target.value);
    }
    setQuery("");
  };

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    if (selectedOption !== "none") {
      e.preventDefault();
      navigate(
        `/${
          location.pathname.split("/")[1]
        }/search/1?search_type=${encodeURIComponent(
          selectedOption
        )}&search_value=${encodeURIComponent(e.target.value)}`
      );
    }
  };

  if (options.length === 0) {
    return;
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSearch}
      className="flex items-center sm:mx-3 lg:mx-14"
    >
      <div className="flex mx-full space-x-2 lg:space-x-4">
        {/* Select con opciones dinámicas basadas en la ruta */}
        <select
          value={selectedOption}
          onChange={handleSelectChange}
          className="flex w-40 md:min-w-44 border border-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-xs"
          // required
        >
          <option value="none">Opciones de busqueda</option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-gray-700"
            >
              {option.label}
            </option>
          ))}
        </select>

        {selectedOption === "none" ? (
          <input
            type="text"
            value={query}
            placeholder="Buscar..."
            disabled={true}
            className="w-40 md:min-w-44 m-0 p-2 pl-3 border border-gray-300 rounded-full text-black bg-gray-500 text-xs md:text-sm"
          />
        ) : (
          <>
            {input !== "select" ? (
              <input
                type={input}
                value={query}
                onChange={handleSearch}
                placeholder="Buscar..."
                className="w-40 md:min-w-44 m-0 p-2 pl-3 border border-gray-300 rounded-full text-gray-700 bg-white text-xs md:text-sm"
              />
            ) : (
              <>
                {selectedOption === "status_tool" ? (
                  <select
                    onChange={handleSearch}
                    className="w-40 md:min-w-44 m-0 p-2 pl-3 border border-gray-300 rounded-full text-gray-700 bg-white text-xs md:text-sm"
                  >
                    <option value="none">Seleccionar estado...</option>
                    <option value="Habilitado">Habilitado</option>
                    <option value="En Arreglo">En Arreglo</option>
                    <option value="Inhabilitado">Inhabilitado</option>
                    <option value="Perdido">Perdido</option>
                  </select>
                ) : (
                  <select
                    name=""
                    id=""
                    className="w-40 md:min-w-44 m-0 p-2 pl-3 border border-gray-300 rounded-full text-gray-700 bg-white text-xs md:text-sm"
                  >
                    <option value="none">Seleccion tipo...</option>
                    <option value="Empresa">Empresa</option>
                    <option value="Consumidor Final">Consumidor Final</option>
                    <option value="Otro">Otro</option>
                  </select>
                )}
              </>
            )}
          </>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
