import { Op, where } from "sequelize";
import { Products } from "../models/productsModels.js";
import { Stock } from "../models/stocksModels.js";
import { product_Stocks_association } from "../models/productStocksModels.js";
import { Tools } from "../models/toolsModels.js";
import { product_Tools_association } from "../models/productToolsModels.js";
import { canTreatArrayAsAnd } from "sequelize/lib/utils";


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
            const tools = data.tools;
            const materials = data.materials;

            const newProduct = await Products.create({
                name_product: data.name_product,
                img_product: data.img_product,
                description_product: data.description_product
            })

            const promiseTool = tools.map(tool => {
                product_Tools_association.create({
                    id_tool_fk: tool,
                    id_product_fk: newProduct.id_product  
            })
            })
            const promiseMaterial = materials.map(material => {
                product_Stocks_association.create({
                    id_material_fk: material.id,
                    how_much_contains_use: material.how_much_content,
                    id_product_fk: newProduct.id_product
                })
            })

            await Promise.all([...promiseTool, ...promiseMaterial]);
        } catch (err) {
            console.log(err);
        }
    }
    eliminarProducto = async (where) => {
        try{
            Products.destroy({where})
        }catch (err) {
            console.log(err);
        }
    }
    llamarUnProducto = async (where) => {
        try {
            const respuesta = await Products.findOne({where, 
                include: [
                    {model: Stock},
                    {model: Tools}
                ]
            });
            return respuesta;
        } catch (err) {
            console.log(err);
        }
    }
    actualizarProducto = async (id_product, newData) => {
        try{
            const tools = newData.tools;
            const materials = newData.materials;
            const result = await Products.update({
                name_product: newData.name_product,
                img_product: newData.img_product,
                description_product: newData.description_product
            }, {
                where:{
                    id_product
                }
            })
            await Products.destroy({
                where:{
                    id_product_fk: id_product
                }
            })
            await Products.destroy({
                where: {
                    id_tool_fk: id_product
                }
            })
            const promiseTool = tools.map(tool => {
                return Products.create({
                    id_product_fk: id_product,
                    id_tool_fk: tool.id_tool_fk
                })
            })
            const promiseMaterial = materials.map(material =>{
                return Products.create({
                    id_product_fk: id_product,
                    id_material_fk: material.id_material_fk
                })
            })
            
            await Promise.all([...promiseTool, ...promiseMaterial])
            console.log(tools)
            console.log(materials)
            console.log(result)
            console.log(promiseTool)
            console.log(promiseMaterial)
        } catch {
            console.log(err);
        }
    }
}


