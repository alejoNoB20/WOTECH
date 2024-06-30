import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import path from 'path'
import dotenv from 'dotenv'
import { dirname } from "path";
import { fileURLToPath } from "url";
import { sequelize } from './database/connection.js';
import Handlebars from 'handlebars';
import {engine} from 'express-handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import "./models/usersModels.js"
import "./models/stocksModels.js"
import "./models/productsModels.js"

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
//   helpers: {
//     checkResult: (resultado, title, options) => {
//         if (!resultado || resultado.length === 0) {
//             return options.fn({ message: `No se encontró "${title}" en la lista de stock` });
//         } else {
//             return options.fn({resultado});
//         }
//     }
// }
}))


app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')))


app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/stock', stockRouter);
// app.get('/toolsController', toolsControllerRouter);
app.use('/products', productsRouter);
// app.get('/orders', ordersRouter);
// app.get('/maps', mapsRouter);
// app.get('/clients', clientsRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server running at port http://localhost:${process.env.PORT}`);
  });


export default app;