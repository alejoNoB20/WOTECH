import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faFloppyDisk, faTrash } from '@fortawesome/free-solid-svg-icons'
import './updateStock.css'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
const UpdateStock = () => {
  const [material, setMaterial] = useState({})
  const [loading, setLoading] = useState(true)
  const [item, setItem] = useState([])
  const [isEditable, setIsEditable] = useState({
    name_material: false,
    description_material: false,
    amount_material: false,
    how_much_contains: false,
    buy_price_material: false
  })
  const { id } = useParams()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setMaterial((prevMaterial) => ({
      ...prevMaterial,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }
  useEffect(() => {
    setLoading(true)
    const fetchData = () => {
      fetch('https://wotech.onrender.com/stock/search?search_type=id_material&search_value=' + id)
        .then(response => response.json())
        .then(response => {
          const { updatedAt, createdAt, total_amount_material, ...restData } = response.resultado[0]
          if (restData.how_much_contains > 0) {
            restData.contains = true
          }
          setMaterial(restData)
          setItem(restData)
        })
        .finally(() => setLoading(false))
    }
    fetchData()
  }, [id])
  const toggleInput = (field) => {
    setIsEditable((prevEditable) => {
      const isNowEditable = !prevEditable[field]
      if (!isNowEditable) {
        setItem(material)
      }
      return {
        ...prevEditable,
        [field]: isNowEditable
      }
    })
  }
  const handleUpdate = async () => {
    await fetch('https://wotech.onrender.com/stock/update/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(material),
    })
    .then(window.location.reload())
  }
  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Estás seguro que querés eliminar el material "${material.name_material}"`)
    if (confirmDelete) {
      await fetch('https://wotech.onrender.com/stock/delete/' + id, {
        method: 'DELETE',
      })
      navigate('/stock/getstock')
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="mx-auto max-w-4xl rounded overflow-hidden shadow-lg p-4 bg-white flex">
          <div className="w-1/2 pr-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name_material">
                Nombre del material:
              </label>
              <div className="flex items-center">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name_material"
                  name="name_material"
                  type="text"
                  value={material.name_material || ''}
                  onChange={handleChange}
                  readOnly={!isEditable.name_material}
                />
                <button onClick={() => toggleInput('name_material')} className="ml-2">
                  {!isEditable.name_material ? (
                    <FontAwesomeIcon icon={faPen} className="w-4 h-4" />
                  ) : (
                    <FontAwesomeIcon icon={faFloppyDisk} className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description_material">
                Descripción:
              </label>
              <div className="flex items-center">
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description_material"
                  name="description_material"
                  value={material.description_material || ''}
                  onChange={handleChange}
                  readOnly={!isEditable.description_material}
                />
                <button onClick={() => toggleInput('description_material')} className="ml-2">
                  {!isEditable.description_material ? (
                    <FontAwesomeIcon icon={faPen} className="w-4 h-4" />
                  ) : (
                    <FontAwesomeIcon icon={faFloppyDisk} className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount_material">
                Cantidad por unidad:
              </label>
              <div className="flex items-center">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="amount_material"
                  name="amount_material"
                  type="text"
                  value={material.amount_material || ''}
                  onChange={handleChange}
                  readOnly={!isEditable.amount_material}
                />
                <button onClick={() => toggleInput('amount_material')} className="ml-2">
                  {!isEditable.amount_material ? (
                    <FontAwesomeIcon icon={faPen} className="w-4 h-4" />
                  ) : (
                    <FontAwesomeIcon icon={faFloppyDisk} className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="contains" className="block text-gray-700">Unidad
                <input
                  type="checkbox"
                  id="contains"
                  name="contains"
                  checked={material.contains || false}
                  onChange={handleChange}
                  className="my-2 ml-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </label>
            </div>
            {material.contains && (<div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="how_much_contains">
                Contiene:
              </label>
              <div className="flex items-center">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="how_much_contains"
                  name="how_much_contains"
                  type="text"
                  value={material.how_much_contains || ''}
                  onChange={handleChange}
                  readOnly={!isEditable.how_much_contains || ''}
                />
                <button onClick={() => toggleInput('how_much_contains')} className="ml-2">
                  {!isEditable.how_much_contains ? (
                    <FontAwesomeIcon icon={faPen} className="w-4 h-4" />
                  ) : (
                    <FontAwesomeIcon icon={faFloppyDisk} className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>)}

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="buy_price_material">
                Precio por unidad:
              </label>
              <div className="flex items-center">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="buy_price_material"
                  name="buy_price_material"
                  type="text"
                  value={material.buy_price_material || ''}
                  onChange={handleChange}
                  readOnly={!isEditable.buy_price_material}
                />
                <button onClick={() => toggleInput('buy_price_material')} className="ml-2">
                  {!isEditable.buy_price_material ? (
                    <FontAwesomeIcon icon={faPen} className="w-4 h-4" />
                  ) : (
                    <FontAwesomeIcon icon={faFloppyDisk} className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex justify-start space-x-4">
              <button onClick={handleUpdate} className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded">
                <FontAwesomeIcon icon={faFloppyDisk} className="mr-2" />
                Guardar Material
              </button>

              <button onClick={handleDelete} className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded">
                <FontAwesomeIcon icon={faTrash} className="mr-2" />
                Eliminar Material
              </button>
            </div>

          </div>
          <div className="w-1/2 pl-4">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{item.name_material}</h2>
              <span className="bg-green-100 text-green-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
                Stock: {item.total_amount_material}
              </span>
            </div>
            <p className="text-gray-700 text-base mb-4">
              {item.description_material}
            </p>
            <div className="flex items-center">
              <div className="text-sm">
                <p className="text-gray-600">Código: {item.id_material}</p>
                <p className="text-gray-600">Cantidad en unidades: {item.amount_material}</p>
                <p className="text-gray-600">Cada uno contiene: {item.how_much_contains}</p>
                <p className="text-gray-600">Precio del material: ${item.buy_price_material}</p>
              </div>
            </div>
          </div>
        </div>

      )}
    </>
  )
}

export default UpdateStock
