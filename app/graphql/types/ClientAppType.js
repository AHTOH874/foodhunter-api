import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';

export default new GraphQLObjectType({
  name: 'ClientApp',
  description: 'Client app',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    secret: {
      type: new GraphQLNonNull(GraphQLString)
    },
    accessToken: {
      type: new GraphQLNonNull(GraphQLString)
    },
    websiteUrl: {
      type: GraphQLString
    },
    callbackUrl: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: GraphQLString
    }
  }
});