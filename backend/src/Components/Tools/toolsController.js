import { ToolsService } from "./toolsService.js";
import { try_catch } from "../../utils/try_catch.js"; 
const Tool = new ToolsService();

// ---EXAMPLE 1---
// {
//     "name_tool": "Destornillador",
//     "description_tool": "Destornillador plano",
//     "status_tool": "En Arreglo", 
//     "location_tool": "Pared Derecha",
//     "repair_shop_tool": "Calle Random123",
//     "repair_date_tool": "2024-06-03", 
//     "search_repair_tool": "2024-07-03",
//     "disabled": false
// }

// ---EXAMPLE 2---
// {
//     "name_tool": "Destornillador",
//     "description_tool": "Destornillador plano",
//     "status_tool": "Habilitado", 
//     "location_tool": "Pared Derecha",
//     "repair_shop_tool": null,
//     "repair_date_tool": null, 
//     "search_repair_tool": null,
//     "disabled": false
// }

export class ToolsController {
    verTodasHerramientas = async (req, res) => {
        try {
            const resultado = await Tool.verHerramientas();
            try_catch.TRY_RES(res, resultado);
            
        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    detallesHerramienta = async (req, res) => {
        try {
            const resultado = await Tool.filtrarHerramienta('id_tool', req.params.id_tool);
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
    deshabilitar = async (req, res) => {
        try{
            const respuesta = await Tool.deshabilitarHerramienta(req.params.id_tool);
            try_catch.TRY_RES(res, respuesta);

        }catch(err) {
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
}
