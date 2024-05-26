import { Router } from "express";
let stockRouter = Router();

stockRouter.get('/stock', (req, res, next) =>{
    res.render('stock', {title: "Control de stock"});
});

export default stockRouter;