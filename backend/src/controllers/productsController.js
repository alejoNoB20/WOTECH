import { productsService } from "../services/productsService.js";
import { StockService } from "../services/stockService.js";
import { ToolsService } from "../services/toolsService.js";
import '../models/productStocksModels.js';
import '../models/productToolsModels.js';
const Stock = new StockService();
const Tool = new ToolsService();
const Product = new productsService();

export class productsController {
    verTodos = async (req, res) => {
        try {
            const resultado = await Product.verProductos();
            if(resultado.length === 0){
                res.status(404).json({title: "Control de productos", message: "No se encontró ningún registro de Productos en la base de datos"});
            } else {
                res.status(200).json({ title: "Control de Productos", resultado});
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
    irAPaginaCrear = async (req, res) => {
        try {
            const Materiales = await Stock.verStock();
            const Herramientas = await Tool.verHerramientas();
            res.status(200).json({title: 'Crear Producto', Materiales, Herramientas})
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
    crear = async (req, res) => {
        try {
            const resultado = await Product.crearProducto(req.body);
            res.status(200).json(resultado);
        }catch (err) {
            console.log(err)
        }
    }
    eliminar = async (req, res) => {
        try{
            await Product.eliminarProducto(req.params);
            res.status(200).json({title: `El producto con ID: ${req.params.id_product} fue eliminado con éxito`})
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
    irPaginaActualizar = async (req, res) => {
        try {
            const Producto = await Product.llamarUnProducto(req.params);
            const Materiales = await Stock.verStock();
            const Herramientas = await Tool.verHerramientas();
            res.status(200).json(Producto, Herramientas, Materiales);
        } catch(err){
            let errorObject;
            try{
                errorObject = JSON.parse(err.message);
            } catch(errParse){
                errorObject = {message: 'El error no se pudo manejar correctamente', redirect: '/', text: 'Volver al inicio'};
            }
            res.status(400).render('error', {error: errorObject.message, redirect: errorObject.redirect, text: errorObject.text});            
        }
    }
    actualizar = async (req, res) => {
        try{
            await Product.actualizarProducto(req.params, req.body);  
            const resultado = await Product.llamarUnProducto(req.params)
            res.status(200).json({title: `El producto N° "${req.params.id_product}" fue actualizaco con éxito`, resultado});
        } catch(err) {
            console.log(err)
        }
    }
    filtrarBusqueda = async (req, res) => {
        try{
            const searchType = req.query.search_type;
            const searchValue = req.query.search_value;

            const resultado = await Product.resultadoBusquedaFiltrada(searchType, searchValue);
            if (resultado.length === 0){
                switch (searchType) {
                    case 'name_product':
                        res.render('browserProduct', {title: `Resultado encontrado con "Nombre del producto": "${searchValue}"`, resultado, searchValue});                
                        break;
                        case 'id_product':
                            res.render('browserProduct', {title: `Resultado encontrado con "ID": "${searchValue}"`, resultado, searchValue});                                    
                            break;
                    case 'id_tool':
                        res.render('browserProduct', {title: `Resultado encontrado con "Herramientas que usa": "${searchValue}"`, resultado, searchValue});                
                        break;
                    case 'id_material':
                        res.render('browserProduct', {title: `Resultado encontrado con "Materiales que usa": "${searchValue}"`, resultado, searchValue});                
                        break;
                    }
                } else {
                    if(searchType === 'id_tool'){
                    const flatResult = resultado.result.flat();
                    res.render('browserProduct', {title: `Resultado encontrado con "${resultado.tool.name_tool}"`, resultado: flatResult});
                } else if (searchType === 'id_material') {    
                    const flatResult = resultado.result.flat();
                    res.render('browserProduct', {title: `Resultado encontrado con "${resultado.material.name_material}"`, resultado: flatResult});
                } else {
                    res.render('browserProduct', {title: `Resultado encontrado con "${searchValue}"`, resultado});
                }
            }
        } catch(err) {
            let errorObject;
            try{
                errorObject = JSON.parse(err.message);
            } catch(errParse){
                errorObject = {message: 'El error no se pudo manejar correctamente', redirect: '/', text: 'Volver al inicio'};
            }
            res.status(400).render('error', {error: errorObject.message, redirect: errorObject.redirect, text: errorObject.text});         
        }
    }
}