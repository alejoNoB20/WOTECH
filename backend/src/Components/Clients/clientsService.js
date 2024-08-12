import { Op, where } from "sequelize";
import { Clients } from "./clientsModels.js";

export class clientsService {
    verClientes = async () => {
        try{
            const resultado = await Clients.findAll();
            return resultado;
        } catch(err) {
            console.log(err)    
        }
    }
    crearCliente = async (data) => {
        try{
            const resultado = await Clients.create(data);
            return resultado;
        }catch(err){    
            console.log(err)    
        }
    }
    borrarCliente = async (where) => {
        try{
            await Clients.destroy({where})
        }catch(err){
            console.log(err)    
        }
    }
    buscarUno = async (id) => {
        try{
            const resultado = await Clients.findByPk(id);
            return resultado;
        }catch(err){
            console.log(err)    
        }
    }
    actualizarCliente = async (id, newData) => {
        try{
            const resultado = await Clients.update(newData, {
                where: {
                    id_client: id
                }
            })
            return resultado;
        }catch(err){
            console.log(err)    
        }
    }
    filtrarBusqueda = async (type, value) => {
        try{
            if (type === 'name_client' || type === 'last_name_client'){
                    const objetoWhere = {};
                    objetoWhere[type] = {
                        [Op.like]: `%${value}%`
                    } 
                    const resultado = await Clients.findAll({
                        where: objetoWhere
                    })
                    return resultado;
            } else if(type === 'dniClientValidator'){
                const resultado = await Clients.findOne({
                    where: {
                        dni_client: value
                    }
                })
                return resultado
            } else {
                const objetoWhere = {};
                objetoWhere[type] = {
                    [Op.eq]: value
                } 
                const resultado = await Clients.findAll({
                    where: objetoWhere
                })
                return resultado;
            }
            
        }catch(err){
            console.log(err)
        }
    }
}