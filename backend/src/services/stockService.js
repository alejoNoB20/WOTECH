import { Op } from "sequelize";
import {Stock} from "../models/stocksModels.js"

export class StockService {
    verStock = async () => {
        try {
            const buscarTodo = await Stock.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            });
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
        }
    }
    actualizarStock = async (where, newData) => {
        try {
            const actualizar = await Stock.update(newData, {where});
            return actualizar;
        } catch(err) {
            console.log(err);
        }
    }
    buscarUnMaterial = async (searchValue, searchmaterial) => {
        try {  
            if (searchValue === "name_material") {
                const objetoWhere = {}
                objetoWhere[searchValue] = {
                    [Op.like]: `%${searchmaterial}%`
                }; 
                const buscarUnStock = Stock.findAll({
                    where: objetoWhere,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']                        
                    }  
                });
                return buscarUnStock;
            } else if (searchValue === 'nameMaterialValidator'){
                const resultado = await Stock.findOne({
                    where: {
                        name_material: searchmaterial
                    },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']                        
                    } 
                })
                return resultado;
            }else {
                const objetoWhere = {}
                objetoWhere[searchValue] = {
                    [Op.eq]: searchmaterial
                }; 
                const buscarUnStock = Stock.findAll({
                    where: objetoWhere,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']                        
                    } 
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