import { verifyJwtToken } from '../helpers/crypto';

export const authentication = async (req, res, next) => {
  const token = req.headers.authorization;

  if(token){
    const decoded = await verifyJwtToken(token, process.env.AUTH_SECRET);
    if(decoded && decoded.id && decoded.clientId){
      req.clientId = decoded.clientId;
      req.userId = decoded.id;
    }
  }

  next();
}