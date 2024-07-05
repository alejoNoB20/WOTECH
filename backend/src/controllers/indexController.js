import {StockService} from "../services/stockService.js";
const stock = new StockService();


export class IndexController {
    verStockIndex = async (req, res) => {
        try {
            const resultado = await stock.verStock();
            // VALIDATIONS
            // Tests if DB contains stocks
            if(resultado.length === 0){
                res.render('index', {title: 'Vista del "Stock"', resultado, message: "No se encontró ningún registro de Stock en la base de datos"});
            }
            // RESPONSES  
            if (req.query.format === 'json') {
                res.json({ title: "Control Stock", resultado });
            } else {
                res.render('index', { title: 'Vista del "Stock"', resultado });
            }
        } catch (err) {
            let errorObject;
            try{
                errorObject = JSON.parse(err.message);
            } catch(errParse){
                errorObject = {message: 'El error no se pudo manejar correctamente', redirect: '/', text: 'Volver al inicio'};
            }
            res.status(400).render('error', {error: errorObject.message, redirect: errorObject.redirect, text: errorObject.text});
        }      
    }
}