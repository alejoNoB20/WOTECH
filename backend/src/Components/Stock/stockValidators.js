import { body, query } from 'express-validator';
import { validatorResult } from '../../libs/validationLib.js';
import { StockService } from './stockService.js';
const Stock = new StockService();

export const stockValidations = {
    createStock: [
        body('name_material')
            .trim()
            .exists()
            .notEmpty().withMessage('El campo NOMBRE es obligatorio').bail()
            .isLength({max: 50}).withMessage('El campo NOMBRE recibe un máximo de 50 caracteres').bail()
            .custom(async (value, {req}) => {
                const findSameName = await Stock.filtrarMaterial('nameMaterialValidator', req.body.name_material);
                if(findSameName.status === 200) throw new Error('Hay un stock con el mismo nombre en la base de datos');
                return true;
            }),

        body('description_material')
            .optional()
            .trim()
            .isLength({max: 200}).withMessage('El campo DESCRIPCIÓN recibe un máximo de 200 caracteres').bail(),

        body('amount_material')
            .optional()
            .exists()
            .notEmpty().withMessage('El campo CANTIDAD es obligatorio').bail()
            .isInt().withMessage('El campo CANTIDAD solo recibe números enteros'),

        body('measurement_material')
            .exists()
            .notEmpty().withMessage('El campo UNIDAD DE MEDIDA es obligatorio').bail()
            .isIn(['cm', 'unidad']).withMessage('El tipo de unidad de medida no es válido'),
        
            (req, res, next) =>{
                validatorResult(req, res, next);
            }

    ],
    searchStock: [
        query('search_type')
            .trim()
            .exists()
            .notEmpty().withMessage('El tipo de filtro es obligatorio para buscar en una lista').bail()
            .isIn(['id_material', 'name_material', 'amount_material']).withMessage('El filtro de busqueda es inválido'),

        query('search_value')
            .exists()
            .notEmpty().withMessage('El valor del filtro es obligatorio para buscar en una lista').bail()
            .custom((value, {req}) => {
                if(req.query.search_type === 'name_material'){
                    if(value > 50){
                        throw new Error('El nombre de un stock no puede superar los 50 caracteres');
                    }
                }
                if(req.query.search_type === 'id_material' || req.query.search_type === 'amount_material'){
                    const valueFloat = parseFloat(value);
                    if(!Number.isInteger(valueFloat) || valueFloat < 1){
                        throw new Error('Los campos CANTIDAD - ID solo reciben números enteros')
                    }
                }
                return true
            }),

            (req, res, next) =>{
                validatorResult(req, res, next);
            }
    ],
    updateStock: [
        body('name_material')
            .trim()
            .exists()
            .notEmpty().withMessage('El campo NOMBRE es obligatorio').bail()
            .isLength({max: 50}).withMessage('El campo NOMBRE recibe un máximo de 50 caracteres').bail()
            .custom(async (value, {req}) => {
                const findSameName = await Stock.filtrarMaterial('nameMaterialValidator', req.body.name_material);
                if(findSameName.status == 200 && findSameName.msg[0].id_material != req.params.id_material) throw new Error('Hay un stock con el mismo nombre en la base de datos');
                return true;
            }),

        body('description_material')
            .optional()
            .trim()
            .isLength({max: 200}).withMessage('El campo DESCRIPCIÓN recibe un máximo de 200 caracteres').bail(),

        body('amount_material')
            .optional()
            .exists()
            .notEmpty().withMessage('El campo CANTIDAD es obligatorio').bail()
            .isInt().withMessage('El campo CANTIDAD solo recibe números enteros'),

        body('measurement_material')
            .trim()
            .exists()
            .notEmpty().withMessage('El campo UNIDAD DE MEDIDA es obligatorio').bail()
            .isIn(['cm', 'unidad']).withMessage('El tipo de unidad de medida no es válido'),
        
            (req, res, next) =>{
                validatorResult(req, res, next);
            }
    ]
}