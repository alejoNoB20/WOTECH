import { ordersService } from "./ordersService.js";
import { try_catch } from "../../utils/try_catch.js";
const Order = new ordersService();

// ---EXAMPLE---
// {
//     "id_client_fk": 2,
//     "shipping_address_order": "",
//     "delivery_day_order": "2024-08-08",
//     "products": [
//         {"id": 1, "price_product": 5000, "unit_product": 15},
//         {"id": 2, "price_product": 5000, "unit_product": 12}
//         ]
// }

export class orderController {
    verPedidos = async (req, res) => {
        try{
            const resultado = await Order.verTodo();
            try_catch.TRY_RES(res, resultado);
            
        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    detallesProductos = async (req, res) => {
        try{    
            const resultado = await Order.mostrarProductos();
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
            const resultado = await Order.filtrarPedidos('id_order', req.params.id_order);
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

            const resultado = await Order.filtrarPedidos(type, value);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
}
