import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/layout.jsx';
import ItemListContainer from './components/itemListContainer/ItemListContainer.jsx';

function App() {
  const links = [
    { name: 'faloparda', path: '/' },
    { name: 'Acerca de', path: '/about' },
    { name: 'Carrito', path: '/cart' },
    // Añade más enlaces aquí
  ];
  

  return (
    <Layout links={links} logged={true}>
      <Routes>
        <Route path="/stock" element={<ItemListContainer />} />
      </Routes>
    </Layout>

  );
}

export default App;
