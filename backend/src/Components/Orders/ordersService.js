import { Orders } from "./ordersModels.js";
import { Products } from "../Products/productsModels.js";
import { productsService } from "../Products/productsService.js";
import { Clients } from "../Clients/clientsModels.js";
import { Stock } from "../Stock/stocksModels.js"
import { order_Products_association } from "../Associations/orderProductsModels.js";
import { try_catch } from "../../utils/try_catch.js";
import { Op } from "sequelize";
const Product = new productsService();

export class ordersService {
    verTodo = async () => {
        try{
            const resultado = await Orders.findAll({
                where: {
                    disabled: false
                },
                order: [['delivery_day_order', 'ASC']], 
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'shipping_address_order', 'id_client_fk', 'disabled']
                }
            });
            if(resultado.length === 0) return try_catch.SERVICE_TRY_RES('No se encontraron pedidos activos en la base de datos', 404);

            return try_catch.SERVICE_TRY_RES(resultado, 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'No se pueden ver los pedidos debido a una falla en el sistema');
        }
    }
    mostrarProductos = async () => {
        try {
            const resultado = await Products.findAll({
                attributes: ['id_product', 'name_product', 'price_product'],
                order: [['name_product', 'ASC']]
            });
            if(resultado.length === 0) return try_catch.SERVICE_TRY_RES('No se encontró ningun producto en la base de datos', 404);

            return try_catch.SERVICE_TRY_RES(resultado, 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'No se pueden ver los productos debido a una falla en el sistema');
        }
    }
    crearPedido = async (datos) => {
        try{
            const {products, ...dato} = datos;
            const sum = products.reduce((sumaParcial, product) => sumaParcial + product.price_product * product.amount_product, 0);
            dato.price_order = sum;

            const resultado = await Orders.create(dato);

            for(const product of products){
                const producto = await Product.filtrarProducto('id_product', product.id);
                
                for(const material of producto.msg[0].stocks){
                    const stock = await Stock.findOne({
                        where: {
                            id_material: material.id_material
                        },
                        attributes: ['amount_material']
                    });
                    
                    const usedMaterial = stock.amount_material - product.unit_product * material.product_Stocks_association.how_much_contains_use;
                    
                    await Stock.update({
                        amount_material: usedMaterial
                    }, {
                        where: {
                            id_material: material.id_material
                        }
                    });
                };

                await order_Products_association.create({
                        id_order_fk: resultado.id_order,
                        id_product_fk: product.id,
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
    filtrarPedidos = async (type, value) => {
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

            const resultado = await Orders.findAll({
                where: objetoWhere,
                order: [['shipping_address_order', 'ASC']],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [{
                    model: Products,
                    through: {
                        attributes: ['unit_product']
                    },
                    attributes: ['id_product', 'name_product']
                }, {
                    model: Clients,
                    attributes: ['name_client'] 
                }]
            })
            if (resultado.length === 0) return try_catch.SERVICE_TRY_RES(`No se encontró nada en la base de datos con ${type}: ${value}`, 404); 

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

            const olderAssociation = await order_Products_association.findAll({
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
                    const producto = await Product.filtrarProducto('id_product', Association.id_product_fk);
                    for(const material of producto.msg[0].stocks){
                        const stock = await Stock.findOne({
                            where: {
                                id_material: material.id_material
                            },
                            attributes: ['amount_material']
                        });
                        
                        const usedMaterial = stock.amount_material + Association.unit_product * material.product_Stocks_association.how_much_contains_use;
                        
                        await Stock.update({
                            amount_material: usedMaterial
                        }, {
                            where: {
                                id_material: material.id_material
                            }
                        });                        
                    };
                };

                await order_Products_association.destroy({
                    where: {
                        id_order_fk: id_order
                    }
                })

                for(const product of products){
                    const producto = await Product.filtrarProducto('id_product', product.id);
                    for(const material of producto.msg[0].stocks){
                        const stock = await Stock.findOne({
                            where: {
                                id_material: material.id_material
                            },
                            attributes: ['amount_material']
                        });
                        
                        const usedMaterial = stock.amount_material - product.unit_product * material.product_Stocks_association.how_much_contains_use;
                        
                        await Stock.update({
                            amount_material: usedMaterial
                        }, {
                            where: {
                                id_material: material.id_material
                            }
                        });
                    };
    
                    await order_Products_association.create({
                        id_order_fk: id_order,
                        id_product_fk: product.id,
                        unit_product: product.unit_product
                })}
            };

            return try_catch.SERVICE_TRY_RES('La actualización del pedido finalizó exitosamente', 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La actualización del pedido falló');
        }
    }
};
