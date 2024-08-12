import { Op } from "sequelize";
import { Tools } from "./toolsModels.js";
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
            if(resultado.length === 0) return try_catch.SERVICE_CATCH_RES(resultado, 'No se encontraron herramientas registradas en la base de datos', 404);

            return try_catch.SERVICE_TRY_RES(resultado, 302);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    crearHerramienta = async (data) => {
        try{
            const resultado = await Tools.create(data)
            if(!resultado) return try_catch.SERVICE_CATCH_RES(resultado, 'La herramienta no se pudo crear debido a un error en el servidor');

            return try_catch.SERVICE_TRY_RES(resultado, 201);

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
            if(!resultado) return try_catch.SERVICE_CATCH_RES(resultado, 'La herramienta no se pudo eliminar debido a un error en el servidor');

            return try_catch.SERVICE_TRY_RES(`La herramienta con ID: ${id_tool} fue eliminada con éxito`, 200);

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
            if(!toolUpdate) return try_catch.SERVICE_CATCH_RES(toolUpdate, 'La herramienta no se pudo actualizar debido a un error en el servidor');

            const respuesta = await Tools.findOne({
                where: {id_tool},
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            });

            return try_catch.SERVICE_TRY_RES(respuesta, 200);

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
                if(!respuesta) return try_catch.SERVICE_CATCH_RES(respuesta, `No se encontra nada en la base de datos con ${type}: ${value}`, 404);

                return try_catch.SERVICE_TRY_RES(respuesta, 302);

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
                if(!respuesta) return try_catch.SERVICE_CATCH_RES(respuesta, `No se encontra nada en la base de datos con ${type}: ${value}`, 404);

                return try_catch.SERVICE_TRY_RES(respuesta, 302);

            };

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    deshabilitarHerramienta = async (id_tool) => {
        try{
            const toolUpdate = await Tools.findByPk(id_tool);
            if(!toolUpdate) return try_catch.SERVICE_CATCH_RES(toolUpdate, 'La herramienta no ha sido encontrada debido a un error en el servidor');

            const respuesta = await Tools.update({
                disabled: true
            },{
                where: {
                    id_tool
                }
            });
            if(!respuesta) return try_catch.SERVICE_CATCH_RES(respuesta, 'No se pudo desabilitar la herramienta devido a un error en el servidor');

            return try_catch.SERVICE_TRY_RES(`La herramienta ID: ${id_tool} ha sido desabilitada con éxito`, 200);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
};