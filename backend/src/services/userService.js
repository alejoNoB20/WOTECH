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

    buscarUnicoUsuario = async (where) =>{
        try {
            const buscarUno = await User.findOne({where});
            return buscarUno;
        } catch (error) {
            console.log(error);
        }
    }

    buscarUsuarios = async() =>{
        try {
            const buscarTodos = await User.findAll();
            return buscarTodos;
        } catch (err){
            console.log(err);
        }
    }

    actualizarUsuario = async(where) =>{
        try {
            const actualizar = await User.update({where});
            return actualizar;
        } catch(err) {
            console.log(err);
        }
    }

    eliminarUsuario = async(where) =>{
        try {
            const eliminar = await User.destroy({where});
            return eliminar;
        } catch(err) {
            console.log(err);
        }
    }
}