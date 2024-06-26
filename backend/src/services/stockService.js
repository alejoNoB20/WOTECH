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
    actualizarStock = async (id, newDate) => {
        try {
            const actualizar = await Stock.update(newDate, {
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
    borrarStock = async (where) => {
        try {
            const eliminar = await Stock.destroy({where});
            return eliminar;
        } catch(err) {
            console.log(err);
        }
    }
};