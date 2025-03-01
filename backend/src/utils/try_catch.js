export class try_catch {
    static TRY_RES = (res, resultado) => {
        res.status(resultado.status).json(resultado.msg);
    };
    static CATCH_RES = (res, err) => {
        console.log(err);
        res.status(err.status).json({msg: err.msg});
    };
    static SERVICE_TRY_RES = (message, HTTP_CODE) => {
        return {status: HTTP_CODE, success: true, msg: message};
    };
    static SERVICE_CATCH_RES = (err, message = 'Hubo un error interno en el servidor', HTTP_CODE = 500) => {    
        console.log(err);    
        return {status: HTTP_CODE, success: false, msg: message};
    };
};