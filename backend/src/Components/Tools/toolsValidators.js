import { body, query } from 'express-validator';
import { validatorResult } from '../../libs/validationLib.js';
import { ToolsService } from "./toolsService.js";
const Tool = new ToolsService();

export const toolsValidations = {
    createTool: [
        body('name_tool')
            .trim()
            .exists()
            .notEmpty().withMessage('El campo nombre es obligatorio, no puede estar vacío').bail()
            .isLength({max: 50}).withMessage('El nombre de la herramienta puede tener un máximo de 50 caracteres').bail()
            .custom(async (value, {req}) => {
                const findTheSameName = await Tool.filtrarHerramienta('nameToolValidator', req.body.name_tool);
                if (findTheSameName.status == 302) throw new Error('Error: ya se encuentra registrada una herramienta con el mismo nombre');
                return true;
            }),

        body('location_tool')
            .trim()
            .exists()
            .notEmpty().withMessage('La localización de la herramienta es un campo obligatorio'),

        (req, res, next) => {
            validatorResult(req, res, next);
    }],
    updateTool: [
        body('name_tool')
            .trim()
            .exists()
            .notEmpty().withMessage('El campo nombre es obligatorio, no puede estar vacío').bail()
            .isLength({max: 50}).withMessage('El nombre de la herramienta puede tener un máximo de 50 caracteres').bail()
            .custom(async (value, {req}) => {
                const findTheSameName = await Tool.filtrarHerramienta('nameToolValidator', req.body.name_tool);
                if (findTheSameName.status == 302 && findTheSameName.msg[0].id_tool != req.params.id_tool) throw new Error('Error: ya se encuentra registrada una herramienta con el mismo nombre');
                return true
            }),

        body('status_tool')
            .exists()
            .notEmpty().withMessage('El campo ESTADO DE LA HERRAMIENTA es obligatorio').bail()
            .isIn(['Habilitado', 'En Arreglo', 'Inhabilitado', 'Perdido']).withMessage('El estado de la herramienta no es válido'),

        body('repair_shop_tool')
            .if((value, {req}) => req.body.status_tool === 'En Arreglo').bail()
                .trim()
                .exists()
                .notEmpty().withMessage('Si la herramienta se encuentra en arreglo el campo "Donde se está arreglando" es obligatorio'),

        body('repair_date_tool')
            .if((value, {req}) => req.body.status_tool === 'En Arreglo').bail()
                .exists()
                .notEmpty().withMessage('Si la herramienta se encuentra en arreglo el campo "Cuando se llevo a reparar" es obligatorio').bail()
                .isDate().withMessage('El formato de "Cuando se llevo a reparar" debe ser de fecha'),

        body('search_repair_tool')
            .if((value, {req}) => req.body.status_tool === 'En Arreglo').bail()
                .exists()
                .notEmpty().withMessage('Si la herramienta se encuentra en arreglo el campo "Cuando ir a buscar" es obligatorio').bail()
                .isDate().withMessage('El formato de "Cuando ir a buscar" debe ser de fecha'),

        body('location_tool')
            .trim()
            .exists()
            .notEmpty().withMessage('La localización de la herramienta es un campo obligatorio').bail(),

        (req, res, next) => {
            validatorResult(req, res, next);
        }
    ],
    searchTool: [
        query('search_type')
            .exists()
            .notEmpty()
            .isIn(['id_tool', 'name_tool', 'status_tool', 'location_tool', 'repair_shop_tool']).withMessage('El tipo de filtro no es válido'),

        query('search_value')
            .exists()
            .notEmpty()
            .custom((value, {req}) => {
                if(req.query.search_type === 'name_tool'){
                    if(value.length > 50) throw new Error ('El nombre de la herramienta puede tener un máximo de 50 caracteres');
                };
                if(req.query.search_type === 'description_tool' || req.query.search_type === 'repair_shop_tool'){
                    if(value.length > 255) throw new Error ('La descripción de la herramienta puede tener un máximo de 255 caracteres');
                };
                if(req.query.search_type === 'location_tool'){
                    if(value.length > 100) throw new Error ('La ubicación de la herramienta puede tener un máximo de 100 caracteres');
                };
                if(req.query.search_type === 'status_tool'){
                    if(value != 'Habilitado' && value != 'En Arreglo' && value != 'Inhabilitado' && value != 'Perdido') throw new Error ('El estado de la herramienta no es válido');
                };
                if(req.query.search_type === 'id_tool'){
                    const value_float = parseFloat(value);
                    if(!Number.isInteger(value_float) || value < 1) throw new Error ('El ID de la herramienta solo puede ser un número');
                };
                return true
            }),

        (req, res, next) => {
            validatorResult(req, res, next);
        }
    ]
};