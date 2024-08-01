import React, { useState } from 'react'

const AddStock = () => {
  const [formData, setFormData] = useState({})
  const [createdMaterial, setCreatedMaterial] = useState(false)
  const [resp, setResp] = useState({})
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('https://wotech.onrender.com/stock/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json()) // Convierte la respuesta a JSON
      .then(data => {
        setResp(data)
      })
      .catch(err => console.log(err))
      setCreatedMaterial(true)
      console.log(formData)
      console.log(resp)
  }

  if (createdMaterial) {
    return (
      <div className="flex flex-col md:flex-row max-w-4xl mx-auto bg-gray-100 p-6 mt-10 rounded-lg shadow-md">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Vista Previa del Material</h2>
          <div className="mb-4">
            <p className="text-gray-700"><strong>Nombre:</strong> {formData.name_material}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700"><strong>Descripción:</strong> {formData.description_material}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700"><strong>Cantidad en el contenedor:</strong> {formData.contains ? formData.how_much_contains : 'N/A'}</p>
          </div>

          <div className="mb-4">
            <p className="text-gray-700"><strong>Precio:</strong> ${formData.buy_price_material}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700"><strong>Cantidad:</strong> {formData.amount_material}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto bg-gray-100 p-6 mt-10 rounded-lg shadow-md">
      <div className="md:w-1/2 md:pr-6">
        <h2 className="text-2xl font-bold mb-4">Crear Material</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name_material" className="block text-gray-700">Nombre</label>
            <input
              type="text"
              id="name_material"
              name="name_material"
              value={formData.name_material || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description_material" className="block text-gray-700">Descripción</label>
            <textarea
              id="description_material"
              name="description_material"
              value={formData.description_material || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="contains" className="block text-gray-700">Unidad
              <input
                type="checkbox"
                id="contains"
                name="contains"
                checked={formData.contains || false}
                onChange={handleChange}
                className="my-2 ml-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </label>
          </div>
          {formData.contains && (
            <div className="mb-4">
              <label htmlFor="how_much_contains" className="block text-gray-700">Cantidad en el contenedor</label>
              <input
                type="number"
                id="how_much_contains"
                name="how_much_contains"
                value={formData.how_much_contains || ''}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="buy_price_material" className="block text-gray-700">Precio</label>
            <input
              type="number"
              id="buy_price_material"
              name="buy_price_material"
              value={formData.buy_price_material || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amount_material" className="block text-gray-700">Cantidad</label>
            <input
              type="number"
              id="amount_material"
              name="amount_material"
              value={formData.amount_material || ''}
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
    </div>
  )
}

export default AddStock
