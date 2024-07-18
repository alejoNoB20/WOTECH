import { Router } from "express";
import { clientsController } from "../controllers/clientsController.js";
const ClientsController = new clientsController();
let clientsRouter = Router();

clientsRouter.get('/', ClientsController.verTodos);
clientsRouter.get('/create', (req, res) => {
    res.render('pushClient', {title: 'Crear cliente'});
})
clientsRouter.post('/create', ClientsController.crear);
clientsRouter.get('/delete/:id_client', ClientsController.borrar);
clientsRouter.get('/update/:id_client', ClientsController.paginaActualizar);
clientsRouter.post('/update/:id_client', ClientsController.actualizar);
clientsRouter.get('/search', ClientsController.filtrar);

export default clientsRouter;
