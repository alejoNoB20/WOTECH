import { Router } from "express";
import { orderController } from "./ordersController.js";
import { ordersValidator } from "./ordersValidators.js";
let ordersRouter = Router();
const OrderController = new orderController();

ordersRouter.get('/', OrderController.verPedidos);
ordersRouter.get('/details/:id_order', OrderController.detalles);
ordersRouter.get('/getCreate', OrderController.detallesProductos);
ordersRouter.post('/create', ordersValidator.createOrUpdateOrder, OrderController.crear);
ordersRouter.patch('/disabled/:id_order', OrderController.deshabilitar);
ordersRouter.delete('/delete/:id_order', OrderController.borrar);
ordersRouter.patch('/update/:id_order', ordersValidator.createOrUpdateOrder, OrderController.actualizar);
ordersRouter.get('/search', ordersValidator.searchOrder, OrderController.filtrar);

export default ordersRouter;

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: "Obtener todos los pedidos con la información más importante (solo se verán los pedidos activos)"
 *     tags: 
 *       - Orders
 *     responses: 
 *       200: 
 *         description: "Lista de Pedidos"
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties: 
 *                   id_order:
 *                     type: integer
 *                     example: 7
 *                   delivery_day_order:
 *                     type: string
 *                     example: "2024-08-08"
 *                   price_order:
 *                     type: integer
 *                     example: "135000"
 *       404:
 *         description: "Datos no encontrados"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "No se encontraron pedidos activos en la base de datos"
 *       500:
 *         description: "Error en el servidor"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "No se pueden ver los pedidos debido a una falla en el sistema"
 * 
 * /orders/details/{id_order}: 
 *   get:
 *     summary: "Obtener todos los datos de un pedido en específico, esto incluye las asociaciones con Productos y Clientes"
 *     tags: 
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id_order
 *         schema:
 *           type: string
 *         required: true
 *         description: "ID del pedido"
 *     responses: 
 *       200: 
 *         description: "Información detallada del pedido"
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/orders'
 *       500:
 *         description: "Error en el servidor"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Hubo un error interno en el servidor"
 * 
 * /products/getCreate:
 *   get:
 *     summary: "Obtener los ID, NOMBRES y PRECIOS de los Productos cargadas en la db para que el usuario pueda elegir que contiene el Pedido (no incluye ningun Producto deshabilitado)"
 *     tags: 
 *       - Orders
 *     responses: 
 *       200: 
 *         description: "Lista Productos"
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_product:
 *                     type: integer
 *                     example: 2
 *                   name_product:
 *                     type: string
 *                     example: "Mesa"
 *                   price_product:
 *                     type: integer
 *                     example: 5000
 *       404:
 *         description: "Datos no encontrados"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "No se encontró ningun producto en la base de datos"
 *       500:
 *         description: "Error en el servidor"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "No se pueden ver los productos debido a una falla en el sistema"
 * 
 * /orders/create:
 *   post:
 *     summary: "Crear un pedido"
 *     tags: 
 *       - Orders
 *     responses: 
 *       201: 
 *         description: "Creación Exitosa (El JSON contiene a modo de ejemplo los elementos mínimos y más importantes que debe contener el body que recibe el back para la creación de un nuevo pedido)"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La creación del pedido finalizó exitosamente"
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_client_fk: 
 *                   type: integer
 *                   example: 2
 *                 delivery_day_order: 
 *                   type: string
 *                   example: "2024-08-08"
 *                 products: 
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       price_product:
 *                         type: integer
 *                         example: 5000
 *                       unit_product:
 *                         type: integer
 *                         example: 15
 *                 description: 
 *                   type: string
 *                   example: "El parámetro 'products' es un array en el cual sus items son objetos, cada objeto contiene 'id': id del producto, 'price_product': precio del producto, 'unit_product': las cantidades del producto dentro del pedido"
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
 *               example: "La creación del pedido falló"
 * 
 * /orders/disabled/{id_order}:
 *   patch:
 *     summary: "Eliminado lógico de un producto"
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: "Deshabilitación Exitosa"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "El pedido se cerró con éxito"
 *       500:
 *         description: "Error en el servidor"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "El pedido fallo al intentar cerrarlo"
 * 
 * /orders/delete/{id_order}:
 *   delete:
 *     summary: "Eliminado total de un pedido"
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: "Eliminación Exitosa"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La eliminación del pedido finalizó exitosamente"
 *       500:
 *         description: "Error en el servidor"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La eliminación del pedido falló" 
 * 
 * /orders/update/{id_order}:
 *   patch:
 *     summary: "Actualizar un pedido"
 *     tags: 
 *       - Orders
 *     responses: 
 *       200: 
 *         description: "Actualización Exitosa"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La actualización del pedido finalizó exitosamente"
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
 *               example: "La actualización del pedido falló"
 * 
 * /orders/search: 
 *   get:
 *     summary: "Filtro de busqueda, donde ingresando ciertos parámetros te va a devolver 1 o más pedidos (el body del response va a ser igual de completo que el /orders/details/{id_order})"
 *     tags: 
 *       - Orders
 *     parameters:
 *       - in: query
 *         name: search_type 
 *         schema:
 *           type: string
 *         required: true
 *         description: "search_type indiqua el tipo de filtro, pueden ser: 'id_order', 'id_client, 'shipping_address_order' 'delivery_day_order'"
 *       - in: query
 *         name: search_value 
 *         schema:
 *           type: string
 *         required: true
 *         description: "search_value indiqua el valor que deseamos buscar"
 *     responses: 
 *       200: 
 *         description: "Se mostrarán los pedidos encontrados con los parámetros establecidos"
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/orders'
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
 *     orders:
 *       type: object
 *       required:
 *         - delivery_day_order
 *         - price_order
 *         - products
 *         - client
 *       properties:
 *         id_order:
 *           type: integer
 *           example: 7
 *         shipping_address_order:
 *           type: string
 *           example: "Calle 123"
 *         delivery_day_order:
 *           type: string
 *           example: "2024-08-08" 
 *         disabled:
 *           type: boolean
 *           example: false
 *         price_order:
 *           type: integer
 *           example: 135000
 *         id_client_fk:
 *           type: integer
 *           example: 2 
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id_product: 
 *                 type: integer
 *                 example: 2
 *               name_product:
 *                 type: string
 *                 example: "Mesa"
 *               order_Products_association:
 *                 type: object
 *                 properties:
 *                   unit_product:
 *                     type: integer
 *                     example: 12
 *         client:
 *           type: object
 *           properties:
 *             name_client:
 *               type: string
 *               example: "John"
 */