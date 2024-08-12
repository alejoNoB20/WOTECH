import { Route, Routes } from 'react-router-dom';
import './App.css';
import ItemListContainer from './components/itemListContainer/ItemListContainer';
import Layout from './components/layout/layout';
import AddStock from './components/stock/AddStock'
import UpdateStock from './components/stock/UpdateStock';
function App() {

  return (
    <Layout logged={true}>
      <Routes>
        <Route path="/stock/getstock" element={<ItemListContainer />} />
        <Route path = "/stock/addstock" element={<AddStock/>}/>
        <Route path = "/stock/updatestock/:id" element={<UpdateStock/>}/>
      </Routes>
    </Layout>

  );
}

export default App;
