import { Tools } from "../models/toolsControllerModels.js";

export class ToolsService {
    verHerramientas = async () => {
        try{
            const resultado = await Tools.findAll();
            return resultado;
        } catch (err) {
            console.log(err);
        }
    }
};