import { Router } from "express";
import { supplierValidator } from "./suppliersValidator.js";
import { supplierController } from "./suppliersController.js";
const Supplier = new supplierController();
let supplierRouter = Router();

supplierRouter.get('/', Supplier.verTodos);
supplierRouter.post('/create', supplierValidator.createSupplier, Supplier.crear);
supplierRouter.patch('/disabled/:id_supplier', Supplier.deshabilitar);
supplierRouter.delete('/delete/:id_supplier', Supplier.borrar);
supplierRouter.get('/details/:id_supplier', Supplier.detalles);
supplierRouter.get('/update/:id_supplier', Supplier.detalles);
supplierRouter.patch('/update/:id_supplier', supplierValidator.updateSupplier, Supplier.actualizar);
supplierRouter.get('/search', Supplier.filtrar);
supplierRouter.get('/supplierMaterials', Supplier.verTodos);
supplierRouter.get('/supplierMaterials/:id_supplier', Supplier.detalles);

export default supplierRouter;