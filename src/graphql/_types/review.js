import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLID } from 'graphql';
import graphqlFields from 'graphql-fields';

import UserModel from '../../models/user';
import userType from './user';

export default new GraphQLObjectType({
    name: 'Review',
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        rating: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        body: {
            type: new GraphQLNonNull(GraphQLString)
        },
        placeId: {
            type: new GraphQLNonNull(GraphQLID)
        },
        author: {
            type: userType,
            description: 'Author Review',
            async resolve(root, args, options, info){
                try{
                    const fields = Object.keys(graphqlFields(info));
                    return await UserModel.findById(root.author, fields);
                } catch(error) {
                    return new Error('User not found');
                }
            }
        }
    }
});