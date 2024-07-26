import {body, param, query} from 'express-validator';
import {validatorResult} from '../libs/validationLib.js';
import {StockService} from '../services/stockService.js';
const Stock = new StockService();

export const stockValidations = {
    createStock: [
        body('name_material')
            .trim()
            .exists()
            .notEmpty().withMessage('El campo NOMBRE es obligatorio').bail()
            .isLength({max: 50}).withMessage('El campo NOMBRE recibe un máximo de 50 caracteres').bail()
            .custom(async (value, {req}) => {
                const findSameName = await Stock.buscarUnMaterial('nameMaterialValidator', req.body.name_material);
                if(findSameName) throw new Error('Error: Ya se hay un stock con el mismo nombre en la base de datos');
            }),

        body('description_material')
            .trim()
            .optional()
            .isLength({max: 200}).withMessage('El campo DESCRIPCIÓN recibe un máximo de 200 caracteres').bail(),

        body('buy_price_material')
            .trim()
            .exists()
            .notEmpty().withMessage('El campo PRECIO DE COMPRA es obligatorio').bail()
            .isNumeric().withMessage('El campo PRECIO DE COMPRA solo recibe números enteros o con coma'),

        body('amount_material')
            .trim()
            .exists()
            .notEmpty().withMessage('El campo CANTIDAD es obligatorio').bail()
            .isInt().withMessage('El campo CANTIDAD solo recibe números enteros'),

        body('contains')
            .trim()
            .optional(),

        body('how_much_contains')
            .trim()
            .if(body('contains').equals('on'))
                .exists()
                .notEmpty().withMessage('El campo CUANTO CONTIENE es obligatio en caso de que el stock cuente con algún tipo de contenido').bail()
                .isInt().withMessage('El campo CUNATO CONTIENE solo recibe número enteros'),
            
            (req, res, next) => {
                validatorResult(req, res, next);
            }
    ],
    deleteStock: [
        param('id_material')
            .trim()
            .isInt().withMessage('El ID debe ser un número entero'),

        (req, res, next) =>{
            validatorResult(req, res, next);
        }
    ],
    searchStock: [
        query('search_type')
            .trim()
            .exists()
            .notEmpty().withMessage('El tipo de filtro es obligatorio para buscar en una lista').bail()
            .isIn(['id_material', 'name_material', 'amount_material', 'buy_price_material']).withMessage('El filtro de busqueda es inválido'),

        query('search_value')
            .trim()
            .exists()
            .notEmpty().withMessage('El valor del filtro es obligatorio para buscar en una lista').bail()
            .if(query('search_type').equals('name_material'))
                .isLength({max: 50}).withMessage('El nombre de un stock no puede superar los 50 caracteres')
            .if(query('search_type').not().equals('name_material'))
                .isInt().withMessage('Los campos CANTIDAD - PRECIO - ID solo reciben números enteros'),
            
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
                const findSameName = await Stock.buscarUnMaterial('nameMaterialValidator', req.body.name_material);
                if(findSameName && findSameName.id_material != req.params.id_material) throw new Error('Error: Ya se hay un stock con el mismo nombre en la base de datos');
            }),

        body('description_material')
            .trim()
            .optional()
            .isLength({max: 200}).withMessage('El campo DESCRIPCIÓN recibe un máximo de 200 caracteres').bail(),

        body('buy_price_material')
            .trim()
            .exists()
            .notEmpty().withMessage('El campo PRECIO DE COMPRA es obligatorio').bail()
            .isNumeric().withMessage('El campo PRECIO DE COMPRA solo recibe números enteros o con coma'),

        body('amount_material')
            .trim()
            .exists()
            .notEmpty().withMessage('El campo CANTIDAD es obligatorio').bail()
            .isInt().withMessage('El campo CANTIDAD solo recibe números enteros'),

        body('contains')
            .trim()
            .optional(),

        body('how_much_contains')
            .trim()
            .if(body('contains').equals('on'))
                .exists()
                .notEmpty().withMessage('El campo CUANTO CONTIENE es obligatio en caso de que el stock cuente con algún tipo de contenido').bail()
                .isInt().withMessage('El campo CUNATO CONTIENE solo recibe número enteros'),
            
            (req, res, next) => {
                validatorResult(req, res, next);
            }
    ]
}