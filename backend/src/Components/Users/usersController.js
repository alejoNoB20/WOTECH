import { userService } from "./usersService.js";
import { try_catch } from "../../utils/try_catch.js";
const UserService = new userService();

export class userController {
    crear = async (req, res) => {
        const response = await UserService.crearUser(req.body);
        try_catch.TRY_RES(res, response);

    };

    logIn = async (req, res) => {
        const response = await UserService.loginUser(res, req.body);
        try_catch.TRY_RES(res, response);
        
    };

    logOut = async (req, res) => {
        const response = await UserService.logoutUser(req.cookies.token);
        try_catch.TRY_RES(res, response);

    };

    userInfo = async (req, res) => {
        const response = await UserService.userInfo(req.cookies.token);
        try_catch.TRY_RES(res, response);
        
    };
};