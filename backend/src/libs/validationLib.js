import { validationResult } from "express-validator";

export const validatorResult = (req, res, next) => {
    const result = validationResult(req);

    if(!result.isEmpty()){
        return res.status(404).json({errors: result.array()});
    }
    next();
}