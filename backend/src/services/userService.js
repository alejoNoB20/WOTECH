import { User } from "../models/usersModels.js"


export class UserService {
    

    ingresarUsuario = async (datos) => {
        try {
            const usuarioNuevo = await User.create(datos)
            return usuarioNuevo
        } catch (error) {
            console.log(error)            
        }
    }

    buscarUsuario = async (where) =>{
        try {
            if(where) {
                const buscarUno = await User.findOne({where});
                return buscarUno;
            }
            const buscarUsuarios = await User.findAll();
            return buscarUsuarios
        } catch (error) {
            console.log(error);
        }
    }

    buscarUsuarios = async(datos) =>{
        try {
            const buscarTodos = await User.findAll();
            return buscarTodos;
        } catch (err){
            console.log(err);
        }
    }
}