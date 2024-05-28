import { Router } from "express";
import { UsersController } from "../controllers/usersController.js";
const userController = new UsersController()
let usersRouter = Router();

usersRouter.post('/', userController.ingresar);

export default usersRouter;