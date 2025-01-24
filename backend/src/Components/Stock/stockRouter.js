import { Router } from "express";
import { StockController } from "./stockController.js";
import { stockValidations } from "./stockValidators.js";
const stockController = new StockController();
let stockRouter = Router();

stockRouter.get('/', stockController.verTodos);
stockRouter.get('/details/:id_material', stockController.detallesMaterial);
stockRouter.post('/create', stockValidations.createStock, stockController.crear);
stockRouter.patch('/disabled/:id_material', stockController.deshabilitar);
stockRouter.delete('/delete/:id_material', stockController.borrar);
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
 *                 type: object
 *                 properties: 
 *                   id_material:
 *                     type: integer
 *                     example: 1
 *                   name_material:
 *                     type: string
 *                     example: "Clavos 15mm"
 *                   amount_material:
 *                     type: integer
 *                     example: 250
 *                   measurement_material:
 *                     type: string
 *                     example: "Unidad" 
 *       404:
 *         description: "Datos no encontrados"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "No se encontró ningún stock en la base de datos"
 *       500:
 *         description: "Error en el servidor"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Hubo un error interno en el servidor"
 * 
 * /stock/details/{id_material}: 
 *   get:
 *     summary: "Obtener todos los datos de un material en específico, esto incluye las asociaciones con Productos y Proveedores"
 *     tags: 
 *       - Stock
 *     parameters:
 *       - in: path
 *         name: id_material
 *         schema:
 *           type: string
 *         required: true
 *         description: "ID del material"
 *     responses: 
 *       200: 
 *         description: "Material detallado"
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/stock'
 *       500:
 *         description: "Error en el servidor"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Hubo un error interno en el servidor"
 * 
 * /stock/create:
 *   post:
 *     summary: "Crear un nuevo stock"
 *     tags: 
 *       - Stock
 *     responses: 
 *       201: 
 *         description: "Creación Exitosa (El JSON contiene a modo de ejemplo los elementos mínimos y más importantes que debe contener el body que recibe el back para la creación de un nuevo stock)"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La creación del stock finalizó exitosamente"
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name_material: 
 *                   type: string
 *                   example: "Madera de pino"
 *                 measurement_material: 
 *                   type: string
 *                   example: "cm"
 *                 description: 
 *                   type: string
 *                   example: "El valor de 'measurement_material' solo puede ser 'cm' o 'unidad'"
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
 *               example: "La creación del stock falló"
 * 
 * /stock/disabled/{id_material}:
 *   patch:
 *     summary: "Eliminado lógico de un stock"
 *     tags:
 *       - Stock
 *     responses:
 *       200:
 *         description: "Deshabilitación Exitosa"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La deshabilitación del stock finalizó exitosamente"
 *       500:
 *         description: "Error en el servidor"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La deshabilitación del stock falló"
 * 
 * /stock/delete/{id_material}:
 *   delete:
 *     summary: "Eliminado total de un stock"
 *     tags:
 *       - Stock
 *     responses:
 *       200:
 *         description: "Eliminación Exitosa"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La eliminación del stock finalizó exitosamente"
 *       500:
 *         description: "Error en el servidor"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La elimación del stock falló" 
 * 
 * /stock/update/{id_material}:
 *   patch:
 *     summary: "Actualizar un stock"
 *     tags: 
 *       - Stock
 *     responses: 
 *       200: 
 *         description: "Actualización Exitosa"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La actualización del stock finalizó exitosamente"
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
 *               example: "La actualización del stock falló"
 * 
 * /stock/search: 
 *   get:
 *     summary: "Filtro de busqueda, donde ingresando ciertos parámetros te va a devolver 1 o más materiales (el body de la response va a ser igual de completo que el /stock/details/{id_material})"
 *     tags: 
 *       - Stock
 *     parameters:
 *       - in: query
 *         name: search_type
 *         schema:
 *           type: string
 *         required: true
 *         description: "search_type indiqua el tipo de filtro, pueden ser: 'id_material', 'name_material, 'amount_material'"
 *       - in: query
 *         name: search_value 
 *         schema:
 *           type: string
 *         required: true
 *         description: "search_value indiqua el valor que deseamos buscar"
 *     responses: 
 *       200: 
 *         description: "Se mostrarán los materiales encontrados con los parámetros establecidos"
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/stock'
 *       404:
 *         description: "Datos no encontrados"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "No se encontró nada en la base de datos con {search_type}: {search_value}"
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
 *               example: "Hubo un error interno en el servidor"
 * 
 * components:
 *   schemas:
 *     stock:
 *       type: object
 *       required:
 *         - id_material
 *         - name_material
 *         - measurement_material
 *       properties:
 *         id_material:
 *           type: integer
 *           example: 1
 *         name_material:
 *           type: string
 *           example: "Clavos 15mm"
 *         description_material:
 *           type: string
 *           example: "Comprado en Pedro SRL" 
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
 *             productStocksAssociation: 
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