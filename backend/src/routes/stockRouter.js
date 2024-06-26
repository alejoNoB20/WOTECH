import { Router } from "express";
import {StockController} from "../controllers/stockController.js";
const stockController = new StockController();
let stockRouter = Router();

stockRouter.get('/', stockController.verTodos);
stockRouter.get('/create', stockController.agregarStock);
stockRouter.post('/create', stockController.crear);
stockRouter.get('/update/:id_product', stockController.irActualizarStock);
stockRouter.post('/update/:id_product', stockController.actualizar);
stockRouter.get('/delete/:id_product', stockController.borrar);

export default stockRouter;