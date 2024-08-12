import { Router } from "express";
import { StockController } from "./stockController.js";
import { stockValidations } from "./stockValidators.js";
const stockController = new StockController();
let stockRouter = Router();

stockRouter.get('/', stockController.verTodos);
stockRouter.get('/search', stockValidations.searchStock, stockController.buscarUno);
stockRouter.post('/create', stockValidations.createStock, stockController.crear);
stockRouter.post('/update/:id_material', stockValidations.updateStock, stockController.actualizar);
stockRouter.get('/delete/:id_material', stockController.borrar);

export default stockRouter;
