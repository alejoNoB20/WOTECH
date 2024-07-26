import { Router } from "express";
import {StockController} from "../controllers/stockController.js";
import { stockValidations } from "../validations/stockValidators.js";
const stockController = new StockController();
let stockRouter = Router();

stockRouter.get('/', stockController.verTodos);
stockRouter.get('/search', stockValidations.searchStock,stockController.buscarUno);
stockRouter.post('/create', stockValidations.createStock, stockController.crear);
stockRouter.get('/update/:id_material', stockController.irActualizarStock);
stockRouter.post('/update/:id_material', stockValidations.updateStock,stockController.actualizar);
stockRouter.get('/delete/:id_material', stockValidations.deleteStock,stockController.borrar);

export default stockRouter;