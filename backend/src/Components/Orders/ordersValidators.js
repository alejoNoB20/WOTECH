import { validatorResult } from "../../libs/validationLib.js";
import { body, query } from 'express-validator';

export const ordersValidator = {
    createOrUpdateOrder: [
        body('id_client_fk')
            .exists()
            .notEmpty().withMessage('El campo ID CLIENTE es obligatorio').bail()
            .isNumeric().withMessage('El campo ID CLIENTE tiene que ser un número entero').bail()
            .isInt().withMessage('El campo ID CLIENTE tiene que ser un número entero'),

        body('shipping_address_order')
            .optional()
            .trim()
            .isLength({max: 100}),

        body('delivery_day_order')
            .exists()
            .trim()
            .notEmpty().withMessage('El campo DÍA DE ENTREGA es obligatorio').bail(),

        body('products')
            .exists()
            .notEmpty().withMessage('El campo PRODUCTOS es obligatorio').bail()
            .isArray({min: 1}).withMessage('El campo PRODUCTOS debe contener mínimo un ARRAY').bail()
            .custom((value) => {
                value.forEach(product => {
                    if(typeof product !== "object" || !product.id_product || !product.price_product || !product.unit_product){
                        throw new Error ('El formato del campo PRODUCTOS es inválido');
                    };
                    if(!Number.isInteger(product.id_product) || !Number.isInteger(product.unit_product) || isNaN(product.price_product)){
                        throw new Error ('LOS campos ID - CANTIDAD solo permite números enteros y PRECIO solo números');
                    };
                });
                return true;
            }),
        
        (req, res, next) => {
            validatorResult(req, res, next);
        }
    ],
    searchOrder: [
        query('search_type')
            .exists()
            .notEmpty().withMessage('El TIPO de filtro es obligatirio').bail()
            .isIn(['id_order', 'id_client', 'shipping_address_order', 'delivery_day_order']).withMessage('El tipo de filtro es inválido'),

        query('search_value')
            .exists()
            .notEmpty().withMessage('El VALOR del filtro es obligatorio').bail()
            .custom((value, {req}) => {
                if(req.query.search_type === 'shipping_address_order'){
                    if(value.length > 100) throw new Error ('La DIRECCIÓN DE ENVÍO no puede superar los 100 caracteres');
                };
                if(req.query.search_type === 'delivery_day_order'){
                    const dateValidation = /^[1-9]{1}[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/; 
                    if(!dateValidation.test(value)) throw new Error('El formato de la FECHA DE ENTREGA no es válida');
                };
                if(req.query.search_type === 'id_order' || req.query.search_type === 'id_client'){
                    const valueFloat = parseFloat(value);
                    if(!Number.isInteger(valueFloat) || value < 1) throw new Error('Los campos ID PEDIDO - ID CLIENTE solo reciben números enteros');
                };
                return true
            }),

        (req, res, next) => {
            validatorResult(req, res, next);
        }
    ]
}