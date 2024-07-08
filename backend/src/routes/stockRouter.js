import { Router } from "express";
import {StockController} from "../controllers/stockController.js";
const stockController = new StockController();
let stockRouter = Router();

stockRouter.get('/', stockController.verTodos);
stockRouter.get('/create', (req, res) => {
    res.render('pushStock', {title: "Crear Nuevo Stock"})});
stockRouter.get('/search', stockController.buscarUno);
stockRouter.post('/create', stockController.crear);
stockRouter.get('/update/:id_material', stockController.irActualizarStock);
stockRouter.post('/update/:id_material', stockController.actualizar);
stockRouter.get('/delete/:id_material', stockController.borrar);

export default stockRouter;