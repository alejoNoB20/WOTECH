import { Op } from "sequelize";
import { Products } from "./productsModels.js";
import { Stock } from "../Stock/stocksModels.js";
import { Tools } from "../Tools/toolsModels.js";
import { product_Stocks_association } from "../Associations/productStocksModels.js";
import { product_Tools_association } from "../Associations/productToolsModels.js";
import { try_catch } from "../../utils/try_catch.js";


export class productsService {
    verProductos = async () => {
        try {
            const resultado = await Products.findAll({
                where: {
                    disabled: false
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'description_product']
                },
            });
            if(resultado.length === 0) return try_catch.SERVICE_TRY_RES( 'No se encontraron productos registrados en la base de datos', 204);

            return try_catch.SERVICE_TRY_RES(resultado, 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'No se pueden ver los productos debido a una falla en el sistema');
        }   
    }
    datosParaCreacion = async () => {
        try{
            const stock = await Stock.findAll({
                where: {
                    disabled: false
                },
                attributes: ['id_material', 'name_material']
            });
            const tools = await Tools.findAll({
                where: {
                    disabled: false
                },
                attributes: ['id_tool', 'name_tool']
            });
            if(stock.length === 0) return try_catch.SERVICE_TRY_RES({stock: 'No se encontró ningún stock en la base de datos', tools}, 204);
            if(tools.length === 0) return try_catch.SERVICE_TRY_RES({stock, tools: 'No se encontró ninguna herramienta en la base de datos'}, 204);
            if(tools.length === 0 && stock.length === 0) return try_catch.SERVICE_TRY_RES({stock: 'No se encontró ningún stock en la base de datos', tools: 'No se encontró ninguna herramienta en la base de datos'}, 204);

            return try_catch.SERVICE_TRY_RES({stock, tools}, 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err);
        }
    }
    crearProducto = async (data) => {
        try {
            
            const tools = data.tools;
            const materials = data.materials;
            const existingProduct = await Products.findOne({ where: { name_product: data.name_product } });
            console.log(existingProduct);
            
            if (existingProduct) {
                return try_catch.SERVICE_CATCH_RES(null, 'El producto ya existe', 409); 
            }
            const newProduct = await Products.create({
                name_product: data.name_product,
                img_product: data.img_product,
                description_product: data.description_product,
                price_product: data.price_product,
                map_product: data.map_product
            });

            for(let i = 0; i < tools.length; i++){
                const toolExists = await Tools.findOne({ where: { id_tool: tools[i] } });
                if (!toolExists) {
                    return try_catch.SERVICE_CATCH_RES(null, `La herramienta con ID ${tools[i]} no existe`, 404);
                }

            }

            const promiseTool = tools.map(tool => {
                return product_Tools_association.create({
                    id_tool_fk: tool,
                    id_product_fk: newProduct.id_product  
                }); 

            });
            const promiseMaterial = materials.map(material => {
                return product_Stocks_association.create({
                    id_material_fk: material.id,
                    how_much_contains_use: material.how_much_content,
                    id_product_fk: newProduct.id_product
                });
            });
            // await Promise.all([...promiseTool, ...promiseMaterial]);

            return try_catch.SERVICE_TRY_RES('La creación del producto finalizó exitosamente', 201);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La creación del producto falló');
        }
    }
    deshabilitarProducto = async (id_product) => {
        try{
            const existingProduct = await Products.findOne({ where: { id_product: id_product } });
            
            if (!existingProduct) {
                return try_catch.SERVICE_CATCH_RES(null, 'El producto no existe', 204); 
            }
            await Products.update({
                disabled: 1
            }, {
                where: {
                    id_product: id_product
                }
            });
            console.log(id_product);
            
            return try_catch.SERVICE_TRY_RES('La deshabilitación del producto finalizó exitosamente', 200); 

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La deshabilitación del producto falló');
        }
    }
    eliminarProducto = async (id_product) => {
        try{
            const existingProduct = await Products.findOne({ where: { id_product: id_product } });
            
            if (!existingProduct) {
                return try_catch.SERVICE_CATCH_RES(null, 'El producto no existe', 404); 
            }
            await Products.destroy({
                where: {
                    id_product
                }
            });

            return try_catch.SERVICE_TRY_RES('La eliminación del producto finalizó exitosamente', 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La eliminación del producto finalizó exitosamente');
        }
    }
    datosParaActualizacion = async (id_product) => {
        try{
            const product = await this.filtrarProducto('id_product', id_product);
            const stock = await Stock.findAll({
                where: {
                    disabled: false
                },
                attributes: ['id_material', 'name_material']
            });
            const tools = await Tools.findAll({
                where: {
                    disabled: false
                },
                attributes: ['id_tool', 'name_tool']
            });

            return try_catch.SERVICE_TRY_RES({product: product.msg, stock, tools}, 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err);
        }
    }
    actualizarProducto = async (id_product, newData) => {
        try{
            const existingProduct = await Products.findOne({ where: { id_product: id_product } });
            
            if (!existingProduct) {
                return try_catch.SERVICE_CATCH_RES(null, 'El producto no existe', 404); 
            }
            
            const {tools, materials, ...data} = newData;
            const olderProduct = await this.filtrarProducto('id_product', id_product);

            const olderMaterials = olderProduct.msg[0].stocks.map(stock => {
                return {id: stock.id_material, how_much_content: stock.product_Stocks_association.how_much_contains_use}
            });

            const olderTools = olderProduct.msg[0].tools.map(tool => {
                return tool.id_tool
            });;
            
            const validationProduct = {'name_product': olderProduct.msg[0].name_product, 'img_product': olderProduct.msg[0].img_product, 'description_product': olderProduct.msg[0].description_product, 'price_product': olderProduct.msg[0].price_product};

            if(JSON.stringify(data) !== JSON.stringify(validationProduct)){
                await Products.update({
                        name_product: data.name_product,
                        img_product: data.img_product,
                        description_product: data.description_product
                }, {
                    where: {
                        id_product
                    }
                });

            }

            if(JSON.stringify(tools) !== JSON.stringify(olderTools)){
                await product_Tools_association.destroy({
                    where: {
                        id_product_fk: id_product
                    }
                });
    
                const promiseTool = tools.map(id_tool_fk => {
                    return product_Tools_association.create({
                        id_product_fk: id_product,
                        id_tool_fk
                    })
                });
                
                await Promise.all(promiseTool);

            }

            if(JSON.stringify(materials) !== JSON.stringify(olderMaterials)){

                await product_Stocks_association.destroy({
                    where:{
                        id_product_fk: id_product
                    }
                });
                const promiseMaterial = materials.map(material =>{
                    return product_Stocks_association.create({
                        id_product_fk: id_product,
                        id_material_fk: material.id,
                        how_much_contains_use: material.how_much_content
                    })
                });

                await Promise.all(promiseMaterial);

            }

            return try_catch.SERVICE_TRY_RES('La actualización del producto finalizó exitosamente', 200);
            
        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La actualización del producto falló');
        }
    }
    filtrarProducto = async (type, value) => {
        try {
            console.log(type);
            console.log(value);
            console.log(type === 'nameProductValidator');
            
            let objetoWhere = {};
            if(type === 'id_product' || type === 'nameProductValidator'){
                if(type === 'nameProductValidator') type = 'name_product';

                objetoWhere[type] = {
                    [Op.eq]: value
                }
            }else {
                objetoWhere[type] = {
                    [Op.like]: `%${value}%`
                }
            };

            const resultado = await Products.findAll({
                where: objetoWhere,
                include: [ 
                    {model: Stock, 
                        through: {
                            attributes: ['how_much_contains_use']
                        },
                        attributes: ['id_material', 'name_material']},
                    {model: Tools, 
                        through: {
                            attributes: []
                        },
                        attributes: ['id_tool', 'name_tool']}
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                order: [['disabled', 'ASC']]
            });
            if(resultado.length === 0) return try_catch.SERVICE_CATCH_RES(resultado, `No se encontró nada con ${type}: ${value} en la base de datos`, 204);

            return try_catch.SERVICE_TRY_RES(resultado, 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err);
        }
    }
}


