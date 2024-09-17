import React, { useState } from "react"
import { useModal } from "context/modalContext"
import { useNavigate } from "react-router-dom"
const AddTool = () => {
  const { openModal } = useModal()
  const [createdTool, setCreatedTool] = useState(false)
  const [formData, setFormData] = useState({
    status_tool: "Habilitado",
  })
  const navigate = useNavigate()
  const mostrarError = (httpErr, errors) => {
    openModal({
      errorType: httpErr,
      validationErrors: errors,
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

    try {
      const response = await fetch("http://192.168.0.40:8083/tools/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const convertedResp = await response.json()
      if(!response.ok){
        if(response.status === 400){
          const errors = convertedResp.errors.map((error)=> error.msg)
          mostrarError(response.status, errors)
          return
        }
        if(response.status === 404){
          mostrarError(response.status, [convertedResp])
          return
        }
        
      }
      if(response.status === 201){
        navigate('/tools/gettools')
      }
      if(response.status === 500){
        console.log(response)
      }
    } catch (error) {
      
    }

    // await fetch("http://192.168.0.40:8083/tools/create", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // })
    //   .then(async (response) => {
    //     if (!response.ok) {
    //       return response.json().then((err) => {
    //         throw err
    //       })
    //     }
    //     response.json()
    //   })
    //   .then((data) => {
    //     setCreatedTool(true)
    //   })
    //   .catch((e) => {
    //     const errors = e.errors.map((error) => error.msg)
    //     console.log(errors)
    //     mostrarError(400, errors)
    //   })
  }

  if (createdTool) {
    const fetchData = async () => {
      const response = await fetch("http://192.168.0.40:8083/tools/gettools")
      const resp = await response.json()
      return resp
    }
    console.log(fetchData())

    // navigate(`/tools/updateTool/${resp}`)
  }

  return (
    <div className="max-w-xl mx-auto bg-gray-100 p-6 mt-10 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Ingresar herramienta</h2>
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
