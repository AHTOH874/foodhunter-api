import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';

export default new GraphQLObjectType({
  name: 'Category',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    parent_id: {
      type: GraphQLID
    }
  }
});