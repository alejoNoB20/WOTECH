import { supplierStockAssociations } from "./suppliersMaterialsModels.js";
import { try_catch } from "../../utils/try_catch.js";
import { PriceControl } from "./priceControlModels.js";
import { Stock } from "../Stock/stocksModels.js";

export class supplierMaterialsService {
    verMaterialesAsociados = async (id_supplier_fk) => {
        try{
            const Associations = await supplierStockAssociations.findAll({
                where: {
                    id_supplier_fk,
                    disabled: false
                },
                attributes: {
                    exclude: ['id_supplier_fk']
                }
            });
            if(Associations.length === 0) return try_catch.SERVICE_TRY_RES('Este proveedor aún no tiene materiales asociados', 404);

            for(const association of Associations){
                const nameMaterial = await Stock.findByPk(association.id_material_fk, {
                    attributes: ['name_material']
                });
                association.dataValues.name_material = nameMaterial.name_material;
            };

            return try_catch.SERVICE_TRY_RES(Associations, 200); 

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'No se pueden ver los materiales asociados debido a una falla en el sistema');
        }
    }
    crearMaterial = async (data) => {
        try{
            await supplierStockAssociations.create(data);

            return try_catch.SERVICE_TRY_RES('La creación del material de proveedor finalizó exitosamente', 201); 

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La creación del material de proveedor falló');
        }
    }
    modificarMaterial = async (id_supplier_material_fk, data) => {
        try{
            const material = await supplierStockAssociations.findOne({
                where: {
                    id_supplier_material_fk
                },
                attributes: ['amount_material', 'price_material', 'id_supplier_fk']
            });

            if(material.price_material != data.price_material){
                await PriceControl.create({
                    id_material_supplier_fk,
                    register_price_control: material.price_material
                })
            };

            supplierStockAssociations.update(data, {
                where: {
                    id_supplier_material_fk
                }
            });
            

            return try_catch.SERVICE_TRY_RES('La actualización del material de proveedor finalizó exitosamente', 200);
            
        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La actualización del material de proveedor falló');
        }
    }
    deshabilitarMaterial = async (id_supplier_material) => {
        try{
            supplierStockAssociations.update({
                disabled: true
            }, {
                where: {
                    id_supplier_material
                }
            });

            return try_catch.SERVICE_TRY_RES('La deshabilitación del material de proveedor finalizó exitosamente', 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La deshabilitación del material de proveedor falló');
        }
    }
    verControlDePrecios = async (id_material_supplier_fk) => {
        try{
            const resultado = await PriceControl.findAll({
                where: {
                    id_material_supplier_fk
                },
                attributes: ['id_price_control', 'register_price_control', 'createdAt']
            });
            if(resultado.length === 0) return try_catch.SERVICE_TRY_RES('Este producto no cuenta con precios actualizados', 404);

            return try_catch.SERVICE_TRY_RES(resultado, 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err);
        }
    } 
}