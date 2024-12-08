import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from 'components/loader/Loader';
import { faPen, faTrash, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useModal } from 'context/modalContext';
import { useNotifications } from "context/notificationsContext";
import './updateStock.css';

const UpdateStock = () => {
  const [material, setMaterial] = useState({})
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const { id } = useParams()
  const { openModal } = useModal();
  const notify = useNotifications();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    fetch(`${process.env.REACT_APP_API_URL}/stock/details/${id}`)
    .then(response => response.json())
    .then(response => {
      setMaterial(response[0])
    })
    .finally(() => setLoading(false))    
  }, [id])

  const mostrarError = (httpErr, errors) => {
    openModal({
      errorType: httpErr,
      validationErrors: errors,
    })
  };

  const handleSuccess = (text) => {
    notify('success', text);
  };

  const handleFail = (text) => {
    notify('fail', text);
  };
  
  const handleUpdate = async (e) => {
    try{
      e.preventDefault();
      const {products, suppliers, id_material, ...materialData} = material;

      const response = await fetch(`${process.env.REACT_APP_API_URL}/stock/update/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(materialData),
      });
      const responseJSON = await response.json();

      if(!response.ok){
        if(response.status === 400){
          const errors = responseJSON.errors.map((error) => error.msg)
          mostrarError(response.status, errors);
          handleFail(responseJSON);
          return;
        }else if (response.status === 404){
          mostrarError(response.status, [responseJSON]);
          handleFail(responseJSON);
          return
        }else {
          handleFail(responseJSON);
          navigate("/stock/getstock");
          return
        }
      }else {
        handleSuccess(responseJSON);
        navigate("/stock/getstock");
        return;        
      }

    }catch (err){
      handleFail('Ah ocurrido un error inesperado');
      navigate('/stock/getstock');
      return
    }
  }

  const handleDisabled = async () => {
    const confirmDelete = window.confirm(`Estás seguro que querés eliminar el material "${material.name_material}"`);
    if (confirmDelete) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/stock/disabled/${id}`, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" }
      });
      const responseJSON = await response.json();

      if(!response.ok){
        if(response.status === 400){
          const errors = responseJSON.errors.map((error) => error.msg)
          mostrarError(response.status, errors);
          handleFail(responseJSON);
          return;
        }else if (response.status === 404){
          mostrarError(response.status, [responseJSON]);
          handleFail(responseJSON);
          return
        }else {
          handleFail(responseJSON);
          navigate("/stock/getstock");
          return
        }
      }else {
        handleSuccess(responseJSON);
        navigate("/stock/getstock");
        return;        
      }

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
    ): (
      <section className='mx-auto max-w-4xl flex rounded-lg shadow-md p-4 bg-gray-100 justify-center'>
        {!showForm ? (
          <div className='flex rounded-lg bg-white'>
            <div className='container flex-col py-5'>
              <div className='flex flex-row p-4'>
                <div className='flex flex-col mx-14'>
                <div className='mb-4'>
                    <h4 className='text-gray-400 text-xs font-semibold'>
                      Nombre del material: 
                    </h4>
                    <p className='text-gray-800 text-lg'>
                      {material.name_material || null}
                    </p>
                  </div>
                  <div className='mb-4'>
                    <h4 className='text-gray-400 text-xs font-semibold'>
                      Descripción del material: 
                    </h4>
                    <p className='text-gray-800 text-lg max-w-60'>
                      {material.description_material || null}
                    </p>
                  </div>
                  <div className='mb-4'>
                    <h4 className='text-gray-400 text-xs font-semibold'>
                      Stock habilitado: 
                    </h4>
                    <p className='text-gray-800 text-lg'>
                      {material.amount_material || null}
                    </p>
                  </div>
                  <div className='mb-4'>
                    <h4 className='text-gray-400 text-xs font-semibold'>
                      Unidad de medida: 
                    </h4>
                    <p className='text-gray-800 text-lg'>
                      {material.measurement_material || null}
                    </p>
                  </div>
                </div>
                <div className='flex flex-col mx-14'>
                  <div className='mb-4'>
                    <h4 className='text-gray-400 text-xs font-semibold my-5' onClick={() => console.log(material.products.length == 0)}>
                      Productos que incluyen {material.name_material}: 
                    </h4>
                    <select name="products" className="text-gray-800 text-lg rounded-lg mb-8">
                      <option value="default" selected>Lista de productos</option>
                      {material.products.map(association => {
                        return (
                          <option 
                            value={association.id_product}
                            onChange={handleProductRedirect}
                          >
                            {association.name_product}
                          </option>
                        )
                      }) }
                    </select>
                  </div>
                  <div className='mb-4'>
                    <h4 className='text-gray-400 text-xs font-semibold mb-2'>
                      Proveedores de {material.name_material}: 
                    </h4>
                    <select name="suppliers" className="text-gray-800 text-lg rounded-lg mb-8">
                      <option value="default" selected>Lista de proveedores</option>
                      {material.suppliers.map(association => {
                        return (
                          <option 
                            value={association.id_supplier}
                            onChange={handleSupplierRedirect}
                          >
                            {association.name_company_supplier}
                          </option>
                        )
                      }) }
                    </select>
                  </div>
                </div>
              </div>
              <div className='flex justify-center mt-4'>
                <button onClick={() => setShowForm(true)} className="mx-auto bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded">
                  <FontAwesomeIcon icon={faFloppyDisk} className="mr-2" />
                  Actualizar Material
                </button>
              </div>
            </div>
          </div>
        ): (
            <div className="max-w-xl mx-auto bg-gray-100 p-6 mt-10 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Actualizar material: {material.name_material}</h2>
              <form onSubmit={handleUpdate} >
                <div className="mb-4">
                  <label htmlFor="name_material" className="block text-gray-700">Nombre</label>
                  <input
                    type="text"
                    id="name_material"
                    name="name_material"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={material.name_material || null}
                    onChange={(e) => setMaterial({...material, name_material: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description_material" className="block text-gray-700">Descripción</label>
                  <textarea
                    id="description_material"
                    name="description_material"
                    value={material.description_material || null}
                    onChange={(e) => setMaterial({...material, description_material: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
      
                <div className="mb-4">
                  <label htmlFor="measurement_material" className="block text-gray-700">Unidad de medida
                    <select
                      id="measurement_material"
                      name="measurement_material"
                      value={material.measurement_material || null}
                      onChange={(e) => setMaterial({...material, measurement_material: e.target.value})}
                      className="my-2 ml-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="none">Elegir...</option>
                      <option value="cm">Centímetro</option>
                      <option value="unidad">Unidad</option>
                    </select>
                  </label>
                </div>
      
                <div className="mb-4">
                  <label htmlFor="amount_material" className="block text-gray-700">Cantidad</label>
                  <input
                    type="number"
                    id="amount_material"
                    name="amount_material"
                    value={material.amount_material || 0}
                    onChange={(e) => setMaterial({...material, amount_material: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                </form>
                <div className='flex flex-row mt-5 mx-5 justify-center text-center '>
                  <button
                    onClick={handleUpdate}
                    className="bg-green-700 hover:bg-green-900 focus:ring-green-950 text-white font-bold px-4 py-1 rounded-md mx-3 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  >
                    <FontAwesomeIcon icon={faPen} className='mr-2'/>
                    Actualizar Material
                  </button>
                  <button
                    onClick={handleDisabled}
                    className="bg-red-800 text-white font-bold px-4 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-offset-2 mx-3"
                  >
                    <FontAwesomeIcon icon={faTrash} className='mr-2'/>
                    Eliminar Material
                  </button>
                  <button
                    onClick={() => setShowForm(false)}
                    className="bg-indigo-600 text-white px-4 py-1 font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mx-3"
                  >
                    Volver
                  </button>
                </div>
          </div>
        )}
      </section>
    )}
    </>
  )
}


export default UpdateStock
