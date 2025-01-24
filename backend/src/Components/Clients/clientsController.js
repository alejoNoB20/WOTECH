import { try_catch } from "../../utils/try_catch.js";
import { clientsService } from "./clientsService.js";
const Clients = new clientsService();

export class clientsController {
    verTodos = async (req, res) => {
        try {
            const resultado = await Clients.verClientes(); 
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    detalles = async (req, res) => {
        try{
            const resultado = await Clients.filtrarClientes('id_client', req.params.id_client);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    crear = async (req, res) => {
        try{
            console.log(req.body)
            const resultado = await Clients.crearCliente(req.body);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            return try_catch.CATCH_RES(res, err);
        }
    }
    deshabilitar = async (req, res) => {
        try{
            const respuesta = await Clients.deshabilitarCliente(req.params.id_client);
            try_catch.TRY_RES(res, respuesta);

        }catch(err) {
            return try_catch.CATCH_RES(res, err);
        }
    }
    eliminar = async (req, res) => {
        try{
            const resultado = await Clients.eliminarCliente(req.params.id_client);
            try_catch.TRY_RES(res, resultado);

        }catch(err){
            try_catch.CATCH_RES(res, err);
        }
    }
    actualizar = async (req, res) => {
        try {
            const resultado = await Clients.actualizarCliente(req.params.id_client, req.body);
            try_catch.TRY_RES(res, resultado);
            
        }catch(err){
            try_catch.CATCH_RES(res, err);            
        }
    }
    filtrar = async (req, res) => {
        try{
            const searchType = req.query.search_type;
            const searchValue = req.query.search_value;
            const resultado = await Clients.filtrarClientes(searchType, searchValue);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }        
    }
}