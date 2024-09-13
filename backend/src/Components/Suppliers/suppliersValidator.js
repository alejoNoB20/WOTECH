import { body, param, query } from 'express-validator';
import { validatorResult } from '../../libs/validationLib.js';
import { supplierService } from './suppliersService.js';
const Supplier = new supplierService();

export const supplierValidator = {
    createSupplier: [
        body('name_company_supplier')
            .trim()
            .exists()
            .notEmpty().withMessage('El campo NOMBRE DE LA COMPANÍA es obligatorio').bail()
            .isLength({max: 100}).withMessage('El campo NOMBRE DE LA COMPANÍA puede contener un máximo de 100 caracteres').bail()
            .custom(async (value, {body}) => {
                const validation = await Supplier.filtrarProveedor('nameCompanyValidation', value);
                if(validation.status == 200) throw new Error ('Ya existe una companía con el mismo nombre');
                return true 
            }),

        body('reason_social_supplier')
            .optional()
            .trim()
            .isLength({max: 150}).withMessage('El campo RAZÓN SOCIAL puede contener un máximo de 150 caracteres'),

        body('cuit_company_supplier')
            .optional()
            .isLength({max: 50}).withMessage('El campo CUIT DE LA COMPANÍA puede contener un máximo de 50 caracteres').bail()
            .custom(async (value, {body}) => {
                const validation = await Supplier.filtrarProveedor('cuitCompanyValidation', value);
                if(validation.status == 200) throw new Error ('Ya existe una companía con el mismo cuit');
                return true 
            }),
        
        body('description_supplier')
            .optional()
            .isLength({max: 255}).withMessage('El campo DESCRIPCION DE LA COMPANÍA puede contener un máximo de 255 caracteres'),

        body('tax_address_supplier')
            .trim()
            .exists()
            .notEmpty().withMessage('El campo DIRECCIÓN DE LA COMPANÍA es obligatorio').bail()
            .isLength({max: 100}).withMessage('El campo DIRECCIÓN DE LA COMPANÍA puede contener un máximo de 100 caracteres'),

        body('number_phone_company_supplier')
            .trim()
            .exists()
            .notEmpty().withMessage('El campo NÚMERO TELEFÓNICO DE LA COMPANÍA es obligatorio').bail()
            .isLength({max: 20}).withMessage('El campo NÚMERO TELEFÓNICO DE LA COMPANÍA puede contener un máximo de 20 caracteres'),

        body('mail_company_supplier')
            .optional()
            .trim()
            .isEmail().withMessage('El formato del campo MAIL DE LA COMPANIA no es válido').bail()
            .isLength({max: 255}).withMessage('El campo MAIL DE LA COMPANÍA puede contener un máximo de 255 caracteres'),

        body('website_company_supplier')
            .optional()
            .trim()
            .isLength({max: 255}).withMessage('El campo SITIO WEB DE LA COMPANÍA puede contener un máximo de 255 caracteres'),

        body('distributor_name_supplier')
            .optional()
            .trim()
            .isLength({max: 80}).withMessage('El campo NOMBRE DEL DISTRIBUIDOR puede contener un máximo de 80 caracteres'),

        body('number_phone_distributor_supplier')
            .optional()
            .trim()
            .isLength({max: 20}).withMessage('El campo NÚMERO TELEFÓNICO DEL DISTRIBUIDOR puede contener un máximo de 20 caracteres'),

        body('mail_distributor_supplier')
            .optional()
            .trim()
            .isEmail().withMessage('El formato del campo MAIL DEL DISTRIBUIDOR no es válido').bail()
            .isLength({max: 255}).withMessage('El campo MAIL DEL DISTRIBUIDO puede contener un máximo de 255 caracteres'),

        body('delivery_days_suppier')
            .optional()
            .trim()
            .isLength({max: 155}).withMessage('El campo DÍAS DE ENTREGA puede contener un máximo de 155 caracteres'),

        body('payment_method_supplier')
            .optional()
            .trim()
            .isIn(['Efectivo', 'Transferencia', 'Débito', 'Crédito']).withMessage('El método de pago no es válido')
            .isLength({max: 155}).withMessage('El campo MÉTODO DE PAGO puede contener un máximo de 155 caracteres'),

        (req, res, next) => {
            validatorResult(req, res, next);
        }
    ],
    updateSupplier: [
        body('name_company_supplier')   
            .trim()
            .exists()
            .notEmpty().withMessage('El campo NOMBRE DE LA COMPANÍA es obligatorio').bail()
            .isLength({max: 100}).withMessage('El campo NOMBRE DE LA COMPANÍA puede contener un máximo de 100 caracteres').bail()
            .custom(async (value, {req}) => {
                const validation = await Supplier.filtrarProveedor('nameCompanyValidation', value);
                if(validation.status == 200 && validation.msg[0].id_supplier != req.params.id_supplier) throw new Error ('Ya existe una companía con el mismo nombre');
                return true 
            }),

        body('reason_social_supplier')
            .optional()
            .trim()
            .isLength({max: 150}).withMessage('El campo RAZÓN SOCIAL puede contener un máximo de 150 caracteres'),

        body('cuit_company_supplier')
            .optional()
            .isLength({max: 50}).withMessage('El campo CUIT DE LA COMPANÍA puede contener un máximo de 50 caracteres').bail()
            .custom(async (value, {body}) => {
                const validation = await Supplier.filtrarProveedor('cuitCompanyValidation', value);
                if(validation.status == 200 && validation.msg[0].id_supplier != req.params.id_supplier) throw new Error ('Ya existe una companía con el mismo cuit');
                return true 
            }),
        
        body('description_supplier')
            .optional()
            .isLength({max: 255}).withMessage('El campo DESCRIPCION DE LA COMPANÍA puede contener un máximo de 255 caracteres'),

        body('tax_address_supplier')
            .trim()
            .exists()
            .notEmpty().withMessage('El campo DIRECCIÓN DE LA COMPANÍA es obligatorio').bail()
            .isLength({max: 100}).withMessage('El campo DIRECCIÓN DE LA COMPANÍA puede contener un máximo de 100 caracteres'),

        body('number_phone_company_supplier')
            .trim()
            .exists()
            .notEmpty().withMessage('El campo NÚMERO TELEFÓNICO DE LA COMPANÍA es obligatorio').bail()
            .isLength({max: 20}).withMessage('El campo NÚMERO TELEFÓNICO DE LA COMPANÍA puede contener un máximo de 20 caracteres'),

        body('mail_company_supplier')
            .optional()
            .trim()
            .isEmail().withMessage('El formato del campo MAIL DE LA COMPANIA no es válido').bail()
            .isLength({max: 255}).withMessage('El campo MAIL DE LA COMPANÍA puede contener un máximo de 255 caracteres'),

        body('website_company_supplier')
            .optional()
            .trim()
            .isLength({max: 255}).withMessage('El campo SITIO WEB DE LA COMPANÍA puede contener un máximo de 255 caracteres'),

        body('distributor_name_supplier')
            .optional()
            .trim()
            .isLength({max: 80}).withMessage('El campo NOMBRE DEL DISTRIBUIDOR puede contener un máximo de 80 caracteres'),

        body('number_phone_distributor_supplier')
            .optional()
            .trim()
            .isLength({max: 20}).withMessage('El campo NÚMERO TELEFÓNICO DEL DISTRIBUIDOR puede contener un máximo de 20 caracteres'),

        body('mail_distributor_supplier')
            .optional()
            .trim()
            .isEmail().withMessage('El formato del campo MAIL DEL DISTRIBUIDOR no es válido').bail()
            .isLength({max: 255}).withMessage('El campo MAIL DEL DISTRIBUIDO puede contener un máximo de 255 caracteres'),

            body('delivery_days_suppier')
            .optional()
            .trim()
            .isLength({max: 155}).withMessage('El campo DÍAS DE ENTREGA puede contener un máximo de 155 caracteres'),

        body('payment_method_supplier')
            .optional()
            .trim()
            .isIn(['Efectivo', 'Transferencia', 'Débito', 'Crédito']).withMessage('El método de pago no es válido')
            .isLength({max: 155}).withMessage('El campo MÉTODO DE PAGO puede contener un máximo de 155 caracteres'),

        (req, res, next) => {
            validatorResult(req, res, next);
        }
    ],
    searchSupplier: [

        query('search_type')
            .exists()
            .notEmpty()
            .isIn(['name_company_supplier', 'distributor_name_supplier']).withMessage('El tipo de filtro no es válido'),

        query('search_value')
            .exists()
            .notEmpty()
            .custom((value, {req}) => {
                if(req.query.search_type === 'name_company_supplier'){
                    if(value.length > 100) throw new Error ('El nombre de la companía puede tener un máximo de 100 caracteres');
                };
                if(req.query.search_type === 'distributor_name_supplier'){
                    if(value.length > 80) throw new Error ('El nombre del distribuidor de la companía puede tener un máximo de 80 caracteres');
                };
                return true
            }),

        (req, res, next) => {
            validatorResult(req, res, next);
        }
    ]
}
