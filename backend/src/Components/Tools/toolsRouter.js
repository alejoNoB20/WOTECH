import { Router } from "express";
import { ToolsController } from "./toolsController.js";
import { toolsValidations } from "./toolsValidators.js";
import { sequelize } from "../../database/connection.js";
import { checkSecret } from '../../middlewares/protectecRoutes.js'
import { upload } from "../../middlewares/multer.js";
const toolsController = new ToolsController();

let toolsRouter = Router();

toolsRouter.get('/', toolsController.verTodasHerramientas);
toolsRouter.get('/details/:id_tool', toolsController.detallesHerramienta);
toolsRouter.post('/create', upload.single("img_tool"), toolsValidations.createTool , toolsController.pushHerramienta);
toolsRouter.patch('/disabled/:id_tool', toolsController.deshabilitar);
toolsRouter.delete('/delete/:id_tool', toolsController.deleteHerramienta);
toolsRouter.patch('/update/:id_tool', toolsValidations.updateTool, toolsController.actualizarHerramienta);
toolsRouter.get('/search',toolsValidations.searchTool, toolsController.buscarHerramienta);
toolsRouter.post('/clear-db', checkSecret,async (req, res) => {
    try {
      await sequelize.sync({ force: true });
    //   await sequelize.sync({alter: true});
      
      res.status(200).send('Base de datos reiniciada correctamente.');
    } catch (error) {
      console.error('Error al reiniciar la base de datos:', error);
      res.status(500).send('Error al reiniciar la base de datos.');
    }
  });
export default toolsRouter;

/**
 * @swagger
 * /tools:
 *   get:
 *     summary: "Obtener todos las herramientas con la información más importante (solo se verán las herramientas habilitadas)"
 *     tags: 
 *       - Tools
 *     responses: 
 *       200: 
 *         description: "Lista de Herramientas"
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties: 
 *                   id_tool:
 *                     type: integer
 *                     example: 3
 *                   name_tools:
 *                     type: string
 *                     example: "Amoladora"
 *                   status_tool:
 *                     type: string
 *                     example: "Habilitado"
 *                   location_tool:
 *                     type: string
 *                     example: "Pared Derecha" 
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
 *               example: "No se pueden ver las herramientas debido a una falla en el sistema"
 * 
 * /tools/details/{id_tool}: 
 *   get:
 *     summary: "Obtener todos los datos de una herramienta en específico, esto incluye las asociaciones con Productos"
 *     tags: 
 *       - Tools
 *     parameters:
 *       - in: path
 *         name: id_tool
 *         schema:
 *           type: string
 *         required: true
 *         description: "ID de la herramienta"
 *     responses: 
 *       200: 
 *         description: "Información de la herramienta detallada"
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/tools'
 *       500:
 *         description: "Error en el servidor"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Hubo un error interno en el servidor"
 * 
 * /tools/create:
 *   post:
 *     summary: "Crear una nueva herramienta"
 *     tags: 
 *       - Tools
 *     responses: 
 *       201: 
 *         description: "Creación Exitosa (El JSON contiene a modo de ejemplo los elementos mínimos y más importantes que debe contener el body que recibe el back para la creación de una nueva herramienta)"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La creación de la herramienta finalizó exitosamente"
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name_tool: 
 *                   type: string
 *                   example: "Martillo"
 *                 location_tool: 
 *                   type: string
 *                   example: "Mueble 1"
 *                 status_tool: 
 *                   type: string
 *                   example: "Habilitado (si bien el estado de la herramientas es obligatorio, para la creación no es necesario ya que se entiende que esta Habilitado por default)"
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
 *               example: "La creación de la herramienta falló"
 * 
 * /tools/disabled/{id_tool}:
 *   patch:
 *     summary: "Eliminado lógico de una herramienta"
 *     tags:
 *       - Tools
 *     responses:
 *       200:
 *         description: "Deshabilitación Exitosa"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La deshabilitación de la herramienta finalizó exitosamente"
 *       500:
 *         description: "Error en el servidor"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La deshabilitación de la herramienta falló"
 * 
 * /tools/delete/{id_tool}:
 *   delete:
 *     summary: "Eliminado total de una herramienta"
 *     tags:
 *       - Tools
 *     responses:
 *       200:
 *         description: "Eliminación Exitosa"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La eliminación de la herramienta finalizó exitosamente"
 *       500:
 *         description: "Error en el servidor"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La eliminación de la herramienta falló" 
 * 
 * /tools/update/{id_tool}:
 *   patch:
 *     summary: "Actualizar una herramienta"
 *     tags: 
 *       - Tools
 *     responses: 
 *       200: 
 *         description: "Actualización Exitosa"
 *         content: 
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "La actualización de la herramienta finalizó exitosamente"
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
 *               example: "La actualización de la herramienta falló"
 * 
 * /tools/search: 
 *   get:
 *     summary: "Filtro de busqueda, donde ingresando ciertos parámetros te va a devolver 1 o más herramientas (el body del response va a ser igual de completo que el /tools/details/{id_tools})"
 *     tags: 
 *       - Tools
 *     parameters:
 *       - in: query
 *         name: search_type 
 *         schema:
 *           type: string
 *         required: true
 *         description: "search_type indiqua el tipo de filtro, pueden ser: 'id_tool', 'name_tool, 'status_tool' 'location_tool', 'repair_shop_tool'"
 *       - in: query
 *         name: search_value 
 *         schema:
 *           type: string
 *         required: true
 *         description: "search_value indiqua el valor que deseamos buscar (en el caso que el 'search_type' sea 'status_tool', los únicos valores válidos son 'Habilitado', 'En Arreglo', 'Inhabilitado', 'Perdido')"
 *     responses: 
 *       200: 
 *         description: "Se mostrarán las herramientas encontradas con los parámetros establecidos"
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
 *     tools:
 *       type: object
 *       required:
 *         - name_tool
 *         - status_tool
 *         - location_tool
 *       properties:
 *         id_tool:
 *           type: integer
 *           example: 3
 *         name_tool:
 *           type: string
 *           example: "Amoladora"
 *         img_tool:
 *           type: string
 *           example: "url de la imagen de la herramienta..."
 *         description_tool:
 *           type: string
 *           example: "Amoladora marca BOSCH" 
 *         status_tool:
 *           type: string
 *           example: "Habilitado"
 *         location_tool:
 *           type: string
 *           example: "Pared Derecha"
 *         repair_shop_tool:
 *           type: string
 *           example: "9 de Julio 3501" 
 *         repair_date_tool:
 *           type: date
 *           example: "2024-08-28"  
 *         search_repair_tool:
 *           type: date
 *           example: "2024-09-29"  
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
 *               example: "Mesa"
 */