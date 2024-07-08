import { ToolsService } from "../services/toolsService.js";
const Tool = new ToolsService();

export class ToolsController {
    verTodasHerramientas = async (req, res) => {
        try {
            const resultado = await Tool.verHerramientas();
            // RESPONSES    
            // For EndPoint
            if (req.query.format === 'json'){
                if (resultado.length === 0){
                    // If it doesn't find any tool in the db
                    res.status(404).json({title: 'No se encontraron herramientas registradas en la base de datos'});
                } else {
                    // If found 
                    res.status(200).json(resultado);
                }
            }
            // For Front
            if (resultado.length === 0){
                console.log('hola')
                // If it doesn't find any tool in the db
                res.render('tools', {title: 'Control de "Herramientas"', message: 'No se encontraron herramientas registradas en la base de datos', resultado});
            } else {
                // If found
                res.render('tools', {title: 'Control de "Herramientas"', resultado})
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
            const findTheSameName = await Tool.verHerramientas();
            const nameTool = req.body.name_tool,
                locationTool = req.body.location_tool;
            // VALIDATIONS
            //  Tests if nameTool, descriptionTool or locationTool contains any caracters 
            if (nameTool.length === 0 || locationTool.length === 0){
                throw new Error(JSON.stringify({message: `Los campos "NOMBRE DE LA HERRAMIENTA" Y "LOCALIZACIÓN" son obligatorios`, redirect: '/tools/create', text: 'Volver a crear Herramienta'}));
            }
            // Tests if nameTool is longer than 50 caracters
            if(nameTool.length > 50){
                throw new Error(JSON.stringify({message: `No puedes ingresar un nombre con más de 50 carateres, ${nameTool} cuenta con ${nameTool.length} caracteres`, redirect: '/tools/create', text: 'Volver a crear Herramienta'}));
            }
            // Test if there is a tool with the same name.
            if(findTheSameName.length > 0){
                findTheSameName.forEach(tool => {
                    if(nameTool === tool.name_tool) {
                        throw new Error(JSON.stringify({message: `Ya existe una herramienta con el nombre de "${nameTool}" en la base de datos`, redirect: '/tools/create', text: 'Volver a crear Herramienta'}));
                    }
                })
            }
            // RESPONSES
            if(req.query.format === 'json'){
                // Response for EndPoint
                const resultado = await Tool.crearHerramienta(req.body);
                res.status(200).json(resultado);
            } else {
                // Response for Web
                await Tool.crearHerramienta(req.body);
                res.redirect('/tools');
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
    deleteHerramienta = async (req, res) => {
        // RESPONSES
        try {
            await Tool.borrarHerramienta(req.params);
            if (req.query.format === 'json'){
                // Response for EndPoint
                res.status(200).json({title: `El elemento con ID: ${req.params.id_tool} ha sido eliminado correctamente`})
            } else {
                // Response for Web
                res.redirect('/tools');
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
    irActualizarHerramienta = async (req, res) => {
        try {
            const resultado = await Tool.verUnaHerramienta(req.params);
            res.render('updateTool', {title: "Modificar producto", resultado});
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
    actualizarHerramienta = async (req, res) => {
        try {
            const findTheSameName = await Tool.verHerramientas();
            const idtool = req.params.id_tool;
            const newData = req.body;
            const {idTool, ...data} = newData;
            const nameTool = req.body.name_tool,
                statusTool = req.body.status_tool,
                locationTool = req.body.location_tool,
                repairShopTool = req.body.repair_shop_tool,
                repairDateTool = req.body.repair_date_tool,
                searchRepairTool = req.body.search_repair_tool;

            // VALIDATIONS
            //  Tests if nameTool or locationTool contains any caracters 
            if (nameTool.length === 0 || locationTool.length === 0){
                throw new Error(JSON.stringify({message: `Los campos "NOMBRE", "ESTADO" Y "LOCALIZACIÓN" son obligatorios`, redirect: '/tools', text: 'Volver a "Herramientas"'}));
            }
            // Tests if nameTool is longer than 50 caracters
            if(nameTool.length > 50){
                throw new Error(JSON.stringify({message: `No puedes ingresar un nombre con más de 50 carateres, ${nameTool} cuenta con ${nameTool.length} caracteres`, redirect: '/tools', text: 'Volver a "Herramientas"'}));
            }

            if (statusTool === 'En_arreglo'){
                if (repairShopTool.length === 0 || repairDateTool.length === 0 || searchRepairTool.length === 0){
                    throw new Error(JSON.stringify({message: `Si la herramienta está en arreglo, los campos "DONDE SE ESTÁ ARREGLANDO", "CUANDO SE LLEVO A REPARAR" Y "CUANDO IR A BUSCAR" son campos obligatorios`, redirect: '/tools', text: 'Volver a "Herramientas"'}));
                }
            } else {
                newData.repair_date_tool = null;
                newData.repair_shop_tool = null;
                newData.search_repair_tool = null;
            }
            if(statusTool !== 'Habilitado'){
                newData.enable_tool = false;
            } else {
                newData.enable_tool = true;
            }
            if(findTheSameName.length > 0){
                findTheSameName.forEach(tool => {
                    if((nameTool === tool.name_tool) && (req.params.id_tool != tool.id_tool)) {
                        throw new Error(JSON.stringify({message: `Ya existe una herramienta con el nombre de "${nameTool}" en la base de datos`, redirect: '/tools', text: 'Volver "Herramientas"'}));
                    }
                })
            }
            await Tool.updateTool(idtool, newData);
            res.redirect('/tools');
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
