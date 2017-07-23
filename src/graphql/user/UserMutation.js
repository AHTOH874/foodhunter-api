import { GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLID, GraphQLString, GraphQLObjectType } from 'graphql';


import ClientModel from '../../models/app';
import UserModel from '../../models/user';
import UserType from './UserType'


const TokenType = new GraphQLObjectType({
    name: 'Token',
    fields: {
        token: {
            type: GraphQLString
        },
        refreshToken: {
            type: GraphQLString
        }
    }
});




export default {
    Authorization: {
        type: TokenType,
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
        async resolve(context, args){
            const client = await ClientModel.findById(args.clientId);

            if(client && client.secret === args.clientSecret){
                const user = await UserModel.findOne({ email: args.email });

                if(user && user.checkPassword(args.password)){
                    return await createJwtTokens({ name: user.name }, process.env.SECRET);
                } else {
                    throw new Error('Email or password invalid');
                }
            } else {
                throw new Error('Client not found');
            }
        }
    }
}