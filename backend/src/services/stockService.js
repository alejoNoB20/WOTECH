import {Stock} from "../models/stocksModels.js"

export class StockService {
    verStock = async () => {
        try {
            const buscarTodo = await Stock.findAll();
            return buscarTodo;
        } catch(err) {
            console.log(err);
        }
    }
    crearStock = async (datos) => {
        try {
            const nuevoStock = await Stock.create(datos);
            return nuevoStock;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    actualizarStock = async (id, newData) => {
        try {
            const {total_amount_product, buy_price_product, amount_product, ...dato} = newData;
            total_amount_product = buy_price_product * amount_product;
            const actualizar = await Stock.update(newData, {
                where: {
                    id_product: id
                }
            });
            return actualizar;
        } catch(err) {
            console.log(err);
        }
    }
    verUnStock = async (where) => {
        try {
                const buscarUnStock = Stock.findOne({where});
                return buscarUnStock;
        } catch(err){
            console.log(err);
        }
    }
    buscarUnProducto = async (name_product) => {
        try {
                const buscarUnStock = Stock.findOne({
                    where:{
                        name_product: name_product
                    }
                });
                return buscarUnStock;
        } catch(err){
            console.log(err);
        }
    }
    borrarStock = async (where) => {
        try {
            const eliminar = await Stock.destroy({where});
            return eliminar;
        } catch(err) {
            console.log(err);
        }
    }
};