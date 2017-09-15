import { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLID } from 'graphql';

import UserModel from '../../models/UserModel';
import UserType from './UserType';

export default new GraphQLObjectType({
  name: 'Review',
  description: 'Review',
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