import { supplierMaterialsService } from "./suppliersMaterialsService.js";
import { try_catch } from "../../utils/try_catch.js";
const supplierMaterials = new supplierMaterialsService();

export class supplierMaterialsController {
    crear = async (req, res) => {
        try{
            const resultado = await supplierMaterials.crearMaterial(req.body);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    modificar = async (req, res) => {
        try{
            const resultado = await supplierMaterials.modificarMaterial(req.params.id_supplier_material, req.body);
            try_catch.TRY_RES(res, resultado);

        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    deshabilitar = async (req, res) => {
        try{
            const resultado = await supplierMaterials.deshabilitarMaterial(req.params.id_supplier_material)
            try_catch.TRY_RES(res, resultado);
            
        }catch(err) {
            try_catch.CATCH_RES(res, err);
        }
    }
    controlPrecios = async (req, res) => {
        try{
            const resultado = await supplierMaterials.verControlDePrecios(req.params.id_supplier_material);
            try_catch.TRY_RES(res, resultado);

        }catch (err) {
            try_catch.CATCH_RES(res, err);
        }
    }
}