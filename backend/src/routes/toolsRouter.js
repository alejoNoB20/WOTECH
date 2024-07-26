import { Router } from "express";
import {ToolsController} from "../controllers/toolsController.js";
import {toolsValidations} from "../validations/toolsValidators.js";
const toolsController = new ToolsController();
let toolsRouter = Router();

toolsRouter.get('/', toolsController.verTodasHerramientas);
toolsRouter.post('/create', toolsValidations.createTool, toolsController.pushHerramienta);
toolsRouter.get('/delete/:id_tool',toolsValidations.deleteTool, toolsController.deleteHerramienta);
toolsRouter.get('/update/:id_tool', toolsController.irActualizarHerramienta);
toolsRouter.post('/update/:id_tool', toolsValidations.updateTool, toolsController.actualizarHerramienta);
toolsRouter.get('/search',toolsValidations.searchTool, toolsController.buscarHerramienta);

export default toolsRouter;