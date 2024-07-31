import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/layout.jsx';
import ItemListContainer from './components/itemListContainer/ItemListContainer.jsx';
import AddStock from './components/stock/AddStock.jsx';
function App() {
  const links = [
    { name: 'Inicio', path: '/' },
    { name: 'Acerca de', path: '/about' },
    { name: 'Carrito', path: '/cart' },
    // Añade más enlaces aquí
  ];


  return (
    <Layout links={links} logged={true}>
      <Routes>
        <Route path="/stock" element={<ItemListContainer />} />
        <Route path = "/addstock" element={<AddStock/>}/>
      </Routes>
    </Layout>

  );
}

export default App;
