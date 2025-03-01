import { uploadImage } from '../../libs/Cloudinary.js';
import { try_catch } from '../../utils/try_catch.js';
import { Invoices } from './invoicesModels.js';

export class invoicesService {
    verFacturas = async (id_supplier_fk) => {
        try{
            const resultado = await Invoices.findAll({
                where: {
                    id_supplier_fk
                },
                attributes: ['id_invoice', 'invoice']
            });
            if(resultado.length === 0) return try_catch.SERVICE_TRY_RES('No se registran facturas de este proveedor', 404);

            return try_catch.SERVICE_TRY_RES(resultado, 200);
            
        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'No se pueden ver las factruas debido a una falla en el sistema');
        }
    }
    agregarFactura = async (data) => {
        try{
            const saveImage = await uploadImage(data.invoice, 'Facturas');
            if(saveImage.success){
                data.invoice = saveImage.msg
            }else {
                return try_catch.SERVICE_TRY_RES('Hubo un problema a la hora de guardar la imagen de la factura', 500);
            };

            await Invoices.create(data);

            return try_catch.SERVICE_TRY_RES('La factura se guardo con éxito', 201);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La factura se intentó guardar pero falló');
        }
    }
    deshabilitarFactura = async (id_invoice) => {
        try{
            await Invoices.update({
                disabled: true
            }, {
                where: {
                    id_invoice
                }
            });

            return try_catch.SERVICE_TRY_RES('La deshabilitación de la factura terminó exitosamente', 200);

        }catch(err) {
            return try_catch.SERVICE_CATCH_RES(err, 'La deshabilitación de la factura falló');
        }
    }
} 