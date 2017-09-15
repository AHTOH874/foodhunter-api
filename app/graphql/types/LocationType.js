import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLFloat } from 'graphql';

export default new GraphQLObjectType({
  name: 'Location',
  fields: {
    type: {
      type: new GraphQLNonNull(GraphQLString)
    },
    coordinates: {
      type: new GraphQLList(GraphQLFloat)
    }
  }
});
