import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const createToken = () => {
  return crypto.randomBytes(32).toString('hex');
}

export const createJwtToken = async (data = {}, secret, expiresIn) => {
  return await jwt.sign(data, secret, { expiresIn });
}

export const verifyJwtToken = (token, secret) => {
  return new Promise((resolve) => {
    jwt.verify(token, secret, (err, decoded) => {
      if(!err){
        const { iat, exp, ...data } = decoded;
        resolve(data);
      } else resolve(null);
    });
  });
}
//
//
//
// export const refreshJwtTokens = async (refreshToken, secret) => {
//   const decoded = await verifyJwtToken(refreshToken, secret)
//
//   if(decoded){
//     return await createJwtTokens(decoded, secret);
//   } else {
//     throw new Error('Refresh token invalid');
//   }
// }