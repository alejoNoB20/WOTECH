import { Route, Routes } from "react-router-dom"
import "./App.css"
import Layout from "./components/layout/layout"
import AddStock from "./pages/stock/AddStock"
import UpdateStock from "./pages/stock/DetailsStock"
import GetStock from "./pages/stock/GetStock"
import GetTools from "./pages/tools/GetTools"
import UpdateTool from "./pages/tools/UpdateTool"
import AddTool from "./pages/tools/AddTool"
import GetProducts from "./pages/products/GetProducts"
import AddProducts from "./pages/products/AddProduct"
import DetailsProduct from "./pages/products/DetailsProduct"
import MapProduct from "./pages/products/MapProduct"
import ErrorModal from "components/modalError/modalError"
import Home from "./pages/home/Home"
import GetClients from "./pages/clients/GetClients"
import AddClient from "./pages/clients/AddClient"
import DetailClient from "./pages/clients/DetailClient"
import TestComponent from "components/componentTest/test"
import { NotificationsProvider } from "./context/notificationsContext"
import { ToastContainer } from "react-toastify"

function App() {
  return (
    <Layout logged={true}>
      <ErrorModal/>
      <NotificationsProvider>
      <Routes>
        <Route path="/stock/getstock" element={<GetStock />} />
        <Route path="/stock/addstock" element={<AddStock />} />
        <Route path="/stock/detailstock/:id" element={<UpdateStock />} />
        <Route path="/stock/search" element={<GetStock />}/>
        <Route path="/tools/gettools" element={<GetTools />} />
        <Route path="/tools/search" element={<GetTools />} />
        <Route path="/tools/updatetool/:id" element={<UpdateTool />} />
        <Route path="/tools/addtool" element={<AddTool />} />
        <Route path="/products/getproducts" element={<GetProducts />}/>
        <Route path="/products/addproduct" element={<AddProducts />}/>
        <Route path="/products/detailproduct/:id" element={<DetailsProduct />}/>
        <Route path="/products/map/:id" element={<MapProduct/>}/>
        <Route path="/products/search" element={<GetProducts />} />
        <Route path="/clients/getclients" element={<GetClients />} />
        <Route path="/clients/addclient" element={<AddClient />} />
        <Route path="/clients/detailclient/:id" element={<DetailClient />}/>
        <Route path="/clients/search" element={<GetClients />} />
        <Route path="/" element={<Home/>}/>
        <Route path="/test" element={<TestComponent/>}/>
      </Routes>
        <ToastContainer 
          position="bottom-right" 
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
        />
      </NotificationsProvider>
    </Layout>
  )
}

export default App
