import {StockService} from "../services/stockService.js";
export const stock = new StockService();


// stockProducts CRUD
export class StockController {
    // Create new stock
    crear = async (req, res) => {
        try {
            const resultado = await stock.crearStock(req.body);
            if(req.query.format === 'json'){
                res.status(200).json(resultado);
            } else {
                res.redirect('/stock');
            }
        }catch (err) {
            console.log(err);
        }
    }
    // view all products
    verTodos = async (req, res) => {
        try {
            const resultado = await stock.verStock();
            if (req.query.format === 'json') {
                res.json({ title: "Control Stock", resultado });
            } else {
                res.render('stock', { title: "Control Stock", resultado });
            }
        } catch(err) {
            console.log(err);
        }
    }
    // goes to updateStock.js in views
    irActualizarStock = async (req, res) => {
        try {
            const resultado = await stock.verUnStock(req.params);
            res.render('updateStock', {title: "Modificar producto", resultado});
        } catch(err){
            console.log(err);
        }
    }
    // update one stock
    actualizar = async (req, res) => {
        try {
            const idProduct = req.params.id_product;
            const newData = req.body;
            const {id_product, ...data} = newData;
            const resultado = await stock.actualizarStock(idProduct, data);
            res.redirect('/stock');
        } catch(err){
            console.log(err);
        }
    }
    // controller to see one stock
    verUno = async (req, res) => {
        try {
            const resultado = await stock.verUnStock(req.params);
        } catch(err) {
            console.log(err);
        }
    }
    // delete one stock
    borrar = async (req,res) => {
        try {
            const resultado = await stock.borrarStock(req.params);
            if (req.query.format === 'json'){
                res.status(200).json({title: `El elemento con ID: ${req.params.id_product} ha sido eliminado correctamente`})
            } else {
                res.redirect('/stock');
            }
        } catch(err) {
            console.log(err);
        }
    }
    // finder of stocks
    buscarUno = async (req, res) => {
        try{
            const searchValue = req.query.searchValue;
            const searchProduct = req.query.searchProduct;
            const resultado = await stock.buscarUnProducto(searchValue, searchProduct);
            if(req.query.format === 'json'){
                res.status(200).json({title: searchProduct, resultado});
            } else {
                res.render('browserStock', {title: searchProduct, resultado});
            }
        } catch(err){
            console.log(err);
        }
    }
}