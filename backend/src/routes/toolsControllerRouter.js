import { Router } from "express";
import {ToolsController} from "../controllers/toolsController.js";
const toolsController = new ToolsController();
let toolsControllerRouter = Router();

toolsControllerRouter.get('/', toolsController.verTodasHerramientas);

export default toolsControllerRouter;