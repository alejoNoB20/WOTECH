import { Router } from "express";
import { purchaseController } from "./purchasesController.js";
const Purchase = new purchaseController();
let purchasesRouter = Router();

purchasesRouter.get('/', Purchase.verProveedores);
purchasesRouter.get('/:id_supplier', Purchase.detallesProveedores);
purchasesRouter.post('/', Purchase.crear);

export default purchasesRouter;