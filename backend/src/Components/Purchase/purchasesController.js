import { purchaseService } from "./purchasesService.js";
import { try_catch } from "../../utils/try_catch.js";
const Purchase = new purchaseService();

export class purchaseController {
    venta = async (req, res) => {
        try{
            const resultado = await Purchase.crearVenta(req.body);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
}