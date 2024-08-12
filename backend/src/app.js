import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import { dirname } from "path";
import { fileURLToPath } from "url";
import "./Components/Stock/stocksModels.js";
import "./Components/Tools/toolsModels.js";
import "./Components/Products/productsModels.js";
import "./Components/Associations/productStocksModels.js";
import "./Components/Associations/productToolsModels.js";
import './Components/Clients/clientsModels.js';
import './Components/Orders/ordersModels.js';
import './Components/Associations/orderProductsModels.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Internal
import toolsRouter from './Components/Tools/toolsRouter.js';
import stockRouter from './Components/Stock/stockRouter.js';
import productsRouter from './Components/Products/productsRouter.js';
import clientsRouter from './Components/Clients/clientsRouter.js';
import ordersRouter from './Components/Orders/ordersRouter.js';



const app = express();
dotenv.config();

app.use(cors())
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.use('/stock', stockRouter);
app.use('/tools', toolsRouter);
app.use('/products', productsRouter);
app.use('/clients', clientsRouter);
app.use('/orders', ordersRouter);


app.listen(process.env.PORT, () => {
  console.log(`Server running at port http://localhost:${process.env.PORT}`);
  });


export default app;