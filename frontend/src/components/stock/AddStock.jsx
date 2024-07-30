import React, { useState } from 'react'

const MaterialForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: '',
    price: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <div className="flex flex-col md:flex-row max-w-4xl mx-auto bg-gray-100 p-6 mt-10 rounded-lg shadow-md">
      <div className="md:w-1/2 md:pr-6">
        <h2 className="text-2xl font-bold mb-4">Crear Material</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700">Cantidad</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700">Precio</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
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
      <div className="md:w-1/2 mt-6 md:mt-0 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Vista Previa del Material</h2>
        <div className="mb-4">
          <p className="text-gray-700"><strong>Nombre:</strong> {formData.name}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700"><strong>Descripción:</strong> {formData.description}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700"><strong>Cantidad:</strong> {formData.quantity}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700"><strong>Precio:</strong> ${formData.price}</p>
        </div>
      </div>
    </div>
  )
}

export default MaterialForm
