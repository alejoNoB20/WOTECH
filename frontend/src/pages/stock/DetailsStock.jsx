import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '@components/loader/Loader';
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useModal } from '@context/modalContext';
import { useNotifications } from "@context/notificationsContext";
import './updateStock.css';

const UpdateStock = () => {
  const [material, setMaterial] = useState({});
  const [updatedMaterial, setUpdatedMaterial] = useState({});
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { id } = useParams();
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
      const {products, suppliers, id_material, ...materialData} = updatedMaterial;

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
          navigate("/stock/getstock/1");
          return
        }
      }else {
        handleSuccess(responseJSON);
        navigate("/stock/getstock/1");
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

  const handleProductRedirect = async (e) => {
    navigate(`/products/detailproduct/${e.target.value}`);
  };

  const handleSupplierRedirect = async (e) => {
    navigate(`/suppliers/detailsupplier/${e.target.value}`);
  };

  return (
    // FONDO
    <section className='flex w-full h-full justify-center bg-gray-200'>
      {loading && (
        <Loader/>
      )}
      {!showForm ? (
        // PRINCIPAL
        <div className='flex flex-col bg-white rounded-xl shadow-xl mx-3 mb:my-9 mb:px-2 mb:py-5 md:py-5 md:my-3 md:px-20'>
          {/* TITULO */}
          <h2 className="text-2xl font-bold mb-4 mx-5 text-center">
              Detalles del material: {material.name_material}
          </h2>
          {/* DATOS */}
          <div className='flex flex-col justify-center items-center text-center'>
            {/* FILA DE NOMBRE, STOCK, Y UNIDAD DE MEDIDA */}
            <div className='flex flex-row mb-4 space-x-7'>
              {/* NOMBRE */}
              <div className='flex flex-col'>
                <h4 className='text-gray-500 text-xs font-semibold'>
                  Nombre del material: 
                </h4>
                <p className='text-gray-800 text-lg'>
                  {material.name_material || 'No disponible'}
                </p>
              </div>
              {/* CANTIDADES */}
              <div className='flex flex-col'>
                <h4 className='text-gray-500 text-xs font-semibold'>
                  Stock habilitado: 
                </h4>
                <p className='text-gray-800 text-lg'>
                  {material.amount_material || 'No disponible'}
                </p>
              </div>
              {/* UNIDAD DE MEDIDA */}
              <div className='flex flex-col'>
                <h4 className='text-gray-500 text-xs font-semibold'>
                  Unidad de medida: 
                </h4>
                <p className='text-gray-800 text-lg'>
                  {material.measurement_material || 'No disponible'}
                </p>
              </div>
            </div>
            {/* DESCRIPCION */}
            <div className='mb-4'>
              <h4 className='text-gray-500 text-xs font-semibold'>
                Descripción del material: 
              </h4>
              <p className='text-gray-800 text-lg rounded-lg text-center max-w-xs md:max-w-sm break-words' >
                {material.description_material || 'No disponible'}
              </p>
            </div>
            {/* COLUMNA Nº2 */}
            <div className='flex flex-row space-x-2'>
              <div className='mb-4'>
                <h4 className='text-gray-500 text-xs font-semibold'>
                  Productos con {material.name_material}: 
                </h4>
                <select name="products" className="mt-1 block w-full px-2 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb:text-xs">
                  <option value="default" selected>Lista de productos</option>
                  {Array.isArray(material.products) && material.products && material.products.map(association => {
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
                <h4 className='text-gray-500 text-xs font-semibold'>
                  Proveedores de {material.name_material}: 
                </h4>
                <select name="suppliers" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb:text-xs">
                  <option value="default" selected>Lista de proveedores</option>
                  {Array.isArray(material.suppliers) && material.suppliers && material.suppliers.map(association => {
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

          {/* BOTON */}
          <div className='flex justify-center mt-4'>
            <button onClick={() => {setShowForm(true); setUpdatedMaterial(material)}} className="mx-auto bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded">
              <FontAwesomeIcon icon={faFloppyDisk} className="mr-2" />
              Actualizar Material
            </button>
          </div>
        </div>
      ) : (
          // PRINCIPAL
          <div className="flex flex-col bg-white rounded-xl shadow-xl mb:my-12 mb:py-5 mb:px-3 md:py-5 md:my-3 md:px-20">
            <h2 className="text-2xl font-bold mb-4 text-center">Actualizar material: {material.name_material}</h2>
            <form onSubmit={handleUpdate} className='flex flex-col mb:mx-auto'>
              {/* DATOS */}
              <div className="mb-4">
                {/* NOMBRE */}
                <label htmlFor="name_material" className="block text-gray-700">Nombre: *</label>
                <input
                  type="text"
                  id="name_material"
                  name="name_material"
                  className="mt-1 w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={updatedMaterial.name_material || null}
                  onChange={(e) => setUpdatedMaterial({...updatedMaterial, name_material: e.target.value})}
                  required
                />
              </div>
              {/* DESCRIPCION */}
              <div className="mb-2">
                <label htmlFor="description_material" className="block text-gray-700">Descripción:</label>
                <textarea
                  id="description_material"
                  name="description_material"
                  value={updatedMaterial.description_material || null}
                  onChange={(e) => setUpdatedMaterial({...updatedMaterial, description_material: e.target.value})}
                  className="mt-1 w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {/* UNIDAD DE MEDIDA */}
              <div className="mb-2">
                <label htmlFor="measurement_material" className="block text-gray-700">Unidad de medida: *
                  <select
                    id="measurement_material"
                    name="measurement_material"
                    value={updatedMaterial.measurement_material || null}
                    onChange={(e) => setUpdatedMaterial({...updatedMaterial, measurement_material: e.target.value})}
                    className="my-2 ml-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  >
                    <option value="none">Elegir...</option>
                    <option value="cm">Centímetro</option>
                    <option value="unidad">Unidad</option>
                  </select>
                </label>
              </div>
              {/* CANTIDAD */}
              <div className="mb-4">
                <label htmlFor="amount_material" className="block text-gray-700">Cantidad: *</label>
                <input
                  type="number"
                  id="amount_material"
                  name="amount_material"
                  value={updatedMaterial.amount_material || 0}
                  onChange={(e) => setUpdatedMaterial({...updatedMaterial, amount_material: e.target.value})}
                  className="mt-1 w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
            </form>
            {/* BOTONERA */}
            <div className='flex flex-row mt-5 mx-5 justify-center text-center space-x-4'>
              <button
                onClick={handleUpdate}
                className="bg-green-700 hover:bg-green-900 focus:ring-green-950 text-white font-bold px-4 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Actualizar
              </button>
              <button
                onClick={handleDisabled}
                className="bg-red-800 text-white font-bold px-5 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-offset-2"
              >
                Eliminar
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="bg-indigo-600 text-white px-6 py-1 font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Volver
              </button>
            </div>
        </div>
      )}
    </section>
  )
}


export default UpdateStock
