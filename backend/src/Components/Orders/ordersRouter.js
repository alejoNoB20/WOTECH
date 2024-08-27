import { Router } from "express";
import { orderController } from "./ordersController.js";
import { ordersValidator } from "./ordersValidators.js";
let ordersRouter = Router();
const OrderController = new orderController();

ordersRouter.get('/', OrderController.verPedidos);
ordersRouter.get('/create', OrderController.detallesProductos);
ordersRouter.post('/create', ordersValidator.createOrUpdateOrder, OrderController.crear);
ordersRouter.get('/details/:id_order', OrderController.detalles);
ordersRouter.patch('/disabled/:id_order', OrderController.deshabilitar);
ordersRouter.delete('/delete/:id_order', OrderController.borrar);
ordersRouter.get('/update/:id_order', OrderController.detalles);
ordersRouter.patch('/update/:id_order', ordersValidator.createOrUpdateOrder, OrderController.actualizar);
ordersRouter.get('/search', ordersValidator.searchOrder,OrderController.filtrar);

export default ordersRouter;