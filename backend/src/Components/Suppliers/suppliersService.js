import { Supplier } from "./suppliersModels.js";
import { try_catch } from "../../utils/try_catch.js";
import { Op, where } from "sequelize";
import { Stock } from "../Stock/stocksModels.js";

export class supplierService {
    verProveedores = async (page) => {
        try{
            // CANTIDAD TOTAL DE REGISTROS
            const maxSupplier = await Supplier.count();
            // CANTIDAD DE REGISTROS RENDERIZADOS
            const limit = 6;
            // REGISTROS QUE NO SE MUESTRAN
            const offset = page * 6 - 6;

            const resultado = await Supplier.findAll({
                where: {
                    disabled: false
                },
                attributes: ['id_supplier', 'name_company_supplier', 'number_phone_company_supplier', 'tax_address_supplier', 'distributor_name_supplier', 'number_phone_distributor_supplier'],
                limit,
                offset
            });
            if(resultado.length === 0) return try_catch.SERVICE_TRY_RES({resultado: 'No se encontró ningún proveedor en la base de datos'}, 404);

            return try_catch.SERVICE_TRY_RES({resultado, maxPage: Math.round(maxSupplier / limit)}, 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'No se pueden ver los proveedores debido a una falla en el sistema');
        }
    }
    crearProveedor = async (data) => {
        try{
            await Supplier.create(data);

            return try_catch.SERVICE_TRY_RES('La creación del proveedor finalizó exitosamente', 201);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La creación del proveedor falló');
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

            return try_catch.SERVICE_TRY_RES(`La deshabilitación del proveedor finalizó exitosamente`, 200); 

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La deshabilitación del proveedor falló');
        }
    }
    borrarProveedor = async (id_supplier) => {
        try{
            await Supplier.destroy({
                where: {
                    id_supplier
                }
            });

            return try_catch.SERVICE_TRY_RES(`La eliminación del proveedor finalizó exitosamente`, 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La elimación del proveedor falló');
        }
    }
    actualizarProveedor = async (id_supplier, data) => {
        try{
            await Supplier.update(data, {
                where: {
                    id_supplier
                }
            });

            return try_catch.SERVICE_TRY_RES(`La actualización del proveedor finalizó exitosamente`, 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La actualización del proveedor falló');
        }
    }
    filtrarProveedor = async (page, type, value) => {
        try{
            let objetoWhere = {};
            if (type === 'id_supplier' || type === 'nameCompanyValidation' || type === 'cuitCompanyValidation'){
                if(type === 'nameCompanyValidation') type = 'name_company_supplier';
                if(type === 'cuitCompanyValidation') type = 'cuit_company_supplier';
                objetoWhere[type] = {
                    [Op.eq]: value
                }
            }else {
                objetoWhere[type] = {
                    [Op.like]: `%${value}%`
                }
            };

            if(page !== null){
                // CANTIDAD TOTAL DE REGISTROS
                const maxSupplier = await Supplier.count({
                    where:objetoWhere
                });
                // CANTIDAD DE REGISTROS RENDERIZADOS
                const limit = 6;
                // REGISTROS QUE NO SE MUESTRAN
                const offset = page * 6 - 6;
                
                const resultado = await Supplier.findAll({
                    where: objetoWhere,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: {
                        model: Stock,
                        attributes:["id_material", "name_material"],
                    },
                    order: [['disabled', 'ASC']],
                    limit,
                    offset
                });
                if(resultado.length === 0) return try_catch.SERVICE_TRY_RES({resultado: `No se encontró nada en la base de datos con ${type}: ${value}`}, 404);
    
                return try_catch.SERVICE_TRY_RES({resultado, maxPage: Math.round(maxSupplier / limit)}, 200);
    
            }
            const resultado = await Supplier.findAll({
                where: objetoWhere,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: {
                    model: Stock,
                    attributes:["id_material", "name_material"],
                },
                order: [['disabled', 'ASC']]
            });
            if(resultado.length === 0) return try_catch.SERVICE_TRY_RES(`No se encontró nada en la base de datos con ${type}: ${value}`, 404);

            return try_catch.SERVICE_TRY_RES(resultado, 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err);
        }
    }
}