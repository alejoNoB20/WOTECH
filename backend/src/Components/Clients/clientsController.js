import { clientsService } from "./clientsService.js";
import { try_catch } from "../../utils/try_catch.js";
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
    borrar = async (req, res) => {
        try{
            const resultado = await Clients.borrarCliente(req.params);
            return try_catch.TRY_RES(res, {status: 200, msg: `Cliente con ID: ${req.params.id_client} eliminado con éxito`})
        }catch(err){        
            return try_catch.CATCH_RES(res, err)
        }
    }
    paginaActualizar = async (req, res) => {
        try{
            const resultado = await Clients.buscarUno(req.params.id_client);
            return try_catch.TRY_RES(res, resultado)
        }catch(err){
            return try_catch.CATCH_RES(res, err)

        }
    }
    actualizar = async (req, res) => {
        try {
            const resultado = await Clients.actualizarCliente(req.params.id_client, req.body);
            return try_catch.TRY_RES(res, resultado)
        }catch(err){
            return try_catch.CATCH_RES(res, err)
        }
    }
    filtrar = async (req, res) => {
        try{
            const searchType = req.query.search_type;
            const searchValue = req.query.search_value;
            const resultado = await Clients.filtrarBusqueda(searchType, searchValue);
            
            if(resultado.status === 404){
                return try_catch.CATCH_RES(res, {msg: resultado.msg, status: 404})
            }
            return try_catch.TRY_RES(res, {msg:resultado.msg, status: 200})
            
        }catch(err){
            return try_catch.CATCH_RES(res, err)

        }        
    }
}