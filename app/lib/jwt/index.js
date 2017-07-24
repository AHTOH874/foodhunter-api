import jwt from 'jsonwebtoken';

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

export const createJwtTokens = async (data = {}, secret) => {
    const token = await jwt.sign(data, secret, {
        expiresIn: '1d'
    });

    const refreshToken = await jwt.sign(data, secret, {
        expiresIn: '2d'
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