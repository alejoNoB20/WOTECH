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
            for(const supplierStock of data){
                await supplierStockAssociations.create(supplierStock);
            }

            return try_catch.SERVICE_TRY_RES('La creación del material de proveedor finalizó exitosamente', 201); 

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La creación del material de proveedor falló');
        }
    }
    modificarMaterial = async (id_supplier_fk, data) => {
        try {
            // Obtener los materiales asociados al proveedor
            const materialAssociation = await supplierStockAssociations.findAll({
                where: { id_supplier_fk },
            });
    
            // Preparar las promesas para las actualizaciones y creaciones
            const updatePromises = [];
            const createPromises = [];
            const disabledMaterials = new Set(materialAssociation.map((mat) => mat.id_material_fk));
    
            for (const material of data) {
                const { name_material, ...usingUpdatedData } = material;
                const materialFilter = materialAssociation.find(
                    (mat) => mat.id_material_fk === material.id_material_fk
                );
    
                if (materialFilter) {
                    const { id_supplier_material, ...usingData } = materialFilter.dataValues;
    
                    // Verificar cambios
                    if (JSON.stringify(usingData) !== JSON.stringify(usingUpdatedData)) {
                        if (usingData.price_material !== usingUpdatedData.price_material) {
                            updatePromises.push(
                                PriceControl.create({
                                    id_material_supplier_fk: id_supplier_material,
                                    register_price_control: usingData.price_material,
                                })
                            );
                        }
    
                        updatePromises.push(
                            supplierStockAssociations.update(usingUpdatedData, {
                                where: { id_supplier_material },
                            })
                        );
                    }
    
                    // Eliminar del conjunto de materiales deshabilitados
                    disabledMaterials.delete(material.id_material_fk);
                } else {
                    // Crear nuevo material
                    createPromises.push(supplierStockAssociations.create(material));
                }
            }
    
            // Deshabilitar los materiales restantes que no están en `data`
            for (const id_material_fk of disabledMaterials) {
                updatePromises.push(
                    supplierStockAssociations.update(
                        { disabled: true },
                        { where: { id_material_fk } }
                    )
                );
            }
    
            // Ejecutar todas las promesas
            await Promise.all([...updatePromises, ...createPromises]);
    
            return try_catch.SERVICE_TRY_RES(
                'La actualización del material de proveedor finalizó exitosamente',
                200
            );
        } catch (err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La actualización del material de proveedor falló');
        }
    };
    deshabilitarMaterial = async (id_supplier_material) => {
        try{
            await supplierStockAssociations.update({
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