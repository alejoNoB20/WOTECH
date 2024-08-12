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
                res.status(200).json({ title: "Control de Productos", resultado});
        } catch (err) {
            console.log(err)
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
            res.status(200).json({title: "Producto creado con éxito", resultado});
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
            await Product.actualizarProducto(req.params.id_product, req.body);
            const result = await Product.llamarUnProducto(req.params)
            res.status(200).json({title: "Producto actualizado con éxito", result});
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
                res.status(404).json({title: `Busqueda del ${searchType} con ${searchValue}`, resultado: "No se encontró nada en la base de datos"})
            } else {
                if(searchType === 'id_tool' || searchType === 'id_material'){
                    const flatResult = resultado.result.flat();
                    res.status(200).json({title: `Busqueda del ${searchType} con ${searchValue}`, resultado: flatResult});
                } else {
                    res.status(200).json({title: `Busqueda del ${searchType} con ${searchValue}`, resultado})
                }
            }
        } catch(err) {
            console.log(err);
        }
    }
}