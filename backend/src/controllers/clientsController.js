import { clientsService } from "../services/clientsService.js";
const Clients = new clientsService();

export class clientsController {
    verTodos = async (req, res) => {
        try {
            const resultado = await Clients.verClientes(); 
            if (resultado.length === 0){
                res.status(404).json({title: 'Control de clientes', message: 'No se encontró ningun cliente en la base de datos'});
            } else {
                res.status(200).json({title: 'Control de clientes', resultado})
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
            const resultado = await Clients.crearCliente(req.body);
            res.status(200).json({title: 'Cliente creado con éxito', resultado});
        } catch(err){
            console.log(err);
        }
    }
    borrar = async (req, res) => {
        try{
            await Clients.borrarCliente(req.params);
            res.status(200).json({title: `Cliente con ID: ${req.params.id_client} eliminado con éxito`});
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
            const resultado = await Clients.buscarUno(req.params.id_client);
            res.status(200).json({title: 'Actualizar cliente', resultado})
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
            const resultado = await Clients.actualizarCliente(req.params.id_client, req.body);
            res.status(200).json({title: 'Cliente actualizado correctamente', resultado});
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
                res.status(404).json({title: `No se encontró ningún resultado con "${searchType}" "${searchValue}"`})
            } else {
                res.status(200).json({title: `Resultado encontrado con "${searchType}" "${searchValue}"`, resultado})
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