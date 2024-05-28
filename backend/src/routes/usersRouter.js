import { Router } from "express";
let usersRouter = Router();

usersRouter.get('/', (req, res, next) =>{
    res.render('users', {title: "Control de usuarios"});
});

export default usersRouter;