import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "@components/loader/Loader"
import { faPen, faTrash, faFloppyDisk, faFileImage, faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons"
import { useModal } from "@context/modalContext"
import { useNotifications } from "@context/notificationsContext"

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
        navigate('/tools/gettools');
      }finally{
        setLoading(false)
      }
    }
    fetchData()
  }, [id, navigate])

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
            navigate("/tools/gettools");
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
            navigate("/tools/gettools");
            return
        default:
            setLoading(false);
            handleFail('Ah ocurrido un error inesperado');
            navigate("/tools/gettools");
            return;
    }
    }catch(err){
      console.log(err);
    }finally{
      setLoading(false);
    }
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
            navigate("/tools/gettools");
            return;
        }else {
            setLoading(false);
            handleFail(responseJSON);
            navigate("/tools/gettools");
            return
        }
      }else {
          setLoading(false);
          handleSuccess(responseJSON);
          navigate("/tools/gettools");
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
        return "text-gray-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full h-full flex-col bg-gray-100 px-6 py-2 mt-2 rounded-lg shadow-md">
          {!showForm ? (
            <div>
              {/* Imagen de la herramienta */}
              <div className="flex justify-center mb-6">
                <img
                  src={
                    tool.img_tool ||
                    "https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png"
                  }
                  alt={tool.name_tool || "Imagen de la herramienta"}
                  className="w-full h-auto max-w-xs rounded-lg shadow-md"
                />
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Columna Izquierda */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-gray-400 text-xs font-semibold">
                        Nombre:
                      </h4>
                    </div>
                    <p className="text-gray-800 text-lg">
                      {tool.name_tool || "No disponible"}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-gray-400 text-xs font-semibold">
                      Descripción:
                    </h4>
                    <p className="text-gray-800 text-lg">
                      {tool.description_tool || "Sin descripción"}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-gray-400 text-xs font-semibold">
                      Ubicación:
                    </h4>
                    <p className="text-gray-800 text-lg">
                      {tool.location_tool || "No disponible"}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-gray-400 text-xs font-semibold">
                      Estado:
                    </h4>
                    <p className={getStatusColor(tool.status_tool)}>
                      {tool.status_tool || "No disponible"}
                    </p>
                  </div>
                </div>

                {/* Columna Derecha */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-gray-400 text-xs font-semibold">
                      Taller de reparación:
                    </h4>
                    <p className="text-gray-800 text-lg">
                      {tool.repair_shop_tool || "No disponible"}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-gray-400 text-xs font-semibold">
                      Fecha de reparación:
                    </h4>
                    <p className="text-gray-800 text-lg">
                      {tool.repair_date_tool
                        ? new Date(tool.repair_date_tool).toLocaleDateString()
                        : "No disponible"}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-gray-400 text-xs font-semibold">
                      Buscar reparación:
                    </h4>
                    <p className="text-gray-800 text-lg">
                      {tool.search_repair_tool || "No disponible"}
                    </p>
                  </div>

                  <button
                    onClick={() => setShowForm(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                  >
                    <FontAwesomeIcon icon={faPen} className="mr-2" />
                    Actualizar herramienta
                  </button>
                </div>
              </div>

              {/* Productos Abajo de Todo */}
              {tool.products && tool.products.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-gray-700 text-sm font-semibold text-center">
                    Productos relacionados:
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-2 justify-center">
                    {tool.products.map((product) => (
                      <a
                        key={product.id_product}
                        href={`/products/detailproduct/${product.id_product}`}
                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm"
                      >
                        {product.name_product}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Formulario de Edición */}
                <div className="flex flex-col bg-white rounded-xl shadow-xl px-10 py-3">
                  {/* Titulo */}
                  <h2 className="text-2xl font-bold mb-4 mx-5">
                      Detalles de la herramienta: {updateTool.name_tool}
                  </h2>                
                  {/* Inputs */}
                  <div className="flex flex-row mx-3">
                    {/* Imagen */}
                    <div className="flex flex-col w-auto min-w-[340px] px-10 justify-center text-center">
                        <button className="rounded-lg text-white bg-indigo-600 hover:bg-indigo-800 font-bold mx-auto py-2 px-10" onClick={()=> {!changeImg ? setChangeImg(true) : setChangeImg(false)}}>
                        <FontAwesomeIcon icon={faFileImage} className="mr-2"/>
                            Cambiar Imagen
                        </button>
                        {changeImg ? (
                            <input type="file" className="mt-3 block w-full px-3 py-2 bg-white border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm my-3" id="img_product" name="img_product" onChange={handleChange}/>
                        ) : (
                            <img id="img" src={updateTool.img_tool} alt={`Imagen de ${updateTool.name_tool}`} className="border-2 border-gray-400 rounded-lg object-contain my-3"/>
                        )}
                    </div>                
                    {/* Columna nº1 */}
                    <div className="flex flex-col w-full mx-10">
                      {/* Nombre */}
                      <div className="my-5">
                        <label
                          className="block text-gray-700 text-sm font-semibold mb-2"
                          htmlFor="name_tool"
                        >
                          Nombre de la herramienta:
                        </label>
                        <input
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                          id="name_tool"
                          name="name_tool"
                          type="text"
                          value={updateTool.name_tool || ""}
                          onChange={handleChange}
                        />
                      </div>
                      {/* Ubicacion */}
                      <div className="my-5">
                        <label
                          className="block text-gray-700 text-sm font-semibold mb-2"
                          htmlFor="location_tool"
                        >
                          Ubicación de la herramienta:
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
                        <div className="my-5">
                          <label
                            className="block text-gray-700 text-sm font-semibold mb-2"
                            htmlFor="status_tool"
                          >
                            Estado de la herramienta:
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
                          Taller de reparación:
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
                          Fecha de reparación:
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
                          Buscar reparación:
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
                  <section className="flex flex-row">
                      <button className="mx-auto bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-lg"
                      onClick={handleUpdate} 
                      >
                      <FontAwesomeIcon icon={faFloppyDisk} className="mr-2" />
                        Actualizar Herramienta
                      </button>
                      <button
                      onClick={handleDisable}
                      className="mx-auto px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700"
                      >
                      <FontAwesomeIcon icon={faTrash} className="mr-2" />
                        Eliminar
                      </button>
                      <button className="mx-auto bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-lg"
                      onClick={()=> setShowForm(false)} 
                      >
                      <FontAwesomeIcon icon={faArrowAltCircleLeft} className="mr-2" />
                        Volver a detalles
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

