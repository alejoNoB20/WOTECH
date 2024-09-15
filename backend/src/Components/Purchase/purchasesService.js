import { supplierStockAssociations } from "../SupplierMaterials/suppliersMaterialsModels.js";
import { Stock } from "../Stock/stocksModels.js";
import { try_catch } from "../../utils/try_catch.js";

export class purchaseService {
  crearVenta = async (data) => {
    try {
      for (const purchase of data.purchase) {
        const materialSupplier = await supplierStockAssociations.findByPk(
          purchase.id_supplier_material
        );
        const stock = await Stock.findByPk(materialSupplier.id_material_fk);

        const totalMaterial = stock.amount_material + materialSupplier.amount_material * purchase.unit_material;
        await Stock.update(
          {
            amount_material: totalMaterial,
          },
          {
            where: {
              id_material: materialSupplier.id_material_fk,
            },
          }
        );
      }

            return try_catch.SERVICE_TRY_RES(`Compra realiza con éxito`, 201); 

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La compra falló');
        }
    }
}