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
            const Productos = await Product.verProductos();
            // VALIDATIONS
            // Tests if DB contains products
            if(Productos.length === 0){
                res.render('products', {title: "Control de productos", Productos, message: "No se encontró ningún registro de Productos en la base de datos"});
            }
            // RESPONSES  
            if (req.query.format === 'json') {
                res.json({ title: "Control de Productos", Productos});
            } else {
                res.render('products', { title: "Control de Productos", Productos});
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
    verAsociaciones = async (req, res) => {
        const resultado = await Product.verAsociacionesProductos();
        res.status(200).json(resultado);
    }
    irAPaginaCrear = async (req, res) => {
        try {
            const Materiales = await Stock.verStock();
            const Herramientas = await Tool.verHerramientas();
            res.render('pushProduct', {title: 'Crear Producto', Materiales, Herramientas})
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
            // RESPONSES
            if(req.query.format === 'json'){
                // Response for EndPoint
                const resultado = await Product.crearProducto(req.body);
                res.status(200).json(resultado);
            } else {
                // Response for Web
                await Product.crearProducto(req.body);
            }
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
    eliminar = async (req, res) => {
        try{
            await Product.eliminarProducto(req.params);
            res.redirect('/products')
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
            res.render('updateProduct', {Producto, Herramientas, Materiales});
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
    prueba = async (req, res) => {
        try{
            const resultado = await Product.pruebas();
            res.status(200).json(resultado);
        } catch(err){
            console.log(err)
        }
    }
    all = async (req, res) => {
        try{
            const tools = await Tool.verHerramientas();
            const stocks = await Stock.verStock();
            res.json({tools, stocks})
        } catch(err) {
            console.log(err);
        }
    }
}