import { verifyJwtToken } from '../jwt';

export const authentication = async (req, res, next) => {
    const token = req.headers.authorization;

    if(token){
        const decoded = await verifyJwtToken(token, process.env.SECRET);
        if(decoded && decoded.id) req.user = decoded.id;
    }

    next();
}

export const graphqlUpload = (options) => {
    const isUpload = (req) => {
        return Boolean(req.baseUrl === options.endpointURL && req.method === 'POST' && req.is('multipart/form-data'));
    }

    return (req, res, next) => {
        if (!isUpload(req)) {
            return next();
        }

        const files = [req.files.files];
        const body = req.body;
        const variables = body.variables ? JSON.parse(body.variables) : {};

        files.forEach((file) => {
            if (!variables[file.fieldname]) {
                variables[file.fieldname] = [];
            }
            variables[file.fieldname].push(file);
        });

        req.body =  {
            operationName: body.operationName,
            query: body.query,
            variables: variables
        };

        return next();
    }
}