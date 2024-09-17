// ErrorModal.js
import React from 'react';
import ReactDOM from 'react-dom';
import { useModal } from 'context/modalContext';
const ErrorModal = () => {
  const { showModal, modalProps, closeModal } = useModal();

  // Si el modal no debe mostrarse, retorna null
  if (!showModal) return null;

  const { errorType, validationErrors = [] } = modalProps;
  console.log(validationErrors)
  const errorMessages = {
    500: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.',
    400: 'Algún campo ingresado está vacío o contiene carácteres prohibidos.',
    404: 'Error de registro no encontrado o URL no encontrada.',
  };

  const modalContent = (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white w-11/12 max-w-md p-6 rounded-lg shadow-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Error {errorType}: {errorMessages[errorType] || 'Error desconocido'}
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            &times;
          </button>
        </div>

        {validationErrors.length > 0 && (
          <ul className="list-disc list-inside text-red-500 text-sm mb-4">
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}

        <div className="text-right">
          <button
            onClick={closeModal}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'));
};

export default ErrorModal;
