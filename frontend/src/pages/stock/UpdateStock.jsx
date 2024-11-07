import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from 'components/loader/Loader'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import './updateStock.css'

const UpdateStock = () => {
  const [material, setMaterial] = useState({})
  const [loading, setLoading] = useState(true)
  const [item, setItem] = useState([])
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    const fetchData = () => {
      fetch(`${process.env.REACT_APP_API_URL}/stock/details/${id}`)
        .then(response => response.json())
        .then(response => {
          setMaterial(response[0])
        })
        .finally(() => setLoading(false))
    }
    fetchData()
  }, [id])
  
  const handleUpdate = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/stock/update/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(material),
    })
    .then(window.location.reload())
  }

  const handleDisabled = async () => {
    const confirmDelete = window.confirm(`Estás seguro que querés eliminar el material "${material.name_material}"`)
    if (confirmDelete) {
      await fetch(`${process.env.REACT_APP_API_URL}/stock/disabled/${id}`, {
        method: 'PATCH',
      })
      navigate('/stock/getstock')
    }
  }

  const handleProductRedirect = async () => {
    navigate('/products/getproducts');
  };

  const handleSupplierRedirect = async () => {
    navigate('/suppliers/getsuppliers');
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="mx-auto max-w-4xl rounded overflow-hidden shadow-lg p-4 bg-white flex">
          <div className="w-1/2 pr-4">
            <div className="mb-4">
              <h4 class="text-gray-400 text-xs font-semibold">
                Nombre del material:
              </h4>
              <div className="flex items-center">
                <p class="text-gray-800 text-lg">{material.name_material}</p>
              </div>
            </div>
            <div className="mb-4">
              <h4 class="text-gray-400 text-xs font-semibold">
                Descripción:
              </h4>
              <div className="flex items-center">
                <p class="text-gray-800 text-lg">{material.description_material || ''}</p>
              </div>
            </div>
            <div className="mb-4">
              <h4 class="text-gray-400 text-xs font-semibold">
                Stock habilitado:
              </h4>
              <div className="flex items-center">
                <p class="text-gray-800 text-lg">{material.amount_material}</p>
              </div>
            </div>
            <div className="mb-4">
              <h4 class="text-gray-400 text-xs font-semibold">
                Unidad de medida:
              </h4>
              <div className="flex items-center">
                <p class="text-gray-800 text-lg">{material.measurement_material}</p>
              </div>
            </div>
            <div className="mb-4">
              <h4 class="text-gray-400 text-xs font-semibold">
                Productos asociados:
              </h4>
              <div className="flex items-center">
                <select name="Productos" class="text-gray-800 text-lg">
                  <option selected>Lista de productos:</option>
                  {material.products.map((asocciation)=> {
                    return(
                    <option value={asocciation.id_product} onChange={handleProductRedirect}>
                      {asocciation.name_product}
                    </option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <h4 class="text-gray-400 text-xs font-semibold">
                Proveedores que venden {material.name_material}:
              </h4>
              <div className="flex items-center">
                <select name="Productos" class="text-gray-800 text-lg">
                  <option selected>Lista de proveedores:</option>
                  {material.suppliers.map((asocciation)=> {
                    return(
                    <option value={asocciation.id_supplier} onChange={handleSupplierRedirect}>
                      {asocciation.name_company_supplier}
                    </option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div className="flex justify-start space-x-4">
              <button onClick={handleUpdate} className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded">
                <FontAwesomeIcon icon={faFloppyDisk} className="mr-2" />
                Actualizar Material
              </button>
            </div>

          </div>
          <div className="w-1/2 pl-4">
          </div>
        </div>

      )}
    </>
  )
}

export default UpdateStock
