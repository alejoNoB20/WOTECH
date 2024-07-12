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
            const {name_product, img_product, description_product, tools, materials} = req.body
            //VALIDATIONS 
            if (name_product.length === 0) {
                throw new Error(JSON.stringify({message: `El campo "NOMBRE DEL PRODUCTO" es obligatorio`, redirect: '/products', text: 'Volver a Productos'}));
            }
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
            res.render('updateProduct', {title: `Actualizar el producto: "${Producto.name_product}"`, Producto, Herramientas, Materiales});
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
            console.log(req.params, req.body)
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
}