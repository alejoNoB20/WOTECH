import { ToolsService } from "../services/toolsControllerService.js";
export const Tool = new ToolsService();

export class ToolsController {
    verTodasHerramientas = async (req, res) => {
        try {
            const resultado = await Tool.verHerramientas();
            res.render('toolsController', {title: 'Control de "Herramientas"', resultado})
        } catch (err) {
            console.log(err);
        }
    }
}
