import { Op } from "sequelize";
import { try_catch } from "../../utils/try_catch.js";
import { Clients } from "./clientsModels.js";
import { Orders } from "../Orders/ordersModels.js";

export class clientsService {
    verClientes = async () => {
        try{
            const resultado = await Clients.findAll();
            if(resultado.length <= 0){
                return try_catch.SERVICE_CATCH_RES(resultado, 'No se encontro ningun cliente.', 404)
            }
            return try_catch.SERVICE_TRY_RES(resultado, 200);
        } catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 500)   
        }
    }
    crearCliente = async (data) => {
        try {
            const resultado = await Clients.create(data);
            return try_catch.SERVICE_TRY_RES(resultado, 201);
        } catch (error) {
            
            if(error.parent.errno === 1062){
                return try_catch.SERVICE_CATCH_RES(false, 'El DNI ya existe.', 400);
            }
            return try_catch.SERVICE_CATCH_RES(error, 500);
        }
    }
    
    borrarCliente = async (dni) => {
        try {
            const { dni_client } = dni; 
            
            const resultado = await Clients.update(
                { disabled: 1 },
                { where: { dni_client } } // Ahora se usa el valor correcto
            );

            
            if(resultado[0] === 0){
            return try_catch.SERVICE_CATCH_RES(true, 'DNI no encontrado', 404);

            }
            
            return try_catch.SERVICE_TRY_RES(resultado, 200);
        } catch (err) {
            return try_catch.SERVICE_CATCH_RES(err, 500);
        }
    }
    eliminarCliente = async (id_client) => {
        try{
            const resultado = await Clients.findByPk(id);
            if(!resultado){
                return try_catch.SERVICE_CATCH_RES(resultado, 'No se encontro el cliente.')
            }
            return try_catch.SERVICE_TRY_RES(resultado, 200);
        }catch(err){
            return try_catch.SERVICE_CATCH_RES(err, 500)     
        }
    }
    actualizarCliente = async (dni, newData) => {
        try{
            await Clients.update(data, {
                where: {
                    dni_client: dni
                }
            })
            if(resultado[0] === 1){
                return try_catch.SERVICE_TRY_RES('Cliente actualizado', 200)
            }
            
            return try_catch.SERVICE_CATCH_RES(resultado, 'Error al actualizar el cliente')
            
        }catch(err){
            return try_catch.SERVICE_CATCH_RES(err, 500)     
        }
    }
    filtrarClientes = async (type, value) => {
        try{
            if (type === 'name_client' || type === 'last_name_client' || type === 'type_client'){
                    const objetoWhere = {};
                    objetoWhere[type] = {
                        [Op.like]: `%${value}%`
                    } 
                    const resultado = await Clients.findAll({
                        where: objetoWhere 
                    })
                if(resultado.length === 0){
                    return try_catch.SERVICE_CATCH_RES(404, `No se encontró ningún resultado con "${type}" "${value}"`, 404)
                }
                    return try_catch.SERVICE_TRY_RES(resultado[0].dataValues, 200);
            } else if(type === 'dniClientValidator' || type === 'cuil_or_cuit_client' || type === 'id_client'){
                const resultado = await Clients.findOne({
                    where: {
                        dni_client: value
                    }
                })
                if(resultado.length === 0){
                    return try_catch.SERVICE_CATCH_RES(404, `No se encontró ningún resultado con "${type}" "${value}"`)
                }
                return try_catch.SERVICE_TRY_RES(resultado, 200)
            }  
        }catch(err){
            return try_catch.SERVICE_CATCH_RES(err, 500) 
        }
    }
}