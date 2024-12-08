import { validatorResult } from '../../libs/validationLib.js';
import { query, body } from 'express-validator';
import { productsService } from './productsService.js';
const Product = new productsService();

export const productValidator = {
    createProduct: [
        body('name_product')
            .trim()
            .exists()
            .notEmpty().withMessage('El campo NOMBRE es obligatorio').bail()
            .isLength({max: 80}).withMessage('El NOMBRE permite un máximo de 80 caracteres')
            .custom(async (value, {req}) => {
                const findTheSame = await Product.filtrarProducto('nameProductValidator', req.body.name_product);
                if(findTheSame.status === 200) throw new Error ('Ya existe un producto con el mismo nombre');
                return true
            }),
        
        body('img_product')
            .optional(),

        body('description_product')
            .optional()
            .isLength({max: 100}).withMessage('El campo DESCRIPCIÓN permite un máxmio de 100 caracteres'),

        body('price_product')
            .exists()
            .notEmpty().withMessage('El campo PRECIO es obligatorio').bail()
            .isNumeric().withMessage('El campo PRECIO solo recibe números'),

        body('materials')
            .exists()
            .notEmpty().withMessage('El campo MATERIALES es obligatorio').bail()
            .isArray({min: 1}).withMessage('El campo MATERIALES recibe un arreglo con objetos').bail()
            .custom((value, {req}) => {
                value.forEach(material => {
                    if(typeof material !== 'object' || !material.id || !material.how_much_content) throw new Error('El campo MATERIALES no es válido');
                    if(!Number.isInteger(material.id) || material.id < 1 || !Number.isInteger(material.how_much_content) || material.how_much_content < 1) throw new Error('El ID y CONTENIDO solo reciben números enteros positivos');
                })
                return true
            }),
        
        body('tools')
            .exists()
            .notEmpty().withMessage('El campo HERRAMIENTAS es obligatorio').bail()
            .isArray({min: 1}).withMessage('El campo HERRAMIENTAS recibe un arreglo con números').bail()
            .custom((value, {req}) => {
                value.forEach(tool => {
                    if(!Number.isInteger(tool) || tool < 1) throw new Error('El campo HERRAMIENTAS solo recibe números enteros positivos');
                })
                return true
            }),

        (req, res, next) => {
            validatorResult(req, res, next);
        }
    ],
    updateProduct: [
        body('name_product')
            .trim()
            .exists()
            .notEmpty().withMessage('El campo NOMBRE es obligatorio').bail()
            .isLength({max: 80}).withMessage('El NOMBRE permite un máximo de 80 caracteres')
            .custom(async (value, {req}) => {
                const findTheSameName = await Product.filtrarProducto('nameProductValidator', req.body.name_product);
                if(findTheSameName.status === 200 && findTheSameName.msg[0].id_product != req.params.id_product) throw new Error ('Ya existe un producto con el mismo nombre');
                return true
            }),
        
        body('img_product')
            .optional(),

        body('description_product')
            .optional()
            .isLength({max: 100}).withMessage('El campo DESCRIPCIÓN permite un máxmio de 100 caracteres'),

        body('price_product')
            .exists()
            .notEmpty().withMessage('El campo PRECIO es obligatorio').bail()
            .isNumeric().withMessage('El campo PRECIO solo recibe números'),

        body('materials')
            .exists()
            .notEmpty().withMessage('El campo MATERIALES es obligatorio').bail()
            .isArray({min: 1}).withMessage('El campo MATERIALES recibe un arreglo con objetos').bail()
            .custom((value, {req}) => {
                value.forEach(material => {
                    if(typeof material !== 'object' || !material.id || !material.how_much_content) throw new Error('El campo MATERIALES no es válido');
                    if(!Number.isInteger(material.id) || material.id < 1 || !Number.isInteger(material.how_much_content) || material.how_much_content < 1) throw new Error('El ID y CONTENIDO solo reciben números enteros positivos');
                })
                return true
            }),
        
        body('tools')
            .exists()
            .notEmpty().withMessage('El campo HERRAMIENTAS es obligatorio').bail()
            .isArray({min: 1}).withMessage('El campo HERRAMIENTAS recibe un arreglo con números').bail()
            .custom((value, {req}) => {
                value.forEach(tool => {
                    if(!Number.isInteger(tool) || tool < 1) throw new Error('El campo HERRAMIENTAS solo recibe números enteros positivos');
                })
                return true
            }),

        (req, res, next) => {
            validatorResult(req, res, next);
        }
    ],
    searchProduct: [
        query('search_type')
            .trim()
            .exists()
            .notEmpty().withMessage('El tipo de filtro es obligatorio para buscar en una lista').bail()
            .isIn(['name_product', 'id_product']).withMessage('El tipo de filtro no es válido'),

        query('search_value')
            .exists()
            .notEmpty().withMessage('El valor del filtro es obligatorio para buscar en una lista').bail()
            .custom((value, {req}) => {
                if(req.query.search_type === 'name_product'){
                    if(value.length > 80) throw new Error('El NOMBRE permite un máximo de 80 caracteres');
                } 
                if(req.query.search_type === 'id_product' || req.query.search_type === 'id_material' || req.query.search_type === 'id_tool'){
                    const number = parseFloat(value);
                    if(!Number.isInteger(number) || number < 1) throw new Error('El valor del filtro no es válido');
                }
                return true
            }),

        (req, res, next) => {
            validatorResult(req, res, next);
        }
    ]
}