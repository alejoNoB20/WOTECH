import { Router } from 'express';
let indexRouter = Router();

/* GET home page. */
indexRouter.get('/', (req, res, next) => {
  res.render('index');
});

export default indexRouter;
