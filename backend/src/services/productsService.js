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
    crearProducto = async (data) => {
        try {
            const tools = data.tools;
            const materials = data.materials;

            const newProduct = await Products.create({
                name_product: data.name_product,
                img_product: data.img_product,
                description_product: data.description_product,
                price_product: data.price_product
            });

            const promiseTool = tools.map(tool => {
                product_Tools_association.create({
                    id_tool_fk: tool,
                    id_product_fk: newProduct.id_product  
            });

            })
            const promiseMaterial = materials.map(material => {
                product_Stocks_association.create({
                    id_material_fk: material.id,
                    how_much_contains_use: material.how_much_content,
                    id_product_fk: newProduct.id_product
                })
            });

            await Promise.all([...promiseTool, ...promiseMaterial]);
            return newProduct;
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

            const updateProduct = await Products.update({
                name_product: newData.name_product,
                img_product: newData.img_product,
                description_product: newData.description_product
            }, {
                where:{
                    id_product: id_product.id_product
                }
            })

            await product_Stocks_association.destroy({
                where:{
                    id_product_fk: id_product.id_product
                }
            })

            await product_Tools_association.destroy({
                where: {
                    id_product_fk: id_product.id_product
                }
            })

            const promiseTool = tools.map(tool => {
                return product_Tools_association.create({
                    id_product_fk: id_product.id_product,
                    id_tool_fk: tool
                })
            })
            const promiseMaterial = materials.map(material =>{
                return product_Stocks_association.create({
                    id_product_fk: id_product.id_product,
                    how_much_contains_use: material.how_much_content,
                    id_material_fk: material.id
                })
            })
            
            await Promise.all([...promiseTool, ...promiseMaterial])
            return updateProduct;
        } catch(err) {
            console.log(err);
        }
    }
    resultadoBusquedaFiltrada = async(type, value) => {
        try {
            if (type === 'id_product'){
                const result = await Products.findAll({
                    where: {'id_product': value},
                    include: [
                    {model: Stock},
                    {model: Tools}
                ]})
                return result
            } 
            if (type === 'name_product'){
                const result = await Products.findAll({
                    where: {
                        'name_product': {
                            [Op.like]: `%${value}%`
                        }
                    },
                    include: [
                    {model: Stock},
                    {model: Tools}
                ]})
                return result
            }
            if (type === 'id_tool'){
                const tool = await Tools.findByPk(value);
                const associations = await product_Tools_association.findAll({
                    where:{
                        'id_tool_fk': value
                    }});
                const id_product_association = associations.map(assocation =>{
                    return assocation.id_product_fk;
                })
                const resultPromise = id_product_association.map(productID => {
                    return Products.findAll({
                        where: {'id_product': productID},
                        include: [
                            {model: Stock},
                            {model: Tools}
                        ]
                    })
                })
                const result = await Promise.all(resultPromise)
                return {result, tool}
            }
            if (type === 'id_material'){
                const material = await Stock.findByPk(value);
                const associations = await product_Stocks_association.findAll({
                    where:{
                        'id_material_fk': value
                    }});
                const id_material_association = associations.map(assocation =>{
                    return assocation.id_product_fk;
                })
                const resultPromise = id_material_association.map(productID => {
                    return Products.findAll({
                        where: {'id_product': productID},
                        include: [
                            {model: Stock},
                            {model: Tools}
                        ]
                    })
                })
                const result = await Promise.all(resultPromise)
                return {result, material}
            }
            if(type = 'nameProductValidator'){
                const resultado = await Products.findOne({
                    where: {
                        name_product: value
                    }
                });
                return resultado
            }
        } catch (err) {
            console.log(err);
        }
    }
}


