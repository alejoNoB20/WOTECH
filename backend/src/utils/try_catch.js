export class try_catch {
    static TRY_RES = (res, resultado) => {
        res.status(resultado.status).json({resultado: resultado.msg});
    };
    static CATCH_RES = (res, err) => {
        console.log(err);
        res.status(500).json({msg: 'Ah ocurrido un error inesperado'});
    };
    static SERVICE_TRY_RES = (message, HTTP_CODE) => {
        return {status: HTTP_CODE, success: true, msg: message};
    };
    static SERVICE_CATCH_RES = (err, message = 'Hubo un error interno en el servidor', HTTP_CODE = 500) => {
        console.error(err);
        return {status: HTTP_CODE, success: false, msg: message};
    };
};