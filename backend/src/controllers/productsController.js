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
                res.json({ title: "Control Productos", Productos});
            } else {
                res.render('products', { title: "Control Productos", Productos});
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
            // const { name_product, img_product, description_product, tools_needed, materials_needed, choosen_tools, choosen_materials } = req.body;
            console.log(req.body)
            // RESPONSES
            if(req.query.format === 'json'){
                // Response for EndPoint
                const resultado = await Product.crearProducto(req.body);
                res.status(200).json(resultado);
            } else {
                // Response for Web
                // await Product.crearProducto(req.body);
                // res.redirect('/products');
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
}