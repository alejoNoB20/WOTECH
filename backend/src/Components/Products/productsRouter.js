import { Router } from "express";
import { productsController } from "./productsController.js";
import { productValidator } from "./productsValidators.js";
const ProductsController = new productsController();
let productsRouter = Router();

productsRouter.get('/', ProductsController.verTodos);
productsRouter.get('/details/:id_product', ProductsController.detallesProducto);
productsRouter.get('/getStockAndTools', ProductsController.irAPaginaCrear);
productsRouter.post('/create', productValidator.createProduct,ProductsController.crear);
productsRouter.patch('/disabled/:id_product', ProductsController.deshabilitar);
productsRouter.delete('/delete/:id_product', ProductsController.eliminar);
productsRouter.get('/getDataForUpdate/:id_product', ProductsController.irPaginaActualizar);
productsRouter.patch('/update/:id_product', productValidator.updateProduct, ProductsController.actualizar);
productsRouter.get('/search/', productValidator.searchProduct, ProductsController.filtrar);

export default productsRouter;

/**
 * @swagger
 * /products:
 *   get:
 *     summary: "Obtener todos los productos con la información más importante (solo se verán los productos habilitados)"
 *     tags: 
 *       - Products
 *     responses: 
 *       200: 
 *         description: "Lista de Productos"
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
 *                   img_product:
 *                     type: string
 *                     example: "url de la imagen del producto..."
 *                   price_product:
 *                     type: integer
 *                     example: 5000 
 *                   map_product:
 *                     type: string
 *                     example: "url del plano del producto..." 
 *                   disabled:
 *                     type: boolean
 *                     example: false 
 *       404:
 *         description: "Datos no encontrados"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "No se encontraron productos registrados en la base de datos"
 *       500:
 *         description: "Error en el servidor"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "No se pueden ver los productos debido a una falla en el sistema"
 * 
 * /products/details/{id_product}: 
 *   get:
 *     summary: "Obtener todos los datos de un producto en específico, esto incluye las asociaciones con Stock y Herramientas"
 *     tags: 
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id_product
 *         schema:
 *           type: string
 *         required: true
 *         description: "ID del producto"
 *     responses: 
 *       200: 
 *         description: "Información detallada del producto"
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/products'
 *       500:
 *         description: "Error en el servidor"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Hubo un error interno en el servidor"
 * 
 * /products/getStockAndTools:
 *   get:
 *     summary: "Obtener los ID y NOMBRES del Stock y Herramientas cargadas en la db para que el usuario pueda elegir lo que sea necesario utilizar en la creación de un producto (no incluye ningun Stock o Herramienta deshabilitada)"
 *     tags: 
 *       - Products
 *     responses: 
 *       200: 
 *         description: "Lista de Stock y Herramientas"
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:                 
 *                 stock:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_material:
 *                         type: integer
 *                         example: 1
 *                       name_material:
 *                         type: string
 *                         example: "Clavos 15mm"
 *                 tools:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_tool:
 *                         type: integer
 *                         example: 3
 *                       name_tool:
 *                         type: string
 *                         example: "Amoladora"
 *       404:
 *         description: "Existen tres formas de mostrar el 404, cuando no hay stock registrado, cuando no hay herramientas registradas y cuando no hay ninguna de las dos en la db"
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stock:
 *                   type: string
 *                   example: "No se encontró ningún stock en la base de datos"
 *                 tools:
 *                   type: string
 *                   example: "No se encontró ninguna herramienta en la base de datos"
 *       500:
 *         description: "Error en el servidor"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "No se pueden ver los productos debido a una falla en el sistema"
 * 
 * /products/create:
 *   post:
 *     summary: "Crear un nuevo producto "
 *     tags: 
 *       - Products
 *     responses: 
 *       201: 
 *         description: "Creación Exitosa, tanto del producto como de las las asociaciones con su respectivo Stock y Herramientas (El JSON contiene a modo de ejemplo los elementos mínimos y más importantes que debe contener el body que recibe el back para la creación de un nuevo producto)"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La creación del producto finalizó exitosamente"
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name_product: 
 *                   type: string
 *                   example: "Mesa"
 *                 price_product: 
 *                   type: integer
 *                   example: 5800
 *                 tools: 
 *                   type: array
 *                   items:
 *                     type: integer
 *                   example: [1, 2, 3]
 *                 materials: 
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       how_much_content:
 *                         type: integer
 *                         example: 28
 *                 description:
 *                   type: string 
 *                   example: "El parámetro 'tools' es un array donde cada elemento es el ID de una herramienta y el parámetro 'stocks' es un array donde cada elemento es un objeto con las claves 'id': contiene el ID de un stock, 'how_much_content': contiene las cantidades de dicho stock que se van a utilizar para la creación del producto"
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
 *               example: "La creación del producto falló"
 * 
 * /products/disabled/{id_product}:
 *   patch:
 *     summary: "Eliminado lógico de un producto"
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: "Deshabilitación Exitosa"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La deshabilitación del producto finalizó exitosamente"
 *       500:
 *         description: "Error en el servidor"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La deshabilitación del producto falló"
 * 
 * /products/delete/{id_product}:
 *   delete:
 *     summary: "Eliminado total de un producto"
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: "Eliminación Exitosa"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La eliminación del producto finalizó exitosamente"
 *       500:
 *         description: "Error en el servidor"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La eliminación del producto falló" 
 * 
 * /products/getDataForUpdate/{id_product}:
 *   get:
 *     summary: "Trae toda la información del producto a actualizar además de los ID y NOMBRES del Stock y Herramientas cargadas en la db para que el usuario pueda cambiar o agregar lo que sea necesario para la actualización de dicho producto (no incluye ningun Stock o Herramienta deshabilitada)"
 *     tags: 
 *       - Products
 *     responses: 
 *       200: 
 *         description: "Informacuón del producto + Lista de Stock y Herramientas"
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties: 
 *                 product: 
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_product:
 *                         type: integer
 *                         example: 2
 *                       name_product:
 *                         type: string
 *                         example: "Mesa"
 *                       img_product:
 *                         type: string
 *                         example: "url de la imagen del producto..." 
 *                       description_product:
 *                         type: string
 *                         example: "Mesa de 1/2 metro de alto, usa 4 patas de madera de pino..."
 *                       price_product:
 *                         type: integer
 *                         example: 5000
 *                       map_product:
 *                         type: string
 *                         example: "url del plano del producto..." 
 *                       disabled:
 *                         type: boolean
 *                         example: false  
 *                       stocks:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id_material: 
 *                               type: integer
 *                               example: 1
 *                             name_material:
 *                               type: string
 *                               example: "Clavos 15mm"
 *                             product_Stocks_association:
 *                               type: object
 *                               properties:
 *                                 how_much_contains_use:
 *                                   type: integer
 *                                   example: 10
 *                       tools:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id_tool: 
 *                               type: integer
 *                               example: 2
 *                             name_tool:
 *                               type: string
 *                               example: "Martillo de bola"                   
 *                 stock:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_material:
 *                         type: integer
 *                         example: 1
 *                       name_material:
 *                         type: string
 *                         example: "Clavos 15mm"
 *                 tools:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_tool:
 *                         type: integer
 *                         example: 3
 *                       name_tool:
 *                         type: string
 *                         example: "Amoladora"
 *       500:
 *         description: "Error en el servidor"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Hubo un error interno en el servidor"
 *  
 * /products/update/{id_products}:
 *   patch:
 *     summary: "Actualizar un producto"
 *     tags: 
 *       - Products
 *     responses: 
 *       200: 
 *         description: "Actualización Exitosa"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La actualización del producto finalizó exitosamente"
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
 *               example: "La actualización del producto falló"
 * 
 * /products/search: 
 *   get:
 *     summary: "Filtro de busqueda, donde ingresando ciertos parámetros te va a devolver 1 o más productos (el body del response va a ser igual de completo que el /products/details/{id_product})"
 *     tags: 
 *       - Products
 *     parameters:
 *       - in: query
 *         name: "search_type" 
 *         schema:
 *           type: string
 *         required: true
 *         description: "search_type indiqua el tipo de filtro, pueden ser: 'id_product', 'name_product"
 *       - in: query
 *         name: "search_value" 
 *         schema:
 *           type: string
 *         required: true
 *         description: "search_value indiqua el valor que deseamos buscar"
 *     responses: 
 *       200: 
 *         description: "Se mostrarán los productos encontrados con los parámetros establecidos"
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/tools'
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
 *     products:
 *       type: object
 *       required:
 *         - name_product
 *         - price_product
 *         - stocks
 *         - tools
 *       properties:
 *         id_product:
 *           type: integer
 *           example: 2
 *         name_product:
 *           type: string
 *           example: "Mesa"
 *         img_product:
 *           type: string
 *           example: "url de la imagen del producto..." 
 *         description_product:
 *           type: string
 *           example: "Mesa de 1/2 metro de alto, usa 4 patas de madera de pino..."
 *         price_product:
 *           type: integer
 *           example: 5000
 *         map_product:
 *           type: string
 *           example: "url del plano del producto..." 
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
 *                 example: 1
 *               name_material:
 *                 type: string
 *                 example: "Clavos 15mm"
 *               product_Stocks_association:
 *                 type: object
 *                 properties:
 *                   how_much_contains_use:
 *                     type: integer
 *                     example: 10 
 *         tools:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id_tool: 
 *                 type: integer
 *                 example: 2
 *               name_tool:
 *                 type: string
 *                 example: "Martillo de bola"
 */