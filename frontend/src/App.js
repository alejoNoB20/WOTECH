import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/layout.jsx';
import ItemList from './components/itemList/itemList.jsx';

function App() {
  const links = [
    { name: 'faloparda', path: '/' },
    { name: 'Acerca de', path: '/about' },
    { name: 'Carrito', path: '/cart' },
    // Añade más enlaces aquí
  ];
  const item = [{
    id: "123",
    name_material: "Madera",
    description_material: "Madera de pino",
    amount_material: "1",
    how_much_contains: "200",
    total_amount_material: "200",
    buy_price_material: "5000",
    value_stock: "5000"
  },
  {
    id: "456",
    name_material: "Clavos",
    description_material: "Clavos para madera de 10mm",
    amount_material: "1",
    how_much_contains: "200",
    total_amount_material: "200",
    buy_price_material: "2500",
    value_stock: "2500"
  },
  {
    id: "789",
    name_material: "Pegamento",
    description_material: "Pegamento para madera",
    amount_material: "1",
    how_much_contains: "200",
    total_amount_material: "200",
    buy_price_material: "2500",
    value_stock: "2500"
  },
  {
    id: "789",
    name_material: "Pegamento",
    description_material: "Pegamento para madera",
    amount_material: "1",
    how_much_contains: "200",
    total_amount_material: "200",
    buy_price_material: "2500",
    value_stock: "2500"
  },
  {
    id: "789",
    name_material: "Pegamento",
    description_material: "Pegamento para madera",
    amount_material: "1",
    how_much_contains: "200",
    total_amount_material: "200",
    buy_price_material: "2500",
    value_stock: "2500"
  },
  {
    id: "789",
    name_material: "Pegamento",
    description_material: "Pegamento para madera",
    amount_material: "1",
    how_much_contains: "200",
    total_amount_material: "200",
    buy_price_material: "2500",
    value_stock: "2500"
  },
  {
    id: "789",
    name_material: "Pegamento",
    description_material: "Pegamento para madera",
    amount_material: "1",
    how_much_contains: "200",
    total_amount_material: "200",
    buy_price_material: "2500",
    value_stock: "2500"
  },
  {
    id: "789",
    name_material: "Pegamento",
    description_material: "Pegamento para madera",
    amount_material: "1",
    how_much_contains: "200",
    total_amount_material: "200",
    buy_price_material: "2500",
    value_stock: "2500"
  },
  {
    id: "789",
    name_material: "Pegamento",
    description_material: "Pegamento para madera",
    amount_material: "1",
    how_much_contains: "200",
    total_amount_material: "200",
    buy_price_material: "2500",
    value_stock: "2500"
  },
  {
    id: "789",
    name_material: "Pegamento",
    description_material: "Pegamento para madera",
    amount_material: "1",
    how_much_contains: "200",
    total_amount_material: "200",
    buy_price_material: "2500",
    value_stock: "2500"
  },
  ]
  return (
    <Layout links={links} logged={true}>
      <Routes>
        <Route path="/stock" element={<ItemList items={item} />} />
      </Routes>
    </Layout>
  );
}

export default App;
