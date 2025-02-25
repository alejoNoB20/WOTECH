import { Orders } from "./ordersModels.js";
import { Products } from "../Products/productsModels.js";
import { productsService } from "../Products/productsService.js";
import { Clients } from "../Clients/clientsModels.js";
import { Stock } from "../Stock/stocksModels.js"
import { orderProductsAssociation } from "../Associations/orderProductsModels.js";
import { try_catch } from "../../utils/try_catch.js";
import { Op, where } from "sequelize";
import { Tools } from "../Tools/toolsModels.js";
const Product = new productsService();

export class ordersService {
    verTodo = async (page) => {
        try{
            // CANTIDAD TOTAL DE REGISTROS
            const maxOrders = await Orders.count();
            // CANTIDAD DE REGISTROS RENDERIZADOS
            const limit = 6;
            // REGISTROS QUE NO SE MUESTRAN
            const offset = page * 6 - 6;

            const resultado = await Orders.findAll({
                where: {
                    disabled: false
                },
                order: [['delivery_day_order', 'ASC']], 
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'disabled']
                },
                include: {
                    model: Clients,
                    attributes: ['name_client', 'last_name_client'] 
                },
                limit,
                offset
            });
            if(resultado.length === 0) return try_catch.SERVICE_TRY_RES({resultado: 'No se encontraron pedidos activos en la base de datos'}, 404);

