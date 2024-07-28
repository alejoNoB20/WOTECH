import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import path from 'path';
import dotenv from 'dotenv';
import { dirname } from "path";
import { fileURLToPath } from "url";
import Handlebars from 'handlebars';
import {engine} from 'express-handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import "./models/stocksModels.js";
import "./models/toolsModels.js";
import "./models/productsModels.js";
import "./models/productStocksModels.js";
import "./models/productToolsModels.js";
import './models/clientsModels.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Internal
import indexRouter from './routes/indexRouter.js';
import toolsRouter from './routes/toolsRouter.js';
import stockRouter from './routes/stockRouter.js';
import productsRouter from './routes/productsRouter.js';
import clientsRouter from './routes/clientsRouter.js';



const app = express();
dotenv.config();

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'layout.hbs',
  layoutsDir: __dirname + '/views',
  handlebars: allowInsecurePrototypeAccess(Handlebars),
}));

app.use(cors())
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));


app.use('/', indexRouter);
app.use('/stock', stockRouter);
app.use('/tools', toolsRouter);
app.use('/products', productsRouter);
app.use('/clients', clientsRouter)


app.listen(process.env.PORT, () => {
  console.log(`Server running at port http://localhost:${process.env.PORT}`);
  });


export default app;