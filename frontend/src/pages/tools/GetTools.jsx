import React, { useEffect, useState } from "react";
import Loader from "@components/loader/Loader";
import ItemToolList from "@components/itemToolList/itemToolList";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useModal } from "@context/modalContext";
import Pagination from "@components/pagination/Pagination";

const GetTools = () => {
  const [tools, setTools] = useState([]);
  const [maxPage, setMaxPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { page } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const queryParams = new URLSearchParams(location.search);
      const query = queryParams.get("search_type") || "" ;
      const option = queryParams.get("search_value") || "";

      let url = `${process.env.REACT_APP_API_URL}/tools`;
      
      if (query && option) {
        url += `/search/1?search_type=${encodeURIComponent(query)}&search_value=${encodeURIComponent(option)}`;
      }else {
        url += `/pages/${page}`;
      };

      const mostrarError = (httpErr, errors) => {
        openModal({
          errorType: httpErr,
          validationErrors: errors,
        });
      };

      try {
        const response = await fetch(url);
        const responseJson = await response.json();

        console.log(responseJson)

        if (!response.ok) {
          if (response.status === 400) {
            const errors = responseJson.errors.map((error) => error.msg)
            mostrarError(response.status, errors)
            return
          };
        };

        setTools(responseJson.resultado);
        setMaxPage(responseJson.maxPage);

      } catch (error) {
        console.error("Error en el fetch:", error)
        navigate('/tools/gettools/1')
      } finally {
        setLoading(false) 
      };
    };

    fetchData() 
  }, [location.search, openModal, page, navigate]) 

  return (
    <>
      {loading && (
          <Loader/>
      )}
      <div className="flex flex-col h-full md:mt-4">
          <ItemToolList tools = {tools}/>
          <div className="flex justify-center items-center mb:mt-4 md:mt-3">
              <Pagination url="/tools/gettools/" page={Number(page)} maxPage={maxPage}/>
          </div>
      </div>
    </>
  )
};

export default GetTools
