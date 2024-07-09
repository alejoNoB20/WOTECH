import {StockService} from "../services/stockService.js";
export const stock = new StockService();


// stockProducts CRUD
export class StockController {
    // Create new stock
    crear = async (req, res) => {
        try {
            const findTheSameName = await stock.verStock();
            const namematerial = req.body.name_material,
                amountmaterial = Number(req.body.amount_material),
                howMuchContains = Number(req.body.how_much_contains),
                contains = req.body.contains,
                buyPricematerial = req.body.buy_price_material;
            // VALIDATIONS
            //  Tests if namematerial, amountmaterial or buyPricematerial contains any caracters 
            if (namematerial.length === 0 || amountmaterial.length === 0 || buyPricematerial.length === 0){
                throw new Error(JSON.stringify({message: `Los campos "NOMBRE", "PRECIO DE COMPRA" Y "CANTIDAD" son obligatorios`, redirect: '/stock/create', text: 'Volver a crear Stock'}));
            }
            // Tests if namematerial is longer than 50 caracters
            if(namematerial.length > 50){
                throw new Error(JSON.stringify({message: `No puedes ingresar un nombre con más de 50 carateres, ${namematerial} cuenta con ${namematerial.length} caracteres`, redirect: '/stock/create', text: 'Volver a crear Stock'}));
            }
            // Tests if buyPricematerial or amountmaterial isn't number or integer  
            if ((isNaN(buyPricematerial) || (buyPricematerial % 1 !== 0)) || (isNaN(amountmaterial) || (amountmaterial % 1 !== 0))){
                throw new Error(JSON.stringify({message: `Los campos "PRECIO DE COMPRA", "CANTIDAD" Y "CANTIDAD DEL CONTENIDO" solo aceptan números enteros`, redirect: '/stock/create', text: 'Volver a crear Stock'}));
            }
            // Tests if howMuchContains isn't number or integer
            if(contains === 'on'){
                if (howMuchContains === 0){
                    throw new Error(JSON.stringify({message: `Si el stock tiene un contenido debes detallar su cantidad con números enteros`, redirect: '/stock/create', text: 'Volver a crear Stock'}));
                } else if (isNaN(howMuchContains) || (howMuchContains % 1 !== 0)) {
                    throw new Error(JSON.stringify({message: `El campo "CANTIDAD DEL CONTENIDO" solo aceptan números enteros`, redirect: '/stock/create', text: 'Volver a crear Stock'}));
                }
            }
            if(findTheSameName.length > 0){
                findTheSameName.forEach(stock => {
                    if(namematerial === stock.name_material) {
                        throw new Error(JSON.stringify({message: `Ya existe un materialo con el nombre de "${namematerial}" en la base de datos`, redirect: '/stock/create', text: 'Volver a crear Stock'}));
                    }
                })
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
    // view all materials
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
            res.render('updateStock', {title: "Modificar materialo", resultado});
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
            const findTheSameName = await stock.verStock();
            const idmaterial = req.params.id_material;
            const newData = req.body;
            const {id_material, ...data} = newData;
            const namematerial = req.body.name_material,
                amountmaterial = Number(req.body.amount_material),
                howMuchContains = Number(req.body.how_much_contains),
                contains = req.body.contains,
                buyPricematerial = req.body.buy_price_material;
            // VALIDATIONS
            //  Tests if namematerial, amountmaterial or buyPricematerial contains any caracters 
            if (namematerial.length === 0 || amountmaterial.length === 0 || buyPricematerial.length === 0){
                throw new Error(JSON.stringify({message: `Los campos "NOMBRE", "PRECIO DE COMPRA" Y "CANTIDAD" son obligatorios`, redirect: '/stock', text: 'Volver a Stock'}));
            }
            // Tests if namematerial is longer than 50 caracters
            if(namematerial.length > 50){
                throw new Error(JSON.stringify({message: `No puedes ingresar un nombre con más de 50 carateres, ${namematerial} cuenta con ${namematerial.length} caracteres`, redirect: '/stock', text: 'Volver a Stock'}));
            }
            // Tests if buyPricematerial or amountmaterial isn't number or integer  
            if ((isNaN(buyPricematerial) || (buyPricematerial % 1 !== 0)) || (isNaN(amountmaterial) || (amountmaterial % 1 !== 0))){
                throw new Error(JSON.stringify({message: `Los campos "PRECIO DE COMPRA", "CANTIDAD" Y "CANTIDAD DEL CONTENIDO" solo aceptan números enteros`, redirect: '/stock', text: 'Volver a Stock'}));
            }
            // Tests if howMuchContains isn't number or integer
            if(contains === 'on'){
                if (howMuchContains === 0){
                    throw new Error(JSON.stringify({message: `Si el stock tiene un contenido debes detallar su cantidad con números enteros`, redirect: '/stock/create', text: 'Volver a crear Stock'}));
                } else if (isNaN(howMuchContains) || (howMuchContains % 1 !== 0)) {
                    throw new Error(JSON.stringify({message: `El campo "CANTIDAD DEL CONTENIDO" solo aceptan números enteros`, redirect: '/stock/create', text: 'Volver a crear Stock'}));
                }
            }
            if(findTheSameName.length > 0){
                findTheSameName.forEach(stock => {
                    if((namematerial === stock.name_material) && ((req.params.id_material != stock.id_material))) {
                        throw new Error(JSON.stringify({message: `Ya existe un materialo con el nombre de "${namematerial}" en la base de datos`, redirect: '/stock', text: 'Volver a Stock'}));
                    }
                })
            }
            await stock.actualizarStock(idmaterial, data);
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
                res.status(200).json({title: `El elemento con ID: ${req.params.id_material} ha sido eliminado correctamente`})
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
            const searchmaterial = req.query.searchmaterial;
            const resultado = await stock.buscarUnmaterialo(searchValue, searchmaterial);
            // VALIDATIONS
            // Tests if searchValue options, except name_material, isn't a number of is a float point number
            if (searchValue !== 'name_material' && (isNaN(searchmaterial) || (searchmaterial % 1 !== 0))){
                throw new Error(JSON.stringify({message: 'Los campos "CANTIDAD", "PRECIO" y "ID" solo reciben números y solo números', redirect: '/stock', text: 'Volver a Stock'}))
            }
            // REPONSES
            if(req.query.format === 'json'){
                // Response for EndPoint
                if (resultado.length === 0) {
                    // if the searched material doesn't exist in the DB
                    res.status(200).json({title: searchmaterial, resultado: `No se encontró ningun materialo con "${searchmaterial}"`});
                } else {
                    // if the searched material exist in the DB
                    res.status(200).json({title: searchmaterial, resultado});
                }
            } else {
                if (resultado.length === 0){
                    // if the searched material doesn't exist in the DB                    
                    switch (searchValue) {
                        case 'name_material':
                            res.render('browserStock', {title: searchmaterial, resultado, searchmaterial, searchValue: 'Nombre'})
                        break;        
                        case 'id_material':
                            res.render('browserStock', {title: searchmaterial, resultado, searchmaterial, searchValue: 'ID'})
                        break;                        
                        case 'amount_material':
                            res.render('browserStock', {title: searchmaterial, resultado, searchmaterial, searchValue: 'Cantidad'})
                        break;                        
                        case 'buy_price_material':
                            res.render('browserStock', {title: searchmaterial, resultado, searchmaterial, searchValue: 'Precio de compra'})
                        break;
                    }
                } else {
                    // if the searched material exist in the DB
                    res.render('browserStock', {title: searchmaterial, resultado});
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