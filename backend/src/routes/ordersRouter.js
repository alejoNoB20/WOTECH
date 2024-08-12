import { Router } from "express";
import { orderController } from "../controllers/ordersController.js";
import { ordersValidator } from "../validations/ordersValidators.js";
let ordersRouter = Router();
const OrderController = new orderController();

ordersRouter.get('/', OrderController.verPedidos);
ordersRouter.get('/create', OrderController.irPaginaCrear);
ordersRouter.post('/create', ordersValidator.createOrUpdateOrder,OrderController.crear);
ordersRouter.post('/disabled/:id_order', OrderController.deshabilitar);
ordersRouter.delete('/delete/:id_order', OrderController.borrar);
ordersRouter.get('/update/:id_order', OrderController.irPaginaActualizar);
ordersRouter.post('/update/:id_order', ordersValidator.createOrUpdateOrder,OrderController.actualizar);
ordersRouter.get('/search', ordersValidator.searchOrder,OrderController.filtrar);

export default ordersRouter;