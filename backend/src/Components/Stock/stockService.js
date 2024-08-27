import { Op } from "sequelize";
import { Stock } from "./stocksModels.js"
import { Supplier } from "../Suppliers/suppliersModels.js";
import { Products } from "../Products/productsModels.js";
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
            if(resultado.length === 0) return try_catch.SERVICE_CATCH_RES(resultado, 'No se encontró ningún stock en la base de datos', 204);

            return try_catch.SERVICE_TRY_RES(resultado, 200);

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
                order: [['disabled', 'ASC']] 
            });
            if(resultado.length === 0) return try_catch.SERVICE_CATCH_RES(resultado, `No se encontró nada en la base de datos con ${type}: ${value}`, 204);

            return try_catch.SERVICE_TRY_RES(resultado, 200);
            
        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
};