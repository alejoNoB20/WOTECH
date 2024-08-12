import { StockService } from "./stockService.js";
export const stock = new StockService();


// stockProducts CRUD
export class StockController {
    // Create new stock
    crear = async (req, res) => {
        try {
            const {contains, ...data}=  req.body

            if(!contains){
                data.how_much_contains = null;
                data.total_amount_material = null;
            } else {
                data.total_amount_material = data.amount_material * data.how_much_contains;
            }
            
            const resultado = await stock.crearStock(data);
            res.status(200).json(resultado);
        }catch (err) {
            console.log(err);
        }
    }
    // view all materials
    verTodos = async (req, res) => {
        try {
            const resultado = await stock.verStock();

            if(resultado.length === 0){
                res.status(200).json({title: "Control de Stock", message: "No se encontró ningún registro de Stock en la base de datos"});
            } else {
                res.status(200).json({ title: "Control Stock", resultado });
            }
        } catch (err) {
            console.log(err);
        }
    }
    // update one stock
    actualizar = async (req, res) => {
        try {
            const {contains, ...data} = req.body

            if(!contains){
                data.how_much_contains = null;
                data.total_amount_material = null;
            } else {
                data.total_amount_material = data.amount_material * data.how_much_contains;
            }

            await stock.actualizarStock(req.params, data);
            res.status(200).json({title: `Actualización correcta del producto: ID ${req.params.id_material}` });
        } catch (err) {
            console.log(err)
        }
    }
    // delete one stock
    borrar = async (req,res) => {
        try {
            await stock.borrarStock(req.params);
            res.status(200).json({title: `El elemento con ID: ${req.params.id_material} ha sido eliminado correctamente`})
        } catch (err) {
            console.log(err);
        }
    }
    // finder of stocks
    buscarUno = async (req, res) => {
        try{
            const searchType = req.query.search_type;
            const searchValue = req.query.search_value;
            
            const resultado = await stock.buscarUnMaterial(searchType, searchValue);
            // REPONSES
                // Response for EndPoint
                if (resultado.length === 0) {
                    // if the searched material doesn't exist in the DB
                    res.status(200).json({title: searchValue, resultado: `No se encontró ningun material con ${searchValue}`});
                } else {
                    // if the searched material exist in the DB
                    res.status(200).json({title: searchValue, resultado});
                }
        } catch (err) {
            console.log(err)
        }
    }
}