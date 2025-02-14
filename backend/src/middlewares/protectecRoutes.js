import jwt from 'jsonwebtoken';

export const checkToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).send('Acceso denegado');

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).send('Token inválido o expirado');

        req.user = decoded;
        next();
    });
};