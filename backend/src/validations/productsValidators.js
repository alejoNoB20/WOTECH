import {validatorResult} from '../libs/validationLib.js';
import {body, param, query} from 'express-validator';
import { productsService } from '../services/productsService.js';
import { StockService } from '../services/stockService.js';
import { ToolsService } from '../services/toolsService.js';
const Stock = new StockService();
const Product = new productsService();
const Tool = new ToolsService();

export const productValidator = {
    createTool:[
        body('name_product')
            .trim()
            .notEmpty().withMessage('El campo NOMBRE es obligatorio').bail()
            .isLength({max: 80}).withMessage('El campo NOMBRE permite un máximo de 80 caracteres').bail()
            .custom(async (value, {req}) => {
                const findSameName = await Product.resultadoBusquedaFiltrada('nameProductValidator',req.body.name_product);
                if(findSameName) throw new Error('Ya existe un producto con el mismo nombre');
            }),

        body('img_product')
            .optional(),

        body('description_product')
            .optional()
            .isLength({max: 200}).withMessage('El campo DESCRIPCION permite un máximo de 200 caracteres'),

        body('price_product')
            .exists()
            .notEmpty().withMessage('El campo PRECIO DEL PRODUCTO es obligatorio').bail()
            .isNumeric().withMessage('El campo PRECIO DEL PRODUCTO solo recibe números')
            .custom(value => {
                if (value < 0) throw new Error('El campo PRECIO DE PRODUCTO solo recibe números enteros y positivos');
                return true;
            }),

        body('tools')
            .exists()
            .isArray({min: 1}).withMessage('El campo HERRAMIENTAS es obligatorio').bail()
            .custom(value => {
                value.forEach(id_tool => {
                    if(!Number.isInteger(id_tool) || id_tool < 0){
                        throw new Error('Los elementos del campo HERRAMIENTAS solo reciben números enteros positivos');
                    }
                })
                return true
            }),

        body('materials')
            .exists()
            .notEmpty().withMessage('El campo MATERIALES es obligatorio').bail()
            .isArray({min: 1}).withMessage('El campo MATERIALES debe devolver un objeto')
            .custom(value => {
                value.forEach(objMaterial => {
                    if(typeof objMaterial !== 'object' || !objMaterial.id || !objMaterial.how_much_content){
                        throw new Error('El campo MATERIAL no es válido, este solo recibe objetos con ID (N° entero positivo) y HOW_MUCH_CONTENT (N° entero positivo)');
                    }

                    if((!Number.isInteger(objMaterial.id) || objMaterial.id < 0) || (!Number.isInteger(objMaterial.how_much_content) || objMaterial.how_much_content < 0)){
                        throw new Error('El campo MATERIAL no es válido, este solo recibe objetos con ID (N° entero positivo) y HOW_MUCH_CONTENT (N° entero positivo)')
                    }
                })
                return true
            }),

        (req, res, next) => {
            validatorResult(req, res, next);
        }
    ], 
    updateTool: [
        param('id_product')
            .isInt().withMessage('El ID es incorrecto'),

        body('name_product')
            .trim()
            .notEmpty().withMessage('El campo NOMBRE es obligatorio').bail()
            .isLength({max: 80}).withMessage('El campo NOMBRE permite un máximo de 80 caracteres').bail()
            .custom(async (value, {req}) => {
                const findSameName = await Product.resultadoBusquedaFiltrada('nameProductValidator', req.body.name_product);
                if (findSameName && findSameName.id_product != req.params.id_product) throw new Error('Ya se encuentra registrada una herramienta con el mismo nombre').bail();
        }),

        body('img_product')
            .optional(),

        body('description_product')
            .optional()
            .isLength({max: 200}).withMessage('El campo DESCRIPCION permite un máximo de 200 caracteres'),

        body('price_product')
            .exists()
            .notEmpty().withMessage('El campo PRECIO DEL PRODUCTO es obligatorio').bail()
            .isNumeric().withMessage('El campo PRECIO DEL PRODUCTO solo recibe números')
            .custom(value => {
                if (value < 0) throw new Error('El campo PRECIO DE PRODUCTO solo recibe números enteros y positivos');
                return true;
            }),

        body('tools')
            .exists()
            .notEmpty().withMessage('El campo HERRAMIENTAS es obligatorio').bail()
            .isArray({min: 1})
            .custom(value => {
                value.forEach(id_tool => {
                    if(!Number.isInteger(id_tool) || id_tool < 0){
                        throw new Error('Los elementos del campo HERRAMIENTAS solo reciben números enteros positivos');
                    }
                })
                return true
            }),

        body('materials')
            .exists()
            .notEmpty().withMessage('El campo MATERIALES es obligatorio').bail()
            .isArray({min: 1}).withMessage('El campo MATERIALES debe devolver un objeto')
            .custom(value => {
                value.forEach(objMaterial => {
                    if(typeof objMaterial !== 'object' || !objMaterial.id || !objMaterial.how_much_content){
                        throw new Error('El campo MATERIAL no es válido, este solo recibe objetos con ID (N° entero positivo) y HOW_MUCH_CONTENT (N° entero positivo)');
                    }

                    if((!Number.isInteger(objMaterial.id) || objMaterial.id < 0) || (!Number.isInteger(objMaterial.how_much_content) || objMaterial.how_much_content < 0)){
                        throw new Error('El campo MATERIAL no es válido, este solo recibe objetos con ID (N° entero positivo) y HOW_MUCH_CONTENT (N° entero positivo)')
                    }
                })
                return true
            }),
        
        (res, req, next) => {
            validatorResult(req, res, next);
        }
    ]
}