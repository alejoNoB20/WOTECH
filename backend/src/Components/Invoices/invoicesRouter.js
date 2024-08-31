import { Router } from "express";
import { invoiceController } from "./invoicesController.js";
import { invoiceValidator } from "./invoicesValidator.js";
let invoicesRouter = Router();
const Invoice = new invoiceController();

invoicesRouter.get('/:id_supplier', Invoice.ver);
invoicesRouter.post('/push', invoiceValidator.createInvoice, Invoice.agregar);
invoicesRouter.patch('/disabled/:id_invoice', Invoice.deshabilitar);

export default invoicesRouter;

/**
 * @swagger
 * /suppliers/invoices/push:
 *   post:
 *    summary: "Crear una nueva factura"
 *    tags: 
 *      - Invoices
 *    responses:
 *       201: 
 *         description: "Creación Exitosa (El JSON contiene a modo de ejemplo los elementos mínimos y más importantes que debe contener el body que recibe el back para la creación de una nueva factura)"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La factura se guardo con éxito"
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_supplier: 
 *                   type: integer
 *                   example: 1
 *                 invoice: 
 *                   type: string
 *                   example: "url de la factura del proveedor..."
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
 *               example: "La factura se intentó guardar pero falló"
 * 
 * /suppliers/invoices/disabled/{id_invoice}:
 *   patch:
 *     summary: "Eliminado lógico de una factura de proveedor"
 *     tags:
 *       - Invoices
 *     responses:
 *       200:
 *         description: "Deshabilitación Exitosa"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La deshabilitación de la factura terminó exitosamente"
 *       500:
 *         description: "Error en el servidor"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La deshabilitación de la factura falló"
 * 
 * /suppliers/invoices/{id_supplier}:
 *   get:
 *     summary: "Obtener la lista de facturas del proveedor indicado"
 *     tags: 
 *       - Invoices
 *     parameters:
 *       - in: path
 *         name: "Example: /suppliers/invoices/1" 
 *         schema:
 *           type: string
 *         required: true
 *         description: "ID del proveedor"
 *     responses: 
 *       200: 
 *         description: "Lista de facturas"
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/invoices'
 *       204:
 *         description: "Datos no encontrados"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "No se registran facturas de este proveedor"
 *       500:
 *         description: "Error en el servidor"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Hubo un error interno en el servidor"
 * 
 * components:
 *   schemas:
 *     invoices:
 *       type: object
 *       required:
 *         - id_supplier
 *         - invoice
 *       properties:
 *         id_invoice: 
 *           type: integer
 *           example: 1
 *         id_supplier: 
 *           type: integer
 *           example: 2
 *         invoice: 
 *           type: string
 *           example: "url de la factura del proveedor..."
 *         disabled: 
 *           type: boolean
 *           example: false
 */