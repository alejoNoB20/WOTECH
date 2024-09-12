import { Router } from "express";
import { clientsController } from "./clientsController.js";
import { clientsValidator } from "./clientsValidators.js";
const Clients = new clientsController();
let clientsRouter = Router();

clientsRouter.get('/', Clients.verTodos);
clientsRouter.get('/details/:id_client', Clients.detalles);
clientsRouter.post('/create', clientsValidator.createClient, Clients.crear);
clientsRouter.patch('/disabled/:id_client', Clients.deshabilitar);
clientsRouter.delete('/delete/:id_client', Clients.eliminar);
clientsRouter.patch('/update/:id_client', clientsValidator.updateClient, Clients.actualizar);
clientsRouter.get('/search', clientsValidator.searchClient,Clients.filtrar);

export default clientsRouter;

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: "Obtener todos los clientes con la información más importante (solo se verán los clientes activos)"
 *     tags: 
 *       - Clients
 *     responses: 
 *       200: 
 *         description: "Lista de Clientes"
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties: 
 *                   id_client:
 *                     type: integer
 *                     example: 2
 *                   name_client:
 *                     type: string
 *                     example: "John"
 *                   last_name_client:
 *                     type: string
 *                     example: "Carter"
 *                   type_client:
 *                     type: string
 *                     example: "Consumidor Final"
 *       404:
 *         description: "Datos no encontrados"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "No se encontraron Clientes en la base de datos"
 *       500:
 *         description: "Error en el servidor"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "No se pueden ver los clientes debido a una falla en el sistema"
 * 
 * /clients/details/{id_client}: 
 *   get:
 *     summary: "Obtener todos los datos de un cliente en específico, esto incluye las asociaciones con Pedidos"
 *     tags: 
 *       - Clients
 *     parameters:
 *       - in: path
 *         name: id_client
 *         schema:
 *           type: string
 *         required: true
 *         description: "ID del cliente"
 *     responses: 
 *       200: 
 *         description: "Información detallada del cliente"
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/client'
 *       500:
 *         description: "Error en el servidor"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Hubo un error interno en el servidor"
 * 
 * /clients/create:
 *   post:
 *     summary: "Crear un cliente"
 *     tags: 
 *       - Clients
 *     responses: 
 *       201: 
 *         description: "Creación Exitosa (El JSON contiene a modo de ejemplo los elementos mínimos y más importantes que debe contener el body que recibe el back para la creación de un nuevo cliente)"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La creación del cliente finalizó exitosamente"
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name_client: 
 *                   type: string
 *                   example: "John"
 *                 last_name_client: 
 *                   type: string
 *                   example: "Travolta"
 *                 province_client: 
 *                   type: string
 *                   example: "Buenos Aires"
 *                 direction_client: 
 *                   type: string
 *                   example: "Calle 123"
 *                 phone_number_client: 
 *                   type: string
 *                   example: "84 153-4865"
 *                 type_client: 
 *                   type: string
 *                   example: "Consumidor Final"
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
 *               example: "La creación del cliente falló"
 * 
 * /clients/disabled/{id_client}:
 *   patch:
 *     summary: "Eliminado lógico de un cliente"
 *     tags:
 *       - Clients
 *     responses:
 *       200:
 *         description: "Deshabilitación Exitosa"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La deshabilitación del cliente termino exitosamente"
 *       500:
 *         description: "Error en el servidor"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: La deshabilitación del cliente falló"
 * 
 * /clients/delete/{id_client}:
 *   delete:
 *     summary: "Eliminado total de un cliente"
 *     tags:
 *       - Clients
 *     responses:
 *       200:
 *         description: "Eliminación Exitosa"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La eliminación del cliente finalizó exitosamente"
 *       500:
 *         description: "Error en el servidor"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La eliminación del cliente falló" 
 * 
 * /clients/update/{id_client}:
 *   patch:
 *     summary: "Actualizar un cliente"
 *     tags: 
 *       - Clients
 *     responses: 
 *       200: 
 *         description: "Actualización Exitosa"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La actualización del cliente finalizó exitosamente"
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
 *               example: "La actualización del cliente falló"
 * 
 * /clients/search: 
 *   get:
 *     summary: "Filtro de busqueda, donde ingresando ciertos parámetros te va a devolver 1 o más clientes (el body del response va a ser igual de completo que el /clients/details/{id_client})"
 *     tags: 
 *       - Clients
 *     parameters:
 *       - in: query
 *         name: "search_type" 
 *         schema:
 *           type: string
 *         required: true
 *         description: "search_type indiqua el tipo de filtro, pueden ser: 'name_client', 'last_name_client, 'id_client' 'dni_client', 'cuil_or_cuit_client', 'type_client'"
 *       - in: query
 *         name: search_value 
 *         schema:
 *           type: string
 *         required: true
 *         description: "search_value indiqua el valor que deseamos buscar"
 *     responses: 
 *       200: 
 *         description: "Se mostrarán los clientes encontrados con los parámetros establecidos"
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/clients'
 *       404:
 *         description: "Datos no encontrados"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "No se encontro nada en la base de datos con ${search_type}: ${serach_value}"
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
 *     clients:
 *       type: object
 *       required:
 *         - name_client
 *         - last_name_client
 *         - dni_client
 *         - province_client
 *         - direction_client
 *         - phone_number_client
 *         - type_client
 *       properties:
 *         id_client:
 *           type: integer
 *           example: 2
 *         name_client:
 *           type: string
 *           example: "John"
 *         last_name_client:
 *           type: string
 *           example: "Carter" 
 *         dni_client:
 *           type: string
 *           example: "38159467"
 *         province_client:
 *           type: string
 *           example: "Chaco"
 *         direction_client:
 *           type: string
 *           example: "siempreviva 721" 
 *         mail_client:
 *           type: string
 *           example: "juan@gmail.com" 
 *         phone_number_client:
 *           type: string
 *           example: "84 354-7826" 
 *         type_client:
 *           type: string
 *           example: "Consumidor Final" 
 *         cuil_or_cuit_client:
 *           type: string
 *           example: "8-38159467-7" 
 *         disabled:
 *           type: boolean
 *           example: false
 *         orders:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id_order: 
 *                 type: integer
 *                 example: 7
 *               delivery_day_order:
 *                 type: string
 *                 example: "2024-08-08"
 */
