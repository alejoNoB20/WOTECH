import { body } from "express-validator";
import { validatorResult } from "../../libs/validationLib.js";

export const invoiceValidator = {
    createInvoice: [
        body('id_supplier_fk')
            .exists()
            .notEmpty().withMessage('El campo ID DEL PROVEEDOR es obligatorio').bail()
            .isInt().withMessage('El campo ID DE PROVEEDOR solo recibe números enteros'),

        body('invoice')
            .trim()
            .exists()
            .notEmpty().withMessage('El campo FACTURA es obligatorio').bail(),

        (req, res, next) => {
            validatorResult(req, res, next);
        }
    ]
};