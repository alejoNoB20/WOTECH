import { Supplier } from "./suppliersModels.js";
import { try_catch } from "../../utils/try_catch.js";
import { supplier_materials_associations } from "../SupplierMaterials/suppliersMaterialsModels.js";
import { Stock } from "../Stock/stocksModels.js";

export class supplierService {
    verProveedores = async () => {
        try{
            const resultado = await Supplier.findAll({
                where: {
                    disabled: false
                },
                attributes: ['id_supplier', 'name_company_supplier', 'tax_address_supplier', 'distributor_name_supplier', 'number_phone_distributor_supplier']
            });
            if(resultado.length === 0) return try_catch.SERVICE_CATCH_RES(resultado, 'No se encontró ningún proveedor en la base de datos', 404);

            return try_catch.SERVICE_TRY_RES(resultado, 302);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    crearProveedor = async (data) => {
        try{
            const resultado = await Supplier.create(data);

            return try_catch.SERVICE_TRY_RES(resultado, 201);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    deshabilitarProveedor = async (id_supplier) => {
        try{
            await Supplier.update({
                disabled: true
            }, {
                where: {
                    id_supplier 
                }
            });

            return try_catch.SERVICE_TRY_RES(`El proveedor con ID: ${id_supplier} fue deshabilitado con éxito`, 200); 

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    borrarProveedor = async (id_supplier) => {
        try{
            await Supplier.destroy({
                where: {
                    id_supplier
                }
            });

            return try_catch.SERVICE_TRY_RES(`El proveedor con ID: ${id_supplier} fue eliminado con éxito`, 200);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    actualizarProveedor = async (id_supplier, data) => {
        try{
            await Supplier.update(data, {
                where: {
                    id_supplier
                }
            });

            const resultado = await Supplier.findOne({
                where: {
                    id_supplier
                },
                attributes: {
                    exclude: ['createdAt', 'updateAt']
                }
            });

            return try_catch.SERVICE_TRY_RES(resultado, 200);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    filtrarProveedor = async (type, value) => {
        try{
            let resultado = null;
            if (type === 'id_supplier'){
                resultado = await Supplier.findAll({
                    where: {
                        id_supplier: value
                    },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: {
                        model: Stock,
                        attributes:["id_material", "name_material"],
                        through: {
                            attributes: ['amount_material', 'price_material', 'id_supplier']
                        }
                    }
                });
            };

            if(resultado.length === 0) return try_catch.SERVICE_CATCH_RES(resultado, `No se encontró nada en la base de datos con ${type}: ${value}`, 404);

            return try_catch.SERVICE_TRY_RES(resultado, 302);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
}