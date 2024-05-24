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
// import indexRouter from './routes/index.js';
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


// app.use('/', indexRouter);
// app.use('/users', usersRouter);

async function main(){
  try {
    await sequelize.sync();
    app.listen(process.env.PORT, () => {
      console.log(`Server running at port ${process.env.PORT}`);
    });
  } catch(error){
    console.log(error);
  }
}
main();

export default app;