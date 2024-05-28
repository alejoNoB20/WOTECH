import { UserService } from "../services/userService.js"
export const user = new UserService()



export class UsersController {
    ingresar = async (req,res) => {
        try {
            const resultado = await user.ingresarUsuario(req.body)
            res.status(200).json(resultado)
        } catch (error) {
            console.log(error)            
        }
    }
}