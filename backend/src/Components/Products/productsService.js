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
            if(resultado.length === 0) return try_catch.SERVICE_CATCH_RES(resultado, 'No se encontró ningún producto en la base de datos', 404);

            return try_catch.SERVICE_TRY_RES(resultado, 302);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
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
                price_product: data.price_product,
                map_product: data.map_product
            });

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
            await Promise.all([...promiseTool, ...promiseMaterial]);

            return try_catch.SERVICE_TRY_RES(newProduct, 201);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    deshabilitarProducto = async (id_product) => {
        try{
            await Products.update({
                disabled: true
            }, {
                where: {
                    id_product
                }
            });

            return try_catch.SERVICE_TRY_RES(`El producto con ID:${id_product} deshabilitado con éxito`); 

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    eliminarProducto = async (id_product) => {
        try{
            await Products.destroy({
                where: {
                    id_product
                }
            });

            return try_catch.SERVICE_TRY_RES(`El producto con ID:${id_product} ah sido eliminado con éxito`, 200);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    actualizarProducto = async (id_product, newData) => {
        try{
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

            const resultado = await this.filtrarProducto('id_product', id_product);

            return try_catch.SERVICE_TRY_RES(resultado.msg, 200);
            
        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    filtrarProducto = async (type, value) => {
        try {
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
            if(resultado.length === 0) return try_catch.SERVICE_CATCH_RES(resultado, `No se encontró nada con ${type}: ${value} en la base de datos`, 404);

            return try_catch.SERVICE_TRY_RES(resultado, 302);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
}


