export class try_catch {
    static TRY_RES = (res, resultado) => {
        res.status(resultado.status).json({resultado: resultado.msg});
    };
    static CATCH_RES = (res, err) => {
        console.log(err);
        res.status(500).json({msg: 'Ah ocurrido un error inesperado'});
    };
    static SERVICE_CATCH_RES = (err) => {
        console.error(err);
        return {status: 500, success: false, msg: 'Hubo un error interno en el servidor'};
    };
    static SERVICE_TRY_RES = (message) => {
        return {status: 200, success: true, msg: message};
    };
};