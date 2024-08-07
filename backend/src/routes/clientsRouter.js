import { Router } from "express";
import { clientsController } from "../controllers/clientsController.js";
import { clientsValidator } from "../validations/clientsValidators.js";
const ClientsController = new clientsController();
let clientsRouter = Router();

clientsRouter.get('/', ClientsController.verTodos);
clientsRouter.post('/create', clientsValidator.createAndUpdateClient, ClientsController.crear);
clientsRouter.get('/delete/:id_client', ClientsController.borrar);
clientsRouter.get('/update/:id_client', ClientsController.paginaActualizar);
clientsRouter.post('/update/:id_client', clientsValidator.createAndUpdateClient, ClientsController.actualizar);
clientsRouter.get('/search', clientsValidator.searchClient,ClientsController.filtrar);

export default clientsRouter;
