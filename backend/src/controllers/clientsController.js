import { clientsService } from "../services/clientsService.js";
const Clients = new clientsService();

export class clientsController {
    verTodos = async (req, res) => {
        try {
            const resultado = await Clients.verClientes(); 
            if (resultado.length === 0){
                res.render('clients', {title: 'Control de clientes', message: 'No se encontró ningun cliente en la base de datos'});
            } else {
                res.render('clients', {title: 'Control de clientes', resultado})
            }
        }catch (err) {
            let errorObject = null;
            try{
                errorObject = JSON.parse(err.message);
            } catch(errParse){
                errorObject = {message: 'El error no se pudo manejar correctamente', redirect: '/', text: 'Volver al inicio'};
            }
            res.status(400).render('error', {error: errorObject.message, redirect: errorObject.redirect, text: errorObject.text});
        }
    }
    crear = async (req, res) => {
        try{
            await Clients.crearCliente(req.body);
            res.redirect('/clients');
        } catch(err){
            let errorObject = null;
            try{
                errorObject = JSON.parse(err.message);
            } catch(errParse){
                errorObject = {message: 'El error no se pudo manejar correctamente', redirect: '/', text: 'Volver al inicio'};
            }
            res.status(400).render('error', {error: errorObject.message, redirect: errorObject.redirect, text: errorObject.text});
        }
    }
    borrar = async (req, res) => {
        try{
            await Clients.borrarCliente(req.params);
            res.redirect('/clients');
        }catch(err){
            let errorObject = null;
            try{
                errorObject = JSON.parse(err.message);
            } catch(errParse){
                errorObject = {message: 'El error no se pudo manejar correctamente', redirect: '/', text: 'Volver al inicio'};
            }
            res.status(400).render('error', {error: errorObject.message, redirect: errorObject.redirect, text: errorObject.text});            
        }
    }
    paginaActualizar = async (req, res) => {
        try{
            const buscarCliente = await Clients.buscarUno(req.params.id_client);
            res.render('updateClient', {title: 'Actualizar cliente', buscarCliente})
        }catch(err){
            let errorObject = null;
            try{
                errorObject = JSON.parse(err.message);
            } catch(errParse){
                errorObject = {message: 'El error no se pudo manejar correctamente', redirect: '/', text: 'Volver al inicio'};
            }
            res.status(400).render('error', {error: errorObject.message, redirect: errorObject.redirect, text: errorObject.text});               
        }
    }
    actualizar = async (req, res) => {
        try {
            await Clients.actualizarCliente(req.params.id_client, req.body);
            res.redirect('/clients');
        }catch(err){
            let errorObject = null;
            try{
                errorObject = JSON.parse(err.message);
            } catch(errParse){
                errorObject = {message: 'El error no se pudo manejar correctamente', redirect: '/', text: 'Volver al inicio'};
            }
            res.status(400).render('error', {error: errorObject.message, redirect: errorObject.redirect, text: errorObject.text});               
        }
    }
    filtrar = async (req, res) => {
        try{
            const searchType = req.query.search_type;
            const searchValue = req.query.search_value;
            const resultado = await Clients.filtrarBusqueda(searchType, searchValue);

            if(resultado.length === 0){
                res.render('browserClients', {title: `Resultado encontrado con "${searchType}" "${searchValue}"`, searchValue})
            } else {
                res.render('browserClients', {title: `Resultado encontrado con "${searchType}" "${searchValue}"`, resultado})
            }
        }catch(err){
            let errorObject = null;
            try{
                errorObject = JSON.parse(err.message);
            } catch(errParse){
                errorObject = {message: 'El error no se pudo manejar correctamente', redirect: '/', text: 'Volver al inicio'};
            }
            res.status(400).render('error', {error: errorObject.message, redirect: errorObject.redirect, text: errorObject.text});               
        }        
    }
}