import { body, query } from "express-validator";
import { validatorResult } from "../../libs/validationLib.js";
import { clientsService } from "./clientsService.js";
const Client = new clientsService();

export const clientsValidator = {
    createClient: [
        body('name_client')
            .trim()
            .exists()
            .notEmpty().withMessage('El campo NOMBRE es obligatorio').bail()
            .isLength({max: 100}).withMessage('El campo NOMBRE permite un máximo de 100 caracteres'),

        body('last_name_client')
            .optional()
            .trim()
            .isLength({max: 100}).withMessage('El campo NOMBRE permite un máximo de 100 caracteres'),

        body('dni_client')
            .optional()
            .trim()
            .isLength({min: 8, max: 8}).withMessage('El campo DNI debe contener 8 caracteres').bail()
            .custom(async (value, {req}) => {
                const findSameDNI = await Client.filtrarClientes('dniClientValidator', req.body.dni_client);

                if (findSameDNI.status == 200) throw new Error('El número de DNI ya está registrado');
                return true;
            }),

        body('province_client')
            .trim()
            .exists()
            .notEmpty().withMessage('El campo PROVINCIA es obligatorio').bail()
            .isIn(["Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán"]).withMessage('La provincia seleccionada no es válida'),

        body('direction_client')
            .trim()
            .exists()
            .notEmpty().withMessage('El campo DIRECCIÓN es obligatorio').bail()
            .isLength({max: 100}).withMessage('El campo DIRECCIÓN permite un máximo de 100 caracteres'),

        body('mail_client')
            .optional()
            .isLength({max: 100}).withMessage('El campo MAIL permite un máximo de 100 caracteres').bail()
            .isEmail().withMessage('El formato del campo CORREO ELECTRÓNICO no es válido'),

        body('phone_number_client')
            .trim()
            .exists()
            .notEmpty().withMessage('El campo NÚMERO TELEFÓNICO es obligatorio').bail()
            .isLength({max: 30}).withMessage('El campo NÚMERO TELEFÓNICO permite un máximo de 30 caracteres'),

        body('type_client')
            .trim()
            .exists()
            .notEmpty().withMessage('El campo TIPO DE CLIENTE es obligatorio').bail()
            .isIn(['Empresa', 'Consumidor Final', 'Otro']).withMessage('El TIPO DE CLIENTE no es válido'),

        body('cuil_or_cuit_client')
            .optional()
            .isNumeric().withMessage('El campo CUIL O CUIT DEL CLIENTE solo recibe números enteros').bail()
            .isInt().withMessage('El campo CUIL O CUIT DEL CLIENTE solo recibe números enteros').bail()
            .isLength({min: 11, max: 11}).withMessage('El campo CUIL O CUIT DEL CLIENTE debe contener 11 números'),

        (req, res, next) => {
            validatorResult(req, res, next);
        }
    ],
    updateClient: [
        body('name_client')
            .trim()
            .exists()
            .notEmpty().withMessage('El campo NOMBRE es obligatorio').bail()
            .isLength({max: 100}).withMessage('El campo NOMBRE permite un máximo de 100 caracteres'),

        body('last_name_client')
            .optional()
            .trim()
            .isLength({max: 100}).withMessage('El campo NOMBRE permite un máximo de 100 caracteres'),

        body('dni_client')
            .optional()
            .trim()
            .custom(async (value, {req}) => {
                const findSameDNI = await Client.filtrarClientes('dniClientValidator', req.body.dni_client);
                if(value !== "" && value.length !== 8) throw new Error('El campo DNI debe contener 8 caracteres');
                if (findSameDNI.status == 200 && findSameDNI.msg[0].dni_client != req.body.dni_client) throw new Error('El número de DNI ya está registrado');
                return true;
            }),

        body('province_client')
            .trim()
            .exists()
            .notEmpty().withMessage('El campo PROVINCIA es obligatorio').bail()
            .isIn(["Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán"]).withMessage('La provincia seleccionada no es válida'),

        body('direction_client')
            .trim()
            .exists()
            .notEmpty().withMessage('El campo DIRECCIÓN es obligatorio').bail()
            .isLength({max: 100}).withMessage('El campo DIRECCIÓN permite un máximo de 100 caracteres'),

        body('mail_client')
            .optional()
            .isLength({max: 100}).withMessage('El campo MAIL permite un máximo de 100 caracteres').bail()
            .isEmail().withMessage('El formato del campo CORREO ELECTRÓNICO no es válido'),

        body('phone_number_client')
            .trim()
            .exists()
            .notEmpty().withMessage('El campo NÚMERO TELEFÓNICO es obligatorio').bail()
            .isLength({max: 30}).withMessage('El campo NÚMERO TELEFÓNICO permite un máximo de 30 caracteres'),

        body('type_client')
            .trim()
            .exists()
            .notEmpty().withMessage('El campo TIPO DE CLIENTE es obligatorio').bail()
            .isIn(['Empresa', 'Consumidor Final', 'Otro']).withMessage('El TIPO DE CLIENTE no es válido'),

        body('cuil_or_cuit_client')
            .optional()
            .trim()
            .custom(async (value, {req}) => {
                const findSameCUIT = await Client.filtrarClientes('cuilOrCuitClient', req.body.cuil_or_cuit_client);
                if(value !== "" && value.length !== 11) throw new Error('El campo CUIL O CUIT DEL CLIENTE debe contener 11 números');
                if (findSameCUIT.status == 200 && findSameCUIT.msg[0].cuil_or_cuit_client != req.body.cuil_or_cuit_client) throw new Error('El número de CUIT o CUIL ya está registrado');
                return true;
            }),

        (req, res, next) => {
            validatorResult(req, res, next);
        }
    ],
    searchClient: [
        query('search_type')
            .trim()
            .exists()
            .notEmpty().withMessage('El tipo de filtro es obligatorio para buscar en una lista').bail()
            .isIn(['name_client', 'last_name_client', 'id_client', 'dni_client', 'cuil_or_cuit_client', 'type_client']).withMessage('El filtro de busqueda no es válido'),

        query('search_value')
            .exists()
            .notEmpty().withMessage('El valor del filtro es obligatorio para buscar en una lista').bail()
            .custom((value, {req}) => {
                const clientsType = ['Empresa', 'Consumidor Final', 'Otro'];
                if(req.query.search_type === 'name_client' || req.query.search_type === 'last_name_client'){
                    if(value.length > 100) throw new Error ('Los campos NOMBRE y APELLIDO permite un máximo de 100 caracteres');
                }
                if(req.query.search_type === 'type_client'){
                    if(!clientsType.includes(value)) throw new Error ('El TIPO DE CLIENTE no es válido');
                }
                if(req.query.search_type === 'id_client' || req.query.search_type === 'dni_client' || req.query.search_type === 'cuil_or_cuit_client'){
                    const valueFloat = parseFloat(value);
                    if(!Number.isInteger(valueFloat) || valueFloat < 1) throw new Error ('Los campos ID - DNI - CUIL O CUIT DEL CLIENTE solo reciben números entereros positivos');
                    if(req.query.search_type === 'dni_client' && value.length != 8) throw new Error ('El campo DNI solo permite 8 carateres');
                    if(req.query.search_type === 'cuil_or_cuit_client' && value.length != 13) throw new Error ('El campo CUIL O CUIT DEL CLIENTE solo permite 11 números');
                }
                return true
            }),

        (req, res, next) => {
            validatorResult(req, res, next);
        }
    ]
}