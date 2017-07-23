import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID
} from 'graphql';

export default new GraphQLObjectType({
    name: 'User',
    description: 'User information',
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        name: {
            type: GraphQLString
        },
        avatar: {
            type: GraphQLString
        }
    }
});