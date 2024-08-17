import { Op } from "sequelize";
import { Stock } from "./stocksModels.js"
import { try_catch } from "../../utils/try_catch.js";

export class StockService {
    verStock = async () => {
        try {
            const resultado = await Stock.findAll({
                where: {
                    disabled: false
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'description_material']
                }
            });
            if(resultado.length === 0) return try_catch.SERVICE_CATCH_RES(resultado, 'No se encontró ningún stock en la base de datos', 404);

            return try_catch.SERVICE_TRY_RES(resultado, 302);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    crearStock = async (datos) => {
        try {
            if(!datos.amount_material) datos.amount_material = 0;
            const resultado = await Stock.create(datos); 

            return try_catch.SERVICE_TRY_RES(resultado, 201);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    actualizarStock = async (id_material, data) => {
        try {
            await Stock.update(data, {
                where: {
                    id_material
                }
            });

            const resultado = await this.filtrarMaterial('id_material', id_material);
            
            return try_catch.SERVICE_TRY_RES(resultado.msg, 200);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    deshabilitarStock = async (id_material) => {
        try{
            await Stock.update({
                disabled: true
            }, {
                where: {
                    id_material
                }
            });

            return try_catch.SERVICE_TRY_RES(`El stock con ID: ${id_material} se deshabilito con éxito`, 200);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    borrarStock = async (id_material) => {
        try {
            await Stock.destroy({
                where: {
                    id_material
                }
            });

            return try_catch.SERVICE_TRY_RES(`El stock con ID: ${id_material} fue eliminado con éxito`, 200);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    filtrarMaterial = async (type, value) => {
        try {  
            if (type === "name_material") {
                const resultado = await Stock.findAll({
                    where: {
                        name_material: `%${value}%`
                    },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']                        
                    }  
                });
                if(resultado.length === 0) return try_catch.SERVICE_CATCH_RES(resultado, `No se encontró nada en la base de datos con ${type}: ${value}`, 404);
                
                return try_catch.SERVICE_TRY_RES(resultado, 302);

            }else {
                if(type === 'nameMaterialValidator') type = 'name_material';

                const objetoWhere = {}
                objetoWhere[type] = {
                    [Op.eq]: value
                }; 

                const resultado = await Stock.findAll({
                    where: objetoWhere,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']                        
                    } 
                });
                if(resultado.length === 0) return try_catch.SERVICE_CATCH_RES(resultado, `No se encontró nada en la base de datos con ${type}: ${value}`, 404);

                return try_catch.SERVICE_TRY_RES(resultado, 302);

            }
            
        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
};