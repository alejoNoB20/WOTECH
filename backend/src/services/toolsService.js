import { Op } from "sequelize";
import { Tools } from "../models/toolsModels.js";
import { try_catch } from "../../utils/try_catch.js";

export class ToolsService {
    verHerramientas = async () => {
        try{
            const resultado = await Tools.findAll({
                order: [['disabled', 'ASC']],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            });
            if(resultado.length === 0) return {status: 404, success: false, msg: 'No se encontraron herramientas registradas en la base de datos'};

            return try_catch.SERVICE_TRY_RES(resultado);

        } catch (err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    crearHerramienta = async (data) => {
        try{
            const resultado = await Tools.create(data)
            if(!resultado) throw new Error ('La herramienta no se pudo crear debido a un error en el servidor');

            return try_catch.SERVICE_TRY_RES(resultado);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    borrarHerramienta = async (id_tool) => {
        try {
            const resultado = await Tools.destroy({
                where: {
                    id_tool
                }
            });
            if(!resultado) throw new Error ('La herramienta no se pudo eliminar debido a un error en el servidor');

            return try_catch.SERVICE_TRY_RES(`La herramienta con ID: ${id_tool} fue eliminada con éxito`);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    updateTool = async (id_tool, data) => {
        try {
            const toolUpdate = await Tools.update(data, {
                where: {
                    id_tool
                }
            })
            if(!toolUpdate) throw new Error ('La herramienta no se pudo actualizar debido a un error en el servidor');

            const respuesta = await Tools.findOne({
                where: {id_tool},
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            });

            return try_catch.SERVICE_TRY_RES(respuesta);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    filtrarHerramienta = async (type, value) => {
        try {
            if (type === 'id_tool' || type === 'status_tool' || type === 'nameToolValidator'){
                const objetoWhere = {};
                objetoWhere[type] = {
                    [Op.eq]: value
                };
                
                const respuesta = await Tools.findAll({
                    where: objetoWhere,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                })

                return try_catch.SERVICE_TRY_RES(respuesta);

            } else {
                const objetoWhere = {};
                objetoWhere[type] = {
                    [Op.like]: `%${value}%` 
                };
                
            const respuesta = await Tools.findAll({
                where: objetoWhere,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            });

                return try_catch.SERVICE_TRY_RES(respuesta);

            };

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
};