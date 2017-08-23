import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
    name: 'RegistrationPayload',
    fields: {
        token: {
            type: new GraphQLNonNull(GraphQLString)
        },
        refreshToken: {
            type: new GraphQLNonNull(GraphQLString)
        }
    }
});