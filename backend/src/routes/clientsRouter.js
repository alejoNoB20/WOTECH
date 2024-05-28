import { Router } from "express";
let clientsRouter = Router();

clientsRouter.get('/', (req, res, next) =>{
    res.render('clients', {title: "Control de clientes"});
});

export default clientsRouter;