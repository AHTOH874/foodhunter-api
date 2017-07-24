import { verifyJwtToken } from '../jwt';

export const authentication = async (req, res, next) => {
    const token = req.headers.authorization;

    if(token){
        const decoded = await verifyJwtToken(token, process.env.SECRET);
        if(decoded && decoded.id) req.user = decoded.id;
    }

    next();
}