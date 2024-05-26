import { Router } from "express";
let toolsControllerRouter = Router();

toolsControllerRouter.get('/toolsController', (req, res, next) =>{
    res.render('toolsController', {title: "Control de herramientas"});
});

export default toolsControllerRouter;