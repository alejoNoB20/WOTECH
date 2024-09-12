import React, { useEffect, useState } from "react"
import Loader from "components/loader/Loader"
import ItemToolList from "components/itemToolList/itemToolList"

const GetTools = () => {
  const [tools, setTools] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    const fetchData = () => {
      fetch("http://192.168.0.40:8083/tools")
        .then((response) => response.json())
        .then((response) => setTools(response))
        .finally(() => setLoading(false))
    }
    fetchData()
  }, [])
  return <>{loading ? <Loader /> : <ItemToolList tools={tools} />}</>
}

export default GetTools
