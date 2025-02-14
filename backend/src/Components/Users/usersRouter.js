import { Router } from "express";
import { userController } from "./usersController.js";
import { checkToken } from "../../middlewares/protectecRoutes.js";

const UserController = new userController();
let userRouter = Router();

userRouter.get('/auth/verify', checkToken);
userRouter.post('/create', checkToken, UserController.crear);
userRouter.post('/login', UserController.logIn);
userRouter.get('/logout', checkToken,UserController.logOut);
userRouter.get('/userinfo', checkToken,UserController.userInfo);

export default userRouter;