            return try_catch.SERVICE_TRY_RES({resultado, maxPage: Math.round(maxOrders / limit)}, 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'No se pueden ver los pedidos debido a una falla en el sistema');
        }
    }
    mostrarProductosClientes = async () => {
        try {
            const resultadoProductos = await Products.findAll({
                attributes: ['id_product', 'name_product', 'price_product']
            });
            const resultadoClientes = await Clients.findAll({
                attributes: ['id_client', 'name_client']
            });

            return try_catch.SERVICE_TRY_RES({"products": resultadoProductos, "clients": resultadoClientes}, 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'No se pueden ver los productos debido a una falla en el sistema');
        }
    }
    crearPedido = async (datos) => {
        try{
            const {products, ...dato} = datos;
            const sum = products.reduce((sumaParcial, product) => sumaParcial + product.price_product * product.unit_product, 0);
            dato.price_order = sum;

            const resultado = await Orders.create(dato);

            for(const product of products){
                const producto = await Product.filtrarProducto(null, 'id_product', product.id_product);
                for(const material of producto.msg[0].stocks){
                    const stock = await Stock.findOne({
                        where: {
                            id_material: material.id_material
                        },
                        attributes: ['amount_material']
                    });
                    
                    const usedMaterial = stock.amount_material - product.unit_product * material.productStocksAssociation.how_much_contains_use;
                    
                    await Stock.update({
                        amount_material: usedMaterial
                    }, {
                        where: {
                            id_material: material.id_material
                        }
                    });
                };

                await orderProductsAssociation.create({
                        id_order_fk: resultado.id_order,
                        id_product_fk: product.id_product,
                        unit_product: product.unit_product
                });

            }

            return try_catch.SERVICE_TRY_RES('La creación del pedido finalizó exitosamente', 201);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La creación del pedido falló');
        }
    }
    deshabilitarPedido = async (id_order) => {
        try{
            await Orders.update({
                disabled: true
            }, {
                where: {
                    id_order
                }
            });

            return try_catch.SERVICE_TRY_RES(`El pedido se cerró con éxito`, 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'El pedido fallo al intentar cerrarlo');
        }
    }
    borrarPedido = async (id_order) => {
        try{
            const order = await this.filtrarPedidos(null, 'id_order', id_order);

            // ANTES DE ELIMINAR EL PEDIDO DEVUELVE LOS MATERIALES A LA TABLA DE STOCK
            for(const material of order.msg.materialUsed){
                // RECUPERAMOS EL STOCK ACTUAL DE LA CARPINTERIA
                const currentMaterial = await Stock.findByPk(material.id_material, {
                    attributes: ['amount_material']
                });

                // LE SUMAMOS A CADA STOCK UTILIZADO LO QUE NO SE UTILIZARÁ
                await Stock.update({
                    amount_material: currentMaterial.amount_material + material.how_much_contains_use
                }, {
                    where: {
                        id_material: material.id_material
                    }
                });
            };

            // SE ELIMINA EL PEDIDO DEFINITIVAMENTE DE LA DB
            await Orders.destroy({
                where: {
                    id_order
                }
            });

            return try_catch.SERVICE_TRY_RES(`La eliminación del pedido finalizó exitosamente`, 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La eliminación del pedido falló');
        }
    }
    filtrarPedidos = async (page = null, type, value) => {
        try{
            let objetoWhere = {};

            if(type === 'shipping_address_order' || type === 'id_client'){
                objetoWhere[type] = {
                    [Op.like]: `%${value}%` 
                }
            }else {
                objetoWhere[type] = {
                    [Op.eq]: value 
                }
                
            };

            if(page !== null){
                // CANTIDAD TOTAL DE REGISTROS
                const maxOrders = await Orders.count({
                    where: objetoWhere
                });
                // CANTIDAD DE REGISTROS RENDERIZADOS
                const limit = 6;
                // REGISTROS QUE NO SE MUESTRAN
                const offset = page * 6 - 6;

                const resultado = await Orders.findAll({
                    where: objetoWhere,
                    order: [['shipping_address_order', 'ASC']],
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: [{
                        model: Products,
                        through: {
                            attributes: ['unit_product', 'id_product_fk']
                        },
                        attributes: ['id_product', 'name_product', 'price_product']
                    }, {
                        model: Clients,
                        attributes: ['name_client'] 
                    }],
                    limit,
                    offset
                })
                if (resultado.length === 0) return try_catch.SERVICE_TRY_RES({resultado: `No se encontró nada en la base de datos con ${type}: ${value}`}, 404);
                
                return try_catch.SERVICE_TRY_RES({resultado, maxPage: Math.round(maxOrders / limit)}, 200);

            }
            const resultado = await Orders.findAll({
                where: objetoWhere,
                order: [['shipping_address_order', 'ASC']],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [{
                    model: Products,
                    through: {
                        attributes: ['unit_product', 'id_product_fk']
                    },
                    attributes: ['id_product', 'name_product', 'price_product']
                }, {
                    model: Clients,
                    attributes: ['name_client'] 
                }]
            })
            if (resultado.length === 0) return try_catch.SERVICE_TRY_RES(`No se encontró nada en la base de datos con ${type}: ${value}`, 404); 

            if(type === 'id_order'){
                let productsUsed = [];
                let materialUsed = [];
                let toolsUsed = [];

                // GUARDA EN LA VARIABLE "productsUsed" TODOS LOS PRODUCTOS ASOCIADOS AL PEDIDO
                for(const products of resultado[0].products){
                    const currentProduct = await Products.findAll({
                        where: {
                            id_product: products.orderProductsAssociation.id_product_fk
                        },
                        include: [
                            {model: Stock,
                                attributes: ['id_material', 'name_material'],
                                through: {
                                    attributes: ['how_much_contains_use']
                                }
                            },
                            {model: Tools,
                                attributes: ['id_tool', 'name_tool'],
                                through: {
                                    attributes: []
                                }
                            }
                        ]
                    });

                    // INCLUIMOS LA CANTIDAD DE PRODUCTOS USADOS EN EL PEDIDO AL ARRAY DE STOCK
                    for(const material of currentProduct[0].stocks){
                        material.unit_product = products.orderProductsAssociation.unit_product;
                    }
                    productsUsed.push(currentProduct[0]);
                };

                // POR CADA PRODUCTO GUARDO EN LAS VARIABLES "materialUsed" Y "toolsUsed" TODOS LOS MATERIALES Y HERRAMIENTAS UTILIZADAS EN TOTAL
                for(const product of productsUsed.flat()){
                    // GUARDADO DE HERRAMIENTA
                    const toolsUsedList = product.tools?.map((tool)=> {
                        return {'id_tool': tool.id_tool, 'name_tool': tool.name_tool};
                    });
                    toolsUsed.push(toolsUsedList);

                    // GUARDADO DE MATERIALES
                    let materialsUsedList = product.stocks?.map((material)=> {
                        // VERIFICA SI ALGUN MATERIAL ESTA REPETIDO, EN EL CASO QUE SE REPITA SUMA LAS CANTIDADES TOTALES
                        const exist = materialUsed.flat().findIndex((materialList)=> materialList.id_material === material.id_material);

                        if(exist > 0){
                            // SUMA TODAS LAS "how_much_contains_use" 
                            materialUsed.flat()[exist].how_much_contains_use += (material.productStocksAssociation.how_much_contains_use * material.unit_product);
                        }else {
                            return {'id_material': material.id_material, 'name_material': material.name_material, 'how_much_contains_use': material.productStocksAssociation.how_much_contains_use * material.unit_product}
                        };
                    });
                    // FILTRA LOS UNDEFINED QUE QUEDARON DE AQUELLOS MATERIALES REPETIDOS NO MAPEADOS
                    materialsUsedList = materialsUsedList.filter(material=> material !== undefined)
                    materialUsed.push(materialsUsedList);
                };

                // ELIMINA LAS HERRAMIENTAS REPETIDAS
                let hash = {};
                toolsUsed = toolsUsed.flat().filter((tool)=> {
                    const exists = !hash[tool.id_tool];
                    hash[tool.id_tool] = true;
                    return exists;
                });

                return try_catch.SERVICE_TRY_RES({...resultado, toolsUsed, materialUsed: materialUsed.flat()}, 200);
            };

            return try_catch.SERVICE_TRY_RES(resultado, 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err);
        }
    }
    actualizarPedido = async (id_order, datos) => {
        try{
            const {products, ...dato} = datos;

            const totalPrice = products.reduce((sumaParcial, product) => sumaParcial + product.price_product * product.unit_product, 0);
            dato.price_order = totalPrice;

            const orderUpdate = await Orders.findByPk(id_order);

            const validationBody = {"id_client_fk": orderUpdate.id_client_fk, "shipping_address_order": orderUpdate.shipping_address_order, "delivery_day_order": orderUpdate.delivery_day_order, "price_order": orderUpdate.price_order};

            if(JSON.stringify(dato) !== JSON.stringify(validationBody)){
                await Orders.update(dato, {
                    where: {
                        id_order
                    }
                });
            };

            const olderAssociation = await orderProductsAssociation.findAll({
                where: {
                    id_order_fk: id_order
                }
            });

            const Oldervalidation = olderAssociation.map(olderProduct => {
                return ({id: olderProduct.id_product_fk, unit_product: olderProduct.unit_product});
            });

            const newValidation = products.map(newProduct => {
                return ({id: newProduct.id, unit_product: newProduct.unit_product});
            });

            if(JSON.stringify(Oldervalidation) !== JSON.stringify(newValidation)){

                for(const Association of olderAssociation){
                    const producto = await Product.filtrarProducto(null, 'id_product', Association.id_product_fk);
                    for(const material of producto.msg[0].stocks){
                        const stock = await Stock.findOne({
                            where: {
                                id_material: material.id_material
                            },
                            attributes: ['amount_material']
                        });
                        
                        const usedMaterial = stock.amount_material + Association.unit_product * material.productStocksAssociation.how_much_contains_use;
                        
                        await Stock.update({
                            amount_material: usedMaterial
                        }, {
                            where: {
                                id_material: material.id_material
                            }
                        });                        
                    };
                };

                await orderProductsAssociation.destroy({
                    where: {
                        id_order_fk: id_order
                    }
                })

                for(const product of products){
                    const producto = await Product.filtrarProducto(null, 'id_product', product.id_product);
                    for(const material of producto.msg[0].stocks){
                        const stock = await Stock.findOne({
                            where: {
                                id_material: material.id_material
                            },
                            attributes: ['amount_material']
                        });
                        
                        const usedMaterial = stock.amount_material - product.unit_product * material.productStocksAssociation.how_much_contains_use;
                        
                        await Stock.update({
                            amount_material: usedMaterial
                        }, {
                            where: {
                                id_material: material.id_material
                            }
                        });
                    };
    
                    await orderProductsAssociation.create({
                        id_order_fk: id_order,
                        id_product_fk: product.id_product,
                        unit_product: product.unit_product
                })}
            };

            return try_catch.SERVICE_TRY_RES('La actualización del pedido finalizó exitosamente', 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La actualización del pedido falló');
        }
    }
};