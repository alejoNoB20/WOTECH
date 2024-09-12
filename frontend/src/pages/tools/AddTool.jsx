import React, { useState } from "react"
import { useModal } from "context/modalContext"
const AddTool = () => {
  const { openModal } = useModal()
  const [createdTool, setCreatedTool] = useState(false)
  const [formData, setFormData] = useState({
    status_tool: "Habilitado",
  })

  const mostrarError = () => {
    openModal({
      errorType: 400,
      validationErrors: ['ASD', 'DSA']
    })
  }
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
            ? "Habilitado"
            : "Deshabilitado"
          : value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch("http://192.168.0.40:8083/tools/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setCreatedTool(true)
      })
  }

  if (createdTool) {
    return <h1>Hola</h1>
  }

  return (
    <div className="max-w-xl mx-auto bg-gray-100 p-6 mt-10 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Ingresar herramienta</h2>
      <div className="p-4">
      <h1 className="text-xl font-bold">Otra Página</h1>
      <button
        onClick={mostrarError}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Mostrar Error de Validación
      </button>
    </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name_tool" className="block text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            id="name_tool"
            name="name_tool"
            value={formData.name_tool || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description_tool" className="block text-gray-700">
            Descripción
          </label>
          <textarea
            id="description_tool"
            name="description_tool"
            value={formData.description_tool || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="status_tool" className="block text-gray-700">
            Habilitada:
            <input
              type="checkbox"
              id="status_tool"
              name="status_tool"
              checked={formData.status_tool || false}
              onChange={handleChange}
              className="my-2 ml-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </label>
        </div>

        <div className="mb-4">
          <label htmlFor="location_tool" className="block text-gray-700">
            Ubicacion
          </label>
          <input
            type="text"
            id="location_tool"
            name="location_tool"
            value={formData.location_tool || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Crear Material
        </button>
      </form>
    </div>
  )
}

export default AddTool
