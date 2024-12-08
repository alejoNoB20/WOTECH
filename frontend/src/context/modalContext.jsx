// ModalContext.js
import React, { createContext, useCallback, useContext, useState } from "react"

// Crear el contexto
const ModalContext = createContext()

// Hook personalizado para usar el contexto del modal

// Proveedor del contexto que envuelve la aplicación
export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false)
  const [modalProps, setModalProps] = useState({}) // Para pasar los props al modal
  
  const openModal = useCallback((props) => {
    setModalProps(props)
    setShowModal(true)
  },[])
  
  const closeModal = useCallback(() => {
    setShowModal(false)
    setModalProps({})
  },[])
  
  return (
    <ModalContext.Provider
    value={{ showModal, modalProps, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)