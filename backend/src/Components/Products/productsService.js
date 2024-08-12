import { Op } from "sequelize";
import { Products } from "./productsModels.js";
import { Stock } from "../Stock/stocksModels.js";
import { product_Stocks_association } from "../Associations/productStocksModels.js";
import { Tools } from "../Tools/toolsModels.js";
import { product_Tools_association } from "../Associations/productToolsModels.js";
import { try_catch } from "../../utils/try_catch.js";


export class productsService {
    verProductos = async () => {
        try {
            const resultado = await Products.findAll({
                where: {
                    disabled: false
                },
                include: [ 
                    {model: Stock, 
                        through: {
                            attributes: []
                        },
                        attributes: ['id_material', 'name_material', 'buy_price_material']},
                    {model: Tools, 
                        through: {
                            attributes: []
                        },
                        attributes: ['id_tool', 'name_tool', 'status_tool']}
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                order: [['disabled', 'ASC']]
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
                price_product: data.price_product
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
    eliminarProducto = async (id_product) => {
        try{
            const resultado = await Products.destroy({
                where: {
                    id_product
                }
            });
            if(!resultado) return try_catch.SERVICE_CATCH_RES(resultado, 'El producto no se elimino debido a un error en el servidor');

            return try_catch.SERVICE_TRY_RES(`El producto con ID:${id_product} ah sido eliminado con éxito`, 200);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    actualizarProducto = async (id_product, newData) => {
        try{
            const {tools, materials, ...data} = newData;

            const olderProduct = await Products.findByPk(id_product, {
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            });

            if(JSON.stringify(data) !== JSON.stringify(olderProduct)){
                const updateProduct = await Products.update({
                    name_product: data.name_product,
                    img_product: data.img_product,
                    description_product: data.description_product
                }, {
                    where: id_product
                });
                return updateProduct;
            }

            await product_Stocks_association.destroy({
                where:{
                    id_product_fk: id_product
                }
            });

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
            const promiseMaterial = materials.map(material =>{
                return product_Stocks_association.create({
                    id_product_fk: id_product,
                    how_much_contains_use: material.how_much_content,
                    id_material_fk: material.id
                })
            });
            
            await Promise.all([...promiseTool, ...promiseMaterial]);
            return updateProduct;
        } catch(err) {
            console.log(err);
        }
    }
    filtrarProducto = async (type, value) => {
        try {
            if (type === 'id_product' || type === 'nameProductValidator'){
                const objetoWhere = {};
                objetoWhere[type] = {
                    [Op.eq]: value
                };

                const resultado = await Products.findAll({
                    where: [
                        objetoWhere, {
                            disabled: false
                        }],
                    include: [ 
                        {model: Stock, 
                            through: {
                                attributes: []
                            },
                            attributes: ['id_material', 'name_material', 'buy_price_material']},
                        {model: Tools, 
                            through: {
                                attributes: []
                            },
                            attributes: ['id_tool', 'name_tool', 'status_tool']}
                    ],
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    order: [['disabled', 'ASC']]
                });
                if(resultado.length === 0) return try_catch.SERVICE_CATCH_RES(resultado, `No se encontró nada con ${type}: ${value} en la base de datos`, 404);

                return try_catch.SERVICE_TRY_RES(resultado, 302);

            };

            if (type === 'name_product'){
                const resultado = await Products.findAll({
                    where: [{
                            name_product: {
                                [Op.like]: `%${value}%`
                            }
                        }, {
                            disabled: false
                        }],
                    include: [ 
                        {model: Stock, 
                            through: {
                                attributes: []
                            },
                            attributes: ['id_material', 'name_material', 'buy_price_material']},
                        {model: Tools, 
                            through: {
                                attributes: []
                            },
                            attributes: ['id_tool', 'name_tool', 'status_tool']}
                    ],
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    order: [['disabled', 'ASC']]
                });
                if(resultado.length === 0) return try_catch.SERVICE_CATCH_RES(resultado, `No se encontró nada con ${type}: ${value} en la base de datos`, 404);

                return try_catch.SERVICE_TRY_RES(resultado, 302);

            };

            if (type === 'id_tool'){
                const associations = await product_Tools_association.findAll({
                    where:{
                        'id_tool_fk': value
                    }});

                const id_product_association = associations.map(assocation =>{
                    return assocation.id_product_fk;
                });

                const resultPromise = id_product_association.map(id_product => {
                    return Products.findAll({
                        where: [{
                            id_product
                        }, {
                            disabled: false
                        }],
                    include: [ 
                        {model: Stock, 
                            through: {
                                attributes: []
                            },
                            attributes: ['id_material', 'name_material', 'buy_price_material']},
                        {model: Tools, 
                            through: {
                                attributes: []
                            },
                            attributes: ['id_tool', 'name_tool', 'status_tool']}
                        ],
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                        order: [['disabled', 'ASC']]
                    });
                });

                const resultado = await Promise.all(resultPromise);

                try_catch.SERVICE_TRY_RES(resultado, 302);
                
            };

            if (type === 'id_material'){
                const associations = await product_Stocks_association.findAll({
                    where:{
                        id_material_fk: value
                    }});

                const id_material_association = associations.map(assocation =>{
                    return assocation.id_product_fk;
                });

                const resultPromise = id_material_association.map(id_product => {
                    return Products.findAll({
                        where: [{
                            id_product
                        }, {
                            disabled: false
                        }],
                    include: [ 
                        {model: Stock, 
                            through: {
                                attributes: []
                            },
                            attributes: ['id_material', 'name_material', 'buy_price_material']},
                        {model: Tools, 
                            through: {
                                attributes: []
                            },
                            attributes: ['id_tool', 'name_tool', 'status_tool']}
                        ],
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                        order: [['disabled', 'ASC']]
                    });
                });

                const resultado = await Promise.all(resultPromise);

                try_catch.SERVICE_TRY_RES(resultado, 302);
            };

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
}


