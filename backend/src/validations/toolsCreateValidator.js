import {body, param, query} from 'express-validator';
import { validatorResult } from '../libs/validationLib.js';
import { ToolsService } from "../services/toolsService.js";
const Tool = new ToolsService();

export const toolsValidations = {
    createTool: [
        body('name_tool').trim().exists().notEmpty().withMessage('El campo nombre es obligatorio, no puede estar vacío').isLength({max: 50}).withMessage('El nombre de la herramienta puede tener un máximo de 50 caracteres').custom(async value => {
            const findTheSameName = await Tool.buscarUnaHerramienta('nameToolValidator', value);
            if (findTheSameName) throw new Error('Error: ya se encuentra registrada una herramienta con el mismo nombre');}),
        body('location_tool').trim().exists().notEmpty().withMessage('La localización de la herramienta es un campo obligatorio'),
        (req, res, next) => {
            validatorResult(req, res, next);
    }],
    deleteTool: [
        param('id_tool', 'El ID es incorrecto').isInt(),
        (req, res, next) => {
            validatorResult(req, res, next);
        }
    ],
    updateTool: [
        param('id_tool', 'El ID es incorrecto').isInt().bail(),
        body('name_tool').trim().exists().notEmpty().withMessage('El campo nombre es obligatorio, no puede estar vacío').isLength({max: 50}).withMessage('El nombre de la herramienta puede tener un máximo de 50 caracteres').custom(async (value, {req}) => {
            const findTheSameName = await Tool.buscarUnaHerramienta('nameToolValidator', value);
            if (findTheSameName && findTheSameName.id_tool != req.params.id_tool) throw new Error('Error: ya se encuentra registrada una herramienta con el mismo nombre');}).bail(),
        body('description_tool').trim().optional().isLength({max: 100}).withMessage('El campo de la descripcion puede tener un máximo de 100 caracteres').bail(),
        body('status_tool').exists().notEmpty().isIn(['Habilitado', 'En Arreglo', 'Roto', 'Perdido']).withMessage('El estado de la herramienta es incorrecta'),
        body('repair_shop_tool').if(body('status_tool').equals('En Arreglo')).bail().trim().exists().notEmpty().withMessage('Si la herramienta se encuentra en arreglo el campo "Donde se está arreglando" es obligatorio').bail(),
        body('repair_date_tool').if(body('status_tool').equals('En Arreglo')).bail().trim().exists().notEmpty().withMessage('Si la herramienta se encuentra en arreglo el campo "Cuando se llevo a reparar" es obligatorio').isDate().withMessage('El formato de "Cuando se llevo a reparar" debe ser de fecha').bail(),
        body('search_repair_tool').if(body('status_tool').equals('En Arreglo')).bail().trim().exists().notEmpty().withMessage('Si la herramienta se encuentra en arreglo el campo "Cuando ir a buscar" es obligatorio').isDate().withMessage('El formato de "Cuando ir a buscar" debe ser de fecha').bail(),
        body('location_tool').trim().exists().notEmpty().withMessage('La localización de la herramienta es un campo obligatorio').bail(),
        (req, res, next) => {
            validatorResult(req, res, next);
        }
    ],
    searchTool: [
        query('search_type').exists().notEmpty().isIn(['id_tool', 'name_tool', 'status_tool', 'location_tool', 'repair_shop_tool']).custom(value => {
            if(value === 'id_tool'){
                query('search_value').isInt().withMessage('El ID solo recibe números enteros');
            }
        }).withMessage('Tipo de busqueda inválido'),
        query('search_value').exists().notEmpty().isLength({max: 50}).withMessage('Valor de la herramienta busqueda inválida'),
        (req, res, next) => {
            validatorResult(req, res, next);
        }
    ]
};