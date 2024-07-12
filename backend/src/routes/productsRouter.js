import { Router } from "express";
import { productsController } from "../controllers/productsController.js";
const ProductsController = new productsController();
let productsRouter = Router();

productsRouter.get('/', ProductsController.verTodos);
productsRouter.get('/asociaciones', ProductsController.verAsociaciones);
productsRouter.get('/create', ProductsController.irAPaginaCrear);
productsRouter.post('/create', ProductsController.crear);
productsRouter.get('/delete/:id_product', ProductsController.eliminar);
productsRouter.get('/update/:id_product', ProductsController.irPaginaActualizar);
productsRouter.post('/update/:id_product', ProductsController.actualizar);

export default productsRouter;