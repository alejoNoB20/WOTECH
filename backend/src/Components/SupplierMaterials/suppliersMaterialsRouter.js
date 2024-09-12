import { Router } from "express";
import { supplierMaterialsController } from "./suppliersMaterialsController.js";
import { supplierMaterialsValidator } from "./suppliersMaterialsValidator.js";
const supplierMaterials = new supplierMaterialsController();
let supplierMaterialsRouter = Router();

supplierMaterialsRouter.get('/:id_supplier', supplierMaterials.ver);
supplierMaterialsRouter.post('/create', supplierMaterialsValidator.createAndUpdateSupplierMaterial, supplierMaterials.crear);
supplierMaterialsRouter.patch('/update/:id_supplier_material', supplierMaterialsValidator.createAndUpdateSupplierMaterial, supplierMaterials.modificar);
supplierMaterialsRouter.patch('/disabled/:id_supplier_material', supplierMaterials.deshabilitar);
supplierMaterialsRouter.get('/priceControl/:id_supplier_material', supplierMaterials.controlPrecios);


export default supplierMaterialsRouter;

/**
 * @swagger
 * /suppliers/supplierMaterials/{id_supplier}:
 *   get:
 *     summary: "Obtener todos los materiales asociados a un proveedor (solo se verán los materiales habilitados)"
 *     tags: 
 *       - SupplierMaterials
 *     parameters:
 *       - in: path
 *         name: id_supplier 
 *         schema:
 *           type: string
 *         required: true
 *         description: "ID del proveedor"
 *     responses: 
 *       200: 
 *         description: "Lista de materiales asociados"
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties: 
 *                   id_supplier_material: 
 *                     type: integer
 *                     example: 2
 *                   id_material_fk: 
 *                     type: integer
 *                     example: 2
 *                   amount_material: 
 *                     type: integer
 *                     example: 200
 *                   price_material: 
 *                     type: integer
 *                     example: 3200
 *                   name_material:
 *                     type: string
 *                     example: "Bisagras de Latón"
 * 
 *       404:
 *         description: "Datos no encontrados"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Este proveedor aún no tiene materiales asociados"
 *       500:
 *         description: "Error en el servidor"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "No se pueden ver los materiales asociados debido a una falla en el sistema"
 * 
 * /suppliers/supplierMaterials/create:
 *   post:
 *    summary: "Crear un nuevo material de proveedor"
 *    tags: 
 *      - SupplierMaterials
 *    responses:
 *       201: 
 *         description: "Creación Exitosa (El JSON contiene a modo de ejemplo los elementos mínimos y más importantes que debe contener el body que recibe el back para la creación de un nuevo material de proveedor)"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La creación del material de proveedor finalizó exitosamente"
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_material_fk: 
 *                   type: integer
 *                   example: 1
 *                 id_supplier_fk: 
 *                   type: integer
 *                   example: 2
 *                 amount_material: 
 *                   type: integer
 *                   example: 500
 *                 price_material: 
 *                   type: integer
 *                   example: 7000
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
 *               example: "La creación del material de proveedor falló"
 * 
 * /suppliers/supplierMaterials/update/{id_supplier_material}:
 *   patch:
 *     summary: "Actualizar un material de proveedor"
 *     tags: 
 *       - SupplierMaterials
 *     responses: 
 *       200: 
 *         description: "Actualización Exitosa"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La actualización del material de proveedor finalizó exitosamente"
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
 *               example: "La actualización del material de proveedor falló"
 * 
 * /suppliers/supplierMaterials/disabled/{id_supplier_material}:
 *   patch:
 *     summary: "Eliminado lógico de un material de proveedor"
 *     tags:
 *       - SupplierMaterials
 *     responses:
 *       200:
 *         description: "Deshabilitación Exitosa"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La deshabilitación del material de proveedor finalizó exitosamente"
 *       500:
 *         description: "Error en el servidor"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La deshabilitación del material de proveedor falló"
 * 
 * /suppliers/supplierMaterials/priceControl/{id_supplier_material}:
 *   get:
 *     summary: "Obtener la lista de todos los precios que tuvo en algún momento el material de proveedor indicado"
 *     tags: 
 *       - SupplierMaterials
 *     parameters:
 *       - in: path
 *         name: id_supplier_material
 *         schema:
 *           type: string
 *         required: true
 *         description: "ID del material de proveedor"
 *     responses: 
 *       200: 
 *         description: "Lista de control de precios"
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties: 
 *                   id_price_control:
 *                     type: integer
 *                     example: 1
 *                   register_price_control:
 *                     type: integer
 *                     example: 6000
 *                   createdAt:
 *                     type: string
 *                     example: "2024-08-23T15:48:19.000Z"
 *       404:
 *         description: "Datos no encontrados"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "No se encontraron herramientas registradas en la base de datos"
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
 *     supplierMaterials:
 *       type: object
 *       required:
 *         - id_material_fk
 *         - id_supplier_fk
 *         - amount_material
 *         - price_material
 *       properties:
 *         id_material_fk: 
 *           type: integer
 *           example: 1
 *         id_supplier_fk: 
 *           type: integer
 *           example: 2
 *         amount_material: 
 *           type: integer
 *           example: 500
 *         price_material: 
 *           type: integer
 *           example: 7000
 *         disabled: 
 *           type: boolean
 *           example: false
 * 
 *     priceControl:
 *       type: object
 *       required:
 *         - register_price_control
 *         - id_material_supplier_fk
 *       properties:
 *         id_price_control:
 *           type: integer
 *           example: 1
 *         id_material_supplier_fk:
 *           type: integer
 *           example: 1
 *         register_price_control:
 *           type: integer
 *           example: 6000
 *         createdAt:
 *           type: string
 *           example: "2024-08-23T15:48:19.000Z"
 */

