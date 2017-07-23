import jwt from 'jsonwebtoken';

export const verifyJwtToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if(!err){
                const { iat, exp, ...data } = decoded;
                resolve(data);
            } else resolve(null);
        });
    });
}

export const createJwtTokens = async (data = {}, secret) => {
    const token = await jwt.sign(data, secret, {
        expiresIn: '20m'
    });

    const refreshToken = await jwt.sign(data, secret, {
        expiresIn: '7d'
    });

    return { token, refreshToken }
}

export const refreshJwtTokens = async (refreshToken, secret) => {
    const decoded = await verifyJwtToken(refreshToken, secret)

    if(decoded){
        return await createJwtTokens(decoded, secret);
    } else {
        throw new Error('Refresh token invalid');
    }
}