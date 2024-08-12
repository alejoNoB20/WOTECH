import { ToolsService } from "./toolsService.js";
import {try_catch} from "../../utils/try_catch.js"; 
const Tool = new ToolsService();

export class ToolsController {
    verTodasHerramientas = async (req, res) => {
        try {
            const resultado = await Tool.verHerramientas();
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    pushHerramienta = async (req, res) => {
        try {
            const resultado = await Tool.crearHerramienta(req.body);
            try_catch.TRY_RES(res, resultado);

        }catch (err) {
            try_catch.CATCH_RES(res, err);
        }    
    }
    deleteHerramienta = async (req, res) => {
        try {
            const resultado = await Tool.borrarHerramienta(req.params.id_tool);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    irActualizarHerramienta = async (req, res) => {
        try {
            const resultado = await Tool.filtrarHerramienta('id_tool', req.params.idTool);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    actualizarHerramienta = async (req, res) => {
        try {
            const resultado = await Tool.updateTool(req.params.id_tool, req.body);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    buscarHerramienta = async (req, res) => {
        try{
            const type = req.query.search_type;
            const value = req.query.search_value;

            const resultado = await Tool.filtrarHerramienta(type, value);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    deshabilitar = async (req, res) => {
        try{
            const respuesta = await Tool.deshabilitarHerramienta(req.params.id_tool);
            try_catch.TRY_RES(res, respuesta);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
}
