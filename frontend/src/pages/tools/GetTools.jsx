import React, { useEffect, useState } from "react"
import Loader from "components/loader/Loader"
import ItemToolList from "components/itemToolList/itemToolList"
import { useLocation } from "react-router-dom"
import { useModal } from "context/modalContext"

const GetTools = () => {
  const [tools, setTools] = useState([])
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const { openModal } = useModal()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      const queryParams = new URLSearchParams(location.search)
      const query = queryParams.get("search_type") || "" 
      const option = queryParams.get("search_value") || ""

      let url = `${process.env.REACT_APP_API_URL}/tools`
      
      if (query && option) {
        url += `/search?search_type=${encodeURIComponent(query)}&search_value=${encodeURIComponent(option)}`
      }

      const mostrarError = (httpErr, errors) => {
        openModal({
          errorType: httpErr,
          validationErrors: errors,
        })
      }

      try {
        const response = await fetch(url)
        const resp = await response.json()

        
        if (!response.ok) {
          if (response.status === 400) {
            const errors = resp.errors.map((error) => error.msg)
            mostrarError(response.status, errors)
            return
          }
          if (response.status === 404) {
            mostrarError(response.status, [resp])
            return
          }
        }

        setTools(resp)
      } catch (error) {
        console.error("Error en el fetch:", error)
      } finally {
        setLoading(false) 
      }
    }

    fetchData() 
  }, [location.search, openModal]) 

  return <>{loading ? <Loader /> : <ItemToolList tools={tools} />}</>
}

export default GetTools
