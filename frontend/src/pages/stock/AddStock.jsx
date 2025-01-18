import React, { useState } from 'react';
import { useModal } from "@context/modalContext"
import { useNavigate } from "react-router-dom";
import { useNotifications } from "@context/notificationsContext";

const AddStock = () => {
  const { openModal } = useModal();
  const navigate = useNavigate();
  const notify = useNotifications();

  const [nameMaterial, setNameMaterial] = useState("");
  const [descriptionMaterial, setDescriptionMaterial] = useState("");
  const [measurementMaterial, setMeasurementMaterial] = useState("");
  const [amountMaterial, setAmountMaterial] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name_material: nameMaterial,
      description_material: descriptionMaterial,
      measurement_material: measurementMaterial,
      amount_material: amountMaterial,
    };;
    
    try{
      const response = await fetch(`${process.env.REACT_APP_API_URL}/stock/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const responseJSON = await response.json();

      switch (response.status) {
        case 201:
          handleSuccess(responseJSON);
          navigate("/stock/getstock");
          return;
        case 400:
          const errors = responseJSON.errors.map((error) => error.msg)
          mostrarError(response.status, errors);
          handleFail(responseJSON);
          return;
        case 404:
          mostrarError(response.status, [responseJSON]);
          handleFail(responseJSON);
          return
        case 500:
          handleFail(responseJSON);
          navigate("/stock/getstock");
          return
        default:
          handleFail('Ah ocurrido un error inesperado');
          navigate("/stock/getstock");
          return;
      }
    } catch (error) {
      console.error("Error:", error)
      handleFail()
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="">
        <h2 className="text-2xl font-bold mb-4">Crear Material</h2>
        <form onSubmit={handleSubmit} >
          <div className="mb-4">
            <label htmlFor="name_material" className="block text-gray-700">Nombre</label>
            <input
              type="text"
              id="name_material"
              name="name_material"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e) => setNameMaterial(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description_material" className="block text-gray-700">Descripción</label>
            <textarea
              id="description_material"
              name="description_material"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e) => setDescriptionMaterial(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="measurement_material" className="block text-gray-700">Unidad de medida
              <select
                id="measurement_material"
                name="measurement_material"
                className="my-2 ml-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => setMeasurementMaterial(e.target.value)}
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
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e) => setAmountMaterial(e.target.value)}
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
