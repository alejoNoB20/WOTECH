import { Router } from "express";
import { StockController } from "./stockController.js";
import { stockValidations } from "./stockValidators.js";
const stockController = new StockController();
let stockRouter = Router();

stockRouter.get('/', stockController.verTodos);
stockRouter.get('/details/:id_material', stockController.detallesMaterial);
stockRouter.post('/create', stockValidations.createStock, stockController.crear);
stockRouter.patch('disabled/:id_material', stockController.deshabilitar);
stockRouter.delete('/delete/:id_material', stockController.borrar);
stockRouter.get('/update/:id_material', stockController.detallesMaterial);
stockRouter.patch('/update/:id_material', stockValidations.updateStock, stockController.actualizar);
stockRouter.get('/search', stockValidations.searchStock, stockController.filtrar);

export default stockRouter;

/**
 * @swagger
 * /stock:
 *   get:
 *     summary: "Obtener todos los materiales con la información más importante (solo se verán los materiales habilitados)"
 *     tags: 
 *       - Stock
 *     responses: 
 *       200: 
 *         description: "Lista de materiales"
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/stock'
 *       204:
 *         description: "No se encontró ningún stock en la base de datos"
 *       500:
 *         description: "Error en el servidor"
 * 
 * /stock/details/{id_material}: 
 *   get:
 *     summary: "Obtener todos los datos de un material en específico, esto incluye las asociaciones con Productos y Proveedores"
 *     tags: 
 *       - Stock
 *     responses: 
 *       200: 
 *         description: "Material detallado"
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/details'
 *       500:
 *         description: "Error en el servidor"
 * 
 * components:
 *   schemas:
 *     stock:
 *       type: object
 *       properties:
 *         id_material:
 *           type: integer
 *           example: 1
 *         name_material:
 *           type: string
 *           example: "Clavos 15mm"
 *         amount_material:
 *           type: integer
 *           example: 250
 *         measurement_material:
 *           type: string
 *           example: "Unidad" 

 *     details:
 *       type: object
 *       properties:
 *         id_material:
 *           type: integer
 *           example: 1
 *         name_material:
 *           type: string
 *           example: "Clavos 15mm"
 *         description_material:
 *           type: string
 *           example: "Vendidas por Pepito S.R.L"
 *         amount_material:
 *           type: integer
 *           example: 250
 *         measurement_material:
 *           type: string
 *           example: "Unidad"  
 *         disabled:
 *           type: boolean
 *           example: false     
 *         products:
 *           type: object
 *           properties:
 *             id_product: 
 *               type: integer
 *               example: 2
 *             name_product:
 *               type: string
 *               example: "Ropero Grande"
 *             product_Stocks_association: 
 *               type: object
 *               properties:
 *                 how_much_contains_use:
 *                   type: integer
 *                   example: 10
 *         suppliers:
 *           type: object
 *           properties:
 *             id_supplier: 
 *               type: integer
 *               example: 2
 *             name_company_supplier:
 *               type: string
 *               example: "Pedro SRL"
 *             tax_address_supplier:
 *               type: string
 *               example: "Calle 123"
 *             supplier_Materials_associations: 
 *               type: object
 *               properties:
 *                 amount_material:
 *                   type: integer
 *                   example: 500
 *                 price_material:
 *                   type: integer
 *                   example: 7000 
 */

