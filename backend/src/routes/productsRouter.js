import { Router } from "express";
import { productsController } from "../controllers/productsController.js";
const ProductsController = new productsController();
let productsRouter = Router();

productsRouter.get('/', ProductsController.verTodos);
productsRouter.get('/asociaciones', ProductsController.verAsociaciones);
productsRouter.get('/create', ProductsController.irAPaginaCrear);
productsRouter.post('/create', ProductsController.crear);

export default productsRouter;