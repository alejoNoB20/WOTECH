import { Router } from "express";
import { purchaseController } from "./purchasesController.js";
const Purchase = new purchaseController();
let purchasesRouter = Router();

purchasesRouter.post('/', Purchase.venta);

export default purchasesRouter;

/**
 * @swagger
 * /purchase:
 *   post:
 *     summary: "Generar una compra de materiales"
 *     tags: 
 *       - Purchases
 *     responses: 
 *       201: 
 *         description: "Compra Exitosa (El JSON contiene a modo de ejemplo los elementos mínimos y más importantes que debe contener el body que recibe el back para la creación de una nueva compra de materiales)"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Compra realiza con éxito"
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 purchase: 
 *                   type: array
 *                   items:
 *                     type: object 
 *                     properties:
 *                       id_supplier_material:
 *                         type: integer
 *                         example: 1
 *                       unit_material:
 *                         type: integer
 *                         example: 3
 *                 description: 
 *                   type: string
 *                   example: "'purchase' es un array donde sus items son objetos, cada objeto contiene 'id_supplier_material': es el material de proveedor que se va a comprar y 'unit_material': es la cantidad de ese material que se va a comprar"
 *                 
 *       400:
 *         description: "Error datos mal ingresados por el usuario, el mensaje de error dependerá del dato erróneo"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: "field"
 *                       value:
 *                         type: string
 *                         example: ""
 *                       msg:
 *                         type: string
 *                         example: "El valor del filtro es obligatorio para buscar en una lista"
 *                       path:
 *                         type: string
 *                         example: "search_value"
 *                       location:
 *                         type: string
 *                         example: "query"                
 *       500:
 *         description: "Error en el servidor"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La compra falló"
 */