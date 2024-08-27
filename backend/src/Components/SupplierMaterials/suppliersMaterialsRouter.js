import { Router } from "express";
import { supplierMaterialsController } from "./suppliersMaterialsController.js";
const supplierMaterials = new supplierMaterialsController();
let supplierMaterialsRouter = Router();

supplierMaterialsRouter.post('/create', supplierMaterials.crear);
supplierMaterialsRouter.patch('/update/:id_supplier_material', supplierMaterials.modificar);
supplierMaterialsRouter.delete('/delete/:id_supplier_material', supplierMaterials.borrar);
supplierMaterialsRouter.get('/priceControl/:id_supplier_material', supplierMaterials.controlPrecios);

export default supplierMaterialsRouter;