import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
import graphqlFields from 'graphql-fields';

import UserModel from '../../models/user';
import UserType from '../user/type';

export default new GraphQLObjectType({
    name: 'App',
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        user: {
            type: UserType,
            async resolve(root, args, options, info){
                try{
                    const fields = Object.keys(graphqlFields(info));
                    return await UserModel.findById(root.user_id, fields);
                } catch(error) {
                    return new Error('User not found');
                }
            }
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        secret: {
            type: new GraphQLNonNull(GraphQLString)
        },
        websiteUrl: {
            type: GraphQLString
        },
        callbackUrl: {
            type: GraphQLString
        }
    }
});