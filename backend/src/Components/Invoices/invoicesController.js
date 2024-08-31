import { invoicesService } from "./invoicesService.js";
import { try_catch } from "../../utils/try_catch.js";
const Invoice = new invoicesService();

export class invoiceController {
    ver = async (req, res) => { 
        try{
            const resultado = await Invoice.verFacturas(req.params.id_supplier);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    agregar = async (req, res) => {
        try{
            const resultado = await Invoice.agregarFactura(req.body);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    deshabilitar = async (req, res) => {
        try{
            const resultado = await Invoice.deshabilitarFactura(req.params.id_invoice);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
}