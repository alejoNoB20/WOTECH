import { Orders } from "../models/ordersModels.js";
import { Products } from "../models/productsModels.js";
import { order_Products_association } from "../models/orderProductsModels.js";
import { Op } from "sequelize";

export class ordersService {
    verTodo = async () => {
        try{
            const resultado = await Orders.findAll({
                include: {
                    model: Products,
                    through: {
                        attributes: []
                    },
                    attributes: ['id_product', 'name_product'],
                }
            });
            return resultado
        }catch(err){
            console.log(err);
        }
    }
    mostrarProductos = async () => {
        const resultado = await Products.findAll({
            attributes: ['id_product', 'name_product', 'price_product'],
            order: [['name_product', 'ASC']]
        })
        return resultado;
    }
    crearPedido = async (products, datos) => {
        try{
            const resultado = await Orders.create(datos)
            const productsPromise = products.map(product => {
                return order_Products_association.create({
                        id_order_fk: resultado.id_order,
                        id_product_fk: product.id,
                        amount_product: product.amount_product
                })
            })
            await Promise.all(productsPromise)
            return resultado
        }catch(err){
            console.log(err);
        }
    }
    borrarPedido = async (where) => {
        try{
            const resultado = await Orders.destroy({where});
            return resultado;
        }catch(err){
            console.log(err);
        }
    }
};
