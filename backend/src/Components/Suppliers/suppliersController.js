import { try_catch } from "../../utils/try_catch.js";
import { supplierService } from "./suppliersService.js";
const Supplier = new supplierService();

export class supplierController {
    verTodos = async (req, res) => {
        try{
            const resultado = await Supplier.verProveedores(req.params.page);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    crear = async (req, res) => {
        try{
            const resultado = await Supplier.crearProveedor(req.body);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    deshabilitar = async (req, res) => {
        try{
            const resultado = await Supplier.deshabilitarProveedor(req.params.id_supplier);
            try_catch.TRY_RES(res, resultado);

        }catch (err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    borrar = async (req, res) => {
        try{
            const resultado = await Supplier.borrarProveedor(req.params.id_supplier);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    detalles = async (req, res) => {
        try{
            const resultado = await Supplier.filtrarProveedor(null, 'id_supplier', req.params.id_supplier);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    actualizar = async (req, res) => {
        try{
            const resultado = await Supplier.actualizarProveedor(req.params.id_supplier, req.body);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    filtrar = async (req, res) => {
        try{
            const type = req.query.search_type;
            const value = req.query.search_value;
            const resultado = await Supplier.filtrarProveedor(req.params.page, type, value);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    
}