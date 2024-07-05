import { Op } from "sequelize";
import {Stock} from "../models/stocksModels.js"
import { response } from "express";

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
            const actualizar = await Stock.update(newData, {
                where: {
                    id_product: id
                }, individualHooks: true,
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
    buscarUnProducto = async (searchValue, searchProduct) => {
        try {  
            if (searchValue === "id_product" || searchValue === "name_product") {
                const whereClause = {}
                whereClause[searchValue] = {
                    [Op.like]: `%${searchProduct}%`
                }; 
                const buscarUnStock = Stock.findAll({
                    where: whereClause 
                });
                return buscarUnStock;
            } else if (searchValue === "amount_product" || searchValue === "buy_price_product"){
                const whereClause = {}
                whereClause[searchValue] = {
                    [Op.eq]: searchProduct
                }; 
                const buscarUnStock = Stock.findAll({
                    where: whereClause 
                });
                return buscarUnStock;
            }
            
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