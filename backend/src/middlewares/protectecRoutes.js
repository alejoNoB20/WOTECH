const SECRET_KEY = process.env.SECRET_KEY;

export const checkSecret = (req, res, next) => {
    const secret = req.headers['secret-key'];
    if (secret !== SECRET_KEY) {
        return res.status(403).send('Forbidden');
    }
    next();
};