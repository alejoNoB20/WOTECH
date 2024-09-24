// App.js
import { useNotifications } from 'context/notificationsContext';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

function TestComponent() {
  const notify = useNotifications();

  const handleSuccess = () => {
    notify('success', '¡Operación exitosa!');
  };

  const handleFail = () => {
    notify('fail', '¡Algo salió mal!');
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleSuccess}>Mostrar Éxito</button>
      <button onClick={handleFail}>Mostrar Error</button>
    </div>
  );
}

export default TestComponent;
