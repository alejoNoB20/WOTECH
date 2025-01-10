import { productsService } from "./productsService.js";
import { try_catch } from "../../utils/try_catch.js";
import { imageURLTrasnform } from "../../utils/image_URL_transform.js";

const Product = new productsService();

export class productsController {
    verTodos = async (req, res) => {
        try {
            const resultado = await Product.verProductos();
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    irAPaginaCrear = async (req, res) => {
        try {
            const resultado = await Product.datosParaCreacion();
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    crear = async (req, res) => {
        try {
            if(req.files.img_product || typeof(req.files.img_product) !== 'string'){
                const imgURL = imageURLTrasnform(req.files.img_product[0]);
                req.body.img_product = {url: imgURL, name: req.files.img_product[0].originalname};
            };
            if(req.files.map_product || typeof(req.files.map_product) !== 'string'){
                const mapURL = imageURLTrasnform(req.files.map_product[0]);
                req.body.map_product = {url: mapURL, name: req.files.map_product[0].originalname}; 
            };
            const resultado = await Product.crearProducto(req.body);
            try_catch.TRY_RES(res, resultado);

        }catch (err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    deshabilitar = async (req, res) => {
        try{
            const resultado = await Product.deshabilitarProducto(req.params.id_product);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    eliminar = async (req, res) => {
        try{
            const resultado = await Product.eliminarProducto(req.params.id_product);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    detallesProducto = async (req, res) => {
        try {
            const resultado = await Product.filtrarProducto('id_product', req.params.id_product);
            
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);            
        }
    }
    actualizar = async (req, res) => {
        try{
            if(req.files.img_product){
                const imgURL = imageURLTrasnform(req.files.img_product[0]);
                req.body.img_product = {url: imgURL, name: req.files.img_product[0].originalname};
            };
            if(req.files.map_product){
                const mapURL = imageURLTrasnform(req.files.map_product[0]);
                req.body.map_product = {url: mapURL, name: req.files.map_product[0].originalname}; 
            };
            const {stocks, ...updateProduct} = req.body;
            const resultado = await Product.actualizarProducto(req.params.id_product, updateProduct);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    filtrar = async (req, res) => {
        try{
            const type = req.query.search_type;
            const value = req.query.search_value;
            const resultado = await Product.filtrarProducto(type, value);
            try_catch.TRY_RES(res, resultado);
            
        }catch (err) {
            try_catch.CATCH_RES(res, err);
        }
    }
}