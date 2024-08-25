import { Op } from "sequelize";
import { try_catch } from "../../utils/try_catch.js";
import { Clients } from "./clientsModels.js";

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
        try{
            const resultado = await Clients.create(data);

            return try_catch.SERVICE_TRY_RES(resultado, 201);
        }catch(err){    
            return try_catch.SERVICE_CATCH_RES(err, 500)     
        }
    }
    borrarCliente = async (id) => {
        try {
            const { id_client } = id; 
            
            const resultado = await Clients.update(
                { disabled: 1 },
                { where: { id_client } } // Ahora se usa el valor correcto
            );
            return try_catch.SERVICE_TRY_RES(resultado, 200);
        } catch (err) {
            return try_catch.SERVICE_CATCH_RES(err, 500);
        }
    }
    buscarUno = async (id) => {
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
    actualizarCliente = async (id, newData) => {
        try{
            const resultado = await Clients.update(newData, {
                where: {
                    id_client: id
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
    filtrarBusqueda = async (type, value) => {
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