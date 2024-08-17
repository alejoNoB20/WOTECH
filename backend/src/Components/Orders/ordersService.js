import { Orders } from "./ordersModels.js";
import { Products } from "../Products/productsModels.js";
import { Clients } from "../Clients/clientsModels.js";
import { order_Products_association } from "../Associations/orderProductsModels.js";
import { try_catch } from "../../utils/try_catch.js";
import { Op } from "sequelize";

export class ordersService {
    verTodo = async () => {
        try{
            const resultado = await Orders.findAll({
                order: [['disabled', 'ASC'],['delivery_day_order', 'ASC']], 
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [{
                    model: Products,
                    through: {
                        attributes: ['amount_product']
                    },
                    attributes: ['id_product', 'name_product']
                }, {
                    model: Clients,
                    attributes: ['name_client'] 
                }]
            });
            if(resultado.length === 0) return try_catch.SERVICE_CATCH_RES(resultado, 'No se encontró ningun pedido en la base de datos', 404);

            return try_catch.SERVICE_TRY_RES(resultado, 302);

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
            if(resultado.length === 0) return try_catch.SERVICE_CATCH_RES(resultado, 'No se encontró ningun producto en la base de datos', 404);

            return try_catch.SERVICE_TRY_RES(resultado, 302);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    crearPedido = async (datos) => {
        try{
            const {products, ...dato} = datos;
            const sum = products.reduce((sumaParcial, product) => sumaParcial + product.price_product * product.amount_product, 0);
            dato.price_order = sum;

            const resultado = await Orders.create(dato);
            if(!resultado) return try_catch.SERVICE_CATCH_RES(resultado);

            const productsPromise = products.map(product => {
                return order_Products_association.create({
                        id_order: resultado.id_order,
                        id_product: product.id,
                        amount_product: product.amount_product
                })
            });

            await Promise.all(productsPromise);

            return try_catch.SERVICE_TRY_RES(resultado, 201);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    deshabilitarPedido = async (id_order) => {
        try{
            const findOrder = await Orders.findByPk(id_order);
            if(!findOrder) return try_catch.SERVICE_CATCH_RES(findOrder, 'No se encontró ningún pedido con ese ID', 404); 
            
            const respuesta = await Orders.update({
                disabled: true
            }, {
                where: {
                    id_order
                }
            });
            if(!respuesta) return try_catch.SERVICE_CATCH_RES(respuesta, 'No se pudo desabilitar el pedido debido a un error en el servidor');

            return try_catch.SERVICE_TRY_RES(`El pedido con ID: ${id_order} se cerró con éxito`, 200);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    borrarPedido = async (where) => {
        try{
            const findOrder = await Orders.findOne({where});
            if (!findOrder) return try_catch.SERVICE_CATCH_RES(findOrder, 'No se encontró ningún pedido con ese ID', 404); 

            await Orders.destroy({where});

            return try_catch.SERVICE_TRY_RES(`El pedido con ID: ${where} eliminado con éxito`, 200);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
    filtrarPedidos = async (type, value) => {
        try{
            if(type === 'shipping_address_order'){
                const resultado = await Orders.findAll({
                    where: {
                        shipping_address_order: {
                            [Op.like]: `%${value}%`
                        }
                    }, 
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: [{
                        model: Products,
                        through: {
                            attributes: ['amount_product']
                        },
                        attributes: ['id_product', 'name_product']
                    }, {
                        model: Clients,
                        attributes: ['name_client'] 
                    }] 
                });
                if(resultado.length === 0) return try_catch.SERVICE_TRY_RES(`No se encontró nada en la base de datos con ${type}: ${value}`); 

                return try_catch.SERVICE_TRY_RES(resultado, 302);

            }else {
                const objetoWhere = {};
                objetoWhere[type] = {
                    [Op.eq]: value 
                }
                const resultado = await Orders.findAll({
                    where: objetoWhere,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: [{
                        model: Products,
                        through: {
                            attributes: ['amount_product']
                        },
                        attributes: ['id_product', 'name_product']
                    }, {
                        model: Clients,
                        attributes: ['name_client'] 
                    }]
                })
                if (resultado.length === 0) return try_catch.SERVICE_TRY_RES(`No se encontró nada en la base de datos con ${type}: ${value}`); 

                return try_catch.SERVICE_TRY_RES(resultado, 302);
                
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
                    id_order
                }
            });

            const Oldervalidation = olderAssociation.map(olderProduct => {
                return ({id: olderProduct.id_product, amount_product: olderProduct.amount_product});
            });

            const newValidation = products.map(newProduct => {
                return ({id: newProduct.id, amount_product: newProduct.amount_product});
            });

            if(JSON.stringify(Oldervalidation) !== JSON.stringify(newValidation)){
                await order_Products_association.destroy({
                    where: {
                        id_order
                    }
                })

                const promiseAsocciation = newValidation.map(product => {
                    return order_Products_association.create({
                            id_order,
                            id_product: product.id,
                            amount_product: product.amount_product
                    })
                })
                
                await Promise.all(promiseAsocciation);
            };

            const orderUpdated = await this.filtrarPedidos('id_order', id_order);

            return try_catch.SERVICE_TRY_RES(orderUpdated, 200);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err);
        }
    }
};
