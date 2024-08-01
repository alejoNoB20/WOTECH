import { Router } from "express";
import { productsController } from "../controllers/productsController.js";
import { productValidator } from "../validations/productsValidators.js";
const ProductsController = new productsController();
let productsRouter = Router();

productsRouter.get('/', ProductsController.verTodos);
productsRouter.get('/create', ProductsController.irAPaginaCrear);
productsRouter.post('/create', productValidator.createTool, ProductsController.crear);
productsRouter.get('/delete/:id_product', ProductsController.eliminar);
productsRouter.get('/update/:id_product', ProductsController.irPaginaActualizar);
productsRouter.post('/update/:id_product', productValidator.updateTool, ProductsController.actualizar);
productsRouter.get('/search/', ProductsController.filtrarBusqueda);

export default productsRouter;