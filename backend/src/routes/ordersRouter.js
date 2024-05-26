import { Router } from "express";
let ordersRouter = Router();

ordersRouter.get('/orders', (req, res, next) =>{
    res.render('orders', {title: "Control de pedidos"});
});

export default ordersRouter;