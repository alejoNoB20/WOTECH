import { Router } from "express";
import {ToolsController} from "../controllers/toolsController.js";
const toolsController = new ToolsController();
let toolsRouter = Router();

toolsRouter.get('/', toolsController.verTodasHerramientas);
toolsRouter.get('/create', (req, res) => {
    res.render('pushTool', {title: 'Agregar nueva herramienta'});
})
toolsRouter.post('/create', toolsController.pushHerramienta);
toolsRouter.get('/delete/:id_tool', toolsController.deleteHerramienta);
toolsRouter.get('/update/:id_tool', toolsController.irActualizarHerramienta);
toolsRouter.post('/update/:id_tool', toolsController.actualizarHerramienta);
toolsRouter.get('/search', toolsController.buscarHerramienta);

export default toolsRouter;