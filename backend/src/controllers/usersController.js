import { UserService } from "../services/userService.js"
export const user = new UserService()



export class UsersController {
    ingresar = async (req,res) => {
        try {
            const resultado = await user.ingresarUsuario(req.body);
            res.status(200).json(resultado)
        } catch (error) {
            console.log(error)            
        }
    }
    obtenerUnico = async (req,res) =>{
        try{
            const resultado = await user.buscarUnicoUsuario(req.params);
            res.status(200).json(resultado);
        } catch (error){
            console.log(error);
        }
    }
    obtenerTodos = async (req,res) => {
        try{
            const resultado = await user.buscarUsuarios(req.body);
            res.status(200).json(resultado);
        } catch(err){
            console.log(err);
        }
    }
    actualizar = async(req,res) =>{
        try {
            const resultado = await user.actualizarUsuario(req.params);
            res.status(204).json(resultado);
        } catch(err){
            console.log(err);
        }
    }
    eliminar = async(req,res) =>{
        try {
            const resultado = await user.eliminarUsuario(req.params);
            res.status(204).json(resultado);
        } catch(err) {
            console.log(err);
        }
    }
}