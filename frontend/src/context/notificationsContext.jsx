import React, { createContext, useContext } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Crear el contexto
const NotificationsContext = createContext()

// Proveedor de contexto
export const NotificationsProvider = ({ children }) => {
  const notify = (type, message) => {
    switch (type) {
      case "success":
        toast.success(message)
        break
      case "fail":
        toast.error(message)
        break
      default:
        toast.info(message)
        break
    }
  }

  return (
    <NotificationsContext.Provider value={notify}>
      {children}
    </NotificationsContext.Provider>
  )
}

// Hook personalizado para usar el contexto
export const useNotifications = () => useContext(NotificationsContext)
