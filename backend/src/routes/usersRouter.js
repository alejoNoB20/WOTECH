import { Router } from "express";
import { UsersController } from "../controllers/usersController.js";
const userController = new UsersController()
let usersRouter = Router();

usersRouter.post('/', userController.ingresar);
usersRouter.get('/:user_name', userController.obtenerUsuario);
usersRouter.get('/findAll', userController.obtenerUsuario)

export default usersRouter;