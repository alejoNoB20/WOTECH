import {StockService} from "../services/stockService.js";
import Handlebars from "handlebars";
export const stock = new StockService();

export class StockController {
    agregarStock = (req,res) => {
        try{
            res.render('pushStock', {title: "Crear Nuevo Stock"})
        } catch(err){
            console.log(err);
        }
    }
    crear = async (req, res) => {
        try {
            const resultado = await stock.crearStock(req.body);
            res.redirect('/stock');
        }catch (err) {
            console.log(err);
        }
    }
    verTodos = async (req, res) => {
        try {
            const resultado = await stock.verStock();
            res.render('stock', {title: "Control Stock", resultado})
        } catch(err) {
            console.log(err);
        }
    }
    irActualizarStock = async (req, res) => {
        try {
            const productoACambiar = await stock.verUnStock(req.params);
            res.render('updateStock', {title: "Modificar producto", productoACambiar})
        } catch(err){
            console.log(err);
        }
    }
    actualizar = async (req, res) => {
        try {
            const idProduct = req.params.id_product;
            const newData = req.body;
            const {id_product, ...data} = newData;
            const resultado = await stock.actualizarStock(idProduct, data);
            res.redirect('/stock');
        } catch(err){
            console.log(err);
        }
    }
    verUno = async (req, res) => {
        try {
            const resultado = await stock.verUnStock(req.params);
        } catch(err) {
            console.log(err);
        }
    }
    borrar = async (req,res) => {
        try {
            const resultado = await stock.borrarStock(req.params);
            res.redirect('/stock');
        } catch(err) {
            console.log(err);
        }
    }
    buscarUno = async (req, res) => {
        try{
            const searchValue = req.query.searchValue;
            const searchProduct = req.query.searchProduct;
            const resultado = await stock.buscarUnProducto(searchValue, searchProduct);
            res.render('browserStock', {title: searchProduct, resultado});
        } catch(err){
            console.log(err);
        }
    }
}