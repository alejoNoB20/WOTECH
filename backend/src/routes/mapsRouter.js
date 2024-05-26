import { Router } from "express";
let mapsRouter = Router();

mapsRouter.get('/maps', (req, res, next) =>{
    res.render('maps', {title: "Control de planos"});
});

export default mapsRouter;