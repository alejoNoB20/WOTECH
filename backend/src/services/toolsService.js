import { Op } from "sequelize";
import { Tools } from "../models/toolsModels.js";

export class ToolsService {
    verHerramientas = async () => {
        try{
            const resultado = await Tools.findAll();
            return resultado;
        } catch (err) {
            console.log(err);
        }
    }
    verUnaHerramienta = async (where) => {
        try {
            const resultado = await Tools.findOne({where});
            return resultado;
        } catch (err) {
            console.log(err);
        }
    }
    crearHerramienta = async (body) => {
        try{
            body.status_tool = 'Habilitado'
            body.enable_tool = 'true'
            const resultado = await Tools.create(body);
            return resultado;
        } catch (err) {
            console.log(err);
        }
    }
    borrarHerramienta = async (where) => {
        try {
            const resultado = await Tools.destroy({where});
            return resultado;
        } catch (err) {
            console.log(err);
        }
    }
    updateTool = async (idTool, newData) => {
        try {
            const resultado = await Tools.update(newData, {
                where: {
                    id_tool: idTool,
                }
            })
            return resultado;
        } catch (err) {
            console.log(err);
        }
    }
    buscarUnaHerramienta = async (searchValue, searchTool) => {
        try {
            if (searchValue === 'id_tool' || searchValue === 'status_tool'){
                const whereClause = {};
                whereClause[searchValue] = {
                    [Op.eq]: searchTool
                }
                
            const respuesta = await Tools.findAll({
                where: whereClause
            })
            return respuesta
            } else {
                const whereClause = {};
                whereClause[searchValue] = {
                    [Op.like]: `%${searchTool}%` 
                }
                
            const respuesta = await Tools.findAll({
                where: whereClause
            })
            return respuesta
            }
        } catch (err) {
            console.log(err);
        }
    }
};