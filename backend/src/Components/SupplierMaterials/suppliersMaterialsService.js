import { supplier_materials_associations } from "./suppliersMaterialsModels.js";
import { try_catch } from "../../utils/try_catch.js";

export class supplierMaterialsService {
    crearMaterial = async (data) => {
        try{
            const resultado = await supplier_materials_associations.create(data);

            return try_catch.SERVICE_TRY_RES(resultado, 201); 

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    modificarMaterial = async (id_supplier_material, data) => {
        try{
            supplier_materials_associations.update(data, {
                where: {
                    id_supplier_material
                }
            });

            const resultado = await supplier_materials_associations.findOne({
                where: {
                    id_supplier_material
                },
                attributes: ['amount_material', 'price_material', 'id_supplier']
            });

            return try_catch.SERVICE_TRY_RES(resultado, 200);
            
        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    borrarMaterial = async (id_supplier_material) => {
        try{
            supplier_materials_associations.destroy(data, {
                where: {
                    id_supplier_material
                }
            });

            return try_catch.SERVICE_TRY_RES(`El material del proveedor ha sido eliminado con éxito`, 200);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
}