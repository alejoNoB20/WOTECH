import { Router } from "express";
import { clientsController } from "./clientsController.js";
import { clientsValidator } from "./clientsValidators.js";
const ClientsController = new clientsController();
let clientsRouter = Router();

clientsRouter.get('/', ClientsController.verTodos);
clientsRouter.post('/create', clientsValidator.createAndUpdateClient, ClientsController.crear);
clientsRouter.post('/delete/:dni_client', ClientsController.borrar);
clientsRouter.get('/update/:dni_client', ClientsController.paginaActualizar);
clientsRouter.post('/update/:dni_client', clientsValidator.createAndUpdateClient, ClientsController.actualizar);
clientsRouter.get('/search', clientsValidator.searchClient,ClientsController.filtrar);

export default clientsRouter;
