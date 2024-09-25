import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate, useParams } from "react-router-dom"
import Loader from "components/loader/Loader"
import { faPen, faTrash, faFloppyDisk } from "@fortawesome/free-solid-svg-icons"

const UpdateTool = () => {
  const [loading, setLoading] = useState(true)
  const [tool, setTool] = useState({})
  const [showForm, setShowForm] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    const fetchData = () => {
      fetch(`${process.env.REACT_APP_API_URL}/tools/details/${id}`)
        .then((response) => response.json())
        .then((response) => {
          setTool(response[0])
        })
        .finally(() => setLoading(false))
    }
    fetchData()
  }, [id])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setTool((prevTool) => ({
      ...prevTool,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleUpdate = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/tools/update/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tool),
    })
    .then(async response => {
      if (!response.ok) {
        return response.json().then(err => {
          throw err
        })
      }
      return response.json()
    })
    .then(data => {
      console.log('Datos recibidos:', data)
    })
    .catch(error => {
      console.log(error)
      // error.errors.forEach(err => {
      //   console.log(`Error en ${err.location}: ${err.msg}`)
      // })
    })
  }

  const handleDisable = async () => {
    const confirmDelete = window.confirm(
      `¿Estás seguro de que quieres eliminar la herramienta "${tool.name_tool}"?`
    )
    if (confirmDelete) {
      await fetch(`${process.env.REACT_APP_API_URL}/tools/disabled/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" }
      })
      navigate("/tools/gettools")
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
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
          {!showForm ? (
            <div>
              {/* Imagen de la herramienta */}
              <div className="flex justify-center mb-6">
                <img
                  src={
                    tool.img_tool ||
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Hand_tools.jpg/1200px-Hand_tools.jpg"
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
                        href={`/path-to-product/${product.id_product}`} // Reemplaza con la ruta deseada
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
            <div className="space-y-6">
              {/* Formulario de Edición */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Columna Izquierda */}
                <div className="space-y-4">
                  <div>
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
                      value={tool.name_tool || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
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
                      value={tool.location_tool || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-gray-700 text-sm font-semibold mb-2"
                      htmlFor="img_tool"
                    >
                      URL de imagen:
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                      id="img_tool"
                      name="img_tool"
                      type="text"
                      value={tool.img_tool || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
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
                      value={tool.status_tool || ""}
                      onChange={handleChange}
                    >
                      <option value="Habilitado">Habilitado</option>
                      <option value="Inhabilitado">Inhabilitado</option>
                      <option value="En Arreglo">En Arreglo</option>
                      <option value="Perdido">Perdido</option>
                    </select>
                  </div>
                </div>

                {/* Columna Derecha */}
                <div className="space-y-4">
                  <div>
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
                      value={tool.repair_shop_tool || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
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
                      value={tool.repair_date_tool || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
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
                      type="text"
                      value={tool.search_repair_tool || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
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
                      value={tool.description_tool || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                >
                  <FontAwesomeIcon icon={faFloppyDisk} className="mr-2" />
                  Guardar
                </button>
                <button
                  onClick={handleDisable}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700"
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-2" />
                  Eliminar
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default UpdateTool
