// OtraPagina.js
import React from "react"
import { useModal } from "context/modalContext"

const Test = () => {
  const { openModal } = useModal()

  const mostrarError = () => {
    openModal({
      errorType: 400,
      validationErrors: ["Nombre es requerido", "El email no es válido"],
    })
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Otra Página</h1>
      <button
        onClick={mostrarError}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Mostrar Error de Validación
      </button>
    </div>
  )
}

export default Test
