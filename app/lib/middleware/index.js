import { verifyJwtToken } from '../helpers/crypto';
import ClientAppModel from '../../models/ClientAppModel';

export const authentication = async (req, res, next) => {
  const token = req.headers['authorization'];
  const clientAppAccessToken = req.headers['client-app'];

  if(token){
    const decoded = await verifyJwtToken(token, process.env.AUTH_SECRET);

    if(decoded && decoded.id && decoded.clientAppId){
      req.clientAppId = decoded.clientAppId;
      req.userId = decoded.id;
    }
  } else if(clientAppAccessToken){
    const clientApp = await ClientAppModel.findOne({ accessToken: clientAppAccessToken });
    if(clientApp) req.clientApp = clientApp;
  }

  next();
}