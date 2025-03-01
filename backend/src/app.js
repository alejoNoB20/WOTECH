import express, { json, urlencoded } from 'express';
import logger from 'morgan';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { dirname } from "path";
import { fileURLToPath } from "url";
import { updateDB, clearDB, connectDB } from './database/connection.js';
import { createRegistersDB } from './utils/create_register_db.js';
import { swaggerDoc } from './libs/swagger.js';
import "./Components/Stock/stocksModels.js";
import "./Components/Tools/toolsModels.js";
import "./Components/Products/productsModels.js";
import './Components/Clients/clientsModels.js';
import './Components/Orders/ordersModels.js';
import './Components/Invoices/invoicesModels.js';
import './Components/Suppliers/suppliersModels.js';
import './Components/SupplierMaterials/suppliersMaterialsModels.js';
import './Components/SupplierMaterials/priceControlModels.js';
import "./Components/Associations/productStocksModels.js";
import "./Components/Associations/productToolsModels.js";
import './Components/Associations/orderProductsModels.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Internal
import toolsRouter from './Components/Tools/toolsRouter.js';
import stockRouter from './Components/Stock/stockRouter.js';
import productsRouter from './Components/Products/productsRouter.js';
import clientsRouter from './Components/Clients/clientsRouter.js';
import ordersRouter from './Components/Orders/ordersRouter.js';
import supplierRouter from './Components/Suppliers/suppliersRouter.js';
import supplierMaterialsRouter from './Components/SupplierMaterials/suppliersMaterialsRouter.js';
import purchasesRouter from './Components/Purchase/purchasesRouter.js';
import invoicesRouter from './Components/Invoices/invoicesRouter.js';
import userRouter from './Components/Users/usersRouter.js';
import { clear } from 'console';

const app = express();
dotenv.config();
app.use(cookieParser());
app.use(cors({ 
  origin: ['http://localhost:3000', 'http://192.168.100.27:3000', 'https://wotech-carpentry-manager.vercel.app', "https://wotech-free.vercel.app"] ,
  credentials: true
}));

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

app.use('/stock', stockRouter);
app.use('/tools', toolsRouter);
app.use('/products', productsRouter);
app.use('/clients', clientsRouter);
app.use('/orders', ordersRouter);
app.use('/suppliers', supplierRouter);
app.use('/suppliers/supplierMaterials', supplierMaterialsRouter);
app.use('/suppliers/invoices', invoicesRouter);
app.use('/purchase', purchasesRouter);
app.use('/users', userRouter);

const server = app.listen(process.env.PORT, async () => {
  console.log(`Server running at port ${process.env.DB_SERVER_URL}`);
  swaggerDoc(app, process.env.DB_SERVER_URL);
  connectDB();
});
  
export {app, server};