import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/layout';
import AddStock from './pages/stock/AddStock'
import UpdateStock from './pages/stock/UpdateStock'
import GetStock from './pages/stock/GetStock';
import GetTools from './pages/tools/GetTools';
import UpdateTool from './pages/tools/UpdateTool';
import AddTool from './pages/tools/AddTool';
function App() {

  return (
    <Layout logged={true}>
      <Routes>
        <Route path="/stock/getstock" element={<GetStock />} />
        <Route path="/stock/addstock" element={<AddStock />} />
        <Route path="/stock/updatestock/:id" element={<UpdateStock />} />
        <Route path="/tools/gettools" element={<GetTools />} />
        <Route path="/tools/updatetool/:id" element={<UpdateTool />} />
        <Route path="/tools/addtool" element={<AddTool/>}/>
      </Routes>
    </Layout>

  );
}

export default App;
