import { Router } from "express";
import { supplierValidator } from "./suppliersValidator.js";
import { supplierController } from "./suppliersController.js";
const Supplier = new supplierController();
let supplierRouter = Router();

supplierRouter.get('/', Supplier.verTodos);
supplierRouter.get('/details/:id_supplier', Supplier.detalles);
supplierRouter.post('/create', supplierValidator.createSupplier, Supplier.crear);
supplierRouter.patch('/disabled/:id_supplier', Supplier.deshabilitar);
supplierRouter.delete('/delete/:id_supplier', Supplier.borrar);
supplierRouter.patch('/update/:id_supplier', supplierValidator.updateSupplier, Supplier.actualizar);
supplierRouter.get('/search', Supplier.filtrar);

export default supplierRouter;

/**
 * @swagger
 * /suppliers:
 *   get:
 *     summary: "Obtener todos los proveedores con la información más importante (solo se verán los proveedores habilitados)"
 *     tags: 
 *       - Suppliers
 *     responses: 
 *       200: 
 *         description: "Lista de proveedores"
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties: 
 *                   id_supplier:
 *                     type: integer
 *                     example: 2
 *                   name_company_supplier: 
 *                     type: string
 *                     example: "Pedro SRL"
 *                   number_phone_company_supplier:
 *                     type: string
 *                     example: "341 512-3124" 
 *                   tax_address_supplier:
 *                     type: string
 *                     example: "Calle 123" 
 *                   distributor_name_supplier:
 *                     type: string
 *                     example: "Juan"
 *                   number_phone_distributor_supplier:
 *                     type: string
 *                     example: "341 512-3456" 
 *       404:
 *         description: "Datos no encontrados"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "No se encontró ningún proveedor en la base de datos"
 *       500:
 *         description: "Error en el servidor"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "No se pueden ver los proveedores debido a una falla en el sistema"
 * 
 * /suppliers/details/{id_supplier}: 
 *   get:
 *     summary: "Obtener todos los datos de un proveedor en específico, esto incluye las asociaciones con Stock"
 *     tags: 
 *       - Suppliers
 *     parameters:
 *       - in: path
 *         name: id_supplier 
 *         schema:
 *           type: string
 *         required: true
 *         description: "ID del proveedor"
 *     responses: 
 *       200: 
 *         description: "Datos del proveedor detallados"
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/supplier'
 *       500:
 *         description: "Error en el servidor"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Hubo un error interno en el servidor"
 * 
 * /suppliers/create:
 *   post:
 *     summary: "Crear un nuevo proveedor"
 *     tags: 
 *       - Suppliers
 *     responses: 
 *       201: 
 *         description: "Creación Exitosa (El JSON contiene a modo de ejemplo los elementos mínimos y más importantes que debe contener el body que recibe el back para la creación de unnuevo proveedor)"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La creación del proveedor finalizó exitosamente"
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                name_company_supplier:
 *                  type: string
 *                  example: "The Coca-Cola Company"
 *                tax_address_supplier:
 *                   type: string
 *                   example: "Amancio Avenida 3570"
 *                number_phone_company_supplier:
 *                   type: string
 *                   example: 341 814-8453
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
 *               example: "La creación del proveedor falló"
 * 
 * /suppliers/disabled/{id_supplier}:
 *   patch:
 *     summary: "Eliminado lógico de un proveedor"
 *     tags:
 *       - Suppliers
 *     responses:
 *       200:
 *         description: "Deshabilitación Exitosa"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La deshabilitación del proveedor finalizó exitosamente"
 *       500:
 *         description: "Error en el servidor"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La deshabilitación del proveedor falló"
 * 
 * /suppliers/delete/{id_material}:
 *   delete:
 *     summary: "Eliminado total de un proveedor"
 *     tags:
 *       - Suppliers
 *     responses:
 *       200:
 *         description: "Eliminación Exitosa"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La eliminación del proveedor finalizó exitosamente"
 *       500:
 *         description: "Error en el servidor"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La elimación del proveedor falló" 
 * 
 * /suppliers/update/{id_supplier}:
 *   patch:
 *     summary: "Actualizar un proveedor"
 *     tags: 
 *       - Suppliers
 *     responses: 
 *       200: 
 *         description: "Actualización Exitosa"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La actualización del proveedor finalizó exitosamente"
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
 *               example: "La actualización del proveedor falló"
 * 
 * components:
 *   schemas:
 *     supplier:
 *       type: object
 *       required:
 *         - name_company_supplier
 *         - tax_address_supplier
 *         - number_phone_company_supplier
 *       properties:
 *         id_supplier:
 *           type: integer
 *           example: 1
 *         name_company_supplier:
 *           type: string
 *           example: "The Coca-Cola Company"
 *         reason_social_supplier:
 *           type: string
 *           example: "Companía Servicios de Bebidas Refrescantes, S.L" 
 *         cuit_company_supplier:
 *           type: string
 *           example: "30-52539008-6"
 *         description_supplier:
 *           type: string
 *           example: "corporación multinacional estadounidense de bebidas con sede en Atlanta, Georgia...." 
 *         tax_address_supplier:
 *           type: string
 *           example: "Amancio Avenida 3570"
 *         number_phone_company_supplier:
 *           type: string
 *           example: "341 814-8453"
 *         mail_company_supplier:
 *           type: string
 *           example: "cocacolasl@gmail.com"
 *         website_company_supplier:
 *           type: string
 *           example: "CocaCola.com.ar"
 *         distributor_name_supplier:
 *           type: string
 *           example: "Juan"
 *         number_phone_distributor_supplier:
 *           type: string
 *           example: "341 512-3456"
 *         mail_distributor_supplier:
 *           type: string
 *           example: "JuanCocaCola@gmail.com" 
 *         delivery_days_suppier:
 *           type: string
 *           example: "Martes" 
 *         payment_method_supplier:
 *           type: string
 *           example: "Efectivo" 
 *         disabled:
 *           type: boolean
 *           example: false
 *         stocks:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id_material: 
 *                 type: integer
 *                 example: 7
 *               name_material:
 *                 type: string
 *                 example: "Madera de pino"
 *               supplier_Materials_associations: 
 *                 type: object
 *                 properties:
 *                   amount_material:
 *                     type: integer
 *                     example: 300 
 *                   price_material:
 *                     type: integer
 *                     example: 8000 
 *                   id_supplier:
 *                     type: integer
 *                     example: 2 
 */