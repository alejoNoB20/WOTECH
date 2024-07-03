import { Router } from 'express';
import { IndexController } from '../controllers/indexController.js';
const indexController = new IndexController();
let indexRouter = Router();

indexRouter.get('/', indexController.verStockIndex);

export default indexRouter;
