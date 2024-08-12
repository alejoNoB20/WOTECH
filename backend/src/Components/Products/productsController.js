import { productsService } from "./productsService.js";
import { StockService } from "../Stock/stockService.js";
import { ToolsService } from "../Tools/toolsService.js";
import { try_catch } from "../../utils/try_catch.js";
import '../Associations/productStocksModels.js';
import '../Associations/productToolsModels.js';
const Stock = new StockService();
const Tool = new ToolsService();
const Product = new productsService();

export class productsController {
    verTodos = async (req, res) => {
        try {
            const resultado = await Product.verProductos();
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    irAPaginaCrear = async (req, res) => {
        try {
            const Materiales = await Stock.verStock();
            const Herramientas = await Tool.verHerramientas();
            const resultado = {Materiales, Herramientas};
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    crear = async (req, res) => {
        try {
            const resultado = await Product.crearProducto(req.body);
            try_catch.TRY_RES(res, resultado);

        }catch (err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    eliminar = async (req, res) => {
        try{
            const resultado = await Product.eliminarProducto(req.params.id_product);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    irPaginaActualizar = async (req, res) => {
        try {
            const Producto = await Product.filtrarProducto('id_product', req.params.id_product);
            const Materiales = await Stock.verStock();
            const Herramientas = await Tool.verHerramientas();
            const resultado = {Producto, Herramientas, Materiales};
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);            
        }
    }
    actualizar = async (req, res) => {
        try{
            const resultado = await Product.actualizarProducto(req.params.id_product, req.body);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    filtrar = async (req, res) => {
        try{
            const type = req.query.search_type;
            const value = req.query.search_value;
            const resultado = await Product.filtrarProducto(type, value);
            try_catch.TRY_RES(res, resultado);
            
        }catch (err) {
            try_catch.CATCH_RES(res, err);
        }
    }
}