import {StockService} from "../services/stockService.js";
export const stock = new StockService();


// stockProducts CRUD
export class StockController {
    // Create new stock
    crear = async (req, res) => {
        try {
            const nameProduct = req.body.name_product,
                amountProduct = Number(req.body.amount_product),
                howMuchContains = Number(req.body.how_much_contains),
                contains = req.body.contains,
                buyPriceProduct = req.body.buy_price_product;
            // VALIDATIONS
            //  Tests if nameProduct, amountProduct or buyPriceProduct contains any caracters 
            if (nameProduct.length === 0 || amountProduct.length === 0 || buyPriceProduct.length === 0){
                throw new Error(JSON.stringify({message: `Los campos "NOMBRE", "PRECIO DE COMPRA" Y "CANTIDAD" son obligatorios`, redirect: '/stock/create', text: 'Volver a crear Stock'}));
            }
            // Tests if nameProduct is longer than 50 caracters
            if(nameProduct.length > 50){
                throw new Error(JSON.stringify({message: `No puedes ingresar un nombre con más de 50 carateres, ${nameProduct} cuenta con ${nameProduct.length} caracteres`, redirect: '/stock/create', text: 'Volver a crear Stock'}));
            }
            // Tests if buyPriceProduct or amountProduct isn't number or integer  
            if ((isNaN(buyPriceProduct) || (buyPriceProduct % 1 !== 0)) || (isNaN(amountProduct) || (amountProduct % 1 !== 0))){
                throw new Error(JSON.stringify({message: `Los campos "PRECIO DE COMPRA", "CANTIDAD" Y "CANTIDAD DEL CONTENIDO" solo aceptan números enteros`, redirect: '/stock/create', text: 'Volver a crear Stock'}));
            }
            // Tests if howMuchContains isn't number or integer
            if(contains === 'on'){
                if(isNaN(howMuchContains) || (howMuchContains % 1 !== 0)){
                    throw new Error(JSON.stringify({message: `El campo "CANTIDAD DEL CONTENIDO" solo aceptan números enteros`, redirect: '/stock/create', text: 'Volver a crear Stock'}));
                }
            }
            // RESPONSES
            if(req.query.format === 'json'){
                // Response for EndPoint
                const resultado = await stock.crearStock(req.body);
                res.status(200).json(resultado);
            } else {
                // Response for Web
                await stock.crearStock(req.body);
                res.redirect('/stock');
            }
        }catch (err) {
            let errorObject;
            try{
                errorObject = JSON.parse(err.message);
            } catch(errParse){
                errorObject = {message: 'El error no se pudo manejar correctamente', redirect: '/', text: 'Volver al inicio'};
            }
            res.status(400).render('error', {error: errorObject.message, redirect: errorObject.redirect, text: errorObject.text});
        }
    }
    // view all products
    verTodos = async (req, res) => {
        try {
            const resultado = await stock.verStock();
            // VALIDATIONS
            // Tests if DB contains stocks
            if(resultado.length === 0){
                res.render('stock', {title: "Control de Stock", resultado, message: "No se encontró ningún registro de Stock en la base de datos"});
            }
            // RESPONSES  
            if (req.query.format === 'json') {
                res.json({ title: "Control Stock", resultado });
            } else {
                res.render('stock', { title: "Control Stock", resultado });
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
    // goes to updateStock.js in views
    irActualizarStock = async (req, res) => {
        try {
            const resultado = await stock.verUnStock(req.params);
            res.render('updateStock', {title: "Modificar producto", resultado});
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
    // update one stock
    actualizar = async (req, res) => {
        try {
            const idProduct = req.params.id_product;
            const newData = req.body;
            const {id_product, ...data} = newData;
            const nameProduct = req.body.name_product,
                amountProduct = Number(req.body.amount_product),
                howMuchContains = Number(req.body.how_much_contains),
                contains = req.body.contains,
                buyPriceProduct = req.body.buy_price_product;
            // VALIDATIONS
            //  Tests if nameProduct, amountProduct or buyPriceProduct contains any caracters 
            if (nameProduct.length === 0 || amountProduct.length === 0 || buyPriceProduct.length === 0){
                throw new Error(JSON.stringify({message: `Los campos "NOMBRE", "PRECIO DE COMPRA" Y "CANTIDAD" son obligatorios`, redirect: '/stock/create', text: 'Volver a crear Stock'}));
            }
            // Tests if nameProduct is longer than 50 caracters
            if(nameProduct.length > 50){
                throw new Error(JSON.stringify({message: `No puedes ingresar un nombre con más de 50 carateres, ${nameProduct} cuenta con ${nameProduct.length} caracteres`, redirect: '/stock/create', text: 'Volver a crear Stock'}));
            }
            // Tests if buyPriceProduct or amountProduct isn't number or integer  
            if ((isNaN(buyPriceProduct) || (buyPriceProduct % 1 !== 0)) || (isNaN(amountProduct) || (amountProduct % 1 !== 0))){
                throw new Error(JSON.stringify({message: `Los campos "PRECIO DE COMPRA", "CANTIDAD" Y "CANTIDAD DEL CONTENIDO" solo aceptan números enteros`, redirect: '/stock/create', text: 'Volver a crear Stock'}));
            }
            // Tests if howMuchContains isn't number or integer
            if(contains === 'on'){
                if(isNaN(howMuchContains) || (howMuchContains % 1 !== 0)){
                    throw new Error(JSON.stringify({message: `El campo "CANTIDAD DEL CONTENIDO" solo aceptan números enteros`, redirect: '/stock/create', text: 'Volver a crear Stock'}));
                }
            }
            await stock.actualizarStock(idProduct, data);
            res.redirect('/stock');
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
    // controller to see one stock
    verUno = async (req, res) => {
        try {
            const resultado = await stock.verUnStock(req.params);
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
    // delete one stock
    borrar = async (req,res) => {
        try {
            const resultado = await stock.borrarStock(req.params);
            if (req.query.format === 'json'){
                res.status(200).json({title: `El elemento con ID: ${req.params.id_product} ha sido eliminado correctamente`})
            } else {
                res.redirect('/stock');
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
    // finder of stocks
    buscarUno = async (req, res) => {
        try{
            const searchValue = req.query.searchValue;
            const searchProduct = req.query.searchProduct;
            const resultado = await stock.buscarUnProducto(searchValue, searchProduct);
            // VALIDATIONS
            // Tests if searchValue options, except name_product, isn't a number of is a float point number
            if (searchValue !== 'name_product' && (isNaN(searchProduct) || (searchProduct % 1 !== 0))){
                throw new Error(JSON.stringify({message: 'Los campos "CANTIDAD", "PRECIO" y "ID" solo reciben números y solo números', redirect: '/stock', text: 'Volver a Stock'}))
            }
            // REPONSES
            if(req.query.format === 'json'){
                // Response for EndPoint
                if (resultado.length === 0) {
                    // if the searched product doesn't exist in the DB
                    res.status(200).json({title: searchProduct, resultado: `No se encontró ningun producto con "${searchProduct}"`});
                } else {
                    // if the searched product exist in the DB
                    res.status(200).json({title: searchProduct, resultado});
                }
            } else {
                if (resultado.length === 0){
                    // if the searched product doesn't exist in the DB                    
                    switch (searchValue) {
                        case 'name_product':
                            res.render('browserStock', {title: searchProduct, resultado, searchProduct, searchValue: 'Nombre'})
                        break;        
                        case 'id_product':
                            res.render('browserStock', {title: searchProduct, resultado, searchProduct, searchValue: 'ID'})
                        break;                        
                        case 'amount_product':
                            res.render('browserStock', {title: searchProduct, resultado, searchProduct, searchValue: 'Cantidad'})
                        break;                        
                        case 'buy_price_product':
                            res.render('browserStock', {title: searchProduct, resultado, searchProduct, searchValue: 'Precio de compra'})
                        break;
                    }
                } else {
                    // if the searched product exist in the DB
                    res.render('browserStock', {title: searchProduct, resultado});
                }
                
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