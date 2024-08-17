import { Router } from "express";
import { ToolsController } from "./toolsController.js";
import { toolsValidations } from "./toolsValidators.js";
const toolsController = new ToolsController();
let toolsRouter = Router();

toolsRouter.get('/', toolsController.verTodasHerramientas);
toolsRouter.post('/create', toolsValidations.createTool, toolsController.pushHerramienta);
toolsRouter.patch('/disabled/:id_tool', toolsController.deshabilitar);
toolsRouter.delete('/delete/:id_tool', toolsController.deleteHerramienta);
toolsRouter.get('/update/:id_tool', toolsController.detallesHerramienta);
toolsRouter.get('/details/:id_tool', toolsController.detallesHerramienta);
toolsRouter.patch('/update/:id_tool', toolsValidations.updateTool, toolsController.actualizarHerramienta);
toolsRouter.get('/search',toolsValidations.searchTool, toolsController.buscarHerramienta);

export default toolsRouter;