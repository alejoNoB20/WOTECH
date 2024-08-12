import { Orders } from "../models/ordersModels.js";
import { Products } from "../models/productsModels.js";
import { order_Products_association } from "../models/orderProductsModels.js";
import { try_catch } from "../../utils/try_catch.js";
import { Op, where } from "sequelize";

export class ordersService {
    verTodo = async () => {
        try{
            const resultado = await Orders.findAll({
                order: [['disabled', 'ASC'],['delivery_day_order', 'ASC']], 
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: {
                    model: Products,
                    through: {
                        attributes: ['amount_product']
                    },
                    attributes: ['id_product', 'name_product']
                }
            });

            if(resultado.length === 0) return {status: 404, success: false, msg: 'No se encontró nada en la base de datos'};

            return {status: 200, success: true, msg: resultado};

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    mostrarProductos = async () => {
        try {
            const resultado = await Products.findAll({
                attributes: ['id_product', 'name_product', 'price_product'],
                order: [['name_product', 'ASC']]
            });
    
            if(resultado.length === 0) return {status: 404, success: false, msg: 'No se encontró nada en la base de datos'};

            return {status: 200, success: true, msg: resultado};

        } catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    crearPedido = async (datos) => {
        try{
            const {products, ...dato} = datos;
            const sum = products.reduce((sumaParcial, product) => sumaParcial + product.price_product * product.amount_product, 0);
            dato.price_order = sum;

            const resultado = await Orders.create(dato);
            if(!resultado) throw new Error ('Hubo un error interno en el servidor');

            const productsPromise = products.map(product => {
                return order_Products_association.create({
                        id_order_fk: resultado.id_order,
                        id_product_fk: product.id,
                        amount_product: product.amount_product
                })
            });

            await Promise.all(productsPromise);

            return {status: 200, success: true, msg: resultado};

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    deshabilitarPedido = async (id_order) => {
        try{
            const findOrder = await Orders.findByPk(id_order);
            if (!findOrder) return {status: 404, success: false, msg: 'No se encontró ningún pedido con ese ID'}; 
            
            await Orders.update({
                disabled: true
            }, {
                where: {
                    id_order
                }
            });

            return {status: 200, success: true, msg: `El pedido con ID: ${id_order} se cerró con éxito`};

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    borrarPedido = async (where) => {
        try{
            const findOrder = await Orders.findOne({where});
            if (!findOrder) return {status: 404, success: false, msg: 'No se encontró ningún pedido con ese ID'}; 

            await Orders.destroy({where});

            return {status: 200, success: true, msg: `El pedido con ID: ${where} eliminado con éxito`};

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    filtrarPedidos = async (type, value) => {
        try{
            if (type === 'shipping_address_order'){
                const resultado = await Orders.findAll({
                    where: {
                        shipping_address_order: {
                            [Op.like]: `%${value}%`
                        }
                    }, 
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                });
                if (resultado.length === 0) return {status: 404, success: false, msg: 'No se encontró nada en la base de datos'}; 

                return {status: 200, success: true, msg: resultado};

            } else {
                const objetoWhere = {};
                objetoWhere[type] = {
                    [Op.eq]: value 
                }
                const resultado = await Orders.findAll({
                    where: objetoWhere,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                })
                if (resultado.length === 0) return {status: 404, success: false, msg: 'No se encontró nada en la base de datos'}; 

                return {status: 200, success: true, msg: resultado};
                
            };

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    actualizarPedido = async (id_order, datos) => {
        try{
            const {products, ...dato} = datos;

            const totalPrice = products.reduce((sumaParcial, product) => sumaParcial + product.price_product * product.amount_product, 0);
            dato.price_order = totalPrice;

            const orderUpdate = await Orders.findByPk(id_order,{
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'id_order']
                }
            });

            if(JSON.stringify(dato) !== JSON.stringify(orderUpdate)){
                await Orders.update(dato, {
                    where: {
                        id_order
                    }
                })
            };

            const olderAssociation = await order_Products_association.findAll({
                where: {
                    id_order_fk: id_order
                }
            });

            const Oldervalidation = olderAssociation.map(olderProduct => {
                return ({id: olderProduct.id_product_fk, amount_product: olderProduct.amount_product});
            });

            const newValidation = products.map(newProduct => {
                return ({id: newProduct.id, amount_product: newProduct.amount_product});
            });

            if(JSON.stringify(Oldervalidation) !== JSON.stringify(newValidation)){
                await order_Products_association.destroy({
                    where: {id_order_fk: id_order}
                })

                const promiseAsocciation = newValidation.map(product => {
                    return order_Products_association.create({
                            id_order_fk: id_order,
                            id_product_fk: product.id,
                            amount_product: product.amount_product
                    })
                })
                
                await Promise.all(promiseAsocciation);
            };

            const orderUpdated = await Orders.findByPk(id_order, {
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            });

            return {status: 200, success: true, msg: orderUpdated};

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
};
