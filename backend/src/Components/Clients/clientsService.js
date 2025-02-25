import { Op } from "sequelize";
import { try_catch } from "../../utils/try_catch.js";
import { Clients } from "./clientsModels.js";
import { Orders } from "../Orders/ordersModels.js";

export class clientsService {
    verClientes = async (page) => {
        try{
            // CANTIDAD TOTAL DE REGISTROS
            const maxClients = await Clients.count();
            // CANTIDAD DE REGISTROS RENDERIZADOS
            const limit = 6;
            // REGISTROS QUE NO SE MUESTRAN
            const offset = page * 6 - 6;

            const resultado = await Clients.findAll({
                where: {
                    disabled: false
                },
                attributes: ['id_client', 'name_client', 'last_name_client', 'type_client'],
                limit,
                offset
            });
            if(resultado.length === 0) return try_catch.SERVICE_TRY_RES({resultado: 'No se encontraron clientes registrados en la base de datos'}, 404);

            return try_catch.SERVICE_TRY_RES({resultado, maxPage: Math.round(maxClients / limit)}, 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'No se pueden ver los clientes debido a una falla en el sistema');    
        }
    }
    crearCliente = async (data) => {
        try{
            await Clients.create(data);

            return try_catch.SERVICE_TRY_RES('La creación del cliente finalizó exitosamente', 201);
        }catch(err) {    
            return try_catch.SERVICE_CATCH_RES(err, 'La creación del cliente falló');
        }
    }
    deshabilitarCliente = async (id_client) => {
        try{
            await Clients.update({
                disabled: true
            }, {
                where: {
                    id_client
                }
            });

            return try_catch.SERVICE_TRY_RES('La deshabilitación del cliente termino exitosamente', 200)

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La deshabilitación del cliente falló');
        }
    }
    eliminarCliente = async (id_client) => {
        try{
            await Clients.destroy({
                where: {
                    id_client
                }
            });

            return try_catch.SERVICE_TRY_RES('La eliminación del cliente finalizó exitosamente', 200);

        }catch(err){
            return try_catch.SERVICE_CATCH_RES(err, 'La eliminación del cliente falló')
        }
    }
    actualizarCliente = async (id_client, data) => {
        try{
            await Clients.update(data, {
                where: {
                    id_client
                }
            })

            return try_catch.SERVICE_TRY_RES('La actualización del cliente finalizó exitosamente', 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La actualización del cliente falló');  
        }
    }
    filtrarClientes = async (page = null, type, value) => {
        try{
            let objetoWhere = {};
            if (type === 'name_client' || type === 'last_name_client'){
                    objetoWhere[type] = {
                        [Op.like]: `%${value}%`
                    } 
            }else {
                if(type === 'dniClientValidator') type = 'dni_client';
                objetoWhere[type] = {
                    [Op.eq]: value
                };
                if(type === 'cuilOrCuitClient') type = 'cuil_or_cuit_client';
                objetoWhere[type] = {
                    [Op.eq]: value
                };
            };
            if(page !== null){
                // CANTIDAD TOTAL DE REGISTROS
                const maxClients = await Clients.count();
                // CANTIDAD DE REGISTROS RENDERIZADOS
                const limit = 6;
                // REGISTROS QUE NO SE MUESTRAN
                const offset = page * 6 - 6;

                const resultado = await Clients.findAll({
                    where: objetoWhere,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: {
                        model: Orders,
                        attributes: ['id_order', 'delivery_day_order']
                    },
                    limit,
                    offset
                });
                if(resultado.length === 0) return try_catch.SERVICE_TRY_RES({resultado: `No se encontro nada en la base de datos con ${type}: ${value}`}, 404);
    
                return try_catch.SERVICE_TRY_RES({resultado, maxPage: Math.round(maxClients / limit)}, 200);    
            };

            const resultado = await Clients.findAll({
                where: objetoWhere,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: {
                    model: Orders,
                    attributes: ['id_order', 'delivery_day_order']
                }
            })
            if(resultado.length === 0) return try_catch.SERVICE_TRY_RES(`No se encontro nada en la base de datos con ${type}: ${value}`, 404);

            return try_catch.SERVICE_TRY_RES(resultado, 200);
            
        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err);
        }
    }
}