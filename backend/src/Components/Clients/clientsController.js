import { try_catch } from "../../utils/try_catch.js";
import { clientsService } from "./clientsService.js";
const Clients = new clientsService();

export class clientsController {
    verTodos = async (req, res) => {
        try {
            const resultado = await Clients.verClientes(); 
            return try_catch.TRY_RES(res, resultado)
        }catch (err) {
            return try_catch.CATCH_RES(res, err)
        }
    }
    crear = async (req, res) => {
        try{
            const resultado = await Clients.crearCliente(req.body);
            return try_catch.TRY_RES(res, resultado)
        } catch(err){
            return try_catch.CATCH_RES(res, err)
        }
    }
    deshabilitar = async (req, res) => {
        try{
            const resultado = await Clients.borrarCliente(req.params.dni_client);
            
            return try_catch.TRY_RES(res, resultado)
        }catch(err){        
            return try_catch.CATCH_RES(res, err)
        }
    }
    eliminar = async (req, res) => {
        try{
            const resultado = await Clients.eliminarCliente(req.params.dni_client);

            return try_catch.TRY_RES(res, resultado)
        }catch(err){
            return try_catch.CATCH_RES(res, err)

        }
    }
    actualizar = async (req, res) => {
        try {
            const resultado = await Clients.actualizarCliente(req.params.dni_client, req.body);
            
            return try_catch.TRY_RES(res, resultado)
        }catch(err){
            return try_catch.CATCH_RES(res, err)
        }
    }
    filtrar = async (req, res) => {
        try{
            const searchType = req.query.search_type;
            const searchValue = req.query.search_value;
            const resultado = await Clients.filtrarClientes(searchType, searchValue);
            
            if(resultado.status === 404){
                return try_catch.CATCH_RES(res, {msg: resultado.msg, status: 404})
            }
            return try_catch.TRY_RES(res, {msg:resultado.msg, status: 200})
            
        }catch(err){
            return try_catch.CATCH_RES(res, err)

        }        
    }
}