import { validatorResult } from '../../libs/validationLib.js';
import { body } from 'express-validator';

export const supplierMaterialsValidator = {
    createAndUpdateSupplierMaterial: [

        body('id_material_fk')
            .exists()
            .notEmpty().withMessage('El campo ID DEL STOCK es obligatorio').bail()
            .isNumeric().withMessage('El campos ID DEL STOCK solo acepta números enteros').bail()
            .isInt().withMessage('El campos ID DEL STOCK solo acepta números enteros'),

        body('id_supplier_fk')
            .exists()
            .notEmpty().withMessage('El campo ID DEL PROVEEDOR es obligatorio').bail()
            .isNumeric().withMessage('El campos ID DEL PROVEEDOR solo acepta números enteros').bail()
            .isInt().withMessage('El campos ID DEL PROVEEDOR solo acepta números enteros'),

        body('amount_material')
            .exists()
            .notEmpty().withMessage('El campo CANTIDAD es obligatorio').bail()
            .isNumeric().withMessage('El campo CANTIDAD solo acepta números enteros').bail()
            .isInt().withMessage('El campo CANTIDAD solo acepta números enteros'),

        body('price_material')
            .exists()
            .notEmpty().withMessage('El campo PRECIO es obligario').bail()
            .isNumeric().withMessage('El campo PRECIO solo acepta números positivos'),

        (req, res, next) => {
            validatorResult(req, res, next);
        }
    ]
}