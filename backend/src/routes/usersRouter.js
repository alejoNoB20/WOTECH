import { Router } from "express";
import { UsersController } from "../controllers/usersController.js";
const userController = new UsersController()
let usersRouter = Router();

usersRouter.post('/', userController.ingresar);
usersRouter.get('/', userController.obtenerTodos);
usersRouter.get('/:user_name', userController.obtenerUnico);
usersRouter.put("/:user_id", userController.actualizar);
usersRouter.delete('/:user_id', userController.eliminar);

export default usersRouter;