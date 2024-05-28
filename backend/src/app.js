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
import "./models/usersModels.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//Internal
import indexRouter from './routes/indexRouter.js';
import usersRouter from './routes/usersRouter.js';
import toolsControllerRouter from './routes/toolsControllerRouter.js';
import suppliersRouter from './routes/suppliersRouter.js';
import stockRouter from './routes/stockRouter.js';
import ordersRouter from './routes/ordersRouter.js';
import mapsRouter from './routes/mapsRouter.js';
import clientsRouter from './routes/clientsRouter.js';
// import usersRouter from './routes/users.js';

const app = express();
dotenv.config();

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')))


app.get('/', indexRouter);
app.use('/users', usersRouter);
app.get('/toolsController', toolsControllerRouter);
app.get('/suppliers', suppliersRouter);
app.get('/stock', stockRouter);
app.get('/orders', ordersRouter);
app.get('/maps', mapsRouter);
app.get('/clients', clientsRouter)

async function main(){
  try {
    await sequelize.sync();
    app.listen(process.env.PORT, () => {
      console.log(`Server running at port http://localhost:${process.env.PORT}`);
    });
  } catch(error){
    console.log(`Ha ocurrido el siguiente error: ${error}`);
  }
}
main();

export default app;