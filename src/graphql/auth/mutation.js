import { GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLID, GraphQLString, GraphQLObjectType } from 'graphql';

import { createJwtTokens, refreshJwtTokens } from '../../lib/jwt';

import UserModel from '../../models/user';
import AppModel from '../../models/app';
import AuthType from './type';

export default {
    Authorization: {
        type: AuthType,
        args: {
            clientId: {
                type: new GraphQLNonNull(GraphQLString)
            },
            clientSecret: {
                type: new GraphQLNonNull(GraphQLString)
            },
            email: {
                type: new GraphQLNonNull(GraphQLString)
            },
            password: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        async resolve(root, args, context, info){
            const app = await AppModel.findById(args.clientId);

            if(app && app.checkSecret(args.clientSecret)){
                const user = await UserModel.findOne({ email: args.email });

                if(user && user.checkPassword(args.password)){
                    return await createJwtTokens({ id: user.id, name: user.name, app: app.id }, process.env.SECRET);
                } else {
                    throw new Error('Email or password invalid');
                }
            } else {
                throw new Error('Client not found');
            }
        }
    },
    RefreshTokens: {
        type: AuthType,
        args: {
            clientId: {
                type: new GraphQLNonNull(GraphQLString)
            },
            clientSecret: {
                type: new GraphQLNonNull(GraphQLString)
            },
            refreshToken: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        async resolve(root, args, context, info){
            const app = await AppModel.findById(args.clientId);

            if(app && app.checkSecret(args.clientSecret)){
                return refreshJwtTokens(args.refreshToken, process.env.SECRET);
            } else {
                throw new Error('Client not found');
            }
        }
    },
}