import jwt from 'jsonwebtoken';

export const checkToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ isAuthenticated: false });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ isAuthenticated: false });
        }

        return res.status(200).json(decoded)
    });
};