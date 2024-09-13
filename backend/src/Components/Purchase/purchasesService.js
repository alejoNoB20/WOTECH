import { supplierStockAssociations } from "../SupplierMaterials/suppliersMaterialsModels.js";
import { Stock } from "../Stock/stocksModels.js";
import { try_catch } from "../../utils/try_catch.js";

export class purchaseService {
    crearVenta = async (data) => {
        try{
            
          console.log('afuera');
          
            for(const purchase of data){
              console.log('for');
              
                const materialSupplier = await supplierStockAssociations.findByPk(purchase.id_supplier_material);
                const stock = await Stock.findByPk(materialSupplier.id_material);
                
                const totalMaterial = stock.amount_material + materialSupplier.amount_material * purchase.unit_material;

        const actualizar = await Stock.update(
          {
            amount_material: totalMaterial,
          },
          {
            where: {
              id_material: materialSupplier.id_material,
            },
          }
        );
      }

            return try_catch.SERVICE_TRY_RES(`Compra realizada con éxito`, 201); 

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La compra falló');
        }
    }
}