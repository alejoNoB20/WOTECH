import { try_catch } from "../../utils/try_catch.js";
import { Users } from "./usersModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class userService {
    crearUser = async (user) => {
        try{
            const {username_user, password_user, type_user} = user;

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password_user, salt);

            await Users.create({
                username_user,
                password_user: hash,
                type_user
            });

            return try_catch.SERVICE_TRY_RES('Usuario registrado exitosamente', 201);

        }catch(err) {
            try_catch.SERVICE_CATCH_RES(err, 'Error del servidor al momento de registrar el usuario');
        }
    };

    loginUser = async (res, user) => {
        try{
            const {password_user, username_user, type_user} = user;
            
            // ENCUENTRA EL USUARIO SEGUN SU NOMBRE DE USUARIO
            const response = await Users.findOne({
                where: {
                    username_user: username_user
                }, 
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            });
            if(response === null) return try_catch.SERVICE_TRY_RES(`Este usuario no está registrado`, 404);

            // VERIFICA QUE LA CONTRASEÑA SEA LA CORRECTA
            const verifyPassword = bcrypt.compareSync(password_user, response.password_user);

            if(!verifyPassword) return try_catch.SERVICE_TRY_RES('La contraseña es incorrecta', 400);

            // EN CASO QUE LA CONTRASEÑA GENERA Y GUARDA UN TOKEN DE SEGURIDAD EN UNA COOKIE
            const token = jwt.sign({
                    id: response.id_user, username: response.username_user, type: response.type_user
                }, 
                process.env.SECRET_KEY,
                {expiresIn: '1h'}
            );   

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Strict",
                expires: new Date(Date.now() + 900000),
                priority: "high"
            });

            return try_catch.SERVICE_TRY_RES('Has iniciado sesión correctamente!', 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'Error del servidor al momento de checkear el usuario');
        }
    };
};