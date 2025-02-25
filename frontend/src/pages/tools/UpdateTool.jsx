import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "@components/loader/Loader"
import { faPen, faFileImage } from "@fortawesome/free-solid-svg-icons"
import { useModal } from "@context/modalContext"
import { useNotifications } from "@context/notificationsContext"
import { format } from "@formkit/tempo"

const UpdateTool = () => {
  const [loading, setLoading] = useState(true);
  const [tool, setTool] = useState({});
  const [updateTool, setUpdateTool] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [changeImg, setChangeImg] = useState(false);
  const [fix, setFix] = useState(false);
  const { openModal } = useModal();
  const notify = useNotifications();
  const { id } = useParams();
  const navigate = useNavigate();

  const mostrarError = (httpErr, errors) => {
    openModal({
        errorType: httpErr,
        validationErrors: errors,
    })
  };

  const handleSuccess = (msg) => {
      notify("success", msg)
  };

  const handleFail = (msg) => {
      notify("fail", msg)
  };

  useEffect(() => {
    const fetchData = async () => {
      try{
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tools/details/${id}`);
        const responseJSON = await response.json();
          
        setTool(responseJSON[0]);
        setUpdateTool(responseJSON[0]);
        if (responseJSON[0].status_tool === 'En Arreglo'){
          setFix(true);
        }else {
          setFix(false);
        }
      }catch(err){
        console.log(err);
        navigate('/tools/gettools/1');
      }finally{
        setLoading(false)
      }
    }
    fetchData()
  }, [id, navigate])

  const handleProductRedirect = (e) => {
    navigate(`/products/detailproduct/${e.target.value}`)
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdateTool((prevTool) => ({
      ...prevTool,
      [name]: type === "checkbox" ? checked : value,
    }));
    if(name === 'status_tool'){
      if(value === 'En Arreglo'){
        setFix(true);
      }else {
        setFix(false);
      };
    };
  };

  const handleUpdate = async () => {
    try{
      setLoading(true);

      const response = await fetch(`${process.env.REACT_APP_API_URL}/tools/update/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateTool),
      });
      const responseJSON = await response.json();


      switch (response.status) {
        case 200:
            setLoading(false);
            handleSuccess(responseJSON);
            navigate("/tools/gettools/1");
            return;
        case 400:
          setLoading(false);
            const errors = responseJSON.errors.map((error) => error.msg)
            mostrarError(response.status, errors);
            handleFail(responseJSON);
            return;
        case 404:
            setLoading(false);
            mostrarError(response.status, [responseJSON]);
            handleFail(responseJSON);
            return
        case 500:
            setLoading(false);
            handleFail(responseJSON);
            navigate("/tools/gettools/1");
            return
        default:
            setLoading(false);
            handleFail('Ah ocurrido un error inesperado');
            navigate("/tools/gettools/1");
            return;
    }
    }catch(err){
      setLoading(false);
      console.log(err);
    };
  }

  const handleDisable = async () => {
    const confirmDelete = window.confirm(
      `¿Estás seguro de que quieres eliminar la herramienta "${tool.name_tool}"?`
    )
    if (confirmDelete) {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tools/disabled/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" }
      });
      const responseJSON = await response.json();

      if(!response.ok){
        if(response.status === 500){
            setLoading(false);
            handleFail(responseJSON);
            navigate("/tools/gettools/1");
            return;
        }else {
            setLoading(false);
            handleFail(responseJSON);
            navigate("/tools/gettools/1");
            return
        }
      }else {
          setLoading(false);
          handleSuccess(responseJSON);
          navigate("/tools/gettools/1");
          return;        
      }
    }

  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Habilitado":
        return "text-green-600"
      case "Inhabilitado":
        return "text-red-600"
      case "En Arreglo":
        return "text-blue-600"
      case "Perdido":
        return "text-gray-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        // FONDO
        <div className="flex w-full h-full justify-center bg-gray-200">
          {!showForm ? (
            <div>
              {/* PRINCIPAL */}
              <div className="flex flex-col bg-white px-3 rounded-lg shadow-2xl text-center items-center py-4 m-7 md:m-3 md:px-14">
                {/* TITULO */}
                <h2 className="text-2xl font-bold mb-4 text-center">Detalles de la herramienta: {tool.name_tool}</h2>
                <div className="flex mb:flex-col md:flex-row justify-center items-center md:space-x-12">
                  {/* Imagen de la herramienta */}
                  <div className="flex justify-center mb-4">
                    <img
                      src={
                        tool.img_tool ||
                        "https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png"
                      }
                      alt={tool.name_tool || "Imagen de la herramienta"}
                      className="rounded-lg mb-4 mb:max-w-40 mb:max-h-40 shadow-xl md:object-contain"
                    />
                  </div>
                  {/* DATOS NOMBRE, UBICACION Y ESTADO */}
                  <div className="flex flex-col space-x-4 mb-4">
                    <div className="flex flex-row md:flex-col space-x-4 mb-2">
                      {/* NOMBRE */}
                      <div className="flex flex-col">
                        <h4 className="text-gray-500 text-xs font-semibold">
                          Nombre:
                        </h4>
                        <p className="text-gray-800 text-lg">
                          {tool.name_tool || "No disponible"}
                        </p>
                      </div>
                      {/* ESTADO */}
                      <div className="flex flex-col">
                        <h4 className="text-gray-500 text-xs font-semibold">
                          Estado:
                        </h4>
                        <p className={getStatusColor(tool.status_tool)}>
                          {tool.status_tool || "No disponible"}
                        </p>
                      </div>
                    </div>
                    {/* UBICACION */}
                    <div className="flex flex-col">
                      <h4 className="text-gray-500 text-xs font-semibold">
                        Ubicación:
                      </h4>
                      <p className="text-gray-800 text-lg">
                        {tool.location_tool || "No disponible"}
                      </p>
                    </div>
                  </div>
                </div>
                {/* DESCRIPCION */}
                <div className="flex flex-col mb-4">
                  <h4 className="text-gray-500 text-xs font-semibold">
                    Descripción:
                  </h4>
                  <p className="text-gray-800 text-lg rounded-lg text-center max-w-xs md:max-w-sm break-words">
                    {tool.description_tool || "Sin descripción"}
                  </p>
                </div>

                {/* DATOS DE REPARACION */}
                {tool.status_tool === 'En Arreglo' && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h4 className="text-gray-500 text-xs font-semibold">
                        Taller de reparación:
                      </h4>
                      <p className="text-gray-800 text-lg">
                        {tool.repair_shop_tool || "No disponible"}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-gray-500 text-xs font-semibold">
                        Fecha de reparación:
                      </h4>
                      <p className="text-gray-800 text-lg">
                        {format(tool.repair_date_tool, 'DD/MM/YYYY') || "No disponible"}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-gray-500 text-xs font-semibold">
                        Buscar reparación:
                      </h4>
                      <p className="text-gray-800 text-lg">
                        {format(tool.search_repair_tool, 'DD/MM/YYYY') || "No disponible"}
                      </p>
                    </div>
                  </div>
                )}
                  {/* PRODUCTOS ASOCIADOS */}
                  <div className="flex flex-col mb-4">
                    <h4 className="text-gray-500 text-sm font-semibold text-center">
                      Productos que utilizan {tool.name_tool}:
                    </h4>
                    <select name="products" className="mt-1 block w-full px-2 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb:text-xs">
                      <option value="none" selected>Lista de productos</option>
                      {Array.isArray(tool) && tool.products.length > 0 && tool.products.map((product) => (
                        <option 
                        key={product.id_product} 
                        value={product.id_product}
                        onClick={handleProductRedirect}
                        >
                          {product.id_product} | {product.name_product}
                        </option>
                      ))};
                    </select> 
                  </div>
                  {/* BOTON */}
                  <button
                    onClick={() => setShowForm(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                  >
                    <FontAwesomeIcon icon={faPen} className="mr-2" />
                    Actualizar herramienta
                  </button>
              </div>

            </div>
          ) : (
            <>
              {/* Formulario de Edición */}
                <div className="flex flex-col bg-white px-3 rounded-lg shadow-2xl text-center justify-center py-4 my-7 md:m-3 md:space-x-8">
                  {/* Titulo */}
                  <h2 className="text-2xl font-bold mb-4 mx-5 justify-center">
                      Detalles de la herramienta: {updateTool.name_tool}
                  </h2>                
                  {/* Inputs */}
                  <div className="flex flex-col md:flex-row mx-3">
                    {/* Imagen */}
                    <div className="flex flex-col w-auto min-w-[340px] px-10 justify-center text-center items-center">
                        <button className="rounded-lg text-white bg-indigo-600 hover:bg-indigo-800 font-bold mx-auto mb-2 py-2 px-10" onClick={()=> {!changeImg ? setChangeImg(true) : setChangeImg(false)}}>
                        <FontAwesomeIcon icon={faFileImage} className="mr-2"/>
                            Cambiar Imagen
                        </button>
                        {changeImg ? (
                            <input type="file" className="mb-4 mb:w-30 md:w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb:text-xs" id="img_product" name="img_product" onChange={handleChange}/>
                        ) : (
                            <img id="img" src={updateTool.img_tool} alt={`Imagen de ${updateTool.name_tool}`} className="rounded-lg mb-4 mb:max-w-40
                            mb:max-h-40 shadow-xl md:object-contain"/>
                        )}
                    </div>                
                    {/* Columna nº1 */}
                    <div className="flex w-full flex-col mb:items-center space-y-4 mb-4 md:space-y-7 md:mx-10 items-center">
                      {/* Nombre */}
                      <div className="flex flex-col">
                        <label
                          className="block text-gray-700 text-sm font-semibold mb-2"
                          htmlFor="name_tool"
                        >
                          Nombre de la herramienta: *
                        </label>
                        <input
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                          id="name_tool"
                          name="name_tool"
                          type="text"
                          value={updateTool.name_tool || ""}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      {/* Ubicacion */}
                      <div className="flex flex-col">
                        <label
                          className="block text-gray-700 text-sm font-semibold mb-2"
                          htmlFor="location_tool"
                        >
                          Ubicación de la herramienta: *
                        </label>
                        <input
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                          id="location_tool"
                          name="location_tool"
                          type="text"
                          value={updateTool.location_tool || ""}
                          onChange={handleChange}
                        />
                        </div>
                        {/* Estado de la herramienta */}
                        <div className="flex flex-col">
                          <label
                            className="block text-gray-700 text-sm font-semibold mb-2"
                            htmlFor="status_tool"
                          >
                            Estado de la herramienta: *
                          </label>
                          <select
                            id="status_tool"
                            name="status_tool"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                            value={updateTool.status_tool || ""}
                            onChange={handleChange}
                          >
                            <option value="Habilitado">Habilitado</option>
                            <option value="Inhabilitado">Inhabilitado</option>
                            <option value="En Arreglo">En Arreglo</option>
                            <option value="Perdido">Perdido</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  {/* Descripcion */}
                  <div className="mb-2">
                    <label
                      className="block text-gray-700 text-sm font-semibold mb-2"
                      htmlFor="description_tool"
                    >
                      Descripción:
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                      id="description_tool"
                      name="description_tool"
                      value={updateTool.description_tool || ""}
                      onChange={handleChange}
                    />
                  </div>                  
                  {/* Columna nº2 */}
                  {fix && (
                    <div className="flex flex-col p-2 mx-5">
                      {/* Taller de reparacion */}
                      <div className="mb-2">
                        <label
                          className="block text-gray-700 text-sm font-semibold mb-2"
                          htmlFor="repair_shop_tool"
                        >
                          Taller de reparación: *
                        </label>
                        <input
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                          id="repair_shop_tool"
                          name="repair_shop_tool"
                          type="text"
                          value={updateTool.repair_shop_tool || ""}
                          onChange={handleChange}
                        />
                      </div>
                      {/* Fecha reparacion */}
                      <div className="mb-2">
                        <label
                          className="block text-gray-700 text-sm font-semibold mb-2"
                          htmlFor="repair_date_tool"
                        >
                          Fecha de reparación: *
                        </label>
                        <input
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                          id="repair_date_tool"
                          name="repair_date_tool"
                          type="date"
                          value={updateTool.repair_date_tool || ""}
                          onChange={handleChange}
                        />
                      </div>
                      {/* Buscar reparacion */}
                      <div className="mb-2">
                        <label
                          className="block text-gray-700 text-sm font-semibold mb-2"
                          htmlFor="search_repair_tool"
                        >
                          Buscar reparación: *
                        </label>
                        <input
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                          id="search_repair_tool"
                          name="search_repair_tool"
                          type="date"
                          value={updateTool.search_repair_tool || ""}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )}
                  {/* Botonera */}
                  <section className="flex flex-row space-x-4 md:space-x-14 justify-center">
                      <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-lg"
                      onClick={handleUpdate} 
                      >
                        Actualizar
                      </button>
                      <button
                      onClick={handleDisable}
                      className="px-5 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700"
                      >
                        Eliminar
                      </button>
                      <button className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-6 rounded-lg"
                      onClick={()=> setShowForm(false)} 
                      >
                        Volver
                      </button>
                  </section>
                </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default UpdateTool;

