import React, { useState } from "react"
import { useModal } from "@context/modalContext"
import { useNavigate } from "react-router-dom"
import { useNotifications } from "@context/notificationsContext"

const AddTool = () => {
  const { openModal } = useModal()
  const [formData, setFormData] = useState({
    status_tool: "Habilitado",
    img_tool: null
  })
  const navigate = useNavigate()
  const notify = useNotifications()

  const mostrarError = (httpErr, errors) => {
    openModal({
      errorType: httpErr,
      validationErrors: errors,
    })
  }

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target

    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0]
      })
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? (checked ? "Habilitado" : "Deshabilitado") : value,
      })
    }
  }

  const handleSuccess = () => {
    notify("success", "¡Operación exitosa!")
  }

  const handleFail = () => {
    notify("fail", "¡Algo salió mal!")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData()
    for (const key in formData){
      if(formData.hasOwnProperty(key) && key !== "img_tool"){
        const value = formData[key]
        if(value !== undefined){
          data.append(key, value)
        }
      }
    }
    
    if (formData.img_tool) {
      data.append("img_tool", formData.img_tool)
    }
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tools/create`, {
        method: "POST",
        body: data
      })

      const convertedResp = await response.json()
      if (!response.ok) {
        if (response.status === 400) {
          const errors = convertedResp.errors.map((error) => error.msg)
          mostrarError(response.status, errors)
          handleFail()
          return
        }
        if (response.status === 404) {
          mostrarError(response.status, [convertedResp])
          handleFail()
          return
        }
      }

      if (response.status === 201) {
        handleSuccess()
        navigate("/tools/gettools")
      }
      if (response.status === 500) {
        handleFail()
        navigate("/tools/gettools")
      }
    } catch (error) {
      console.error("Error:", error)
      handleFail()
    }
  }

  return (
    // FONDO
    <section className="flex w-full h-full justify-center bg-gray-200">
      {/* PRINCIPAL */}
      <div className="flex flex-col bg-white rounded-xl shadow-xl mx-3 mb:my-9 mb:px-8 mb:py-5 md:py-5 md:my-3 md:px-20">
        <h2 className="text-2xl font-bold mb-4 text-center">Agregar herramienta</h2>
        <form onSubmit={handleSubmit}>
          {/* NOMBRE */}
          <div className="mb-4">
            <label htmlFor="name_tool" className="block text-gray-700">
              Nombre: *
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
          {/* DESCRIPCION */}
          <div className="mb-4">
            <label htmlFor="description_tool" className="block text-gray-700">
              Descripción: 
            </label>
            <textarea
              id="description_tool"
              name="description_tool"
              value={formData.description_tool || ""}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* UBICACION */}
          <div className="mb-4">
            <label htmlFor="location_tool" className="block text-gray-700">
              Ubicación: *
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
          {/* IMAGEN */}
          <div className="mb-4">
            <label htmlFor="img_tool" className="block text-gray-700">
              Imagen:
            </label>
            <input
              type="file"
              id="img_tool"
              name="img_tool"
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb:text-xs"
            />
          </div>
          {/* BOTON */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Agregar Herramienta
          </button>
        </form>
      </div>
    </section>
  )
}

export default AddTool
