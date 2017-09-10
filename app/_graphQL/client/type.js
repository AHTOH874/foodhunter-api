import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';

export default new GraphQLObjectType({
    name: 'Client',
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        user_id: {
            type: new GraphQLNonNull(GraphQLID)
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