import { ordersService } from "../services/ordersService.js";
import { Products } from "../models/productsModels.js";
const Order = new ordersService();

export class orderController {
    verPedidos = async (req, res) => {
        try{
            const resultado = await Order.verTodo();
            if(resultado.length === 0){
                res.status(404).json({title: "Control de Pedidos", resultado: 'No se encontró nada en la base de datos'});
            }
            res.status(200).json({title: "Control de Pedidos", resultado})
        }catch(err){
            console.log(err)
        }
    }
    irPaginaCrear = async (req, res) => {
        try{    
            const resultado = await Order.mostrarProductos();
            res.status(200).json({title: 'Crear pedido', resultado})
        }catch (err) {
            console.log(err);
        }
    }
    crear = async (req, res) => {
        try{
            const {products, ...datos} = req.body;
            const priceProducts = products.map(product => {
                const price_product = product.price_product * product.amount_product;
                return price_product;
            })
            const sum = priceProducts.reduce((sumaParcial, a) => sumaParcial + a, 0);
            datos.price_order = sum;
            const resultado = await Order.crearPedido(products, datos);
            if(resultado) res.status(200).json({title: 'Pedido generado con éxito', resultado});
        }catch(err) {
            console.log(err);
        }
    }
    borrar = async (req, res) => {
        try{
            const resultado = await Order.borrarPedido(req.params.id_order);
            if(resultado){
                res.status(200).json(`El pedido con ID: ${req.params.id_order} eliminado con éxito`);
            } else {
                res.status(404).json(`El pedido con ID: ${req.params.id_order} no se pudo eliminar debido a un erro del sistema`);
            }
        }catch(err) {
            console.log(err)
        }
    }
}
