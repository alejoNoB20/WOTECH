import { ToolsService } from "../services/toolsService.js";
const Tool = new ToolsService();

export class ToolsController {
    verTodasHerramientas = async (req, res) => {
        try {
            const resultado = await Tool.verHerramientas();
            // RESPONSES    
            // For EndPoint
                if (resultado.length === 0){
                    // If it doesn't find any tool in the db
                    res.status(404).json({title: 'No se encontraron herramientas registradas en la base de datos'});
                } else {
                    // If found 
                    res.status(200).json(resultado);
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
    pushHerramienta = async (req, res) => {
        try {
            const resultado = await Tool.crearHerramienta(req.body);
            res.status(200).json(resultado);
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
    deleteHerramienta = async (req, res) => {
        // RESPONSES
        try {
            await Tool.borrarHerramienta(req.params);
                // Response for EndPoint
                res.status(200).json({title: `El elemento con ID: ${req.params.id_tool} ha sido eliminado correctamente`})
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
    // irActualizarHerramienta = async (req, res) => {
    //     try {
    //         const resultado = await Tool.verUnaHerramienta(req.params);
    //             res.render('updateTool', {title: "Modificar producto", resultado});
    //     } catch (err) {
    //         let errorObject;
    //         try{    
    //             errorObject = JSON.parse(err.message);
    //         } catch(errParse){
    //             errorObject = {message: 'El error no se pudo manejar correctamente', redirect: '/', text: 'Volver al inicio'};
    //         }
    //         res.status(400).render('error', {error: errorObject.message, redirect: errorObject.redirect, text: errorObject.text});
    //     }
    // }
    actualizarHerramienta = async (req, res) => {
        try {
            const idTool = req.params.id_tool;
            // // VALIDATIONS
            // //  Tests if nameTool or locationTool contains any caracters 
            // if (nameTool.length === 0 || locationTool.length === 0){
            //     throw new Error(JSON.stringify({message: `Los campos "NOMBRE", "ESTADO" Y "LOCALIZACIÓN" son obligatorios`, redirect: '/tools', text: 'Volver a "Herramientas"'}));
            // }
            // // Tests if nameTool is longer than 50 caracters
            // if(nameTool.length > 50){
            //     throw new Error(JSON.stringify({message: `No puedes ingresar un nombre con más de 50 carateres, ${nameTool} cuenta con ${nameTool.length} caracteres`, redirect: '/tools', text: 'Volver a "Herramientas"'}));
            // }

            // if (statusTool === 'En_arreglo'){
            //     if (repairShopTool.length === 0 || repairDateTool.length === 0 || searchRepairTool.length === 0){
            //         throw new Error(JSON.stringify({message: `Si la herramienta está en arreglo, los campos "DONDE SE ESTÁ ARREGLANDO", "CUANDO SE LLEVO A REPARAR" Y "CUANDO IR A BUSCAR" son campos obligatorios`, redirect: '/tools', text: 'Volver a "Herramientas"'}));
            //     }
            // } else {
            //     newData.repair_date_tool = null;
            //     newData.repair_shop_tool = null;
            //     newData.search_repair_tool = null;
            // }
            // if(statusTool !== 'Habilitado'){
            //     newData.enable_tool = false;
            // } else {
            //     newData.enable_tool = true;
            // }
            // const oldData = await Tool.verUnaHerramienta(idTool);
            const newData = await Tool.updateTool(idTool, req.body);
            res.status(200).json({'Datos nuevos': newData});
        } catch (err) {
            console.log(err)
        }
    }
    buscarHerramienta = async (req, res) => {
        try{
            const searchValue = req.query.searchValue;
            const searchProduct = req.query.searchProduct;
            // VALIDATIONS
            // Tests if searchValue options, except name_product, isn't a number of is a float point number
            if (searchValue === 'id_tool' && (isNaN(searchProduct) || (searchProduct % 1 !== 0))){
                throw new Error(JSON.stringify({message: 'El campo "ID" solo recibe números enteros', redirect: '/tools', text: 'Volver a "Herramientas"'}))
            }
            if (searchValue === 'status_tool'){
                if (isNaN(searchProduct) || (searchProduct < 0 || searchProduct > 3)){
                    throw new Error(JSON.stringify({message: 'Para filtrar por el "ESTADO" debes ingresar números de 1 al 3: "1"(Habilitado) - "2"(En Arreglo) - "3"(Perdido)', redirect: '/tools', text: 'Volver a "Herramientas"'}))
                } 
                parseInt(searchProduct)
                if (searchProduct == 1){
                    console.log('Entro en 1')
                    const resultado = await Tool.buscarUnaHerramienta(searchValue, 'Habilitado');
                    res.render('browserTool', {title: 'Estado: Habilitado', resultado, searchProduct: 'Habilitado', searchValue: 'Estado'});
                } else if (searchProduct == 2){
                    console.log('Entro en 2')
                    const resultado = await Tool.buscarUnaHerramienta(searchValue, 'En_arreglo');
                    res.render('browserTool', {title: 'Estado: En arreglo', resultado, searchProduct: 'En arreglo', searchValue: 'Estado'});
                } else {
                    console.log('Entro en 3')
                    const resultado = await Tool.buscarUnaHerramienta(searchValue, 'Perdido');
                    res.render('browserTool', {title: 'Estado: Perdido', resultado, searchProduct: 'Perdido', searchValue: 'Estado'});
                }
            }

            const resultado = await Tool.buscarUnaHerramienta(searchValue, searchProduct);
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
                        case 'name_tool':
                            res.render('browserTool', {title: searchProduct, resultado, searchProduct, searchValue: 'Nombre'})
                        break;        
                        case 'id_tool':
                            res.render('browserTool', {title: searchProduct, resultado, searchProduct, searchValue: 'ID'})
                        break;                        
                        case 'status_tool':
                            res.render('browserTool', {title: searchProduct, resultado, searchProduct, searchValue: 'Estado'})
                        break;                        
                        case 'location_tool':
                            res.render('browserTool', {title: searchProduct, resultado, searchProduct, searchValue: 'Ubicación'})
                        break;
                        case 'repair_shop_tool':
                            res.render('browserTool', {title: searchProduct, resultado, searchProduct, searchValue: 'Donde se está arreglando'})
                        break;
                    }
                } else {
                    // if the searched product exist in the DB
                    console.log('Entro en el ultimo log')
                    res.render('browserTool', {title: searchProduct, resultado});
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
