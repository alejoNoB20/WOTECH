import { productsService } from "./productsService.js";
import { try_catch } from "../../utils/try_catch.js";

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
            const resultado = await Product.datosParaCreacion();
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
    deshabilitar = async (req, res) => {
        try{
            const resultado = await Product.deshabilitarProducto(req.params.id_product);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
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
            const resultado = await Product.datosParaActualizacion(req.params.id_product);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);            
        }
    }
    detallesProducto = async (req, res) => {
        try {
            const resultado = await Product.filtrarProducto('id_product', req.params.id_product);
            
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