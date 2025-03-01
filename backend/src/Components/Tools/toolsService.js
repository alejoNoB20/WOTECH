import { Op } from "sequelize";
import { Tools } from "./toolsModels.js";
import { Products } from '../Products/productsModels.js';
import { try_catch } from "../../utils/try_catch.js";
import { uploadImage, destroyImage } from "../../libs/Cloudinary.js";

export class ToolsService {
    verHerramientas = async (page) => {
        try{
            // CANTIDAD TOTAL DE REGISTROS
            const maxTools = await Tools.count();
            // CANTIDAD DE REGISTROS RENDERIZADOS
            const limit = 6;
            // REGISTROS QUE NO SE MUESTRAN
            const offset = page * 6 - 6;
            
            const resultado = await Tools.findAll({
                where: {
                    disabled: false
                },
                attributes: ['id_tool', 'name_tool', 'img_tool', 'status_tool', 'location_tool'],
                limit,
                offset
            });
            if(resultado.length === 0) return try_catch.SERVICE_TRY_RES({resultado: 'No se encontraron herramientas registradas en la base de datos'}, 404);

            return try_catch.SERVICE_TRY_RES({resultado, maxPage: Math.round(maxTools / limit)}, 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'No se pueden ver las herramientas debido a una falla en el sistema');
        }
    }
    crearHerramienta = async (data) => {
        try{
            let imageError = false;
            if(!data.status_tool) data.status_tool = 'Habilitado';

            // Clodinary Module
            if(!data.img_tool){
                data.img_tool = 'https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png';
            }else {

                const saveImage = await uploadImage(data.img_tool, 'Herramientas');

                if(saveImage.success){
                    data.img_tool = saveImage.msg;
                }else {
                    imageError = true;
                    data.img_tool = 'https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png';
                };
            };

            await Tools.create(data);

            if (!imageError){
                return try_catch.SERVICE_TRY_RES('La creación de la herramienta finalizó exitosmente', 201);
            }else {
                return try_catch.SERVICE_TRY_RES('La creación de la herramienta finalizó exitosamente, pero ocurrió un error al querer guardar la imagen', 500);                
            };

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La creación de la herramienta falló');
        }
    }
    deshabilitarHerramienta = async (id_tool) => {
        try{
            await Tools.update({
                disabled: true
            },{
                where: {
                    id_tool
                }
            });

            return try_catch.SERVICE_TRY_RES('La deshabilitación de la herramienta finalizó exitosamente', 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La deshabilitación de la herramienta falló');
        }
    }
    borrarHerramienta = async (id_tool) => {
        try {
            await Tools.destroy({
                where: {
                    id_tool
                }
            });

            return try_catch.SERVICE_TRY_RES('La eliminación de la herramietna finalizó exitosamente', 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La deshabilitación de la herramienta falló');
        }
    }
    updateTool = async (id_tool, data) => {
        try {
            let imageError = false;
            let beforeUpdateImg;

            // Clodinary Module
            if(!data.img_tool){
                data.img_tool = 'https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png';
            }else {
                const toolUpdate = await Tools.findByPk(id_tool, {
                    attributes: ['img_tool']
                });
                beforeUpdateImg = toolUpdate.img_tool;

                const saveImage = await uploadImage(data.img_tool, 'Herramientas');
                    if(saveImage.success){
                        console.log(saveImage.msg)
                        console.log(beforeUpdateImg)
                        if(beforeUpdateImg !== saveImage.msg){
                            await destroyImage(beforeUpdateImg);
                        };
                        data.img_tool = saveImage.msg;
                    }else {
                        imageError = true;
                        data.img_tool = beforeUpdateImg || 'https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png';
                    };
            };

            await Tools.update(data, {
                where: {
                    id_tool
                }
            });
            
            if(!imageError){
                return try_catch.SERVICE_TRY_RES('La actualización de la herramienta finalizó exitosamente', 200);
            }else {
                return try_catch.SERVICE_TRY_RES('La actualización de la herramienta finalizó exitosamente, pero ocurrió un error al querer guardar la imagen', 500);                
            }

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La actualización de la herramienta falló');
        }
    }
    filtrarHerramienta = async (page = null, type, value) => {
        try {
            let objetoWhere = {};
            
            if (type === 'id_tool' || type === 'status_tool' || type === 'nameToolValidator'){
                if(type === 'nameToolValidator') type = 'name_tool';

                objetoWhere[type] = {
                    [Op.eq]: value
                };
            } else {
                objetoWhere[type] = {
                    [Op.like]: `%${value}%` 
                };
            }
            
            if(page !== null) {
            // CANTIDAD TOTAL DE REGISTROS
            const maxTools = await Tools.count({
                where: objetoWhere
            });
            // CANTIDAD DE REGISTROS RENDERIZADOS
            const limit = 6;
            // REGISTROS QUE NO SE MUESTRAN
            const offset = page * 6 - 6;

            const resultado = await Tools.findAll({
                where: objetoWhere,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: {
                    model: Products,
                    attributes: ['id_product', 'name_product'],
                    through: {
                        attributes: []
                    }
                },
                order: [['disabled', 'ASC']],
                limit,
                offset
            });
            if(resultado.length === 0) return try_catch.SERVICE_TRY_RES({resultado: `No se encontro nada en la base de datos con ${type}: ${value}`}, 404);

            return try_catch.SERVICE_TRY_RES({resultado, maxPage: Math.round(maxTools / limit)}, 200);
    
            };
            const resultado = await Tools.findAll({
                where: objetoWhere,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: {
                    model: Products,
                    attributes: ['id_product', 'name_product'],
                    through: {
                        attributes: []
                    }
                },
                order: [['disabled', 'ASC']]
            })
            if(resultado.length === 0) return try_catch.SERVICE_TRY_RES(`No se encontro nada en la base de datos con ${type}: ${value}`, 404);

            return try_catch.SERVICE_TRY_RES(resultado, 200);
            
        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err);
        }
    }
};