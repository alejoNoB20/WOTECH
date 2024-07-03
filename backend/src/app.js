import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import path from 'path'
import dotenv from 'dotenv'
import { dirname } from "path";
import { fileURLToPath } from "url";
import Handlebars from 'handlebars';
import {engine} from 'express-handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import "./models/stocksModels.js"
import "./models/toolsControllerModels.js"
import "./models/productsModels.js"
import "./models/associations.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//Internal
import indexRouter from './routes/indexRouter.js';
import usersRouter from './routes/usersRouter.js';
import toolsControllerRouter from './routes/toolsControllerRouter.js';
import productsRouter from './routes/productsRouter.js';
import stockRouter from './routes/stockRouter.js';
import ordersRouter from './routes/ordersRouter.js';
import mapsRouter from './routes/mapsRouter.js';
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
}))


app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')))


app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/stock', stockRouter);
app.use('/toolsController', toolsControllerRouter);
app.use('/products', productsRouter);
// app.get('/orders', ordersRouter);
// app.get('/maps', mapsRouter);
// app.get('/clients', clientsRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server running at port http://localhost:${process.env.PORT}`);
  });


export default app;