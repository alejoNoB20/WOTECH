import { Router } from "express";
let productsRouter = Router();

productsRouter.get('/', (req, res, next) =>{
    res.render('products', {title: "Control de proveedores"});
});

export default productsRouter;