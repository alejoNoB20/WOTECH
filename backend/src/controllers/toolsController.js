import { ToolsService } from "../services/toolsService.js";
const Tool = new ToolsService();

export class ToolsController {
    verTodasHerramientas = async (req, res) => {
        try {
            const resultado = await Tool.verHerramientas();
            // RESPONSES    
            // For EndPoint
                if (resultado.length === 0){
                    // If it doesn't find any tool in the db
                    res.status(404).json({title: 'No se encontraron herramientas registradas en la base de datos'});
                } else {
                    // If found 
                    res.status(200).json(resultado);
                }
        } catch (err) {
            let errorObject;
            try{
                errorObject = JSON.parse(err.message);
            } catch(errParse){
                errorObject = {message: 'El error no se pudo manejar correctamente', redirect: '/', text: 'Volver al inicio'};
            }
            res.status(400).render('error', {error: errorObject.message, redirect: errorObject.redirect, text: errorObject.text});
        }
    }
    pushHerramienta = async (req, res) => {
        try {
            const resultado = await Tool.crearHerramienta(req.body);
            res.status(200).json(resultado);
        }catch (err) {
            let errorObject;
            try{
                errorObject = JSON.parse(err.message);
            } catch(errParse){
                errorObject = {message: 'El error no se pudo manejar correctamente', redirect: '/', text: 'Volver al inicio'};
            }
            res.status(400).render('error', {error: errorObject.message, redirect: errorObject.redirect, text: errorObject.text});
        }    
    }
    deleteHerramienta = async (req, res) => {
        // RESPONSES
        try {
            await Tool.borrarHerramienta(req.params);
                // Response for EndPoint
                res.status(200).json({title: `El elemento con ID: ${req.params.id_tool} ha sido eliminado correctamente`})
        } catch (err) {
            let errorObject;
            try{
                errorObject = JSON.parse(err.message);
            } catch(errParse){
                errorObject = {message: 'El error no se pudo manejar correctamente', redirect: '/', text: 'Volver al inicio'};
            }
            res.status(400).render('error', {error: errorObject.message, redirect: errorObject.redirect, text: errorObject.text});
        }
    }
    // irActualizarHerramienta = async (req, res) => {
    //     try {
    //         const resultado = await Tool.verUnaHerramienta(req.params);
    //             res.render('updateTool', {title: "Modificar producto", resultado});
    //     } catch (err) {
    //         let errorObject;
    //         try{    
    //             errorObject = JSON.parse(err.message);
    //         } catch(errParse){
    //             errorObject = {message: 'El error no se pudo manejar correctamente', redirect: '/', text: 'Volver al inicio'};
    //         }
    //         res.status(400).render('error', {error: errorObject.message, redirect: errorObject.redirect, text: errorObject.text});
    //     }
    // }
    actualizarHerramienta = async (req, res) => {
        try {
            const idTool = req.params.id_tool;

            const newData = await Tool.updateTool(idTool, req.body);
            res.status(200).json({'Datos nuevos': newData});
        } catch (err) {
            console.log(err)
        }
    }
    buscarHerramienta = async (req, res) => {
        try{
            const searchType = req.query.search_type;
            const searchValue = req.query.search_value;
            const resultado = await Tool.buscarUnaHerramienta(searchType, searchValue);
            // REPONSES
                // Response for EndPoint
                if (resultado.length === 0) {
                    // if the searched product doesn't exist in the DB
                    res.status(200).json({title: `Busqueda encontrada con ${searchType}: ${searchValue}`, resultado: `No se encontró nada con "${searchValue}" en la base de datos`});
                } else {
                    // if the searched product exist in the DB
                    res.status(200).json({title: `Busqueda encontrada con ${searchType}: ${searchValue}`, resultado});
                }
        } catch (err) {
            console.log(err);
        }
    }
}
