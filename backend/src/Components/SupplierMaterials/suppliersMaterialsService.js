import { supplier_materials_associations } from "./suppliersMaterialsModels.js";
import { try_catch } from "../../utils/try_catch.js";
import { PriceControl } from "./priceControlModels.js";

export class supplierMaterialsService {
    crearMaterial = async (data) => {
        try{
            await supplier_materials_associations.create(data);

            return try_catch.SERVICE_TRY_RES('La creación del material de proveedor finalizó exitosamente', 201); 

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La creación del material de proveedor falló');
        }
    }
    modificarMaterial = async (id_supplier_material, data) => {
        try{
            const material = await supplier_materials_associations.findOne({
                where: {
                    id_supplier_material
                },
                attributes: ['amount_material', 'price_material', 'id_supplier']
            });

            if(material.price_material != data.price_material){
                await PriceControl.create({
                    id_material_supplier_fk: id_supplier_material,
                    register_price_control: material.price_material
                })
            };

            supplier_materials_associations.update(data, {
                where: {
                    id_supplier_material
                }
            });
            

            return try_catch.SERVICE_TRY_RES('La actualización del material de proveedor finalizó exitosamente', 200);
            
        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La actualización del material de proveedor falló');
        }
    }
    deshabilitarMaterial = async (id_supplier_material) => {
        try{
            supplier_materials_associations.update({
                disabled: true
            }, {
                where: {
                    id_supplier_material
                }
            })

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