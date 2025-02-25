import { ordersService } from "./ordersService.js";
import { try_catch } from "../../utils/try_catch.js";
const Order = new ordersService();

export class orderController {
    verPedidos = async (req, res) => {
        try{
            const resultado = await Order.verTodo(req.params.page);
            try_catch.TRY_RES(res, resultado);
            
        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    detallesProductosClientes = async (req, res) => {
        try{    
            const resultado = await Order.mostrarProductosClientes();
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    crear = async (req, res) => {
        try{
            const resultado = await Order.crearPedido(req.body);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    detalles = async (req, res) => {
        try{
            const resultado = await Order.filtrarPedidos(null, 'id_order', req.params.id_order);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    deshabilitar = async (req, res) => {
        try{
            const resultado = await Order.deshabilitarPedido(req.params.id_order);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    borrar = async (req, res) => {
        try{
            const resultado = await Order.borrarPedido(req.params.id_order);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    irPaginaActualizar = async (req, res) => {
        try{
            const resultado = await Order.filtrarPedidos('id_order', req.params.id_order);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    actualizar = async (req, res) => {
        try{
            const resultado = await Order.actualizarPedido(req.params.id_order, req.body);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    filtrar = async (req, res) => {
        try{
            const type = req.query.search_type;
            const value = req.query.search_value;

            const resultado = await Order.filtrarPedidos(req.params.page, type, value);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
}
