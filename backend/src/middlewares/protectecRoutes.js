const SECRET_KEY = process.env.SECRET_KEY;

export const checkSecret = (req, res, next) => {
    console.log('aaaaaa');
    console.log(req.headers);
    
    const secret = req.headers['secret-key'];
    if (secret !== SECRET_KEY) {
        console.log('forbidden');
        
        return res.status(403).send('Forbidden');
    }
    next();
};