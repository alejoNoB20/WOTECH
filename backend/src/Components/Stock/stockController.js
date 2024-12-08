import { StockService } from "./stockService.js";
import { try_catch } from "../../utils/try_catch.js";
export const stock = new StockService();


export class StockController {
    verTodos = async (req, res) => {
        try {
            const resultado = await stock.verStock();
            try_catch.TRY_RES(res, resultado);
            
        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    crear = async (req, res) => {
        try {
            console.log(req.body);
            const resultado = await stock.crearStock(req.body);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    deshabilitar = async (req, res) => {
        try{
            console.log(req.params)
            const resultado = await stock.deshabilitarStock(req.params.id_material);
            try_catch.TRY_RES(res, resultado);
            
        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    borrar = async (req,res) => {
        try {
            const resultado = await stock.borrarStock(req.params.id_material);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    detallesMaterial = async (req, res) => {
        try{
            const resultado = await stock.filtrarMaterial('id_material', req.params.id_material);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    actualizar = async (req, res) => {
        try {
            const resultado = await stock.actualizarStock(req.params.id_material, req.body);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    filtrar = async (req, res) => {
        try{
            const type = req.query.search_type;
            const value = req.query.search_value;
            const resultado = await stock.filtrarMaterial(type, value);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
}