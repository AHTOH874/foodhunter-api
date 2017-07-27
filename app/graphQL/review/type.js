import {
    GraphQLObjectType, GraphQLNonNull, GraphQLInt,
    GraphQLString, GraphQLID
} from 'graphql';


import UserModel from '../../models/user';
import UserType from '../user/type';

export default new GraphQLObjectType({
    name: 'Review',
    description: 'Review information',
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        rating: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        body: {
            type: GraphQLString
        },
        author: {
            type: UserType,
            resolve: async (root) => {
                return await UserModel.findById(root.author);
            }
        }
    }
});