import { Op } from "sequelize";
import { Products } from "./productsModels.js";
import { Stock } from "../Stock/stocksModels.js";
import { Tools } from "../Tools/toolsModels.js";
import { productStocksAssociation } from "../Associations/productStocksModels.js";
import { productToolsAssociation } from "../Associations/productToolsModels.js";
import { try_catch } from "../../utils/try_catch.js";
import { uploadImage, destroyImage } from "../../libs/Cloudinary.js";


export class productsService {
    verProductos = async (page) => {
        try {
            // CANTIDAD TOTAL DE REGISTROS
            const maxProducts = await Products.count();
            // CANTIDAD DE REGISTROS RENDERIZADOS
            const limit = 6;
            // REGISTROS QUE NO SE MUESTRAN
            const offset = page * 6 - 6;

            const resultado = await Products.findAll({
                where: {
                    disabled: false
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'description_product']
                },
                limit,
                offset
            });
            if(resultado.length === 0) return try_catch.SERVICE_TRY_RES({resultado: 'No se encontraron productos registrados en la base de datos'}, 404);

            return try_catch.SERVICE_TRY_RES({resultado, maxPage: Math.round(maxProducts / limit)}, 200);

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
            if(stock.length === 0) return try_catch.SERVICE_TRY_RES({stock: 'No se encontró ningún stock en la base de datos', tools}, 404);
            if(tools.length === 0) return try_catch.SERVICE_TRY_RES({stock, tools: 'No se encontró ninguna herramienta en la base de datos'}, 404);
            if(tools.length === 0 && stock.length === 0) return try_catch.SERVICE_TRY_RES({stock: 'No se encontró ningún stock en la base de datos', tools: 'No se encontró ninguna herramienta en la base de datos'}, 404);

            return try_catch.SERVICE_TRY_RES({stock, tools}, 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err);
        }
    }
    crearProducto = async (data) => {
        try {
            // Clodinary Module - Products
            let imageError = {status: false};
            if(!data.img_product){
                data.img_product = 'https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png';
            }else {
                const saveImage = await uploadImage(data.img_product.url, data.img_product.name, 'Productos');
                if(saveImage.success){
                    data.img_product = saveImage.msg;
                }else {
                    imageError = {status: true, msg: 'La creación del producto finalizó exitosamente, pero ocurrió un error al querer guardar la imagen del producto'};
                    data.img_product = 'https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png';
                };
            };
            
            // Clodinary Module - Map_products
            if(data.map_product){
                const saveImage = await uploadImage(data.map_product.url, data.map_product.name, 'Planos_Productos');
                if(saveImage.success){
                    data.map_product = saveImage.msg;
                }else {
                    imageError = {status: true, msg: 'La creación del producto finalizó exitosamente, pero ocurrió un error al querer guardar el plano del producto'};
                };
            };

            const tools = JSON.parse(data.tools);
            const materials = JSON.parse(data.materials);

            const newProduct = await Products.create({
                name_product: data.name_product,
                img_product: data.img_product,
                description_product: data.description_product,
                price_product: data.price_product,
                map_product: data.map_product
            });

            const promiseTool = tools.map(tool => {
                return productToolsAssociation.create({
                    id_tool_fk: tool,
                    id_product_fk: newProduct.id_product  
                }); 

            });
            const promiseMaterial = materials.map(material => {
                return productStocksAssociation.create({
                    id_material_fk: material.id,
                    how_much_contains_use: material.how_much_content,
                    id_product_fk: newProduct.id_product
                });
            });
            await Promise.all([...promiseTool, ...promiseMaterial]);

            if(!imageError.status){
                return try_catch.SERVICE_TRY_RES('La creación del producto finalizó exitosamente', 201);
            }else {
                return try_catch.SERVICE_TRY_RES(imageError.msg, 500);                  
            };

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La creación del producto falló');
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

            return try_catch.SERVICE_TRY_RES('La deshabilitación del producto finalizó exitosamente', 200); 

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La deshabilitación del producto falló');
        }
    }
    eliminarProducto = async (id_product) => {
        try{
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
    actualizarProducto = async (id_product, data) => {
        try{
            let imageError = {status: false};
            let beforeUpdateImg;
            let beforeUpdateMap;
            const tools = JSON.parse(data.tools);
            const materials = JSON.parse(data.materials);

            // Clodinary Module - img_product
            if(!data.img_product){
                data.img_product = 'https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png';
            }else {
                if(data.img_product && typeof(data.img_product) !== 'string'){
                    const productUpdate = await Products.findByPk(id_product, {
                        attributes: ['img_product']
                    });
                    beforeUpdateImg = productUpdate.img_product;
    
                    const saveImage = await uploadImage(data.img_product.url, data.img_product.name, 'Productos');
                    if(saveImage.success){
                        if(beforeUpdateImg !== saveImage.msg){
                            await destroyImage(beforeUpdateImg);
                        };
                        data.img_product = saveImage.msg;
                    }else {
                        imageError = {status: true, msg: 'La actualización del producto finalizó exitosamente, pero ocurrió un error al querer guardar la imagen del producto'};
                        data.img_product = 'https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png';
                    };
                }
            };         
            
            // Clodinary Module map_product
            if(data.map_product){
                if(data.map_product && typeof(data.map_product) !== 'string'){
                    const productUpdate = await Products.findByPk(id_product, {
                        attributes: ['map_product']
                    });
                    beforeUpdateMap = productUpdate.map_product;
                    const saveMap = await uploadImage(data.map_product.url, data.map_product.name, 'Planos_Productos');
                    if(saveMap.success){
                        if(beforeUpdateMap !== saveMap.msg){
                            await destroyImage(beforeUpdateMap);
                        };
                        data.map_product = saveMap.msg;
                    }else {
                        imageError = {status: true, msg: 'La actualización del producto finalizó exitosamente, pero ocurrió un error al querer guardar el plano del producto'};
                    };
                }
            };

            const olderProduct = await this.filtrarProducto(null, 'id_product', id_product);

            const olderMaterials = olderProduct.msg[0].stocks.map(stock => {
                return {id: stock.id_material, how_much_content: stock.productStocksAssociation.how_much_contains_use}
            });

            const olderTools = olderProduct.msg[0].tools.map(tool => {
                return tool.id_tool
            });;
            
            const validationProduct = {'name_product': olderProduct.msg[0].name_product, 'img_product': olderProduct.msg[0].img_product, 'description_product': olderProduct.msg[0].description_product, 'price_product': olderProduct.msg[0].price_product};

            if(JSON.stringify(data) !== JSON.stringify(validationProduct)){
                await Products.update({
                        name_product: data.name_product,
                        img_product: data.img_product,
                        map_product: data.map_product,
                        description_product: data.description_product
                }, {
                    where: {
                        id_product
                    }
                });
            }

            if(JSON.stringify(tools) !== JSON.stringify(olderTools)){
                await productToolsAssociation.destroy({
                    where: {
                        id_product_fk: id_product
                    }
                });
    
                const promiseTool = tools.map(id_tool_fk => {
                    return productToolsAssociation.create({
                        id_product_fk: id_product,
                        id_tool_fk
                    })
                });
                
                await Promise.all(promiseTool);

            }

            if(JSON.stringify(materials) !== JSON.stringify(olderMaterials)){

                await productStocksAssociation.destroy({
                    where:{
                        id_product_fk: id_product
                    }
                });
                const promiseMaterial = materials.map(material =>{
                    return productStocksAssociation.create({
                        id_product_fk: id_product,
                        id_material_fk: material.id,
                        how_much_contains_use: material.how_much_content
                    })
                });

                await Promise.all(promiseMaterial);

            }

            if(!imageError.status){
                return try_catch.SERVICE_TRY_RES('La actualización del producto finalizó exitosamente', 200);
            }else {
                return try_catch.SERVICE_TRY_RES(imageError.msg, 500);                
            };
            
        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La actualización del producto falló');
        }
    }
    filtrarProducto = async (page = null, type, value) => {
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

            if (page !== null){
                // CANTIDAD TOTAL DE REGISTROS
                const maxProducts = await Products.count({
                    where: objetoWhere
                });
                // CANTIDAD DE REGISTROS RENDERIZADOS
                const limit = 6;
                // REGISTROS QUE NO SE MUESTRAN
                const offset = page * 6 - 6;

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
                    order: [['disabled', 'ASC']],
                    limit,
                    offset
                });
                if(resultado.length === 0) return try_catch.SERVICE_CATCH_RES({resultado: `No se encontró nada con ${type}: ${value} en la base de datos`}, 404);
    
                return try_catch.SERVICE_TRY_RES({resultado, maxPage: Math.round(maxProducts / limit)}, 200);
        
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

            return try_catch.SERVICE_TRY_RES(resultado, 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err);
        }
    }
}