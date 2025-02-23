import { Op } from "sequelize";
import { Stock } from "./stocksModels.js"
import { Supplier } from "../Suppliers/suppliersModels.js";
import { Products } from "../Products/productsModels.js";
import { try_catch } from "../../utils/try_catch.js";

export class StockService {
    verStock = async (page) => {
        try {
            // CANTIDAD TOTAL DE REGISTROS
            const maxStock = await Stock.count();
            // CANTIDAD DE REGISTROS RENDERIZADOS
            const limit = 6;
            // REGISTROS QUE NO SE MUESTRAN
            const offset = page * 6 - 6;

            const resultado = await Stock.findAll({
                where: {
                    disabled: false
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'description_material']
                },
                limit,
                offset
            });
            if(resultado.length === 0) return try_catch.SERVICE_TRY_RES('No se encontró ningún stock en la base de datos', 404);

            return try_catch.SERVICE_TRY_RES({resultado, maxPage: Math.round(maxStock / limit)}, 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'No se pueden ver todos los materiales debido a un falló en el sistema');
        }
    }
    crearStock = async (datos) => {
        try {
            if(!datos.amount_material) datos.amount_material = 0;
            await Stock.create(datos); 

            return try_catch.SERVICE_TRY_RES('La creación del stock finalizó exitosamente', 201);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La creación del stock falló');
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

            return try_catch.SERVICE_TRY_RES(`La deshabilitación del stock finalizó exitosamente`, 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La deshabilitación del stock falló');
        }
    }
    borrarStock = async (id_material) => {
        try {
            await Stock.destroy({
                where: {
                    id_material
                }
            });

            return try_catch.SERVICE_TRY_RES(`La eliminación del stock con finalizó exitosamente`, 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La eliminación del stock falló');
        }
    }
    actualizarStock = async (id_material, data) => {
        try {
            await Stock.update(data, {
                where: {
                    id_material
                }
            });
            
            return try_catch.SERVICE_TRY_RES(`La actualización del stock finalizó exitosamente`, 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La actualización del stock falló');
        }
    }
    filtrarMaterial = async (page, type, value) => {
        try {  
            let objetoWhere = {};

            if (type === "id_material" || type === 'nameMaterialValidator') {
                if(type === 'nameMaterialValidator') type = 'name_material';

                objetoWhere[type] = {
                    [Op.eq]: value
                }; 
            }else {
                objetoWhere[type] = {
                    [Op.like]: `%${value}%`
                }; 
            }

            // CANTIDAD TOTAL DE REGISTROS
            const maxStock = await Stock.count({
                where: objetoWhere
            });
            // CANTIDAD DE REGISTROS RENDERIZADOS
            const limit = 6;
            // REGISTROS QUE NO SE MUESTRAN
            const offset = page * 6 - 6;

            const resultado = await Stock.findAll({
                where: objetoWhere,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']                        
                },
                include: [
                    {model: Products,
                        attributes: ['id_product', 'name_product'],
                        through: {
                            attributes: ['how_much_contains_use']
                        }
                    },
                    {model: Supplier,
                        attributes: ['id_supplier', 'name_company_supplier', 'tax_address_supplier'],
                        through: {
                            attributes: ['amount_material', 'price_material']
                        }
                    }
                ],
                order: [['disabled', 'ASC']],
                limit,
                offset
            });
            if(resultado.length === 0) return try_catch.SERVICE_TRY_RES(`No se encontró nada en la base de datos con ${type}: ${value}`, 404);

            return try_catch.SERVICE_TRY_RES({resultado, maxPage: Math.round(maxStock / limit)}, 200);            

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err);
        }
    }
};