import { Router } from "express";
import { StockController } from "./stockController.js";
import { stockValidations } from "./stockValidators.js";
const stockController = new StockController();
let stockRouter = Router();

stockRouter.get('/', stockController.verTodos);
stockRouter.get('/details/:id_material', stockController.detallesMaterial);
stockRouter.post('/create', stockValidations.createStock, stockController.crear);
stockRouter.patch('disabled/:id_material', stockController.deshabilitar);
stockRouter.delete('/delete/:id_material', stockController.borrar);
stockRouter.get('/update/:id_material', stockController.detallesMaterial);
stockRouter.patch('/update/:id_material', stockValidations.updateStock, stockController.actualizar);
stockRouter.get('/search', stockValidations.searchStock, stockController.filtrar);

export default stockRouter;
