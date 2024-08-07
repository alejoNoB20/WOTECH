import { Route, Routes } from 'react-router-dom';
import './App.css';
import ItemListContainer from './components/itemListContainer/ItemListContainer';
import Layout from './components/layout/layout';
import AddStock from './components/stock/AddStock'
import UpdateStock from './components/stock/UpdateStock';
function App() {
  const links = [
    { name: 'Inicio', path: '/' },
    { name: 'Agregar stock', path: '/addstock' },
    { name: 'Actualizar stock', path: '/updatestock' },
    // Añade más enlaces aquí
  ];


  return (
    <Layout links={links} logged={true}>
      <Routes>
        <Route path="/stock" element={<ItemListContainer />} />
        <Route path = "/addstock" element={<AddStock/>}/>
        <Route path = "/updatestock/:id" element={<UpdateStock/>}/>
      </Routes>
    </Layout>

  );
}

export default App;
