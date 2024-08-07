import { Router } from "express";
import { orderController } from "../controllers/ordersController.js";
import { ordersValidator } from "../validations/ordersValidators.js";
let ordersRouter = Router();
const OrderController = new orderController();

ordersRouter.get('/', OrderController.verPedidos);
ordersRouter.get('/create', OrderController.irPaginaCrear);
ordersRouter.post('/create', OrderController.crear);
ordersRouter.get('/delete/:id_order', OrderController.borrar);

export default ordersRouter;