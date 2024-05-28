import { Router } from "express";
let suppliersRouter = Router();

suppliersRouter.get('/suppliers', (req, res, next) =>{
    res.render('suppliers', {title: "Control de proveedores"});
});

export default suppliersRouter;