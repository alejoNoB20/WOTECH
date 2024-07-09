import { Op, where } from "sequelize";
import { Products } from "../models/productsModels.js";
import { Stock } from "../models/stocksModels.js";
import { product_Stocks_association } from "../models/productStocksModels.js";
import { Tools } from "../models/toolsModels.js";
import { product_Tools_association } from "../models/productToolsModels.js";


export class productsService {
    verProductos = async () => {
        try {
            const resultado = await Products.findAll({
                include: [ 
                    {model: Stock},
                    {model: Tools}
                ]
            });
            return resultado;
        } catch(err) {
            console.log(err);
        }   
    }
    verAsociacionesProductos = async () => {
        try {
            const resultProductStocks = await product_Stocks_association.findAll();
            const resultProductTools = await product_Tools_association.findAll();
            return {resultProductStocks, resultProductTools}
        } catch (err) {
            console.log(err);
        }
    }
    crearProducto = async (data) => {
        try {
            const newProduct = await Products.create({
                    name_product: data.name_product,
                    img_product: data.img_product,
                    description_product: data.description_product
            })
            await product_Stocks_association.create({
                    id_material_fk: data.materials_needed,
                    id_product_fk: newProduct.id_product 
            })
            await product_Tools_association.create({
                    id_tool_fk: data.tools_needed,
                    id_product_fk: newProduct.id_product  
            })
        } catch (err) {
            console.log(err);
        }
    }
}
