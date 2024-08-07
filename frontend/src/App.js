import { Route, Routes } from 'react-router-dom';
import './App.css';
import ItemListContainer from './components/itemListContainer/itemListContainer';
import Layout from './components/layout/layout';
import AddStock from './components/stock/addStock'
function App() {
  const links = [
    { name: 'Inicio', path: '/' },
    { name: 'Agregar stock', path: '/addstock' },
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
