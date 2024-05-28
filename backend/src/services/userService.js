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
}