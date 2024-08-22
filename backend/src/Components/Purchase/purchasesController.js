import { purchaseService } from "./purchasesService.js";
import { supplierService } from "../Suppliers/suppliersService.js";
import { try_catch } from "../../utils/try_catch.js";
const Purchase = new purchaseService();
const Supplier = new supplierService(); 

export class purchaseController {
    verProveedores = async (req, res) => {
        try{
            const resultado = await Supplier.verProveedores();
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    detallesProveedores = async (req, res) => {
        try{
            const resultado = await Supplier.filtrarProveedor('id_supplier', req.params.id_supplier);
            try_catch.TRY_RES(res, resultado);
            
        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    crear = async (req, res) => {
        try{
            const resultado = await Purchase.crearVenta(req.body);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
}